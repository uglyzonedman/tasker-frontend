import Image from "next/image";
import React from "react";

interface IImage {
  text?: string;
  borderRadius?: number;
  alt?: string | any;
  width?: number;
  height?: number;
  fz?: number;
  image?: string | any;
}

const ImageComponent = ({
  image,
  borderRadius,
  alt,
  width = 225,
  height = 225,
}: IImage): JSX.Element => {
  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <Image
        src={image}
        alt={alt}
        width={width}
        height={height}
        sizes="100vw"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: `${borderRadius}px`,
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default ImageComponent;
