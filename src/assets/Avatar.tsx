import React, { type FC } from "react";

interface AvatarProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

const Avatar: FC<AvatarProps> = ({ width = "1.5rem", height = "1.5rem" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="#DBE4E1" />
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#ECF0EF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13ZM11.9998 14C8.32695 14 5.23217 16.4751 4.29248 19.8484C6.27724 21.7977 8.9981 23 11.9998 23C15.0015 23 17.7224 21.7977 19.7072 19.8483C18.7674 16.4751 15.6727 14 11.9998 14Z"
        fill="#5D7975"
      />
    </svg>
  );
};

export default Avatar;
