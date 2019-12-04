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
                    <v-list-tile>
                        <v-list-tile-content style="font-weight: bold;">
                            Tài khoản và nhóm
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="goToEditAccountDefaultPage()">
                        <v-list-tile-content>
                            Cài đặt tổ chức
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="goToMyInfoPage()">
                        <v-list-tile-content>
                            Tài khoản của tôi
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="goToAccountSettingPage()" v-if="isSysadmin">
                        <v-list-tile-content>
                            Quản lý hệ thống
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
            <v-flex xs10 sm10 md10 lg10 xl10>
                <h1>Tài khoản và nhóm</h1>
                <br>
                    <p v-if="access">Tạo, chỉnh sửa, xóa Tài khoản khỏi tổ chức của bạn</p>
                <br>
                
                <v-layout row wrap v-if="access">
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-card>
                            <v-card-title>
                                <v-layout>
                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                        <h2 class="mt-4">Các tài khoản trong tổ chức</h2>
                                    </v-flex>
                                    <v-flex xs6 sm6 md6 lg6 xl6>
                                        <v-btn class="mt-3" color="#3E82F7" dark round @click="inviteUser.dialog = true"> <v-icon>person_add</v-icon> Thêm tài khoản</v-btn>
                                    </v-flex>
                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                        <v-text-field style="width: 100%" v-model="search" append-icon="search" label="Tìm kiếm tài khoản theo tên" single-line hide-details></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-card-title>
                            <v-card-text>
                                <v-data-table :headers="headers" :items="users" no-data-text="Không có dữ liệu" rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]">
                                    <template v-slot:items="props">
                                        <td><a @click="openPermissionDialog(props.item.userId)">{{ props.item.displayName }}</a></td>
                                        <td>{{ props.item.userEmail }}</td>
                                        <td>{{ props.item.role }}</td>
                                        <!-- <td><v-btn flat round outline color="primary" @click="openPermissionDialog(props.item.userId)">Thiết lập quyền</v-btn></td> -->
                                    </template>
                                </v-data-table>
                            </v-card-text>
                            <v-card-actions>
                                
                                <br>
                                <br>
                            </v-card-actions>
                        </v-card>
                        <br>
                    </v-flex>
                </v-layout>
                <v-layout row wrap v-else>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-card flat>
                            <v-card-text style="background-color: #FDEDEE; border: 1px solid red;">
                                <v-card flat style="background-color: #FDEDEE">
                                    <v-card-title>
                                        <h2>Không có quyền truy cập</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        Bạn phải có quyền <span style="font-weight: bold">Thêm và chỉnh sửa tài khoản</span> thì mới có thể sử dụng chức năng này. Hãy liên hệ với Admin
                                    </v-card-text>
                                </v-card>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-dialog v-model="inviteUser.dialog" width="50%" persistent>
            <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                    <span class="headline">Thêm người vào tổ chức</span>
                </v-card-title>
                <v-card-text>
                    <span class="mt-4"><strong>Nhập email </strong></span>
                    <v-form v-model="inviteUser.valid">
                        <span class="ml-4"><v-text-field :rules="inviteUser.emailRules" v-model="inviteUser.email"></v-text-field></span>
                    </v-form>
                </v-card-text>
                <v-divider :divider="divider"></v-divider>
                <v-card-text>
                    <span class="mt-4"><strong>Thiết lập quyền cho tài khoản này </strong></span>
                    <v-layout>
                        <v-flex xs12 sm12 md6 xl6 lg6>
                            <div>
                                <div>
                                    <v-layout row wrap>
                                        <v-flex xs3 sm3 md3 lg3 xl3 class="mt-4">
                                            <h4>Quyền Lead</h4>
                                        </v-flex>
                                    </v-layout>
                                </div>
                                <template>
                                    <div class="mt-4">
                                        <v-layout row wrap>
                                            <v-flex xs6 sm6 md6 lg6 xl6 class="mt-4 pl-4">
                                                Xem
                                            </v-flex>
                                            <v-flex xs6 sm6 md6 lg6 xl6 class="pr-4">
                                                <v-select :items="contactAccessLevels" v-model="inviteUser.contactPer.view"></v-select>
                                            </v-flex>
                                        </v-layout>
                                    </div>
                                    <div>
                                        <v-layout row wrap>
                                            <v-flex xs6 sm6 md6 lg6 xl6 class="mt-4 pl-4">
                                                Liên lạc (gửi email, sms...)
                                            </v-flex>
                                            <v-flex xs6 sm6 md6 lg6 xl6 class="pr-4">
                                                <v-select :items="contactAccessLevels" v-model="inviteUser.contactPer.communicate"></v-select>
                                            </v-flex>
                                        </v-layout>
                                    </div>
                                    <div>
                                        <v-layout row wrap>
                                            <v-flex xs6 sm6 md6 lg6 xl6 class="mt-4 pl-4">
                                                Sửa
                                            </v-flex>
                                            <v-flex xs6 sm6 md6 lg6 xl6 class="pr-4"> 
                                                <v-select :items="contactAccessLevels" v-model="inviteUser.contactPer.edit"></v-select>
                                            </v-flex>
                                        </v-layout>
                                    </div>
                                </template>
                            </div>
                            
                        </v-flex>
                        <v-flex xs12 sm12 md6 xl6 lg6>
                            <div>
                                <div>
                                    <v-layout row wrap>
                                        <v-flex xs3 sm3 md3 lg3 xl3 class="mt-4">
                                            <h4>Quyền Admin</h4>
                                        </v-flex>
                                        <v-flex xs9 sm9 md9 lg9 xl9>
                                            <v-switch v-model="inviteUser.adminPer.isAdmin"></v-switch>
                                        </v-flex>
                                    </v-layout>
                                </div>
                                <template v-if="inviteUser.adminPer.isAdmin">
                                    <div>
                                        <v-layout row wrap>
                                            <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                Thêm & tùy chỉnh Tài khoản
                                            </v-flex>
                                            <v-flex xs2 sm2 md2 lg2 xl2>
                                                <v-switch v-model="inviteUser.adminPer.AddAndEditUsers"></v-switch>
                                            </v-flex>
                                        </v-layout>
                                    </div>
                                    <div>
                                        <v-layout row wrap>
                                            <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                Thêm & tùy chỉnh nhóm
                                            </v-flex>
                                            <v-flex xs2 sm2 md2 lg2 xl2>
                                                <v-switch v-model="inviteUser.adminPer.AddAndEditTeam"></v-switch>
                                            </v-flex>
                                        </v-layout>
                                    </div>
                                    <div>
                                        <v-layout row wrap>
                                            <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                Chia theo nhóm
                                            </v-flex>
                                            <v-flex xs2 sm2 md2 lg2 xl2>
                                                <v-switch v-model="inviteUser.adminPer.PartitionsByTeams"></v-switch>
                                            </v-flex>
                                        </v-layout>
                                    </div>
                                    <div>
                                        <v-layout row wrap>
                                            <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                Chỉnh sửa tổ chức mặc định
                                            </v-flex>
                                            <v-flex xs2 sm2 md2 lg2 xl2>
                                                <v-switch v-model="inviteUser.adminPer.EditAccountDefaults"></v-switch>
                                            </v-flex>
                                        </v-layout>
                                    </div>
                                </template>
                            </div>
                            
                            
                                
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-divider :divider="divider"></v-divider>
                <v-card-actions>
                    <v-btn flat color="primary" @click="inviteUserToAccount()" :disabled="!inviteUser.valid">Thêm</v-btn>
                    <v-btn flat color="red" @click="inviteUser.dialog = false">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="permissionsDialog" width="550" persistent transition="dialog-bottom-transition">
            <v-card>
                <!-- <v-card-title>
                    <h1>{{openUser.displayName}}</h1>
                </v-card-title>
                <v-divider :divider="divider"></v-divider> -->
                <v-card-title style="background-color:#1E88E5;color:#fff">
                    <span class="headline">Thiết lập quyền cho tài khoản</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-layout row>
                            <v-flex xs2 sm2 md2 lg2 xl2>
                                <v-avatar
                                    size="80"
                                    color="grey lighten-4"
                                    >
                                    <img :src="openUser.userAvatar" alt="avatar">
                                </v-avatar>
                            </v-flex>
                            <v-flex xs10 sm10 md10 lg10 xl10 class="ml-5">
                                <h4>{{openUser.displayName}}</h4>
                                <p>{{openUser.userEmail}}</p>
                                <br>
                            </v-flex>
                        </v-layout>
                        <br>        
                        <v-divider :divider="divider"></v-divider>
                        <v-layout row wrap>
                            <v-flex xs12 sm12 md12 lg12 xl12>
                                <v-tabs>
                                    <v-tab href="#tab1">Lead</v-tab>
                                    <v-tab href="#tab2">Admin</v-tab>
                                    <v-tab-item value="tab1">
                                        <br>
                                        <h3>Quyền đối với Lead</h3>
                                        <p>Tất cả Tài khoản đều có quyền truy cập cơ bản dưới đây. Các quyền này áp dụng cho liên lạc, công ty, công việc</p>
                                        <div style="border: 1px solid #E0E0E0">
                                            <v-layout row wrap>
                                                <v-flex xs6 sm6 md6 lg6 xl6 class="mt-4 pl-4">
                                                    Xem
                                                </v-flex>
                                                <v-flex xs6 sm6 md6 lg6 xl6 class="pr-4">
                                                    <v-select v-model="openUser.contactPer.view" style="width: 100%; color: #0091AE;" :items="contactAccessLevels" @input="updateContactAccessLevel(openUser.userId, '5d1dd9c7f0aa6114b40507b3', openUser.contactPer.view)"></v-select>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                        <div style="border: 1px solid #E0E0E0">
                                            <v-layout row wrap>
                                                <v-flex xs6 sm6 md6 lg6 xl6 class="mt-4 pl-4">
                                                    Liên lạc (gửi email, sms...)
                                                </v-flex>
                                                <v-flex xs6 sm6 md6 lg6 xl6 class="pr-4">
                                                    <v-select style="width: 100%; color: #0091AE;" v-model="openUser.contactPer.communicate" :items="contactAccessLevels" @input="updateContactAccessLevel(openUser.userId, '5d1dd9d9f0aa6114b40507b4', openUser.contactPer.communicate)"></v-select>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                        <div style="border: 1px solid #E0E0E0">
                                            <v-layout row wrap>
                                                <v-flex xs6 sm6 md6 lg6 xl6 class="mt-4 pl-4">
                                                    Sửa
                                                </v-flex>
                                                <v-flex xs6 sm6 md6 lg6 xl6 class="pr-4"> 
                                                    <v-select style="width: 100%; color: #0091AE;" v-model="openUser.contactPer.edit" :items="contactAccessLevels" @input="updateContactAccessLevel(openUser.userId, '5d1dd9e5f0aa6114b40507b5', openUser.contactPer.edit)"></v-select>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                        
                                    </v-tab-item>
                                    <v-tab-item value="tab2">
                                        <div>
                                            <v-layout row wrap>
                                                <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4">
                                                    <h3>Quyền Admin</h3>
                                                    <p>Thiết lập quyền để tùy chỉnh tổ chức và quản lý Tài khoản</p>
                                                </v-flex>
                                                <v-flex xs2 sm2 md2 lg2 xl2>
                                                    <v-switch v-model="openUser.isAdmin" @change="changeAdminAccessLevel(openUser.userId, openUser.isAdmin)"></v-switch>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                        
                                        <template v-if="openUser.isAdmin">
                                            <div style="border: 1px solid #E0E0E0">
                                                <v-layout row wrap>
                                                    <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                        Thêm & tùy chỉnh Tài khoản
                                                    </v-flex>
                                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                                        <v-switch v-model="openUser.adminPer.AddAndEditUsers" @change="updateAdminAccessLevel(openUser.userId, '5d2559f577201a474d72eac9', openUser.adminPer.AddAndEditUsers)"></v-switch>
                                                    </v-flex>
                                                </v-layout>
                                            </div>
                                            <div style="border: 1px solid #E0E0E0">
                                                <v-layout row wrap>
                                                    <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                        Thêm & tùy chỉnh nhóm
                                                    </v-flex>
                                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                                        <v-switch v-model="openUser.adminPer.AddAndEditTeam" @change="updateAdminAccessLevel(openUser.userId, '5d255a0d77201a474d72eaca', openUser.adminPer.AddAndEditTeam)"></v-switch>
                                                    </v-flex>
                                                </v-layout>
                                            </div>
                                            <div style="border: 1px solid #E0E0E0">
                                                <v-layout row wrap>
                                                    <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                        Chia theo nhóm
                                                    </v-flex>
                                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                                        <v-switch v-model="openUser.adminPer.PartitionByTeams" @change="updateAdminAccessLevel(openUser.userId, '5d255a5077201a474d72eacb', openUser.adminPer.PartitionByTeams)"></v-switch>
                                                    </v-flex>
                                                </v-layout>
                                            </div>
                                            <div style="border: 1px solid #E0E0E0">
                                                <v-layout row wrap>
                                                    <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                        Chỉnh sửa tổ chức mặc định
                                                    </v-flex>
                                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                                        <v-switch v-model="openUser.adminPer.EditAccountDefaults" @change="updateAdminAccessLevel(openUser.userId, '5d255a8477201a474d72eacc', openUser.adminPer.EditAccountDefaults)"></v-switch>
                                                    </v-flex>
                                                </v-layout>
                                            </div>
                                        </template>
                                    </v-tab-item>
                                </v-tabs>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-divider :divider="divider"></v-divider>
                <v-card-actions>
                    <v-btn @click="closePermissionDialog()" flat style="color: red;">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- <v-dialog v-model="forbiddenDialog" persistent @click:outside="$store.dispatch('turnOffForbiddenDialog')" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Không có quyền truy cập</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Bạn phải là Quản lý và có quyền chỉnh sửa tài khoản mới có thể truy cập vào trang này.
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="$store.dispatch('turnOffForbiddenDialog'), $router.go(-1)">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
        <v-dialog v-model="inviteUser.success" @click:outside="inviteUser.success = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="green">
                    <v-toolbar-title>Thành công</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Đã gửi email xác nhận gia nhập tổ chức thành công. Hãy đợi họ xác nhận...
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="green" @click="inviteUser.success = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="inviteUser.fail" @click:outside="inviteUser.fail = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Thất bại</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Có lỗi xảy ra khi thêm Tài khoản vào tổ chức. Hãy thử lại
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="inviteUser.fail = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-content>
</template>
<script>
import moment from 'moment'
import alert from '@/components/alert'
import permissionsService from '../../../services/permissions.service'
import accountService from '../../../services/accountsetting.service'
import {mapGetters} from 'vuex'
export default {
    components: {
        alert
    },
    props: {
        idAccount: {
            type: String,
            default: null,
        },
    },
    data(){
        return {
            divider: true,
            // forbiddenDialog: false,
            permissionsDialog: false,
            headers: [
                {
                    text: 'TÊN',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                {
                    text: 'EMAIL',
                    align: 'left',
                    sortable: false,
                    value: 'email'
                },
                {
                    text: 'QUYỀN',
                    align: 'left',
                    sortable: false,
                    value: 'role'
                },
                // {
                //     text: 'THIẾT LẬP QUYỀN',
                //     align: 'left',
                //     sortable: false,
                //     value: 'role'
                // },
            ],
            allUsers: [],
            users: [],
            search: '',
            openUser: {
                "userId": "5d22bbc6bd497e45940e8885",
                "accountId": "5d1dd258f0aa61074608b0e3",
                "teamId": "5d25af7d77201a3b689d45b4",
                "groupPermission": null,
                "userLogin": "duc.tbmd@gmail.com",
                "userEmail": "duc.tbmd@gmail.com",
                "userPhone": null,
                "displayName": "Minh Đức Tô Bá",
                "userPass": null,
                "userAvatar": "https://lh4.googleusercontent.com/-nQOa7xIDJho/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3resROrKen7vu9EAI8ZCgLJ8j2VfFA/photo.jpg",
                "createdAt": null,
                "updateAt": "2019-07-10T09:43:24.331+0000",
                "isAdmin": true,
                "adminPer": {
                    "AddAndEditUsers": "None",
                    "AddAndEditTeam": "None",
                    "PartitionsByTeams": "None",
                    "EditAccountDefaults": "None"
                },
                "contactPer": {
                    "view": "Everything",
                    "communicate": "Everything",
                    "edit": "Everything"
                }
            },
            contactAccessLevels: [
                {
                    text: 'Cá nhân',
                    value: 'OwnedOnly'
                },
                {
                    text: 'Trong cùng nhóm',
                    value: 'TeamOnly'
                },
                {
                    text: 'Tất cả',
                    value: 'Everything'
                }
            ],
            contactAccessLevelEx1: 'Everything',
            contactAccessLevelEx2: 'Everything',
            contactAccessLevelEx3: 'Everything',
            access: false,
            AddAndEditUsers: false,
            AddAndEditTeams: false,
            PartitionByTeams: false,
            EditAccountDefaults: false,
            currentUser: null,
            isSysadmin: false,
            inviteUser: {
                dialog: false,
                email: '',
                emailRules: [
                    v => !!v || 'Chưa nhập E-mail',
                    v => /.+@.+/.test(v) || 'E-mail không đúng định dạng',
                ],
                valid: false,
                success: false,
                fail: false,
                contactPer: {
                    view: 'OwnedOnly',
                    communicate: 'OwnedOnly',
                    edit: 'OwnedOnly'
                },
                adminPer: {
                    isAdmin: false,
                    AddAndEditUsers: true,
                    AddAndEditTeam: false,
                    PartitionsByTeams: false,
                    EditAccountDefaults: false
                }
            }
        }
    },
    watch: {
        search(){
            this.users = [];
            for (let i = 0; i < this.allUsers.length; i++){
                if (this.normalText(this.allUsers[i].displayName).toLowerCase().includes(this.normalText(this.search.toLowerCase().trim()))){
                    this.users.push(this.allUsers[i])
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            forbiddenDialog: 'forbiddenDialog'
            // ...
        })
    },
    methods: {
        
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        normalText(str){
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
        },
        returnRole(role){
            if (role == 'contact'){
                return 'Lead'
            }
            else if (role == 'admin'){
                return 'Quản lý'
            }
            else if (role == 'sysadmin'){
                return 'Quản trị hệ thống'
            }
        },
        inviteUserToAccount(){
            let email = this.inviteUser.email;
            let accountId = this.idAccount;
            let groupPermissions = ["5d2556cf77201a4516f5b901"];
            let contactPer = this.inviteUser.contactPer;
            let permissions = {
                "5d1dd9c7f0aa6114b40507b3": contactPer.view,
                "5d1dd9d9f0aa6114b40507b4": contactPer.communicate,
                "5d1dd9e5f0aa6114b40507b5": contactPer.edit
            }
            let adminPer = this.inviteUser.adminPer;
            if (adminPer.isAdmin == true){
                groupPermissions.push('5d255b0c77201a474d72eacd');
                if (adminPer.AddAndEditUsers == true){
                    permissions["5d2559f577201a474d72eac9"] = "Accept";
                }
                if (adminPer.AddAndEditTeam == true){
                    permissions["5d255a0d77201a474d72eaca"] = "Accept";
                }
                if (adminPer.PartitionsByTeams == true){
                    permissions["5d255a5077201a474d72eacb"] = "Accept";
                }
                if (adminPer.EditAccountDefaults == true){
                    permissions["5d255a8477201a474d72eacc"] = "Accept";
                }
            }
            let body = {
                email: email,
                accountId: accountId,
                groupPermissions: groupPermissions,
                permissions: permissions
            }
            // console.log(body);
            accountService.inviteUser(this.idAccount, body).then(result => {
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
            }).catch(error => {
                console.log(error);
                // this.inviteUser.fail = true;
            }).finally(() => {
                this.inviteUser.dialog = false;
            })
        },
        findUserByAccount(){
            this.allUsers = [];
            this.users = [];
            permissionsService.findUserByAccount(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    // console.log(result);
                    for (let i = 0; i<result.response.length;i++){
                        result.response[i].number = i;
                        var role = '';
                        var obj = result.response[i];
                        if (obj.groupPermission == null){
                            role = 'null'
                        }
                        else {
                            for (let k = 0; k < obj.groupPermission.length; k++){
                                role = role + ' ' + this.returnRole(obj.groupPermission[k].name) + ' | '
                            }
                        }
                        result.response[i].role = role;
                    }
                    for(let i = 0; i<result.response.length;i++){
                        if(result.response[i].role != 'null' && !result.response[i].role.includes('Quản trị hệ thống')){
                            this.users.push(result.response[i]);
                            this.allUsers.push(result.response[i]);
                        }
                    }
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
            }).catch(error => {
                console.log(error)
            })
        },
        setAdminAccessLevel(value){
            let result = false;
            if(value == 'None'){
                result = false
            }
            else {
                result = true;
            }
            return result;
        },
        openPermissionDialog(userId){
            permissionsService.getUserInfo(this.idAccount, userId).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let res = result.response;
                    try {
                        if(res.groupPermission != null && res.groupPermission.length > 0){
                            res.isAdmin = false;
                            res.adminPer = {
                                AddAndEditUsers: false,
                                AddAndEditTeam: false,
                                PartitionByTeams: false,
                                EditAccountDefaults: false
                            }
                            for(let i = 0; i<res.groupPermission.length;i++){
                                if(res.groupPermission[i].name == 'contact'){
                                    let contactPer = {};
                                    contactPer.view = res.groupPermission[i].permission[0].accessLevel.accessLevel;
                                    contactPer.communicate = res.groupPermission[i].permission[1].accessLevel.accessLevel;
                                    contactPer.edit = res.groupPermission[i].permission[2].accessLevel.accessLevel;
                                    res.contactPer = contactPer;
                                }
                                if(res.groupPermission[i].name == 'admin'){
                                    let adminPer = {};
                                    adminPer.AddAndEditUsers = this.setAdminAccessLevel(res.groupPermission[i].permission[0].accessLevel.accessLevel);
                                    adminPer.AddAndEditTeam = this.setAdminAccessLevel(res.groupPermission[i].permission[1].accessLevel.accessLevel);
                                    adminPer.PartitionByTeams = this.setAdminAccessLevel(res.groupPermission[i].permission[2].accessLevel.accessLevel);
                                    adminPer.EditAccountDefaults = this.setAdminAccessLevel(res.groupPermission[i].permission[3].accessLevel.accessLevel);
                                    res.adminPer = adminPer;
                                    res.isAdmin = true;
                                }
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    this.openUser = result.response;
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
            })
            this.permissionsDialog = true;
        },
        updateContactAccessLevel(userId, permissionId, accessLevel){
            let body = {
                "permissionId": permissionId,
                "accessLevel": accessLevel
            }
            permissionsService.updateAccessLevel(this.idAccount, userId, body).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error);
            })
        },
        changeAdminAccessLevel(userId, value){
            if(value == true){
                permissionsService.upgradeToAdmin(this.idAccount, userId).then(result => {
                    console.log(result);
                }).catch(error => {
                    console.log(error)
                })
            }
            else{
                permissionsService.removeAdminPermission(this.idAccount, userId).then(result => {
                    console.log(result);
                    this.openUser.adminPer = {
                        AddAndEditUsers: false,
                        AddAndEditTeam: false,
                        PartitionByTeams: false,
                        EditAccountDefaults: false
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        updateAdminAccessLevel(userId, permissionId, value){
            let accessLevel = 'None';
            if (value == true){
                accessLevel = 'Accept'
            }
            else{
                accessLevel = 'None';
            }
            let body = {
                "permissionId": permissionId,
                "accessLevel": accessLevel
            }
            permissionsService.updateAccessLevel(this.idAccount, userId, body).then(result => {
                console.log(result);
                this.openPermissionDialog(userId);
            }).catch(error => {
                console.log(error);
            })
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
            let role = this.currentUser.authorities;
            if(role.includes('ROLE_SYSADMIN_SYSADMIN_ACCEPT')){
                this.access = true;
                this.isSysadmin = true;
            }
            else if (role.includes('ROLE_ADMIN_ADDANDEDITUSERS_ACCEPT')){
                this.access = true;
            }
            if(this.access == true){
                this.findUserByAccount()
            }
            // for(let i = 0; i < this.currentUser.authorities.length;i++){
            //     if(this.currentUser.authorities[i] == 'ROLE_ADMIN_ADDANDEDITUSERS_ACCEPT' || this.currentUser.authorities[i] == 'ROLE_SYSADMIN_SYSADMIN_ACCEPT'){
            //        
            //         this.isAdmin = true;
            //     }
            // }
            // for(let i = 0; i < this.currentUser.authorities.length;i++){
            //     if(this.currentUser.authorities[i] == 'ROLE_SYSADMIN_SYSADMIN_ACCEPT'){
            //         this.isSysadmin = true;
            //     }
            // }
            
        },
        closePermissionDialog(){
            const tempArray = [];
            // permissionsService.findUserByAccount(this.idAccount).then(result => {
            //     for (let i = 0; i<result.response.length;i++){
            //         result.response[i].number = i;
            //         var role = '';
            //         var obj = result.response[i];
            //         if (obj.groupPermission == null){
            //             role = 'null'
            //         }
            //         else {
            //             for (let k = 0; k < obj.groupPermission.length; k++){
            //                 role = role + ' ' + obj.groupPermission[k].name + ' | '
            //             }
            //         }
            //         result.response[i].role = role;
            //     }
            //     for(let i = 0; i<result.response.length;i++){
            //         if(result.response[i].role != 'null'){
            //             tempArray.push(result.response[i]);
            //         }
            //     }
            //     for (let i = 0; i<tempArray.length;i++){
            //         if(this.users[i] != tempArray[i]){
            //             this.users[i] = tempArray[i];
            //         }
            //     }
            //     this.users = [...this.users];
            // }).catch(error => {
            //     console.log(error)
            // })
            this.findUserByAccount();
            this.search = '';
            this.permissionsDialog = false;
        },
        goToAccountSettingPage(){
            let link = `/settings/${this.currentUser.accountId}/manageaccount`;
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
    },
    
    created(){
        this.$store.state.colorNumber = 6;
        this.getCurrentUser();
        
    }
}
</script>
<style>

</style>