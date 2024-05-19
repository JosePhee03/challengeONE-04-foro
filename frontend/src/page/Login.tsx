import { useEffect, useState } from "preact/hooks";
import { AuthUser } from "../api/api";
import { Alert } from "../components/Alert";
import { Button } from "../components/Button";
import Header from "../components/Header";
import { Icon } from "../components/Icon";
import { Input } from "../components/Input";
import { useAuthenticate } from "../hook/useAuthenticate";
import { route } from "preact-router";
import { ChangeEvent } from "preact/compat";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { login } = useAuthenticate();

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const user: AuthUser = {
      username: formData.get("input-username") as string,
      password: formData.get("input-password") as string,
    };
    setIsError(false);
    setIsLoading(true);
    login(user)
      .then(() => route("/", true))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      <Alert isOpen={isLoading} type="loading" text="Validando usuario"></Alert>
      <Header variant="primary" />
      <main class="flex justify-center max-w-sm m-auto px-4 md:px-0">
        <form
          onSubmit={handleSubmit}
          class="flex flex-col justify-center gap-2 w-full pt-24 pb-8"
        >
          <fieldset class="flex gap-6 flex-col py-4 ">
            <legend class="text-center text-3xl text-heading font-medium">
              Iniciar Sesión
            </legend>
            {isError && (
              <div
                role="alert"
                class="rounded border-s-4 border-error bg-error-10 p-4"
              >
                <strong class="block font-medium text-error">
                  Error al iniciar sesión
                </strong>

                <p class="mt-2 text-sm text-error">
                  El nombre de usuario o la contraceña es incorrecta. Pruebe
                  nuevamente.
                </p>
              </div>
            )}

            <Input
              minLength={3}
              maxLength={30}
              placeholder="Nombre"
              id="input-username"
              label="Nombre de usuario"
              name="input-username"
              type="text"
              helperText="El nombre de usuario debe tener de 3 a 30 caracteres y no puede estar vacío."
            />
            <PasswordInput isError={isError} />
            <Button
              disabled={isLoading}
              title="Iniciar sesión"
              type="submit"
              variant="primary"
            >
              Iniciar Sesión
            </Button>
          </fieldset>
          <span class="mx-auto text-body text-md">
            ¿Quieres crear una cuenta?{" "}
            <a
              href="/register"
              class="text-md text-primary-text hover:underline cursor-pointer"
            >
              Registrarse
            </a>
          </span>
        </form>
      </main>
    </>
  );
}

interface PasswordInputProps {
  isError: boolean;
}

const PasswordInput = ({ isError }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isError) setPassword("");
  }, [isError]);

  const changeShowPassword = () => {
    const newShowPassword = !showPassword;
    setShowPassword(newShowPassword);
  };

  const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    setPassword(input.value);
  };

  return (
    <>
      <Input
        placeholder="Contraseña"
        id="input-password"
        label="Contraseña"
        minLength={8}
        maxLength={50}
        onChange={changePassword}
        value={password}
        name="input-password"
        type={showPassword ? "text" : "password"}
        helperText="La contraceña de usuario debe tener de 8 a 50 caracteres y no puede estar vacío."
      >
        <Button
          title="Ver Contraseña"
          type="button"
          variant="tertiary"
          onClick={changeShowPassword}
        >
          <Icon name="eye" size="lg" />
        </Button>
      </Input>
    </>
  );
};
