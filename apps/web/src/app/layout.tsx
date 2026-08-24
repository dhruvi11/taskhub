import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskHub",
  description: "Task and project management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}