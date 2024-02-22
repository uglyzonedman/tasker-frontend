import { priorities } from "@/src/components/consts/priorities";
import React from "react";
import styles from "./ModalPriorite.module.scss";
import FlagSvg from "../../svgs/FlagSvg";
interface IModalPriority {
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  priority: string;
  setIsOpenPriorite: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalPriorite = ({
  setPriority,
  priority,
  setIsOpenPriorite,
}: IModalPriority) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        {priorities.map((priority) => (
          <button
            type="button"
            onClick={() => {
              setPriority(priority.type);
              setIsOpenPriorite(false);
            }}
          >
            <FlagSvg bg={priority.color} />
            <p>{priority.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModalPriorite;
