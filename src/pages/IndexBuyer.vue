<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-30"></div>
      <div
        class="md-layout-item md-size-50 md-small-size-45 md-medium-size-45 md-xsmall-size-100 md-alignment-center-center"
      >
        <h1 class="title text-center" style="color: #4caf50">
          <b>Compras</b>
        </h1>
        <h2 class="title text-center" style="color: #4caf50"></h2>
        <h3 class="title text-center" style="margin-bottom: 15px">
          <b style="color: #4caf50">¿Quieres consumir o distribuir productos agrícolas 100% colombianos?</b>
        </h3>
        <h3>
          <b>
            Regístrate y conoce a un centenar de productores
          </b>
        </h3>
        <md-button
          to="/login"
          class="md-button md-list-action md-success"
          style="margin-left: 10px; margin-top: 10px"
        >
          <md-icon class="md-primary">login</md-icon>
          Ingresa
        </md-button>
        <md-button
          to="/register"
          class="md-button md-list-action md-success"
          style="margin-left: 10px; margin-top: 10px"
        >
          <md-icon>verified</md-icon>
          Regístrate
        </md-button>
      </div>

      <div class="md-layout-item md-size-20"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data: function() {
    return {
      submitData: false
    };
  },
  methods: {}
};
</script>
