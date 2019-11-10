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
                    <v-list-tile>
                        <v-list-tile-content style="font-weight: bold;">
                            Quản lý hệ thống
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
            <v-flex xs10 sm10 md10 lg10 xl10>
                <h1>Quản lý toàn bộ hệ thống </h1>
                <br>
                <v-layout row wrap>
                    <v-flex xs3 sm3 md3 lg3 xl3>
                        <v-select label="Chọn tổ chức" :items="listAccount" v-model="currentAccountId" @change="findUserByAccount()"></v-select>
                    </v-flex>
                    <v-flex xs1 sm1 md1 lg1 xl1>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    round
                                    color="primary"
                                    dark
                                    v-on="on"
                                    >
                                Tùy chỉnh tổ chức
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-tile @click="inviteUser.dialog = true">
                                    <v-list-tile-content>Thêm tài khoản vào tổ chức</v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile @click="renameAccount.dialog = true">
                                    <v-list-tile-content>Đổi tên tổ chức</v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile @click="confirmDeleteDialog = true" v-if="currentAccount.deletedAt == null">
                                    <v-list-tile-content>Xóa tổ chức</v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile v-if="currentAccount.deletedAt != null" @click="restoreDeletedAccount()">
                                    <v-list-tile-content>Khôi phục tổ chức sau khi xóa</v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                        <!-- <v-btn color="red" dark round @click="confirmDeleteDialog = true">Xóa tổ chức này</v-btn> -->
                        <v-dialog v-model="confirmDeleteDialog" @click:outside="confirmDeleteDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
                            <v-card tile>
                                <v-toolbar card dark color="red">
                                    <v-toolbar-title>Xác nhận xóa</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                                <v-card-text>
                                    Bạn có chắc chắn muốn đánh dấu tổ chức này là xóa?
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn flat color="red" @click="deleteAccount()">XÓA</v-btn>
                                    <v-btn flat color="primary" @click="confirmDeleteDialog = false">Đóng</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="renameAccount.dialog" width="30%" persistent>
                            <v-card>
                                <v-card-title style="background-color:#1E88E5;color:#fff">
                                    <span class="headline">Đổi tên tổ chức</span>
                                </v-card-title>
                                <v-card-text>
                                    <span class="mt-4"><strong>Nhập tên mới </strong></span>
                                    <v-form v-model="inviteUser.valid">
                                        <span class="ml-4"><v-text-field :rules="renameAccount.nameRules" v-model="renameAccount.name"></v-text-field></span>
                                    </v-form>
                                </v-card-text>
                                <v-divider :divider="divider"></v-divider>
                                <v-card-actions>
                                    <v-btn flat color="primary" @click="rename()" :disabled="renameAccount.name.length == 0">Đổi tên</v-btn>
                                    <v-btn flat color="red" @click="renameAccount.dialog = false">Đóng</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-flex>
                    <v-flex xs1 sm1 md1 lg1 xl1 >
                        <!-- <v-btn color="primary" round @click="inviteUser.dialog = true"> <v-icon>person_add</v-icon> Thêm người vào tổ chức này</v-btn> -->
                        <v-dialog v-model="inviteUser.dialog" width="30%" persistent>
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
                                <v-card-actions>
                                    <v-btn flat color="primary" @click="inviteUserToAccount()" :disabled="!inviteUser.valid">Thêm</v-btn>
                                    <v-btn flat color="red" @click="inviteUser.dialog = false">Đóng</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-flex>
                    <v-flex xs1 sm1 md1 lg1 xl1>
                        <v-btn color="primary" round @click="createAccountDialog = true"> <v-icon>group_add</v-icon> Thêm tổ chức mới</v-btn>
                        <v-dialog v-model="createAccountDialog" width="30%" persistent>
                            <v-card>
                                <v-card-title style="background-color:#1E88E5;color:#fff">
                                    <span class="headline">Tạo tổ chức mới</span>
                                </v-card-title>
                                <v-card-text>
                                    <span class="mt-4"><strong>Tên tổ chức </strong></span>
                                    <span class="ml-4"><v-text-field v-model="createAccountName"></v-text-field></span>
                                </v-card-text>
                                <v-divider :divider="divider"></v-divider>
                                <v-card-actions>
                                    <v-btn flat color="primary" @click="createAccount()" :disabled="createAccountName == ''">Tạo</v-btn>
                                    <v-btn flat color="red" @click="createAccountDialog = false">Đóng</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-flex>
                    <v-flex xs3 sm3 md3 lg3 xl3 offset-xs3 offset-sm3 offset-md3 offset-lg3 offset-xl3>
                        <v-text-field style="width: 100%" v-model="search" append-icon="search" label="Tìm kiếm tài khoản theo tên" single-line hide-details></v-text-field>
                    </v-flex>
                    
                </v-layout>
                <!-- <v-layout>
                    <v-flex xs3 sm3 md3 lg3 xl3 offset-xs8 offset-sm8 offset-md8 offset-lg8 offset-xl8>
                        
                    </v-flex>
                </v-layout> -->
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-data-table :headers="headers" :items="users" no-data-text="Tổ chức này chưa có tài khoản nào">
                            <template v-slot:items="props">
                                <td>{{ props.item.displayName }}</td>
                                <td>{{ props.item.userEmail }}</td>
                                <td>{{ props.item.role }}</td>
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <td class="text-xs-right" ><v-btn flat fab small v-on="on"><v-icon>more_vert</v-icon></v-btn> </td>
                                    </template>
                                    <v-list>
                                        <v-list-tile @click="openPermissionDialog(props.item.userId)">
                                            <v-list-tile-content>Thiết lập quyền</v-list-tile-content>
                                        </v-list-tile>
                                        <v-list-tile @click="openNewAccountDialog(props.item.userId)">
                                            <v-list-tile-content>Chuyển sang tổ chức khác</v-list-tile-content>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                                <!-- <td><v-btn flat round outline color="primary" @click="openPermissionDialog(props.item.userId)">Thiết lập quyền</v-btn></td> -->
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
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
                                        <h3>Quyền đối với Lead</h3>
                                        <p>Tất cả tài khoản đều có quyền truy cập cơ bản dưới đây. Các quyền này áp dụng cho lead, tổ chức, công việc</p>
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
                                                    <p>Thiết lập quyền để tùy chỉnh tổ chức và quản lý tài khoản</p>
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
                                                        Thêm & tùy chỉnh tài khoản
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
        <v-dialog v-model="forbiddenDialog" @click:outside="forbiddenDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Thất bại</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Lỗi
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="forbiddenDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
                    Có lỗi xảy ra khi thêm tài khoản. Hãy thử lại
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="inviteUser.fail = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="newAccount.dialog" width="30%" persistent>
            <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                    <span class="headline">Chuyển tài khoản sang tổ chức khác</span>
                </v-card-title>
                <v-card-text>
                    <span class="mt-4"><strong>Chọn tổ chức </strong></span>
                    <v-select :items="newAccount.listAccount" v-model="newAccount.accountId"></v-select>
                </v-card-text>
                <v-divider :divider="divider"></v-divider>
                <v-card-actions>
                    <v-btn flat color="primary" @click="setNewAccount()">Chuyển</v-btn>
                    <v-btn flat color="red" @click="newAccount.dialog = false">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-content>
