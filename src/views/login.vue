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
                                        <v-layout row wrap>
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                <v-text-field label="Nhập email" v-model="userName"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                <v-text-field label="Nhập mật khẩu" type="password" v-model="password" @keyup.enter="loginWithPass()"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                <a @click.stop="forgotPassword.dialog = true">Quên mật khẩu?</a>
                                                <v-dialog v-model="forgotPassword.dialog" width="30%" persistent>
                                                    <v-card>
                                                        <v-card-title style="background-color:#1E88E5;color:#fff">
                                                            <span class="headline">Quên mật khẩu</span>
                                                        </v-card-title>
                                                        <v-card-text>
                                                            <span class="mt-4"><strong>Nhập email để nhận mã xác nhận yêu cầu đặt lại mật khẩu </strong></span>
                                                            <v-form v-model="forgotPassword.valid">
                                                                <span class="ml-4">
                                                                    <v-text-field :rules="emailRules" v-model="forgotPassword.email"></v-text-field>
                                                                </span>
                                                            </v-form>
                                                        </v-card-text>
                                                        <v-divider :divider="divider"></v-divider>
                                                        <v-card-actions>
                                                            <v-btn flat color="primary" @click="requestForgotPassword(forgotPassword.email)" :disabled="!forgotPassword.valid">Nhận mã xác nhận</v-btn>
                                                            <v-btn flat color="red" @click="forgotPassword.dialog = false">Đóng</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                <v-btn block color="primary" @click="loginWithPass()">Đăng nhập</v-btn>
                                            </v-flex>
                                        </v-layout>
                                        <v-btn color="error" block @click="login">Đăng nhập với google</v-btn>
                                    </v-card-text>
                                </v-card>
                           </v-flex>
                       </v-layout>
                   </v-flex>
               </v-layout>
            </v-container>
        </v-content>
        <alert/>
    </v-app>
</template>
<script>
const qs = require('qs');
import alert from '@/components/alert'
import moment from 'moment'
import { responseService } from '../services/response.service'
import config from '../config'
import authAPI from '../services/auth.service'
export default {
    components: {
        alert
    },
    props: {
        token: {
            type: String, 
            default: "",
        },
    },
    data:() =>({
        emailRules: [
            v => !!v || 'Chưa nhập E-mail',
            v => /.+@.+/.test(v) || 'E-mail không đúng định dạng',
        ],
        userName: '',
        password: '',
        forgotPassword: {
            dialog: false,
            email: '',
            valid: false,
        }
    }),
    mounted:function(){
        if(this.token) this.handleSubmit()
        if(this.$store.state.user.token && this.$store.state.user.user){
            let idUser = JSON.parse(this.$store.state.user.user)
            this.$router.push(`/contacts/${idUser.accountId}`)
        }
    },
    computed:{
        ssoUrl () { return `${config.ssoUrl}login` },
        authUrl(){ return `${config.authUrl}login`}
    },
    methods:{
        requestForgotPassword(email){
            authAPI.requestForgotPassword(email).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                this.forgotPassword.dialog = false;
            }).catch(error => {
                console.log(error);
            })
        },
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        loginWithPass(){
            let body = {
                userName: this.userName,
                password: this.password
            }
            authAPI.loginWithPass(body).then(result => {
                // console.log(result)
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let token = {
                        token: result.response
                    }
                    let _qs = qs.stringify(token);
                    let link = `${config.baseUrl}login?${_qs}`
                    window.location.href = link;
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
            }).catch(error => {
                console.log(error)
            })

        },
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