import React from "react";
import styles from "./MenuProjectItem.module.scss";
import EditSvg from "../../../svgs/EditSvg";
import { usePathname, useRouter } from "next/navigation";
import TrashSvg from "../../../svgs/TrashSvg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProjectService } from "@/src/components/services/project.service";
interface IMenuProject {
  id: string | null | undefined;
  setIsUpdateProject: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenMenuProject: React.Dispatch<React.SetStateAction<boolean>>;
}
const MenuProjectItem = ({
  id,
  setIsUpdateProject,
  setIsOpenMenuProject,
}: IMenuProject) => {
  const pathname = usePathname();
  const updatePathname = pathname.split("/");
  const { refetch } = useQuery({
    queryKey: ["project/by-id"],
    queryFn: () => ProjectService.getProjectItemByIdProject(updatePathname[2]),
  });
  const { mutate } = useMutation({
    mutationKey: ["delete-project"],
    mutationFn: () => ProjectService.deleteProjectItemById(String(id)),
    onSuccess() {
      refetch();
    },
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

export default MenuProjectItem;
