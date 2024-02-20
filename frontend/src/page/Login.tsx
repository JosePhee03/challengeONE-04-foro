import { Button } from "../components/Button";
import Header from "../components/Header";
import { Icon } from "../components/Icon";
import { Input } from "../components/Input";

export default function Login() {

	return (
		<>
			<Header variant="primary" />
			<main class="flex justify-center max-w-sm m-auto">
				<form class="flex flex-col justify-center gap-2 w-full pt-24 pb-8" >
					<fieldset class="flex gap-10 flex-col py-4 ">
						<legend class="text-center text-3xl text-heading font-medium">Iniciar Sesión</legend>
						<Input placeholder="Nombre" id="input-username" label="Nombre de usuario" name="input-username" type="text" helperText="Error" />
						<Input placeholder="Contraseña" id="input-password" label="Contraseña" name="input-password" type="password" helperText="Error">
							<Button title="Ver Contraseña" type="button" variant="tertiary">
								<Icon name="eye" size="lg" />
							</Button>
						</Input>
						<Button title="Iniciar sesión" type="submit" variant="primary">
							Iniciar Sesión
						</Button >
					</fieldset>
					<span class="mx-auto text-body text-md">¿Quieres crear una cuenta? <a href="/register" class="text-md text-primary hover:underline cursor-pointer">Registrarse</a></span>
				</form>
			</main >
		</ >
	)

}