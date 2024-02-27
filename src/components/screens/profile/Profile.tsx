"use client";
import React from "react";
import styles from "./Profile.module.scss";
import Avatar from "../../ui/avatar/Avatar";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "../../services/user.service";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileAccount from "./profile-account/ProfileAccount";
const Profile = () => {
  const pathname = usePathname();
  const updatePathname = pathname.split("/");

  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <div className={styles.profile__content}>
          <div className={styles.profile__content__left}>
            {updatePathname[3] == "account" && <ProfileAccount />}
          </div>
          <nav className={styles.profile__content__right}>
            <ul className={styles.profile__content__right__list}>
              <li className={styles.profile__content__right__list__item}>
                <Link
                  className={styles.profile__content__right__list__item__link}
                  href={"/"}
                >
                  Аккаунт
                </Link>
              </li>
              <li className={styles.profile__content__right__list__item}>
                <Link
                  className={styles.profile__content__right__list__item__link}
                  href={"/"}
                >
                  Основное
                </Link>
              </li>
              <li className={styles.profile__content__right__list__item}>
                <Link
                  className={styles.profile__content__right__list__item__link}
                  href={"/"}
                >
                  Тема
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Profile;
