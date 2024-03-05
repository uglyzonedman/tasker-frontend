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
import dynamic from "next/dynamic";
import useSWR from "swr";
import { UserService } from "../../services/user.service";
import { ProjectService } from "../../services/project.service";
import { useQuery } from "@tanstack/react-query";

const Sidebar = () => {
  const SidebarFooter = dynamic(
    () => import("./sidebar-footer/SidebarFooter"),
    {
      ssr: false,
    }
  );
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["get-profile"],
    queryFn: () => UserService.getProfile(),
  });

  const { data: favorite, isLoading: isLoadingFavorite } = useQuery({
    queryKey: ["get-favorite"],
    queryFn: () => ProjectService.favorite(),
  });

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
                href={"/"}
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
        <div className={styles.aside__content__favorite}>
          <h3 className={styles.aside__content__favorite__title}>Избранное</h3>
          <div className={styles.aside__content__favorite__body}>
            {isLoadingFavorite
              ? []
              : favorite?.projects.map((project) => (
                  <Link
                    className={styles.aside__content__favorite__body__item}
                    href={`/tasks/${project.id}`}
                  >
                    <div style={{ background: project.color }}></div>
                    <p>{project.name}</p>
                  </Link>
                ))}
          </div>
        </div>
        <SidebarFooter profile={profile} isLoadingProfile={isLoadingProfile} />
      </div>
    </aside>
  );
};

export default Sidebar;
