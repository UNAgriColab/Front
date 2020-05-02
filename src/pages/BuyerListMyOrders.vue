<template>
  <div class="content">
    <div>
      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Solicitudes</h4>
          <p class="category">Lista de las solicitudes que has realizado</p>
        </md-card-header>
        <md-card-content>
          <buyer-list-my-orders-table table-header-color="green"></buyer-list-my-orders-table>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { BuyerListMyOrdersTable } from "@/components";

export default {
  components: {
    BuyerListMyOrdersTable
  }
};
</script>
