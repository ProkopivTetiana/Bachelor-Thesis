import { useMemo } from "react";
import Avatar from "~/assets/Avatar";

export enum AvatarSize {
  xs = "xs", // 24px
  s = "s", // 32px
  m = "m", // 40px
  l = "l", // 48px
  xl = "xl", // 56px
  xxl = "xxl", // 64px
}

const sizes: {
  [key in AvatarSize]: { size: string; text: string; iconSize: string };
} = {
  xs: {
    size: "6",
    text: "xs",
    iconSize: "1.5rem",
  },
  s: {
    size: "8",
    text: "sm",
    iconSize: "2rem",
  },
  m: {
    size: "10",
    text: "base",
    iconSize: "2.5rem",
  },
  l: {
    size: "12",
    text: "lg",
    iconSize: "3rem",
  },
  xl: {
    size: "14",
    text: "xl",
    iconSize: "3.5rem",
  },
  xxl: {
    size: "16",
    text: "2xl",
    iconSize: "4rem",
  },
};

interface IAvatarFromNameProps {
  name?: string;
  size?: AvatarSize;
  background?: string;
  isActive?: boolean;
}

const AvatarFromName = ({
  name = "",
  size = AvatarSize.m,
  background,
  isActive,
}: IAvatarFromNameProps) => {
  const letters = useMemo(() => {
    if (!name) {
      return "";
    }

    const letters = [];
    const words = name.split(" ");
    if (words[0]) {
      letters.push(words[0].charAt(0));
    }

    if (words[1]) {
      letters.push(words[1].charAt(0));
    }

    return letters.join("").toLocaleUpperCase();
  }, [name]);

  const circleSize = useMemo(() => {
    return `h-${sizes[size].size} w-${sizes[size].size}`;
  }, [size]);

  const textSize = useMemo(() => {
    return `text-${sizes[size].text}`;
  }, [size]);

  const avatarSize = useMemo(() => {
    return sizes[size].iconSize;
  }, [size]);

  const active = useMemo(() => {
    return isActive ? "hover:bg-orange-200" : "";
  }, [isActive]);

  if (!name) {
    return <Avatar width={avatarSize} height={avatarSize} />;
  }

  return (
    <div
      style={{ background }}
      className={`flex shrink-0 items-center justify-center rounded-full border-[1px] border-orange-400 bg-orange-100 text-orange-400  
        ${circleSize} 
        ${textSize} 
        ${active}
      `}
    >
      {letters}
    </div>
  );
};

export default AvatarFromName;
