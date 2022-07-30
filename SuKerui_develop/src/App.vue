<template>
  <div id="app">
    <keep-alive include="ShopList"> 
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>