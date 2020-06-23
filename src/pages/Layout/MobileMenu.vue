<template>
  <ul class="nav nav-mobile-menu">
    <li>
      <a v-on:click="logout" href="#/login">
        <i class="material-icons">power_settings_new</i>
        <p>Logout</p>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      search: null,
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  },
  methods: {
    logout() {
      if (localStorage.getItem("TokenSession")) {
        localStorage.removeItem("TokenSession");
      }
      if (localStorage.getItem("userSession")) {
        localStorage.removeItem("userSession");
      }
    }
  }
};
</script>
