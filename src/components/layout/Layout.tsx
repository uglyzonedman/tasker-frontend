"use client";
import React from "react";
import styles from "./Layout.module.scss";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import { usePathname } from "next/navigation";

const LayoutPage = ({ children }) => {
  const pathname = usePathname();
  console.log("Auth", pathname);
  return (
    <div className={styles.layout}>
      {pathname.includes("/sign_in") ? "" : <Sidebar />}

      <div className={styles.layout__main}>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default LayoutPage;