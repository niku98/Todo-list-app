<script setup lang="ts">
import MainNav from "@/components/MainNav.vue";
import NewsSection from "@/components/NewsSection.vue";
import { useAppStore } from "@/stores";
import type { RouterView } from "vue-router";

const appStore = useAppStore();

appStore.dispatch("todo/getList");
appStore.dispatch("news/getList");
appStore.dispatch("auth/getProfile");
</script>

<template>
  <MainNav />
  <main class="mb-5">
    <BContainer>
      <RouterView />
      <NewsSection class="mt-5" />
    </BContainer>
  </main>
</template>
