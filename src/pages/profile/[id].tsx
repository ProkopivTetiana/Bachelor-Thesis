import { type NextPage } from "next";
import ProfilePage from "~/components/templates/ProfilePage";
import { IPageType } from "~/types/GlobalType";

const Profile: NextPage = () => <ProfilePage type={IPageType.Info} />;

export default Profile;
