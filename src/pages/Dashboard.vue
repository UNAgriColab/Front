<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>store</md-icon>
          </template>

          <template slot="content">
            <p class="category">Ventas</p>
            <h3 class="title">{{ userData[1] }}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <a href="#/SellerListMyOrders">
                <md-icon class="text-primary">playlist_add</md-icon>
                Ir a mis pedidos</a
              >
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>shopping_cart</md-icon>
          </template>

          <template slot="content">
            <p class="category">Compras</p>
            <h3 class="title">
              {{ userData[0] }}
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <a href="#/BuyerListMyOrders">
                <md-icon class="text-primary">add_to_photos</md-icon>
                Ir a mis solicitudes</a
              >
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>spa</md-icon>
          </template>

          <template slot="content">
            <p class="category">Productos</p>
            <h3 class="title">{{ userData[3] }}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <a href="#/BuyerListAllOffers">
                <md-icon class="text-primary">shopping_cart</md-icon>
                Ir a la lista de productos</a
              >
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>account_circle</md-icon>
          </template>

          <template slot="content">
            <p class="category">Mi perfil</p>
            <h3 class="title">{{ userData[2] }}<small> Pendiente</small></h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <a href="#/user">
                <md-icon class="text-primary">person</md-icon>
                Actualizar</a
              >
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Sugerencias</h4>
            <p class="category">Productos sugeridos</p>
          </md-card-header>
          <md-card-content>
            <buyer-suggested-offers-table
              table-header-color="green"
            ></buyer-suggested-offers-table>
          </md-card-content>
        </md-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Ventas</h4>
            <p class="category">Resumen de las últimas ventas realizadas</p>
          </md-card-header>
          <md-card-content>
            <seller-dashboard-my-orders-table
              table-header-color="green"
            ></seller-dashboard-my-orders-table>
          </md-card-content>
        </md-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Compras</h4>
            <p class="category">Resumen de las últimas compras realizadas</p>
          </md-card-header>
          <md-card-content>
            <buyer-dashboard-my-orders-table
              table-header-color="orange"
            ></buyer-dashboard-my-orders-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  StatsCard,
  BuyerSuggestedOffersTable,
  BuyerDashboardMyOrdersTable,
  SellerDashboardMyOrdersTable
} from "@/components";
import http from "../http-common";

export default {
  components: {
    StatsCard,
    BuyerSuggestedOffersTable,
    BuyerDashboardMyOrdersTable,
    SellerDashboardMyOrdersTable
  },
  data() {
    return {
      userData: {},
      options: {}
    };
  },

  mounted() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.email = this.aux.email;
      }
      http
        .get("/user/dashboard/" + this.email, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          this.userData = response.data;
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
