<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-60">
        <md-card>
          <md-card-header data-background-color="green">
            <div class="product">
              <div class="md-layout-item md-size-100 md-size-33">
                <h1 class="title">{{ product.productName }}</h1>
                <p class="category">Vendedor: {{ product.sellerEmail }}</p>
                <p class="category">Id de la orden: {{ product.id }}</p>
              </div>
            </div>
          </md-card-header>
          <md-card-content>
            <div>
              <div>
                <h3 class="title">
                  {{ product.numberOfUnits }}
                  <span v-if="product.presentation === 1">
                    Gramos pedidos.
                  </span>
                  <span v-if="product.presentation === 2">
                    Libras pedidas.
                  </span>
                  <span v-if="product.presentation === 3">
                    Kilogramos pedidos.
                  </span>
                  <span v-if="product.presentation === 4">
                    Arrobas pedidas.
                  </span>
                  <span v-if="product.presentation === 5">
                    Bultos pedidos.
                  </span>
                </h3>
                <h4 class="title">
                  Precio total final: ${{ product.totalPrice }}
                </h4>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-size-40">
        <md-card>
          <md-card-header data-background-color="green">
            <h2 class="title">Tus observaciones</h2>
            <p class="category">De: {{ product.buyerEmail }}</p>
          </md-card-header>
          <md-card-content>
            <div class="md-layout-item md-size-100 md-size-33">
              <p class="category">
                {{ product.description }}
              </p>
            </div>
          </md-card-content>
        </md-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <div>
              <h2 class="title">Estado de la orden</h2>
              <p class="category">
                Actualiza el estado de tu orden
              </p>
            </div>
          </md-card-header>
          <md-card-content>
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
              v-if="product.state === 1 && product.qualification === 0"
              class="md-layout-item md-size-100 text-right"
            >
              <div>
                <md-dialog :md-active.sync="showDialog">
                  <md-card style="width: 370px">
                    <md-card-header data-background-color="green">
                      <h5 class="title text-center">Califica tu compra</h5>
                    </md-card-header>
                    <md-content>
                      <form
                        class="pure-form pure-form-stacked"
                        v-on:submit.prevent="saveQualification"
                        id="form"
                      >
                        <div
                          class="md-layout-item md-small-size-100 md-size-100"
                        >
                          <star-rating
                            style="margin: 15px"
                            v-model="qualification.calificacion"
                            :increment="0.5"
                            :fixed-points="1"
                          ></star-rating>

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
                    </md-content>
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
import { StarRating } from "vue-rate-it";

export default {
  components: {
    StarRating
  },
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
        qualification: "",
        presentation: "",
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
      },
      errorReq: ""
    };
  },
  mounted() {
    this.storage();
    this.leerAPI();
  },
  methods: {
    storage() {
      if (!localStorage.getItem("userSession")) {
        this.$router.push("/login");
      }
      if (localStorage.getItem("buyerOrderId")) {
        this.product.id = localStorage.getItem("buyerOrderId");
      }
    },
    leerAPI() {
      http
        .get("/order/" + this.product.id, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          this.product.offerReference = response.data.offerReference;
          this.product.buyerEmail = response.data.buyerEmail;
          this.product.numberOfUnits = response.data.numberOfUnits;
          this.product.description = response.data.description;
          this.product.id = response.data.id;
          this.product.sellerEmail = response.data.sellerEmail;
          this.product.productName = response.data.productName;
          this.product.presentation = response.data.presentation;
          this.product.totalPrice = response.data.totalPrice;
          this.product.state = response.data.state;
          this.product.qualification = response.data.qualification;
          this.product.deliveryAdd = response.data.deliveryAdd;
          this.stepChange();
        })
        .catch(e => {
          console.log(e);
          this.errorReq = e;
          this.notifyVue("danger");
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
      const data = {};
      http
        .put(
          "/order/cancel/" + this.product.id + "/" + this.product.userEmail,
          data,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            },
            withCredentials: false
          }
        )
        .then(response => {
          console.log(response.data);
          if (JSON.stringify(response.data) === "true") {
            this.notifyVue("info");
          }
          if (JSON.stringify(response.data) === "false") {
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
    updateOrder() {
      const data = {};
      http
        .put(
          "/order/update/" + this.product.id + "/" + this.product.userEmail,
          data,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            },
            withCredentials: false
          }
        )
        .then(response => {
          console.log(response.data);
          if (JSON.stringify(response.data) === "true") {
            this.notifyVue("success");
          }
          if (JSON.stringify(response.data) === "false") {
            this.notifyVue("warning");
          }
        })
        .catch(e => {
          console.log(e);
          this.errorReq = e;
          this.notifyVue("danger");
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
        .put("/order/qualification", data, {
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
          this.errorReq = e;
          this.notifyVue("danger");
        });
      this.submitted = true;
    },
    notifyVue(AlertType) {
      if (AlertType === "success") {
        this.$notify({
          message:
            "El perfil : <b>" +
            this.product.productName +
            "</b> ha sido actualizado con éxito.",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: AlertType
        });
      }
      if (AlertType === "warning") {
        this.$notify({
          message:
            "La solicitud del producto : " +
            this.product.productName +
            " <b>no</b> no se encuentra.",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: AlertType
        });
      }
      if (AlertType === "info") {
        this.$notify({
          message: "La orden #" + product.id + " ha sido cancelada.",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: "success"
        });
      }
      if (AlertType === "danger") {
        this.$notify({
          message: "Ha ocurrido un error" + this.errorReq + ".",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: AlertType
        });
      }
    },

    stars: function($star) {
      for (let $i = 1; $i <= 5; $i++) {
        document.getElementById("star" + $i).style.backgroundColor = "#9e9e9e";
      }
      for (let $x = 1; $x <= $star; $x++) {
        document.getElementById("star" + $x).style.backgroundColor = "#eeb933";
      }
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped></style>
