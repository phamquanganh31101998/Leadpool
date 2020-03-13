<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <!-- <h1>Đây là trang home - chưa có ý tưởng gì cả :(</h1> -->
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      currentUser: null
    }),
    methods: {
      getCurrentUser(){
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        let link = `/contacts/${this.currentUser.accountId}`
        this.$router.push(link);
      },
    },
    created(){
      this.getCurrentUser();
    }
  }
</script>

<style>

</style>
