<script lang="ts" setup>
import TodoItem from "@/components/TodoItem.vue";
import type { ITask, TaskStatus } from "@/models";
import { useAppStore } from "@/stores";
import { computed, ref } from "vue";
import TodoForm from "./TodoForm.vue";

const props = defineProps<{
  status: TaskStatus;
  title: string;
}>();

const appStore = useAppStore();

const tasks = computed(() => {
  return appStore.state.todo.list.filter((task) => task.status === props.status);
});

// Handle edit task
const editingTask = ref<ITask>();
</script>

<template>
  <div>
    <TodoForm :task="editingTask" @submit="editingTask = undefined" />
    <h2 class="mb-4 mt-5">{{ title }}</h2>
    <BRow v-if="tasks.length > 0" :gutter-x="4" :gutter-y="4">
      <BCol v-for="task in tasks" :key="task.id" :cols="12" :md="6" :lg="4">
        <TodoItem :task="task" @edit="editingTask = $event"/>
      </BCol>
    </BRow>
    <div v-else class="fst-italic text-center text-muted">No task found.</div>
  </div>
</template>
