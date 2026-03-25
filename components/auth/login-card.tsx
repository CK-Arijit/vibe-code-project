import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function LoginCard() {
  return (
    <Card className="w-full max-w-md rounded-3xl shadow-xl shadow-sky-900/15">
      <CardHeader>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--secondary)">
          Authentication
        </p>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Login is handled by Clerk in the final implementation. Signup is intentionally disabled as
          required by spec.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="space-y-3">
          <Button type="button" className="w-full rounded-xl">
            Continue with Clerk
          </Button>
          <p className="text-center text-xs text-(--muted)">
            UI placeholder only. No authentication logic is connected yet.
          </p>
        </div>

        <div className="rounded-xl border border-(--border) bg-slate-950/5 p-4 dark:bg-white/5">
          <p className="text-sm text-(--muted)">
            After successful login, users are redirected to{" "}
            <span className="font-semibold text-(--foreground)">/dashboard</span>.
          </p>
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: "link" }), "mt-3 px-0")}
          >
            Preview Dashboard UI
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
