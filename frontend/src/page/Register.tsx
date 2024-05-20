import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button";
import Header from "../components/Header";
import { Icon } from "../components/Icon";
import { Input } from "../components/Input";
import { ChangeEvent } from "preact/compat";
import { createUser } from "../api/user";
import { route } from "preact-router";
import { AuthUser } from "../api/api";
import { Alert } from "../components/Alert";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);

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
    createUser(user)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          route("/login", true);
        }, 500);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Alert
        isOpen={success}
        type="success"
        text="Usuario registrado con exito"
      />
      <Alert isOpen={isLoading} type="loading" text="Registrando usuario" />
      <Header variant="primary" />
      <main class="flex justify-center max-w-sm m-auto px-4 md:px-0">
        <form
          onSubmit={handleSubmit}
          class="flex flex-col justify-center w-full pt-24 gap-2 pb-8"
        >
          <fieldset class="flex gap-6 flex-col py-4 ">
            <legend class="text-center text-3xl text-heading font-medium">
              Registrarse
            </legend>
            {isError && (
              <div
                role="alert"
                class="rounded border-s-4 border-error bg-error-10 p-4"
              >
                <strong class="block font-medium text-error">
                  Error al Registrarse
                </strong>

                <p class="mt-2 text-sm text-error">
                  El nombre de usuario ya existe. Pruebe con otro nombre.
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
              title="Registrar usuario"
              type="submit"
              variant="primary"
            >
              Registrarse
            </Button>
          </fieldset>
          <span class="mx-auto text-md text-body">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              class="text-primary-text hover:underline cursor-pointer"
            >
              Iniciar sesión
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
    <Input
      placeholder="Contraseña"
      id="input-password"
      label="Contraseña"
      minLength={8}
      maxLength={50}
      name="input-password"
      value={password}
      onChange={changePassword}
      type={showPassword ? "text" : "password"}
      helperText="La contraceña de usuario debe tener de 8 a 50 caracteres y no puede estar vacío."
    >
      <Button
        onClick={changeShowPassword}
        title="Ver Contraseña"
        type="button"
        variant="tertiary"
      >
        <Icon name="eye" size="lg" strokeColor="stroke-icon-color" />
      </Button>
    </Input>
  );
};
