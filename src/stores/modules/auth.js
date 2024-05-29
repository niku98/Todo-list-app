import AuthApi from "@/apis/AuthApi";

export const authStoreModule = {
  namespaced: true,
  state() {
    return { isSignedIn: false, profile: undefined };
  },
  mutations: {
    updateProfile(state, profile) {
      state.profile = profile;
    },
    updateIsSignedIn(state, val) {
      state.isSignedIn = val;
    },
  },
  actions: {
    async getProfile(store) {
      if (!store.state.isSignedIn) {
        return;
      }

      const response = await AuthApi.getProfile();
      store.commit("updateProfile", response.data);
    },
    signIn(store) {
      store.commit("updateIsSignedIn", true);
      store.dispatch("getProfile");
    },
    signOut(store) {
      store.commit("updateIsSignedIn", false);
      store.commit("updateProfile", undefined);
    },
  },
};
