import { createApp } from 'vue';
import './assets/style/theme-medium.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Sidebar from 'primevue/sidebar';

const app = createApp(App);
app.use(PrimeVue);
app.component('sidebarComp', Sidebar);
app.mount("#app");