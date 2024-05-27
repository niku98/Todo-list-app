<script lang="ts" setup>
import TodoItem from "@/components/TodoItem.vue";
import type { TaskStatus } from "@/models";
import { useAppStore } from "@/stores";
import { computed } from "vue";

const props = defineProps<{
  status: TaskStatus;
}>();

const appStore = useAppStore();

const tasks = computed(() => {
  return appStore.state.todo.list.filter((task) => task.status === props.status);
});
</script>

<template>
  <BRow v-if="tasks.length > 0" :gutter-x="4" :gutter-y="4">
    <BCol v-for="task in tasks" :key="task.id" :cols="12" :md="6" :lg="4">
      <TodoItem :task="task" />
    </BCol>
  </BRow>
  <div v-else class="fst-italic text-center text-muted">No task found.</div>
</template>
