import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { LoginCard } from "@/components/auth/login-card";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function LoginPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
        <ThemeToggle />
      </div>
      <LoginCard />
    </main>
  );
}
