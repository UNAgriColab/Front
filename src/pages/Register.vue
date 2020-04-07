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
                      v-model="user.edad"
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
            <button type="submit" class="pure-button pure-button-primary">
              Logearse
            </button>
            <p v-if="submitData">{{ submitData | json }}</p>
          </fieldset>
        </form>
      </md-card>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      user: {
        email: null,
        username: null,
        password: null
      },
      submitData: null
    };
  },
  methods: {
    doRegister: function() {
      this.submitData = this.user;
    }
  }
};
</script>
