import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      layout: "LeftSidebar"
    },
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      layout: "Empty"
    },
    component: () => import("../views/Register.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "Empty"
    },
    component: () => import("../views/Login.vue")
  },
  {
    path: "/categories",
    name: "Categories",
    meta: {
      layout: "LeftSidebar"
    },
    component: () => import("../views/Categories.vue")
  },
  {
    path: "/history",
    name: "History",
    meta: {
      layout: "LeftSidebar"
    },
    component: () => import("../views/History.vue")
  },
  {
    path: "/planning",
    name: "Planing",
    meta: {
      layout: "LeftSidebar"
    },
    component: () => import("../views/Planing.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      layout: "LeftSidebar"
    },
    component: () => import("../views/Profile.vue")
  },
  {
    path: "/record",
    name: "Record",
    meta: {
      layout: "LeftSidebar"
    },
    component: () => import("../views/Record.vue")
  },
  {
    path: "/detail-record",
    name: "DetailRecord",
    meta: {
      layout: "LeftSidebar"
    },
    component: () => import("../views/DetailRecord.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
