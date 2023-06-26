import { createRouter, createWebHistory } from "vue-router";
import HomePage from '../pages/HomePage.vue';
import MapPage from "../pages/MapPage.vue";
import AccessPage from "../pages/AccessPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: "/",
            name: "home",
            component: HomePage,
        },
        {
            path: "/mapPage",
            name: "mapPage",
            component: MapPage,
        },
        {
            path: "/accessPage",
            name: "accessPage",
            component: AccessPage,
        },
    ],
});

export default router;