export function EmptyMessage() {
  return (
    <div class="flex w-full flex-col gap-2 justify-center  items-center py-8">
      <svg aria-hidden class="size-16 stroke-primary-text stroke-2">
        <use href={`/icons.svg#bird`}></use>
      </svg>
      <span class="text-primary-text text-lg">Sin Resultados</span>
    </div>
  );
}
