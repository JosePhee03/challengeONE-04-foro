import { route } from "preact-router";
import { Post } from "../api/api";
import { searchParamsStore } from "../store/searchParamsStore";
import { textDate } from "../util/getTimeFromString";
import Badge from "./Badge";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { UserImage } from "./UserImage";
import { userStore } from "../store/userStore";
import { DropDown } from "./DropDown";
import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";
import { useState } from "preact/hooks";
import { Alert } from "./Alert";
import { deletePost, updateStatusFromPost } from "../api/post";
import { getTokenStorage } from "../hook/useAuthenticate";

interface CardPostProps {
  post: Post;
  deletePostFromList?: (postId: number) => void;
  changeStatus?: (postId: number) => void;
  reset?: () => void;
}

export default function CardPost({
  post,
  changeStatus,
  deletePostFromList,
}: CardPostProps) {
  const [deleteError, setDeleteError] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const setCategoriesSearchParams = (idCategory: number) => {
    const { setCategories } = searchParamsStore.getState();
    setCategories([idCategory]);
  };

  return (
    <>
      <Alert
        isOpen={deleteSuccess}
        type="success"
        text="Publicación eliminada con éxito"
      />
      <Alert
        isOpen={deleteError}
        type="error"
        text="Error al eliminar la publicación"
      ></Alert>
      <Alert
        isOpen={deleteLoading}
        type="loading"
        text="Eliminando publicación"
      ></Alert>
      <article class="flex flex-col rounded">
        <header class="flex flex-col gap-2 ">
          <div class="flex justify-between gap-2 items-center">
            <UserImage size="md" username={post.author.username} />
            <div class="flex-1">
              <h4 class="font-medium text-sm text-heading">
                {post.author.username}
              </h4>
              <p class="text-xs text-secondary-text">
                {textDate(post.dateCreated)}
              </p>
            </div>
            {userStore.getState().user?.id === post.author.id && (
              <div
                onClick={(ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();
                }}
              >
                <DropDown
                  button={
                    <Button
                      ariaControls={`popover-post-${post.id}${post.author.id}`}
                      ariaExpanded={false}
                      ariaHaspopup={true}
                      id={`button-post-${post.id}${post.author.id}`}
                      title="Opciones de la publicación"
                      type="button"
                      variant="tertiary"
                    >
                      <Icon
                        name="more-vertical"
                        size="lg"
                        fillColor="fill-current"
                      />
                    </Button>
                  }
                  buttonId={`button-post-${post.id}${post.author.id}`}
                  inputId={`button-post-${post.id}${post.author.id}`}
                >
                  <Menu
                    buttonId={`button-post-${post.id}${post.author.id}`}
                    popoverId={`popover-post-${post.id}${post.author.id}`}
                  >
                    <MenuItem
                      type="button"
                      text="Eliminar Publicación"
                      icon="trash"
                      textColor="text-error-text"
                      onClick={() => {
                        setDeleteSuccess(false);
                        setDeleteError(false);
                        setDeleteLoading(true);
                        deletePost(getTokenStorage(), post.id)
                          .then(() => {
                            setDeleteSuccess(true);
                            setTimeout(() => {
                              if (deletePostFromList)
                                deletePostFromList(post.id);
                              setDeleteSuccess(false);
                            }, 500);
                          })
                          .catch(() => {
                            setDeleteError(true);
                            setTimeout(() => {
                              setDeleteError(false);
                            }, 500);
                          })
                          .finally(() => setDeleteLoading(false));
                      }}
                    />
                  </Menu>
                </DropDown>
              </div>
            )}
          </div>
          <span class="flex flex-wrap gap-2">
            {post.categories.map((b) => (
              <Badge
                name={b.name}
                key={b.id}
                title={`Buscar la categoria ${b.name}`}
                onClick={(ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();
                  if (!location.pathname.startsWith("/myposts")) {
                    route("/");
                  }
                  setCategoriesSearchParams(b.id);
                }}
              />
            ))}
          </span>
        </header>
        <section class="flex flex-col gap-1 py-4">
          <h2 class="text-lg font-medium text-heading">{post.title}</h2>
          <p class="text-body">{post.content}</p>
        </section>
        <footer class="flex justify-between border-t border-contrast-10 pt-2">
          <div class="flex gap-2 items-center text-icon-color">
            <Icon name="message" size="lg" />
            {post.totalComments}
          </div>
          <StatusPostContent
            postId={post.id}
            status={post.status}
            userId={post.author.id}
            changeStatus={changeStatus}
          />
        </footer>
      </article>
    </>
  );
}

