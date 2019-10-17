<template>
    <v-content>
        <v-layout row wrap class="mt-5 pl-5 pr-5">
            <v-flex xs12 sm12 md12 lg12 xl12>
                <h1 class="ml-3">Cài đặt</h1>
            </v-flex>
        </v-layout>
        <v-divider class="mt-5" :divider="divider"></v-divider>
        <v-layout row wrap class="mt-5 pl-5 pr-5">
            <v-flex xs3 sm3 md3 lg3 xl3>
                <v-list>
                    <!-- <v-list-tile>
                        <v-list-tile-content>
                            Sales
                        </v-list-tile-content>
                    </v-list-tile> -->
                    <v-list-tile>
                        <v-list-tile-content style="font-weight: bold;">
                            Người dùng và nhóm
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
            <v-flex xs9 sm9 md9 lg9 xl9>
                <h1>Người dùng và nhóm</h1>
                <br>
                Tạo, chỉnh sửa, xóa người dùng khỏi tài khoản của bạn
                <br>
                <br>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-data-table :headers="headers" :items="users">
                            <template v-slot:items="props">
                                <td><a style="color: blue;" @click="openPermissionDialog(props.item.userId)">{{ props.item.displayName }}</a></td>
                                <td>{{ props.item.userEmail }}</td>
                                <td>{{ props.item.role }}</td>
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
                                <br>
                                <v-tabs>
                                    <v-tab href="#tab1">Contacts</v-tab>
                                    <v-tab href="#tab2">Admin</v-tab>
                                    <v-tab-item value="tab1">
                                        <br>
                                        <h3>Quyền liên lạc</h3>
                                        <p>Tất cả các tài khoản đều có quyền truy cập cơ bản dưới đây. Các quyền này áp dụng cho liên lạc, công ty, công việc</p>
                                        <div style="border: 1px solid #E0E0E0">
                                            <v-layout row wrap>
                                                <v-flex xs9 sm9 md9 lg9 xl9 class="mt-4 pl-4">
                                                    Xem
                                                </v-flex>
                                                <v-flex xs3 sm3 md3 lg3 xl3 class="pr-4">
                                                    <v-select :disabled="!enableSetting" v-model="openUser.contactPer.view" style="width: 100%; color: #0091AE;" :items="contactAccessLevels" @input="updateContactAccessLevel(openUser.userId, '5d1dd9c7f0aa6114b40507b3', openUser.contactPer.view)"></v-select>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                        <div style="border: 1px solid #E0E0E0">
                                            <v-layout row wrap>
                                                <v-flex xs9 sm9 md9 lg9 xl9 class="mt-4 pl-4">
                                                    Communicate
                                                </v-flex>
                                                <v-flex xs3 sm3 md3 lg3 xl3 class="pr-4">
                                                    <v-select :disabled="!enableSetting" style="width: 100%; color: #0091AE;" v-model="openUser.contactPer.communicate" :items="contactAccessLevels" @input="updateContactAccessLevel(openUser.userId, '5d1dd9d9f0aa6114b40507b4', openUser.contactPer.communicate)"></v-select>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                        <div style="border: 1px solid #E0E0E0">
                                            <v-layout row wrap>
                                                <v-flex xs9 sm9 md9 lg9 xl9 class="mt-4 pl-4">
                                                    Sửa
                                                </v-flex>
                                                <v-flex xs3 sm3 md3 lg3 xl3 class="pr-4"> 
                                                    <v-select :disabled="!enableSetting" style="width: 100%; color: #0091AE;" v-model="openUser.contactPer.edit" :items="contactAccessLevels" @input="updateContactAccessLevel(openUser.userId, '5d1dd9e5f0aa6114b40507b5', openUser.contactPer.edit)"></v-select>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                        
                                    </v-tab-item>
                                    <v-tab-item value="tab2">
                                        <div>
                                            <v-layout row wrap>
                                                <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4">
                                                    <h3>Quyền Admin</h3>
                                                    <p>Thiết lập quyền để tùy chỉnh tài khoản và quản lý người dùng</p>
                                                </v-flex>
                                                <v-flex xs2 sm2 md2 lg2 xl2>
                                                    <v-switch :disabled="!enableSetting" v-model="openUser.isAdmin" @change="changeAdminAccessLevel(openUser.userId, openUser.isAdmin)"></v-switch>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                        
                                        <template v-if="openUser.isAdmin">
                                            <div style="border: 1px solid #E0E0E0">
                                                <v-layout row wrap>
                                                    <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                        Thêm & tùy chỉnh người dùng
                                                    </v-flex>
                                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                                        <v-switch :disabled="!enableSetting" v-model="openUser.adminPer.AddAndEditUsers" @change="updateAdminAccessLevel(openUser.userId, '5d2559f577201a474d72eac9', openUser.adminPer.AddAndEditUsers)"></v-switch>
                                                    </v-flex>
                                                </v-layout>
                                            </div>
                                            <div style="border: 1px solid #E0E0E0">
                                                <v-layout row wrap>
                                                    <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                        Thêm & tùy chỉnh nhóm
                                                    </v-flex>
                                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                                        <v-switch :disabled="!enableSetting" v-model="openUser.adminPer.AddAndEditTeam" @change="updateAdminAccessLevel(openUser.userId, '5d255a0d77201a474d72eaca', openUser.adminPer.AddAndEditTeam)"></v-switch>
                                                    </v-flex>
                                                </v-layout>
                                            </div>
                                            <div style="border: 1px solid #E0E0E0">
                                                <v-layout row wrap>
                                                    <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                        Chia theo nhóm
                                                    </v-flex>
                                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                                        <v-switch :disabled="!enableSetting" v-model="openUser.adminPer.PartitionByTeams" @change="updateAdminAccessLevel(openUser.userId, '5d255a5077201a474d72eacb', openUser.adminPer.PartitionByTeams)"></v-switch>
                                                    </v-flex>
                                                </v-layout>
                                            </div>
                                            <div style="border: 1px solid #E0E0E0">
                                                <v-layout row wrap>
                                                    <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                        Chỉnh sửa tài khoản mặc định
                                                    </v-flex>
                                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                                        <v-switch :disabled="!enableSetting" v-model="openUser.adminPer.EditAccountDefaults" @change="updateAdminAccessLevel(openUser.userId, '5d255a8477201a474d72eacc', openUser.adminPer.EditAccountDefaults)"></v-switch>
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
    </v-content>
