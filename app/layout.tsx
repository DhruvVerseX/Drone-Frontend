import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AERCTRL | Drone Mission Environment",
  description:
    "An immersive aerospace-grade drone interface built as a cinematic control world."
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
