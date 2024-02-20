import React, { useState } from "react";
import ReactDom from "react-dom";
import styles from "./CreateProject.module.scss";
import Line from "../../line/Line";
import { Sketch } from "@uiw/react-color";
import useSWRMutation from "swr/mutation";
import { ProjectService } from "@/src/components/services/project.service";
import CloseSvg from "../../svgs/CloseSvg";

interface ICreateProject {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateProject = ({ isOpenModal, setIsOpenModal }: ICreateProject) => {
  const [hex, setHex] = useState("#ffffff");
  const [isOpenColor, setIsOpenColor] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [name, setName] = useState("");

  const { trigger } = useSWRMutation("project/create", () =>
    ProjectService.createProject(name, hex, isFavorited)
  );
  return ReactDom.createPortal(
    <form
      className={styles.modal}
      onSubmit={(e) => {
        e.preventDefault();
        trigger().then(() => {
          setIsOpenModal(false);
        });
      }}
    >
      <div className={styles.modal__header}>
        <h3 className={styles.modal__header__title}>Добавить проект</h3>
        <button
          onClick={() => setIsOpenModal(false)}
          className={styles.modal__header__close}
          type="button"
        >
          <CloseSvg />
        </button>
      </div>
      <Line top="10px" bottom="10px" bg="#ffffff" />
      <div className={styles.modal__content}>
        <div className={styles.modal__content__name}>
          <label htmlFor="">Название*</label>
          <input onChange={(e) => setName(e.target.value)} type="text" />
        </div>
        <div className={styles.modal__content__color}>
          <label htmlFor="">Цвет*</label>
          <button
            type="button"
            className={styles.modal__content__color__change}
            onClick={() => setIsOpenColor((prev) => !prev)}
          >
            <div
              style={{
                background: `${hex}`,
                width: "16px",
                height: "16px",
                borderRadius: "12px",
              }}
            ></div>
            <span className={styles.modal__content__color__change__text}>
              Выбранный цвет - {hex}
            </span>
          </button>
          {isOpenColor && (
            <Sketch
              className={styles.modal__content__color__change__sketch}
              style={{ marginLeft: 20, background: "#1e1e1e" }}
              color={hex}
              onChange={(color: any) => {
                setHex(color.hex);
              }}
            />
          )}
        </div>
        <div className={styles.modal__content__favorite}>
          <h3 className={styles.modal__content__favorite__title}>Избранное</h3>
          <div className={styles.modal__content__favorite__block}>
            <input
              onChange={(e) => setIsFavorited(e.target.checked)}
              type="checkbox"
              id="switch"
            />
            <label htmlFor="switch">Toggle</label>
          </div>
        </div>
        <div className={styles.modal__content__buttons}>
          <button
            type="button"
            className={styles.modal__content__buttons__cancel}
          >
            Отмена
          </button>
          <button type="submit" className={styles.modal__content__buttons__add}>
            Добавить
          </button>
        </div>
      </div>
    </form>,
    document.body
  );
};

export default CreateProject;
