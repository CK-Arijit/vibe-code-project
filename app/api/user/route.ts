import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { fetchSalesforceUserByEmail, generateSalesforceAccessToken } from "@/lib/salesforce";

function getEmailFromRequest(request: NextRequest): string | null {
  const email = request.nextUrl.searchParams.get("email")?.trim();

  if (!email) {
    return null;
  }

  return email;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: {
            code: "UNAUTHORIZED",
            message: "You must be logged in to access this endpoint.",
          },
        },
        { status: 401 },
      );
    }

    const email = getEmailFromRequest(request);

    if (!email) {
      return NextResponse.json(
        {
          error: {
            code: "INVALID_EMAIL",
            message: "Query parameter 'email' is required.",
          },
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          error: {
            code: "INVALID_EMAIL",
            message: "Query parameter 'email' must be a valid email address.",
          },
        },
        { status: 400 },
      );
    }

    const salesforceToken = await generateSalesforceAccessToken();
    const accountDetails = await fetchSalesforceUserByEmail(email, salesforceToken);

    return NextResponse.json({ data: accountDetails }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error while fetching Salesforce data.";

    return NextResponse.json(
      {
        error: {
          code: "SALESFORCE_REQUEST_FAILED",
          message,
        },
      },
      { status: 500 },
    );
  }
}
