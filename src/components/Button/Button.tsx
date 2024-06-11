import React, { type FunctionComponent, type MouseEventHandler } from "react";
import Arrow from "./assets/arrow.svg";

type ButtonProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  fill?: boolean;
  arrow?: boolean;
  arrowPosition?: "left" | "right";
  className?: string;
  to?: string;
  noSubmit?: boolean;
  onClick?: () => void;
};

/**
 * Кнопка
 *
 * @param {string} children - Все що буде в середині кнопки
 * @param {boolean} disabled - Відключає використання кнопки
 * @param {boolean} fill - Заливає всю кнопку
 * @param {boolean} arrow - Чи є стрілка в кнопці
 * @param {string} arrowPosition - Позиція стрілки, use right or left
 * @param {string} className - Додаткові стилі кнопки
 * @param {string} to - Вказує, куди потрібно перейти по кліку кнопки. Використовується навігація реакту
 * @param {boolean} noSubmit - Не відправляє submit в формі
 */
const Button: FunctionComponent<ButtonProps> = ({
  children,
  disabled,
  fill,
  arrow,
  arrowPosition,
  className,
  to,
  noSubmit,
  onClick,
}) => {
  //border border-orange-600 text-orange-600 hover:bg-orange-100
  const isFill = fill
    ? "bg-orange-500 text-white"
    : "border border-orange-600 bg-orange-100 text-orange-600 hover:text-white hover:bg-orange-600 ";
  const iconFill = fill ? "fill-white" : "fill-orange-600";

  // const navigateTo = (path?: string) => {
  //   return () => {
  //     navigate(path || "", {});
  //   };
  // };

  return (
    <button
      onClick={onClick}
      //type="submit"
      type={`${noSubmit ? "button" : "submit"}`}
      className={`flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl py-3 text-base font-bold ${isFill} 
      ${arrowPosition == "right" ? "flex-row-reverse" : ""} ${className}
      disabled:bg-transparent-gradient
      hover:opacity-90
      active:opacity-80 disabled:cursor-not-allowed disabled:bg-black disabled:bg-opacity-10 disabled:opacity-100
      `}
      disabled={disabled}
    >
      {arrow && (
        <Arrow
          className={`${iconFill} relative bottom-[2px] w-4
        ${arrowPosition == "right" ? "right" : "rotate-180 transform"}`}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
