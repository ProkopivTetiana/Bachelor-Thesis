import { type NextPage } from "next";
import PostPage from "~/components/templates/PostPage";
import { IPageType } from "~/types/GlobalType";

const Post: NextPage = () => <PostPage type={IPageType.Info} />;

export default Post;
