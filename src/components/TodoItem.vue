<script setup>
import { TaskStatus } from "@/models";
import { useAppStore } from "@/stores";
import { computed } from "vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});
defineEmits({
  edit: [Object],
});

const appStore = useAppStore();

const signedIn = computed(() => appStore.state.auth.isSignedIn);

function markAsInProgress() {
  appStore.dispatch("todo/update", {
    id: props.task.id,
    task: {
      ...props.task,
      status: TaskStatus.InProgress,
    },
  });
}

function markAsComplete() {
  appStore.dispatch("todo/update", {
    id: props.task.id,
    task: {
      ...props.task,
      status: TaskStatus.Completed,
    },
  });
}

function deleteTask() {
  appStore.dispatch("todo/delete", props.task.id);
}
</script>

<template>
  <BCard :title="task.title" img-src="https://placehold.co/320x200" img-alt="Image" img-top>
    <BCardText>
      {{ task.description }}
    </BCardText>

    <template v-if="signedIn">
      <BButton v-if="task.status === TaskStatus.Pending" variant="primary" @click="markAsInProgress"
        >Start</BButton
      >
      <BButton
        v-else-if="task.status === TaskStatus.InProgress"
        variant="success"
        @click="markAsComplete"
        >Complete</BButton
      >
      <BButton variant="info" class="ms-2" @click="$emit('edit', task)">Edit</BButton>
      <BButton variant="outline-dark" class="ms-2" @click="deleteTask">Remove</BButton>
    </template>
  </BCard>
</template>
