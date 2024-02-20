"use client";
import React from "react";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import { AiOutlinePercentage } from "react-icons/ai";
import TasksSvg from "../../ui/svgs/TasksSvg";
import ArrowSvg from "../../ui/svgs/ArrowSvg";
import { useAuth } from "@/src/hooks/hooks";
import Avatar from "../../ui/avatar/Avatar";
import LogoutSvg from "../../ui/svgs/LogoutSvg";
import SidebarFooter from "./sidebar-footer/SidebarFooter";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { UserService } from "../../services/user.service";

const Sidebar = () => {
  const SidebarFooter = dynamic(
    () => import("./sidebar-footer/SidebarFooter"),
    {
      ssr: false,
    }
  );

  const { data: profile, isLoading: isLoadingProfile } = useSWR(
    "get-profile",
    () => UserService.getProfile()
  );

  console.log("profile", profile);
  return (
    <aside className={styles.aside}>
      <div className={styles.aside__content}>
        <h3 className={styles.aside__content__title}>TASKER</h3>
        <nav className={styles.aside__content__nav}>
          <div className={styles.aside__content__nav__title}>
            <h3>Страницы</h3>
            <button>
              <ArrowSvg />
            </button>
          </div>
          <ul className={styles.aside__content__nav__list}>
            <li className={styles.aside__content__nav__list__item}>
              <Link
                className={styles.aside__content__nav__list__item__link}
                href={"/tasks"}
              >
                <TasksSvg />
                <span
                  className={styles.aside__content__nav__list__item__link__text}
                >
                  Задачи
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        <SidebarFooter profile={profile} isLoadingProfile={isLoadingProfile} />
      </div>
    </aside>
  );
};

export default Sidebar;
