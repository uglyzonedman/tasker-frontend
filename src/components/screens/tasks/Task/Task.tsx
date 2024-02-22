"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Task.module.scss";
import TaskItem from "./TaskItem/TaskItem";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { ProjectService } from "@/src/components/services/project.service";
import PlusSvg from "@/src/components/ui/svgs/PlusSvg";
import useSWRMutation from "swr/mutation";
import { useMutation, useQuery } from "@tanstack/react-query";

const Task = () => {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const updatePathname = pathname.split("/");
  const [isOpenCreateProject, setIsOpenCreateProject] = useState(false);

  const {
    data: projectItem,
    isLoading: isLoadingProjectItem,
    refetch,
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

  return (
    <div className={styles.task}>
      <div className={styles.task__content}>
        <h3 className={styles.task__content__title}>
          {isLoadingProjectItem ? [] : projectItem?.project.name}
        </h3>
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
