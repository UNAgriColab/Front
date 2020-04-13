<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h5 class="title text-center">Registra tus datos</h5>
          </md-card-header>

          <md-card-content>
            <form
              class="pure-form pure-form-stacked"
              v-on:submit.prevent="doLogin"
              id="form"
            >
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label for="username">Nombre</label>
                  <md-icon>portrait</md-icon>
                  <md-input
                    id="username"
                    v-model="user.username"
                    type="text"
                    placeholder="Nombre"
                  >
                  </md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label for="email">Correo</label>
                  <md-icon>mail_outline</md-icon>
                  <md-input
                    id="email"
                    v-model="user.email"
                    type="text"
                    placeholder="Correo electrónico"
                  >
                  </md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label for="age">Edad</label>
                  <md-icon>date_range</md-icon>
                  <md-input
                    id="age"
                    v-model="user.age"
                    type="number"
                    placeholder="Edad"
                  >
                  </md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label for="password">Contraseña</label>
                  <md-icon>lock_open</md-icon>
                  <md-input
                    id="password"
                    v-model="user.password"
                    type="password"
                    placeholder="Contraseña"
                  >
                  </md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 text-center">
                <md-button
                  v-on:click="saveCustomer"
                  type="submit"
                  class="md-raised md-success"
                >
                  Registro
                </md-button>
              </div>
            </form>
          </md-card-content>
        </md-card>

        <div class="md-layout-item md-size-100 text-right">
          <router-link to="/login" class="text-white">
            <small style="font-weight: initial">
              Ingresa a tu cuenta
            </small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import http from "../http-common";

export default {
  name: "add-customer",
  data: function() {
    return {
      user: {
        id: 0,
        username: "",
        email: "",
        age: "",
        password: "",
        active: false
      },
      submitted: false
    };
  },
  methods: {
    /* eslint-disable no-console */
    saveCustomer() {
      console.log("Boton pulsado");
      const data = {
        name: this.user.username,
        email: this.user.email,
        age: this.user.age,
        password: this.user.password
      };

      http
        .post("/v1/user", data)
        .then(response => {
          console.log("se espera respuesta");
          this.customer.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

      this.submitted = true;
    },
    newCustomer() {
      this.submitted = false;
      this.customer = {};
    }
    /* eslint-enable no-console */
  }
};
</script>