</template>
<script>
import permissionsService from '../../../services/permissions.service'
import accountService from '../../../services/accountsetting.service'
export default {
    props: {
        idAccount: {
            type: String,
            default: null,
        },
    },
    // watch: {
    //     currentAccountId(){
    //         console.log(this.currentAccount)
    //     }
    // },
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
    data(){
        return{
            divider: true,
            forbiddenDialog: false,
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
                {
                    text: 'Hành động',
                    align: 'right',
                    sortable: false,
                    value: 'role'
                },
            ],
            users: [],
            allUsers: [],
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
                    text: 'Trong cùng nhóm',
                    value: 'TeamOnly'
                },
                {
                    text: 'Cá nhân',
                    value: 'OwnedOnly'
                },
                {
                    text: 'Tất cả',
                    value: 'Everything'
                }
            ],
            contactAccessLevelEx1: 'Everything',
            contactAccessLevelEx2: 'Everything',
            contactAccessLevelEx3: 'Everything',
            isAdmin: false,
            AddAndEditUsers: false,
            AddAndEditTeams: false,
            PartitionByTeams: false,
            EditAccountDefaults: false,
            currentAccountId: '',
            currentAccount: null,
            currentUser: null,
            listAccount: [],
            createAccountDialog: false,
            createAccountName: '',
            inviteUser: {
                dialog: false,
                email: '',
                emailRules: [
                    v => !!v || 'Chưa nhập E-mail',
                    v => /.+@.+/.test(v) || 'E-mail không đúng định dạng',
                ],
                valid: false,
                success: false,
                fail: false
            },
            newAccount: {
                listAccount: [],
                accountId: '',
                dialog: false,
                userId: ''
            },
            confirmDeleteDialog: false,
            search: '',
            renameAccount: {
                dialog: false,
                name: '',
                nameRules: [
                    v => !!v || 'Không được để trống',
                ],
            }
        }
    },
    methods: {
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
        normalText(str){
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
        },
        rename(){
            let body = {
                accountName: this.renameAccount.name
            }
            accountService.renameAccount(this.currentAccountId, body).then(result => {
                console.log(result);
                this.renameAccount.name = '';
                this.getListAccount()
            }).then(error => {
                console.log(error);
            }).finally(() => {
                this.renameAccount.dialog = false;
            })
        },
        openNewAccountDialog(id){
            this.newAccount.lists = [];
            for (let i = 0; i < this.listAccount.length; i++){
                this.newAccount.listAccount.push(this.listAccount[i])
                // if (this.listAccount[i].value != this.currentAccountId){
                    
                // }
            }
            this.newAccount.userId = id;
            this.newAccount.accountId = this.newAccount.listAccount[0].value;
            this.newAccount.dialog = true
        },
        setNewAccount(){
            let body = {
                accountId: this.newAccount.accountId
            }
            accountService.setNewAccount(this.currentAccountId, this.newAccount.userId, body).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.findUserByAccount();
                this.newAccount.dialog = false;
            })
        },

        inviteUserToAccount(){
            let body = {
                email: this.inviteUser.email
            }
            accountService.inviteUser(this.currentAccountId, body).then(result => {
                console.log(result);
                this.inviteUser.success = true;
            }).catch(error => {
                console.log(error);
                this.inviteUser.fail = true;
            }).finally(() => {
                this.inviteUser.dialog = false;
            })
        },
        deleteAccount(){
            accountService.deleteAccount(this.currentAccountId).then(result => {
                console.log(result);
                this.getListAccount();
            }).catch(error => {
                console.log(error)
            })
        },
        restoreDeletedAccount(){
            accountService.restoreDeletedAccount(this.currentAccountId).then(result => {
                console.log(result);
                this.getListAccount();
            }).catch(error =>{
                console.log(error);
            })
        },
        getListAccount(){
            this.listAccount = [];
            accountService.getListAccount().then(result => {
                console.log(result)
                result.response = result.response.reverse()
                for (let i = 0; i < result.response.length; i++){
                    let name = '';
                    if (result.response[i].deletedAt != null){
                        name = result.response[i].accountName + ' *(ĐÃ XÓA)*'
                    }
                    else {
                        name = result.response[i].accountName
                    }
                    let obj = {
                        text: name,
                        value: result.response[i].accountId,
                        deletedAt: result.response[i].deletedAt
                    }
                    this.listAccount.push(obj);
                }
                this.currentAccount = this.listAccount[0];
                this.currentAccountId = this.listAccount[0].value;
                this.findUserByAccount();
            }).catch(error => {
                console.log(error);
            })
        },
        createAccount(){
            let body = {
                accountName: this.createAccountName
            }
            accountService.createAccount(body).then(result => {
                console.log(result);
                
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.createAccountDialog = false;
                this.createAccountName = '';
                this.getListAccount();
            })
        },
        findUserByAccount(){
            this.allUsers = [];
            this.users = [];
            for (let i = 0; i < this.listAccount.length;i++){
                if (this.currentAccountId == this.listAccount[i].value){
                    this.currentAccount = this.listAccount[i];

                }
            }
            console.log(this.currentAccount)
            permissionsService.findUserByAccount(this.currentAccountId).then(result => {
                console.log(result);
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
                    if(result.response[i].role != 'null'){
                        this.users.push(result.response[i]);
                        this.allUsers.push(result.response[i]);
                    }
                }
            }).catch(error => {
                this.forbiddenDialog = true;
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
            permissionsService.getUserInfo(this.currentAccountId, userId).then(result => {
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
                console.log(this.openUser);
            })
            this.permissionsDialog = true;
        },
        updateContactAccessLevel(userId, permissionId, accessLevel){
            let body = {
                "permissionId": permissionId,
                "accessLevel": accessLevel
            }
            permissionsService.updateAccessLevel(this.currentAccountId, userId, body).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error);
            })
        },
        changeAdminAccessLevel(userId, value){
            if(value == true){
                permissionsService.upgradeToAdmin(this.currentAccountId, userId).then(result => {
                    console.log(result);
                }).catch(error => {
                    console.log(error)
                })
            }
            else{
                permissionsService.removeAdminPermission(this.currentAccountId, userId).then(result => {
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
            permissionsService.updateAccessLevel(this.currentAccountId, userId, body).then(result => {
                console.log(result);
                this.openPermissionDialog(userId);
            }).catch(error => {
                console.log(error);
            })
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
            // for(let i = 0; i < this.currentUser.authorities.length;i++){
            //     if(this.currentUser.authorities[i] == 'ROLE_ADMIN_ADDANDEDITUSERS_ACCEPT'){
            //         this.enableSetting = true;
            //     }
            // }
        },
        closePermissionDialog(){
            const tempArray = [];
            permissionsService.findUserByAccount(this.currentAccountId).then(result => {
                for (let i = 0; i<result.response.length;i++){
                    result.response[i].number = i;
                    var role = '';
                    var obj = result.response[i];
                    if (obj.groupPermission == null){
                        role = 'null'
                    }
                    else {
                        for (let k = 0; k < obj.groupPermission.length; k++){
                            role = role + ' ' + obj.groupPermission[k].name + ' | '
                        }
                    }
                    result.response[i].role = role;
                }
                for(let i = 0; i<result.response.length;i++){
                    if(result.response[i].role != 'null'){
                        tempArray.push(result.response[i]);
                    }
                }
                for (let i = 0; i<tempArray.length;i++){
                    if(this.users[i] != tempArray[i]){
                        this.users[i] = tempArray[i];
                    }
                }
                this.users = [...this.users];
            }).catch(error => {
                console.log(error)
            })
            this.search = ''
            this.permissionsDialog = false;
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
            // this.currentAccountId = this.idAccount;
        },
        goToUserAndTeamSettingPage(){
            let link = `/settings/${this.currentUser.accountId}/userandteam`;
            this.$router.push(link);
        }
    },
    created(){
        this.getCurrentUser();
        this.getListAccount();
        
    }
}
</script>
<style>

</style>