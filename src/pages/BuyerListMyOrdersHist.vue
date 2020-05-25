<template>
  <div class="content">
    <div>
      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title"><md-icon style="color: #FFFFFF">history</md-icon> Historial</h4>
          <p class="category">Solicitudes que has realizado</p>
        </md-card-header>
        <md-card-content>
          <buyer-list-my-orders-hist-table table-header-color="green">
          </buyer-list-my-orders-hist-table>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { BuyerListMyOrdersHistTable } from "@/components";

export default {
  components: {
    BuyerListMyOrdersHistTable
  }
};
</script>
