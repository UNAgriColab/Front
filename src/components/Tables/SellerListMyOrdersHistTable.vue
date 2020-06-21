<template>
  <div>
    <md-table v-model="sellerOrders" :table-header-color="tableHeaderColor">
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head>Producto</md-table-head>
        <md-table-head>Cantidad</md-table-head>
        <md-table-head>Unidades</md-table-head>
        <md-table-head>Precio total</md-table-head>
        <md-table-head>N° Ref</md-table-head>
        <md-table-head>Estado</md-table-head>
      </md-table-row>
      <md-table-row
        slot="md-table-row"
        v-for="(offer, index) in offers"
        v-bind:key="index"
      >
        <md-table-cell md-label="Imágen">
          <md-icon style="color: #58b05c">storefront</md-icon>
        </md-table-cell>
        <md-table-cell md-label="Producto">
          {{ offer.productName }}
        </md-table-cell>
        <md-table-cell md-label="Cantidad">
          {{ offer.numberOfUnits }}
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-if="offer.presentation === 1">
          Gramos
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.presentation === 2">
          Libras
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.presentation === 3">
          Kilogramos
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.presentation === 4">
          Arrobas
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.presentation === 5">
          Bultos
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else>
          No asignado
        </md-table-cell>
        <md-table-cell md-label="Precio Total">
          $ {{ offer.totalPrice.toFixed(2) }}
        </md-table-cell>
        <md-table-cell md-label="Producto">
          {{ offer.id }}
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-if="offer.state === 0">
          <md-chip class="text-white" style="background-color: #cc2127">
            <md-icon class="text-white">cancel</md-icon> Cancelado
          </md-chip>
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.state === 2">
          <md-chip class="text-white" style="background-color: saddlebrown">
            <md-icon class="text-white">timer</md-icon> En espera
          </md-chip>
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.state === 3">
          <md-chip class="text-white" style="background-color: #0d47a1">
            <md-icon class="text-white">settings</md-icon> En proceso
          </md-chip>
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.state === 4">
          <md-chip class="text-white" style="background-color: goldenrod">
            <md-icon class="text-white">local_shipping</md-icon> Enviado
          </md-chip>
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.state === 1">
          <md-chip class="md-primary text-white">
            <md-icon class="text-white">beenhere</md-icon> Recibido
          </md-chip>
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else>
          No asignado
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import http from "../../http-common";
import EventBus from "../../event-bus";

export default {
  name: "DoubleLine",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      sellerOrders: null,
      userEmail: "",
      offers: null,
      order: null,
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
    this.getOffers();
  },
  methods: {
    getOffers() {
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
          "/order/seller/" +
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
          this.offers = response.data;
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
    EventBus.$on("readFunction", this.getOffers);
  }
};
</script>
