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
                <div class="md-layout-item md-size-100 md-size-33">
                  <h1 class="title">{{ product.productName }}</h1>
                  <p class="category">Vendedor: {{ product.sellerEmail }}</p>
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
            <div class="md-layout-item md-size-100 md-size-33">
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
            <div class="md-layout-item md-size-100 text-right">
              <md-button class="md-raised md-success" v-on:click="cancelOrder">
                cancelar producto
              </md-button>
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
  data() {
    return {
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
        state: 1,
        deliveryAdd: "",

        canceled: true
      },
      state: {
        active: "first",
        first: false,
        second: false,
        third: false,
        fourth: false,
        zero: false
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
      if (localStorage.getItem("sellerOrderId")) {
        this.product.id = localStorage.getItem("sellerOrderId");
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
      if (this.product.state === 1) {
        this.state.active = "first";
      }
      if (this.product.state === 2) {
        this.state.active = "second";
      }
      if (this.product.state === 3) {
        this.state.active = "third";
      }

      if (this.product.state === 4) {
        this.state.active = "fourth";
      }
    },
    cancelOrder() {
      const data = {
        canceled: (this.product.canceled = false),
        orderId: this.product.id
      };

      http
        .put("https://agricolab-un.appspot.com/api/v1/order/seller", data, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

      this.submitted = true;
    },
    updateOrder() {
      const data = {
        canceled: (this.product.canceled = true),
        orderId: this.product.id
      };

      http
        .put("https://agricolab-un.appspot.com/api/v1/order/seller", data, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          alert("envia");

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

<style lang="scss" scoped>
.md-steppers {
}
</style>
