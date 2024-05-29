<script setup>
import { TaskStatus } from "@/models";
import { useAppStore } from "@/stores";
import { computed, reactive, toRaw, watch } from "vue";

const defaultTask = {
  title: "",
  description: "",
  status: TaskStatus.Pending,
};

const props = defineProps({
  task: {
    type: Object,
    default: undefined,
  },
});

const emit = defineEmits(["reset", "submit"]);

const task = reactive({
  ...(props.task ?? defaultTask),
});

watch(
  () => props.task,
  (value) => {
    if (value) {
      Object.assign(task, value);
    }
  }
);

const appStore = useAppStore();

const signedIn = computed(() => appStore.state.auth.isSignedIn);

async function handleSubmit() {
  if (task.id) {
    await appStore.dispatch("todo/update", { id: task.id, task: toRaw(task) });
  } else {
    await appStore.dispatch("todo/create", toRaw(task));
  }
  emit("submit");
  handleReset(false);
}

function handleReset(shouldEmit = true) {
  task.id = undefined;
  Object.assign(task, defaultTask);
  shouldEmit && emit("reset");
}
</script>

<template>
  <BCard v-if="signedIn" class="mt-5">
    <h4>{{ task.id ? "Edit" : "New" }} task:</h4>
    <BForm @submit.prevent="handleSubmit" @reset="handleReset">
      <BFormGroup label="Title" label-for="title" class="mb-4">
        <BFormInput id="title" v-model="task.title" />
      </BFormGroup>
      <BFormGroup label="Description" label-for="description">
        <BFormTextarea id="description" v-model="task.description" />
      </BFormGroup>

      <div class="text-end mt-4">
        <BButton type="reset" variant="outline-dark" class="me-2">Cancel</BButton>
        <BButton type="submit" variant="primary">{{ task.id ? "Edit task" : "Add task" }}</BButton>
      </div>
    </BForm>
  </BCard>
  <p v-else class="mt-5 text-muted">Please sign in to use task form.</p>
</template>
