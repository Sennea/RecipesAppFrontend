import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/auth/:option",
    name: "Authorization",
    props: true,
    component: () => import("../components/Authorization"),
  },
  {
    path: "/category/:name",
    name: "AllGrid",
    props: true,
    component: () => import("../components/AllGrid"),
  },
  {
    path: "/recipe/:id",
    name: "InfoPage",
    props: true,
    component: () => import("../components/InfoPage"),
  },
  {
    path: "/admin",
    name: "AddRecipePage",
    component: () => import("../components/AddRecipePage"),
  },
  // {
  //   path: "/favorites",
  //   name: "AllGrid",
  //   props: {favorites: true},
  //   component: () => import("../components/AllGrid"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
