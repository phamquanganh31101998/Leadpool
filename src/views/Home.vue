<template>
  <v-app>
    <navBar />
    <router-view />
    <alert/>
    <v-dialog
        v-model="expiredDialog"
        max-width="290"
        persistent
        >
        <v-card>
            <v-card-title class="headline" style="backgroundColor: #E53935">
                <p class="title" style="color: white;">Hết phiên đăng nhập</p>
            </v-card-title>
            <v-card-text>
                <br>
                <p class="subtitle-1" style="color: black;">Phiên đăng nhập của bạn đã hết hạn. Hãy đăng nhập lại </p>
            </v-card-text>
            <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn
        color="red"
        text
        @click="$store.state.expiredDialog = false, logout()"
      >
        OK
      </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import moment from 'moment'
import alert from '@/components/alert'
  //import HelloWorld from '../components/HelloWorld'
  import navBar from '../components/nav/nav'
  import {mapGetters} from 'vuex'
  import numberFormat from '../helpers/numberformat'
  export default {
    components: {
      navBar, alert
    },
    data(){
      return {
        currentUser: null
      }
    },
    methods: {
      logout(){
        this.expiredDialog = false;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.$router.replace('/login');
      },
      getCurrentUser(){
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        let exp = this.currentUser.exp;
        let expiredTime = moment.unix(exp);
        let currentTime = moment();
        if (currentTime.isAfter(expiredTime)){
          this.$store.state.expiredDialog = true;
        }
      }
    },
    computed: {
      ...mapGetters({
              expiredDialog: 'expiredDialog'
              // ...
      	})
    },
    created(){
      this.getCurrentUser()
    }
  }
</script>
<style scoped>
  .gjs-resizer-c {
    display: none;
  }
</style>
