import React from "react";
import styles from "../Tasks.module.scss";
import Link from "next/link";
import PlusSvg from "@/src/components/ui/svgs/PlusSvg";
import MoreSvg from "@/src/components/ui/svgs/MoreSvg";
import PathSvg from "@/src/components/ui/svgs/PathSvg";
import Avatar from "@/src/components/ui/avatar/Avatar";
import overplus from "../../../../assets/overplus.jpg";
import { IProjectItems } from "@/src/interfaces/project.interface";
import Line from "@/src/components/ui/line/Line";

interface ITaskItem {
  name: string;
  color: string;
  ownerId: string;
  isFavorited: boolean;
  id: string;
  ProjectCollaboratorion: any;
  ProjectItem: IProjectItems[];
}

const TasksItem = ({
  id,
  name,
  color,
  ownerId,
  isFavorited,
  ProjectCollaboratorion,
  ProjectItem,
}: ITaskItem) => {
  return (
    <Link href={`tasks/${id}`} className={styles.tasks__content__items__item}>
      <div className={styles.tasks__content__items__item__body}>
        <div className={styles.tasks__content__items__item__body__left}>
          <div
            style={{ background: color }}
            className={styles.tasks__content__items__item__body__circle}
          ></div>
          <h3 className={styles.tasks__content__items__item__body__title}>
            {name}
          </h3>
        </div>
        <button className={styles.tasks__content__items__item__body__right}>
          <MoreSvg />
        </button>
      </div>
    </Link>
  );
};

export default TasksItem;
