"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { useSignIn } from "@clerk/nextjs/legacy";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type LoginStep = "email" | "code";

function getClerkErrorMessage(error: unknown) {
  if (isClerkAPIResponseError(error) && error.errors.length > 0) {
    return error.errors[0]?.longMessage || error.errors[0]?.message || "Authentication failed.";
  }

  return "Authentication failed. Please try again.";
}

export function LoginCard() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [step, setStep] = useState<LoginStep>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoaded) {
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn.create({
        identifier: email.trim(),
        strategy: "email_code",
      });
      setStep("code");
      toast.success("Verification code sent to your email.");
    } catch (error) {
      toast.error(getClerkErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCodeSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoaded) {
      return;
    }

    setIsSubmitting(true);
    try {
      const attempt = await signIn.attemptFirstFactor({
        code: code.trim(),
        strategy: "email_code",
      });

      if (attempt.status !== "complete" || !attempt.createdSessionId) {
        toast.error("Verification failed. Please try again.");
        return;
      }

      await setActive({ session: attempt.createdSessionId });
      router.replace("/dashboard");
    } catch (error) {
      toast.error(getClerkErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendCode = async () => {
    if (!isLoaded) {
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn.create({
        identifier: email.trim(),
        strategy: "email_code",
      });
      toast.success("A new verification code has been sent.");
    } catch (error) {
      toast.error(getClerkErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md rounded-3xl shadow-xl shadow-sky-900/15">
      <CardHeader>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--secondary)">
          Authentication
        </p>
        <CardTitle>Email Login</CardTitle>
        <CardDescription>
          Enter your work email to receive a one-time verification code. Signup and password login
          are disabled.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {step === "email" ? (
          <form className="space-y-3" onSubmit={handleEmailSubmit}>
            <Input
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <Button type="submit" className="w-full rounded-xl" disabled={isSubmitting || !email.trim()}>
              {isSubmitting ? "Sending code..." : "Send verification code"}
            </Button>
          </form>
        ) : (
          <form className="space-y-3" onSubmit={handleCodeSubmit}>
            <Input
              type="text"
              autoComplete="one-time-code"
              inputMode="numeric"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              required
            />
            <Button type="submit" className="w-full rounded-xl" disabled={isSubmitting || !code.trim()}>
              {isSubmitting ? "Verifying..." : "Verify code"}
            </Button>
            <button
              type="button"
              className={cn(buttonVariants({ variant: "link" }), "h-auto w-full px-0")}
              onClick={resendCode}
              disabled={isSubmitting}
            >
              Resend code
            </button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
