Here’s the revised **Spec.md** with the **API Design section removed** and everything else cleanly structured:

# Fullstack Web Application

## 1. Overview

This application is a **secure, authenticated dashboard** built with **Next.js (App Router)** that integrates with **Salesforce** as the backend data source. Users authenticate via **Clerk**, and their account data is fetched from Salesforce and displayed in a responsive UI.

---

## 2. Tech Stack

### Frontend

- **Next.js (App Router)**
- **Tailwind CSS**
- **Shadcn UI**

### Backend / Integration

- **Node.js runtime**
- **Salesforce (via jsforce)**

### Authentication

- **Clerk**

### Monitoring

- **Sentry (Frontend Error Tracking)**

### Language

- **TypeScript**

---

## 3. Functional Requirements

### 3.1 Authentication

- Users authenticate using **Clerk**
- No signup functionality required
- Features:
  - Login via Clerk
  - Logout functionality
  - Session management handled by Clerk

- Protected Routes:
  - `/dashboard` must be restricted to authenticated users

- Unauthorized users:
  - Redirect to login page

---

### 3.2 Dashboard Page

- Default landing page after login: `/dashboard`
- Displays **read-only account details**:

| Field      | Description          |
| ---------- | -------------------- |
| First Name | User’s first name    |
| Last Name  | User’s last name     |
| Email      | User’s email         |
| Phone      | Contact phone number |
| Address    | Full address         |

- No editing functionality
- Clean and structured UI layout

---

### 3.3 Salesforce Integration

- Use **jsforce** for Salesforce communication
- Authentication via **Salesforce Integration User**

#### Flow:

1. Generate authorization token using jsforce
2. Fetch Clerk user's email
3. Query Salesforce:
   - Match `Contact.Email == Clerk User Email`

4. Retrieve associated **Account details**
5. Return mapped data to frontend

#### Example Query (Conceptual):

```sql
SELECT FirstName, LastName, Email, Phone, MailingAddress
FROM Contact
WHERE Email = '<clerk_user_email>'
```

---

### 3.4 Middleware

- Middleware implemented via **Next.js API routes**
- Responsibilities:
  - Validate authentication
  - Attach user session context
  - Handle protected route access

---

### 3.5 Error Handling

- Use **Sentry** for frontend error logging
- Requirements:
  - Capture runtime errors
  - Log exceptions and API failures
  - Do NOT expose sensitive details to users

#### User-facing errors:

- Generic messages:
  - “Something went wrong. Please try again later.”

---

### 3.6 UI/UX

#### Design System

- Tailwind CSS + Shadcn UI components

#### Color Palette

- Primary: `#032d60`
- Secondary: `#0a9dda`
- Others:
  - White
  - Black

#### Features

- Responsive design (mobile + desktop)
- Clean dashboard layout
- Theme support:
  - Light mode (default)
  - Dark mode
  - Toggle switch for theme

---

## 4. Non-Functional Requirements

### Security

- Secure handling of environment variables (`.env`)
- No secrets exposed to client
- Use server-side API routes for Salesforce calls

### Scalability

- Modular architecture
- Separation of concerns (UI, API, services)

### Code Quality

- Clean, maintainable code
- Reusable components
- Proper abstraction layers

### Type Safety

- Full TypeScript support
- Typed API responses and services

---

## 5. Folder Structure (Next.js App Router)

```
/app
  /dashboard
    page.tsx
    layout.tsx
  /login
    page.tsx
  /api
    /salesforce
      route.ts
  /components
    /ui
    /dashboard
  /lib
    clerk.ts
    salesforce.ts
    sentry.ts
  /hooks
  /styles
  layout.tsx
  page.tsx

/middleware.ts

/types
  index.ts

/utils
  helpers.ts

/public

.env
```

### Key Notes:

- `/app/api` → backend logic
- `/lib` → service integrations (Salesforce, Clerk, Sentry)
- `/components` → reusable UI
- `/types` → TypeScript interfaces

---

## 6. Data Flow

### End-to-End Flow

1. User logs in via **Clerk**
2. Clerk authenticates and creates session
3. User is redirected to `/dashboard`
4. Dashboard calls internal API:

   ```
   /api/salesforce
   ```

5. API route:
   - Validates user session
   - Uses jsforce with integration user
   - Queries Salesforce using Clerk email

6. Salesforce returns account data
7. API sends data to frontend
8. UI renders account details
9. User can logout

---

## 7. Edge Cases

### 7.1 Salesforce API Failure

- Handle:
  - Timeout
  - Invalid token
  - Query failure

- Response:
  - Log error in Sentry
  - Return safe fallback message

---

### 7.2 Unauthorized Access

- User not authenticated:
  - Redirect to login

- API access without session:
  - Return `401 Unauthorized`

---

### 7.3 Partial Data

- Missing fields in Salesforce:
  - Display fallback values (e.g., “N/A”)

- Do not break UI rendering

---

## 8. Environment Variables

Example:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

SALESFORCE_USERNAME=
SALESFORCE_PASSWORD=
SALESFORCE_SECURITY_TOKEN=
SALESFORCE_LOGIN_URL=

SENTRY_DSN=
```

---

## 9. Future Enhancements (Optional)

- Edit profile functionality
- Role-based access control
- Caching Salesforce responses
- Pagination for multiple records
- Audit logging

---

## 10. Summary

This application provides a **secure, scalable, and cleanly structured dashboard** with:

- Clerk-based authentication
- Salesforce data integration via jsforce
- Modern UI with Tailwind + Shadcn
- Robust error monitoring via Sentry
- Strong separation of concerns and type safety
