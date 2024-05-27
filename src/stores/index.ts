import type { AppStoreState } from "@/models";
import { authStoreModule } from "@/stores/modules/auth";
import { newsStoreModule } from "@/stores/modules/news";
import { todoStoreModule } from "@/stores/modules/todo";
import type { InjectionKey } from "vue";
import { Store, createStore, useStore } from "vuex";
import VuexPersistence from "vuex-persist";

export const appStore = createStore<AppStoreState>({
  plugins: [new VuexPersistence().plugin],
  modules: {
    todo: todoStoreModule,
    news: newsStoreModule,
    auth: authStoreModule,
  },
});

export const appStoreKey: InjectionKey<Store<AppStoreState>> = Symbol();

export function useAppStore() {
  return useStore(appStoreKey);
}
