import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurum Ops | SaaS Dashboard",
  description:
    "A dark-luxury SaaS dashboard for revenue, retention, and account intelligence."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
