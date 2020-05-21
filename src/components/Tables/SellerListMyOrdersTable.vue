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
        <md-table-head>Editar</md-table-head>
      </md-table-row>
      <md-table-row
        slot="md-table-row"
        v-for="(offer, index) in offers"
        v-bind:key="index"
      >
        <md-table-cell md-label="Imágen">
          <md-icon style="color: #58b05c">shopping_cart</md-icon>
        </md-table-cell>
        <md-table-cell md-label="Producto">
          {{ offer.productName }}
        </md-table-cell>
        <md-table-cell md-label="Cantidad">
          {{ offer.numberOfUnits }}
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-if="offer.unit === 1">
          Gramos
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.unit === 2">
          Libras
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.unit === 3">
          Kilogramos
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.unit === 4">
          Arrobas
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.unit === 5">
          Bultos
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else>
          No asignado
        </md-table-cell>
        <md-table-cell md-label="Precio Total">
          $ {{ offer.totalPrice.toFixed(2) }}
        </md-table-cell>
        <md-table-cell md-label="Producto">
          {{ offer.offerReference }}
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-if="offer.state === 0">
          Cancelado
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.state === 1">
          En espera
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.state === 2">
          En proceso
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.state === 3">
          Enviado
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else-if="offer.state === 4">
          Recibido
        </md-table-cell>
        <md-table-cell md-label="Unidades" v-else>
          No asignado
        </md-table-cell>
        <router-link to="/SellerEditMyOrder" class="text-white">
          <md-button
            class="md-fab md-icon-button md-raised md-success"
            :value="offer.id"
            @click="addIdSellerOrder(offer.id)"
          >
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
      order: null
    };
  },
  mounted() {
    this.storage();
    this.getOffers();
  },
  methods: {
    storage() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.userEmail = this.aux.email;
      }
    },
    getOffers() {
      alert("hola")
      console.log("metodo get offers");
      axios
        .get("http://localhost:8080/api/v1/order/seller/" + this.userEmail, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          alert("hola")
          console.log(response);
          this.offers = response.data;
          /*axios.get('http://localhost:8080/api/v1/offer/'+ response.data.offerReference)
                          .then(response =>{
        
                            alert(response.data.offerReference)
                            console.log(response);
                            this.order=response.data
                          })*/
        })
        .catch(e => console.log(e));
    },
    addIdSellerOrder: function(Id) {
      localStorage.setItem("sellerOrderId", Id);
    }
  }
};
</script>
