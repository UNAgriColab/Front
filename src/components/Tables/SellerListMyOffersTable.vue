<template>
  <div>
    <div class="md-layout">
      <md-card>
        <div class="md-layout-item md-small-size-100 md-size-50">
          <md-field>
            <label for="email">Correo electrónico</label>
            <md-icon>mail_outline</md-icon>
            <md-input
              id="email"
              type="text"
              placeholder="Correo electrónico"
              v-model="email"
            >
            </md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-50 text-center">
          <md-button
            type="submit"
            class="md-raised md-success"
            v-on:click="getSellerOffers"
          >
            Consultar
          </md-button>
        </div>
      </md-card>
    </div>
    <md-table v-model="sellerOffers" :table-header-color="tableHeaderColor">
      <md-table-row>
        <md-table-head>Producto</md-table-head>
        <md-table-head>Presentación</md-table-head>
        <md-table-head>Cantidad mínima</md-table-head>
        <md-table-head>Precio por presentación</md-table-head>
      </md-table-row>
      <md-table-row
        slot="md-table-row"
        v-for="(sellerOffer, index) in sellerOffers"
        v-bind:key="index"
      >
        <md-table-cell md-label="Producto">{{
          sellerOffer.productName
        }}</md-table-cell>
        <md-table-cell md-label="Presentación">{{
          sellerOffer.presentation
        }}</md-table-cell>
        <md-table-cell md-label="Cantidad mínima">{{
          sellerOffer.minQuantity
        }}</md-table-cell>
        <md-table-cell md-label="Precio por unidad"
          >$ {{ sellerOffer.pricePresentation }}</md-table-cell
        >
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "simple-table",
  data() {
    return {
      sellerOffers: null,
      email: ""
    };
  },
  mounted() {},
  methods: {
    getSellerOffers() {
      console.log("Get Seller Offers");
      axios
        .get("http://localhost:8080/api/v1/offer/user/" + this.email)
        .then(response => {
          this.sellerOffers = response.data;
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
