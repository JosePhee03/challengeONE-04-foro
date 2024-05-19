import { useCallback, useEffect, useState } from "preact/hooks";
import {
  initialStateSearchParams,
  searchParamsStore,
} from "../store/searchParamsStore";
import { getAllPost } from "../api/post";
import { getTokenStorage } from "../hook/useAuthenticate";
import { Page, Post } from "../api/api";
import { debounce } from "../util/debouce";
import CardPost from "./CardPost";
import { ErrorMessage } from "./ErrorMessage";
import { EmptyMessage } from "./EmptyMessage";

interface SectionPostsProps {
  userId?: number;
}

export function SectionPosts({ userId }: SectionPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEmply, setIsEmply] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useState(initialStateSearchParams());
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [abortController, setAbortController] = useState<AbortController>();

  useEffect(() => {
    const controller = new AbortController();
    setAbortController(controller);

    searchParamsStore.subscribe(({ searchParams }) => {
      setSearchParams(searchParams);
    });

    return () => {
      if (abortController) abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (page !== 0) {
      fetchAllPost();
    }
  }, [page]);

  useEffect(() => {
    setPosts([]);
    setPage(0);
    fetchAllPost();
  }, [searchParams]);

  const handleChangeStatus = (postId: number) => {
    setPosts((posts) => {
      return posts.map((p) => {
        if (p.id === postId) {
          p.status = !p.status;
        }
        return p;
      });
    });
  };

  const handleDeletePost = (postId: Number) => {
    setPosts((posts) => {
      return posts.filter((p) => {
        if (p.id !== postId) {
          return p;
        }
      });
    });
  };

  const fetchAllPost = useCallback(() => {
    let newSignal: AbortSignal | undefined;

    if (abortController && isLoading) {
      abortController.abort();
      const controller = new AbortController();
      newSignal = controller.signal;
      setAbortController(controller);
    } else {
      newSignal = abortController?.signal;
    }

    const { categories, direction, status, search } =
      searchParamsStore.getState().searchParams;
    setIsLoading(true);

    setIsError(false);
    getAllPost(
      getTokenStorage(),
      page,
      search,
      direction,
      categories.length === 0 ? undefined : categories,
      status,
      newSignal,
      userId
    )
      .then((response: any) => {
        const postsResponse = response as Page<Post>;
        setHasMore(!postsResponse.last);
        setIsEmply(postsResponse.empty);
        setPosts((prev) => {
          return [...prev, ...postsResponse.content];
        });
        console.log({ postsResponse, isEmply, hasMore, posts });
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("La solicitud fue cancelada");
        } else setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, abortController]);

  const handleScroll = useCallback(
    debounce(() => {
      if (isLoading || !hasMore) return;
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      setPage((prevPage) => prevPage + 1);
    }, 500),
    [isLoading]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section class="flex flex-col md:gap-4">
      {posts.map((post) => {
        return (
          <a
            key={post.id}
            href={`/post/${post.id}`}
            class="flex flex-col md:border border-contrast-10 p-4 hover:bg-contrast-5 md:rounded"
          >
            <CardPost
              post={post}
              changeStatus={handleChangeStatus}
              deletePostFromList={handleDeletePost}
            />
          </a>
        );
      })}
      {isLoading && (
        <>
          <div class="flex w-full flex-col gap-2 justify-center items-center py-4">
            <div
              class="inline-block size-10 animate-spin rounded-full border-4 border-solid border-primary-text border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span class="sr-only">Cargando</span>
            </div>
            <span class="text-primary-text text-lg">Cargando</span>
          </div>
        </>
      )}
      {isError && <ErrorMessage />}
      {isEmply && !isLoading && !isError && posts.length === 0 && (
        <EmptyMessage />
      )}
      {hasMore && !isEmply && !isLoading && (
        <span class="text-primary-text text-lg text-center py-10">Ver Más</span>
      )}
    </section>
  );
}
