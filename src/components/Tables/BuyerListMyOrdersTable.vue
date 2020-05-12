<template>
  <div>
    <md-table v-model="buyerOrders" :table-header-color="tableHeaderColor">
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
        <md-table-cell md-label="Producto">
          {{ buyerOrder.offerReference }}
        </md-table-cell>
        <md-table-cell md-label="Unidad">
          {{ buyerOrder.unit }}
        </md-table-cell>
        <md-table-cell md-label="Cantidad minima">
          {{ buyerOrder.numberOfUnits }}
        </md-table-cell>
        <md-table-cell md-label="Precio por unidad">
          $ {{ buyerOrder.totalPrice }}
        </md-table-cell>
        <router-link to="/BuyerBuyProduct" class="text-white">
          <md-button class="md-raised md-success" :value="buyerOrder.id"  @click="addIdBuyerOrder(buyerOrder.id)">
            <md-icon>create</md-icon>
          </md-button>
        </router-link>
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
        .get("http://localhost:8080/api/v1/order/user/" + this.email, {
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
    addIdBuyerOrder: function(Id){
      let IdAux =Id;
      alert(IdAux);
      localStorage.setItem("buyerOrderId1", IdAux);
    }
  }
};
</script>
