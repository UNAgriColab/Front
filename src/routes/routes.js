import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import AuthLayout from "../pages/Layout/AuthLayout";

import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import BuyProduct from "../pages/BuyProduct";
import OfferProduct from "@/pages/OfferProduct.vue";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ShoppingCar from "../pages/ShoppingCar";
import UserOffers from "../pages/UserOffers";
import OfferList from "../pages/OfferList";
import RequestList from "../pages/RequestList";

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
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "buyproduct",
        name: "BuyProduct",
        component: BuyProduct
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO
      },
      {
        path: "offerProduct",
        name: "OfferProduct",
        component: OfferProduct
      },
      {
        path: "shoppingCar",
        name: "Shopping Car",
        component: ShoppingCar
      },
      {
        path: "UserOffers",
        name: "Productos ofertados",
        component: UserOffers
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
