<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>

      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>Perfil</p>
      </sidebar-link>

      <div
        class="md-content md-theme-selection"
        style="background-color: rgba(90,178,94,0.35); margin-top: 12px"
      >
        <h5 style="color: #FFFFFF">
          <md-icon>shopping_cart</md-icon>
          Compras
        </h5>
      </div>

      <sidebar-link to="/BuyerListAllOffers">
        <md-icon>shopping_cart</md-icon>
        <p>Lista de productos</p>
      </sidebar-link>

      <sidebar-link to="/BuyerListMyOrders">
        <md-icon>add_to_photos</md-icon>
        <p>Mis solicitudes</p>
      </sidebar-link>

      <div
        class="md-content md-theme-selection"
        style="background-color: rgba(90,178,94,0.35); margin-top: 12px"
      >
        <h5 style="color: #FFFFFF">
          <md-icon>store</md-icon>
          Ventas
        </h5>
      </div>

      <sidebar-link to="/SellerOfferProduct">
        <md-icon>store</md-icon>
        <p>Vende productos</p>
      </sidebar-link>

      <sidebar-link to="/SellerListMyOffers">
        <md-icon>spa</md-icon>
        <p>Mis productos</p>
      </sidebar-link>

      <sidebar-link to="/SellerListMyOrders">
        <md-icon>list</md-icon>
        <p>Lista de pedidos</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content></dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-5.jpeg")
    };
  }
};
</script>
