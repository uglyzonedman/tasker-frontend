import React, { useState } from "react";
import styles from "../Task.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import MoreSvg from "@/src/components/ui/svgs/MoreSvg";
import Avatar from "@/src/components/ui/avatar/Avatar";
import overplus from "../../../../../assets/overplus.jpg";
import { useSpring, animated, useTransition } from "react-spring";
import {
  IProject,
  IProjectItems,
  IUpdateProject,
} from "@/src/interfaces/project.interface";
import PlusSvg from "@/src/components/ui/svgs/PlusSvg";
import CreateTask from "@/src/components/ui/modal/create-project/create-task/CreateTask";
import ReadySvg from "@/src/components/ui/svgs/ReadySvg";
import useSWRMutation from "swr/mutation";
import { ProjectService } from "@/src/components/services/project.service";
import { useMutation } from "@tanstack/react-query";
import { priorities } from "@/src/components/consts/priorities";
import CalendarSvg from "@/src/components/ui/svgs/CalendarSvg";
import { useGetDaysUntilTask } from "@/src/hooks/hooks";
import TaskStatus from "@/src/components/ui/tasks/task-status/TaskStatus";
import TaskProgressBar from "@/src/components/ui/tasks/task-progress-bar/TaskProgressBar";
import MenuProjectItem from "@/src/components/ui/modal/menus/menu-project-item/MenuProjectItem";
import MenuTask from "@/src/components/ui/modal/menus/menu-task/MenuTask";
import ModalPriorite from "@/src/components/ui/modal/modal-priorite/ModalPriorite";
import FlagSvg from "@/src/components/ui/svgs/FlagSvg";
const TaskItem = ({ Task, id, name, refetch }: IProjectItems) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useMutation({
    mutationKey: ["change-completed"],
    mutationFn: (id: string) => ProjectService.changeTaskCompleted(id),
    onSuccess: () => refetch(),
  });

  const checkColorPriority = (type: string) => {
    return priorities.find((priority) => priority.type == type)?.color;
  };

  const [updateName, setUpdateName] = useState(name);

  const [isUpdateProjectItem, setIsUpdateProjectItem] = useState(false);
  const [isOpenMenuProjectItem, setIsOpenMenuProjectItem] = useState(false);
  const [isOpenMenuTask, setIsOpenMenuTask] = useState<any>(null);
  const [isUpdateTask, setIsUpdateTask] = useState<any>(null);
  const { mutate: mutateUpdateProjectItemName } = useMutation({
    mutationKey: ["update-project-item-name"],
    mutationFn: () => ProjectService.updateProjectItemName(id, updateName),
    onSuccess: () => {
      setIsUpdateProjectItem(false);
      refetch();
    },
  });

  const { mutate: mutateUpdateTask } = useMutation({
    mutationKey: ["update-project-task"],
    mutationFn: ({ id, name, description, priority }: IUpdateProject) =>
      ProjectService.updateTaskById(id, name, description, priority),
    onSuccess: () => {
      setIsUpdateTask(null);
      refetch();
    },
  });

  const [updateTaskName, setUpdateTaskName] = useState<any>("");
  const [updateTaskDescription, setUpdateTaskDescription] = useState("");
  const [updateTaskPriority, setUpdateTaskPriority] = useState("");
  const [isOpenPriorite, setIsOpenPriorite] = useState(false);
  const checkPriorite = (priority: string) => {
    return priorities.find((item) => item.type == priority)?.color;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "365px",
        width: "100%",
        marginRight: "30px",
      }}
    >
      <div className={styles.task__content__items__tasks}>
        <div className={styles.task__content__header}>
          {isUpdateProjectItem ? (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={styles.task__content__header__project}
            >
              <input
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
              />
              <div className={styles.task__content__header__project__buttons}>
                <button
                  onClick={() => mutateUpdateProjectItemName()}
                  className={
                    styles.task__content__header__project__buttons__edit
                  }
                >
                  Изменить
                </button>
                <button
                  className={
                    styles.task__content__header__project__buttons__close
                  }
                  onClick={() => setIsUpdateProjectItem(false)}
                >
                  Отмена
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.h3
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={styles.task__content__items__tasks__header__title}
              >
                {name}
              </motion.h3>
              <button
                onClick={() => setIsOpenMenuProjectItem((prev) => !prev)}
                className={styles.task__content__items__tasks__header__more}
              >
                <MoreSvg />
              </button>
            </>
          )}

          {isOpenMenuProjectItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{ position: "absolute", top: "30px", right: "-60px" }}
            >
              <MenuProjectItem
                id={id}
                setIsOpenMenuProject={setIsOpenMenuProjectItem}
                setIsUpdateProject={setIsUpdateProjectItem}
              />
            </motion.div>
          )}
        </div>
        <AnimatePresence>
          <div className={styles.task__content__items__tasks__body}>
            {Task.map((item) => (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                key={item.id}
              >
                {isUpdateTask == item.id ? (
                  <div
                    className={styles.task__content__items__tasks__body__item}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        value={updateTaskName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setUpdateTaskName(e.target.value)
                        }
                        type="text"
                        className={
                          styles.task__content__items__tasks__body__item__name
                        }
                      />
                      <input
                        value={updateTaskDescription}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setUpdateTaskDescription(e.target.value)
                        }
                        type="text"
                        className={
                          styles.task__content__items__tasks__body__item__description
                        }
                      />
                      <div
                        className={
                          styles.task__content__items__tasks__body__item__priority
                        }
                      >
                        <div
                          className={
                            styles.task__content__items__tasks__body__item__priority__body
                          }
                        >
                          {isOpenPriorite && (
                            <div style={{ position: "absolute", top: "40px" }}>
                              <ModalPriorite
                                priority={updateTaskPriority}
                                setPriority={setUpdateTaskPriority}
                                setIsOpenPriorite={setIsOpenPriorite}
                              />
                            </div>
                          )}
                          <button
                            className={
                              styles.task__content__items__tasks__body__item__priority__body__button
                            }
                            type="button"
                            onClick={() => setIsOpenPriorite((prev) => !prev)}
                          >
                            <FlagSvg bg={checkPriorite(updateTaskPriority)} />
                          </button>
                          <p
                            className={
                              styles.task__content__items__tasks__body__item__priority__body__title
                            }
                          >
                            {updateTaskPriority}
                          </p>
                        </div>
                      </div>
                      <div
                        className={
                          styles.task__content__items__tasks__body__item__buttons
                        }
                      >
                        <button
                          onClick={() =>
                            mutateUpdateTask({
                              id: item.id,
                              name: updateTaskName,
                              description: updateTaskDescription,
                              priority: updateTaskPriority,
                            })
                          }
                          className={
                            styles.task__content__items__tasks__body__item__buttons__edit
                          }
                        >
                          Изменить
                        </button>
                        <button
                          className={
                            styles.task__content__items__tasks__body__item__buttons__close
                          }
                          onClick={() => setIsUpdateTask(null)}
                        >
                          Отмена
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={styles.task__content__items__tasks__body__item}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        mutate(item.id);
                      }}
                      style={{ background: item.isCompleted ? "#ffffff" : "" }}
                      className={
                        styles.task__content__items__tasks__body__item__completed
                      }
                    ></button>
                    <div
                      className={
                        styles.task__content__items__tasks__body__item__info
                      }
                    >
                      <div
                        className={
                          styles.task__content__items__tasks__body__item__info__header
                        }
                      >
                        {item.isCompleted ? (
                          <h3
                            style={{
                              textDecoration: "line-through",
                              color: "#808080",
                            }}
                            className={
                              styles.task__content__items__tasks__body__item__info__name
                            }
                          >
                            {item.name}
                          </h3>
                        ) : (
                          <h3
                            className={
                              styles.task__content__items__tasks__body__item__info__name
                            }
                          >
                            {item.name}
                          </h3>
                        )}
                        <button
                          onClick={() => {
                            setIsOpenMenuTask((prev: any) =>
                              prev == item.id ? null : item.id
                            );
                            setUpdateTaskName(item.name);
                            setUpdateTaskDescription(item.description);
                            setUpdateTaskPriority(item.priority);
                          }}
                          className={
                            styles.task__content__items__tasks__body__item__info__header__more
                          }
                        >
                          <MoreSvg />
                        </button>
                        {isOpenMenuTask == item.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              position: "absolute",
                              marginLeft: "10px",
                              marginTop: "80px",
                            }}
                          >
                            <MenuTask
                              setIsOpenMenuProject={setIsOpenMenuTask}
                              setIsUpdateProject={setIsUpdateTask}
                              id={item.id}
                              setUpdateTaskName={setUpdateTaskName}
                            />
                          </motion.div>
                        )}
                      </div>

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
                          style={{
                            background: checkColorPriority(item.priority),
                          }}
                          className={
                            styles.task__content__items__tasks__body__item__info__footer__right
                          }
                        ></div>
                      </div>
                      <div
                        className={
                          styles.task__content__items__tasks__body__item__info__date
                        }
                      >
                        <CalendarSvg height={16} width={16} />
                        <TaskStatus
                          dateString={item.deadline}
                          isCompleted={item.isCompleted}
                        />
                      </div>
                      <TaskProgressBar
                        dateString={item.deadline}
                        isCompleted={item.isCompleted}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
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
        <CreateTask setIsOpen={setIsOpen} id={id} refetch={refetch} />
      )}
    </div>
  );
};

export default TaskItem;
