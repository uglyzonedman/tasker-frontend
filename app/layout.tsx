"use client";
import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import LayoutPage from "@/src/components/layout/Layout";
import { Provider } from "react-redux";
import { store } from "@/src/store/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <LayoutPage children={children} />
        </Provider>
      </body>
    </html>
  );
}
