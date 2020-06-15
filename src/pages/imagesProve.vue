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

export default {
  name: "add-offer",
  data: function() {
    return {
      file: ""
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  },
  computed: {}
};
</script>

<style></style>
