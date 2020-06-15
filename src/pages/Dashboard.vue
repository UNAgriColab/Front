<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Califica tu compra</md-dialog-title>

      <div class="separator">
        <md-avatar
          class="md-avatar-icon md-large md-default"
          style="margin-left: 10px"
        >
          <md-icon> star</md-icon>
        </md-avatar>
        &nbsp;
        <md-avatar class="md-avatar-icon md-large md-default">
          <md-icon> star</md-icon>
        </md-avatar>
        &nbsp;
        <md-avatar class="md-avatar-icon md-large md-default">
          <md-icon> star</md-icon>
        </md-avatar>
        &nbsp;
        <md-avatar class="md-avatar-icon md-large md-default">
          <md-icon> star</md-icon>
        </md-avatar>
        &nbsp;
        <md-avatar
          class="md-avatar-icon md-large md-default"
          style="margin-right: 10px"
        >
          <md-icon> star</md-icon>
        </md-avatar>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">
          Close
        </md-button>
        <md-button class="md-primary" @click="showDialog = false">
          Save
        </md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-button class="md-primary md-raised" @click="showDialog = true">
      CALIFICACIÓN
    </md-button>
  </div>
</template>

<script>
export default {
  name: "DialogCustom",
  data: () => ({
    showDialog: false
  })
};
</script>

<style>
a:hover {
}
</style>
