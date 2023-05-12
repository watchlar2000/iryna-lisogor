// import { useProjectStore } from "@/stores/project";
// import pinia from "@/stores/store";
// import NProgress from "nprogress";
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
    // props: true,
    // beforeEnter: async (to, from, next) => {
    //   NProgress.start();
    //   const projectStore = useProjectStore(pinia);

    //   if (projectStore.projects.length) {
    //     to.params.projects = projectStore.projects;
    //     next();
    //   }

    //   try {
    //     const projectsData = await projectStore.load();

    //     if (projectsData === undefined) throw new Error();

    //     to.params.projects = projectsData;

    //     next();
    //   } catch (e) {
    //     NProgress.done();
    //     const error = projectStore.error;

    //     if (error === "404") {
    //       next({ name: "404", params: { resource: "project" } });
    //     } else {
    //       next({ name: "network-issue" });
    //     }
    //   }
    // },
  },
  {
    path: "/project/:slug",
    name: "project",
    component: () => import("../views/Project.vue"),
    props: true,
    meta: {
      title: "Project",
    },
    // beforeEnter: async (to, from, next) => {
    //   NProgress.start();
    //   const projectStore = useProjectStore(pinia);
    //   const slug = to.params.slug;

    //   try {
    //     const projectData = await projectStore.getProject(slug);

    //     if (projectData === undefined) throw new Error();

    //     to.params.projectData = projectData;
    //     next();
    //   } catch (e) {
    //     NProgress.done();
    //     const error = projectStore.error;

    //     if (error === "404") {
    //       next({ name: "404", params: { resource: "project" } });
    //     } else {
    //       next({ name: "network-issue" });
    //     }
    //   }
    // },
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
    path: "/illustrations",
    name: "illustrations",
    component: () => import("../views/Projects.vue"),
    props: true,
    meta: {
      title: "Illustrations",
    },
    beforeEnter: async (to, from, next) => {
      to.params.category = "illustrations";
      next();
    },
  },
  {
    path: "/character-design",
    name: "character-design",
    component: () => import("../views/Projects.vue"),
    props: true,
    meta: {
      title: "Character design",
    },
    beforeEnter: async (to, from, next) => {
      to.params.category = "character-design";
      next();
    },
  },
  {
    path: "/sketches",
    name: "sketches",
    component: () => import("../views/Projects.vue"),
    props: true,
    meta: {
      title: "Sketches",
    },
    beforeEnter: async (to, from, next) => {
      to.params.category = "sketches";
      next();
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/NotFound.vue"),
    props: true,
    meta: {
      title: "404",
    },
  },
  {
    path: "/network-issue",
    name: "network-issue",
    component: () => import("../views/NetworkIssue.vue"),
    props: true,
    meta: {
      title: "Network Issue",
    },
  },
  {
    path: "*",
    redirect: { name: "404", params: { resource: "page" } },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, from, next) => {
  window.document.title = `${to.meta.title} | Iryna Lisogor`;
  next();
});

export default router;
