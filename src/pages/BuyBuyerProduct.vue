<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-60"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h1 class="title">{{ product.name }}</h1>
            <p class="category">{{ product.user }}</p>
          </md-card-header>G
          <div id="product">
            <div class="product">
              <div class="md-layout-item md-size-100 md-size-33">
                <span
                  v-if="product.quantity > 20"
                  class="stock in-stock"
                >
                  quedan {{product.quantity}} unidades
                </span>
                <span
                  v-else-if="
                    product.quantity > 0 &&
                      product.quantity < 20
                  "
                  class="stock low-stock"
                >
                  quedan {{product.quantity}} unidades
                </span>
                <span v-else class="stock out-of-stock">
                  No quedan unidades
                </span>
                <h3 class="title" >Precio: {{ product.price }}</h3>
              </div>
            </div>
          </div>
        </md-card>
        <md-card>
          <md-card-header data-background-color="green">
            <h1 class="title">¡Compra!</h1>
          </md-card-header>
          <md-card-content>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Numero de unidades</label>
                  <md-input
                    id="numberOfUnits"
                    type="Number"
                    min="1"
                    required
                    v-model="product.numberOfUnits"
                    name="numberOfUnits"
                  >
                  </md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label for="presentation">Unidad</label>
                  <md-select v-model="product.presentation" name="presentation" id="presentation" md-dense>
                    <md-option value=1>Gramos</md-option>
                    <md-option value=2>Libras</md-option>
                    <md-option value=3>Kilogramos</md-option>
                    <md-option value=4>Arrobas</md-option>
                    <md-option value=5>Bultos(50 Kg)</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <h4></h4>
              </div>
              <div class="md-layout-item md-size-100 md-size-33">
                <h3 class="title">
                  Precio final: {{ product.price }}
                </h3>
              </div>
              <div class="md-layout-item md-size-100 text-right">
                <md-button
                  v-on:click="saveRequest"
                  class="md-raised md-success"
                  :disabled="numberOfUnits"
                >
                  Comprar
                </md-button>
              </div>
            </div>
          </md-card-content>
        </md-card>
        <md-card>
          <md-card-header data-background-color="green">
            <h1 class="title">Descripción</h1>
          </md-card-header>
          <div class="md-layout-item md-size-100 md-size-33">
            <p class="category">
              {{ product.description }}
            </p>
          </div>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "product",
  data() {
    return {
      product: {
        id: "",
        name: "",
        user: "",
        price: 0,
        quantity: 0,
        numberOfUnits: 0,
        description: "",
        presentation: "",
        userEmail : "ayuda@unal.edu.co",
        totalPrice: 0
      }
    };
  },
  mounted() {
    http.
    get("/v1/offer/1").
    then(response => {
      this.product.price = response.data.pricePresentation,
      this.product.user = response.data.userEmail,
      this.product.name = response.data.productName,
      this.product.quantity = response.data.minQuantity,
      this.product.description = response.data.description
    })
            .catch(e => {
              console.log(e);
            })
  },
  methods: {
    /* eslint-disable no-console */
    saveRequest() {
      const data = {
        numberOfUnits: this.product.numberOfUnits,
        unit: this.product.presentation,
        description: this.product.description,
        name: this.product.productName,
        totalPrice: this.product.price,
        userEmail: this.product.userEmail
      };

      http
        .post("/v1/request", data)
        .then(response => {
          this.product.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

      this.submitted = true;
    },
    newCustomer() {
      this.submitted = false;
      this.customer = {};
    }
    /* eslint-enable no-console */
  }
};
</script>
