<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <label>
          File
          <input
            type="file"
            id="file"
            ref="file"
            v-on:change="handleFileUpload()"
          />
        </label>
        <button v-on:click="submitFile()">Submit</button>
        <img
          src="https://storage.googleapis.com/agricolab-un.appspot.com/photos/1/burguer2.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import http from "../http-common";
import json from "../jsons/productos.json";
import axios from "axios";

export default {
  name: "add-offer",
  data: function() {
    return {
      file: ""
    };
  },
  mounted() {
    console.log("Hola mounted");
    this.storage();
  },
  methods: {
    storage() {
      if (localStorage.getItem("userSession")) {
        this.aux = JSON.parse(localStorage.getItem("userSession"));
        this.token = this.aux.token;
        this.tokenHeader = "Bearer " + this.token;
      }
    },
    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post("http://localhost:8080/api/v1/photo/upload/1", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  },
  computed: {}
};
</script>

<style></style>
