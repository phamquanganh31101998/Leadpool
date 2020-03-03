<template>
    <v-app id="inspire">
        <v-content class="login-custom app" v-if="$vuetify.breakpoint.mdAndUp" >
            <!-- fluid grid-list-sm pa-0 fill-height style="background-image: url('../assets/login-bg.jpg') center center/cover no-repeat !important;" -->
            <v-container fluid>
               <v-layout row wrap>
                   <v-flex d-flex xs12>
                       <v-layout row wrap fill-height>
                           <v-flex xs5 lg5 md5 xl5 offset-xs3 style="text-align: center" v-if="page == 'forgotPassword'">
                               <v-card class="text-xs-center transparent" flat style="margin-top: 15%; margin-right: 10%; margin-left: 30%;">
                                    <v-card-title style="color: #2F318E; display: inline-block;">
                                        <h1 class="no-transparent">Quên mật khẩu</h1>
                                    </v-card-title>
                                    <v-card-text>
                                        <span class="mt-4" style="color: #000"><strong>Nhập email tại đây. Chúng tôi sẽ gửi mã xác nhận yêu cầu đặt lại mật khẩu ngay</strong></span>
                                        <v-form v-model="forgotPassword.valid">
                                            <span class="ml-4">
                                                <v-text-field title="Nhập email" :rules="emailRules" v-model="forgotPassword.email"></v-text-field>
                                            </span>
                                        </v-form>
                                    </v-card-text>
                                    <!-- <v-divider :divider="divider"></v-divider> -->
                                    <v-card-actions>
                                        <v-btn dark block style="height: 50px; margin-left: 5%; margin-right: 5%; border-radius: 60px;" color="#2F318E" @click="requestForgotPassword(forgotPassword.email)" :disabled="!forgotPassword.valid">Nhận mã xác nhận</v-btn><br>
                                        <br>
                                        
                                        <!-- <v-btn flat color="red" @click="forgotPassword.dialog = false">Đóng</v-btn> -->
                                    </v-card-actions>
                                    <v-card-actions>
                                        <v-btn dark block style="color: #5661CE; height: 50px; margin-left: 5%; margin-right: 5%; border-radius: 60px;" color="#C9E2FF" @click="page = 'login'">Về trang đăng nhập</v-btn>
                                    </v-card-actions>
                                </v-card>
                           </v-flex>
                           <v-flex d-flex xs3 lg3 md3 xl3 offset-xs4 style="text-align: center" v-if="page == 'login'">
                                <v-card flat img="/phone.png" style="height: 703px; " >
                                    <v-card-title style="margin-top: 150px; margin-left: 40px; color: white;">
                                        <h1>Đăng nhập</h1>
                                    </v-card-title>
                                    <v-card-text style="margin-top: 30px;" class="text-xs-center">
                                        <v-layout row wrap>
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                <v-text-field class="custom" dark :rules="textRules" label="Nhập email" v-model="userName"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                <v-text-field class="custom" dark :rules="textRules" label="Nhập mật khẩu" type="password" v-model="password" @keyup.enter="loginWithPass()"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                
                                            </v-flex>
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                <v-btn color="#2F318E" dark style="height: 50px; margin-left: 5%; margin-right: 5%; width: 75%; border-radius: 60px;" @click="loginWithPass()"><span style="font-weight: bold;">Đăng nhập</span></v-btn><br>
                                                <a @click.stop="page = 'forgotPassword'" style="color: white; margin-left: 40%;">Quên mật khẩu?</a>
                                                <v-btn color="#C9E2FF" dark style="color: #5661CE; height: 50px; margin-left: 5%; margin-right: 5%; width: 75%; border-radius: 60px;" @click="login"><span style="font-weight: bold;">Đăng nhập với Google</span></v-btn>
                                            </v-flex>
                                        </v-layout>
                                        
                                    </v-card-text>
                                </v-card>
                           </v-flex>
                           <v-flex xs5 lg5 md5 xl5 offset-xs3 style="text-align: center" v-if="page == 'linkWasSent'">
                               <v-card class="text-xs-center transparent" flat style="margin-top: 15%; margin-right: 10%; margin-left: 30%;">
                                    <v-card-title style="color: #2F318E; display: inline-block;">
                                        <h1 class="no-transparent">Đã gửi link xác nhận</h1>
                                    </v-card-title>
                                    <v-card-text>
                                        <span class="mt-4" style="color: #000"><strong>Hãy kiểm tra hòm thư của bạn, click vào link xác nhận đặt lại mật khẩu của chúng tôi</strong></span>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn dark block style="color: #5661CE; height: 50px; margin-left: 5%; margin-right: 5%; border-radius: 60px;" color="#C9E2FF" @click="page = 'login'">Về trang đăng nhập</v-btn>
                                    </v-card-actions>
                                </v-card>
                           </v-flex>
                       </v-layout>
                   </v-flex>
               </v-layout>
            </v-container>
        </v-content>
        <v-content class="appXs login-custom" v-else style="width: 100%; background-color: white">
            <div style="width: 100%; background-color: white; margin: 0px;">
                <v-layout>
                    <v-img src="/logo_color-01.png" alt=""></v-img>
                </v-layout>
            </div>
            <div style="width: 100%; height: 100%; background-color: #7DB4F5; border-top-right-radius: 20px;">
                <v-layout d-flex row wrap>
                    <v-flex d-flex xs12>
                       <v-layout row wrap fill-height>
                           <v-flex xs10 offset-xs1 style="text-align: center" v-if="page == 'forgotPassword'">
                               <v-card class="text-xs-center" style="background-color: #7DB4F5" flat>
                                   <v-card-title>
                                        <v-img src="/Layer 1.png" alt=""></v-img>
                                    </v-card-title>
                                    <v-card-title style="display: inline-block;">
                                        <h1 class="no-transparent" style="color: white">Quên mật khẩu</h1>
                                    </v-card-title>
                                    <v-card-text>
                                        <span class="mt-4" style="color: #fff"><strong>Nhập email tại đây. Chúng tôi sẽ gửi mã xác nhận yêu cầu đặt lại mật khẩu ngay</strong></span>
                                        <v-form v-model="forgotPassword.valid">
                                            <span class="ml-4">
                                                <v-text-field placeholder="Nhập email" dark title="Nhập email" :rules="emailRules" v-model="forgotPassword.email"></v-text-field>
                                            </span>
                                        </v-form>
                                    </v-card-text>
                                    <!-- <v-divider :divider="divider"></v-divider> -->
                                    <v-card-actions>
                                        <v-btn dark block style="height: 50px; margin-left: 5%; margin-right: 5%; border-radius: 60px;" color="#2F318E" @click="requestForgotPassword(forgotPassword.email)" :disabled="!forgotPassword.valid">Nhận mã xác nhận</v-btn><br>
                                        <br>
                                    </v-card-actions>
                                    <v-card-actions>
                                        <v-btn dark block style="color: #5661CE; height: 50px; margin-left: 5%; margin-right: 5%; border-radius: 60px;" color="#C9E2FF" @click="page = 'login'">Về trang đăng nhập</v-btn>
                                    </v-card-actions>
                                </v-card>
                           </v-flex>
                           <v-flex d-flex xs10 offset-xs1 v-if="page == 'login'">
                                <v-card flat style="background-color: #7DB4F5" >
                                    <v-card-title>
                                        <v-img src="/Layer-2.png" alt=""></v-img>
                                    </v-card-title>
                                    <v-card-title style="color: white;">
                                        <h1>Đăng nhập</h1>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-layout row wrap>
                                            <v-flex xs12 sm12 >
                                                <v-text-field class="customXs" dark :rules="textRules" label="Nhập email" v-model="userName"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm12 >
                                                <v-text-field class="customXs" dark :rules="textRules" label="Nhập mật khẩu" type="password" v-model="password" @keyup.enter="loginWithPass()"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm12 >
                                                <v-btn color="#2F318E" dark style="height: 50px; width: 100%; border-radius: 60px;" @click="loginWithPass()"><span style="font-weight: bold;">Đăng nhập</span></v-btn><br>
                                                <a @click.stop="page = 'forgotPassword'" style="color: white; margin-left: 40%;">Quên mật khẩu?</a>
                                                <v-btn color="#C9E2FF" dark style="color: #5661CE; height: 50px; width: 100%; border-radius: 60px;" @click="login"><span style="font-weight: bold;">Đăng nhập với Google</span></v-btn>
                                            </v-flex>
                                        </v-layout>
                                        
                                    </v-card-text>
                                </v-card>
                           </v-flex>
                           <v-flex xs10 sm10 offset-xs1 style="text-align: center" v-if="page == 'linkWasSent'">
                               <v-card class="text-xs-center" flat style="background-color: #7DB4F5" >
                                   <v-card-title>
                                        <v-img src="/Layer-2.png" alt=""></v-img>
                                    </v-card-title>
                                    <v-card-title style="color: #2F318E; display: inline-block;">
                                        <h1 class="no-transparent" style="color: white;">Gửi link xác nhận thành công</h1>
                                    </v-card-title>
                                    <v-card-text>
                                        <span class="mt-4" style="color: white;"><strong>Hãy kiểm tra link xác nhận đặt lại mật khẩu vừa được gửi tới hòm thư của bạn</strong></span>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn dark block style="color: #5661CE; height: 50px; margin-left: 5%; margin-right: 5%; border-radius: 60px;" color="#C9E2FF" @click="page = 'login'">Về trang đăng nhập</v-btn>
                                    </v-card-actions>
                                </v-card>
                           </v-flex>
                       </v-layout>
                   </v-flex>
                </v-layout>
            </div>
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
        page: 'login',
        emailRules: [
            v => !!v || 'Chưa nhập E-mail',
            v => /.+@.+/.test(v) || 'E-mail không đúng định dạng',
        ],
        textRules: [
            v => !!v || 'Không được để trống',
        ],
        userName: '',
        password: '',
        forgotPassword: {
            dialog: false,
            email: '',
            valid: false,
        },
        divider: true
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
                    this.page = 'linkWasSent'
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
<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Be+Vietnam&display=swap');
    * {
        font-family: 'Be Vietnam', sans-serif !important;
        box-sizing: border-box;
    }
    .custom {
        margin-bottom: 15%;
        margin-left: 10%;
        width: 80%;
        padding: 0px 20px;
        height: 38px;
        border-radius: 5px;
        background-color: #7DB4F5;
    }

    .customXs {
        margin-bottom: 15%;
        height: 38px;
        border-radius: 5px;
        background-color: #7DB4F5;
    }

    .app {
        background: url('/layer3.jpg') no-repeat center center fixed; 
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    .transparent {
        background-color: #CAE1FF !important;
        border-color: transparent!important;
    }

    .no-transparent {
        opacity: 1;
    }

    .appXs {
        background-color: #7DB4F5;
    }
</style>