import type { Metadata } from "next";
import "./globals.css";

import ReduxProvider from "@/src/components/providers/ReduxProvider";

export const metadata: Metadata = {
  title: "TaskHub",
  description: "Task and project management platform",
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