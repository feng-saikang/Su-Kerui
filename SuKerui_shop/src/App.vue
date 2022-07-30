<template>
  <div id="app">
    <nav>
      <nav-bar />
    </nav>
    <right-nav></right-nav>
    <router-view/>
    <FooterNav></FooterNav>

  </div>
</template>

<script>
import FooterNav from './components/common/FooterNav.vue';

export default {
    components: { FooterNav }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

nav {

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
