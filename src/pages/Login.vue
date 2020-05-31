<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h5 class="title text-center">Ingresa tus datos</h5>
          </md-card-header>

          <md-card-content>
            <form
              class="pure-form pure-form-stacked"
              v-on:submit.prevent="saveLogin"
              id="form"
            >
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label for="username">Email</label>
                  <md-icon>mail_outline</md-icon>
                  <md-input
                    id="username"
                    v-model="user.email"
                    type="text"
                    placeholder="Email"
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
                    v-on:click="saveLogin"
                    type="submit"
                    class="md-raised md-success"
                  >
                    Ingresar
                  </md-button>
                </div>
            </form>
          </md-card-content>
        </md-card>

        <div class="md-layout">
          <div class="md-layout-item md-size-50 text-left">
            <router-link to="/register" class="text-white">
              <small style="font-weight: initial">
                ¿Olvidaste tu contraseña?
              </small>
            </router-link>
          </div>

          <div class="md-layout-item md-size-50 text-right">
            <router-link to="/register" class="text-white">
              <small style="font-weight: initial">
                Crea una nueva cuenta
              </small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import http from "../http-common";
import router  from "../routes/routes.js";
export default {
  name: "login",
  data: function() {
    return {
      user: {
        email: "",
        password: "",
        token: ""
      },
      submitData: false
    };
  },
  methods: {
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
              router.push({ name: 'Dashboard'})
              //this.$router.push('/');
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
