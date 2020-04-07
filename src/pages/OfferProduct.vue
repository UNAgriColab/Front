<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Oferta de un nuevo producto</h4>
        <p class="category">Información necesaria para la creación de una nueva oferta</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout-item"><!-- Layaot item list-->
            <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                    <label for="productName">Tipo de producto</label>
                    <md-select v-model="productName" name="productName" id="productName" md-dense>
                        <md-optgroup label="Hortalizas">
                        <md-option value="ACELGA">ACELGA</md-option>
                        <md-option value="CEBOLLA CABEZONA BLANCA">CEBOLLA CABEZONA BLANCA</md-option>
                        </md-optgroup>

                        <md-optgroup label="Frutas">
                        <md-option value="AGUACATE HASS">AGUACATE HASS</md-option>
                        <md-option value="BANANO CRIOLLO">BANANO CRIOLLO</md-option>
                        <md-option value="CURUBA BOYACENCE">CURUBA BOYACENCE</md-option>
                        <md-option value="TOMATE DE ARBOL">TOMATE DE ARBOL</md-option>
                        </md-optgroup>

                        <md-optgroup label="Tuberculos">
                        <md-option value="PAPA CRIOLLA LAVADA">PAPA CRIOLLA LAVADA</md-option>
                        <md-option value="PAPA PASTUSA">PAPA PASTUSA</md-option>
                        <md-option value="PAPA R12 INDUSTRIAL">PAPA R12 INDUSTRIAL</md-option>
                        </md-optgroup>
                    </md-select>
                </md-field>
            </div>
        </div>
        <div class="md-layout"><!-- Layaot item -->
            <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                <label for="country">Unidad</label>
                <md-select v-model="country" name="country" id="country" md-dense>
                    <md-option value="Gramos">Gramos</md-option>
                    <md-option value="Libras">Libras</md-option>
                    <md-option value="Kilogramos">Kilogramos</md-option>
                    <md-option value="Arrobas">Arrobas</md-option>
                    <md-option value="Bultos(50 Kg)">Bultos(50 Kg)</md-option>
                </md-select>
                </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
                <label>Numero de unidades</label>
                <md-input v-model="numberOfUnits" type="Number"></md-input>
            </md-field>
            </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Precio por unidad</label>
              <md-input v-model="totalPrice" type="text"></md-input>
              <md-icon>attach_money</md-icon>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>Descripción</label>
              <md-textarea v-model="description"></md-textarea>
              <md-icon>description</md-icon>
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
      productName: tomate,
      unit: null,
      numberOfUnits: null,
      totalPrice: null,
      description:
            "En este espacio puedes realizar una pequeña descripión de tu producto."
    };
  }
};
</script>
<style></style>
