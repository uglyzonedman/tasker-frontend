"use client";
import React from "react";
import styles from "./Layout.module.scss";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import { usePathname } from "next/navigation";
import Settings from "../ui/modal/settings/Settings";
import { settingsZustand } from "@/src/store/settings.zustand";
import Overlay from "../ui/overlay/Overlay";
interface ILayout {
  children: React.ReactNode;
}

const LayoutPage = ({ children }: ILayout) => {
  const pathname = usePathname();
  return (
    <div className={styles.layout}>
      {pathname.includes("/sign_in") || pathname.includes("/sign_up") ? (
        ""
      ) : (
        <Sidebar />
      )}

      <div className={styles.layout__main}>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default LayoutPage;
