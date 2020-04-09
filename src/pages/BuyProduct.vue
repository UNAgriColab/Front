<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-60"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h1 class="title">{{ product.selected.name }}</h1>
            <p class="category">{{ product.selected.user }}</p>
          </md-card-header>
          <div id="product">
            <div class="product">
              <img v-bind:src="product.selected.img" class="img" alt="" />
              <div class="details">
                <span
                  v-if="product.selected.quantity >= 20"
                  class="stock in-stock"
                >
                  Unidades disponibles
                </span>
                <span
                  v-else-if="
                    product.selected.quantity > 0 &&
                      product.selected.quantity < 20
                  "
                  class="stock low-stock"
                >
                  quedan pocas unidades
                </span>
                <span v-else class="stock out-of-stock">
                  agotado
                </span>
                <div class="md-layout-item md-size-100 md-size-33">
                  <h3 class="title">Precio: {{ product.selected.price }}</h3>
                </div>
              </div>
            </div>
          </div>
        </md-card>
        <md-card>
          <md-card-header data-background-color="green">
            <h1 class="title">¡Compra!</h1>
          </md-card-header>
          <md-card-content>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Numero de unidades</label>
                  <md-input v-model="numberOfUnits" type="Number"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label for="country">Unidad</label>
                  <md-select
                    v-model="country"
                    name="country"
                    id="country"
                    md-dense
                  >
                    <md-option value="Gramos">Gramos</md-option>
                    <md-option value="Libras">Libras</md-option>
                    <md-option value="Kilogramos">Kilogramos</md-option>
                    <md-option value="Arrobas">Arrobas</md-option>
                    <md-option value="Bultos(50 Kg)">Bultos(50 Kg)</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <h4></h4>
              </div>
              <div class="md-layout-item md-size-100 md-size-33">
                <h3 class="title">
                  Precio final: {{ product.selected.price }}
                </h3>
              </div>
              <div class="md-layout-item md-size-100 text-right">
                <md-button class="md-raised md-success">Comprar</md-button>
              </div>
            </div>
          </md-card-content>
        </md-card>
        <md-card>
          <md-card-header data-background-color="green">
            <h1 class="title">Descripción</h1>
          </md-card-header>
          <div class="md-layout-item md-size-100 md-size-33">
            <p class="category">
              {{ product.selected.description }}
            </p>
          </div>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product",
  data: function() {
    return {
      selected: "",
      product: {
        selected: {
          id: 1,
          name: "Fresa",
          user: "usuario1",
          price: 50000,
          color: "#38393e",
          quantity: 50,
          description: "esta es la descripcion de una fruta",
          img:
            "https://ep01.epimg.net/elpais/imagenes/2020/02/26/estilo/1582729350_677456_1582730523_noticia_normal.jpg"
        },
        models: [
          {
            id: 1,
            name: "Fresa",
            user: "usuario1",
            price: 50000,
            color: "#38393e",
            quantity: 50,
            description: "esta es la descripcion de una fruta",
            img:
              "https://ep01.epimg.net/elpais/imagenes/2020/02/26/estilo/1582729350_677456_1582730523_noticia_normal.jpg"
          },
          {
            id: 2,
            name: "Mango ",
            user: "usuario1",
            color: "#696969",
            price: 60000,
            quantity: 50,
            description: "esta es la descripcion de una fruta2",
            img:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Mango_and_cross_section_edit.jpg/800px-Mango_and_cross_section_edit.jpg"
          }
        ]
      }
    };
  }
};
</script>
