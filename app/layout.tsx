import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Salesforce Account Dashboard",
  description: "Login and dashboard UI scaffold",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
