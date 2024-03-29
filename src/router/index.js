import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "../views/ContactBook.vue";


const routes = [
    {
        path: "/",
        name: "contactbook",
        component: ContactBook,
    },
    {
        path: "/contacts/:id",
        name: "contact.edit",
        component: () => import("../views/ContactEdit.vue"),
        props: true // Truyen cac bien trong $route.params vao lam props
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("../views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;