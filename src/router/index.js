import Vue from "vue";
import Router from "vue-router";
import home from "@/components/Home";
//高德原生SDK
import nativeSdk from "@/components/NativeSdk";
//官方UI
import ui from "@/components/Ui";
//搜索
import search from "@/components/Search";
//使用sdk进行搜索
import searchBySdk from "@/components/SearchBySdk";
//输入提示+搜索服务
import searchByPois from "@/components/SearchByPois";
//定位
import position from "@/components/Position";
//拖拽选点
import drag from "@/components/Drag";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: home
    },
    {
      path: "/nativeSdk",
      name: "nativeSdk",
      component: nativeSdk
    },
    {
      path: "/ui",
      name: "ui",
      component: ui
    },
    {
      path: "/search",
      name: "search",
      component: search
    },
    {
      path: "/searchBySdk",
      name: "searchBySdk",
      component: searchBySdk
    },
    {
      path: "/position",
      name: "position",
      component: position
    },
    {
      path: "/drag",
      name: "drag",
      component: drag
    },
    {
      path: "/searchByPois",
      name: "searchByPois",
      component: searchByPois
    }
  ]
});
