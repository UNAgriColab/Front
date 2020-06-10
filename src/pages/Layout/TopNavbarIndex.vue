<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <img :src="logo" alt="Agricolab" />
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <md-list>
            <md-list-item href="#/login">
              <md-button
                to="/indexBuyer"
                class="md-button md-list-action md-success"
                style="margin-left: 10px; margin-right: 10px; margin-top: 10px"
              >
                <md-icon class="md-primary">shopping_cart</md-icon>
                Compra
              </md-button>
            </md-list-item>
            <md-list-item href="#/register">
              <md-button
                to="/indexSeller"
                class="md-button md-list-action md-success"
                style="margin-left: 10px; margin-top: 10px"
              >
                <md-icon>store</md-icon>
                Vende
              </md-button>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  props: {
    logo: {
      default: require("@/assets/img/logo/logo2.png")
    }
  },
  data() {},
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    }
  }
};
</script>

<style lang="css"></style>
