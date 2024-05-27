import type { ITask } from "@/models";
import { createRepository } from "@/utilities/createRepository";
import appEnv from "app-env";

const TodoRepository = createRepository(
  {
    baseURL: appEnv.VITE_API_ENDPOINT,
  },
  {
    get(axios) {
      return axios.get<ITask[]>("/todo");
    },
    create(axios, task: ITask) {
      return axios.post<ITask>("/todo", task);
    },
    update(axios, id: string, task: ITask) {
      return axios.put<ITask>(`/todo/${id}`, task);
    },
    delete(axios, id: string) {
      return axios.delete(`/todo/${id}`);
    },
  }
);

export default TodoRepository;
