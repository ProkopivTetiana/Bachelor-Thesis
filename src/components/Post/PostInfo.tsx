// PostInfo
import { type Dispatch, type SetStateAction } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { type Post } from "~/types/GlobalType";
import ImagePreview from "../ImagePreview";
import CategorySelector from "../CategorySelector";
import EyeIcon from "~/assets/EyeIcon";
import AvatarFromName, { AvatarSize } from "../AvatarFromName";

interface PostInfoProps {
  activePost: Post;
  setActivePost: Dispatch<SetStateAction<Post>>;
  isCreator: boolean;
  setIsEdite: Dispatch<SetStateAction<boolean>>;
}

const PostInfo = ({
  activePost,
  setActivePost,
  isCreator,
  setIsEdite,
}: PostInfoProps) => {
  const router = useRouter();
  const { data: userFullName, isLoading: isNameLoading } =
    api.user.getUserFullNaameById.useQuery({ user_id: activePost.user_id });
  const { data: userContactInfo, isLoading: isContactInfoLoading } =
    api.user.getUserContactInfoById.useQuery({ user_id: activePost.user_id });
  const { mutate: deletePost, isPending } = api.post.deletePost.useMutation({
    onSuccess: async (post) => {
      void router.push(`/post-list/user/${post.user_id}`);
      console.log("delete post:", post);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <div className="flex h-full w-full  px-4 sm:px-12">
      {isPending ? (
        <div>Is Loading ...</div>
      ) : (
        <div className="flex h-full w-full flex-col gap-12 rounded-lg border border-gray-300 bg-orange-100 p-8 shadow-md md:flex-row">
          <ImagePreview src={activePost.photo} isBig />
          <div className="flex flex-col justify-between gap-4 md:w-2/3">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="text-2xl font-bold text-gray-800">
                  {activePost.title}
                </div>
                <div className="flex items-center gap-2">
                  {activePost.view_id.length}
                  <EyeIcon color="#ea580c" />
                </div>
              </div>
              <div className="text-lg text-gray-600">
                {activePost.book_author}
              </div>
              <div className="text-lg text-gray-600">
                Рік публікації: {activePost.publication_year}
              </div>
              <div className="whitespace-pre-line text-gray-700">
                {activePost.description}
              </div>
              <CategorySelector
                selectedCategories={activePost.category_id}
                isInfo
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="mt-4 flex flex-col">
                <div className="text-lg text-gray-800">
                  {isNameLoading ? (
                    "Loading..."
                  ) : (
                    <div className="flex items-center justify-start gap-2">
                      <div className="h-6 w-6">
                        <AvatarFromName
                          name={userFullName}
                          size={AvatarSize.xs}
                        />
                      </div>
                      <div>{userFullName}</div>
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Дата створення посту:{" "}
                  {new Date(activePost.createdAt).toLocaleDateString()}
                </div>
              </div>
              {isCreator ? (
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => setIsEdite(true)}
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    Редагувати
                  </button>

                  <button
                    onClick={() => deletePost({ post_id: activePost.id })}
                    className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Видалити
                  </button>
                </div>
              ) : (
                <div className="flex h-full items-end text-orange-400">
                  Контіктні інформація:: {userContactInfo}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
