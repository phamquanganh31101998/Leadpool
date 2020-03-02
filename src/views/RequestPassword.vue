<template>
    <v-app id="inspire">
        <v-content class="login-custom app" v-if="$vuetify.breakpoint.mdAndUp">
            <!-- fluid grid-list-sm pa-0 fill-height style="background-image: url('../assets/resetPassword.jpg') center center/cover no-repeat !important;" -->
            <v-container>
               <v-layout row wrap>
                   <v-flex d-flex md12 lg12 xl12>
                       <v-layout row wrap fill-height>
                           <v-flex style="padding-top: 180px" d-flex md4 lg4 xl4 offset-md8 offset-lg8 offset-xl8 tile color="white" align-center>
                                <v-card flat>
                                    <v-card-title style="font-weight: bold; font-size: 35px;">
                                        Đặt lại mật khẩu
                                    </v-card-title>
                                    <v-card-text>
                                        <v-layout row wrap>
                                            <v-form v-model="valid" style="width: 100%">
                                                <v-flex md12 lg12 xl12>
                                                    <span><h3>Mật khẩu mới</h3></span>
                                                    <v-text-field  class="custom" :rules="passwordRules" type="password" v-model="password"></v-text-field>
                                                </v-flex>
                                                <v-flex md12 lg12 xl12 style="margin-top: 45px;">
                                                    <span><h3>Nhập lại mật khẩu mới</h3></span>
                                                    <v-text-field class="custom" :rules="passwordRules" v-model="retypePassword" type="password"></v-text-field>
                                                </v-flex>
                                            </v-form>
                                            <v-flex md12 lg12 xl12 class="mt-5" >
                                                <v-btn style="height: 50px; width: 100%; border-radius: 60px; " round dark block color="#292DA7" :disabled="!valid " @click="resetPassword(password)"><span style="font-weight: bold;">Đặt lại mật khẩu</span></v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                           </v-flex>
                       </v-layout>
                   </v-flex>
               </v-layout>
            </v-container>
        </v-content>
        <v-content v-else class="login-custom appXs" style="width: 100%; background-color: white">
            <div style="width: 100%; background-color: white; margin: 0px;">
                <v-layout>
                    <v-img src="/logo_color-01.png" alt=""></v-img>
                </v-layout>
            </div>
            <div style="width: 100%; background-color: white; margin: 0px;">
                <v-layout>
                    <v-img src="/Ellipse-1-copy-4.png" alt=""></v-img>
                </v-layout>
            </div>
            <div>
                <v-layout row wrap>
                   <v-flex d-flex xs12 sm12>
                       <v-layout row wrap fill-height>
                           <v-flex d-flex xs12 sm12 tile color="white" align-center>
                                <v-card flat>
                                    <v-card-title style="font-weight: bold; font-size: 35px;">
                                        Đặt lại mật khẩu
                                    </v-card-title>
                                    <v-card-text>
                                        <v-layout row wrap>
                                            <v-form v-model="valid" style="width: 100%">
                                                <v-flex xs12 sm12>
                                                    <span><h3>Mật khẩu mới</h3></span>
                                                    <v-text-field  class="custom" :rules="passwordRules" type="password" v-model="password"></v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm12 style="margin-top: 45px;">
                                                    <span><h3>Nhập lại mật khẩu mới</h3></span>
                                                    <v-text-field class="custom" :rules="passwordRules" v-model="retypePassword" type="password"></v-text-field>
                                                </v-flex>
                                            </v-form>
                                            <v-flex xs12 sm12 class="mt-5" >
                                                <v-btn style="height: 50px; width: 100%; border-radius: 60px; " round dark block color="#292DA7" :disabled="!valid " @click="resetPassword(password)"><span style="font-weight: bold;">Đặt lại mật khẩu</span></v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                           </v-flex>
                       </v-layout>
                   </v-flex>
               </v-layout>
            </div>
            <!-- <v-container>
               
            </v-container> -->
        </v-content>
        <alert/>
    </v-app>
</template>
<script>
import config from '../config'
import alert from '@/components/alert'
import moment from 'moment'
import userAPI from '../services/user.service'
export default {
    components: {
        alert
    },
    props: {
        email: {
            type: String,
            default: null
        },
        code: {
            type: String,
            default: null
        },
    },
    data(){
        return {
            error: false,
            password: '',
            retypePassword: '',
            valid: false,
            passwordRules: [
                v => !!v || 'Không được để trống',
                v => (v == this.password) || 'Mật khẩu nhập lại không khớp'
            ],
        }
    },
    methods: {
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        resetPassword(password){
            let body = {
                email: this.email,
                code: this.code,
                newPassword: password
            }
            console.log(body)
            userAPI.resetPassword(body).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                    // let token = {
                    //     token: result.response
                    // }
                    // let _qs = qs.stringify(token);
                    setTimeout(() => {
                        let link = `${config.baseUrl}login`
                        window.location.href = link;
                    }, 4000)
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
            })
        }
    },
    mounted:function(){
        
    },
}
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Be+Vietnam&display=swap');
    .app {
        font-family: 'Be Vietnam', sans-serif !important;
        background-color: #FFFFFF;
        background-image: url('../assets/resetPassword1440.jpg');
        background-size: cover;
        /* background-repeat: repeat-y; */
        width: 100%;
        height: 100%;
    }
    .appXs {
        font-family: 'Be Vietnam', sans-serif !important;
        width: 100%;
        height: 100%;
    }
    .custom {
        margin-left: 2%;
        margin-right: 2%;
        width: 95%;
        padding: 5px 20px;
        height: 38px;
        background-color: #f3f3f3;
    }
    .custom.v-text-field>.v-input__control>.v-input__slot:before {
        border-style: none;
    }
    .custom.v-text-field>.v-input__control>.v-input__slot:after {
        border-style: none;
    }
</style>