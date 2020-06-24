<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item text-center">
        <div class="md-layout-item md-small-size-100 md-size-100">
          <md-card style="background-color: #e8f5e9">
            <md-card-content>
              <div class="md-layout">
                <div
                  class="md-layout-item
                  md-xsmall-size-35
                  md-small-size-25
                  md-medium-size-20
                  md-large-size-15
                  md-xlarge-size-10"
                >
                  <md-field>
                    <label>Categoria</label>
                    <md-select
                      v-model="products.categoria"
                      name="categoria"
                      id="cat"
                      md-dense
                      @md-selected="resetProductDropdown"
                    >
                      <md-option value="all">
                        Todas
                      </md-option>
                      <md-option
                        v-for="(data, index) in json.myJson"
                        v-bind:key="index"
                        v-bind:value="data.categoria"
                      >
                        {{ data.categoria }}
                      </md-option>
                    </md-select>
                    <md-icon>agriculture</md-icon>
                  </md-field>
                </div>
                <div
                  class="md-layout-item
                  md-xsmall-size-35
                  md-small-size-25
                  md-medium-size-20
                  md-large-size-15
                  md-xlarge-size-10"
                >
                  <md-field>
                    <label>Producto</label>
                    <md-select
                      v-model="products.producto"
                      name="productos"
                      id="productos"
                      :disabled="enableDropdown"
                      md-dense
                    >
                      <md-option
                        v-for="(option, index2) in setOptions"
                        v-bind:key="index2"
                        v-bind:value="option"
                      >
                        {{ option }}
                      </md-option>
                    </md-select>
                    <md-icon>spa</md-icon>
                  </md-field>
                </div>
                <div
                  class="
                  md-layout-item
                  md-xsmall-size-35
                  md-small-size-30
                  md-medium-size-30
                  md-large-size-20
                  md-xlarge-size-15"
                >
                  <md-field>
                    <label>Precio mínimo unitario</label>
                    <md-icon>attach_money</md-icon>
                    <md-input v-model="products.minPrice" type="number" min="0">
                    </md-input>
                  </md-field>
                </div>
                <div
                  class="
                  md-layout-item
                  md-xsmall-size-30
                  md-small-size-30
                  md-medium-size-30
                  md-large-size-20
                  md-xlarge-size-15"
                >
                  <md-field>
                    <label>Precio máximo unitario</label>
                    <md-icon>attach_money</md-icon>
                    <md-input
                      v-model="products.maxPrice"
                      type="number"
                      :min="maxPriceMin"
                    >
                    </md-input>
                  </md-field>
                </div>
                <div
                  class="
                  md-layout-item
                  md-xsmall-size-30
                  md-small-size-30
                  md-medium-size-30
                  md-large-size-20
                  md-xlarge-size-15"
                >
                  <md-field>
                    <label>Unidad</label>
                    <md-select
                      v-model="products.presentation"
                      name="presentation"
                      id="presentation"
                      md-dense
                    >
                      <md-option value="0">Seleccione una opción</md-option>
                      <md-option value="1">Gramos</md-option>
                      <md-option value="2">Libras</md-option>
                      <md-option value="3">Kilogramos</md-option>
                      <md-option value="4">Arrobas</md-option>
                      <md-option value="5">Bultos(50 Kg)</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div>
                  <md-field>
                    <!-- label for="unit">Unidad</label -->
                    <label>Ordenar por</label>
                    <md-select
                      v-model="products.orderBy"
                      name="Ordenar"
                      id="Ordenar"
                      md-dense
                    >
                      <md-option value="0">
                        Seleccionar opción
                      </md-option>
                      <md-option value="1">
                        Precio: De más bajo a más alto
                      </md-option>
                      <md-option value="2">
                        Precio: De más alto a más bajo
                      </md-option>
                      <md-option value="3">
                        Valoración de los clientes
                      </md-option>
                    </md-select>
                  </md-field>
                </div>
                <md-button v-on:click="getOffers" :disabled="enableButton">
                  Ordenar
                </md-button>
              </div>
            </md-card-content>
          </md-card>
          <md-content style="background-color: #d0ffd0"></md-content>
        </div>
        <div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-layout md-gutter">
              <div class="md-layout-item"></div>
              <div class="md-layout-item"></div>
              <div class="md-layout-item"></div>
            </div>
            <div
              class="md-layout-item md-layout md-gutter"
              style="margin-bottom: 20px; margin-top: 20px"
            >
              <div class="md-layout-item">
                <md-button
                  class="md-icon-button md-primary"
                  @click="changePage(-1)"
                  :disabled="disableButtonPag"
                >
                  <md-icon>chevron_left</md-icon>
                </md-button>
              </div>
              <div class="md-layout-item">
                <md-button
                  class="md-icon-button md-raised"
                  @click="changePage(0)"
                  :disabled="disableButtonPag"
                >
                  <md-icon>home</md-icon>
                </md-button>
              </div>
              <div class="md-layout-item">
                <md-button
                  class="md-icon-button md-primary"
                  @click="changePage(1)"
                  :disabled="disableButtonPag"
                >
                  <md-icon>chevron_right</md-icon>
                </md-button>
              </div>
            </div>
            <div class="md-layout-item md-layout md-gutter">
              <div class="md-layout-item"></div>
              <div class="md-layout-item"></div>
              <div class="md-layout-item">
                <md-content
                  class="md-alignment-bottom-center"
                  style="margin-top:0.5em; background-color: #eeeeee;"
                >
                  Página {{ this.products.page }}
                </md-content>
              </div>
            </div>
          </div>
        </div>
        <md-list
          style="margin-top: 10px; margin-left: 20%; margin-right: 20%; margin-bottom: 10px"
          class="md-elevation-24"
          v-for="(offer, index) in offers"
          v-bind:key="index"
        >
          <h3 style="color: #1b5e20">{{ offer.productName }}</h3>
          <md-divider></md-divider>
          <div class="md-layout">
            <div class="md-layout-item">
              <img src="../assets/img/logo/icon.png" alt="" />
            </div>
            <div class="md-layout-item">
              <h4>Cantidad mínima</h4>
              <span>{{ offer.minQuantity }}</span>
              <span v-if="offer.presentation === 1">
                Gramos
              </span>
              <span v-if="offer.presentation === 2">
                Libras
              </span>
              <span v-if="offer.presentation === 3">
                Kilogramos
              </span>
              <span v-if="offer.presentation === 4">
                Arrobas
              </span>
              <span v-if="offer.presentation === 5">
                Bultos
              </span>
            </div>
            <div class="md-layout-item">
              <div class="md-list-item-text">
                <h3>${{ offer.pricePresentation }}</h3>
                <span v-if="offer.presentation === 1">
                  / Gramo
                </span>
                <span v-if="offer.presentation === 2">
                  / Libra
                </span>
                <span v-if="offer.presentation === 3">
                  / Kilogramo
                </span>
                <span v-if="offer.presentation === 4">
                  / Arroba
                </span>
                <span v-if="offer.presentation === 5">
                  / Bulto
                </span>
              </div>
              <router-link to="/BuyerBuyProduct" class="text-white">
                <md-button
                  class="md-primary md-list-action"
                  :value="offer.id"
                  @click="addIdOffer(offer.id)"
                >
                  Pide
                  <md-icon>shopping_cart</md-icon>
                </md-button>
              </router-link>
            </div>
          </div>
        </md-list>
        <div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-layout md-gutter">
              <div class="md-layout-item"></div>
              <div class="md-layout-item"></div>
              <div class="md-layout-item"></div>
            </div>
            <div
              class="md-layout-item md-layout md-gutter"
              style="margin-top: 20px; margin-bottom: 20px"
            >
              <div class="md-layout-item">
                <md-button
                  class="md-icon-button md-primary"
                  @click="changePage(-1)"
                  :disabled="disableButtonPag"
                >
                  <md-icon>chevron_left</md-icon>
                </md-button>
              </div>
              <div class="md-layout-item">
                <md-button
                  class="md-icon-button md-raised"
                  @click="changePage(0)"
                  :disabled="disableButtonPag"
                >
                  <md-icon>home</md-icon>
                </md-button>
              </div>
              <div class="md-layout-item">
                <md-button
                  class="md-icon-button md-primary"
                  @click="changePage(1)"
                  :disabled="disableButtonPag"
                >
                  <md-icon>chevron_right</md-icon>
                </md-button>
              </div>
            </div>
            <div class="md-layout-item md-layout md-gutter">
              <div class="md-layout-item"></div>
              <div class="md-layout-item"></div>
              <div class="md-layout-item">
                <md-content
                  class="md-alignment-bottom-center"
                  style="margin-top:0.5em; background-color: #eeeeee;"
                >
                  Página {{ this.products.page }}
                </md-content>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import json from "../jsons/productos.json";
