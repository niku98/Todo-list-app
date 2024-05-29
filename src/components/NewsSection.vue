<script setup>
import NewsItem from "@/components/NewsItem.vue";
import { useAppStore } from "@/stores";
import { computed } from "vue";

const appStore = useAppStore();

const news = computed(() => appStore.state.news.list);
</script>

<template>
  <section>
    <h3 class="pb-4">Company News</h3>
    <BRow :gutter-y="5">
      <BCol v-for="(newsItem, index) in news" :key="newsItem.id" :cols="12">
        <NewsItem :news="newsItem" :image-position="index % 2 === 0 ? 'left' : 'right'" />
      </BCol>
    </BRow>
  </section>
</template>
