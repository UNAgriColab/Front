<template>
  <ul class="nav nav-mobile-menu">
    <li>
      <drop-down>
        <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
          <i class="material-icons">notifications</i>
          <span class="notification">5</span>
          <p>Notificaciones</p>
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
          <li><a href="#">Nuevo estado de tu compra</a></li>
          <li><a href="#">Nueva venta realizada</a></li>
          <li><a href="#">Producto en camino</a></li>
          <li><a href="#">Orden entregada</a></li>
          <li><a href="#">Te han hecho una pregunta</a></li>
        </ul>
      </drop-down>
    </li>
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
