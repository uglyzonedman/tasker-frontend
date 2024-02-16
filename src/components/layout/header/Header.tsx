import React from "react";
import styles from "./Header.module.scss";
import Avatar from "../../ui/avatar/Avatar";
import overplus from "../../../assets/overplus.jpg";
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <h3 className={styles.header__content__title}>Мои проекты</h3>
        <Avatar
          border={50}
          fz={24}
          height={56}
          width={56}
          login="Majest"
          avatar={overplus}
        />
      </div>
    </header>
  );
};

export default Header;
