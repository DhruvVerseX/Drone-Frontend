import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DJI Mavic 3 Pro — Beyond the Frame",
  description:
    "A new perspective on the DJI Mavic 3 Pro. Explore its triple-camera system, take control in an interactive 3D flight lab, and discover every detail."
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
