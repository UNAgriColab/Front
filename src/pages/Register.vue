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
              v-on:submit.prevent="saveCustomer"
              id="form"
            >
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label>Nombre</label>
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
                  <label>Correo</label>
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
                  <label>Edad</label>
                  <md-icon>date_range</md-icon>
                  <md-input
                    id="age"
                    v-model="user.age"
                    min="18"
                    type="number"
                    placeholder="Edad"
                  >
                  </md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label>Contraseña</label>
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
          <md-dialog-alert
            :md-active.sync="confirmation"
            md-title="Usuario Registrado!"
            md-content="El <strong>usuario</strong> ha sido registrado con éxito."
            md-confirm-text="ok!"
          />
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
      submitted: false,
      confirmation: false
    };
  },
  methods: {
    /* eslint-disable no-console */
    saveCustomer() {
      this.confirmation = true;
      console.log("Boton pulsado");
      const data = {
        name: this.user.username,
        email: this.user.email,
        age: this.user.age,
        password: this.user.password
      };
      http
        .post("https://agricolab-un.appspot.com/api/v1/user", data)
        .then(response => {
          console.log(response.data);
          if (JSON.stringify(response.data) === true) {

            saveLogin();
          }
        })
        .catch(e => {
          console.log(e);
        });

      this.submitted = true;
    },
    saveLogin: function() {
      const data = {
        email: this.user.email,
        password: this.user.password
      };
      http
              .post("/auth", data)
              .then(response => {
                this.user.token = response.data;
                this.user.password = "";
                localStorage.setItem("TokenSession", JSON.stringify(response.data));
                localStorage.setItem("userSession", JSON.stringify(this.user));
                console.log("log-in");

                if (localStorage.getItem("TokenSession")) {
                  //router.push({ name: 'Dashboard'}) /BuyerListAllOffers
                  this.$router.push("/BuyerListAllOffers");
                  //this.$router.push("/dashboard");
                }
              })
              .catch(e => {
                console.log(e);
              });
      /*localStorage.setItem("userSession", JSON.stringify(this.user));*/
    }
  }
};
</script>
<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>