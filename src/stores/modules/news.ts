import type { AppStoreState, INews, NewsStoreModuleState } from "@/models";
import NewsRepository from "@/repositories/NewsRepository";
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
      const response = await NewsRepository.get();
      store.commit("updateList", response.data);
    },
  },
};
