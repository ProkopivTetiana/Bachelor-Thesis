import { type NextPage } from "next";
import PostListPage from "~/components/templates/PostListPage";
import { IPostListType } from "~/types/GlobalType";

const PostList: NextPage = () => (
  <PostListPage type={IPostListType.Recommended} />
);

export default PostList;
