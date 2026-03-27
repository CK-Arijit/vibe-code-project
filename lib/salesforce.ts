import jsforce from "jsforce";

import type { AccountDetails } from "@/types";

type SalesforceToken = {
  accessToken: string;
  instanceUrl: string;
};

type SalesforceConfig = {
  loginUrl: string;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  securityToken?: string;
  contactByEmailPath: string;
};

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getSalesforceConfig(): SalesforceConfig {
  return {
    loginUrl: getEnv("SALESFORCE_LOGIN_URL"),
    clientId: getEnv("SALESFORCE_CLIENT_ID"),
    clientSecret: getEnv("SALESFORCE_CLIENT_SECRET"),
    username: getEnv("SALESFORCE_USERNAME"),
    password: getEnv("SALESFORCE_PASSWORD"),
    securityToken: process.env.SALESFORCE_SECURITY_TOKEN,
    contactByEmailPath: process.env.SALESFORCE_CONTACT_BY_EMAIL_PATH ?? "/services/apexrest/contactByEmail",
  };
}

function joinPasswordAndSecurityToken(password: string, securityToken?: string): string {
  if (!securityToken) {
    return password;
  }

  return `${password}${securityToken}`;
}

export async function generateSalesforceAccessToken(): Promise<SalesforceToken> {
  const config = getSalesforceConfig();

  const conn = new jsforce.Connection({
    oauth2: {
      loginUrl: config.loginUrl,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    },
  });

  await conn.login(config.username, joinPasswordAndSecurityToken(config.password, config.securityToken));

  if (!conn.accessToken || !conn.instanceUrl) {
    throw new Error("Salesforce login did not return access token or instance URL");
  }

  return {
    accessToken: conn.accessToken,
    instanceUrl: conn.instanceUrl,
  };
}

function getAddressFromSource(source: Record<string, unknown>): string | null {
  const directAddress =
    pickString(source.address) ?? pickString(source.Address) ?? pickString(source.MailingAddress);

  if (directAddress) {
    return directAddress;
  }

  const mailingStreet = pickString(source.mailingStreet) ?? pickString(source.MailingStreet);
  const mailingCity = pickString(source.mailingCity) ?? pickString(source.MailingCity);
  const mailingState = pickString(source.mailingState) ?? pickString(source.MailingState);
  const mailingPostalCode = pickString(source.mailingPostalCode) ?? pickString(source.MailingPostalCode);
  const mailingCountry = pickString(source.mailingCountry) ?? pickString(source.MailingCountry);

  const addressParts = [mailingStreet, mailingCity, mailingState, mailingPostalCode, mailingCountry].filter(
    (part): part is string => Boolean(part),
  );

  return addressParts.length > 0 ? addressParts.join(", ") : null;
}

function pickString(value: unknown): string | null {
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    return trimmedValue.length > 0 ? trimmedValue : null;
  }

  return null;
}

function normalizeSalesforcePayload(payload: unknown): Record<string, unknown> {
  if (Array.isArray(payload)) {
    return (payload[0] as Record<string, unknown>) ?? {};
  }

  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;

    if (Array.isArray(obj.records)) {
      return (obj.records[0] as Record<string, unknown>) ?? {};
    }

    if (obj.data && typeof obj.data === "object") {
      return obj.data as Record<string, unknown>;
    }

    return obj;
  }

  return {};
}

function mapSalesforceContactToAccountDetails(payload: unknown, fallbackEmail: string): AccountDetails {
  const source = normalizeSalesforcePayload(payload);

  return {
    firstName: pickString(source.firstName) ?? pickString(source.FirstName),
    lastName: pickString(source.lastName) ?? pickString(source.LastName),
    email: pickString(source.email) ?? pickString(source.Email) ?? fallbackEmail,
    phone: pickString(source.phone) ?? pickString(source.Phone),
    address: getAddressFromSource(source),
  };
}

export async function fetchSalesforceUserByEmail(email: string, token: SalesforceToken): Promise<AccountDetails> {
  const config = getSalesforceConfig();
  const requestUrl = new URL(config.contactByEmailPath, token.instanceUrl);
  requestUrl.searchParams.set("email", email);

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const responseBody = await response.text();
    throw new Error(
      `Salesforce user fetch failed with status ${response.status}: ${responseBody || response.statusText}`,
    );
  }

  const payload = (await response.json()) as unknown;
  return mapSalesforceContactToAccountDetails(payload, email);
}

