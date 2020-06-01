<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-60 md-small-size-50 md-xsmall-size-80 md-size-65"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h1 class="title">{{ product.name }}</h1>
            <p class="category">{{ product.user }}</p>
          </md-card-header>
        </md-card>
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Descripción del producto</h4>
            <p class="category">
              Detalles de la oferta seleccionada
            </p>
          </md-card-header>
          <div
            class="md-layout-item md-size-100 md-size-50"
            style="margin-top: 15px"
          >
            <span>
              Lo minimo que puedes pedir son {{ product.minQuantity }} unidades
            </span>
          </div>
          <div
            class="md-layout-item md-size-100 md-size-50"
            style="margin-top: 15px"
          >
            <h4 class="title">Precio: {{ product.price }}</h4>
          </div>
          <div class="md-layout-item md-size-100 md-size-100">
            <p class="category">
              {{ product.description }}
            </p>
          </div>
        </md-card>
      </div>
      <div
        class="md-layout-item md-medium-size-40 md-small-size-50 md-xsmall-size-60 md-size-35"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Finaliza tu compra</h4>
            <p class="category">
              Revisa muy bien los detalles de tu pedido antes de dar clic en el
              botón Comprar
            </p>
          </md-card-header>
          <md-card-content>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-50">
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
              <div class="md-layout-item md-small-size-100 md-size-50">
                <span v-if="product.presentation === 1">
                  Gramos pedidos.
                </span>
                <span v-if="product.presentation === 2">
                  Libras pedidas.
                </span>
                <span v-if="product.presentation === 3">
                  Kilogramos pedidos.
                </span>
                <span v-if="product.presentation === 4">
                  Arrobas pedidas.
                </span>
                <span v-if="product.presentation === 5">
                  Bultos pedidos.
                </span>
              </div>
              <div class="md-layout-item md-size-100 md-size-33">
                <h3 class="title">
                  Precio final: {{ product.numberOfUnits * product.price }}
                </h3>
              </div>
              <div class="md-layout-item md-size-100 text-right">
                <router-link to="/BuyerPayOrder" class="text-white">
                  <md-button
                    class="md-raised md-success"
                    @click="payOrder(product.path, product.numberOfUnits)"
                  >
                    <md-icon>queue</md-icon> Pagar
                  </md-button>
                </router-link>
              </div>
            </div>
          </md-card-content>
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
        minQuantity: 0,
        numberOfUnits: 0,
        description: "",
        presentation: "",
        userEmail: "",
        totalPrice: "",
        description2: "",
        state: 0,
        canceled: false,
        path: ""
      }
    };
  },
  mounted() {
    this.storage();
    this.leerAPI();
  },
  methods: {
    /* eslint-disable no-console */
    storage() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.product.userEmail = this.aux.email;
      }
      console.log(localStorage.getItem("buyerOrderId"));
      if (localStorage.getItem("buyerOrderId")) {
        this.product.path = localStorage.getItem("buyerOrderId");
      }
    },
    leerAPI() {
      http
        .get(
          "https://agricolab-un.appspot.com/api/v1/offer/" + this.product.path,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            },
            withCredentials: false
          }
        )
        .then(response => {
          this.product.price = response.data.pricePresentation;
          this.product.user = response.data.userEmail;
          this.product.name = response.data.productName;
          this.product.minQuantity = response.data.minQuantity;
          this.product.presentation = response.data.presentation;
          this.product.description = response.data.description;
          this.product.state = response.data.state;
        })
        .catch(e => {
          console.log(e);
        });
    },
    payOrder: function(id, numberOfUnits) {
      localStorage.setItem("buyerOrderId", id);
      localStorage.setItem("numberOfUnitsQuantity", numberOfUnits);
    }
  }
};
</script>
