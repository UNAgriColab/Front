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
            v-on:click="getBuyerOrders"
          >
            Consultar
          </md-button>
        </div>
      </md-card>
    </div>
    <md-table
      v-model="buyerOrders"
      :table-header-color="tableHeaderColor"
    >
      <md-table-row>
        <md-table-head>Oferta</md-table-head>
        <md-table-head>Unidad</md-table-head>
        <md-table-head>Número de unidades</md-table-head>
        <md-table-head>Precio total</md-table-head>
      </md-table-row>
      <md-table-row
        slot="md-table-row"
        v-for="(buyerOrder, index) in buyerOrders"
        v-bind:key="index"
      >
        <md-table-cell md-label="Producto">{{
          buyerOrder.offerReference
        }}</md-table-cell>
        <md-table-cell md-label="Unidad">{{
          buyerOrder.unit
        }}</md-table-cell>
        <md-table-cell md-label="Cantidad minima">{{
          buyerOrder.numberOfUnits
        }}</md-table-cell>
        <md-table-cell md-label="Precio por unidad"
          >$ {{ buyerOrder.totalPrice }}</md-table-cell
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
      buyerOrders: null,
      email: ""
    };
  },
  mounted() {},
  methods: {
    getBuyerOrders() {
      console.log("Get Buyer Orders");
      axios
        .get("http://localhost:8080/api/v1/order/user/" + this.email)
        .then(response => {
          this.buyerOrders = response.data;
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
