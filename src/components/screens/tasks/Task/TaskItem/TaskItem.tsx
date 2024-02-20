import React, { useState } from "react";
import styles from "../Task.module.scss";
import MoreSvg from "@/src/components/ui/svgs/MoreSvg";
import Avatar from "@/src/components/ui/avatar/Avatar";
import overplus from "../../../../../assets/overplus.jpg";
import { IProject, IProjectItems } from "@/src/interfaces/project.interface";
import PlusSvg from "@/src/components/ui/svgs/PlusSvg";
import CreateTask from "@/src/components/ui/modal/create-project/create-task/CreateTask";

const TaskItem = ({
  Task,
  createdAt,
  description,
  id,
  name,
  updatedAt,
}: IProjectItems) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={styles.task__content__items__tasks}>
        <div className={styles.task__content__items__tasks__header}>
          <h3 className={styles.task__content__items__tasks__header__title}>
            {name}
          </h3>
          <button className={styles.task__content__items__tasks__header__more}>
            <MoreSvg />
          </button>
        </div>
        <div className={styles.task__content__items__tasks__body}>
          {Task.map((item) => (
            <div className={styles.task__content__items__tasks__body__item}>
              <button
                className={
                  styles.task__content__items__tasks__body__item__completed
                }
              ></button>
              <div
                className={styles.task__content__items__tasks__body__item__info}
              >
                <h3
                  className={
                    styles.task__content__items__tasks__body__item__info__name
                  }
                >
                  {item.name}
                </h3>
                <p
                  className={
                    styles.task__content__items__tasks__body__item__info__description
                  }
                >
                  {item.description}
                </p>
                <div
                  className={
                    styles.task__content__items__tasks__body__item__info__footer
                  }
                >
                  <div
                    className={
                      styles.task__content__items__tasks__body__item__info__footer__left
                    }
                  >
                    <Avatar
                      border={50}
                      fz={14}
                      height={28}
                      width={28}
                      login="Majest"
                      avatar={overplus}
                    />
                    <p>Majest228</p>
                  </div>
                  <div
                    className={
                      styles.task__content__items__tasks__body__item__info__footer__right
                    }
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={styles.task__content__items__tasks__body__add}
        >
          <PlusSvg />
          <span>Добавить задачу</span>
        </button>
      ) : (
        <CreateTask setIsOpen={setIsOpen} id={id} />
      )}
    </div>
  );
};

export default TaskItem;
