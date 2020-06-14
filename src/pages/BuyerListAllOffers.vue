<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item text-center">
        <div class="md-layout-item md-small-size-100 md-size-100">
          <md-content style="background-color: #e8f5e9">
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
                  <label>producto</label>
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
                    <md-option value="3">Valoración de los clientes</md-option>
                  </md-select>
                </md-field>
              </div>
              <md-button v-on:click="getProduct" :disabled="enableButton">
                Ordenar
              </md-button>
            </div>
          </md-content>
        </div>

        <md-list
          class="md-double-line  md-elevation-24"
          v-for="(offer, index) in offers"
          v-bind:key="index"
        >
          <md-subheader>{{ offer.productName }}</md-subheader>
          <md-divider></md-divider>
          <md-list-item>
            <md-icon class="md-primary md-size-2x">storefront</md-icon>

            <div class="md-list-item-text">
              <span> Precio: {{ offer.pricePresentation }}</span>
              <span v-if="offer.presentation === 1">Oferta en: Gramos</span>
              <span v-if="offer.presentation === 2">Oferta en: Libras</span>
              <span v-if="offer.presentation === 3">Oferta en: Kilogramos</span>
              <span v-if="offer.presentation === 4">Oferta en: Arrobas</span>
              <span v-if="offer.presentation === 5">Oferta en: Bultos</span>
              <span> Mínimo que puedes pedir: {{ offer.minQuantity }}</span>
            </div>
          </md-list-item>

          <md-list-item class="md-inset md-expand">
            <div class="md-list-item-text">
              <h4>Descripción:</h4>
              <span>{{ offer.description }}</span>
            </div>
            <router-link to="/BuyerBuyProduct" class="text-white">
              <md-button
                class="md-primary md-icon-button md-list-action"
                :value="offer.id"
                @click="addIdOffer(offer.id)"
              >
                <md-icon>shopping_cart</md-icon>
              </md-button>
            </router-link>
          </md-list-item>
        </md-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import json from "../jsons/productos.json";

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
      json: {
        myJson: json
      },
      products: {
        categoria: "",
        producto: "",
        minPrice: "0",
        maxPrice: "0",
        presentation: "0",
        orderBy: "0"
      }
    };
  },
  mounted() {
    console.log("Hola mounted");
    this.storage();
    this.getOffers();
  },
  methods: {
    storage() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.tokenHeader = "Bearer " + this.token;
      }
    },
    getOffers: function() {
      console.log(`Bearer ${this.token}`);
      axios
        .get("https://agricolab-un.appspot.com/api/v1/offer", {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          console.log(response);
          this.offers = response.data;
          console.log(this.offers);
        })
        .catch(e => console.log(e));
    },
    addIdOffer: function(Id) {
      localStorage.setItem("buyerOrderId", Id);
    },
    getProduct: function() {
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
      axios
        .get(
          "http://localhost:8080/api/v1/offer/" +
            this.products.producto +
            "/" +
            this.products.maxPrice +
            "/" +
            this.products.presentation +
            "/" +
            this.products.minPrice +
            "/" +
            this.products.orderBy,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            },
            withCredentials: false
          }
        )
        .then(response => {
          this.offers = response.data;
          if (this.offers !== "") {
            this.enable = true;
          }
        })
        .catch(e => console.log(e));
    },
    resetProductDropdown: function() {
      this.products.producto = "";
    }
  },
  computed: {
    setOptions: function() {
      let categoriaTemp;
      let productos;
      let options = this.json.myJson;
      for (let i = 0; i < 7; i++) {
        if (this.products.categoria === options[i]["categoria"]) {
          productos = options[i]["productos"];
          categoriaTemp = this.products.categoria;
        }
      }

      return productos;
    },
    enableDropdown: function() {
      return this.products.categoria === "";
    },
    enableButton: function() {
      return this.products.producto === "";
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
