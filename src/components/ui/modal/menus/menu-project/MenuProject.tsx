import React from "react";
import styles from "./MenuProject.module.scss";
import EditSvg from "../../../svgs/EditSvg";
import FavoriteSvg from "../../../svgs/FavoriteSvg";
import { useMutation } from "@tanstack/react-query";
import { ProjectService } from "@/src/components/services/project.service";
import TrashSvg from "../../../svgs/TrashSvg";
import { useRouter } from "next/navigation";
interface IMenuProject {
  id: string | null | undefined;
  isFavorited: boolean | null | undefined;
  setIsUpdateProject: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenMenuProject: React.Dispatch<React.SetStateAction<boolean>>;
}
const MenuProject = ({
  id,
  isFavorited,
  setIsUpdateProject,
  setIsOpenMenuProject,
}: IMenuProject) => {
  const { mutate } = useMutation({
    mutationKey: ["delete-project"],
    mutationFn: () => ProjectService.deleteProjectById(String(id)),
  });
  const router = useRouter();
  return (
    <div className={styles.menu}>
      <div className={styles.menu__content}>
        <button
          onClick={() => {
            setIsUpdateProject(true);
            setIsOpenMenuProject(false);
          }}
        >
          <EditSvg />
          <span>Изменить название</span>
        </button>
        <button>
          <FavoriteSvg />
          <span>
            {isFavorited ? "Убрать из избранного" : "Добавить в избранное"}
          </span>
        </button>
        <button
          onClick={() => {
            mutate();
            router.push("/tasks");
          }}
        >
          <TrashSvg />
          <span>Удалить проект</span>
        </button>
      </div>
    </div>
  );
};

export default MenuProject;
