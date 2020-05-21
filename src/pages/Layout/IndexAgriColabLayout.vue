<template>
  <div class="content" :style="styleContent">
    <div class="md-layout" :style="styleForm">
      <div class="md-layout-item md-size-100">
        <img :src="logo" alt="Agricolab" />
        <h4 style="text-align: center">El campo a un clic de distancia</h4>
      </div>

      <div class="md-layout-item md-size-100" style="margin-top: 40px">
        <md-tabs class="md-primary" md-alignment="centered">
          <md-tab id="tab-home" md-label="Inicio" md-icon="home">
            <h3 class="title text-center" style="color: #4caf50">
              <b>Bienvenid@</b>
            </h3>
            <h4 class="title text-center" style="margin-bottom: 15px">
              A la nueva plataforma para la compra y venta de productos
              agricolas del campo colombiano
            </h4>
            <md-list class="md-triple-line">
              <md-list-item>
                <md-avatar>
                  <img src="http://lorempixel.com/60/60/food/1/" alt="food" />
                </md-avatar>

                <div class="md-list-item-text">
                  <h3 style="color: #4fa953"><b>Compra</b></h3>
                  <h4>Productos fantasticos</h4>
                </div>

                <md-button
                  to="/login"
                  class="md-button md-list-action md-success"
                  style="margin-top: 15px"
                >
                  <md-icon class="md-primary">shopping_cart</md-icon>
                  Ingreso
                </md-button>
              </md-list-item>

              <md-divider class="md-inset"></md-divider>

              <md-list-item>
                <md-avatar>
                  <img src="http://lorempixel.com/60/60/food/5/" alt="food" />
                </md-avatar>

                <div class="md-list-item-text">
                  <h3 style="color: #4fa953"><b>Vende</b></h3>
                  <h3>Sin intermediarios</h3>
                </div>

                <md-button
                  to="/register"
                  class="md-button md-list-action md-success"
                  style="margin-top: 15px"
                >
                  <md-icon>store</md-icon>
                  Registro
                </md-button>
              </md-list-item>
              <md-divider
                class="md-inset"
                style="margin-bottom: 15px"
              ></md-divider>
            </md-list>
          </md-tab>
          <md-tab id="tab-pages" md-label="Compra" md-icon="shopping_cart">
            Compras
          </md-tab>
          <md-tab id="tab-store" md-label="Vende" md-icon="store">
            Ventas
          </md-tab>
        </md-tabs>
      </div>
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
  name: "TabIcons",
  components: {
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
