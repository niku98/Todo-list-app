<script setup>
import { computed } from "vue";

const props = defineProps({
  news: {
    type: Object,
    required: true,
  },
  imagePosition: {
    type: String,
    required: true,
  },
});

const imageOnLeft = computed(() => props.imagePosition === "left");
</script>

<template>
  <article>
    <BRow>
      <BCol :cols="12" :md="6" :order="1" :order-md="imageOnLeft ? 1 : 2">
        <img :src="news.featured_image" class="w-100" />
      </BCol>
      <BCol :cols="12" :md="6" :order="1" :order-md="imageOnLeft ? 2 : 1" class="mt-4 mt-md-0">
        <h3>{{ news.title }}</h3>
        <p>
          {{ news.short_description }}
        </p>
        <p>
          {{ news.content }}
        </p>
      </BCol>
    </BRow>
  </article>
</template>
