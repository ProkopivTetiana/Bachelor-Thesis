import { api } from "~/utils/api";
import SearchIcon from "~/assets/SearchIcon";
import { type ChangeEvent, useState, useMemo } from "react";
import SearchItem from "./SearchItem";

const SearchInput: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isEmptySearch = useMemo(() => searchTerm === "", [searchTerm]);
  const { data: allPosts, isLoading } = api.post.getAll.useQuery(
    { sort: null },
    {
      enabled: !isEmptySearch,
    },
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPost = allPosts?.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.book_author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative w-1/2">
      <form className="flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder={"Знайти"}
          className={`w-full rounded-2xl border border-orange-300 bg-orange-100 px-6 py-2`}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="flex h-[2.5rem] w-[2.5rem] cursor-pointer items-center justify-center rounded-2xl bg-white hover:bg-orange-100">
          <SearchIcon color="#ea580c" />
        </div>
      </form>

      {!isEmptySearch && (
        <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
          <div className="max-h-[34rem] overflow-y-auto px-4 py-2">
            {isLoading ? (
              <div className="">Завантаження...</div>
            ) : filteredPost && filteredPost.length > 0 ? (
              <>
                {filteredPost.map((post) => (
                  <SearchItem
                    key={post.id}
                    post={post}
                    setSearchTerm={setSearchTerm}
                  />
                ))}
              </>
            ) : (
              <div className="">
                Результатів не знайдено &quot;{searchTerm}&quot;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
