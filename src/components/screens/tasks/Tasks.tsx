import React from "react";
import styles from "./Tasks.module.scss";
import Avatar from "../../ui/avatar/Avatar";
import overplus from "../../../assets/overplus.jpg";
import MoreSvg from "../../ui/svgs/MoreSvg";
import PlusSvg from "../../ui/svgs/PlusSvg";
import PathSvg from "../../ui/svgs/PathSvg";
import Link from "next/link";

const Tasks = () => {
  return (
    <div className={styles.tasks}>
      <div className={styles.tasks__content}>
        <div className={styles.tasks__content__header}>
          <h3 className={styles.tasks__content__header__title}>Мои проекты</h3>
        </div>
        <div className={styles.tasks__content__items}>
          <div className={styles.tasks__content__items__item}>
            <div className={styles.tasks__content__items__item__header}>
              <Link
                href={"/tasks/1"}
                className={styles.tasks__content__items__item__header__title}
              >
                Kazfl
              </Link>
              <div
                className={styles.tasks__content__items__item__header__buttons}
              >
                <button
                  className={
                    styles.tasks__content__items__item__header__buttons__plus
                  }
                >
                  <PlusSvg />
                </button>
                <button
                  className={
                    styles.tasks__content__items__item__header__buttons__more
                  }
                >
                  <MoreSvg />
                </button>
              </div>
            </div>
            <div className={styles.tasks__content__items__item__block}>
              <div
                className={styles.tasks__content__items__item__block__header}
              >
                <h3
                  className={
                    styles.tasks__content__items__item__block__header__title
                  }
                >
                  Создать визуальные кнопки под логин и пароль
                </h3>
              </div>
              <p
                className={
                  styles.tasks__content__items__item__block__description
                }
              >
                ТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТестТест
              </p>
              <div
                className={styles.tasks__content__items__item__block__footer}
              >
                <button
                  className={
                    styles.tasks__content__items__item__block__footer__share
                  }
                  type="button"
                >
                  <PathSvg />
                </button>
                <div
                  className={
                    styles.tasks__content__items__item__block__footer__users
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
                  <Avatar
                    border={50}
                    fz={14}
                    height={28}
                    width={28}
                    login="Majest"
                    avatar={overplus}
                  />
                  <div
                    className={
                      styles.tasks__content__items__item__block__footer__users__count
                    }
                  >
                    <span>+2</span>
                  </div>
                </div>
                <div
                  className={
                    styles.tasks__content__items__item__block__footer__status
                  }
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
