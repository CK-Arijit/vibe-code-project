# vibe-code-project

Salesforce dashboard frontend with Clerk email-code authentication.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env.local
```

Set:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

3. Run development server:

```bash
npm run dev
```

## Authentication behavior

- Login flow is email-only with verification code (no signup, no password, no forgot password).
- `/dashboard` is protected by Clerk middleware and server-side auth guard.
- Failed auth attempts show toast error messages.
