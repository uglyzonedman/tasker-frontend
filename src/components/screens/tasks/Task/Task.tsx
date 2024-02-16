"use client";
import React, { useEffect, useRef } from "react";
import styles from "./Task.module.scss";
import TaskItem from "./TaskItem/TaskItem";

const Task = () => {
  return (
    <div className={styles.task}>
      <div className={styles.task__content}>
        <h3 className={styles.task__content__title}>KAZFL</h3>
        <div className={styles.task__content__items}>
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </div>
      </div>
    </div>
  );
};

export default Task;
