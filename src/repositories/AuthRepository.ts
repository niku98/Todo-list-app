import type { Profile } from "@/models/auth";
import { createRepository } from "@/utilities/createRepository";
import appEnv from "app-env";

const AuthRepository = createRepository(
  {
    baseURL: appEnv.VITE_API_ENDPOINT,
  },
  {
    getProfile(axios) {
      return axios.get<Profile>("/profile");
    },
  }
);

export default AuthRepository;
