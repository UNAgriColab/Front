<template>
  <div class="content">
    <div>
      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Edita tu producto</h4>
          <p class="category">
            Información necesaria para la edición de una oferta ({{ offer.id }})
          </p>
        </md-card-header>

        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label for="user">Usuario</label><br />
                <md-input v-model="offer.userEmail" disabled></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <!-- Layout item list-->
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label for="productName">Tipo de producto</label>
                <md-select
                  v-model="offer.productName"
                  name="productName"
                  id="productName"
                  md-dense
                  disabled
                >
                  <md-optgroup label="Hortalizas">
                    <md-option value="ACELGA">ACELGA</md-option>
                    <md-option value="CEBOLLA CABEZONA BLANCA">
                      CEBOLLA CABEZONA BLANCA
                    </md-option>
                  </md-optgroup>

                  <md-optgroup label="Frutas">
                    <md-option value="AGUACATE HASS">AGUACATE HASS</md-option>
                    <md-option value="BANANO CRIOLLO">BANANO CRIOLLO</md-option>
                    <md-option value="CURUBA BOYACENCE">
                      CURUBA BOYACENCE
                    </md-option>
                    <md-option value="TOMATE DE ARBOL">
                      TOMATE DE ARBOL
                    </md-option>
                  </md-optgroup>

                  <md-optgroup label="Tuberculos">
                    <md-option value="PAPA CRIOLLA LAVADA">
                      PAPA CRIOLLA LAVADA
                    </md-option>
                    <md-option value="PAPA PASTUSA">PAPA PASTUSA</md-option>
                    <md-option value="PAPA R12 INDUSTRIAL">
                      PAPA R12 INDUSTRIAL
                    </md-option>
                  </md-optgroup>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <!-- Layout item -->
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <!-- label for="unit">Unidad</label -->
                <label for="presentation">Unidad</label>
                <md-select
                  v-model="offer.presentation"
                  name="presentation"
                  id="presentation"
                  md-dense
                  disabled
                >
                  <md-option value="1">Gramos</md-option>
                  <md-option value="2">Libras</md-option>
                  <md-option value="3">Kilogramos</md-option>
                  <md-option value="4">Arrobas</md-option>
                  <md-option value="5">Bultos(50 Kg)</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="minQuantity">Numero mínimo de unidades</label>
                <md-input
                  id="minQuantity"
                  v-model="offer.minQuantity"
                  min="1"
                  type="number"
                  placeholder="unidades"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Precio por unidad</label>
                <md-input
                  v-model="offer.pricePresentation"
                  type="number"
                  min="1"
                ></md-input>
                <md-icon>attach_money</md-icon>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100">
              <md-field maxlength="5">
                <label>Descripción</label>
                <md-textarea v-model="offer.description"></md-textarea>
                <md-icon>description</md-icon>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100 text-right">
              <md-button
                v-on:click="deleteOffer"
                class="md-raised md-danger"
                type="submit"
                style="margin-right: 10px"
              >
                <md-icon>delete</md-icon>
                Eliminar
              </md-button>
              <md-button
                v-on:click="updateOffer"
                class="md-raised md-success"
                type="submit"
              >
                <md-icon>create</md-icon>
                Editar
              </md-button>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
    <div>
      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Añade imágenes a tu producto</h4>
        </md-card-header>
        <md-card-content>
          <label>
            <input
              type="file"
              id="file"
              ref="file"
              v-on:change="handleFileUpload()"
            />
          </label>
          <div class="md-layout-item md-size-100 text-right">
            <md-button
              v-on:click="submitFile()"
              class="md-raised md-success"
              type="submit"
              style="margin-right: 10px"
            >
              Submit
            </md-button>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "offer",
  data() {
    return {
      offer: {
        userEmail: "",
        productName: "",
        presentation: "",
        minQuantity: 0,
        pricePresentation: 0,
        description: "",
        id: "",
        path: ""
      },
      errorReq: "",
      file: ""
    };
  },
  mounted() {
    this.storage();
    this.getOffer();
  },
  methods: {
    storage() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.offer.userEmail = this.aux.email;
      }
      if (localStorage.getItem("buyerOrderId")) {
        this.offer.path = localStorage.getItem("buyerOrderId");
      }
    },
    getOffer() {
      http
        .get("/offer/" + this.offer.path, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          this.offer.description = response.data.description;
          this.offer.id = response.data.id;
          this.offer.minQuantity = response.data.minQuantity;
          this.offer.presentation = response.data.presentation;
          this.offer.pricePresentation = response.data.pricePresentation;
          this.offer.productName = response.data.productName;
          this.offer.userEmail = response.data.userEmail;
        })
        .catch(e =>{
          this.errorReq = e;
          this.notifyVue("danger");
          console.log(e);
        });
    },
    updateOffer() {
      const data = {
        minQuantity: this.offer.minQuantity,
        pricePresentation: this.offer.pricePresentation,
        description: this.offer.description,
        id: this.offer.id
      };
      http
        .put("/offer/", data, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          console.log(response.data);
          if (JSON.stringify(response.data) === true) {
            this.notifyVue("success");
          }
          if (JSON.stringify(response.data) === false) {
            this.notifyVue("warning");
          }
        })
        .catch(e => {
          console.log(e);
          this.errorReq = e;
          this.notifyVue("danger");

        });
    },

    deleteOffer() {
      http
        .delete("/offer/del/" + this.offer.path, {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(response => {
          console.log(response.data);

          if (JSON.stringify(response.data) === true) {
            this.notifyVue("info");
          }
          if (JSON.stringify(response.data) === false) {
            this.notifyVue("warning");
          }
        })
        .catch(e => {
          console.log(e);
          this.errorReq = e;
          this.notifyVue("danger");
        });
      location.reload(true);
    },
    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      http
        .post("/photo/upload/" + this.offer.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.token}`
          },
          withCredentials: false
        })
        .then(function() {
          console.log("SUCCESS!!");
          if (JSON.stringify(response.data) === true) {
            this.notifyVue("success");
          }
          if (JSON.stringify(response.data) === false) {
            this.notifyVue("warning");
          }

        })
        .catch(e => {
          this.errorReq = e;
          this.notifyVue("danger");
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    notifyVue(AlertType) {
      if (AlertType === "success") {
        this.$notify({
          message:
                  "La oferta N° <b>" +
                  this.offer.id +
                  "</b> ha sido actualizada con éxito. ",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: AlertType
        });
      }
      if (AlertType === "warning") {
        this.$notify({
          message:
                  "La oferta N°" +
                  this.offer.id + +
                  " <b>no</b> ha sido actualizada.",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: AlertType
        });
      }
      if (AlertType === "info") {
        this.$notify({
          message: "La oferta ha sido Eliminada.",
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
    }
  }
};
</script>
