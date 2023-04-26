import Vue from "vue";
import VueRouter from "vue-router";
import fly from "../views/fly.vue";
import effectScatterMap from "../views/effectScatter-map.vue";
import geoLine from "../views/geo-line.vue";
import heatmap from "../views/heatmap.vue";
import scatterWeibo from "../views/scatter-weibo.vue";
import linesAirline from "../views/lines-airline.vue";
import pie from "../views/pie.vue";
import busEffect from "../views/bus-effect.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "fly",
  },
  {
    path: "/fly",
    name: "fly",
    component: fly,
  },
  {
    path: "/pie",
    name: "pie",
    component: pie,
  },
  {
    path: "/effectScatterMap",
    name: "EffectScatterMap",
    component: effectScatterMap,
  },
  {
    path: "/geoLine",
    name: "geoLine",
    component: geoLine,
  },
  {
    path: "/heatmap",
    name: "heatmap",
    component: heatmap,
  },
  {
    path: "/scatterWeibo",
    name: "scatterWeibo",
    component: scatterWeibo,
  },
  {
    path: "/lines-airline",
    name: "lines-airline",
    component: linesAirline,
  },
  {
    path: "/busEffect",
    name: "bus-effect",
    component: busEffect,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
