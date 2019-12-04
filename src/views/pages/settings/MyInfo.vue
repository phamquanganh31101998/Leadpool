<template>
    <v-content>
        <v-layout row wrap class="mt-5 pl-2 pr-5">
            <v-flex xs12 sm12 md12 lg12 xl12>
                <h1 class="ml-3">Cài đặt</h1>
            </v-flex>
        </v-layout>
        <v-divider class="mt-5" :divider="divider"></v-divider>
        <v-layout row wrap class="mt-5 pl-2 pr-5">
            <v-flex xs2 sm2 md2 lg2 xl2>
                <v-list>
                    <!-- <v-list-tile>
                        <v-list-tile-content>
                            Sales
                        </v-list-tile-content>
                    </v-list-tile> -->
                    <v-list-tile @click="goToUserAndTeamSettingPage()">
                        <v-list-tile-content>
                            Tài khoản và nhóm
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="goToEditAccountDefaultPage()">
                        <v-list-tile-content >
                            Cài đặt tổ chức
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content style="font-weight: bold;">
                            Tài khoản của tôi
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="goToAccountSettingPage()" v-if="isSysadmin">
                        <v-list-tile-content >
                            Quản lý hệ thống
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
            <v-flex xs10 sm10 md10 lg10 xl10>
                <h1>Cài đặt tài khoản của tôi </h1>
                <br>
                <v-layout row wrap>
                    <v-card flat width="100%">
                        <v-card-title>
                            <h2>Thông tin tài khoản</h2>
                        </v-card-title>
                        <v-card-text>
                            <v-card>
                                <v-card-text>
                                    <v-layout>
                                        <v-flex xs2 offset-xs1 sm2 offset-sm1 md2  offset-md1 lg2  offset-lg1 xl2 offset-xl1>
                                            <v-avatar
                                                size="100"
                                                color="grey lighten-4"
                                                >
                                                <img :src="info.userAvatar" alt="avatar">
                                            </v-avatar>
                                        </v-flex>
                                        <v-flex xs5 sm5 md5 lg5 xl5>
                                            <v-layout wrap>
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <span><h3>Tên</h3></span>
                                                    <v-text-field solo readonly v-model="info.displayName"></v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <span><h3>Email</h3></span>
                                                    <v-text-field solo readonly v-model="info.userEmail"></v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <span><h3>Tổ chức</h3></span>
                                                    <v-text-field solo readonly v-model="account"></v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12 v-if="info.userPass == 'TRUE'">
                                                    <v-form v-model="changePassword.valid">
                                                        <span><h3 style="color: primary;">Đổi mật khẩu</h3></span>
                                                        <br>
                                                        <!-- <span><h4>Mật khẩu cũ</h4></span> -->
                                                        <v-text-field label="Mật khẩu cũ" v-model="changePassword.old" :rules="passwordRules" type="password"></v-text-field>
                                                        <!-- <span><h4>Mật khẩu mới</h4></span> -->
                                                        <v-text-field label="Mật khẩu mới" v-model="changePassword.new" :rules="passwordRules" type="password"></v-text-field>
                                                        <!-- <span><h4>Nhập lại mật khẩu mới</h4></span> -->
                                                        <v-text-field label="Nhập lại mật khẩu mới" v-model="changePassword.retypeNew" :rules="passwordRules" type="password"></v-text-field>
                                                        <v-alert
                                                            :value="changePassword.new != changePassword.retypeNew"
                                                            type="warning"
                                                            >
                                                            Mật khẩu nhập lại không khớp với mật khẩu mới
                                                        </v-alert>
                                                        <v-btn color="primary" :disabled="!changePassword.valid || (changePassword.new != changePassword.retypeNew)" @click="updatePassword(changePassword.old, changePassword.new)" round>Đổi mật khẩu</v-btn>
                                                    </v-form>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12 v-if="info.userPass == 'FALSE'">
                                                    <v-form v-model="changePassword.valid">
                                                        <span><h3 style="color: primary;">Đổi mật khẩu</h3></span>
                                                        <v-text-field label="Mật khẩu mới" v-model="changePassword.new" :rules="passwordRules" type="password"></v-text-field>
                                                        <v-text-field label="Nhập lại mật khẩu mới" v-model="changePassword.retypeNew" :rules="passwordRules" type="password"></v-text-field>
                                                        <v-alert
                                                            :value="changePassword.new != changePassword.retypeNew"
                                                            type="warning"
                                                            >
                                                            Mật khẩu nhập lại không khớp với mật khẩu mới
                                                        </v-alert>
                                                        <v-btn color="primary" :disabled="!changePassword.valid || (changePassword.new != changePassword.retypeNew)" @click="updatePassword(changePassword.old, changePassword.new)" round>Đổi mật khẩu</v-btn>
                                                    </v-form>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-card-text>
                    </v-card>
                    
                    
                </v-layout>
                
            </v-flex>
            
        </v-layout>
    </v-content>
