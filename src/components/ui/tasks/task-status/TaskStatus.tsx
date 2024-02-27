import React, { useEffect, useState } from "react";

interface TaskStatusProps {
  dateString: string;
  isCompleted: boolean;
}

const TaskStatus: React.FC<TaskStatusProps> = ({ dateString, isCompleted }) => {
  const [status, setStatus] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const getTaskStatus = () => {
      const taskDate = new Date(dateString);
      const currentDate = new Date();
      const timeDiff = taskDate.getTime() - currentDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      if (daysDiff < 0 && !isCompleted) {
        setStatus(
          <p style={{ marginLeft: "5px", fontSize: "14px", color: "#d1453b" }}>
            Задача просрочена!
          </p>
        );
      } else if (daysDiff <= 3 && !isCompleted) {
        setStatus(
          <p style={{ marginLeft: "5px", color: "#eb8909", fontSize: "14px" }}>
            Осталось дней до задачи: {daysDiff}
          </p>
        );
      } else if (daysDiff <= 3 && isCompleted) {
        setStatus(
          <p style={{ marginLeft: "5px", color: "#246fe0", fontSize: "14px" }}>
            Задача выполнена!
          </p>
        );
      } else if (daysDiff > 3 && !isCompleted) {
        const options: any = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = taskDate.toLocaleDateString("ru-RU", options);
        setStatus(
          <p style={{ marginLeft: "5px", color: "#fff", fontSize: "14px" }}>
            {formattedDate}
          </p>
        );
      } else if (daysDiff > 3 && isCompleted) {
        setStatus(
          <p style={{ marginLeft: "5px", color: "#246fe0", fontSize: "14px" }}>
            Задача выполнена!
          </p>
        );
      }
    };

    getTaskStatus();
  }, [dateString, isCompleted]);

  return <div>{status}</div>;
};

export default TaskStatus;
