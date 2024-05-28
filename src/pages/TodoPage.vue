<script lang="ts" setup>
import TodoList from "@/components/TodoList.vue";
import { TaskStatus } from "@/models";
</script>
<template>
  <TodoList :status="TaskStatus.Pending" title="Todo" />
</template>
