export default function Page404() {
  return (
    <div class="grid h-screen place-content-center bg-base px-4">
      <div class="text-center">
        <h1 class="text-9xl font-black text-heading">404</h1>

        <p class="text-2xl font-bold tracking-tight text-tertiary-text sm:text-4xl">
          Uh-oh!
        </p>

        <p class="mt-4 text-body">Página no disponible</p>

        <a href="/" class="mt-6 button button-primary ">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
