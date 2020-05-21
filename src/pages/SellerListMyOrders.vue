<template>
  <div class="content">
    <div>
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
