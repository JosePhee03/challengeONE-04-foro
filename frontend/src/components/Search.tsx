import { Button } from "./Button";
import { Icon } from "./Icon";
import { Input } from "./Input";

export function Search() {
  return (
    <form class="flex w-full sm:w-auto gap-2">
      <Input
        className="w-full"
        id="q"
        name="q"
        placeholder="Buscar publicación"
        type="search"
        pattern=".*"
      />
      <Button title="Buscar publicación" type="submit" variant="primary">
        <Icon name="search" size="lg" />
      </Button>
    </form>
  );
}
