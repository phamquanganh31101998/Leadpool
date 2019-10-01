<template>
    <v-app id="inspire">
        <v-content class="login-custom">
            <v-container fluid grid-list-sm pa-0 fill-height style="background-image: url('../assets/login-bg.jpg') center center/cover no-repeat !important;">
               <v-layout row wrap>
                   <v-flex d-flex xs12>
                       <v-layout row wrap justify-start fill-height>
                           <v-flex d-flex xs9 lg3 md5 tile class="elevation-9" color="white" align-center style="background-color:white">
                                <v-card flat>
                                    <v-card-text class="text-xs-center" >
                                        <img height="100" src="../assets/adstech-logo1.png" alt="avatar">
                                    </v-card-text>
                                    <v-card-text class="text-xs-center">
                                        <v-btn color="error" @click="login" round>Đăng nhập với google</v-btn>
                                    </v-card-text>
                                </v-card>
                           </v-flex>
                       </v-layout>
                   </v-flex>
               </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
import config from '../config'
export default {
    props: {
        token: {
            type: String, 
            default: "",
        },
    },
    data:() =>({

    }),
    mounted:function(){
      if(this.token) this.handleSubmit()
      if(this.$store.state.user.token && this.$store.state.user.user){
        let idUser = JSON.parse(this.$store.state.user.user)
        this.$router.push(`/acount/${idUser.accountId}`)
      }
    },
    computed:{
        ssoUrl () { return `${config.ssoUrl}login` },
    },
    methods:{
        login(){
            window.location.href = this.ssoUrl
        },
        handleSubmit(){
        const { dispatch } = this.$store;
        if (this.token) {
           dispatch('user/login', this.token)
        }
      }
    }
}
</script>