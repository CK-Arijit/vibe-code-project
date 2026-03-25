import { AccountField } from "@/components/dashboard/account-field";
import type { AccountDetails } from "@/types";

type AccountOverviewProps = {
  data: AccountDetails;
};

export function AccountOverview({ data }: AccountOverviewProps) {
  return (
    <section className="rounded-2xl border bg-[var(--surface)] p-5 shadow-lg shadow-sky-900/10 sm:p-6">
      <div className="border-b pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
          Account Details
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[var(--primary)]">Read-only Contact Snapshot</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Contact information will be mapped from Salesforce after backend integration is wired.
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <AccountField label="First Name" value={data.firstName} />
        <AccountField label="Last Name" value={data.lastName} />
        <AccountField label="Email" value={data.email} />
        <AccountField label="Phone" value={data.phone} />
      </div>

      <div className="mt-4">
        <AccountField label="Address" value={data.address} />
      </div>
    </section>
  );
}
