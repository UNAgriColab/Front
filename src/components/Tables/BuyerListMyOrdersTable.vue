<template>
  <div>
    <md-table v-model="buyerOrders" :table-header-color="tableHeaderColor">
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head>Producto</md-table-head>
        <md-table-head>Cantidad</md-table-head>
        <md-table-head>Unidades</md-table-head>
        <md-table-head>Precio total</md-table-head>
        <md-table-head>N° Ref</md-table-head>
        <md-table-head>Estado</md-table-head>
        <md-table-head>Editar</md-table-head>
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
        <md-table-cell md-label="Unidades" v-if="buyerOrder.unit === 1">
          Gramos
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="buyerOrder.unit === 2">
          Libras
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="buyerOrder.unit === 3">
          Kilogramos
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="buyerOrder.unit === 4">
          Arrobas
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="buyerOrder.unit === 5">
          Bultos
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else>
          No asignado
        </md-table-cell>
        <md-table-cell md-label="Precio Total">
          $ {{ buyerOrder.totalPrice.toFixed(2) }}
        </md-table-cell>
        <md-table-cell md-label="Producto">
          {{ buyerOrder.offerReference }}
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-if="buyerOrder.state === 0">
          Cancelado
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="buyerOrder.state === 1">
          En espera
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="buyerOrder.state === 2">
          En proceso
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="buyerOrder.state === 3">
          Enviado
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="buyerOrder.state === 4">
          Recibido
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else>
          No asignado
        </md-table-cell>
        <md-table-cell md-label="Edit">
          <router-link to="/BuyerEditMyOrder" class="text-white">
            <md-button
              class="md-fab md-icon-button md-raised md-success"
              :value="buyerOrder.id"
              @click="addIdBuyerOrder(buyerOrder.id)"
            >
              <md-icon>create</md-icon>
            </md-button>
          </router-link>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from "axios";

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
      aux: null
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
      console.log("Get Buyer Orders");
      axios
        .get("/v1/order/user/" + this.email, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          this.buyerOrders = response.data;
        })
        .catch(e => console.log(e));
    },
    addIdBuyerOrder: function(Id) {
      localStorage.setItem("buyerOrderId", Id);
    }
  }
};
</script>
