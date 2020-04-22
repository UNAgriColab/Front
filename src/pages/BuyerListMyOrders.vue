<template>
  <div class="content">
    <div>
      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Solicitudes</h4>
          <p class="category">Lista de las solicitudes que has realizado</p>
        </md-card-header>
        <md-card-content>
          <user-requests-table table-header-color="green"></user-requests-table>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { UserRequestsTable } from "@/components";

export default {
  components: {
    UserRequestsTable
  }
};
</script>
