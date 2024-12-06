import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "lessons",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartPage.vue"),
    },
  ],
});

export default router;
