<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>
<script>
  export default {};
</script>
<style>

  {
    transition: opacity 0.1s
  ;
  }
  {
    opacity: 0
  ;
  }
</style>
