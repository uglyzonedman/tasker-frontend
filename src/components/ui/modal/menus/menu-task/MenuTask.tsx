import React from "react";
interface IMenuTask {
  id: string | null | any;
  setIsUpdateProject: React.Dispatch<React.SetStateAction<boolean | null>>;
  setIsOpenMenuProject: React.Dispatch<React.SetStateAction<boolean | null>>;
  setUpdateTaskName: React.Dispatch<React.SetStateAction<string | null>>;
}
import styles from "./MenuTask.module.scss";
import EditSvg from "../../../svgs/EditSvg";
import TrashSvg from "../../../svgs/TrashSvg";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProjectService } from "@/src/components/services/project.service";
const MenuTask = ({
  id,
  setIsOpenMenuProject,
  setIsUpdateProject,
  setUpdateTaskName,
}: IMenuTask) => {
  const pathname = usePathname();
  const updatePathname = pathname.split("/");
  const { refetch } = useQuery({
    queryKey: ["project/by-id"],
    queryFn: () => ProjectService.getProjectItemByIdProject(updatePathname[2]),
  });
  const { mutate } = useMutation({
    mutationKey: ["delete-task"],
    mutationFn: () => ProjectService.deleteTaskById(String(id)),
    onSuccess() {
      refetch();
    },
  });
  return (
    <div className={styles.menu}>
      <div className={styles.menu__content}>
        <button
          onClick={() => {
            setIsUpdateProject(id);
            setIsOpenMenuProject(false);
          }}
        >
          <EditSvg />
          <span>Изменить название</span>
        </button>
        <button
          onClick={() => {
            mutate();
          }}
        >
          <TrashSvg />
          <span>Удалить проект</span>
        </button>
      </div>
    </div>
  );
};

export default MenuTask;
