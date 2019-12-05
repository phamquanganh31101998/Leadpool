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
                                            <v-form v-model="valid" style="width: 100%">
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-text-field :rules="passwordRules" label="Mật khẩu mới" type="password" v-model="password"></v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-text-field label="Nhập lại mật khẩu mới" v-model="retypePassword" :rules="passwordRules" type="password"></v-text-field>
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
                                                <v-btn block color="primary" :disabled="!valid || (password != retypePassword)" @click="resetPassword(password)">Xác nhận mật khẩu mới & Đăng nhập</v-btn>
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
        code: {
            type: String,
            default: null
        },
    },
    data(){
        return {
            password: '',
            retypePassword: '',
            valid: false,
            passwordRules: [
                v => !!v || 'Không được để trống',
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
        }
    },
    mounted:function(){
        
    },
}
</script>
<style scoped>

</style>