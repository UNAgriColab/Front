<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Hola, {{ user.name }}</h4>
        <p class="category">Actualiza tu dirección y teléfono</p>
      </md-card-header>

      <md-card-content>
        <h3>Datos de envío y de contacto</h3>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Teléfono</label>
              <md-input v-model="phone"></md-input>
              <md-icon>call</md-icon>
            </md-field>
            <md-field>
              <label>departamento</label>
              <md-select
                v-model="places.department"
                name="departamentos"
                id="dep"
                @md-selected="resetProductDropdown"
                md-dense
              >
                <div class="md">
                  <md-option
                    v-for="(data, index) in places.myJson"
                    v-bind:key="index"
                    v-bind:value="data.departamento"
                  >
                    {{ data.departamento }}
                  </md-option>
                </div>
              </md-select>
              <md-icon>location_city</md-icon>
            </md-field>
            <md-field>
              <label>ciudad</label>
              <md-select
                v-model="places.city"
                name="ciudades"
                id="ciudades"
                md-dense
              >
                <md-option
                  v-for="(option, index2) in setOptions"
                  v-bind:key="index2"
                  v-bind:value="option"
                >
                  {{ option }}
                </md-option>
              </md-select>
              <md-icon>apartment</md-icon>
            </md-field>
            <md-field maxlength="1">
              <label>Barrio o vereda</label>
              <md-input v-model="places.neighbourhood"></md-input>
              <md-icon>people_outline</md-icon>
            </md-field>
            <md-field maxlength="1">
              <label>Dirección</label>
              <md-input v-model="places.address"></md-input>
              <md-icon>house</md-icon>
            </md-field>
            <md-field maxlength="1">
              <label>Detalles adicionales</label>
              <md-input v-model="places.details"></md-input>
              <md-icon>all_inclusive</md-icon>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>Acerca de mi</label>
              <md-textarea v-model="aboutme"></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" v-on:click="updateMailing">
              Actualizar perfil
            </md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import http from "../../http-common";
import json from "../../jsons/colombia";

export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      user: [],
      phone: "",
      aboutme: "",
      tokenHeader: "",
      counter: 0,
      places: {
        myJson: json,
        city: "",
        department: "",
        address: "",
        details: "",
        neighbourhood: ""
      },
      errorReq: ""
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
      console.log(`Bearer ${this.token}`);
      http
        .get("/user/" + this.emailAdress, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          this.user = response.data;
          this.phone = response.data.phoneNumber;
          this.places.city = response.data.mailing.city;
          this.places.department = response.data.mailing.department;
          this.places.address = response.data.mailing.address;
          this.places.details = response.data.mailing.details;
          this.places.neighbourhood = response.data.mailing.neighbourhood;
          console.log(this.user);
        })
        .catch(e => {
          console.log(e);
          this.errorReq = e;
          this.notifyVue("danger");
        });
    },
    updateMailing: function() {
      const mailing = {
        city: this.places.city,
        department: this.places.department,
        address: this.places.address,
        details: this.places.details,
        neighbourhood: this.places.neighbourhood
      };
      http
        .put("/user/address/" + this.emailAdress + "/" + this.phone, mailing, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          console.log(response.data);
          if (JSON.stringify(response.data) === "true") {
            this.notifyVue("success");
          }
          if (JSON.stringify(response.data) === "false") {
            this.notifyVue("warning");
          }
        })
        .catch(e => {
          console.log(e);
          this.errorReq = e;
          this.notifyVue("danger");
        });
    },
    notifyVue(AlertType) {
      if (AlertType === "success") {
        this.$notify({
          message:
            "El perfil : <b>" +
            this.emailAdress +
            "</b> ha sido actualizado con éxito.",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: AlertType
        });
      }
      if (AlertType === "warning") {
        this.$notify({
          message:
            "El perfil : " +
            this.emailAdress +
            " <b>no</b> ha sido actualizado.",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: AlertType
        });
      }
      if (AlertType === "danger") {
        this.$notify({
          message: "Ha ocurrido un error" + this.errorReq + ".",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: AlertType
        });
      }
    },
    resetProductDropdown: function() {
      if (this.counter !== 0) {
        this.places.city = "";
      } else {
        this.counter = 1;
      }
    }
  },
  computed: {
    setOptions: function() {
      let ciudades;
      let options = this.places.myJson;
      for (let i = 0; i < 31; i++) {
        if (this.places.department === options[i]["departamento"]) {
          ciudades = options[i]["ciudades"];
        }
      }
      return ciudades;
    }
  }
};
</script>
<style></style>
