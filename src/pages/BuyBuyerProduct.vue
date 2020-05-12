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
          </md-card-header>
          <div id="product">
            <div class="product">
              <div class="md-layout-item md-size-100 md-size-33">
                <md-field>
                  <label for="path">Id de la oferta a ver:</label> <br />
                  <md-input
                    v-model="product.path"
                    placeholder="path"
                  ></md-input>
                  <label for="path">Id de la oferta a ver:</label><br />
                  <md-input v-model="product.path"></md-input>
                </md-field>
                <md-field>
                  <label for="path">Id del usuario que crea la oferta:</label
                  ><br />
                  <md-input v-model="product.userEmail"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 text-center">
                <md-button
                  v-on:click="leerAPI"
                  type="submit"
                  class="md-raised md-success"
                >
                  Ingresar
                </md-button>
              </div>
            </div>
          </div>
        </md-card>
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Descripción del producto</h4>
            <p class="category">
              Detalles de la oferta seleccionada
            </p>
          </md-card-header>
          <div class="md-layout-item md-size-100 md-size-50" style="margin-top: 15px">
            <span v-if="product.quantity > 20" class="stock in-stock">
              Quedan {{ product.quantity }} unidades
            </span>
            <span
              v-else-if="product.quantity > 0 && product.quantity < 20"
              class="stock low-stock"
            >
              quedan {{ product.quantity }} unidades
            </span>
            <span v-else class="stock out-of-stock">
              No quedan unidades
            </span>
          </div>
          <div class="md-layout-item md-size-100 md-size-50" style="margin-top: 15px">
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
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
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
                    v-model.number="product.numberOfUnits"
                    name="numberOfUnits"
                  >
                  </md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-50">
                <span v-if="product.presentation == 1">
                  Gramos pedidos.
                </span>
                <span v-if="product.presentation == 2">
                  Libras pedidas.
                </span>
                <span v-if="product.presentation == 3">
                  Kilogramos pedidos.
                </span>
                <span v-if="product.presentation == 4">
                  Arrobas pedidas.
                </span>
                <span v-if="product.presentation == 5">
                  Bultos pedidos.
                </span>
              </div>
              <div class="md-layout-item md-size-100 md-size-33">
                <h4 class="title">Precio total: {{ product.price }}</h4>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label>Descripción</label>
                  <md-textarea v-model="product.description2"></md-textarea>
                  <md-icon>description</md-icon>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 md-size-33">
                <h3 class="title">Precio final: {{ product.price }}</h3>
              </div>
              <div class="md-layout-item md-size-100 text-right">
                <md-button
                  v-on:click="saveRequest"
                  class="md-raised md-success"
                >
                  <md-icon>queue</md-icon> Comprar
                </md-button>
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
        quantity: 0,
        numberOfUnits: 0,
        description: "",
        presentation: "",
        userEmail: "",
        totalPrice: 0,
        description2: "",
        state: 0,
        canceled: false,
        path: ""
      }
    };
  },
  mounted() {
    this.storage();
  },
  methods: {
    /* eslint-disable no-console */
    storage() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.product.userEmail = this.aux.email;
      }
    },
    leerAPI() {
      http.get(
        "/v1/offer/" + this.product.path,
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          this.product.price = response.data.pricePresentation;
          this.product.user = response.data.userEmail;
          this.product.name = response.data.productName;
          this.product.quantity = response.data.minQuantity;
          this.product.presentation = response.data.presentation;
          this.product.description = response.data.description;
          this.product.state = response.data.state;
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveRequest() {
      const data = {
        userEmail: this.product.userEmail,
        offerReference: this.product.path,
        numberOfUnits: this.product.numberOfUnits,
        description: this.product.description2
      };
      http
        .post("/v1/order", data, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          alert("envia");
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      this.submitted = true;
    }
  }
};
</script>
