import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-xl shadow-lg shadow-sky-900/10">
        <CardHeader>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-(--secondary)">UI Prototype</p>
          <CardTitle>Salesforce Dashboard Frontend</CardTitle>
          <CardDescription>
            Login and dashboard pages are ready with responsive light/dark mode support.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className={buttonVariants({ size: "lg" })}>
              Go to Login
            </Link>
            <Link href="/dashboard" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Open Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
