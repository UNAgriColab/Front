<template>
  <div class="content" :style="styleContent">
    <div class="md-layout">
      <top-navbar-auth></top-navbar-auth>
    </div>
    <div class="md-layout" :style="styleForm">
      <div class="md-layout-item md-size-39"></div>
      <div class="md-layout-item md-size-22">
        <img :src="logo" alt="Agricolab"/>
        <h5 style="text-align: center">El campo a un clic de distancia</h5>

        <auth-content></auth-content>
      </div>
      <div class="md-layout-item md-size-39"></div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item" :style="styleFooter">
        <content-footer></content-footer>
      </div>
    </div>
  </div>
</template>

<script>
  import AuthContent from "./Content.vue";
  import TopNavbarAuth from "./TopNavbarAuth.vue";
  import ContentFooter from "./ContentFooter.vue";

  export default {
    components: {
      AuthContent,
      TopNavbarAuth,
      ContentFooter
    },
    props: {
      logo: {
        default: require("@/assets/img/logo/logo2.png")
      }
    },
    data() {
      return {
        styleContent: {
          backgroundImage: "url(" + require("@/assets/img/auth.jpg") + ")",
          backgroundSize: "cover",
          textAlign: "center"
        },
        styleForm: {
          padding: "5%"
        },
        styleFooter: {
          padding: "5%"
        }
      };
    }
  };
</script>
