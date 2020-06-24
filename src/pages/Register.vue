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
                    required
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
                    required
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
                    required
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
                    required
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
        <md-progress-spinner
          md-mode="indeterminate"
          v-if="this.requestTime"
        ></md-progress-spinner>
        <md-dialog-alert
          :md-active.sync="confirmation"
          md-title="Usuario Registrado con exito!"
          md-content="El <strong>usuario</strong> ha sido registrado con éxito.."
          md-confirm-text="ok!"
        />
        <md-dialog-alert
          :md-active.sync="conflictReq"
          md-title="Conflicto en el Registro "
          md-content="  Usuario invalido o duplicado. "
          md-confirm-text="ok!"
        />
        <md-dialog-alert
          :md-active.sync="errorReq"
          md-title="Error HTTP"
          md-content=" se presento un error en la petición Http  ."
          md-confirm-text="ok!"
        />
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
      confirmation: false,
      conflictReq: false,
      errorReq: false,
      requestTime: false
    };
  },
  methods: {
    /* eslint-disable no-console */
    saveCustomer() {
      this.requestTime = true;
      console.log("Boton pulsado");
      const data = {
        name: this.user.username,
        email: this.user.email,
        age: this.user.age,
        password: this.user.password
      };
      http
        .post("/user", data)
        .then(response => {
          console.log(response.data);
          if (JSON.stringify(response.data) === "true") {
            this.confirmation = JSON.stringify(response.data);
            this.loginIn();
          } else {
            this.conflictReq = true;
            this.requestTime = false;
          }
        })
        .catch(e => {
          this.errorReq = true;
          console.log("error:" + e);
        });
      this.submitted = true;
    },
    loginIn: function() {
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
            this.requestTime = false;
            this.$router.push("/dashboard");
          }
        })
        .catch(e => {
          console.log(e);
          this.errorReq = true;
          this.requestTime = true;
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
