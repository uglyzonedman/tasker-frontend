import React, { ChangeEvent, useState } from "react";
import styles from "./CreateTask.module.scss";
import useSWRMutation from "swr/mutation";
import { ProjectService } from "@/src/components/services/project.service";
import { usePathname } from "next/navigation";

interface ICreateTask {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}
const CreateTask = ({ setIsOpen, id }: ICreateTask) => {
  const pathname = usePathname();
  const updatePathname = pathname.split("/");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const { trigger } = useSWRMutation("create-task", () =>
    ProjectService.createTask(id, name, desc)
  );
  const handleTextareaChangeName = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
  };

  const handleTextareaChangeDesc = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDesc(event.target.value);
  };

  const handleTextareaResize = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = "46px";
    event.target.style.height = event.target.scrollHeight - 4 + "px";
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        trigger();
      }}
      className={styles.modal}
    >
      <div className={styles.modal__name}>
        <textarea
          placeholder="Название"
          className={styles.modal__name__input}
          value={name}
          onChange={handleTextareaChangeName}
          onInput={handleTextareaResize}
        />
      </div>
      <div className={styles.modal__desc}>
        <textarea
          placeholder="Описание"
          className={styles.modal__desc__input}
          value={desc}
          onChange={handleTextareaChangeDesc}
          onInput={handleTextareaResize}
        />
      </div>
      <div className={styles.modal__buttons}>
        <button type="submit" className={styles.modal__buttons__add}>
          Добавить
        </button>
        <button
          type="button"
          className={styles.modal__buttons__close}
          onClick={() => setIsOpen(false)}
        >
          Закрыть
        </button>
      </div>
    </form>
  );
};

export default CreateTask;
