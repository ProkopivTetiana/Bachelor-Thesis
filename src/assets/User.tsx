import React, { type FC } from "react";

interface UserProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  fillOpacity?: string;
}

const User: FC<UserProps> = ({
  width = "1.25rem",
  height = "1.25rem",
  color = "#14092A",
  // fillOpacity = "0.3",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 19 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.97449 13.6412C2.86529 12.7504 4.07347 12.25 5.33325 12.25H13.3333C14.593 12.25 15.8012 12.7504 16.692 13.6412C17.5828 14.532 18.0833 15.7402 18.0833 17V19C18.0833 19.4142 17.7475 19.75 17.3333 19.75H1.33325C0.919038 19.75 0.583252 19.4142 0.583252 19V17C0.583252 15.7402 1.0837 14.532 1.97449 13.6412ZM5.33325 13.75C4.4713 13.75 3.64465 14.0924 3.03515 14.7019C2.42566 15.3114 2.08325 16.138 2.08325 17V18.25H16.5833V17C16.5833 16.138 16.2408 15.3114 15.6313 14.7019C15.0219 14.0924 14.1952 13.75 13.3333 13.75H5.33325Z"
        fill={color}
        // fillOpacity={fillOpacity}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.33325 1.75C7.53833 1.75 6.08325 3.20507 6.08325 5C6.08325 6.79493 7.53833 8.25 9.33325 8.25C11.1282 8.25 12.5833 6.79493 12.5833 5C12.5833 3.20507 11.1282 1.75 9.33325 1.75ZM4.58325 5C4.58325 2.37665 6.7099 0.25 9.33325 0.25C11.9566 0.25 14.0833 2.37665 14.0833 5C14.0833 7.62335 11.9566 9.75 9.33325 9.75C6.7099 9.75 4.58325 7.62335 4.58325 5Z"
        fill={color}
        // fillOpacity={fillOpacity}
      />
    </svg>
  );
};

export default User;
