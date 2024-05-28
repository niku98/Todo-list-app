<script lang="ts" setup>
import { TaskStatus, type ITask } from "@/models";
import { useAppStore } from "@/stores";
import { computed, reactive, toRaw, watch } from "vue";

const defaultTask: ITask = {
  title: "",
  description: "",
  status: TaskStatus.Pending,
};

const props = defineProps<{
  task?: ITask;
}>();

const task = reactive<ITask>({
  ...(props.task ?? defaultTask),
});

watch(() => props.task, (value) => {
  if (value) {
    Object.assign(task, value);
  }
});

const appStore = useAppStore();

const signedIn = computed(() => appStore.state.auth.isSignedIn);

async function handleSubmit() {
  if(task.id) {
    await appStore.dispatch("todo/update", {id: task.id, task: toRaw(task)});
  } else {
    await appStore.dispatch("todo/create", toRaw(task));
  }
  handleReset();
}

function handleReset() {
  task.id = undefined;
  Object.assign(task, defaultTask);
}
</script>

<template>
  <BCard v-if="signedIn" class="mt-5">
    <h4>New task:</h4>
    <BForm @submit.prevent="handleSubmit" @reset="handleReset">
      <BFormGroup label="Title" label-for="title" class="mb-4">
        <BFormInput id="title" v-model="task.title" />
      </BFormGroup>
      <BFormGroup label="Description" label-for="description">
        <BFormTextarea id="description" v-model="task.description" />
      </BFormGroup>

      <div class="text-end mt-4">
        <BButton type="reset" variant="outline-dark" class="me-2">Reset</BButton>
        <BButton type="submit" variant="primary">{{ task.id ? 'Edit task' : 'Add task' }}</BButton>
      </div>
    </BForm>
  </BCard>
  <p v-else class="mt-5 text-muted">Please sign in to use task form.</p>
</template>
