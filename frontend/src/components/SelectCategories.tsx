import { StateUpdater, useEffect, useState } from "preact/hooks";
import { Item, List } from "../util/List";
import { Category } from "../api/api";
import { categoryStore } from "../store/categoryStore";
import { Select } from "./Select";
import { searchParamsStore } from "../store/searchParamsStore";

interface SelectCategoriesProps {
  reset?: boolean;
  setReset?: StateUpdater<boolean>;
  empty?: boolean;
}

export function SelectCategories({
  reset,
  setReset,
  empty,
}: SelectCategoriesProps) {
  const [list, setList] = useState<List>();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { getCategories } = categoryStore.getState();
    const { getCategories: initalCategories } = searchParamsStore.getState();

    setIsLoading(true);
    getCategories()
      .then((categories) => {
        let itemsList: Item[] = [];
        const listOfItems = (arr: Category[]) => {
          return arr.map((c) => {
            const item: Item = {
              isSelected: empty ? false : initalCategories().includes(c.id),
              key: c.id,
              name: c.name,
            };
            return item;
          });
        };

        itemsList = listOfItems(categories);

        const list = new List(itemsList);
        setList(list);
        setItems(list.getList());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (reset === true) {
      if (list == undefined) return;
      list.reset();
      setList(list);
      setItems(list.getList());
      if (setReset != undefined) setReset(false);
    }
  }, [reset]);

  const handleToggleSelected = (key: number) => {
    if (list == undefined) return;
    const newList = list.setSelected(key);
    setItems(newList);
  };

  return (
    <Select
      isLoading={isLoading}
      handleToggleSelected={handleToggleSelected}
      items={items}
    />
  );
}