</template>
<script>
import permissionsService from '../../../services/permissions.service'
export default {
    props: {
        idAccount: {
            type: String,
            default: null,
        },
    },
    data(){
        return {
            divider: true,
            permissionsDialog: false,
            headers: [
                {
                    text: 'TÊN',
                    align: 'left',
                    sortable: true,
                    value: 'name'
                },
                {
                    text: 'EMAIL',
                    align: 'left',
                    sortable: true,
                    value: 'email'
                },
                {
                    text: 'QUYỀN',
                    align: 'left',
                    sortable: true,
                    value: 'role'
                },
            ],
            users: [],
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
                    text: 'Thuộc nhóm',
                    value: 'TeamOnly'
                },
                {
                    text: 'Thuộc cá nhân',
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
            currentUser: null,
            enableSetting: false
        }
    },
    methods: {
        findUserByAccount(){
            permissionsService.findUserByAccount(this.idAccount).then(result => {
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
                            role = role + ' ' + obj.groupPermission[k].name + ' | '
                        }
                    }
                    result.response[i].role = role;
                }
                for(let i = 0; i<result.response.length;i++){
                    if(result.response[i].role != 'null'){
                        this.users.push(result.response[i]);
                    }
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
            console.log(this.currentUser)
            for(let i = 0; i < this.currentUser.authorities.length;i++){
                if(this.currentUser.authorities[i] == 'ROLE_ADMIN_ADDANDEDITUSERS_ACCEPT'){
                    this.enableSetting = true;
                }
            }
        },
        closePermissionDialog(){
            const tempArray = [];
            permissionsService.findUserByAccount(this.idAccount).then(result => {
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
            this.permissionsDialog = false;
        }
    },
    created(){
        this.getCurrentUser();
        this.findUserByAccount()
    }
}
</script>
<style>

</style>