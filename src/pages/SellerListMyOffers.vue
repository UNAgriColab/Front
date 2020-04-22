<template>
  <div class="content">
    <div>
      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Productos</h4>
          <p class="category">Lista de los productos que has ofertado</p>
        </md-card-header>
        <md-card-content>
          <user-offers-table table-header-color="green"></user-offers-table>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { UserOffersTable } from "@/components";

export default {
  components: {
    UserOffersTable
  }
};
</script>
