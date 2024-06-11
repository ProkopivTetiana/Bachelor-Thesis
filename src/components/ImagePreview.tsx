// ImagePreview
import React, { useMemo } from "react";
interface ImagePreviewProps {
  src: string;
  isBig?: boolean;
  isSmall?: boolean;
}

const ImagePreview = ({ src, isBig, isSmall }: ImagePreviewProps) => {
  const size = useMemo(() => {
    if (isBig) {
      return `h-[40rem] w-[30rem]`;
    } else if (isSmall) {
      return `h-[10rem] w-[7.5rem]`;
    }
    return "h-[20rem] w-[15rem]";
  }, [isBig, isSmall]);
  return (
    <div
      className={`${size} overflow-hidden rounded-lg border border-gray-300`}
    >
      <img
        src={src}
        alt="Image Preview"
        className="h-full w-full object-contain"
      />
    </div>
  );
};

export default ImagePreview;
