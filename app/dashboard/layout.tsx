import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b bg-(--surface)/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--secondary)">
              Salesforce Portal
            </p>
            <h1 className="text-lg font-semibold text-(--primary)">Account Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/login"
              className="rounded-lg border border-(--border) px-3 py-2 text-sm font-medium text-(--foreground) transition hover:bg-black/5 dark:hover:bg-white/5"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
