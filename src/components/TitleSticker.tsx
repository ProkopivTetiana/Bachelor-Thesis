import React, { type FunctionComponent } from "react";

type TitleStickerProps = {
  text?: string;
};
const TitleSticker: FunctionComponent<TitleStickerProps> = ({ text }) => {
  return (
    <div className="w-full">
      <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-orange-400">
        <span className="relative text-white">{text}</span>
      </span>
    </div>
  );
};

export default TitleSticker;
