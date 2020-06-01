<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item text-center">

        <div class="md-layout-item md-small-size-100 md-size-100">
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
              <md-icon>apartment</md-icon>
            </md-field>
            </div>
          </div>
        </div>

        <md-button v-on:click="getOffers">Mostrar</md-button>
        <ul>
          <li class="list-group-item">
            <input
              type="text"
              placeholder="Buscar"
              class="form-control"
              v-model="productName"
            >
          </li>
        </ul>
        <md-list
          class="md-double-line  md-elevation-24"
          v-for="(offer, index) in offerName"
          v-bind:key="index"
        >
          <md-subheader>{{ offer.productName }}</md-subheader>
          <md-divider></md-divider>
          <md-list-item>
            <md-icon class="md-primary md-size-2x">storefront</md-icon>

            <div class="md-list-item-text">
              <span> Precio: {{ offer.pricePresentation }}</span>
              <span>Oferta por: {{ offer.presentation }}</span>
              <span>Minima cantidad:{{ offer.minQuantity }}</span>
            </div>
          </md-list-item>

          <md-list-item class="md-inset md-expand">
            <div class="md-list-item-text">
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
      name: "",
      json: {
        myJson: json
      },
      products: {
        categoria: "",
        producto: ""
      }
    };
  },
  mounted() {
    console.log("Hola mounted");
    this.storage();
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
          console.log(this.offers)
        })
        .catch(e => console.log(e));
    },
    addIdOffer: function(Id) {
      localStorage.setItem("buyerOrderId", Id);
    }
  },
  computed: {
    setOptions: function() {
      let productos;
      let options = this.json.myJson;
      for (let i = 0; i < 7; i++) {
        if (this.products.categoria === options[i]["categoria"]) {
          productos = options[i]["productos"];
        }
      }
      return productos;
    },
    offerName: function() {
      return this.offers.filter((item) => {
         return item.productName.toLowerCase().startsWith(this.productName.toLowerCase());
      })
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
