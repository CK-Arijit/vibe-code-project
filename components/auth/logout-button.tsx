"use client";

import { useRouter } from "next/navigation";

import { useClerk } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={async () => {
        await signOut();
        router.replace("/login");
      }}
    >
      Logout
    </Button>
  );
}
