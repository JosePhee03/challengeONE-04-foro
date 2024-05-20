import { useState } from "preact/hooks";
import { Comment } from "../api/api";
import { userStore } from "../store/userStore";
import { textDate } from "../util/getTimeFromString";
import { Button } from "./Button";
import { DropDown } from "./DropDown";
import { Icon } from "./Icon";
import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";
import { UserImage } from "./UserImage";
import { Alert } from "./Alert";
import { deleteComment } from "../api/comment";
import { getTokenStorage } from "../hook/useAuthenticate";

interface CommentCardProps {
  comment: Comment;
}

export function CardComment({ comment }: CommentCardProps) {
  const [deleteError, setDeleteError] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  return (
    <>
      <Alert
        isOpen={deleteSuccess}
        type="success"
        text="Comentario eliminado con éxito"
      />
      <Alert
        isOpen={deleteError}
        type="error"
        text="Error al eliminar el comentario"
      ></Alert>
      <Alert
        isOpen={deleteLoading}
        type="loading"
        text="Eliminando comentario"
      ></Alert>
      <article class="flex w-full gap-2">
        <UserImage size="sm" username={comment.author.username} />
        <div class="flex w-full flex-col">
          <header class="flex gap-2 ">
            <div class="flex-1 gap-2">
              <h4 class="font-medium text-sm text-heading">
                {comment.author.username}
              </h4>
              <p class="text-xs text-secondary-text">
                {textDate(comment.dateCreated)}
              </p>
            </div>
            {userStore.getState().user?.id === comment.author.id && (
              <div>
                <DropDown
                  button={
                    <Button
                      ariaControls={`popover-comment-${comment.id}${comment.author.id}`}
                      ariaExpanded={false}
                      ariaHaspopup={true}
                      id={`button-comment-${comment.id}${comment.author.id}`}
                      title="Opciones del comentario"
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
                  buttonId={`button-comment-${comment.id}${comment.author.id}`}
                  inputId={`button-comment-${comment.id}${comment.author.id}`}
                >
                  <Menu
                    buttonId={`button-comment-${comment.id}${comment.author.id}`}
                    popoverId={`popover-comment-${comment.id}${comment.author.id}`}
                  >
                    <MenuItem
                      type="button"
                      text="Eliminar comentario"
                      icon="trash"
                      textColor="text-error-text"
                      onClick={() => {
                        setDeleteSuccess(false);
                        setDeleteError(false);
                        setDeleteLoading(true);
                        deleteComment(getTokenStorage(), comment.id)
                          .then(() => {
                            setDeleteSuccess(true);
                            setTimeout(() => {
                              location.reload();
                            }, 1500);
                          })
                          .catch(() => {
                            setDeleteError(true);
                            setTimeout(() => {
                              setDeleteError(false);
                            }, 1500);
                          })
                          .finally(() => setDeleteLoading(false));
                      }}
                    />
                  </Menu>
                </DropDown>
              </div>
            )}
          </header>
          <p class="text-body">{comment.content}</p>
        </div>
      </article>
    </>
  );
}

export function SkeletonCardComment() {
  return (
    <div role="status" class="flex animate-pulse w-full gap-2">
      <span class="sr-only">Cargando Commentario</span>
      <div class="bg-contrast-40 size-8 rounded-full "></div>
      <div class="flex w-full flex-col">
        <div class="flex gap-2 ">
          <div class="flex-1 gap-2">
            <div class="max-w-36 bg-contrast-40 h-3 rounded mb-1"></div>
            <div class="max-w-32 bg-contrast-40 h-2 rounded mb-1"></div>
          </div>
          <Icon name="more-vertical" size="lg" fillColor="fill-contrast-40" />
        </div>
        <div class="max-w-80 bg-contrast-40 h-4 rounded mb-1"></div>
      </div>
    </div>
  );
}
