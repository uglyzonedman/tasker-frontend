"use client";
import React, { useEffect, useState } from "react";
import styles from "./Auth.module.scss";
import EmailSvg from "../../ui/svgs/Email";
import LockSvg from "../../ui/svgs/LockSvg";
import UserSvg from "../../ui/svgs/UserSvg";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { authZustand } from "@/src/store/auth.zustand";
import { IAuthState } from "@/src/interfaces/auth.interface";
import Link from "next/link";

const Auth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState({
    email: "",
    login: "",
    password: "",
  });

  const { login, register } = authZustand((state: IAuthState) => state);
  return (
    <div className={styles.auth}>
      <form
        className={styles.auth__content}
        onSubmit={(e) => {
          e.preventDefault();
          if (pathname.includes("/sign_in")) {
            login(data.email, data.password);
          } else if (pathname.includes("/sign_up")) {
            register(data.email, data.password, data.login);
          }
        }}
      >
        <h3 className={styles.auth__content__title}>
          {pathname.includes("/sign_in") && "Вход"}
          {pathname.includes("/sign_up") && "Регистрация"}
        </h3>
        {pathname.includes("/sign_in") && (
          <div className={styles.auth__content__block}>
            <div className={styles.auth__content__block__item}>
              <EmailSvg />
              <input
                className={styles.auth__content__block__item__input}
                type="text"
                placeholder="Введите почту"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className={styles.auth__content__block__item}>
              <LockSvg />
              <input
                className={styles.auth__content__block__item__input}
                type="password"
                placeholder="Введите пароль"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>
        )}
        {pathname.includes("/sign_up") && (
          <div className={styles.auth__content__block}>
            <div className={styles.auth__content__block__item}>
              <EmailSvg />
              <input
                className={styles.auth__content__block__item__input}
                type="text"
                placeholder="Введите почту"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className={styles.auth__content__block__item}>
              <UserSvg />
              <input
                className={styles.auth__content__block__item__input}
                type="text"
                placeholder="Введите логин"
                onChange={(e) => setData({ ...data, login: e.target.value })}
              />
            </div>
            <div className={styles.auth__content__block__item}>
              <LockSvg />
              <input
                className={styles.auth__content__block__item__input}
                type="password"
                placeholder="Введите пароль"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>
        )}
        {pathname.includes("/sign_in") && (
          <button className={styles.auth__content__block__submit} type="submit">
            Вход
          </button>
        )}
        {pathname.includes("/sign_up") && (
          <button className={styles.auth__content__block__submit} type="submit">
            Регистрация
          </button>
        )}

        {pathname.includes("/sign_in") && (
          <Link
            href={"/auth/sign_up"}
            className={styles.auth__content__block__link}
          >
            Зарегистрироваться
          </Link>
        )}
        {pathname.includes("/sign_up") && (
          <Link
            href={"/auth/sign_in"}
            className={styles.auth__content__block__link}
          >
            Войти
          </Link>
        )}
      </form>
    </div>
  );
};

export default Auth;
