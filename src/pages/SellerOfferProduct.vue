<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-60"
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
              <div class="md-layout-item">
                <!-- Layout item list-->
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label for="productName">Tipo de producto</label>
                    <md-select
                      v-model="offer.productName"
                      name="productName"
                      id="productName"
                      md-dense
                    >
                      <md-optgroup label="Hortalizas">
                        <md-option value="ACELGA">ACELGA</md-option>
                        <md-option value="CEBOLLA CABEZONA BLANCA">
                          CEBOLLA CABEZONA BLANCA
                        </md-option>
                      </md-optgroup>

                      <md-optgroup label="Frutas">
                        <md-option value="AGUACATE HASS">
                          AGUACATE HASS
                        </md-option>
                        <md-option value="BANANO CRIOLLO">
                          BANANO CRIOLLO
                        </md-option>
                        <md-option value="CURUBA BOYACENCE">
                          CURUBA BOYACENCE
                        </md-option>
                        <md-option value="TOMATE DE ARBOL">
                          TOMATE DE ARBOL
                        </md-option>
                      </md-optgroup>

                      <md-optgroup label="Tuberculos">
                        <md-option value="PAPA CRIOLLA LAVADA">
                          PAPA CRIOLLA LAVADA
                        </md-option>
                        <md-option value="PAPA PASTUSA">PAPA PASTUSA</md-option>
                        <md-option value="PAPA R12 INDUSTRIAL">
                          PAPA R12 INDUSTRIAL
                        </md-option>
                      </md-optgroup>
                    </md-select>
                  </md-field>
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
                      placeholder="unidades"
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Precio por unidad</label>
                    <md-input
                      v-model="offer.pricePresentation"
                      type="number"
                      min="1"
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
                  <md-button
                    v-on:click="saveOffer"
                    class="md-raised md-success"
                    type="submit"
                  >
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

export default {
  name: "add-offer",
  data: function() {
    return {
      offer: {
        id: "",
        userEmail: "",
        productName: "",
        presentation: "",
        minQuantity: "",
        pricePresentation: "",
        description: ""
      },
      submitted: false
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
        this.offer.userEmail = this.aux.email;
      }
    },
    /* eslint-disable no-console */
    saveOffer: function() {
      console.log("safeOffer");
      const data = {
        userEmail: this.offer.userEmail,
        productName: this.offer.productName,
        presentation: this.offer.presentation,
        minQuantity: this.offer.minQuantity,
        pricePresentation: this.offer.pricePresentation,
        description: this.offer.description
      };
      http
        .post("/v1/offer", data, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          console.log("se espera respuesta");
          this.offer.id = response.data.id;
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

<style></style>
