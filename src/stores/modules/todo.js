import TodoApi from "@/apis/TodoApi";

const defaultTasks = [];

export const todoStoreModule = {
  namespaced: true,
  state() {
    return { list: defaultTasks };
  },
  mutations: {
    addTask(state, task) {
      state.list.push(task);
    },
    updateTask(state, { id, task }) {
      const index = state.list.findIndex((item) => item.id === id);
      if (index > -1) {
        const newList = state.list.slice(0);
        newList[index] = { ...task, id };
        state.list = newList;
      }
    },
    updateList(state, tasks) {
      state.list = tasks;
    },
    deleteTask(state, id) {
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
      if (store.state.list.length > 0) {
        return;
      }

      const response = await TodoApi.get();
      store.commit("updateList", response.data);
    },
    async create(store, task) {
      store.commit("addTask", {
        ...task,
        id: Math.random().toString(36).slice(-8),
      });
    },
    async update(store, { id, task }) {
      store.commit("updateTask", { id, task });
    },
    async delete(store, id) {
      store.commit("deleteTask", id);
    },
  },
};
