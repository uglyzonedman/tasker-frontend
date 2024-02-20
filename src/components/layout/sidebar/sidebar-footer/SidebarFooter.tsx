import React from "react";
import styles from "../Sidebar.module.scss";
import { useAuth } from "@/src/hooks/hooks";
import Avatar from "@/src/components/ui/avatar/Avatar";
import LogoutSvg from "@/src/components/ui/svgs/LogoutSvg";
import Link from "next/link";
import { IProfile } from "@/src/interfaces/user.interface";

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
          <div className={styles.aside__content__footer__user__info}>
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
          </div>
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
