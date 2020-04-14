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
    <md-table v-model="userRequests" :table-header-color="tableHeaderColor">
      <md-table-row>
        <md-table-head>Producto</md-table-head>
        <md-table-head>Unidad</md-table-head>
        <md-table-head>Número de unidades</md-table-head>
        <md-table-head>Precio total</md-table-head>
      </md-table-row>
      <md-table-row
        slot="md-table-row"
        v-for="(userRequest, index) in userRequests"
        v-bind:key="index"
      >
        <md-table-cell md-label="Producto">{{
          userRequest.productName
        }}</md-table-cell>
        <md-table-cel md-label="Unidad">{{
          userRequest.unit
        }}</md-table-cel>
        <md-table-cell md-label="Cantidad minima">{{
          userRequest.numberOfUnits
        }}</md-table-cell>
        <md-table-cell md-label="Precio por unidad"
          >$ {{ userRequest.totalPrice }}</md-table-cell
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
      userRequests: null
    };
  },
  mounted() {
    console.log("Hola mounted");
    this.getUserRequests();
  },
  methods: {
    saveEmail() {
      const data = {
        email: this.email
      };
    },
    getUserRequests() {
      console.log("Metodo get user requests");
      axios
        .get(`http://localhost:8080/api/v1/request/user/ayuda@unal.edu.co`)
        .then(response => {
          console.log(response);
          this.userRequests = response.data;
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
