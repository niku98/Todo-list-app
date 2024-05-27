import type { AppStoreState, ITask, TodoStoreModuleState } from "@/models";
import TodoRepository from "@/repositories/TodoRepository";
import type { Module } from "vuex";

const defaultTasks: ITask[] = [];

export const todoStoreModule: Module<TodoStoreModuleState, AppStoreState> = {
  namespaced: true,
  state() {
    return { list: defaultTasks };
  },
  mutations: {
    addTask(state, task: ITask) {
      state.list.push(task);
    },
    updateTask(state, { id, task }: { id: string; task: ITask }) {
      const index = state.list.findIndex((item) => item.id === id);
      if (index > -1) {
        const newList = state.list.slice(0);
        newList[index] = task;
        state.list = newList;
      }
    },
    updateList(state, tasks: ITask[]) {
      state.list = tasks;
    },
    deleteTask(state, id: string) {
      const index = state.list.findIndex((item) => item.id === id);
      if (index > -1) {
        const newList = state.list.slice(0);
        newList.splice(index, 1);
        state.list = newList;
      }
    },
  },
  actions: {
    async getList(store) {
      const response = await TodoRepository.get();
      store.commit("updateList", response.data);
    },
    async create(store, task: ITask) {
      const response = await TodoRepository.create(task);
      store.commit("addTask", response.data);
    },
    async update(store, { id, task }: { id: string; task: ITask }) {
      await TodoRepository.update(id, task);
      store.commit("updateTask", { id, task });
    },
    async delete(store, id: string) {
      await TodoRepository.delete(id);
      store.commit("deleteTask", id);
    },
  },
};
