"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Task.module.scss";
import TaskItem from "./TaskItem/TaskItem";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { ProjectService } from "@/src/components/services/project.service";
import PlusSvg from "@/src/components/ui/svgs/PlusSvg";
import useSWRMutation from "swr/mutation";
import { useMutation, useQuery } from "@tanstack/react-query";
import MoreSvg from "@/src/components/ui/svgs/MoreSvg";
import MenuProject from "@/src/components/ui/modal/menus/menu-project/MenuProject";

const Task = () => {
  const pathname = usePathname();
  const [isUpdateProject, setIsUpdateProject] = useState(false);
  const [isOpenMenuProject, setIsOpenMenuProject] = useState(false);
  const [name, setName] = useState<string>("");
  const [updateName, setUpdateName] = useState<string | undefined>("");
  const updatePathname = pathname.split("/");
  const [isOpenCreateProject, setIsOpenCreateProject] = useState(false);

  const {
    data: projectItem,
    isLoading: isLoadingProjectItem,
    refetch,
    isSuccess,
    isRefetching,
    isFetching,
  } = useQuery({
    queryKey: ["project/by-id"],
    queryFn: () => ProjectService.getProjectItemByIdProject(updatePathname[2]),
  });

  const { mutate } = useMutation({
    mutationKey: ["create-project"],
    mutationFn: () => ProjectService.createProjectItem(updatePathname[2], name),
    onSuccess: () => {
      refetch();
      setIsOpenCreateProject(false);
    },
  });

  const { mutate: mutateUpdateProjectName } = useMutation({
    mutationKey: ["update-project-name"],
    mutationFn: () =>
      ProjectService.updateProjectName(projectItem?.project.id, updateName),
    onSuccess: () => {
      setIsUpdateProject(false);
      refetch();
    },
  });
  useEffect(() => {
    setUpdateName(isLoadingProjectItem ? "" : projectItem?.project.name);
  }, [isSuccess, isFetching, isRefetching]);

  return (
    <div className={styles.task}>
      <div className={styles.task__content}>
        <div className={styles.task__content__header}>
          {isUpdateProject ? (
            <div className={styles.task__content__header__name}>
              <input
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
              />
              <div className={styles.task__content__header__buttons}>
                <button
                  onClick={() => mutateUpdateProjectName()}
                  className={styles.task__content__header__buttons__edit}
                >
                  Изменить
                </button>
                <button
                  className={styles.task__content__header__buttons__close}
                  onClick={() => setIsUpdateProject(false)}
                >
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className={styles.task__content__header__title}>
                {isLoadingProjectItem ? [] : projectItem?.project.name}
              </h3>
              <button
                onClick={() => setIsOpenMenuProject((prev) => !prev)}
                className={styles.task__content__header__more}
              >
                <MoreSvg />
              </button>
            </>
          )}

          {isOpenMenuProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                top: "40px",
                right: "-60px",
                zIndex: 99,
              }}
            >
              <MenuProject
                id={isLoadingProjectItem ? null : projectItem?.project.id}
                isFavorited={
                  isLoadingProjectItem ? null : projectItem?.project.isFavorited
                }
                setIsUpdateProject={setIsUpdateProject}
                setIsOpenMenuProject={setIsOpenMenuProject}
              />
            </motion.div>
          )}
        </div>

        {isOpenCreateProject ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
            }}
            className={styles.task__content__items__input}
          >
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название раздела"
            />
            <div className={styles.task__content__items__input__buttons}>
              <button
                type="submit"
                className={styles.task__content__items__input__buttons__add}
              >
                Добавить
              </button>
              <button
                type="button"
                onClick={() => setIsOpenCreateProject(false)}
                className={styles.task__content__items__input__buttons__close}
              >
                Закрыть
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpenCreateProject(true)}
            className={styles.task__content__items__add}
          >
            <PlusSvg />
            <span>Добавить раздел</span>
          </button>
        )}

        <div className={styles.task__content__items}>
          {isLoadingProjectItem
            ? []
            : projectItem?.projectItems.map((item) => (
                <TaskItem
                  createdAt={item.createdAt}
                  description={item.description}
                  id={item.id}
                  name={item.name}
                  updatedAt={item.updatedAt}
                  Task={item.Task}
                  refetch={refetch}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Task;
