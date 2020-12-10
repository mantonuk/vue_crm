import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";

import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      layout: "LeftSidebar",
      auth: true
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
      layout: "LeftSidebar",
      auth: true
    },
    component: () => import("../views/Categories.vue")
  },
  {
    path: "/history",
    name: "History",
    meta: {
      layout: "LeftSidebar",
      auth: true
    },
    component: () => import("../views/History.vue")
  },
  {
    path: "/planning",
    name: "Planing",
    meta: {
      layout: "LeftSidebar",
      auth: true
    },
    component: () => import("../views/Planing.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      layout: "LeftSidebar",
      auth: true
    },
    component: () => import("../views/Profile.vue")
  },
  {
    path: "/record",
    name: "Record",
    meta: {
      layout: "LeftSidebar",
      auth: true
    },
    component: () => import("../views/Record.vue")
  },
  {
    path: "/detail-record/:id",
    name: "DetailRecord",
    meta: {
      layout: "LeftSidebar",
      auth: true
    },
    component: () => import("../views/DetailRecord.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
