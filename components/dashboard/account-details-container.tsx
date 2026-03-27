"use client";

import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";

import { AccountOverview } from "@/components/dashboard/account-overview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AccountDetails } from "@/types";

type UserApiResponse =
  | {
      data: AccountDetails;
    }
  | {
      error: {
        code: string;
        message: string;
      };
    };

type FetchStatus = "idle" | "loading" | "success" | "error";

function getUserEmail(user: ReturnType<typeof useUser>["user"]): string | null {
  if (!user) {
    return null;
  }

  return user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? null;
}

export function AccountDetailsContainer() {
  const { isLoaded, user } = useUser();
  const email = useMemo(() => getUserEmail(user), [user]);

  const [status, setStatus] = useState<FetchStatus>("idle");
  const [data, setData] = useState<AccountDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAccountData = useCallback(async () => {
    if (!email) {
      setStatus("error");
      setError("No email was found in your logged-in session.");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const response = await fetch(`/api/user?email=${encodeURIComponent(email)}`, {
        method: "GET",
        cache: "no-store",
      });

      const payload = (await response.json()) as UserApiResponse;

      if (!response.ok || "error" in payload) {
        const message =
          "error" in payload
            ? payload.error.message
            : "Failed to fetch Salesforce account details. Please try again.";
        throw new Error(message);
      }

      setData(payload.data);
      setStatus("success");
    } catch (requestError) {
      setStatus("error");
      setError(
        requestError instanceof Error
          ? requestError.message
          : "An unexpected error occurred while loading account details.",
      );
    }
  }, [email]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    void fetchAccountData();
  }, [fetchAccountData, isLoaded]);

  if (!isLoaded || status === "idle" || status === "loading") {
    return (
      <section className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <Card className="min-h-64 shadow-lg shadow-sky-900/10">
          <CardContent className="flex h-full items-center justify-center p-6">
            <p className="text-sm text-(--muted)">Loading account details from Salesforce...</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <Card className="shadow-lg shadow-sky-900/10">
          <CardContent className="space-y-4 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-red-600">Failed To Load Data</p>
            <p className="text-sm text-(--muted)">{error}</p>
            <Button onClick={() => void fetchAccountData()} className="rounded-xl">
              Retry
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
      <AccountOverview data={data ?? {}} />
      <aside className="space-y-4">
        <Card>
          <CardContent className="p-5 pt-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-(--secondary)">Access State</h2>
            <p className="mt-3 text-sm text-(--muted)">
              Authenticated through Clerk and synced with Salesforce using your session email.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 pt-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-(--secondary)">Data Source</h2>
            <p className="mt-3 text-sm text-(--muted)">
              Contact details are fetched from Salesforce Apex REST (`contactByEmail`) via `/api/user`.
            </p>
          </CardContent>
        </Card>
      </aside>
    </section>
  );
}
