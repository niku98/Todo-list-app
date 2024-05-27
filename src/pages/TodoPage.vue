<script lang="ts" setup>
import TodoList from "@/components/TodoList.vue";
import { TaskStatus } from "@/models";
</script>
<template>
  <div>
    <h2 class="mb-4 mt-5">Todo</h2>
    <TodoList :status="TaskStatus.Pending" />
  </div>
</template>
