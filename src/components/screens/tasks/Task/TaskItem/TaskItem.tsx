import React from "react";
import styles from "../Task.module.scss";
import MoreSvg from "@/src/components/ui/svgs/MoreSvg";
import Avatar from "@/src/components/ui/avatar/Avatar";
import overplus from "../../../../../assets/overplus.jpg";

const TaskItem = () => {
  return (
    <div className={styles.task__content__items__tasks}>
      <div className={styles.task__content__items__tasks__header}>
        <h3 className={styles.task__content__items__tasks__header__title}>
          Заказы
        </h3>
        <button className={styles.task__content__items__tasks__header__more}>
          <MoreSvg />
        </button>
      </div>
      <div className={styles.task__content__items__tasks__body}>
        <div className={styles.task__content__items__tasks__body__item}>
          <button
            className={
              styles.task__content__items__tasks__body__item__completed
            }
          ></button>
          <div className={styles.task__content__items__tasks__body__item__info}>
            <h3
              className={
                styles.task__content__items__tasks__body__item__info__name
              }
            >
              Добавить тип данных
            </h3>
            <p
              className={
                styles.task__content__items__tasks__body__item__info__description
              }
            >
              Какое-то описание
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
        <div className={styles.task__content__items__tasks__body__item}>
          <button
            className={
              styles.task__content__items__tasks__body__item__completed
            }
          ></button>
          <div className={styles.task__content__items__tasks__body__item__info}>
            <h3
              className={
                styles.task__content__items__tasks__body__item__info__name
              }
            >
              Добавить тип данных
            </h3>
            <p
              className={
                styles.task__content__items__tasks__body__item__info__description
              }
            >
              Какое-то описание
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
        <div className={styles.task__content__items__tasks__body__item}>
          <button
            className={
              styles.task__content__items__tasks__body__item__completed
            }
          ></button>
          <div className={styles.task__content__items__tasks__body__item__info}>
            <h3
              className={
                styles.task__content__items__tasks__body__item__info__name
              }
            >
              Добавить тип данных
            </h3>
            <p
              className={
                styles.task__content__items__tasks__body__item__info__description
              }
            >
              Какое-то описание
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
        <div className={styles.task__content__items__tasks__body__item}>
          <button
            className={
              styles.task__content__items__tasks__body__item__completed
            }
          ></button>
          <div className={styles.task__content__items__tasks__body__item__info}>
            <h3
              className={
                styles.task__content__items__tasks__body__item__info__name
              }
            >
              Добавить тип данных
            </h3>
            <p
              className={
                styles.task__content__items__tasks__body__item__info__description
              }
            >
              Какое-то описание
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
      </div>
    </div>
  );
};

export default TaskItem;
