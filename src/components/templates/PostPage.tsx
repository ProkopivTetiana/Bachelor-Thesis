import { useState, useEffect, useMemo } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { type Post, IPageType } from "~/types/GlobalType";
import PostInfo from "../Post/PostInfo";
import PostForm from "../Post/PostForm";
import Layout from "../Layout";
import { useAuthProvider } from "../provider/AuthProvider";

const defaultPost: Post = {
  id: "0",
  title: "",
  book_author: "",
  publication_year: "",
  description: "",
  time: "time",
  photo: "",
  createdAt: new Date(),
  view_id: [],
  category_id: [],
  user_id: "",
};

interface PostPageProps {
  type: IPageType;
}

const PostPage = ({ type }: PostPageProps) => {
  const { userId } = useAuthProvider();

  const [activePost, setActivePost] = useState<Post>(defaultPost);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  //   const [isLoading, setIsLoading] = useState<boolean>(false);

  const isCreator = useMemo(() => {
    return userId === activePost.user_id;
  }, [activePost, userId]);

  const isInfo = useMemo(() => {
    if (type === IPageType.Info && !isEdit) {
      return true;
    }
    return false;
  }, [type, isEdit]);

  const router = useRouter();
  const ctx = api.useUtils();

  const { data: posts, isLoading } = api.post.getPostById.useQuery(
    {
      post_id: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
    },
  );

  const { mutate: updatePostView, isPending: isUpdateViewLoading } =
    api.post.updatePostView.useMutation({
      onSuccess: async () => {
        await ctx.post.getPostById.refetch();
      },
      onError: (e) => {
        console.log(e);
      },
    });

  useEffect(() => {
    if (posts) {
      setActivePost(posts);
      if (userId && !posts.view_id.includes(userId)) {
        const updatedViewId = [...posts.view_id, userId];
        updatePostView({
          post_id: posts.id,
          view_id: updatedViewId,
        });
      }
    }
  }, [posts, userId, updatePostView]);

  return (
    <Layout>
      {isLoading ? (
        <div>Is Loading ...</div>
      ) : (
        <div>
          {isInfo ? (
            <PostInfo
              activePost={activePost}
              setActivePost={setActivePost}
              isCreator={isCreator}
              setIsEdite={setIsEdit}
              //   setIsLoading={setIsLoading}
            />
          ) : (
            <PostForm
              activePost={activePost}
              isEdit={isEdit}
              setIsEdite={setIsEdit}
            />
          )}
        </div>
      )}
    </Layout>
  );
};

export default PostPage;
