import type { AppStoreState, ITask, TodoStoreModuleState } from "@/models";
import TodoApi from "@/apis/TodoApi";
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
        newList[index] = {...task, id};
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
      // Persist the list in the store
      if(store.state.list.length > 0) {
        return;
      }

      const response = await TodoApi.get();
      store.commit("updateList", response.data);
    },
    async create(store, task: ITask) {
      store.commit("addTask", {
        ...task,
        id: Math.random().toString(36).slice(-8),
      });
    },
    async update(store, { id, task }: { id: string; task: ITask }) {
      store.commit("updateTask", { id, task });
    },
    async delete(store, id: string) {
      store.commit("deleteTask", id);
    },
  },
};
