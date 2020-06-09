<template>
  <footer class="footer">
    <md-toolbar md-elevation="0" class="md-transparent">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-list>
            <md-list-item href="#/user">
              <p class="text-footer">
                <i class="material-icons">eco</i>
                Acerca de
              </p>
            </md-list-item>
          </md-list>
        </div>
        <div class="md-toolbar-section-end">
          <md-list>
            <md-list-item href="#/login">
              <p class="text-footer">
                <i class="material-icons">copyright</i>
                {{ new Date().getFullYear() }} AgriColab
              </p>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </md-toolbar>
  </footer>
</template>
<script>
export default {};
</script>
<style>
.text-footer {
  color: #1b5e20;
  text-shadow: 1px 1px #ffffff;
}
</style>
