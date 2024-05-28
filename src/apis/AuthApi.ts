import type { Profile } from "@/models/auth";
import { createApi } from "@/utilities/createApi";
import appEnv from "app-env";

const AuthRepository = createApi(
  {
    baseURL: appEnv.VITE_API_ENDPOINT,
  },
  {
    getProfile(axios) {
      return axios.get<Profile>("/profile.json");
    },
  }
);

export default AuthRepository;
