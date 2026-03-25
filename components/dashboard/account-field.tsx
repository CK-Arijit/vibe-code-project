import { Card, CardContent } from "@/components/ui/card";

type AccountFieldProps = {
  label: string;
  value?: string | null;
};

export function AccountField({ label, value }: AccountFieldProps) {
  return (
    <Card className="rounded-xl shadow-none">
      <CardContent className="p-4 pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-(--secondary)">{label}</p>
        <p className="mt-2 text-sm font-medium text-(--foreground)">{value?.trim() || "N/A"}</p>
      </CardContent>
    </Card>
  );
}
