<template>
    <v-content>
        <v-layout row wrap class="mt-5 pl-5 pr-5">
            <v-flex xs12 sm12 md12 lg12 xl12>
                <h1 class="ml-3">Settings</h1>
            </v-flex>
        </v-layout>
        <v-divider class="mt-5" :divider="divider"></v-divider>
        <v-layout row wrap class="mt-5 pl-5 pr-5">
            <v-flex xs3 sm3 md3 lg3 xl3>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-content>
                            Sales
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content style="fontStyle: bold;">
                            Users & Teams
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
            <v-flex xs9 sm9 md9 lg9 xl9>
                <h1>Users & Teams</h1>
                <br>
                Create new users, customize user permissions, and remove users from your account.
                <br>
                <br>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-data-table :headers="headers" :items="users">
                            <template v-slot:items="props">
                                <td><a style="color: blue;" @click="openPermissionDialog(props.item.number)">{{ props.item.displayName }}</a></td>
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
                                        <h3>Contacts Access</h3>
                                        <p>All users have a basic level of access. The permissions below apply to contacts, companies, and tasks.</p>
                                        <div style="border: 1px solid #E0E0E0">
                                            <v-layout row wrap>
                                                <v-flex xs9 sm9 md9 lg9 xl9 class="mt-4 pl-4">
                                                    View
                                                </v-flex>
                                                <v-flex xs3 sm3 md3 lg3 xl3 class="pr-4">
                                                    <v-select :disabled="!enableSetting" v-model="contactAccessLevelEx1" style="width: 100%; color: #0091AE;" :items="contactAccessLevels" @input="updateContactAccessLevel(openUser.userId, '5d1dd9c7f0aa6114b40507b3', contactAccessLevelEx1)"></v-select>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                        <div style="border: 1px solid #E0E0E0">
                                            <v-layout row wrap>
                                                <v-flex xs9 sm9 md9 lg9 xl9 class="mt-4 pl-4">
                                                    Communicate
                                                </v-flex>
                                                <v-flex xs3 sm3 md3 lg3 xl3 class="pr-4">
                                                    <v-select :disabled="!enableSetting" style="width: 100%; color: #0091AE;" v-model="contactAccessLevelEx2" :items="contactAccessLevels" @input="updateContactAccessLevel(openUser.userId, '5d1dd9d9f0aa6114b40507b4', contactAccessLevelEx2)"></v-select>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                        <div style="border: 1px solid #E0E0E0">
                                            <v-layout row wrap>
                                                <v-flex xs9 sm9 md9 lg9 xl9 class="mt-4 pl-4">
                                                    Edit
                                                </v-flex>
                                                <v-flex xs3 sm3 md3 lg3 xl3 class="pr-4"> 
                                                    <v-select :disabled="!enableSetting" style="width: 100%; color: #0091AE;" v-model="contactAccessLevelEx3" :items="contactAccessLevels" @input="updateContactAccessLevel(openUser.userId, '5d1dd9e5f0aa6114b40507b5', contactAccessLevelEx3)"></v-select>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                        
                                    </v-tab-item>
                                    <v-tab-item value="tab2">
                                        <div>
                                            <v-layout row wrap>
                                                <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4">
                                                    <h3>Admin Access</h3>
                                                    <p>Set access to account configuration and user management.</p>
                                                </v-flex>
                                                <v-flex xs2 sm2 md2 lg2 xl2>
                                                    <v-switch :disabled="!enableSetting" v-model="isAdmin" @change="changeAdminAccessLevel(openUser.userId, isAdmin)"></v-switch>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                        
                                        <template v-if="isAdmin">
                                            <div style="border: 1px solid #E0E0E0">
                                                <v-layout row wrap>
                                                    <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                        Add & Edit Users
                                                    </v-flex>
                                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                                        <v-switch :disabled="!enableSetting" v-model="AddAndEditUsers" @change="updateAdminAccessLevel(openUser.userId, '5d2559f577201a474d72eac9', AddAndEditUsers)"></v-switch>
                                                    </v-flex>
                                                </v-layout>
                                            </div>
                                            <div style="border: 1px solid #E0E0E0">
                                                <v-layout row wrap>
                                                    <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                        Add & Edit Teams
                                                    </v-flex>
                                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                                        <v-switch :disabled="!enableSetting" v-model="AddAndEditTeams" @change="updateAdminAccessLevel(openUser.userId, '5d255a0d77201a474d72eaca', AddAndEditTeams)"></v-switch>
                                                    </v-flex>
                                                </v-layout>
                                            </div>
                                            <div style="border: 1px solid #E0E0E0">
                                                <v-layout row wrap>
                                                    <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                        Partition By Teams
                                                    </v-flex>
                                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                                        <v-switch :disabled="!enableSetting" v-model="PartitionByTeams" @change="updateAdminAccessLevel(openUser.userId, '5d255a5077201a474d72eacb', PartitionByTeams)"></v-switch>
                                                    </v-flex>
                                                </v-layout>
                                            </div>
                                            <div style="border: 1px solid #E0E0E0">
                                                <v-layout row wrap>
                                                    <v-flex xs10 sm10 md10 lg10 xl10 class="mt-4 pl-4">
                                                        Edit Account Defaults
                                                    </v-flex>
                                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                                        <v-switch :disabled="!enableSetting" v-model="EditAccountDefaults" @change="updateAdminAccessLevel(openUser.userId, '5d255a8477201a474d72eacc', EditAccountDefaults)"></v-switch>
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
                    <v-btn @click="closePermissionDialog()" flat style="color: red;">Close</v-btn>
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
                    text: 'NAME',
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
                    text: 'ROLE',
                    align: 'left',
                    sortable: true,
                    value: 'role'
                },
            ],
            users: [],
            openUser: {
                "userId": '',
                "accountId": '',
                "teamId": '',
                "groupPermission": [],
                "userLogin": '',
                "userEmail": '',
                "userPhone": 0,
                "displayName": '',
                "userPass": '',
                "userAvatar": "https://lh6.googleusercontent.com/-n4NhykJUtpI/AAAAAAAAAAI/AAAAAAAAAJI/y8obm2aTP1Y/photo.jpg",
                "createdAt": "2019-07-10T06:54:54.867+0000",
                "updateAt": "2019-07-10T09:42:42.433+0000"
            },
            contactAccessLevels: [
                {
                    text: 'Team Only',
                    value: 'teamOnly'
                },
                {
                    text: 'Owned Only',
                    value: 'ownedOnly'
                },
                {
                    text: 'Everything',
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
        openPermissionDialog(number){
            for(let i = 0; i<this.users.length;i++){
                if(this.users[i].number == number){
                    this.openUser = this.users[i];
                }
            }
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