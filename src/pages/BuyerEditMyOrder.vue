<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-60"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Edita tu solicitud</h4>
            <p class="category">
              Información necesaria para la edición de una solicitud
            </p>
          </md-card-header>
          <md-card-content>
            <div id="product">
              <div class="product">
                <div class="md-layout-item md-size-100 md-size-50">
                  <h1 class="title">{{ product.productName }}</h1>
                  <p class="category">Comprador: {{ product.buyerEmail }}</p>
                  <p class="category">Id de la orden: {{ product.id }}</p>
                  <p class="category">
                    Id de la oferta referenciada {{ product.offerReference }}
                  </p>
                  <h3 class="title">
                    {{ product.numberOfUnits }}
                    <span v-if="product.unit === 1">
                      Gramos pedidos.
                    </span>
                    <span v-if="product.unit === 2">
                      Libras pedidas.
                    </span>
                    <span v-if="product.unit === 3">
                      Kilogramos pedidos.
                    </span>
                    <span v-if="product.unit === 4">
                      Arrobas pedidas.
                    </span>
                    <span v-if="product.unit === 5">
                      Bultos pedidos.
                    </span>
                  </h3>
                  <h4 class="title">
                    Precio total final: ${{ product.totalPrice }}
                  </h4>
                </div>
              </div>
            </div>
            <h2 class="title">Descripción</h2>
            <div class="md-layout-item md-size-100 md-size-33">
              <p class="category">
                {{ product.description }}
              </p>
            </div>
            <div>
              <h2>
                Estado de la orden:
              </h2>
            </div>

            <div
              v-if="state.active !== 'zero'"
              class="md-layout-item md-size-100 md-size-33"
            >
              <md-steppers :md-active-step.sync="state.active" md-linear>
                <md-step
                  id="first"
                  md-label="En espera"
                  :md-editable="false"
                  :md-done.sync="state.first"
                >
                  <p>Esperando confirmación de producto</p>
                </md-step>

                <md-step
                  id="second"
                  md-label="En proceso"
                  :md-editable="false"
                  :md-done.sync="state.second"
                >
                  <p>El producto está en proceso</p>
                </md-step>

                <md-step
                  id="third"
                  md-label="Enviado"
                  :md-editable="false"
                  :md-done.sync="state.third"
                  class="md-stepper"
                >
                  <p>El producto ya ha sido enviado</p>
                </md-step>

                <md-step
                  id="fourth"
                  md-label="Recibido"
                  :md-editable="false"
                  :md-done.sync="state.fourth"
                >
                  <p>Ya recibiste el producto</p>
                </md-step>
              </md-steppers>
            </div>
            <div v-if="state.active === 'zero'">
              <h4>
                Producto cancelado
              </h4>
            </div>
            <div
              v-if="product.state === 1"
              class="md-layout-item md-size-100 text-right"
            >
              <div>
                <md-dialog :md-active.sync="showDialog">
                  <md-card>
                    <md-card-header data-background-color="green">
                      <h5 class="title text-center">Califica tu compra</h5>
                    </md-card-header>
                    <md-card-content>
                      <div class="separator">
                        <md-avatar
                          class="md-avatar-icon md-large md-default"
                          style="margin-left: 10px"
                        >
                          <md-icon> star</md-icon>
                        </md-avatar>
                        &nbsp;
                        <md-avatar class="md-avatar-icon md-large md-default">
                          <md-icon> star</md-icon>
                        </md-avatar>
                        &nbsp;
                        <md-avatar class="md-avatar-icon md-large md-default">
                          <md-icon> star</md-icon>
                        </md-avatar>
                        &nbsp;
                        <md-avatar class="md-avatar-icon md-large md-default">
                          <md-icon> star</md-icon>
                        </md-avatar>
                        &nbsp;
                        <md-avatar
                          class="md-avatar-icon md-large md-default"
                          style="margin-right: 10px"
                        >
                          <md-icon> star</md-icon>
                        </md-avatar>
                      </div>
                    </md-card-content>
                    <form
                      class="pure-form pure-form-stacked"
                      v-on:submit.prevent="saveQualification"
                      id="form"
                    >
                      <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-radio
                          v-model="qualification.calificacion"
                          :value="1"
                          >1</md-radio
                        >
                        <md-radio
                          v-model="qualification.calificacion"
                          :value="2"
                          >2</md-radio
                        >
                        <md-radio
                          v-model="qualification.calificacion"
                          :value="3"
                          >3</md-radio
                        >
                        <md-radio
                          v-model="qualification.calificacion"
                          :value="4"
                          >4</md-radio
                        >
                        <md-radio
                          v-model="qualification.calificacion"
                          :value="5"
                          >5</md-radio
                        >
                        <md-field>
                          <label>Comentario</label>
                          <md-icon>chat</md-icon>
                          <md-input
                            id="commentario"
                            v-model="qualification.commentario"
                            type="text"
                            placeholder="Comentario"
                          >
                          </md-input>
                        </md-field>
                      </div>

                      <md-dialog-actions>
                        <md-button
                          class="md-primary"
                          @click="showDialog = false"
                          >Cancelar</md-button
                        >
                        <md-button
                          class="md-primary"
                          v-on:click="saveQualification"
                          type="submit"
                          @click="showDialog = false"
                          >Enviar</md-button
                        >
                      </md-dialog-actions>
                    </form>
                  </md-card>
                </md-dialog>
                <md-button
                  class="md-primary md-raised"
                  @click="showDialog = true"
                >
                  <md-icon> star</md-icon>
                  CALIFICACIÓN</md-button
                >
              </div>
            </div>
            <div
              class="md-layout-item md-size-100 text-right"
              v-if="product.state === 2"
            >
              <md-button class="md-raised md-success" v-on:click="cancelOrder">
                <md-icon>cancel</md-icon> cancelar producto
              </md-button>
            </div>
            <div
              class="md-layout-item md-size-100 text-right"
              v-if="product.state === 4"
            >
              <md-button class="md-raised md-success" v-on:click="updateOrder">
                Actualizar estado
              </md-button>
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
  data: () => {
    return {
      showDialog: false,
      product: {
        //orden
        offerReference: "",
        buyerEmail: "",
        numberOfUnits: 0,
        description: "",
        id: "",
        sellerEmail: "",
        productName: "",
        unit: "",
        totalPrice: 0,
        state: "",
        deliveryAdd: "",

        canceled: false
      },
      state: {
        active: "",
        first: false,
        second: false,
        third: false,
        fourth: false,
        zero: false
      },
      qualification: {
        calificacion: "",
        commentario: "",
        orderReference: ""
      }
    };
  },
  mounted() {
    this.storage();
    this.leerAPI();
  },
  methods: {
    storage() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.product.userEmail = this.aux.email;
      }
      if (localStorage.getItem("buyerOrderId")) {
        this.product.id = localStorage.getItem("buyerOrderId");
      }
    },
    leerAPI() {
      http
        .get(
          "https://agricolab-un.appspot.com/api/v1/order/" + this.product.id,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            },
            withCredentials: false
          }
        )
        .then(response => {
          this.product.offerReference = response.data.offerReference;
          this.product.buyerEmail = response.data.buyerEmail;
          this.product.numberOfUnits = response.data.numberOfUnits;
          this.product.description = response.data.description;
          this.product.id = response.data.id;
          this.product.sellerEmail = response.data.sellerEmail;
          this.product.productName = response.data.productName;
          this.product.unit = response.data.unit;
          this.product.totalPrice = response.data.totalPrice;
          this.product.state = response.data.state;
          this.product.deliveryAdd = response.data.deliveryAdd;
          this.stepChange();
        })
        .catch(e => {
          console.log(e);
        });
    },
    stepChange() {
      if (this.product.state === 0) {
        this.state.active = "zero";
      }
      if (this.product.state === 2) {
        this.state.active = "first";
      }
      if (this.product.state === 3) {
        this.state.active = "second";
      }
      if (this.product.state === 4) {
        this.state.active = "third";
      }

      if (this.product.state === 1) {
        this.state.active = "fourth";
      }
    },
    cancelOrder() {
      http
        .put(
          "http://localhost:8080/api/v1/order/cancel/" +
            this.product.id +
            "/" +
            this.product.userEmail,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            },
            withCredentials: false
          }
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

      this.submitted = true;
    },
    updateOrder() {
      http
        .put(
          "http://localhost:8080/api/v1/order/update/" +
            this.product.id +
            "/" +
            this.product.userEmail,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            },
            withCredentials: false
          }
        )
        .then(response => {
          alert("envia");

          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveQualification: function() {
      console.log("Save Qualification");
      const data = {
        comment: this.qualification.commentario,
        orderReference: this.product.id,
        qualification: this.qualification.calificacion
      };
      console.log(data);
      http
        .put("http://localhost:8080/api/v1/order/qualification", data, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          console.log(response.data);
          if (JSON.stringify(response.data) === true) {
            this.$router.push("/login");
          }
        })
        .catch(e => {
          console.log(e);
        });
      this.submitted = true;
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped></style>
