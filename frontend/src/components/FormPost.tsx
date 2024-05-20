import { Button } from "./Button";
import { Input } from "./Input";
import { TextArea } from "./TextArea";
import { CreatePost } from "../api/api";
import { SelectCategories } from "./SelectCategories";
import { createPost } from "../api/post";
import { getTokenStorage } from "../hook/useAuthenticate";
import { ErrorHandler } from "../error/ErrorHandle";
import { useState } from "preact/hooks";
import { Alert } from "./Alert";

export function FormPost() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const formEl = event.currentTarget as HTMLFormElement;
    const data = new FormData(formEl);
    const splitCategories = (data.get("categories") as string)
      .split(",")
      .map((c) => parseInt(c));

    const post: CreatePost = {
      title: data.get("input-title") as string,
      categories: isNaN(splitCategories[0]) ? [] : splitCategories,
      content: data.get("input-content") as string,
    };

    setIsLoading(true);
    createPost(getTokenStorage(), post)
      .then((e) => {
        if (e.message === undefined) {
          setIsSuccess(true);
          setErrorMessage("");
          setTimeout(() => {
            history.back();
          }, 500);
        } else {
          setErrorMessage(e.message);
        }
      })
      .catch(() => {
        ErrorHandler.handle(401, "Error al crear una publicación");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <main class="px-4 md:px-0 pb-4">
      <Alert
        isOpen={isSuccess}
        type="success"
        text="Publicación creada con éxito"
      />
      <Alert
        isOpen={isLoading}
        type="loading"
        text="Creando la publicación"
      ></Alert>
      <form onSubmit={onSubmit} class="flex flex-col gap-4 ">
        {errorMessage !== "" && (
          <div
            role="alert"
            class="rounded border-s-4 border-error bg-error-10 p-4"
          >
            <strong class="block font-medium text-error">
              Error al crear la publicación
            </strong>

            <p class="mt-2 pl-4 text-sm text-error">
              {errorMessage !== "" &&
                errorMessage
                  .split(";")
                  .slice(undefined, -1)
                  .map((t) => {
                    return (
                      <ul class="list-disc">
                        <li>{t}</li>
                      </ul>
                    );
                  })}
            </p>
          </div>
        )}
        <Input
          label="Título"
          id=""
          name="input-title"
          placeholder="Escriba un breve titulo"
          type="text"
        />
        <SelectCategories empty />
        <TextArea
          label="Contenido"
          id="input-content"
          name="input-content"
          placeholder="Describa su duda"
        />
        <Button
          className="self-end w-fit"
          type="submit"
          variant="primary"
          title="Publicar publicación"
        >
          Publicar
        </Button>
      </form>
    </main>
  );
}
