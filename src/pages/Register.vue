<template>
  <div class="content">
    <div class="md-layout">
      <md-card>
        <md-card-header data-background-color="green">
          <h1 class="title">Registrarse</h1>
        </md-card-header>
        <form
          class="pure-form pure-form-stacked"
          v-on:submit.prevent="doLogin"
          id="form"
        >
          <fieldset>
            <h3>
              <label for="username">Username</label>
              <input
                id="username"
                v-model="user.username"
                type="text"
                placeholder="Username"
              />
            </h3>
            <h3>
              <label for="email">Correo</label>
              <input
                id="email"
                v-model="user.email"
                type="text"
                placeholder="email"
              />
            </h3>
            <h3>
              <label for="edad">Age</label>
              <input
                id="edad"
                v-model="user.age"
                type="text"
                placeholder="Age"
              />
            </h3>
            <h3>
              <label for="password">Password</label>
              <input
                id="password"
                v-model="user.password"
                type="password"
                placeholder="Password"
              />
            </h3>
            <button
              v-on:click="saveCustomer"
              class="pure-button pure-button-primary"
            >
              Logearse
            </button>
          </fieldset>
        </form>
      </md-card>
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
        name: "",
        email: "",
        age: 0,
        password: "",
        active: false
      },
      submitted: false
    };
  },
  methods: {
    /* eslint-disable no-console */
    saveCustomer() {
      const data = {
        name: this.user.username,
        email: this.user.email,
        age: this.user.age,
        password: this.user.password
      };

      http
        .post("/v1/user", data)
        .then(response => {
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
