// ProfileInfo
import { type Dispatch, type SetStateAction, useState, useEffect } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import FormInput from "../FormInput";
import { type FormikErrors, useFormik } from "formik";
import { type User, IPageType } from "~/types/GlobalType";
import ImagePreview from "../ImagePreview";
import { selects } from "~/utils/selects";
import CategorySelector from "../CategorySelector";
import EyeIcon from "~/assets/EyeIcon";
import AvatarFromName, { AvatarSize } from "../AvatarFromName";

interface ProfileInfoProps {
  activeUser: User;
  isCreator: boolean;
  setIsEdite: Dispatch<SetStateAction<boolean>>;
  //   setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const ProfileInfo = ({
  activeUser,
  isCreator,
  setIsEdite,
  //   setIsLoading,
}: ProfileInfoProps) => {
  const router = useRouter();
  const { mutate: deleteUser, isPending } = api.user.deleteUser.useMutation({
    onSuccess: async (user) => {
      void router.push(`/user-list`);
      console.log("delete User:", user);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const getAsterisks = (password: string) => {
    return "*".repeat(password.length);
  };

  return (
    <div className="flex h-full w-full  px-4 sm:px-12">
      {isPending ? (
        <div>Is Loading ...</div>
      ) : (
        <div className="flex h-full w-full flex-col gap-12 rounded-lg border border-gray-300 bg-orange-100 p-8 shadow-md md:flex-row">
          {/* <ImagePreview src={activeUser.photo} isBig /> */}
          <div className="flex w-full flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-start gap-4">
                <AvatarFromName
                  name={`${activeUser.first_name} ${activeUser.last_name}`}
                />
                <div className="text-2xl font-bold text-gray-800">
                  {activeUser.first_name} {activeUser.last_name}
                </div>
              </div>
              <div className="text-lg text-gray-600">
                Email: {activeUser.email}
              </div>
              <div className="text-lg text-gray-600">
                Пароль: {getAsterisks(activeUser.password)}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex h-full items-end text-gray-700">
                Контіктні інформація: {activeUser.contact_info}
              </div>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => setIsEdite(true)}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Редагувати
                </button>
                {isCreator && (
                  <button
                    onClick={() => deleteUser({ user_id: activeUser.id })}
                    className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Видалити
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
