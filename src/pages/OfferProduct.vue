<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Oferta de un nuevo producto</h4>
        <p class="category">Información necesaria para la creación de una nueva oferta</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Nombre del producto</label>
              <md-input v-model="productName" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Unidad</label>
              <md-input v-model="unit" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Numero de unidades</label>
              <md-input v-model="numberOfUnits" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Precio por unidad</label>
              <md-input v-model="totalPrice" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>Descripción</label>
              <md-textarea v-model="Description"></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success">Publicar oferta</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "offer-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      productName: null,
      unit: null,
      numberOfUnits: null,
      totalPrice: null,
      Description:
        "En este espacio puedes realizar una pequeña descripión de tu producto."
    };
  }
};
</script>
<style></style>
