import type { INews } from "@/models";
import { createApi } from "@/utilities/createApi";
import appEnv from "app-env";

const NewsRepository = createApi(
  {
    baseURL: appEnv.VITE_API_ENDPOINT,
  },
  {
    get(axios) {
      return axios.get<INews[]>("/news.json");
    },
  }
);

export default NewsRepository;
