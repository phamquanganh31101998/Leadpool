<template>
    <v-app>
        <v-content class="app" v-if="$vuetify.breakpoint.xsOnly" style="background-image: url('../../public/layer3.jpg') !important; padding: 8% 5% 10% 5% background-repeat: no-repeat; background-size: cover">
            <v-container>
                <v-layout row wrap>
                    <v-flex class="signupcard" xs10 sm10 md10 lg10 xl10>
                        <v-card flat >
                            <!-- <v-card-text class="text-xs-center" >
                                <img height="100" src="../assets/adstech-logo1.png" alt="avatar">
                            </v-card-text> -->
                            
                            <v-card-text class="text-xs-center content">
                                <v-layout row wrap>
                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                        <v-text-field readonly  label="Nhập email" v-model="email"></v-text-field>
                                    </v-flex>
                                    <v-form v-model="valid" style="width: 100%">
                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                            <v-text-field :rules="nameRules" label="Tên hiển thị" v-model="name"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                            <v-text-field :rules="passwordRules" label="Mật khẩu" type="password" v-model="password"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                            <v-text-field label="Nhập lại mật khẩu" v-model="retypePassword" :rules="passwordRules" type="password"></v-text-field>
                                        </v-flex>
                                    </v-form>
                                    <v-alert
                                        style="width: 100%"
                                        :value="password != retypePassword && retypePassword != ''"
                                        type="warning"
                                        >
                                        Mật khẩu nhập lại không khớp
                                    </v-alert>
                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                        <v-btn block color="primary" :disabled="!valid || (password != retypePassword)" @click="signUp(email, name, password)">Đăng kí</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-content class="app login-custom"  v-else-if="$vuetify.breakpoint.lgAndUp" >
            <v-container fluid>
                <v-layout row wrap>
                    <v-flex d-flex xs3 lg3 md3 xl3 offset-xs4>
                        <v-card flat img="/phone.png" style="height: 703px; ">
                            <v-card-title style="margin-top: 150px; margin-left: 50px; color: white;">
                                <h1>Đăng ký</h1>
                            </v-card-title>
                            <v-card-text class="text-xs-center">
                                <v-layout row wrap style="margin-top: 40px;">
                                    <v-form v-model="valid" style="width: 100%">
                                        <div style="color: white">
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                <v-text-field dark class="custom" readonly  label="Email" v-model="email"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                <v-text-field dark class="custom" :rules="nameRules" label="Nhập tên hiển thị" v-model="name"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                <v-text-field dark class="custom" :rules="passwordRules" label="Nhập mật khẩu" type="password" v-model="password"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                <v-text-field dark class="custom" label="Nhập lại mật khẩu" v-model="retypePassword" :rules="passwordRules" type="password"></v-text-field>
                                            </v-flex>
                                        </div>
                                    </v-form>
                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                        <v-btn dark style="height: 50px; margin-left: 5%; margin-right: 5%; width: 75%; border-radius: 60px;" color="#2F318E" :disabled="!valid" @click="signUp(email, name, password)">Đăng ký</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-content class="app" v-else style="background-image: url('layer3.jpg') !important; padding: 8% 5% 10% 5% background-repeat: no-repeat; background-size: cover">
            <v-container>
                <v-layout row wrap>
                    <v-flex class="signupcard" xs10 sm10 md10 lg10 xl10>
                        <v-card flat >
                            <!-- <v-card-text class="text-xs-center" >
                                <img height="100" src="../assets/adstech-logo1.png" alt="avatar">
                            </v-card-text> -->
                            
                            <v-card-text class="text-xs-center content">
                                <v-layout row wrap>
                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                        <v-text-field readonly  label="Nhập email" v-model="email"></v-text-field>
                                    </v-flex>
                                    <v-form v-model="valid" style="width: 100%">
                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                            <v-text-field :rules="nameRules" label="Tên hiển thị" v-model="name"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                            <v-text-field :rules="passwordRules" label="Mật khẩu" type="password" v-model="password"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                            <v-text-field label="Nhập lại mật khẩu" v-model="retypePassword" :rules="passwordRules" type="password"></v-text-field>
                                        </v-flex>
                                    </v-form>
                                    <v-alert
                                        style="width: 100%"
                                        :value="password != retypePassword && retypePassword != ''"
                                        type="warning"
                                        >
                                        Mật khẩu nhập lại không khớp
                                    </v-alert>
                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                        <v-btn block color="primary" :disabled="!valid || (password != retypePassword)" @click="signUp(email, name, password)">Đăng kí</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <alert/>
    </v-app>
</template>
<script>
const qs = require('qs');
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
        account: {
            type: String,
            default: null
        },
    },
    data(){
        return {
            name: '',
            password: '',
            retypePassword: '',
            valid: false,
            passwordRules: [
                v => !!v || 'Không được để trống',
                v => (v == this.password) || 'Mật khẩu nhập lại không khớp'
            ],
            nameRules: [
                v => !!v || 'Không được để trống',
            ]
        }
    },
    methods: {
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        signUp(email, name, password){
            let body = {
                email: email,
                name: name,
                password: password
            }
            userAPI.signUp(this.account, body).then(result => {
                let time = moment();
                const {
                    dispatch
                } = this.$store;
                if (result.code == "SUCCESS") {
                    // dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)}), Xin mời bạn đăng nhập lại`)
                    let token = {
                        token: result.response
                    }
                    let _qs = qs.stringify(token);
                    let link = `${config.baseUrl}login?${_qs}`
                    window.location.href = link;
                } else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            })
        }
    },
    mounted:function(){
        
    },
}
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Be+Vietnam&display=swap');
    * {
        font-family: 'Be Vietnam', sans-serif !important;
        box-sizing: border-box;
    }
    .custom {
        margin-bottom: 10%;
        margin-left: 10%;
        width: 80%;
        padding: 0px 20px;
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
    #ads-background {
        background-image: url('/layer3.jpg'); 
        background-size: 100%;
    }
    .transparent {
        background-color: white!important;
        opacity: 0.65;
        border-color: transparent!important;
    }
    .theme--light {

    }
</style>