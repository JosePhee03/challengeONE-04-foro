import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button";
import CardPost, { SkeletonCardPost } from "../components/CardPost";
import Header from "../components/Header";
import { Icon } from "../components/Icon";
import { TextArea } from "../components/TextArea";
import { UserImage } from "../components/UserImage";
import { getCommentFromPost, getPost } from "../api/post";
import { getTokenStorage } from "../hook/useAuthenticate";
import { Comment, CreateComment, Page, Post } from "../api/api";
import { userStore } from "../store/userStore";
import { createComment } from "../api/comment";
import { CardComment, SkeletonCardComment } from "../components/CardComment";
import { ChangeEvent } from "preact/compat";
import { EmptyMessage } from "../components/EmptyMessage";

interface PostProps {
  postId: number;
}

export default function PostUser({ postId }: PostProps) {
  const [post, setPost] = useState<Post>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState<Page<Comment>>();
  const [directionComments, setDirectionComments] = useState<"ASC" | "DESC">(
    "DESC"
  );

  useEffect(() => {
    setIsLoading(true);
    getPost(getTokenStorage(), postId)
      .then((response) => {
        const postUser = response as Post;
        setPost(postUser);
        fetchComments();
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  const fetchComments = (direction?: "ASC" | "DESC") => {
    setIsLoading(true);
    getCommentFromPost(
      getTokenStorage(),
      postId,
      direction ?? directionComments
    )
      .then((response) => {
        const comments = response as Page<Comment>;
        setComments(comments);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Header variant="secondary" text="Publicación" />
      <main class="flex flex-col px-4 md:px-0 pb-4">
        {isError && (
          <div class="grid h-screen place-content-center bg-base px-4">
            <div class="text-center">
              <h1 class="text-9xl font-black text-heading">404</h1>

              <p class="text-2xl font-bold tracking-tight text-tertiary-text sm:text-4xl">
                Uh-oh!
              </p>

              <p class="mt-4 text-body">La publicación no existe</p>

              <a href="/" class="mt-6 button button-primary ">
                Volver al inicio
              </a>
            </div>
          </div>
        )}
        {!isError && (
          <>
            <section class="pb-2">
              {isLoading && post === undefined && <SkeletonCardPost />}
              {post != undefined && (
                <CardPost post={post} reset={fetchComments} />
              )}
            </section>
            <CommentInput postId={postId} refetchComments={fetchComments} />
            <section class="flex flex-col border-t border-contrast-10 py-4 gap-6">
              <div class="flex ">
                <Button
                  disabled={isLoading}
                  title="Filtrar comentarios por fecha"
                  type="button"
                  variant="tertiary"
                  onClick={() => {
                    setDirectionComments((prev) => {
                      const newDirection = prev === "ASC" ? "DESC" : "ASC";
                      fetchComments(newDirection);
                      return newDirection;
                    });
                  }}
                >
                  {directionComments === "ASC"
                    ? "Más antiguos"
                    : "Más reciente"}
                  <Icon
                    className={directionComments === "ASC" ? "rotate-180" : ""}
                    name="arrow-up-wide-narrow"
                    size="lg"
                  />
                </Button>
              </div>
              {isLoading && <SkeletonCardComment />}
              {comments != undefined &&
                !isLoading &&
                comments.content.map((comment) => (
                  <CardComment comment={comment} reset={fetchComments} />
                ))}
              {comments?.empty && !isLoading && !isError && <EmptyMessage />}
            </section>
          </>
        )}
      </main>
    </>
  );
}

interface CommentInputProps {
  postId: number;
  refetchComments: () => void;
}

const CommentInput = ({ postId, refetchComments }: CommentInputProps) => {
  const [username, setUsername] = useState<string | undefined>(
    userStore.getState().user?.username
  );
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    userStore.subscribe(({ user }) => setUsername(user?.username));
  }, []);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const formEl = event.currentTarget as HTMLFormElement;
    const data = new FormData(formEl);
    const comment: CreateComment = {
      postId,
      content: data.get("textarea-comment") as string,
    };
    setIsLoading(true);
    setIsError(false);
    createComment(getTokenStorage(), comment)
      .then(() => {
        setContent("");
        refetchComments();
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const handleChangeTextarea = (event: ChangeEvent) => {
    const inputEl = event.currentTarget as HTMLInputElement;
    setContent(inputEl.value);
    setIsError(false);
  };

  return (
    <section class="border-t border-contrast-10 py-4 flex gap-2">
      {username == undefined ? (
        <Icon name="user" size="xl" />
      ) : (
        <UserImage size="md" username={username} />
      )}
      <form
        onSubmit={handleSubmit}
        class="flex flex-col items-end gap-2 w-full"
      >
        <TextArea
          onChange={handleChangeTextarea}
          isError={isError}
          className="w-full"
          id="textarea-comment"
          value={content}
          name="textarea-comment"
          placeholder="Responder publicación"
          helperText="El contenido debe tener 8 a 140 caracteres"
        />
        <Button
          className="w-32"
          variant="primary"
          title="Enviar respuesta"
          type="submit"
          disabled={isLoading}
        >
          <div class="flex gap-2 items-center">
            Responder
            {isLoading && (
              <div
                class="inline-block size-5 animate-spin rounded-full border-2 border-solid border-primary-text border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span class="sr-only">Cargando</span>
              </div>
            )}
          </div>
        </Button>
      </form>
    </section>
  );
};
