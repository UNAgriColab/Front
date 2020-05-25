<template>
  <div class="content">
    <div>
      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title"> <md-icon style="color: #FFFFFF">history</md-icon> Historial</h4>
          <p class="category">Pedidos que te han realizado</p>
        </md-card-header>
        <md-card-content>
          <seller-list-my-orders-hist-table table-header-color="green">
          </seller-list-my-orders-hist-table>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { SellerListMyOrdersHistTable } from "@/components";

export default {
  components: {
    SellerListMyOrdersHistTable
  }
};
</script>
