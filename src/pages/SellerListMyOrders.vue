<template>
  <div class="content">
    <div>
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

export default {
  components: {
    SellerListMyOrdersTable
  }
};
</script>
