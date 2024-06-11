import { api } from "~/utils/api";
import Layout from "../Layout";
import Link from "next/link";
import TitleSticker from "../TitleSticker";
import { useRouter } from "next/router";
import { IPostListType, type Post } from "~/types/GlobalType";
import { useEffect, useMemo, useState } from "react";
import PostCard from "../PostCard";
import { getCategoryNameById } from "~/utils/selects";
import { useAuthProvider } from "../provider/AuthProvider";

interface PostListPageProps {
  type: IPostListType;
}

const PostListPage = ({ type }: PostListPageProps) => {
  const router = useRouter();
  const { activeUser } = useAuthProvider();
  const { query } = router;
  const [activePostList, setActivePostList] = useState<Post[]>([]);

  const { data: allUserPosts, isLoading: isUserLoading } =
    api.post.getAllUserPosts.useQuery(
      { sort: null, userId: activeUser?.id ?? "1" },
      {
        enabled: type === IPostListType.User,
      },
    );

  const { data: allCategoryPosts, isLoading: isCategoryLoading } =
    api.post.getAllPostsByCategoryId.useQuery(
      { category_id: query.id as string },
      {
        enabled: type === IPostListType.Category,
      },
    );

  const { data: allNewPosts, isLoading: isNewLoading } =
    api.post.getNewPosts.useQuery(
      { count: undefined },
      {
        enabled: type === IPostListType.New,
      },
    );

  const { data: allRecommendedPosts, isLoading: isRecommendedLoading } =
    api.post.getRecommendedPosts.useQuery(
      { count: undefined, userId: activeUser?.id ?? "1" },
      {
        enabled: type === IPostListType.Recommended,
      },
    );

  const isLoading =
    isUserLoading || isCategoryLoading || isNewLoading || isRecommendedLoading;

  useEffect(() => {
    if (type === IPostListType.User && allUserPosts) {
      setActivePostList(allUserPosts);
    } else if (type === IPostListType.Category && allCategoryPosts) {
      setActivePostList(allCategoryPosts);
    } else if (type === IPostListType.New && allNewPosts) {
      setActivePostList(allNewPosts);
    } else if (type === IPostListType.Recommended && allRecommendedPosts) {
      setActivePostList(allRecommendedPosts);
    }
  }, [
    allUserPosts,
    allCategoryPosts,
    allNewPosts,
    allRecommendedPosts,
    isUserLoading,
    isCategoryLoading,
    isNewLoading,
    isRecommendedLoading,
    type,
  ]);

  const title = useMemo(() => {
    switch (type) {
      case IPostListType.New:
        return "Новинки";
      case IPostListType.User:
        return "Мої оголошення";
      case IPostListType.Category:
        return getCategoryNameById(query.id as string);
      case IPostListType.Recommended:
        return "Рекомендації";
      default:
        return "";
    }
  }, [query.id, type]);

  return (
    <Layout>
      {isLoading ? (
        <div>Is Loading ...</div>
      ) : (
        <div className="flex flex-col gap-8 px-8">
          <div className="flex justify-between">
            <TitleSticker text={title} />
            <Link
              href={`/post/create`}
              className="w-[20rem] rounded-full border border-orange-400 bg-orange-200 px-4 py-1 text-center hover:bg-opacity-70"
            >
              Створити оголошення
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {activePostList.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PostListPage;
