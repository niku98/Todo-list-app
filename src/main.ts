import "@/assets/base.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/css/bootstrap.css";

import { createBootstrap } from "bootstrap-vue-next";
import { createApp } from "vue";

import { appStore, appStoreKey } from "@/stores";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(
  createBootstrap({
    components: true,
    directives: true,
  })
);
app.use(router);
app.use(appStore, appStoreKey);

app.mount("#app");
