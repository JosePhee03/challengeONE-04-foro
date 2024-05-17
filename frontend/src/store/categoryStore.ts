import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Category } from "../api/api";
import { getTokenStorage } from "../hook/useAuthenticate";
import { getCategories } from "../api/category";
import { ErrorHandler } from "../error/ErrorHandle";

interface CategoryStore {
  categories: Category[];
  getCategories: () => Promise<Category[]>;
}

export const categoryStore = createStore<
  CategoryStore,
  [["zustand/persist", unknown]]
>(
  persist(
    (set, get) => ({
      categories: [],
      getCategories: async () => {
        if (get().categories.length !== 0)
          return Promise.resolve(get().categories);
        const token = getTokenStorage();
        return await getCategories(token)
          .then((response) => {
            const categories = response as Category[];
            set(() => ({ categories }));
            return categories;
          })
          .catch(() => {
            throw ErrorHandler.handle(401, "Error al obtener las categorias");
          });
      },
    }),
    {
      name: "categoryStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
