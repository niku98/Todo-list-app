import type { AppStoreState, AuthStoreModuleState } from "@/models";
import type { Profile } from "@/models/auth";
import AuthApi from "@/apis/AuthApi";
import type { Module } from "vuex";

export const authStoreModule: Module<AuthStoreModuleState, AppStoreState> = {
  namespaced: true,
  state() {
    return { isSignedIn: false, profile: undefined };
  },
  mutations: {
    updateProfile(state, profile?: Profile) {
      state.profile = profile;
    },
    updateIsSignedIn(state, val: boolean) {
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
