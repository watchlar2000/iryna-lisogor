import { useProjectStore } from "@/stores/project";
import NProgress from "nprogress";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/project/:slug",
    name: "project",
    component: () => import("../views/Project.vue"),
    props: true,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeResolve((to, from, next) => {
  const projectStore = useProjectStore();

  if (projectStore.projects.length === 0) {
    NProgress.start();
    projectStore.load();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
