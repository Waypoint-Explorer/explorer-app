import { createApp } from 'vue';
import './assets/style/theme-medium.css';
import './assets/style/font.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from "./router";

import mitt from 'mitt';

import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';
import InputText from "primevue/inputtext";

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.use(PrimeVue);
app.use(router);

app.component('sidebarComp', Sidebar);
app.component('buttonComp', Button);
app.component('inputTextComp', InputText);

app.mount("#app");