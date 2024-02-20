"use client";
import React from "react";
import ReactDOM from "react-dom";
import styles from "./Overlay.module.scss";
const Overlay = () => {
  return typeof document !== "undefined"
    ? ReactDOM.createPortal(
        <div className={styles.overlay}></div>,
        document.body
      )
    : null;
};

export default Overlay;
