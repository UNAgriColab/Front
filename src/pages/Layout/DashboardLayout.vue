<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <div>
        <sidebar-link to="/login">
          <md-icon>face</md-icon>
          <p>Login</p>
        </sidebar-link>
        <sidebar-link to="/register">
          <md-icon>how_to_reg</md-icon>
          <p>Register</p>
        </sidebar-link>
      </div>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/buyproduct">
        <md-icon>shopping_cart</md-icon>
        <p>Buy Product</p>
      </sidebar-link>

      <sidebar-link to="/offerproduct">
        <md-icon>store</md-icon>
        <p>Offer Product</p>
      </sidebar-link>

    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

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
