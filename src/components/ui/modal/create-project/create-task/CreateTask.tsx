import React, { ChangeEvent, useState } from "react";
import styles from "./CreateTask.module.scss";
import { ProjectService } from "@/src/components/services/project.service";
import { usePathname } from "next/navigation";
import FlagSvg from "../../../svgs/FlagSvg";
import ModalPriorite from "../../modal-priorite/ModalPriorite";
import { priorities } from "@/src/components/consts/priorities";
import DatePicker from "react-datepicker";
import "./CreateTask.css";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import {
  IProjectByIdResponse,
  IProjectResponse,
} from "@/src/interfaces/project.interface";
import "react-datepicker/dist/react-datepicker.css";
interface ICreateTask {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<IProjectByIdResponse, Error>>;
}
const CreateTask = ({ setIsOpen, id, refetch }: ICreateTask) => {
  const pathname = usePathname();
  const updatePathname = pathname.split("/");
  const [isOpenPriorite, setIsOpenPriorite] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("");
  const [endDate, setEndDate] = useState<string>("");
  const [date, setDate] = useState();
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const { mutate } = useMutation({
    mutationFn: () =>
      ProjectService.createTask(id, name, desc, priority, endDate),
    mutationKey: ["create-task"],
    onSuccess: () => {
      refetch();
      setIsOpen(false);
    },
  });

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

  const checkPriorite = (priority: string) => {
    return priorities.find((item) => item.type == priority)?.color;
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
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
      <div className={styles.modal__options}>
        {isOpenPriorite && (
          <div style={{ position: "absolute", top: "10px" }}>
            <ModalPriorite
              priority={priority}
              setPriority={setPriority}
              setIsOpenPriorite={setIsOpenPriorite}
            />
          </div>
        )}
        <div className={styles.modal__options__priority}>
          <p className={styles.modal__options__priority__title}>
            Укажите приоритет
          </p>
          <div className={styles.modal__options__priority__body}>
            <button
              className={styles.modal__options__priority__body__button}
              type="button"
              onClick={() => setIsOpenPriorite((prev) => !prev)}
            >
              <FlagSvg bg={checkPriorite(priority)} />
            </button>
            <p className={styles.modal__options__priority__body__name}>
              {priority}
            </p>
          </div>
        </div>
        <div className={styles.modal__options__datepicker}>
          <p className={styles.modal__options__datepicker__title}>
            Укажите приоритет
          </p>
          <div className={styles.modal__options__priority__body}>
            <DatePicker
              calendarClassName={styles.calendar}
              selected={date}
              onChange={(date: any) => {
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const formattedDate = `${month}/${day}/${year}`;
                setDate(date);
                setEndDate(formattedDate);
              }}
              className={styles.input}
            />
          </div>
        </div>
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
