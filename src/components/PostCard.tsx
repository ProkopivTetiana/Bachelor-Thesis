import Link from "next/link";
import { type Post } from "~/types/GlobalType";
import ImagePreview from "./ImagePreview";
import AvatarFromName, { AvatarSize } from "./AvatarFromName";
import { api } from "~/utils/api";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { id, title, book_author, description, photo, createdAt, user_id } =
    post;
  const { data: userFullName, isLoading } =
    api.user.getUserFullNaameById.useQuery({ user_id: user_id });
  return (
    <Link
      href={`/post/${id}`}
      className="flex w-full flex-col justify-between gap-2 rounded-lg border border-gray-300 bg-white p-6 shadow-md transition-transform duration-200 hover:scale-105"
    >
      <div className="flex w-full flex-col gap-2">
        <div className="aspect-w-3 aspect-h-4 mb-4 flex justify-center">
          <ImagePreview src={photo} />
        </div>
        <div className="truncate text-xl font-semibold text-gray-800">
          {title}
        </div>
        <div className="text-gray-600">{book_author}</div>
        {/* <div className="text-gray-600">Рік публікації: {publication_year}</div> */}
        <div className="mt-2 line-clamp-3 text-gray-700">{description}</div>
      </div>
      <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
        <div className="flex items-center justify-start gap-2">
          <div className="h-6 w-6">
            <AvatarFromName name={userFullName} size={AvatarSize.xs} />
          </div>
          <div>{userFullName}</div>
        </div>
        <span>Дата створення: {new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </Link>
  );
};

export default PostCard;
