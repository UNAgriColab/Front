<template>
  <div class="content">
    <div>
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

            <div>
              <md-field>
                <!-- label for="unit">Unidad</label -->
                <label>Estado</label>
                <md-select
                  v-model="products.state"
                  name="Ordenar"
                  id="Ordenar"
                  md-dense
                >
                  <md-option value="-1">Todos</md-option>
                  <md-option value="2">En espera</md-option>
                  <md-option value="3">En proceso</md-option>
                  <md-option value="4">Enviado</md-option>
                </md-select>
              </md-field>
            </div>
            <md-button v-on:click="getProduct">
              Ordenar
            </md-button>
          </div>
        </md-content>
      </div>
      <div class="md-layout">
        <div
          class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100 md-size-100 text-right"
        >
          <md-button
            to="/SellerListMyOrdersHist"
            class="md-raised md-theme-default md-alignment-right"
          >
            <md-icon>history</md-icon>
            <span>Historial</span>
          </md-button>
        </div>
      </div>
      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Pedidos</h4>
          <p class="category">Lista de los pedidos que te han realizado</p>
        </md-card-header>
        <md-card-content>
          <seller-list-my-orders-table table-header-color="green">
          </seller-list-my-orders-table>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { SellerListMyOrdersTable } from "@/components";
import json from "../jsons/productos.json";
import EventBus from "../event-bus";

export default {
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
        producto: "all",
        state: "-1"
      }
    };
  },
  components: {
    SellerListMyOrdersTable
  },
  mounted() {},
  methods: {
    getProduct: function() {
      if (this.products.state === "") {
        this.products.state = -1;
      }
      if (this.products.producto === "") {
        this.products.producto = "all";
      }
      EventBus.$emit("dataSend1", this.products.producto);
      EventBus.$emit("dataSend2", this.products.state);
      EventBus.$emit("readFunction", 1);
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
    }
  }
};
</script>
