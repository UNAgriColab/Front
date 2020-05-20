<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <form>
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">Paga la orden de tu producto</h4>
              <p class="category">
                Agrega la información de entrega de tu producto y tu método de
                pago
              </p>
            </md-card-header>

            <md-card-content>
              <div class="md-layout">
                <!-- Layout item list-->
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label for="paymentMethod">Modo de pago</label>
                    <md-select
                      v-model="order.paymentMethod"
                      name="paymentMethod"
                      id="paymentMethod"
                      md-dense
                    >
                      <md-optgroup label="Crédito">
                        <md-option value="Visa">Visa</md-option>
                        <md-option value="Mastercard">Mastercard</md-option>
                      </md-optgroup>

                      <md-optgroup label="Transferencia bancaria con PSE">
                        <md-option value="Banco agrario">
                          Banco agrario
                        </md-option>
                        <md-option value="Daviplata">Daviplata</md-option>
                        <md-option value="Nequi">Nequi</md-option>
                        <md-option value="Bancolombia">Bancolombia</md-option>
                        <md-option value="Banco Davivienda">
                          Banco Davivienda
                        </md-option>
                      </md-optgroup>

                      <md-optgroup label="Puntos fijos">
                        <md-option value="Efecty">Pago en Efecty</md-option>
                        <md-option value="Baloto">Pago en Baloto</md-option>
                        <md-option value="Pagatodo">Pago en pagatodo</md-option>
                      </md-optgroup>
                    </md-select>
                  </md-field>
                </div>
              </div>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <h3>Datos de envío</h3>
                  <md-field maxlength="1">
                    <label>Departamento</label>
                    <md-input v-model="order.department"></md-input>
                    <md-icon>location_city</md-icon>
                  </md-field>
                  <md-field maxlength="1">
                    <label>Ciudad</label>
                    <md-input v-model="order.city"></md-input>
                    <md-icon>apartment</md-icon>
                  </md-field>
                  <md-field maxlength="1">
                    <label>Barrio o vereda</label>
                    <md-input v-model="order.neighbourhood"></md-input>
                    <md-icon>people_outline</md-icon>
                  </md-field>
                  <md-field maxlength="1">
                    <label>Dirección</label>
                    <md-input v-model="order.address"></md-input>
                    <md-icon>house</md-icon>
                  </md-field>
                  <md-field maxlength="1">
                    <label>Detalles adicionales</label>
                    <md-input v-model="order.details"></md-input>
                    <md-icon>all_inclusive</md-icon>
                  </md-field>
                </div>
              </div>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <h3>¿Quieres decirle algo a tu vendedor?</h3>
                  <md-field>
                    <label>Descripción</label>
                    <md-textarea v-model="order.description"></md-textarea>
                    <md-icon>description</md-icon>
                  </md-field>
                </div>
              </div>
            </md-card-content>
          </md-card>
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">Resumen de tu compra</h4>
              <p class="category">
                Revisa que todos los datos de tu compra estén correctos
              </p>
            </md-card-header>
            <md-card-content>
              <p>
                Vas a comprar {{ order.numberOfUnits }}
                <span v-if="order.presentation === '1'">
                  Gramos
                </span>
                <span v-if="order.presentation === '2'">
                  Libras
                </span>
                <span v-if="order.presentation === '3'">
                  Kilogramos
                </span>
                <span v-if="order.presentation === '4'">
                  Arrobas
                </span>
                <span v-if="order.presentation === '5'">
                  Bultos
                </span>
                de {{ order.name }} con valor de {{ order.totalPrice }} para ser
                enviadas al departamento de {{ order.department }} a la ciudad
                de {{ order.city }}, {{ order.neighbourhood }} con dirección
                {{ order.address }}, {{ order.details }}.
              </p>
              <div class="md-layout-item md-size-100 text-right">
                <md-button class="md-raised md-success">
                  <md-icon>done</md-icon> Termina tu compra
                </md-button>
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
      order: {
        id: "",
        name: "",
        user: "",
        price: 0,
        minQuantity: 0,
        numberOfUnits: 0,
        description: "",
        presentation: "3",
        userEmail: "",
        totalPrice: "",

        paymentMethod: "",
        //mailing
        city: "",
        department: "",
        address: "",
        details: "",
        neighbourhood: ""
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
        this.order.userEmail = this.aux.email;
      }
    },
    /* eslint-disable no-console */
    saveOffer: function() {
      console.log("safeOffer");
      const data = {
        userEmail: this.order.userEmail,
        productName: this.order.productName,
        presentation: this.order.presentation,
        minQuantity: this.order.minQuantity,
        pricePresentation: this.order.pricePresentation,
        description: this.order.description
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
          this.order.id = response.data.id;
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
