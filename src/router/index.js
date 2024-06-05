import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SettingsView from "../views/SettingsView.vue";
import OperatorsManagerView from "../views/OperatorsManagerView.vue";
import TeamInboxView from "../views/TeamInboxView.vue";
import ContactsManagerView from "@/views/ContactsManagerView.vue";
import BroadcastView from "@/views/BroadcastView.vue";
import BroadcastMetrics from "@/components/dashboard/BroadcastMetrics"
import BroadcastListView from "@/views/BroadcastListView.vue";


Vue.use(VueRouter);

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
  },
  {
    path: "/operator-manager",
    name: "operator-manager",
    component: OperatorsManagerView,
  },
  {
    path: "/team-inbox",
    name: "team-inbox",
    component: TeamInboxView,
  },
  {
    path: "/contacts",
    name: "contacts",
    component: ContactsManagerView,
  },
  {
    path: "/broadcast",
    name: "broadcast",
    component: BroadcastView,
  },
  {
    path: "/broadcast-history",
    name: "broadcast-history",
    component: BroadcastListView,
  },
  {
    path: "/broadcast-metrics/:id",
    name: "broadcast-metrics",
    component: BroadcastMetrics,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
