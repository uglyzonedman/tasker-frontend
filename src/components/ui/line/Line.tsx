import React, { FC } from "react";

interface ILine {
  top: string;
  bottom: string;
  bg?: string;
}
const Line = ({ top, bottom, bg = "#D9DFE0" }: ILine): JSX.Element => {
  return (
    <div
      style={{
        marginTop: top,
        marginBottom: bottom,
        backgroundColor: bg,
        width: "100%",
        height: "1px",
      }}
    ></div>
  );
};

export default Line;
