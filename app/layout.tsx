"use client";
import "./globals.css";
import LayoutPage from "@/src/components/layout/Layout";
import AuthProvider from "@/src/components/providers/AuthProvider";
import { SWRConfig } from "swr";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SWRConfig>
          <AuthProvider>
            <LayoutPage children={children} />
          </AuthProvider>
        </SWRConfig>
      </body>
    </html>
  );
}
