import React, { type FC } from "react";

interface PageIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

const PageIcon: FC<PageIconProps> = ({
  width = "1.5rem",
  height = "1.5rem",
  color = "#14092A",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5467 3.74412V15.8694H19.051V3.74412C19.051 3.3901 18.764 3.10311 18.41 3.10311H5.58982C5.2358 3.10311 4.94881 3.3901 4.94881 3.74412V20.2556C4.94881 20.6096 5.2358 20.8966 5.58982 20.8966H14.0241V22.3923H5.58982C4.40976 22.3923 3.45312 21.4356 3.45312 20.2556V3.74412C3.45312 2.56405 4.40976 1.60742 5.58982 1.60742H18.41C19.5901 1.60742 20.5467 2.56405 20.5467 3.74412Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.16992 7.41044C8.16992 6.99742 8.50474 6.6626 8.91777 6.6626H15.0827C15.4957 6.6626 15.8305 6.99742 15.8305 7.41044C15.8305 7.82347 15.4957 8.15829 15.0827 8.15829H8.91777C8.50474 8.15829 8.16992 7.82347 8.16992 7.41044Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.1709 11.4988C8.1709 11.0858 8.50572 10.751 8.91874 10.751H11.0127C11.4257 10.751 11.7605 11.0858 11.7605 11.4988C11.7605 11.9118 11.4257 12.2467 11.0127 12.2467H8.91874C8.50572 12.2467 8.1709 11.9118 8.1709 11.4988Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5239 17.1194C12.5239 15.6006 13.7551 14.3694 15.2739 14.3694H20.5469V15.8694H15.2739C14.5836 15.8694 14.0239 16.429 14.0239 17.1194V22.3923H12.5239V17.1194Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.015 21.2799L19.4862 14.8087L20.5469 15.8694L14.0239 22.3923L13.015 21.2799Z"
        fill={color}
      />
    </svg>
  );
};
export default PageIcon;
