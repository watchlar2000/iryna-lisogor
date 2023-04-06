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
    meta: {
      title: "Home",
    },
  },
  {
    path: "/project/:slug",
    name: "project",
    component: () => import("../views/Project.vue"),
    props: true,
    meta: {
      title: "Projects",
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
    meta: {
      title: "About",
    },
  },
  {
    path: "*",
    name: "not-found",
    component: () => import("../views/NotFound.vue"),
    meta: {
      title: "404",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0, behavior: "smooth" };
  },
});

router.beforeResolve((to, from, next) => {
  const projectStore = useProjectStore();

  if (projectStore.projects.length === 0) {
    NProgress.start();
    projectStore.load();
  }

  next();
});

router.beforeEach((to, from, next) => {
  window.document.title = `${to.meta.title} | Iryna Lisogor`;
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
