import Link from "next/link";
import React, { type FunctionComponent } from "react";

type PaperProps = {
  children?: React.ReactNode;
  childrenClassName?: string;
  paperClassName?: string;
  title?: string;
  titleClassName?: string;
  navLink?: string;
  isSky?: boolean;
};

const Paper: FunctionComponent<PaperProps> = ({
  children,
  childrenClassName,
  paperClassName,
  title,
  titleClassName,
  navLink,
  isSky,
}) => {
  return (
    <div
      className={`flex flex-col shadow-md ${
        isSky ? "bg-sky-100 shadow-sky-400" : "bg-orange-100 shadow-orange-400"
      }  w-full gap-4 rounded-lg px-8 py-6 ${paperClassName}`}
    >
      {navLink && title && (
        <Link
          href={`/post-list/${navLink}`}
          className={`${
            isSky
              ? "border-sky-400 bg-sky-200"
              : "border-orange-400 bg-orange-200"
          } w-2/12 rounded-full border px-4 py-1 text-center hover:bg-opacity-70 ${titleClassName}`}
        >
          <div className="">{title}</div>
        </Link>
      )}
      {title && !navLink && <div className={``}>{title}</div>}
      <div
        className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${childrenClassName}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Paper;
