import TodoPageVue from "@/pages/TodoPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TodoPageVue,
    },
    {
      path: "/in-progress",
      name: "in-progress",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/InProgressPage.vue"),
    },
    {
      path: "/completed",
      name: "completed",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/CompletedPage.vue"),
    },
  ],
});

export default router;
