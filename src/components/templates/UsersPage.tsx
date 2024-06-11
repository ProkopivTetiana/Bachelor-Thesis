// UserPage

import { api } from "~/utils/api";
import Layout from "../Layout";
import Paper from "../Paper";
import Link from "next/link";
import TitleSticker from "../TitleSticker";
import PostCard from "../PostCard";
import { useAuthProvider } from "../provider/AuthProvider";

const UsersPage = () => {
  const { data: allUsers, isLoading: isUserLoading } = api.user.getAll.useQuery(
    {},
  );
  const { activeUser, setActiveUserById } = useAuthProvider();

  return (
    <Layout>
      <Link href={`/profile/create`} className="px-4 ">
        Create user
      </Link>
      <div className="flex flex-col gap-4 px-4">
        {allUsers?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between gap-2 rounded-lg border border-gray-300 bg-white p-4"
          >
            <div className="flex gap-4">
              <div>
                {item.first_name} {item.last_name}
              </div>
              <div>{item.email} </div>
              <div>{item.password} </div>
            </div>
            <div className="flex gap-4">
              {activeUser?.id === item.id && <div>Active</div>}
              <Link href={`/profile/${item.id}`}>View</Link>
              <div
                onClick={() => {
                  setActiveUserById(item.id);
                }}
              >
                Select
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default UsersPage;
