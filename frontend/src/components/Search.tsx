import { searchParamsStore } from "../store/searchParamsStore";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Input } from "./Input";

export function Search() {
  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const formEl = event.currentTarget as HTMLFormElement;
    const data = new FormData(formEl);
    const search = data.get("q") as string;
    searchParamsStore.getState().setSearch(search);
  };

  return (
    <form onSubmit={handleSubmit} class="flex w-full sm:w-auto gap-2">
      <Input
        className="w-full"
        id="q"
        name="q"
        placeholder="Buscar publicación"
        type="search"
        value={searchParamsStore.getState().getSearch()}
      />
      <Button title="Buscar publicación" type="submit" variant="primary">
        <Icon name="search" size="lg" />
      </Button>
    </form>
  );
}
