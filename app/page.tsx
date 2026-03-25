import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-2xl border bg-(--surface) p-10 shadow-lg shadow-sky-900/10">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-(--secondary)">
          UI Prototype
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-(--primary)">
          Salesforce Dashboard Frontend
        </h1>
        <p className="mt-3 text-(--muted)">
          Login and dashboard pages are ready with responsive light/dark mode support.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/login"
            className="rounded-xl bg-(--primary) px-5 py-3 text-center font-semibold text-white transition hover:opacity-90"
          >
            Go to Login
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border border-(--border) bg-(--surface) px-5 py-3 text-center font-semibold text-(--foreground) transition hover:bg-black/5 dark:hover:bg-white/5"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
