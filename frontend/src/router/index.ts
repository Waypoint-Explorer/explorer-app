import { createRouter, createWebHistory } from "vue-router";
import HomePage from '../pages/HomePage.vue';
import AdminMapPage from "../pages/AdminMapPage.vue";
import MapPage from "../pages/MapPage.vue";
import NavigationPage from "../pages/NavigationPage.vue";
import AccessPage from "../pages/AccessPage.vue";
import ManagementPage from "../pages/ManagementPage.vue";
import CouponManagementPage from "../pages/CouponManagementPage.vue";
import CouponPage from "../pages/CouponPage.vue";
import HistoryPage from "../pages/HistoryPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: "/",
            name: "home",
            component: HomePage,
        },
        {
            path: "/adminMapPage",
            name: "adminMapPage",
            component: AdminMapPage,
        },
        {
            path: "/mapPage",
            name: "mapPage",
            component: MapPage,
        },
        {
            path: "/navigationPage",
            name: "navigationPage",
            component: NavigationPage,
        },
        {
            path: "/accessPage",
            name: "accessPage",
            component: AccessPage,
        },
        {
            path: "/managementPage",
            name: "managementPage",
            component: ManagementPage,
        },
        {
            path: "/couponManagementPage",
            name: "couponManagementPage",
            component: CouponManagementPage,
        },
        {
            path: "/couponPage",
            name: "couponPage",
            component: CouponPage,
        },
        {
            path: "/historyPage",
            name: "historyPage",
            component: HistoryPage,
        },
    ],
});

export default router;