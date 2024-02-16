import React from "react";
import styles from "./ImageDefault.module.scss";

interface IImage {
  text?: string;
  borderRadius?: number;
  alt?: string | any;
  width?: number;
  height?: number;
  fz?: number;
  image?: string | any;
}

const ImageDefault = ({
  text = "",
  borderRadius,
  alt,
  width = 225,
  height = 225,
  fz = 124,
}: IImage): JSX.Element => {
  return (
    <div
      className={styles.image}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: "rgb(101, 170, 221)",
        borderRadius: `${borderRadius}px`,
        objectFit: "cover",
        position: "relative",
      }}
    >
      <p
        className={styles.image__text}
        style={{
          fontSize: `${fz}px`,
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        {text[0]?.toUpperCase()}
      </p>
    </div>
  );
};

export default ImageDefault;
