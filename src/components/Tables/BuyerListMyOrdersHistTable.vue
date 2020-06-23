<template>
  <div>
    <md-table
      v-model="buyerOrders"
      :table-header-color="tableHeaderColor"
      style="text-align: center"
    >
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head style="text-align: center">Producto</md-table-head>
        <md-table-head style="text-align: center">Cantidad</md-table-head>
        <md-table-head style="text-align: center">Unidades</md-table-head>
        <md-table-head style="text-align: center">Precio total</md-table-head>
        <md-table-head style="text-align: center">N° Ref</md-table-head>
        <md-table-head style="text-align: center">Estado</md-table-head>
        <md-table-head>Ver</md-table-head>
      </md-table-row>
      <md-table-row
        slot="md-table-row"
        v-for="(buyerOrder, index) in buyerOrders"
        v-bind:key="index"
      >
        <md-table-cell md-label="Imágen">
          <md-icon style="color: #58b05c">shopping_cart</md-icon>
        </md-table-cell>
        <md-table-cell md-label="Producto">
          {{ buyerOrder.productName }}
        </md-table-cell>
        <md-table-cell md-label="Cantidad">
          {{ buyerOrder.numberOfUnits }}
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-if="buyerOrder.presentation === 1">
          Gramos
        </md-table-cell>
        <md-table-cell
          md-label="Unidades"
          v-else-if="buyerOrder.presentation === 2"
        >
          Libras
        </md-table-cell>
        <md-table-cell
          md-label="Unidades"
          v-else-if="buyerOrder.presentation === 3"
        >
          Kilogramos
        </md-table-cell>
        <md-table-cell
          md-label="Unidades"
          v-else-if="buyerOrder.presentation === 4"
        >
          Arrobas
        </md-table-cell>
        <md-table-cell
          md-label="Unidades"
          v-else-if="buyerOrder.presentation === 5"
        >
          Bultos
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else>
          No asignado
        </md-table-cell>
        <md-table-cell md-label="Precio Total">
          $ {{ buyerOrder.totalPrice.toFixed(2) }}
        </md-table-cell>
        <md-table-cell md-label="Producto">
          {{ buyerOrder.id }}
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-if="buyerOrder.state === 0">
          <md-chip class="text-white" style="background-color: #cc2127">
            <md-icon class="text-white">cancel</md-icon> Cancelado
          </md-chip>
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="buyerOrder.state === 2">
          <md-chip class="text-white" style="background-color: saddlebrown">
            <md-icon class="text-white">timer</md-icon> En espera
          </md-chip>
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="buyerOrder.state === 3">
          <md-chip class="text-white" style="background-color: #0d47a1">
            <md-icon class="text-white">settings</md-icon> En proceso
          </md-chip>
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="buyerOrder.state === 4">
          <md-chip class="text-white" style="background-color: goldenrod">
            <md-icon class="text-white">local_shipping</md-icon> Enviado
          </md-chip>
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="buyerOrder.state === 1">
          <md-chip class="md-primary text-white">
            <md-icon class="text-white">beenhere</md-icon> Recibido
          </md-chip>
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else>
          No asignado
        </md-table-cell>
        <md-table-cell md-label="Ver">
          <router-link to="/BuyerEditMyOrder" class="text-white">
            <md-button
              class="md-fab md-icon-button md-raised md-success"
              :value="buyerOrder.id"
              @click="addIdBuyerOrder(buyerOrder.id)"
            >
              <md-icon>loupe</md-icon>
            </md-button>
          </router-link>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import http from "../../http-common";
import EventBus from "../../event-bus";

export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      buyerOrders: null,
      email: "",
      product: "all",
      state: "-1",
      aux: null,
      temp: {
        state: "-1",
        product: "all"
      }
    };
  },
  mounted() {
    this.getBuyerOrders();
  },
  methods: {
    getBuyerOrders() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.email = this.aux.email;
      }
      if (this.temp.state === "") {
        this.temp.state = "-1";
      }
      if (this.temp.producto === "") {
        this.temp.product = "all";
      }
      http
        .get(
          "/order/buyer/" +
            this.email +
            "/" +
            this.temp.product +
            "/" +
            this.temp.state,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            },
            withCredentials: false
          }
        )
        .then(response => {
          this.buyerOrders = response.data;
        })
        .catch(e => console.log(e));
    },
    addIdBuyerOrder: function(Id) {
      localStorage.setItem("buyerOrderId", Id);
    }
  },
  created() {
    EventBus.$on("dataSend1", data => {
      this.temp.product = data;
    });
    EventBus.$on("dataSend2", data => {
      this.temp.state = data;
    });
    EventBus.$on("readFunction", this.getBuyerOrders);
  }
};
</script>
