import { authStoreModule } from "@/stores/modules/auth";
import { newsStoreModule } from "@/stores/modules/news";
import { todoStoreModule } from "@/stores/modules/todo";
import {  createStore, useStore } from "vuex";
import VuexPersistence from "vuex-persist";

export const appStore = createStore({
  plugins: [new VuexPersistence().plugin],
  modules: {
    todo: todoStoreModule,
    news: newsStoreModule,
    auth: authStoreModule,
  },
});

export const appStoreKey = Symbol();

export function useAppStore() {
  return useStore(appStoreKey);
}
