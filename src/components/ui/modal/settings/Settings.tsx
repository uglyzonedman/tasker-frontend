import React from "react";
import ReactDom from "react-dom";
import styles from "./Settings.module.scss";
const Settings = () => {
  return (
    <div className={styles.settings}>
      <div className={styles.settings__content}>
        <div className={styles.settings__content__side}>
          <h3 className={styles.settings__content__side__title}>Настройки</h3>
        </div>
        <div className={styles.settings__content__main}>main</div>
      </div>
    </div>
  );
};

export default Settings;
