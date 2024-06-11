import { type Dispatch, type FunctionComponent, useState } from "react";

import Logo from "../../Logo";
import { selects } from "~/utils/selects";
import Link from "next/link";

type CategorySidebarProps = {
  visible: boolean;
  setVisible: Dispatch<React.SetStateAction<boolean>>;
};

const CategorySidebar: FunctionComponent<CategorySidebarProps> = ({
  visible,
  setVisible,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  return (
    <div
      className={`
          ${visible ? "fixed flex" : "hidden"}
          z-20 h-full w-full
        `}
    >
      <div
        className={`z-30 flex w-2/12 flex-col items-center overflow-auto  bg-white`}
      >
        <div className="flex w-full flex-col items-center justify-center pb-4 pt-8">
          <Logo />
        </div>
        <div className="w-full border-b border-orange-500 px-2 py-2">
          Категорії книг
        </div>
        {selects?.category?.map((item, index) => (
          <div
            key={index}
            className="flex w-full cursor-pointer justify-center border-b border-orange-500 px-6 py-4 text-center hover:bg-orange-100"
            onClick={() => {
              setActiveCategory(item.name);
            }}
          >
            {item.name}
          </div>
        ))}
      </div>

      <div
        className={`${
          activeCategory ? "flex" : "hidden"
        } z-30 w-2/12 flex-col items-center overflow-auto bg-orange-200`}
      >
        {activeCategory &&
          selects?.category
            ?.find((el) => el.name === activeCategory)
            ?.list.map((item, index) => (
              <div
                key={index}
                className="flex w-full cursor-pointer justify-center border-b border-orange-500 px-6 py-4 text-center hover:bg-orange-100"
                onClick={() => {
                  setVisible(true);
                }}
              >
                <Link href={`/post-list/category/${item.idCategory}`}>
                  {item.name}
                </Link>
              </div>
            ))}
      </div>

      <div
        className="absolute h-full w-full bg-white opacity-60"
        onClick={() => {
          setVisible(false);
          setActiveCategory("");
        }}
      ></div>
    </div>
  );
};

export default CategorySidebar;
