import React, { useEffect, useState } from "react";

interface TaskProgressBarProps {
  dateString: string;
  isCompleted: boolean;
}

const TaskProgressBar: React.FC<TaskProgressBarProps> = ({
  dateString,
  isCompleted,
}) => {
  const [status, setStatus] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    const getTaskStatus = () => {
      const taskDate = new Date(dateString);
      const currentDate = new Date();
      const timeDiff = taskDate.getTime() - currentDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      if (daysDiff <= 0 && !isCompleted) {
        setPercentage(100);
        setStatus("Task overdue");
      } else if (daysDiff === 1 && !isCompleted) {
        setPercentage(90);
        setStatus("1 day left");
      } else if (daysDiff <= 9 && !isCompleted) {
        const progressPercentage = (daysDiff / 9) * 100;
        setPercentage(progressPercentage);
        setStatus(`${daysDiff} days left`);
      } else if (daysDiff > 9 && !isCompleted) {
        setPercentage(5);
        setStatus("More than 9 days left");
      } else {
        setPercentage(100);
      }
    };

    getTaskStatus();
  }, [dateString, isCompleted]);

  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        height: "auto",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          marginTop: "10px",
          width: `${percentage}%`,
          height: "10px",
          borderRadius: "12px",
          backgroundColor: "#8264fe",
        }}
      ></div>
    </div>
  );
};

export default TaskProgressBar;
