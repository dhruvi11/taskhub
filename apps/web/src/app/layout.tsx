import type { Metadata } from "next";

import "./globals.css";

import ReduxProvider from "@/src/components/providers/ReduxProvider";

export const metadata: Metadata = {
  title: "TaskHub",
  description:
    "TaskHub project and task management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}