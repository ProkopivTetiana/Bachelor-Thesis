// HomePage

import { api } from "~/utils/api";
import Layout from "../Layout";
import Paper from "../Paper";
import Link from "next/link";
import TitleSticker from "../TitleSticker";
import PostCard from "../PostCard";
import { useAuthProvider } from "../provider/AuthProvider";

const HomePage = () => {
  const { activeUser } = useAuthProvider();

  const { data: allNewPosts, isLoading: isNewLoading } =
    api.post.getNewPosts.useQuery({ count: 5 });
  const { data: allRecommendedPosts, isLoading: isRecommendedLoading } =
    api.post.getRecommendedPosts.useQuery({
      count: 5,
      userId: activeUser?.id ?? "1",
    });
  return (
    <Layout>
      <h1>
        Книги - це мости між людьми та світами. Давайте будувати їх разом!
      </h1>
      {/* <TitleSticker text="Книги - це мости між людьми та світами. Давайте будувати їх разом!" /> */}

      <Paper title="Новинки" paperClassName="bg-orange-100" navLink="new">
        {isNewLoading ? (
          <div>Is Loading ...</div>
        ) : (
          <>
            {allNewPosts && allNewPosts?.length > 0 ? (
              allNewPosts.map((item, index) => (
                <PostCard key={index} post={item} />
              ))
            ) : (
              <div>Список пустий</div>
            )}
          </>
        )}
      </Paper>
      <Paper
        title="Рекомендації"
        paperClassName="bg-orange-100"
        navLink="recommended"
        isSky
      >
        {isRecommendedLoading ? (
          <div>Is Loading ...</div>
        ) : (
          <>
            {allRecommendedPosts && allRecommendedPosts?.length > 0 ? (
              allRecommendedPosts.map((item, index) => (
                <PostCard key={index} post={item} />
              ))
            ) : (
              <div>Список пустий</div>
            )}
          </>
        )}
      </Paper>

      <div className="flex flex-col gap-8 pb-8">
        <TitleSticker text="Популярні категорії книг" />
        <div className="flex w-full flex-wrap justify-around gap-8">
          <Link
            href={"/post-list/category/0"}
            className="flex w-3/12 cursor-pointer justify-center rounded-xl border-2 border-dashed border-orange-600 py-4 hover:bg-orange-100"
          >
            Фантастика і фентезі
          </Link>
          <Link
            href={"/post-list/category/1"}
            className="flex w-3/12 cursor-pointer justify-center rounded-xl border-2 border-dashed border-orange-600 py-4 hover:bg-orange-100"
          >
            Детективи
          </Link>
          <Link
            href={"/post-list/category/2"}
            className="flex w-3/12 cursor-pointer justify-center rounded-xl border-2 border-dashed border-orange-600 py-4 hover:bg-orange-100"
          >
            Триллер
          </Link>
          <Link
            href={"/post-list/category/3"}
            className="flex w-3/12 cursor-pointer justify-center rounded-xl border-2 border-dashed border-orange-600 py-4 hover:bg-orange-100"
          >
            Класична проза
          </Link>
          <Link
            href={"/post-list/category/4"}
            className="flex w-3/12 cursor-pointer justify-center rounded-xl border-2 border-dashed border-orange-600 py-4 hover:bg-orange-100"
          >
            Сучасна проза
          </Link>
          <Link
            href={"/post-list/category/5"}
            className="flex w-3/12 cursor-pointer justify-center rounded-xl border-2 border-dashed border-orange-600 py-4 hover:bg-orange-100"
          >
            Романтика
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
