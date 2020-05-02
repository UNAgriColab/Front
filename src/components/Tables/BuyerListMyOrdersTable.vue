<template>
  <div>
    <div class="md-layout">
      <md-card>
        <form>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label for="username">email</label>
              <md-icon>mail_outline</md-icon>
              <md-input
                id="username"
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
              v-on:click="saveEmail"
            >
              Consultar
            </md-button>
          </div>
        </form>
      </md-card>
    </div>
    <md-table v-model="buyerListMyOrders" :table-header-color="tableHeaderColor">
      <md-table-row>
        <md-table-head>Producto</md-table-head>
        <md-table-head>Unidad</md-table-head>
        <md-table-head>Número de unidades</md-table-head>
        <md-table-head>Precio total</md-table-head>
      </md-table-row>
      <md-table-row
        slot="md-table-row"
        v-for="(buyerListMyOrders, index) in buyerListMyOrders"
        v-bind:key="index"
      >
        <md-table-cell md-label="Producto">{{
          buyerListMyOrders.productName
        }}</md-table-cell>
        <md-table-cell md-label="Unidad">{{
          buyerListMyOrders.unit
        }}</md-table-cell>
        <md-table-cell md-label="Cantidad minima">{{
          buyerListMyOrders.numberOfUnits
        }}</md-table-cell>
        <md-table-cell md-label="Precio por unidad"
          >$ {{ buyerListMyOrders.totalPrice }}</md-table-cell
        >
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "simple-table",
  data: function() {
    return {
      email: "",
      selected: [],
      buyerListMyOrders: null
    };
  },
  mounted() {
    console.log("Hola mounted");
    this.getBuyerListMyOrders();
  },
  methods: {
    saveEmail() {
      const data = {
        email: this.email
      };
    },
    getBuyerListMyOrders() {
      console.log("Metodo get user requests");
      axios
        .get(`http://localhost:8080/api/v1/request/user/3@unal.edu.co`)
        .then(response => {
          console.log(response);
          this.buyerListMyOrders = response.data;
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
