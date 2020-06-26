<template>
  <div class="md-layout" :style="styleContent">
    <div class="md-layout-item md-size-100" :style="styleNavbar">
      <top-navbar-index></top-navbar-index>
    </div>

    <index-content></index-content>

    <div class="md-layout-item md-size-100" :style="styleFooter">
      <content-footer></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbarIndex from "./TopNavbarIndex.vue";
import ContentFooter from "./ContentFooter.vue";
import IndexContent from "./Content.vue";

export default {
  name: "TabIcons",
  components: {
    TopNavbarIndex,
    ContentFooter,
    IndexContent
  },
  props: {
    logo: {
      default: require("@/assets/img/logo/logo2.png")
    }
  },
  data() {
    return {
      styleContent: {
        backgroundImage: "url(" + require("@/assets/img/index.jpg") + ")",
        backgroundSize: "cover",
        textAlign: "center"
      },
      styleForm: {
        padding: "5%"
      },
      styleFooter: {
        marginTop: "13%",
        textColor: "#4caf50"
      },
      styleNavbar: {
        marginBottom: "14%"
      }
    };
  }
};
</script>
<style></style>
