type AccountFieldProps = {
  label: string;
  value?: string | null;
};

export function AccountField({ label, value }: AccountFieldProps) {
  return (
    <div className="rounded-xl border border-(--border) bg-(--surface) p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-(--secondary)">{label}</p>
      <p className="mt-2 text-sm font-medium text-(--foreground)">{value?.trim() || "N/A"}</p>
    </div>
  );
}
