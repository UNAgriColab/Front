<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-60"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h1 class="title">{{ product.name }}</h1>
            <p class="category">{{ product.user}}</p>
          </md-card-header>
          <div id="product">
            <div class="product">
              <img v-bind:src="product.types[0].img"
              class="img"/>
              <div class="details">
                <span v-if="product.quantity >= 20" class="stock in-stock">
                  Unidades disponibles
                </span>
                <span
                  v-else-if="product.quantity > 0 && product.quantity < 20"
                  class="stock low-stock"
                >
                  quedan pocas unidades
                </span>
                <span v-else class="stock out-of-stock">
                  agotado
                </span>
                <span>Select type:</span>
                <div class="types">
                  <span
                    class="color-box"
                    v-for="types in product.types"
                    v-bind:key="types.id"
                    v-bind:title="types.name"
                    v-bind:style="{ backgroundColor: types.code }"
                    v-bind:class="{ 'color-box': true}"
                  >
                  </span>
                </div>
              </div>
            </div>
          </div>
        </md-card>
        <md-card>
          <md-card-header data-background-color="green">
            <h1 class="title">¡Compra!</h1>
          </md-card-header>
          <div class="dr">
            <p class="category">Unitario:</p>
            <select v-model="selected">
              <option disabled value="">Seleccione un la unidad</option>
              <option>unidad uno</option>
              <option>unidad dos</option>
              <option>unidad tres</option>
            </select>
            <span>Seleccionado: {{ selected }}</span>
            <p class="category">Precio total:</p>
          </div>
        </md-card>
        <md-card>
          <md-card-header data-background-color="green">
            <h1 class="title">Descripción</h1>
          </md-card-header>
          <p class="category">{{ product.description}}</p>
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
      selected:'',
      product: {
        name: "frutas",
        description: "esta es la descripcion de una fruta",
        quantity: 50,
        types: [
          {
            id: 1,
            name: "Fresa",
            user: "usuario1",
            code: "#38393e",
            img:
              "https://ep01.epimg.net/elpais/imagenes/2020/02/26/estilo/1582729350_677456_1582730523_noticia_normal.jpg"
          },
          {
            id: 2,
            name: "Mango ",
            code: "#696969",
            img:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Mango_and_cross_section_edit.jpg/800px-Mango_and_cross_section_edit.jpg"
          }
        ]
      }
    };
  }
};
</script>
