"use client";
import React, { useState } from "react";
import styles from "./Tasks.module.scss";
import Avatar from "../../ui/avatar/Avatar";
import overplus from "../../../assets/overplus.jpg";
import MoreSvg from "../../ui/svgs/MoreSvg";
import PlusSvg from "../../ui/svgs/PlusSvg";
import PathSvg from "../../ui/svgs/PathSvg";
import Link from "next/link";
import Overlay from "../../ui/overlay/Overlay";
import CreateProject from "../../ui/modal/create-project/CreateProject";
import TasksItem from "./tasks-item/TasksItem";
import useSWR from "swr";
import { ProjectService } from "../../services/project.service";
import SearchSvg from "../../ui/svgs/SearchSvg";
import Line from "../../ui/line/Line";
import { useQuery } from "@tanstack/react-query";
const Tasks = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    data: projectByUser,
    isLoading: isLoadingProjectByUser,
    isRefetching: isRefetchingProjectByUser,
    refetch,
  } = useQuery({
    queryKey: ["project/by-user-id"],
    queryFn: () => ProjectService.getProjectByUserId(),
  });

  const [searchValue, sestSearchValue] = useState("");

  const filteredProjects = isLoadingProjectByUser
    ? []
    : projectByUser?.projects.filter((project) =>
        project.name.toUpperCase().includes(searchValue.toUpperCase())
      );

  return (
    <div className={styles.tasks}>
      {isOpenModal && <Overlay />}
      {isOpenModal && (
        <CreateProject
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          refetch={refetch}
        />
      )}
      <div className={styles.tasks__content}>
        <div className={styles.tasks__content__header}>
          <h3 className={styles.tasks__content__header__title}>Мои проекты</h3>
          <button onClick={() => setIsOpenModal(true)}>
            <PlusSvg />
          </button>
        </div>
        <div className={styles.tasks__content__search}>
          <SearchSvg />
          <input
            onChange={(e) => sestSearchValue(e.target.value)}
            placeholder="Поиск проектов"
            type="text"
          />
        </div>
        <div className={styles.tasks__content__items}>
          <h3 className={styles.tasks__content__items__title}>
            Проектов -{" "}
            {isLoadingProjectByUser ? 0 : projectByUser?.projects.length}
          </h3>
          <Line top="2px" bottom="10px" bg="#3d3d3d" />
          {isLoadingProjectByUser
            ? []
            : filteredProjects?.map((project) => (
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
    </div>
  );
};

export default Tasks;
