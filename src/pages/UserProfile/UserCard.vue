<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">Vendedor / Mercaprospero</h6>
      <h4 class="card-title">{{ user.name }}</h4>
      <h4 class="card-title">{{ user.email }}</h4>
      <h5>{{ user.age }} años</h5>
      <p class="card-description">
        Distribuidor minorista de vegetales y frutas a través del minimercado
        "Mercaprospero"
      </p>
      <div>
        <h2>
          Calificación promedio {{ user.qualification.toFixed() }} con
          {{ user.numberOfReviews }} reseñas
        </h2>
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
import axios from "axios";

export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/marc.jpg")
    }
  },
  data() {
    return {
      user: []
    };
  },
  mounted() {
    this.storage();
    this.getUser();
  },
  methods: {
    storage() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.tokenHeader = "Bearer " + this.token;
        this.emailAdress = this.aux.email;
      }
    },
    getUser: function() {
      axios
        .get("http://localhost:8080/api/v1/user/" + this.emailAdress, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          this.user = response.data;
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
<style></style>
