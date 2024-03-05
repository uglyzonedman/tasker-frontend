"use client";
import React from "react";
import styles from "./Profile.module.scss";
import Avatar from "../../ui/avatar/Avatar";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "../../services/user.service";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileAccount from "./profile-account/ProfileAccount";
import { ProjectService } from "../../services/project.service";
import TasksItem from "../tasks/tasks-item/TasksItem";
const Profile = () => {
  const pathname = usePathname();
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["get-profile"],
    queryFn: () => UserService.getProfile(),
  });

  const { data: getProjectByUser, isLoading } = useQuery({
    queryKey: ["get-by-user-id"],
    queryFn: () => ProjectService.getProjectByUserId(),
  });
  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <div className={styles.profile__content}>
          <h3 className={styles.profile__content__title}>Ваши данные</h3>
          <div className={styles.profile__content__info}>
            <div className={styles.profile__content__info__fio}>
              <Avatar
                border={100}
                fz={32}
                height={86}
                width={86}
                login={isLoadingProfile ? "" : profile.login}
                avatar={isLoadingProfile ? "" : profile.avatarPath}
              />
              <div className={styles.profile__content__info__fio__date}>
                <span
                  className={styles.profile__content__info__fio__date__login}
                >
                  {isLoadingProfile ? "" : profile.login}
                </span>
                <span
                  className={styles.profile__content__info__fio__date__email}
                >
                  {isLoadingProfile ? "" : profile.email}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.profile__content__projects}>
            <h3 className={styles.profile__content__projects__title}>
              Ваши проекты
            </h3>
            <div className={styles.profile__content__projects__items}>
              {isLoading
                ? []
                : getProjectByUser?.projects.map((project) => (
                    <TasksItem
                      id={project.id}
                      name={project.name}
                      color={project.color}
                      isFavorited={project.isFavorited}
                      ownerId={project.ownerId}
                      ProjectCollaboratorion={project.ProjectCollaboratorion}
                      ProjectItem={project.ProjectItem}
                    />
                  ))}
            </div>
          </div>
          <div className={styles.profile__content__settings}>
            <h3 className={styles.profile__content__settings__title}>
              Настройки
            </h3>
            <div className={styles.profile__content__settings__change}>
              <button
                className={styles.profile__content__settings__change__dark}
              >
                Темная
              </button>
              <button
                className={styles.profile__content__settings__change__light}
              >
                Светлая
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
