<template>

  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-60">
        <md-card>
          <md-card-header data-background-color="green">
            <h1>Digite el usuario</h1>
          </md-card-header>
          <md-card-content>
            <md-field>
              <label for="path">Usuario de las ordenes a ver:</label><br>
              <md-input v-model="path" placeholder="path"></md-input>
            </md-field>
            <md-button
                    v-on:click="getOffers"
                    type="submit"
                    class="md-raised md-success">
              Ingresar
            </md-button>
          </md-card-content>
        </md-card>

        <md-list class="md-double-line  md-elevation-24"  v-for="(offer, index) in offers" v-bind:key="index">
          <md-subheader>ID de la oferta relacionada {{offer.offerReference}}</md-subheader>
          <md-divider></md-divider>
          <md-list-item>
            <md-icon class="md-primary md-size-2x">storefront</md-icon>

            <div class="md-list-item-text">
              <span>Oferta hecha por: {{offer.userEmail}}</span>
              <span v-if="offer.state ==1">Estado: Por aceptar</span>
              <span v-if="offer.state ==2">Estado: Aceptada</span>
              <span v-if="offer.state ==3">Estado: En camino</span>
            </div>
          </md-list-item>

          <md-list-item class="md-inset md-expand">
            <div class="md-list-item-text">
              <span>{{offer.description}}</span>
            </div>

            <md-button class="md-primary md-icon-button md-list-action">
              <md-icon>shopping_cart</md-icon>
            </md-button>
          </md-list-item>
        </md-list>

      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'DoubleLine',
    data(){
      return{
        path: '',
        offers: null,
        order: null
      }
    },
    mounted(){
    },
    methods:{
      getOffers(){
        console.log('metodo get offers');
        if (localStorage.getItem("userSession")){
          this.aux = JSON.parse(localStorage.getItem("userSession"));
          this.email = this.aux.email;
        }
        axios.get('http://localhost:8080/api/v1/order/seller/'+ this.path)
                .then(response =>{
                  console.log(response);
                  this.offers=response.data;
                  /*axios.get('http://localhost:8080/api/v1/offer/'+ response.data.offerReference)
                          .then(response =>{

                            alert(response.data.offerReference)
                            console.log(response);
                            this.order=response.data
                          })*/
                }).catch(e => console.log(e))
      },

    }
  }
</script>

<style lang="scss" scoped>
  .md-list {
    width: 640px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
  }
</style>
