import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import piniaPersist from "pinia-plugin-persist";

import "view-ui-plus/dist/styles/viewuiplus.css";
import "./assets/style.scss";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPersist);

app.use(router);
app.use(pinia);

app.mount("#app");
