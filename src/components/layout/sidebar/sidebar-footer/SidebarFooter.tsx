"use client";
import React, { useState } from "react";
import styles from "../Sidebar.module.scss";
import { useAuth } from "@/src/hooks/hooks";
import Avatar from "@/src/components/ui/avatar/Avatar";
import LogoutSvg from "@/src/components/ui/svgs/LogoutSvg";
import Link from "next/link";
import { IProfile } from "@/src/interfaces/user.interface";
import ArrowSvg from "@/src/components/ui/svgs/ArrowSvg";
import Settings from "@/src/components/ui/modal/settings/Settings";
import { settingsZustand } from "@/src/store/settings.zustand";

interface ISideBarFooter {
  profile: IProfile;
  isLoadingProfile: boolean;
}

const SidebarFooter = ({ profile, isLoadingProfile }: ISideBarFooter) => {
  const { user } = useAuth();
  return (
    <div className={styles.aside__content__footer}>
      {user && (
        <div className={styles.aside__content__footer__user}>
          <Link
            href={"/profile"}
            className={styles.aside__content__footer__user__info}
          >
            <Avatar
              border={50}
              fz={18}
              height={42}
              width={42}
              login={isLoadingProfile ? "" : profile.login}
              avatar={isLoadingProfile ? "" : profile.avatarPath}
            />
            <p className={styles.aside__content__footer__user__info__login}>
              {isLoadingProfile ? "" : profile.login}
            </p>
            <button
              className={styles.aside__content__footer__user__info__arrow}
            >
              <ArrowSvg />
            </button>
          </Link>
          <button className={styles.aside__content__footer__user__logout}>
            <LogoutSvg />
            <span className={styles.aside__content__footer__user__logout__span}>
              Выйти
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarFooter;
