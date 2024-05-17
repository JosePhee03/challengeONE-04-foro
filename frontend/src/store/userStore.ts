import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import { User } from "../api/api";
import { getTokenStorage } from "../hook/useAuthenticate";
import { getTokenPayload } from "../api/token";
import { findUser } from "../api/user";

interface UserStore {
  user?: User;
  fetchUser: () => void;
  resetUser: () => void;
}

export const userStore = createStore<UserStore, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      user: undefined,
      resetUser: () =>
        set(() => ({
          user: undefined,
        })),

      fetchUser: () => {
        const token = getTokenStorage();
        let userId = getTokenPayload()?.id;
        if (token == undefined) {
          set({ user: undefined });
          userId = undefined;
        }
        if (userId != undefined) {
          findUser(token, userId)
            .then((response) => {
              const user = response as User;
              set(() => ({ user }));
            })
            .catch(() => ({ user: undefined }));
        }
        return userId;
      },
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
