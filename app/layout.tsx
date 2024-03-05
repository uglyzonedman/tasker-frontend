"use client";
import "./globals.css";
import LayoutPage from "@/src/components/layout/Layout";
import AuthProvider from "@/src/components/providers/AuthProvider";
import Settings from "@/src/components/ui/modal/settings/Settings";
import { settingsZustand } from "@/src/store/settings.zustand";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SWRConfig } from "swr";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <LayoutPage children={children} />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
