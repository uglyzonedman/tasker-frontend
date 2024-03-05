"use client";
import React from "react";
import styles from "../Profile.module.scss";
import Avatar from "@/src/components/ui/avatar/Avatar";
import { UserService } from "@/src/components/services/user.service";
import { useQuery } from "@tanstack/react-query";
const ProfileAccount = () => {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["get-profile"],
    queryFn: () => UserService.getProfile(),
  });
  return (
    <div>
      <h3 className={styles.profile__content__title}>Профиль</h3>
      <div className={styles.profile__content__avatar}>
        <Avatar
          border={100}
          fz={46}
          height={124}
          width={124}
          login={isLoadingProfile ? "" : profile.login}
          avatar={isLoadingProfile ? "" : profile.avatarPath}
        />
        <div className={styles.profile__content__avatar__settings}>
          <button className={styles.profile__content__avatar__settings__change}>
            Поменять фото
          </button>
          <button className={styles.profile__content__avatar__settings__remove}>
            Удалить фото
          </button>
          <p className={styles.profile__content__avatar__settings__text}>
            Выберите фото размером до 4МБ. Ваш аватар будет виден всем.
          </p>
        </div>
      </div>
      <div className={styles.profile__content__name}>
        <label>Имя</label>
        <input type="text" />
      </div>
    </div>
  );
};

export default ProfileAccount;
