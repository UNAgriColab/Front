import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import AuthLayout from "../pages/Layout/AuthLayout";
import IndexAgriColabLayout from "../pages/Layout/IndexAgriColabLayout";
import Vue from "vue";
import Router from "vue-router";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";

import Login from "../pages/Login";
import Register from "../pages/Register";
import IndexAgriColab from "../pages/IndexAgriColab";

import BuyerBuyProduct from "../pages/BuyBuyerProduct";
import SellerOfferProduct from "../pages/SellerOfferProduct";
import BuyerListAllOffers from "../pages/BuyerListAllOffers";
import SellerListMyOrders from "../pages/SellerListMyOrders";
import SellerEditMyOffer from "../pages/SellerEditMyOffer";
import SellerEditMyOrder from "../pages/SellerEditMyOrder";
import BuyerEditMyOrder from "../pages/BuyerEditMyOrder";
import SellerListMyOffers from "../pages/SellerListMyOffers";
import BuyerListMyOrders from "../pages/BuyerListMyOrders";
import BuyerPayOrder from "../pages/BuyerPayOrder";

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: IndexAgriColabLayout,
    redirect: "/indexAgriColab",
    children: [
      {
        path: "indexAgriColab",
        name: "IndexAgriColab",
        component: IndexAgriColab
      }
    ]
  },
  {
    path: "/",
    component: AuthLayout,
    redirect: "/login",
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
  },
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
        name: "Mi perfil",
        component: UserProfile
      },
      {
        path: "buyerBuyProduct",
        name: "Comprar producto",
        component: BuyerBuyProduct
      },
      {
        path: "notifications",
        name: "Notificaciones",
        component: Notifications
      },
      {
        path: "sellerOfferProduct",
        name: "Oferta de producto",
        component: SellerOfferProduct
      },
      {
        path: "buyerListAllOffers",
        name: "Ofertas disponibles",
        component: BuyerListAllOffers
      },
      {
        path: "sellerListMyOrders",
        name: "Mis pedidos",
        component: SellerListMyOrders
      },
      {
        path: "SellerListMyOffers",
        name: "Mis productos",
        component: SellerListMyOffers
      },
      {
        path: "BuyerListMyOrders",
        name: "Mis solicitudes",
        component: BuyerListMyOrders
      },
      {
        path: "sellerEditMyOffer",
        name: "Editar oferta",
        component: SellerEditMyOffer
      },
      {
        path: "sellerEditMyOrder",
        name: "Editar pedido",
        component: SellerEditMyOrder
      },
      {
        path: "buyerEditMyOrder",
        name: "Editar solicitud",
        component: BuyerEditMyOrder
      },
      {
        path: "buyerPayOrder",
        name: "Pagar orden",
        component: BuyerPayOrder
      }
    ]
  }
];

export default routes;
