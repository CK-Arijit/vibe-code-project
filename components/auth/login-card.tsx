import Link from "next/link";

export function LoginCard() {
  return (
    <section className="w-full max-w-md rounded-3xl border bg-[var(--surface)] p-6 shadow-xl shadow-sky-900/15 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
        Authentication
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-[var(--primary)]">Welcome Back</h1>
      <p className="mt-3 text-sm text-[var(--muted)]">
        Login is handled by Clerk in the final implementation. Signup is intentionally disabled as
        required by spec.
      </p>

      <div className="mt-8 space-y-3">
        <button
          type="button"
          className="w-full rounded-xl bg-[var(--primary)] px-4 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Continue with Clerk
        </button>
        <p className="text-center text-xs text-[var(--muted)]">
          UI placeholder only. No authentication logic is connected yet.
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-[var(--border)] bg-slate-950/5 p-4 dark:bg-white/5">
        <p className="text-sm text-[var(--muted)]">
          After successful login, users are redirected to{" "}
          <span className="font-semibold text-[var(--foreground)]">/dashboard</span>.
        </p>
        <Link
          href="/dashboard"
          className="mt-3 inline-block text-sm font-semibold text-[var(--secondary)] hover:underline"
        >
          Preview Dashboard UI
        </Link>
      </div>
    </section>
  );
}
