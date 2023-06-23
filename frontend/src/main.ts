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
import Tag from "primevue/tag";
import ScrollPanel from "primevue/scrollpanel";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import ToggleButton from "primevue/togglebutton";
import SelectButton from "primevue/selectbutton";

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
app.component('tagComp', Tag);
app.component('scrollPanelComp', ScrollPanel);
app.component('accordionComp', Accordion);
app.component('accordionTabComp', AccordionTab);
app.component('toggleButtonComp', ToggleButton);
app.component('selectButtonComp', SelectButton);

app.mount("#app");