<script setup>
import TodoList from "@/components/TodoList.vue";
import { TaskStatus } from "@/models";
</script>

<template>
  <TodoList :status="TaskStatus.Completed" title="Completed" />
</template>
