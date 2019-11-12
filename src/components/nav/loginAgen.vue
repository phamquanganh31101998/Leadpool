<template>
  <div>
    <template v-if="$vuetify.breakpoint.smAndUp">
      <!-- <v-btn icon >
        <v-icon>search</v-icon>
      </v-btn> -->
      <v-btn icon @click="goToSettingsPage()" style="height: 28px; margin-bottom: 10px;">
        <v-icon>build</v-icon>
      </v-btn>
      <!-- <v-btn icon>
        <v-icon>notification_important</v-icon>
      </v-btn> -->
    </template>
  </div>
</template>
<script>
  export default {
    name: 'loginAgen',
    data(){
      return {
        currentUser: null
      }
      
    },
    methods: {
      goToSettingsPage(){
        let link = `/settings/${this.currentUser.accountId}/userandteam`;
        this.$router.push(link);
      },
      getCurrentUser(){
        this.currentUser = JSON.parse(localStorage.getItem('user'));
      },
    },
    created(){
      this.getCurrentUser();
    }
  }

</script>