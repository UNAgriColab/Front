<template>
  <div>
    <md-table
      v-model="buyerSuggested"
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
        <md-table-head>Ver</md-table-head>
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
          {{ offer.minQuantity }}
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
          $ {{ offer.pricePresentation.toFixed(2) }}
        </md-table-cell>
        <md-table-cell md-label="Producto">
          {{ offer.id }}
        </md-table-cell>
        <md-table-cell md-label="Editar">
          <router-link to="/BuyerBuyProduct" class="text-white">
            <md-button
              class="md-fab md-icon-button md-raised md-success"
              :value="offer.id"
              @click="addIdOffer(offer.id)"
            >
              <md-icon>shopping_cart</md-icon>
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
  name: "DoubleLine",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      buyerSuggested: null,
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
        .get("/offer/suggested/" + this.email, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          this.offers = response.data;
        })
        .catch(e => console.log(e));
    },
    addIdOffer: function(Id) {
      localStorage.setItem("buyerOrderId", Id);
    }
  }
};
</script>