interface StatusPostContentProps {
  userId: number;
  status: boolean;
  postId: number;
  changeStatus?: (postId: number) => void;
}

const StatusPostContent = ({
  userId,
  status,
  postId,
  changeStatus,
}: StatusPostContentProps) => {
  const [updateError, setUpdateError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  if (userStore.getState().user?.id === userId) {
    return (
      <>
        <Alert
          isOpen={updateSuccess}
          type="success"
          text="Estado de la publicación cambiada con éxito"
        />
        <Alert
          isOpen={updateError}
          type="error"
          text="Error al cambiar el estado de la publicación"
        ></Alert>
        <Alert
          isOpen={updateLoading}
          type="loading"
          text="Cambiando el estado de la publicación"
        ></Alert>
        <button
          title="Cambiar el estado de la publicación"
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            setUpdateSuccess(false);
            setUpdateError(false);
            setUpdateLoading(true);
            updateStatusFromPost(getTokenStorage(), postId, !status)
              .then(() => {
                setUpdateSuccess(true);
                setTimeout(() => {
                  if (changeStatus) changeStatus(postId);
                }, 500);
              })
              .catch(() => {
                setUpdateError(true);
                setTimeout(() => {
                  setUpdateError(false);
                }, 500);
              })
              .finally(() => setUpdateLoading(false));
          }}
          class="group flex text-sm gap-2 text-primary-text items-center"
        >
          {status ? "Resuelto" : "Sin Resolver"}
          <span
            class={`flex ${
              status ? "bg-primary" : "bg-contrast-5"
            } rounded-full justify-center items-center size-8 group-hover:bg-primary`}
          >
            <Icon
              name="check"
              size="lg"
              strokeColor={status ? "stroke-white" : "stroke-primary-50"}
              className="group-hover:stroke-white"
            />
          </span>
        </button>
      </>
    );
  } else {
    return (
      <div class="flex text-sm gap-2 text-primary-text items-center">
        {status ? "Resuelto" : "Sin Resolver"}
        <span
          class={`flex ${
            status ? "bg-primary" : "bg-contrast-5"
          } rounded-full justify-center items-center size-8`}
        >
          <Icon
            name="check"
            size="lg"
            strokeColor={status ? "stroke-white" : "stroke-primary-50"}
          />
        </span>
      </div>
    );
  }
};

export function SkeletonCardPost() {
  return (
    <div role="status" class="flex flex-col animate-pulse rounded ">
      <span class="sr-only">Cargando Publicación</span>
      <div class="flex flex-col gap-2 ">
        <div class="flex gap-2 items-center">
          <div class="bg-contrast-40 size-8 rounded-full "></div>
          <div class="flex-1">
            <div class="max-w-36 bg-contrast-40 h-4 rounded mb-1"></div>
            <div class="max-w-24 bg-contrast-40 h-2 rounded"></div>
          </div>
          <Icon
            name="more-vertical"
            size="lg"
            fillColor="fill-bg-contrast-40"
          />
        </div>
        <span class="flex flex-wrap gap-2">
          <div class="min-w-16 bg-contrast-40 h-5 rounded-full "></div>
          <div class="min-w-20 bg-contrast-40 h-5 rounded-full "></div>
          <div class="min-w-16 bg-contrast-40 h-5 rounded-full "></div>
        </span>
      </div>
      <div class="flex flex-col gap-2 py-2">
        <div class="max-w-60 bg-contrast-40 h-5 rounded "></div>
        <div class="max-w-80 bg-contrast-40 h-4 rounded "></div>
        <div class="max-w-80 bg-contrast-40 h-4 rounded "></div>
      </div>
      <div class="flex justify-between border-t border-contrast-10 pt-2">
        <div class="flex gap-2 items-center text-icon-color">
          <Icon name="message" size="lg" />
          <div class="w-6 bg-contrast-40 h-4 rounded "></div>
        </div>
        <div class="flex gap-2 text-primary-text items-center">
          <div class="w-12 bg-contrast-40 h-4 rounded "></div>
          <Icon name="check" size="lg" strokeColor={"stroke-gray-300"} />
        </div>
      </div>
    </div>
  );
}
