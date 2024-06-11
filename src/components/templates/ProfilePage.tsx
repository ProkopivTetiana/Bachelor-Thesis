// ProfilePage

import { api } from "~/utils/api";
import Layout from "../Layout";
import Paper from "../Paper";
import Link from "next/link";
import TitleSticker from "../TitleSticker";
import { useRouter } from "next/router";
import { IPageType, type User } from "~/types/GlobalType";
import { useEffect, useMemo, useState } from "react";
import ProfileInfo from "../Profile/ProfileInfo";
import ProfileForm from "../Profile/ProfileForm";

const defaultUaer: User = {
  id: "1",
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  contact_info: "",
};

interface ProfilePageProps {
  type: IPageType;
}

const ProfilePage = ({ type }: ProfilePageProps) => {
  const router = useRouter();
  const [activeUser, setActiveUser] = useState<User>(defaultUaer);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { data: user, isLoading } = api.user.getUserById.useQuery(
    {
      user_id: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
    },
  );

  const isInfo = useMemo(() => {
    if (type === IPageType.Info && !isEdit) {
      return true;
    }
    return false;
  }, [type, isEdit]);

  useEffect(() => {
    if (user) {
      setActiveUser(user);
    }
  }, [user]);
  if (!user && type === IPageType.Info) {
    return (
      <Layout>
        <div className="flex w-full items-center justify-center">
          <div>
            <TitleSticker text="404 - User not found" />
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      {isLoading ? (
        <div>Is Loading ...</div>
      ) : (
        <div className="px-24">
          {isInfo ? (
            <ProfileInfo
              activeUser={activeUser}
              // setActiveUser={setActiveUser}
              isCreator={true}
              setIsEdite={setIsEdit}
              //   setIsLoading={setIsLoading}
            />
          ) : (
            <ProfileForm
              activeUser={activeUser}
              isEdit={isEdit}
              setIsEdite={setIsEdit}
            />
          )}
        </div>
      )}
    </Layout>
  );
};

export default ProfilePage;
