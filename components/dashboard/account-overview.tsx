import { AccountField } from "@/components/dashboard/account-field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { AccountDetails } from "@/types";

type AccountOverviewProps = {
  data: AccountDetails;
};

export function AccountOverview({ data }: AccountOverviewProps) {
  return (
    <Card className="shadow-lg shadow-sky-900/10">
      <CardHeader className="pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--secondary)">
          Account Details
        </p>
        <CardTitle>Read-only Contact Snapshot</CardTitle>
        <CardDescription>
          Contact information mapped from Salesforce contact data.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Separator className="mb-5" />

        <div className="grid gap-4 sm:grid-cols-2">
          <AccountField label="First Name" value={data.firstName} />
          <AccountField label="Last Name" value={data.lastName} />
          <AccountField label="Email" value={data.email} />
          <AccountField label="Phone" value={data.phone} />
        </div>

        <div className="mt-4">
          <AccountField label="Address" value={data.address} />
        </div>
      </CardContent>
    </Card>
  );
}
