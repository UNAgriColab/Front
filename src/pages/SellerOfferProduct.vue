<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <form>
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">Oferta de un nuevo producto</h4>
              <p class="category">
                Información necesaria para la creación de una nueva oferta
              </p>
            </md-card-header>

            <md-card-content>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Categoria</label>
                      <md-select
                        v-model="products.categoria"
                        name="categoria"
                        id="cat"
                        md-dense
                        required
                      >
                        <md-option
                          v-for="(data, index) in json.myJson"
                          v-bind:key="index"
                          v-bind:value="data.categoria"
                        >
                          {{ data.categoria }}
                        </md-option>
                      </md-select>
                      <md-icon>location_city</md-icon>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Producto</label>
                      <md-select
                        v-model="offer.productName"
                        name="productos"
                        id="productos"
                        md-dense
                        required
                      >
                        <md-option
                          v-for="(option, index2) in setOptions"
                          v-bind:key="index2"
                          v-bind:value="option"
                        >
                          {{ option }}
                        </md-option>
                      </md-select>
                      <md-icon>apartment</md-icon>
                    </md-field>
                  </div>
                </div>
              </div>
              <div class="md-layout">
                <!-- Layout item -->
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <!-- label for="unit">Unidad</label -->
                    <label for="presentation">Unidad</label>
                    <md-select
                      v-model="offer.presentation"
                      name="presentation"
                      id="presentation"
                      md-dense
                      required
                    >
                      <md-option value="1">Gramos</md-option>
                      <md-option value="2">Libras</md-option>
                      <md-option value="3">Kilogramos</md-option>
                      <md-option value="4">Arrobas</md-option>
                      <md-option value="5">Bultos(50 Kg)</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label for="minQuantity">Numero mínimo de unidades</label>
                    <md-input
                      id="minQuantity"
                      v-model="offer.minQuantity"
                      min="1"
                      type="number"
                      required
                    ></md-input>
                    <span class="md-error">no puede estar Vacio</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Precio por unidad</label>
                    <md-input
                      v-model="offer.pricePresentation"
                      type="number"
                      min="1"
                      required
                    ></md-input>
                    <md-icon>attach_money</md-icon>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                  <md-field maxlength="5">
                    <label>Descripción</label>
                    <md-textarea v-model="offer.description"></md-textarea>
                    <md-icon>description</md-icon>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100 text-right">
                  <md-button v-on:click="saveOffer">
                    <md-icon>library_add_check</md-icon>
                    Publicar oferta
                  </md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../http-common";
import router from "../routes/routes.js";
import json from "../jsons/productos.json";

export default {
  name: "add-offer",
  data: function() {
    return {
      offer: {
        id: "",
        sellerEmail: "",
        productName: "",
        presentation: "",
        minQuantity: "",
        pricePresentation: "",
        description: ""
      },
      json: {
        myJson: json
      },
      products: {
        categoria: "",
        producto: ""
      },
      submitted: false,
      errorReq: ""
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
        this.offer.sellerEmail = this.aux.email;
      } else {
        this.$router.push("/login");
      }
    },
    /* eslint-disable no-console */
    saveOffer: function() {
      console.log("safeOffer");
      const data = {
        sellerEmail: this.offer.sellerEmail,
        productName: this.offer.productName,
        presentation: this.offer.presentation,
        minQuantity: this.offer.minQuantity,
        pricePresentation: this.offer.pricePresentation,
        description: this.offer.description
      };
      http
        .post("/offer", data, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          console.log("se espera respuesta");
          this.offer.id = response.data.id;
          console.log(response.data);
          if (JSON.stringify(response.data) === "true") {
            this.notifyVue("success");
            this.$router.push("/SellerListMyOffers");
          } else {
            this.notifyVue("warning");
          }
        })
        .catch(e => {
          console.log(e);
          this.errorReq = e;
          this.notifyVue("danger");
        });

      this.submitted = true;
    },
    notifyVue(AlertType) {
      if (AlertType === "success") {
        this.$notify({
          message:
            "La oferta del producto: <b>" +
            this.offer.productName +
            "</b> ha sido publicada con éxito.",
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
          verticalAlign: "top",
          type: AlertType
        });
      }
      if (AlertType === "danger") {
        this.$notify({
          message: "Ha ocurrido un Error" + this.errorReq + ".",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: AlertType
        });
      }
    }
  },
  computed: {
    setOptions: function() {
      let productos;
      let options = this.json.myJson;
      for (let i = 0; i < 8; i++) {
        if (this.products.categoria === options[i]["categoria"]) {
          productos = options[i]["productos"];
        }
      }
      return productos;
    }
  }
};
</script>

<style></style>
