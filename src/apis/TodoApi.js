import { createApi } from "@/utilities/createApi";
import appEnv from "app-env";

const TodoRepository = createApi(
  {
    baseURL: appEnv.VITE_API_ENDPOINT,
  },
  {
    get(axios) {
      return axios.get("/todo.json");
    },
  }
);

export default TodoRepository;
