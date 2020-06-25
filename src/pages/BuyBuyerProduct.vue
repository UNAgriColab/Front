<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-60 md-small-size-50 md-xsmall-size-80 md-size-65"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h1 class="title">{{ product.name }}</h1>
            <h4 class="title">Descripción del producto</h4>
            <p class="category">{{ product.sellerEmail }}</p>
          </md-card-header>
          <md-card-content>
            <div class="md-layout-item md-size-100 md-size-100">
              <h4>
                {{ product.description }}
              </h4>
            </div>
            <div v-if="product.qualification !== 0">
              <h3>Calificación del producto: {{ product.qualification }}</h3>
            </div>
            <div v-if="product.qualification === 0">
              <h3>Este producto no tiene calificación</h3>
            </div>
            <div
              class="md-layout-item md-size-100 md-size-50"
              style="margin-top: 15px"
            >
              <h2 class="title">Precio: {{ product.price }}</h2>
            </div>
          </md-card-content>
        </md-card>
        <md-card>
          <md-card-header data-background-color="green">
            <h2>Imagenes</h2>
          </md-card-header>
          <md-card-content>
            <div v-if="loadImage !== null">
              <img :src="loadImage" alt="" />
            </div>
            <div v-if="loadImage === null">
              <h3>Esta oferta no tiene imagen disponible</h3>
            </div>
          </md-card-content>
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
              <div class="md-layout-item md-size-50">
                <md-field>
                  <label>Numero de unidades</label>
                  <md-input
                    id="numberOfUnits"
                    type="Number"
                    :min="this.product.minQuantity"
                    required
                    v-model="product.numberOfUnits"
                    name="numberOfUnits"
                  >
                  </md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-50">
                <span v-if="product.presentation === 1">
                  Gramos pedidos.
                </span>
                <span v-else-if="product.presentation === 2">
                  Libras pedidas.
                </span>
                <span v-else-if="product.presentation === 3">
                  Kilogramos pedidos.
                </span>
                <span v-else-if="product.presentation === 4">
                  Arrobas pedidas.
                </span>
                <span v-else-if="product.presentation === 5">
                  Bultos pedidos.
                </span>
              </div>
              <div
                class="md-layout-item md-size-100 md-size-50"
                style="margin-top: 15px"
              >
                <span>
                  Lo minimo que puedes pedir son {{ product.minQuantity }}
                  unidades
                </span>
              </div>
              <div class="md-layout-item md-size-100 md-size-33">
                <h2 class="title">
                  Precio final: {{ product.numberOfUnits * product.price }}
                </h2>
              </div>
              <div class="md-layout-item md-size-100 text-right">
                <md-button
                  class="md-raised md-success"
                  @click="payOrder(product.path, product.numberOfUnits)"
                  :disabled="
                    this.product.numberOfUnits < this.product.minQuantity
                  "
                >
                  <router-link to="/BuyerPayOrder" class="text-white">
                    <md-icon>queue</md-icon> Pagar
                  </router-link>
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
        sellerEmail: "",
        price: 0,
        minQuantity: 0,
        numberOfUnits: 1,
        description: "",
        presentation: "",
        totalPrice: "",
        description2: "",
        state: 0,
        qualification: 0,
        canceled: false,
        path: "",
        images: []
      },
      aux: "",
      token: ""
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
        this.product.sellerEmail = this.aux.email;
      } else {
        this.$router.push("/login");
      }
      if (localStorage.getItem("buyerOrderId")) {
        this.product.path = localStorage.getItem("buyerOrderId");
      }
    },
    leerAPI() {
      this.readImage();
      http
        .get("/offer/" + this.product.path, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          this.product.price = response.data.pricePresentation;
          this.product.sellerEmail = response.data.sellerEmail;
          this.product.name = response.data.productName;
          this.product.minQuantity = response.data.minQuantity;
          this.product.presentation = response.data.presentation;
          this.product.description = response.data.description;
          this.product.state = response.data.state;
          this.product.qualification = response.data.qualification;
        })
        .catch(e => {
          console.log(e);
        });
    },
    readImage() {
      http
        .get("/photo/list/" + this.product.path, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          this.product.images = response.data;
          if (this.product.images[0] !== undefined) {
            this.product.images[0] =
              "https://storage.googleapis.com/agricolab-un.appspot.com/" +
              this.product.images[0];
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    payOrder: function(id, numberOfUnits) {
      localStorage.setItem("buyerOrderId", id);
      localStorage.setItem("numberOfUnitsQuantity", numberOfUnits);
      this.notifyVue("success");
    },
    notifyVue(AlertType) {
      if (AlertType === "success") {
        this.$notify({
          message:
            "Se seleccionaron: " +
            this.product.numberOfUnits +
            " unidades de " +
            this.product.name +
            "</b>.",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: AlertType
        });
      }
      if (AlertType === "warning") {
        this.$notify({
          message:
            "La oferta del producto: " +
            this.offer.productName +
            " <b>no</b> ha sido publicada.",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: AlertType
        });
      }
      if (AlertType === "danger") {
        this.$notify({
          message: "Ha ocurrido un Error" + this.errorReq + ".",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: AlertType
        });
      }
    }
  },
  computed: {
    loadImage() {
      if (this.product.images[0] !== undefined) {
        return this.product.images[0];
      } else {
        return null;
      }
    }
  }
};
</script>
