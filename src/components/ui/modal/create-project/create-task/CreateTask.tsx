import React, { ChangeEvent, useState } from "react";
import styles from "./CreateTask.module.scss";
import useSWRMutation from "swr/mutation";
import { ProjectService } from "@/src/components/services/project.service";
import { usePathname } from "next/navigation";
import FlagSvg from "../../../svgs/FlagSvg";
import ModalPriorite from "../../modal-priorite/ModalPriorite";
import { priorities } from "@/src/components/consts/priorities";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { IProjectResponse } from "@/src/interfaces/project.interface";
import CalendarSvg from "../../../svgs/CalendarSvg";
interface ICreateTask {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<IProjectResponse, Error>>;
}
const CreateTask = ({ setIsOpen, id, refetch }: ICreateTask) => {
  const pathname = usePathname();
  const updatePathname = pathname.split("/");
  const [isOpenPriorite, setIsOpenPriorite] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("");

  const [value, onChange] = useState(new Date());
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const handleCalendarChange = (date: Date) => {
    onChange(date);
    setIsOpenCalendar(false);
  };

  const { mutate } = useMutation({
    mutationFn: () => ProjectService.createTask(id, name, desc, priority),
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
          <ModalPriorite
            priority={priority}
            setPriority={setPriority}
            setIsOpenPriorite={setIsOpenPriorite}
          />
        )}
        <button
          type="button"
          onClick={() => setIsOpenPriorite((prev) => !prev)}
          className={styles.modal__options__priority}
        >
          <FlagSvg bg={checkPriorite(priority)} />
        </button>
        <button
          type="button"
          onClick={() => {
            setIsOpenCalendar((prev) => !prev);
          }}
          className={styles.modal__options__calendar}
        >
          <CalendarSvg />
        </button>
        {isOpenCalendar && (
          <div
            style={{
              position: "absolute",
              top: "-30px",
              right: "0",
            }}
          >
            <Calendar
              maxDate={new Date()}
              //@ts-ignore
              onChange={handleCalendarChange}
              value={value}
              className={styles.modal__options__calendar__item}
            />
          </div>
        )}
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
