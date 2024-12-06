import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue"; // Adjust to your file structure
import Cart from "../views/CartPage.vue"; // Your Cart component

const routes = [
  { path: "/", component: Home },
  { path: "/cart", component: Cart },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
