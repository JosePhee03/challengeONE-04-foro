import { createStore } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

interface SearchParams {
  status?: boolean;
  direction: string;
  categories: number[];
  search: string;
}

interface SearchParamsState {
  state: {
    searchParams: SearchParams;
  };
  version: number;
}

interface SearchParamsStore {
  searchParams: SearchParams;
  setStatus: (status: SearchParams["status"]) => void;
  setCategories: (categories: SearchParams["categories"]) => void;
  setDirection: (direction: SearchParams["direction"]) => void;
  setSearch: (search: SearchParams["search"]) => void;
  getStatus: () => SearchParams["status"];
  getCategories: () => SearchParams["categories"];
  getDirection: () => SearchParams["direction"];
  getSearch: () => SearchParams["search"];
}

const hashStorage: StateStorage = {
  getItem: (key): string => {
    return key;
  },
  setItem: (_, newValue): void => {
    const stateJson = JSON.parse(newValue) as SearchParamsState;
    const { categories, direction, status, search } =
      stateJson.state.searchParams;
    const currentUrl = new URL(window.location.href);

    if (categories.length > 0) {
      currentUrl.searchParams.set("categories", categories.toString());
    } else {
      currentUrl.searchParams.delete("categories");
    }

    if (search !== "") {
      currentUrl.searchParams.set("q", search);
    } else {
      currentUrl.searchParams.delete("q");
    }

    if (direction === "DESC") {
      currentUrl.searchParams.delete("direction");
    } else {
      currentUrl.searchParams.set("direction", direction);
    }

    if (status === true) {
      currentUrl.searchParams.set("status", "1");
    } else if (status === false) {
      currentUrl.searchParams.set("status", "0");
    } else {
      currentUrl.searchParams.delete("status");
    }

    const newURL = currentUrl.pathname + currentUrl.search;

    window.history.pushState({ path: newURL }, "", newURL);
  },
  removeItem: (_): void => {},
};

export const initialStateSearchParams = (): SearchParams => {
  const { searchParams } = new URL(location.href);
  const categories = searchParams
    .get("categories")
    ?.split(",")
    .map((c) => parseInt(c)) as number[];
  const direction = searchParams.get("direction");
  const status = searchParams.get("status");
  const search = searchParams.get("q");

  return {
    search: search ?? "",
    categories: categories ?? [],
    direction: direction === "ASC" ? direction : "DESC",
    status: status === "1" ? true : status === "0" ? false : undefined,
  };
};

export const searchParamsStore = createStore<
  SearchParamsStore,
  [["zustand/persist", unknown]]
>(
  persist(
    (set, get) => ({
      searchParams: initialStateSearchParams(),
      setCategories: (categories) => {
        set(({ searchParams }) => ({
          searchParams: { ...searchParams, categories },
        }));
      },
      setDirection: (direction) => {
        set(({ searchParams }) => ({
          searchParams: { ...searchParams, direction },
        }));
      },
      setStatus: (status) => {
        set(({ searchParams }) => ({
          searchParams: { ...searchParams, status },
        }));
      },
      setSearch: (search) => {
        set(({ searchParams }) => ({
          searchParams: { ...searchParams, search },
        }));
      },
      getCategories: () => get().searchParams.categories,
      getDirection: () => get().searchParams.direction,
      getStatus: () => get().searchParams.status,
      getSearch: () => get().searchParams.search,
    }),

    {
      name: "searchParamsStore",
      storage: createJSONStorage(() => hashStorage),
    }
  )
);
