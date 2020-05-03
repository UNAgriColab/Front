<template>
  <div class="content">
    <div class="md-layout">
      <div
              class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-60"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h1 class="title">{{ product.name }}</h1>
            <p class="category">De: {{ product.user }}</p>
          </md-card-header>
          <md-card-content>
            <div id="product">
              <div class="product">
                <div class="md-layout-item md-size-100 md-size-33">
                  <h3 class="title" >
                    {{ product.numberOfUnits }}
                    <span v-if="product.presentation ==1 ">
                      Gramos pedidos.
                    </span>
                    <span v-if="product.presentation ==2 ">
                      Libras pedidas.
                    </span>
                    <span v-if="product.presentation ==3 ">
                      Kilogramos pedidos.
                    </span>
                    <span v-if="product.presentation ==4 ">
                      Arrobas pedidas.
                    </span>
                    <span v-if="product.presentation ==5 ">
                      Bultos pedidos.
                    </span>
                  </h3>
                  <h4 class="title" >Precio por unidad: {{ product.price }}</h4>
                  <h4 class="title" >Precio total final: {{ product.totalPrice }}</h4>
                </div>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-33">
                <h4></h4>
              </div>
              <div class="md-layout-item md-size-100 text-left">
                <md-button
                        v-on:click="saveRequest"
                        class="md-raised md-success"
                        :disabled="numberOfUnits"
                >
                  Prueba
                </md-button>
                <md-button
                        v-on:click="saveRequest"
                        class="md-raised md-success"
                        :disabled="numberOfUnits"
                 >
                  Editar orden
                </md-button>
              </div>

            </div>

          <md-card-header data-background-color="green">
            <h1 class="title">Descripción</h1>
          </md-card-header>
          <div class="md-layout-item md-size-100 md-size-33">
            <p class="category">
              {{ product.description }}
            </p>
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
          user: "",
          quantity: 0,
          numberOfUnits: 0,
          totalPrice: 0,
          description: "",
          id: "",
          presentation: "",
          //oferta
          price: 0,
          name: "",
          //unused
          userEmail : "",
        }
      };
    },
    mounted() {
      http.
      get("/v1/order/1").   //hacer dinámico para que cambie
      then(response => {
        this.product.offerReference = response.data.offerReference;
        this.product.id = response.data.id;
        this.product.user = response.data.userEmail;
        this.product.presentation = response.data.unit;
        this.product.numberOfUnits = response.data.numberOfUnits;
        this.product.totalPrice = response.data.totalPrice;
        this.product.description = response.data.description;
        // this.product.status = response.data.status;
      })
      .catch(e => {
        console.log(e);
      })

      http.
      get("/v1/offer/3").   //hacer dinámico para que cambie offerReference
      then(response => {
        this.product.name = response.data.productName;
        this.product.price = response.data.pricePresentation;
      })
      .catch(e => {
        console.log(e);
      })
    },
    methods: {
      /* eslint-disable no-console */
      saveRequest() {
        const data = {
          numberOfUnits: this.product.numberOfUnits,
          unit: this.product.presentation,
          description: this.product.description,
          name: this.product.productName,
          totalPrice: this.product.price,
          userEmail: this.product.userEmail
        };

        http
                .post("/v1/request", data)
                .then(response => {
                  this.product.id = response.data.id;
                  console.log(response.data);
                })
                .catch(e => {
                  console.log(e);
                });

        this.submitted = true;
      },
      newCustomer() {
        this.submitted = false;
        this.customer = {};
      }
      /* eslint-enable no-console */
    }
  };
</script>
