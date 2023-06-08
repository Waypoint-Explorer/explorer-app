import { createApp } from 'vue';
import './assets/style/theme-medium.css';
import './assets/style/font.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from "./router";

import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(PrimeVue);
app.use(router);

app.component('sidebarComp', Sidebar);
app.component('buttonComp', Button);

app.mount("#app");