<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">Vendedor / Mercaprospero</h6>
      <h4 class="card-title">Jorge Hernández</h4>
      <p class="card-description">
        Distribuidor minorista de vegetales y frutas a través del minimercado
        "Mercaprospero"
      </p>
      <md-button class="md-round md-success">Editar Perfil</md-button>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/marc.jpg")
    }
  },
  data() {
    return {};
  }
};
</script>
<style></style>
