import React, { FC } from "react";
import ImageComponent from "./ImageComponent";
import ImageDefault from "./ImageDefault";

export interface IAvatar {
  login?: string;
  avatar?: any;
  border: number;
  width: number;
  height: number;
  fz: number;
}

const Avatar = ({
  avatar,
  login,
  border,
  width,
  height,
  fz,
}: IAvatar): JSX.Element => {
  return (
    <>
      {avatar ? (
        <ImageComponent
          alt="user"
          borderRadius={border}
          width={width}
          height={height}
          image={avatar}
        />
      ) : (
        <ImageDefault
          alt={"user"}
          borderRadius={border}
          text={login}
          fz={fz}
          height={width}
          width={height}
        />
      )}
    </>
  );
};

export default Avatar;
