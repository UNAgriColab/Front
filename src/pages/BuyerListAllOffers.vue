<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item text-center">
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
              <span>Oferta por: {{ offer.presentation }}</span>
              <span>Minima cantidad:{{ offer.minQuantity }}</span>
            </div>
          </md-list-item>

          <md-list-item class="md-inset md-expand">
            <div class="md-list-item-text">
              <span>{{ offer.description }}</span>
            </div>
            <router-link to="/BuyerBuyProduct" class="text-white">
              <md-button class="md-primary md-icon-button md-list-action" :value="offer.id" @click="addIdOffer(offer.id)">
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

export default {
  name: "DoubleLine",
  data() {
    return {
      offers: null,
      token: "",
      tokenHeader: "",
      aux: ""
    };
  },
  mounted() {
    console.log("Hola mounted");
    this.getOffers();
  },
  methods: {
    getOffers: function() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.tokenHeader = "Bearer " + this.token;
      }

      console.log(`Bearer ${this.token}`);
      axios
        .get("http://localhost:8080/api/v1/offer", {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          console.log(response);
          this.offers = response.data;
        })
        .catch(e => console.log(e));
    },
    addIdOffer: function(Id){
      let IdAux =Id;
      alert(IdAux);
      localStorage.setItem("buyerOrderId", IdAux);
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
