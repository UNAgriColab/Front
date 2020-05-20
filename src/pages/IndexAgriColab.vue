<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card style="background-color: rgba(255,255,255,0.4)">
          <md-card-content>
            <h3 class="title text-center"><b>Bienvenid@</b></h3>
            <h4 class="title text-center" style="margin-bottom: 15px">
              A la nueva plataforma para la compra y venta de productos
              agricolas del campo colombiano
            </h4>
            <div>
              <md-tabs class="md-primary" md-alignment="centered">
                <md-tab id="tab-home" md-icon="home"></md-tab>
                <md-tab id="tab-pages" md-icon="pages"></md-tab>
                <md-tab
                  id="tab-posts"
                  md-icon="/assets/icon-whatshot.svg"
                ></md-tab>
                <md-tab id="tab-favorites" md-icon="favorite"></md-tab>
              </md-tabs>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <div>
                <md-list class="md-triple-line">
                  <md-list-item>
                    <md-avatar>
                      <img
                        src="http://lorempixel.com/60/60/food/1/"
                        alt="food"
                      />
                    </md-avatar>

                    <div class="md-list-item-text">
                      <h3 style="color: #4fa953"><b>Compra</b></h3>
                      <h4>Productos fantasticos</h4>
                    </div>

                    <md-button
                      class="md-icon-button md-list-action md-success"
                      style="margin-top: 15px"
                    >
                      <md-icon class="md-primary">shopping_cart</md-icon>
                    </md-button>
                  </md-list-item>

                  <md-divider class="md-inset"></md-divider>

                  <md-list-item>
                    <md-avatar>
                      <img
                        src="http://lorempixel.com/60/60/food/5/"
                        alt="food"
                      />
                    </md-avatar>

                    <div class="md-list-item-text">
                      <h3 style="color: #4fa953"><b>Vende</b></h3>
                      <h3>Sin intermediarios</h3>
                    </div>

                    <md-button
                      class="md-icon-button md-list-action md-success"
                      style="margin-top: 15px"
                    >
                      <md-icon>store</md-icon>
                    </md-button>
                  </md-list-item>
                  <md-divider
                    class="md-inset"
                    style="margin-bottom: 15px"
                  ></md-divider>
                </md-list>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
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
