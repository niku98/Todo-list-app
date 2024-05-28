import type { AppStoreState, INews, NewsStoreModuleState } from "@/models";
import NewsApi from "@/apis/NewsApi";
import type { Module } from "vuex";

const defaultNews: INews[] = [];

export const newsStoreModule: Module<NewsStoreModuleState, AppStoreState> = {
  namespaced: true,
  state() {
    return { list: defaultNews };
  },
  mutations: {
    updateList(state, news: INews[]) {
      state.list = news;
    },
  },
  actions: {
    async getList(store) {
      const response = await NewsApi.get();
      store.commit("updateList", response.data);
    },
  },
};
