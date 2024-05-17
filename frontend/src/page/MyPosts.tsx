import Header from "../components/Header";
import { FilterMenu } from "../components/FilterMenu";
import CardPost from "../components/CardPost";
import { Search } from "../components/Search";
import { ButtonsPanel } from "../components/ButtonsPanel";
import { useEffect, useState } from "preact/hooks";
import { Page, Post } from "../api/api";
import {
  initialStateSearchParams,
  searchParamsStore,
} from "../store/searchParamsStore";
import { searchPostByUser } from "../api/post";
import { getTokenStorage } from "../hook/useAuthenticate";
import { ErrorMessage } from "../components/ErrorMessage";
import { EmptyMessage } from "../components/EmptyMessage";
import { BadgesCategories } from "../components/BadgesCategories";

interface MyPostsProps {
  userId: number;
}

export default function MyPosts({ userId }: MyPostsProps) {
  return (
    <>
      <Header variant="primary" />
      <main class="flex flex-col gap-2">
        <section class="flex justify-between space-y-4  flex-wrap px-4 md:px-0">
          <div class="flex w-full flex-col gap-4">
            <div class="flex flex-wrap gap-4 sm:justify-between ">
              <ButtonsPanel />
              <Search />
            </div>
            <FilterMenu />
          </div>

          <BadgesCategories />
        </section>
        <SectionPosts userId={userId} />
      </main>
    </>
  );
}

interface SectionPostsPops {
  userId: number;
}

const SectionPosts = ({ userId }: SectionPostsPops) => {
  const [posts, setPosts] = useState<Page<Post>>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useState(initialStateSearchParams());

  useEffect(() => {
    searchParamsStore.subscribe(({ searchParams }) => {
      setSearchParams(searchParams);
    });
  }, []);

  useEffect(() => {
    fetchPostByUser();
  }, [searchParams]);

  const fetchPostByUser = () => {
    const { categories, direction, status, search } =
      searchParamsStore.getState().searchParams;
    setIsLoading(true);
    setIsError(false);
    searchPostByUser(
      getTokenStorage(),
      userId,
      search,
      direction,
      categories.length === 0 ? undefined : categories,
      status
    )
      .then((response) => {
        const posts = response as Page<Post>;
        setPosts(posts);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <section class="flex flex-col md:gap-4">
      {!isLoading &&
        posts?.content.map((post) => {
          return (
            <a
              key={post.id}
              href={`/post/${post.id}`}
              class="flex flex-col md:border border-contrast-10 p-4 hover:bg-contrast-5 md:rounded"
            >
              <CardPost post={post} reset={fetchPostByUser} />
            </a>
          );
        })}
      {isLoading && (
        <div class="flex w-full flex-col gap-2 justify-center  items-center py-8">
          <div
            class="inline-block size-10 animate-spin rounded-full border-4 border-solid border-primary-text border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span class="sr-only">Cargando</span>
          </div>
          <span class="text-primary-text text-lg">Cargando</span>
        </div>
      )}
      {isError && <ErrorMessage />}
      {posts?.empty && !isLoading && !isError && <EmptyMessage />}
    </section>
  );
};
