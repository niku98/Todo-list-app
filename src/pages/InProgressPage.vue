<script setup lang="ts">
import TodoList from "@/components/TodoList.vue";
import { TaskStatus } from "@/models";
</script>

<template>
  <h2 class="mb-4 mt-5">In Progress</h2>
  <TodoList :status="TaskStatus.InProgress" />
</template>
