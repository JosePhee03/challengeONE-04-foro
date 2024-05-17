import { useEffect, useState } from "preact/hooks";
import { Category } from "../api/api";
import { searchParamsStore } from "../store/searchParamsStore";
import { categoryStore } from "../store/categoryStore";
import Badge from "./Badge";

export function BadgesCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const idCategories = searchParamsStore.getState().getCategories();
    updateCategories(idCategories);
    searchParamsStore.subscribe(({ getCategories }) =>
      updateCategories(getCategories())
    );
  }, []);

  const updateCategories = (idCategories: number[]) => {
    categoryStore
      .getState()
      .getCategories()
      .then((cat) => {
        const newCategories = cat.filter((c) => idCategories.includes(c.id));
        setCategories(newCategories);
      });
  };

  const handleDeleteCategory = (idCategory: number) => {
    const { getCategories, setCategories } = searchParamsStore.getState();
    setCategories(getCategories().filter((c) => idCategory != c));
  };

  return (
    <div class="flex flex-wrap gap-2">
      {categories.map((c) => (
        <Badge
          key={c.id}
          name={c.name}
          withIcon
          title={`Eliminar la categoria ${c.name}`}
          onClick={() => handleDeleteCategory(c.id)}
        />
      ))}
    </div>
  );
}
