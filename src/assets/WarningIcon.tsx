import React, { type FC } from "react";

interface WarningIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

const WarningIcon: FC<WarningIconProps> = ({
  width = "1.5rem",
  height = "1.5rem",
  color = "#FF524F",
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0002 3.47498C7.292 3.47498 3.47523 7.29176 3.47523 12C3.47523 16.7082 7.292 20.525 12.0002 20.525C16.7085 20.525 20.5252 16.7082 20.5252 12C20.5252 7.29176 16.7085 3.47498 12.0002 3.47498ZM2.19189 12C2.19189 6.58299 6.58323 2.19165 12.0002 2.19165C17.4172 2.19165 21.8086 6.58299 21.8086 12C21.8086 17.417 17.4172 21.8083 12.0002 21.8083C6.58323 21.8083 2.19189 17.417 2.19189 12Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2837 16.5833C11.2837 16.2289 11.571 15.9417 11.9254 15.9417H11.9345C12.2889 15.9417 12.5762 16.2289 12.5762 16.5833C12.5762 16.9377 12.2889 17.225 11.9345 17.225H11.9254C11.571 17.225 11.2837 16.9377 11.2837 16.5833Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9361 6.7749C12.2905 6.7749 12.5778 7.03314 12.5778 7.35168V13.5315C12.5778 13.85 12.2905 14.1082 11.9361 14.1082C11.5817 14.1082 11.2944 13.85 11.2944 13.5315V7.35168C11.2944 7.03314 11.5817 6.7749 11.9361 6.7749Z"
        fill={color}
      />
    </svg>
  );
};

export default WarningIcon;
