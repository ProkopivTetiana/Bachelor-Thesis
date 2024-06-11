import React, { type FunctionComponent, useEffect, useState } from "react";

import Button from "../Button/Button";
// import { ReactComponent as Search } from "../../../assets/search.svg";

import Logo from "../Logo";
import CategorySidebar from "./components/CategorySidebar";

import ProfileSidebar from "./components/ProfileSidebar";
import SearchInput from "./components/SearchInput";
import { useAuthProvider } from "../provider/AuthProvider";
import AvatarFromName from "../AvatarFromName";

type LayoutProps = {
  children?: React.ReactNode;
  childrenClassName?: string;
};

const Layout: FunctionComponent<LayoutProps> = ({
  children,
  childrenClassName,
}) => {
  const { activeUser } = useAuthProvider();

  const [isAuth, setIsAuth] = useState<boolean>(false);
  // const { isAuth } = useTypedSelector((state) => state.auth);
  // const { profile, profileName } = useTypedSelector((state) => state.profile);

  // const navigate = useNavigate();

  const [categorySidebar, setCategorySidebar] = useState<boolean>(false);
  const [profileSidebar, setProfileSidebar] = useState<boolean>(false);
  //  console.log("isAuth: ", isAuth)
  //   const {
  //     searchPostsByNameHandler,
  //     handleSubmit,
  //     register,
  //   } = usePostList();

  // const handleSearchClick = (data: FieldValues) => {
  //   // console.log("data.search", data.search)
  //   // searchPostsByNameHandler(data.search);
  //   // navigate(`/posts/search/${data.search}`);
  // };
  const userFullName = activeUser?.first_name + " " + activeUser?.last_name;

  useEffect(() => {
    if (activeUser) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [activeUser]);

  return (
    <div className="flex">
      <CategorySidebar
        visible={categorySidebar}
        setVisible={setCategorySidebar}
      />

      <div className="flex w-full">
        <div className="z-10 hidden w-full items-center justify-center bg-white px-8 py-4 shadow-lg shadow-gray-100 md:fixed md:flex md:flex-row">
          <div className="flex w-full items-center justify-around gap-4">
            <Logo />
            <div
              className="w-2/12 cursor-pointer rounded-full border border-orange-400 bg-orange-200 py-3 text-center hover:bg-orange-100"
              onClick={() => setCategorySidebar(true)}
            >
              Категорії книг
            </div>
            <SearchInput />

            {/* <img
              className={`w-10 h-10 rounded-full stroke-black fill-black hover:bg-orange-100 cursor-pointer ${
                isAuth ? "flex" : "hidden"
              }`}
              src={User}
              alt=""
              onClick={() => setProfileSidebar(true)}
            /> */}
            {/* <User
              className={`w-10 h-10 rounded-full stroke-black fill-orange-600 hover:bg-orange-100 cursor-pointer ${
                isAuth ? "flex" : "hidden"
              }`}
              // className="w-10 h-10 fill-black hover:stroke-orange-100"
              onClick={() => setProfileSidebar(true)}
            /> */}

            {isAuth ? (
              <div
                className={`flex h-[32px] w-[32px] cursor-pointer items-center justify-center lg:h-[50px] lg:w-[50px]`}
                onClick={() => setProfileSidebar(true)}
              >
                <AvatarFromName name={userFullName} isActive />
              </div>
            ) : (
              <div className={`w-2/12 ${isAuth ? "hidden" : "flex"}`}>
                <Button to={`/sign-in`}>Увійти</Button>
              </div>
            )}
          </div>
        </div>
        <div
          className={`flex w-full flex-col gap-8 px-14 pb-8 pt-28 ${childrenClassName}`}
        >
          {children}
        </div>
      </div>

      <ProfileSidebar
        visible={profileSidebar}
        setVisible={setProfileSidebar}
        profileId={activeUser?.id}
        profileName={userFullName}
      />
    </div>
  );
};

export default Layout;