</template>
<script>
import moment from 'moment';
import userAPI from '../../../services/user.service'
import serviceAPI from '../../../services/service.service'
import accountAPI from '../../../services/accountsetting.service'
import { MultiSelect } from 'vue-search-select'
export default {
    components: {
        MultiSelect
    },
    props: {
        idAccount: {
            type: String,
            default: null,
        },
    },
    watch: {
        search(){
        }
    },
    data(){
        return {
            passwordRules: [
                v => !!v || 'Không được để trống',
        // v => v.length <= 15 || 'Tên nhỏ hơn 15 kí tự',
            ],
            isSysadmin: false,
            divider: true,
            info: {
                "userId": "",
                "accountId": "",
                "teamId": null,
                "groupPermission": [],
                "userLogin": "",
                "userEmail": "",
                "userPhone": null,
                "displayName": "",
                "userPass": "FALSE",
                "userAvatar": "",
                "createdAt": "",
                "updateAt": null
            },
            account: '',
            changePassword: {
                old: '',
                new: '',
                retypeNew: '',
                valid: false
            }
        }
    },
    methods: {
        updatePassword(oldPass, newPass){
            let body = {
                oldPassword: oldPass,
                newPassword: newPass
            }
            userAPI.updatePassword(this.idAccount, body).then(result => {
                let time = moment();
                const {
                    dispatch
                } = this.$store;
                if (result.code == "SUCCESS") {
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)}), Xin mời bạn đăng nhập lại`)
                    setTimeout(() => {
                        dispatch('user/logout')
                    }, 3000)
                    
                } else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            })
        },
        getAccountInfo(){
            this.country = [];
            accountAPI.getAccountInfo(this.idAccount).then(result => {
                let time = moment();
                const {
                    dispatch
                } = this.$store;
                if (result.code == "SUCCESS") {
                    this.account = result.response.accountName;
                } else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            })
        },
        getMyInfo(){
            userAPI.getMyInfo(this.idAccount).then(result => {
                let time = moment();
                const {
                    dispatch
                } = this.$store;
                if (result.code == "SUCCESS") {
                    this.info = result.response;
                } else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
            })
        },
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        normalText(str){
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
        },
        goToAccountSettingPage(){
            let link = `/settings/${this.currentUser.accountId}/manageaccount`;
            this.$router.push(link);
        },
        goToUserAndTeamSettingPage(){
            let link = `/settings/${this.currentUser.accountId}/userandteam`;
            this.$router.push(link);
        },
        goToEditAccountDefaultPage(){
            let link = `/settings/${this.currentUser.accountId}/editaccountdefault`;
            this.$router.push(link);
        },
        goToMyInfoPage(){
            let link = `/settings/${this.currentUser.accountId}/myinfo`;
            this.$router.push(link);
        },
        
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
            let role = this.currentUser.authorities;
            if(role.includes('ROLE_SYSADMIN_SYSADMIN_ACCEPT')){
                this.isSysadmin = true;
            }
            this.getMyInfo();
            this.getAccountInfo();
        },
        
    },
    created(){
        this.getCurrentUser();
    }
}
</script>
<style scoped>

</style>