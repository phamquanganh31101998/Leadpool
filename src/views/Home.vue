<template>
  <v-app>
    <navBar />
    <router-view />
  </v-app>
</template>

<script>
  //import HelloWorld from '../components/HelloWorld'
  import navBar from '../components/nav/nav'
  export default {
    components: {
      navBar
    }
  }
</script>
