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
import Password from "primevue/password";
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import axios from "axios";
axios.defaults.withCredentials = true;

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.use(PrimeVue);
app.use(router);

app.component('sidebarComp', Sidebar);
app.component('buttonComp', Button);
app.component('inputTextComp', InputText);
app.component('passwordComp', Password);
app.component('dropdownComp', Dropdown);
app.component('calendarComp', Calendar);

app.mount("#app");