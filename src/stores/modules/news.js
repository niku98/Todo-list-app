import NewsApi from "@/apis/NewsApi";

const defaultNews = [];

export const newsStoreModule = {
  namespaced: true,
  state() {
    return { list: defaultNews };
  },
  mutations: {
    updateList(state, news) {
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
