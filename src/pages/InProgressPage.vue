<script setup lang="ts">
import TodoList from "@/components/TodoList.vue";
import { TaskStatus } from "@/models";
</script>

<template>
  <TodoList :status="TaskStatus.InProgress" title="In Progress" />
</template>
