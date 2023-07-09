import { createApp } from 'vue';
import './assets/style/theme-medium.css';
import './assets/style/font.css';
import './assets/style/map.css';
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
import Message from 'primevue/message';
import Tag from "primevue/tag";
import ScrollPanel from "primevue/scrollpanel";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import Chips from 'primevue/chips';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import MultiSelect from 'primevue/multiselect';
import Chart from 'primevue/chart';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import VueCookies from "vue-cookies";
import axios from "axios";
axios.defaults.withCredentials = true;

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.use(PrimeVue);
app.use(router);
app.use(VueCookies);

app.component('sidebarComp', Sidebar);
app.component('buttonComp', Button);
app.component('inputTextComp', InputText);
app.component('passwordComp', Password);
app.component('dropdownComp', Dropdown);
app.component('calendarComp', Calendar);
app.component('messageComp', Message);
app.component('tagComp', Tag);
app.component('scrollPanelComp', ScrollPanel);
app.component('accordionComp', Accordion);
app.component('accordionTabComp', AccordionTab);
app.component('tabViewComp', TabView);
app.component('tabPanelComp', TabPanel);
app.component('cardComp', Card);
app.component('textareaComp', Textarea);
app.component('chipsComp', Chips);
app.component('inputNumberComp', InputNumber);
app.component('inputMaskComp', InputMask);
app.component('multiSelectComp', MultiSelect);
app.component('chartComp', Chart);

app.mount("#app");