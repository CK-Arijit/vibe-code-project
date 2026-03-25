import { AccountOverview } from "@/components/dashboard/account-overview";
import { Card, CardContent } from "@/components/ui/card";
import type { AccountDetails } from "@/types";

const sampleData: AccountDetails = {
  firstName: "Ariana",
  lastName: "Naskar",
  email: "ariana.naskar@example.com",
  phone: "+1 (415) 555-0123",
  address: "415 Market Street, Suite 1200, San Francisco, CA 94105",
};

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <AccountOverview data={sampleData} />
        <aside className="space-y-4">
          <Card>
            <CardContent className="p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-(--secondary)">
                Access State
              </h2>
              <p className="mt-3 text-sm text-(--muted)">
                UI-only mode is active. Clerk session checks and Salesforce queries are not wired yet.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-(--secondary)">
                Data Policy
              </h2>
              <p className="mt-3 text-sm text-(--muted)">
                Read-only account details and fallback support for missing values are represented in this
                frontend scaffold.
              </p>
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  );
}
