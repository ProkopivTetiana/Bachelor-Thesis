//ProfileSidebar
import React, {
  type Dispatch,
  type FunctionComponent,
  ReactNode,
  useState,
} from "react";

// import { NavLink } from "react-router-dom";

// import { ReactComponent as Bookmark } from "../../../../../assets/bookmark.svg";
// import { ReactComponent as User } from "../../../../../assets/user.svg";
// import { ReactComponent as Clock } from "../../../../../assets/clock.svg";
// import { ReactComponent as Case } from "../../../../../assets/case.svg";
import Logout from "../../../../../assets/logout.png";
import { type UserNameType } from "~/types/UserType";
import Link from "next/link";
import EditIcon from "~/assets/EditIcon";
import SignOutIcon from "~/assets/SignOutIcon";
import PageIcon from "~/assets/PageIcon";
import Avatar from "~/assets/Avatar";
import User from "~/assets/User";
import AvatarFromName, { AvatarSize } from "~/components/AvatarFromName";
// import { UserNameType } from "../../../../../types/UserType";

// import User from "../../../../../assets/user.svg";

type CategorySidebarProps = {
  visible: boolean;
  setVisible: Dispatch<React.SetStateAction<boolean>>;
  profileId?: string;
  profileName: string;
};

const CategorySidebar: FunctionComponent<CategorySidebarProps> = ({
  visible,
  setVisible,
  profileId,
  profileName,
}) => {
  return (
    <div
      className={`
          ${visible ? "fixed flex justify-end" : "hidden"}
          z-20 h-full w-full
        `}
    >
      <div
        className="absolute h-full w-full bg-white opacity-60"
        onClick={() => {
          setVisible(false);
        }}
      ></div>

      <div
        className={`z-30 flex w-2/12 flex-col items-center overflow-auto  bg-white`}
      >
        <div className="flex w-full items-center justify-start gap-4 border-b border-orange-500 px-4 pb-4 pt-8">
          <div className="h-8 w-8">
            <AvatarFromName name={profileName} size={AvatarSize.s} />
          </div>
          <div>{profileName}</div>
        </div>

        <Link
          href={`/profile/${profileId}`}
          className="flex w-full cursor-pointer items-center justify-start gap-4 border-b border-orange-500 px-2 py-4 hover:bg-orange-100"
        >
          <div className="flex cursor-pointer">
            {/* <Avatar /> */}
            <User />
          </div>
          <div className="">Мій профіль</div>
        </Link>

        <Link
          href={`/post-list/user/${profileId}`}
          className="flex w-full cursor-pointer items-center justify-start gap-4 border-b border-orange-500 px-2 py-4 hover:bg-orange-100"
        >
          <div className="flex cursor-pointer">
            <PageIcon />
          </div>
          <div className="">Мої оголошення</div>
        </Link>

        <Link
          href={"/post/create"}
          className="flex w-full cursor-pointer items-center justify-start gap-4 border-b border-orange-500 px-2 py-4 hover:bg-orange-100"
        >
          <div className="flex cursor-pointer">
            <EditIcon />
          </div>
          <div className="">Створити оголошення</div>
        </Link>

        <Link
          href={"/sign-in"}
          className="flex w-full cursor-pointer items-center justify-start gap-4 border-b border-orange-500 px-2 py-4 hover:bg-orange-100"
        >
          <div className="flex cursor-pointer">
            <SignOutIcon />
          </div>
          <div className="">Вихід</div>
        </Link>
      </div>
    </div>
  );
};

export default CategorySidebar;
