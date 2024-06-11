// SearchItem
import { type Dispatch, type SetStateAction } from "react";
import { api } from "~/utils/api";
import { type Post } from "~/types/GlobalType";
import Link from "next/link";
import ImagePreview from "~/components/ImagePreview";
import AvatarFromName, { AvatarSize } from "~/components/AvatarFromName";

interface SearchItemProps {
  post: Post;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const SearchItem = ({ post, setSearchTerm }: SearchItemProps) => {
  const { data: userFullName, isLoading: isNameLoading } =
    api.user.getUserFullNaameById.useQuery({ user_id: post.user_id });
  return (
    <Link
      href={`/post/${post.id}`}
      key={post.id}
      className="flex w-full cursor-pointer gap-4 rounded-lg px-4 py-2 hover:bg-orange-100"
      onClick={() => setSearchTerm("")}
    >
      <div>
        <ImagePreview src={post.photo} isSmall />
      </div>
      <div className="ml-4 flex w-full flex-col justify-between py-2">
        <div className="flex flex-col gap-1">
          <div className="font-semibold">{post.title}</div>
          <div className="text-sm text-gray-500">{post.book_author}</div>
          <div className="text-sm text-gray-600">
            Рік публікації: {post.publication_year}
          </div>
        </div>
        <div className="mt-4 flex w-full items-center justify-between">
          <div className="text-lg text-gray-800">
            {isNameLoading ? (
              "Loading..."
            ) : (
              <div className="flex items-center justify-start gap-2">
                <div className="h-6 w-6">
                  <AvatarFromName name={userFullName} size={AvatarSize.xs} />
                </div>
                <div>{userFullName}</div>
              </div>
            )}
          </div>
          <div className="text-sm text-gray-500">
            Дата створення посту:{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
