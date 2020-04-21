import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import AuthLayout from "../pages/Layout/AuthLayout";

import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";


import Notifications from "@/pages/Notifications.vue";
import BuyProduct from "../pages/BuyProduct";
import OfferProduct from "@/pages/OfferProduct.vue";
import Login from "../pages/Login";
import Register from "../pages/Register";

import OfferList from "../pages/OfferList";
import RequestList from "../pages/RequestList";
import UserOffers from "../pages/UserOffers";
import UserRequests from "../pages/UserRequests";

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "buyproduct",
        name: "BuyProduct",
        component: BuyProduct
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "offerProduct",
        name: "OfferProduct",
        component: OfferProduct
      },
      {
        path: "offerList",
        name: "lista de ofertas",
        component: OfferList
      },
      {
        path: "requestList",
        name: "RequestList",
        component: RequestList
      },
      {
        path: "UserOffers",
        name: "Productos ofertados",
        component: UserOffers
      },
      {
        path: "UserRequests",
        name: "Solicitudes realizadas",
        component: UserRequests
      }
    ]
  },
  {
    path: "/",
    component: AuthLayout,
    redirect: "/auth",
    children: [
      {
        path: "login",
        name: "Login",
        component: Login
      },
      {
        path: "/register",
        name: "register",
        component: Register
      }
    ]
  }
];

export default routes;