import http from "../http-common";

export default {
  name: "DoubleLine",
  data() {
    return {
      offers: [],
      token: "",
      tokenHeader: "",
      aux: "",
      productName: "",
      pricePresentation: "",
      disable: true,
      enable: false,
      disableButtonPag: false,
      json: {
        myJson: json
      },
      products: {
        categoria: "",
        producto: "",
        minPrice: "0",
        maxPrice: "0",
        presentation: "0",
        orderBy: "0",
        direction: "1",
        pivote: "0",
        page: 1
      }
    };
  },
  mounted() {
    this.storage();
    this.getProduct();
  },
  methods: {
    storage() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.tokenHeader = "Bearer " + this.token;
      } else {
        this.$router.push("/login");
      }
    },
    addIdOffer: function(Id) {
      localStorage.setItem("buyerOrderId", Id);
    },
    getOffers: function() {
      this.products.direction = 1;
      this.products.pivote = 0;
      this.products.page = 1;
      this.getProduct();
    },
    getProduct: function() {
      this.disableButtonPag = true;
      if (this.products.maxPrice === "") {
        this.products.maxPrice = 0;
      }
      if (this.products.minPrice === "") {
        this.products.minPrice = 0;
      }
      if (this.products.presentation === "") {
        this.products.presentation = 0;
      }
      if (this.products.orderBy === "") {
        this.products.orderBy = 0;
      }
      if (this.products.producto === "") {
        this.products.producto = "all";
      }
      http
        .get(
          "/offer/" +
            this.products.producto +
            "/" +
            this.products.maxPrice +
            "/" +
            this.products.presentation +
            "/" +
            this.products.minPrice +
            "/" +
            this.products.orderBy +
            "/" +
            this.products.direction +
            "/" +
            this.products.pivote,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            },
            withCredentials: false
          }
        )
        .then(response => {
          this.disableButtonPag = false;
          this.offers = response.data;
          if (this.offers !== "") {
            this.enable = true;
          }
        })
        .catch(e => console.log(e));
    },
    resetProductDropdown: function() {
      this.products.producto = "";
    },
    changePage(change) {
      let keys = Object.keys(this.offers);
      let len = keys.length;
      if (this.products.page + change !== 0) {
        if (change === 0) {
          this.products.direction = 1;
          this.products.pivote = 0;
          this.products.page = 1;
        }
        if (change === -1) {
          this.products.direction = 0;
          this.products.pivote = this.offers[0].id;
          this.products.page = this.products.page + change;
        }
        if (change === 1 && len === 10) {
          this.products.direction = 2;
          this.products.pivote = this.offers[9].id;
          this.products.page = this.products.page + change;
        }
        this.getProduct();
      }
    }
  },
  computed: {
    setOptions: function() {
      let categoriaTemp;
      let productos;
      let options = this.json.myJson;
      if (this.products.categoria === "all") {
        productos = ["all"];
      } else {
        for (let i = 0; i < 7; i++) {
          if (this.products.categoria === options[i]["categoria"]) {
            productos = options[i]["productos"];
            categoriaTemp = this.products.categoria;
          }
        }
      }
      return productos;
    },
    enableDropdown: function() {
      return this.products.categoria === "";
    },
    enableButton: function() {
      if (this.products.categoria === "all") {
        return false;
      } else {
        return this.products.producto === "";
      }
    },
    maxPriceMin: function() {
      return this.products.minPrice;
    }
  }
};
</script>

<style lang="scss" scoped>
.md-list {
  width: 640px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, 0.12);
}
</style>
