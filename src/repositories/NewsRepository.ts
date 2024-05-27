import type { INews } from "@/models";
import { createRepository } from "@/utilities/createRepository";
import appEnv from "app-env";

const NewsRepository = createRepository(
  {
    baseURL: appEnv.VITE_API_ENDPOINT,
  },
  {
    get(axios) {
      return axios.get<INews[]>("/news");
    },
  }
);

export default NewsRepository;
