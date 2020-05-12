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
    <md-table v-model="userOffers" :table-header-color="tableHeaderColor">
      <md-table-row>
        <md-table-head>Producto</md-table-head>
        <md-table-head>Presentación</md-table-head>
        <md-table-head>Cantidad mínima</md-table-head>
        <md-table-head>Precio por presentación</md-table-head>
      </md-table-row>
      <md-table-row
        slot="md-table-row"
        v-for="(userOffer, index) in userOffers"
        v-bind:key="index"
      >
        <md-table-cell md-label="Producto">{{
          userOffer.productName
          }}
        </md-table-cell>
        <md-table-cell md-label="Presentación">{{
          userOffer.presentation
          }}
        </md-table-cell>
        <md-table-cell md-label="Cantidad mínima">{{
          userOffer.minQuantity
          }}
        </md-table-cell>
        <md-table-cell md-label="Precio por unidad"
        >$ {{ userOffer.pricePresentation }}
        </md-table-cell
        >
        <md-button class="md-raised md-success" :value="userOffer.id">
          <md-icon>create</md-icon>
        </md-button>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "simple-table",
    data: function () {
      return {
        email: "",
        selected: [],
        userOffers: null,
        aux: null
      };
    },
    mounted() {
      console.log("Hola mounted");
      this.getUserOffers();
    },
    methods: {
      saveEmail() {
        email: this.email
      },
      getUserOffers() {
        if (localStorage.getItem("userSession")) {
          this.aux = JSON.parse(localStorage.getItem("userSession"));
          this.email = this.aux.email;
        }
        console.log("Metodo get user offers");
        axios
          .get(`localhost:8080/api/v1/order/seller/` + this.email)
          .then(response => {
            console.log(response);
            this.userOffers = response.data;
          })
          .catch(e => console.log(e));
      }
    }
  };
</script>
