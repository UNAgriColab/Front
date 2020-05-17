<template>
  <div>
    <md-table v-model="sellerOffers" :table-header-color="tableHeaderColor">
      <md-table-row>
        <md-table-head>Producto</md-table-head>
        <md-table-head>Presentación</md-table-head>
        <md-table-head>Cantidad mínima</md-table-head>
        <md-table-head>Precio por presentación</md-table-head>
        <!--<md-table-head>Acciones</md-table-head>-->
      </md-table-row>
      <md-table-row
        slot="md-table-row"
        v-for="(sellerOffer, index) in sellerOffers"
        v-bind:key="index"
      >
        <md-table-cell md-label="Producto">
          {{ sellerOffer.productName }}
        </md-table-cell>
        <md-table-cell md-label="Presentación">
          {{ sellerOffer.presentation }}
        </md-table-cell>
        <md-table-cell md-label="Cantidad mínima">
          {{ sellerOffer.minQuantity }}
        </md-table-cell>
        <md-table-cell md-label="Precio por unidad">
          $ {{ sellerOffer.pricePresentation }}
        </md-table-cell>
        <md-table-cell md-label="Acciones">
          <router-link to="SellerEditMyOffer" class="text-white">
            <md-button
              class="md-raised md-success"
              :value="sellerOffer.id"
              @click="addIdOffer(sellerOffer.id)"
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
      sellerOffers: null,
      email: "",
      aux: null
    };
  },
  mounted() {
    this.storage();
    this.getSellerOffers();
  },
  methods: {
    storage() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.email = this.aux.email;
      }
    },
    getSellerOffers() {
      console.log("Get Seller Offers");
      axios
        .get("http://localhost:8080/api/v1/offer/user/" + this.email, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          this.sellerOffers = response.data;
        })
        .catch(e => console.log(e));
    },
    addIdOffer: function(Id) {
      let IdAux = Id;
      alert(IdAux);
      localStorage.setItem("buyerOrderId", IdAux);
      alert(IdAux);
    }
  }
};
</script>
