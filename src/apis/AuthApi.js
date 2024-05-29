import { createApi } from "@/utilities/createApi";
import appEnv from "app-env";

const AuthRepository = createApi(
  {
    baseURL: appEnv.VITE_API_ENDPOINT,
  },
  {
    getProfile(axios) {
      return axios.get("/profile.json");
    },
  }
);

export default AuthRepository;
