<template>
  <div class="content">
     <div class="md-layout">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-60">

          <md-card>
            <md-card-header data-background-color="green">
              <h1 class="title">¡Digita el usuario!</h1>
            </md-card-header>
            <md-card-content>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label></label>
                  <md-input
                          id="ViewUserRequest"
                          name="ViewUserRequest"
                  >
                  </md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 text-right">
                <md-button
                        v-on:click="saveCustomer"
                        class="md-raised md-success"
                        :disabled="numberOfUnits"
                >
                  Comprar
                </md-button>
              </div>
            </md-card-content>
          </md-card>

          <md-list class="md-double-line  md-elevation-24" v-for="(request, index) in requests" v-bind:key="index">
            <md-subheader>{{request.productName}}</md-subheader>
            <md-divider></md-divider>
            <md-list-item>
              <md-icon class="md-primary md-size-2x">storefront</md-icon>

              <div class="md-list-item-text">
                <span> Precio: {{request.totalPrice}}</span>
                <span>Unidades solicitadas:{{request.unit}}</span>
              </div>
            </md-list-item>

            <md-list-item class="md-inset md-expand">
              <div class="md-list-item-text">
                <span>{{request.description}}</span>
              </div>

              <md-button class="md-primary md-icon-button md-list-action">
                  <span>Ver</span>
              </md-button>
            </md-list-item>
          </md-list>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import http from "../http-common";

export function getProfileData() {
  return request({
    url: `http://localhost:8080/api/v1/request/user/${ this.user }`,
    method: 'get',
  })
}
  export default {
    name: 'DoubleLine',
    data(){
      return{
        requests: null,
        user: "ayuda@unal.edu.co"
      }
    },
    mounted(){
      console.log('Hola mounted');
      this.getRequest();
    },
    methods:{
      getRequest(){
        console.log('metodo get request');
        return getProfileData().then(response =>{
          console.log(response);
          this.requests=response.data
        }).catch(e => console.log(e))
      }
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
