<template>
    <v-content>
        <v-layout row wrap class="mt-3 pl-2 pr-5">
            <v-flex xs12 sm12 md12 lg12 xl12>
                <h1 class="ml-3">Cài đặt</h1>
            </v-flex>
        </v-layout>
        <v-divider class="mt-5" :divider="divider"></v-divider>
        <v-layout row wrap class="mt-2 pl-2 pr-5">
            <v-flex xs2 sm2 md2 lg2 xl2>
                <v-list>
                    <!-- <v-list-tile>
                        <v-list-tile-content>
                            Sales
                        </v-list-tile-content>
                    </v-list-tile> -->
                    <v-list-tile @click="goToMyInfoPage()">
                        <v-list-tile-content>
                            Tài khoản của tôi
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="goToUserAndTeamSettingPage()">
                        <v-list-tile-content>
                            Tài khoản và nhóm
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content  style="font-weight: bold;">
                            Cài đặt tổ chức
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
                <h1>Cài đặt tổ chức </h1>
                <v-layout row wrap v-if="access">
                    <v-card flat width="100%">
                        <v-card-title>
                            <v-layout row wrap>
                            </v-layout>
                        </v-card-title>
                        <v-card-text>
                            <v-card>
                                <v-card-title>
                                    <v-layout row wrap>
                                        <v-flex xs5 sm5 md5 lg5 xl5>
                                            <h2 class="pt-4 ml-4">Các dịch vụ hiện tại của tổ chức</h2>
                                        </v-flex>
                                        <v-flex xs2 sm2 md2 lg2 xl2>
                                            <v-btn round class="mt-3"
                                                @click="createService.dialog = true"
                                                color="#3E82F7"
                                                dark>
                                                <v-icon>add</v-icon>
                                                Thêm dịch vụ mới    
                                            </v-btn>
                                        </v-flex>
                                        <v-flex xs3 offset-xs1 sm3 offset-sm1 md3 offset-md1 lg3 offset-xl1 xl3 offset-1>
                                            <v-text-field append-icon="search" v-model="search" placeholder="Tìm kiếm dịch vụ theo tên"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-card-title>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-data-table :loading="loadingTable" style="width: 100%" rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]" :headers="headers" :items="displayService" no-data-text="Tổ chức này chưa có dịch vụ nào">
                                            <template v-slot:items="props">
                                                <td>{{ props.item.name }}</td>
                                                <td>{{ coverTimeDetail(props.item.createdAt) }}</td>
                                                <v-menu>
                                                    <template v-slot:activator="{ on }">
                                                        <td class="text-xs-right" ><v-btn flat fab small v-on="on"><v-icon>more_vert</v-icon></v-btn> </td>
                                                    </template>
                                                    <v-list>
                                                        <v-list-tile @click="confirmRenameService(props.item.accountServiceId)">
                                                            <v-list-tile-content>Đổi tên</v-list-tile-content>
                                                        </v-list-tile>
                                                        <v-list-tile @click="confirmDeleteService(props.item.accountServiceId)">
                                                            <v-list-tile-content>Xóa dịch vụ</v-list-tile-content>
                                                        </v-list-tile>
                                                    </v-list>
                                                </v-menu>
                                                <!-- <td><v-btn flat round outline color="primary" @click="openPermissionDialog(props.item.userId)">Thiết lập quyền</v-btn></td> -->
                                            </template>
                                        </v-data-table>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-card-text>
                    </v-card>
                    <v-card flat width="100%">
                        <v-card-title>
                            <v-layout row wrap>
                                
                            </v-layout>
                        </v-card-title>
                        <v-card-text>
                            <v-card>
                                <v-card-title>
                                    <v-layout row wrap>
                                        <v-flex xs3 sm3 md3 lg3 xl3  class="mt-4">
                                            <h2>Các quốc gia hiện tại đang có</h2>
                                        </v-flex>
                                        <v-flex xs6 sm6 md6 lg6 xl6  class="mt-3">
                                            <multi-select :options="allCountry"
                                                :selected-options="country"
                                                @select="onSelect"
                                                option-value="value"
                                                option-text="text"
                                                placeholder="Chọn quốc gia">
                                            </multi-select>
                                        </v-flex>
                                        <v-flex xs2 offset-xs1 sm2 md2 lg2 xl2>
                                            <v-btn round class="mt-3"
                                                color="#3E82F7"
                                                @click="updateAccountCountry()"
                                                dark :disabled="country.length == 0">
                                                Cập nhật quốc gia  
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-card-title>
                                <v-card-text>
                                    
                                </v-card-text>
                            </v-card>
                        </v-card-text>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                    </v-card>
                    
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
                                        Bạn phải có quyền <span style="font-weight: bold">Cấu hình tổ chức mặc định</span> thì mới có thể sử dụng chức năng này. Hãy liên hệ với Admin
                                    </v-card-text>
                                </v-card>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-dialog v-model="rename.dialog" width="30%" persistent>
                <v-card>
                    <v-card-title style="background-color:#1E88E5;color:#fff">
                        <span class="headline">Đổi tên dịch vụ</span>
                    </v-card-title>
                    <v-card-text>
                        <span class="mt-4"><strong>Nhập tên mới </strong></span>
                        <v-form v-model="rename.validName">
                            <span class="ml-4"><v-text-field :rules="nameRules" v-model="rename.newName"></v-text-field></span>
                        </v-form>
                    </v-card-text>
                    <v-divider :divider="divider"></v-divider>
                    <v-card-actions>
                        <v-btn flat color="primary" :disabled="!rename.validName" @click="renameService()">Đổi tên</v-btn>
                        <v-btn flat color="red" @click="rename.dialog = false">Đóng</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="createService.dialog" width="30%" persistent>
                <v-card>
                    <v-card-title style="background-color:#1E88E5;color:#fff">
                        <span class="headline">Thêm dịch vụ mới</span>
                    </v-card-title>
                    <v-card-text>
                        <span class="mt-4"><strong>Nhập tên dịch vụ </strong></span>
                        <v-form v-model="createService.validName">
                            <span class="ml-4"><v-text-field :rules="nameRules" v-model="createService.name"></v-text-field></span>
                        </v-form>
                    </v-card-text>
                    <v-divider :divider="divider"></v-divider>
                    <v-card-actions>
                        <v-btn flat color="primary" :disabled="!createService.validName" @click="createNewService()">Tạo</v-btn>
                        <v-btn flat color="red" @click="createService.dialog = false, createService.name = ''">Đóng</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="deleteDialog.dialog" persistent transition="dialog-bottom-transition" scrollable width="30%">
                <v-card tile>
                    <v-toolbar card dark color="red">
                        <v-toolbar-title>Xác nhận xóa</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        Bạn có chắc chắn muốn xóa dịch vụ này?
                    </v-card-text>
                    <v-card-actions>
                        <v-btn flat color="red" @click="deleteService(deleteDialog.id)" >XÓA</v-btn>
                        <v-btn flat color="primary" @click="deleteDialog.dialog = false, deleteDialog.id = ''">Đóng</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-content>
</template>
<script>
import moment from 'moment';
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
            this.displayService = [];
            for (let i = 0; i < this.allService.length; i++){
                if (this.normalText(this.allService[i].name.toLowerCase()).includes(this.normalText(this.search.toLowerCase().trim()))){
                    this.displayService.push(this.allService[i])
                }
            }
        }
    },
    data(){
        return {
            loadingTable: false,
            allCountry: [],
            country: [],
            isSysadmin: false,
            search: '',
            access: false,
            nameRules: [
                v => !!v || 'Không được để trống',
            ],
            divider: true,
            access: false,
            currentUser: null,
            allService: [],
            displayService: [],
            headers: [
                {
                    text: 'TÊN DỊCH VỤ',
                    align: 'left',
                    // sortable: false,
                    value: 'name'
                },
                {
                    text: 'NGÀY TẠO',
                    align: 'left',
                    // sortable: false,
                    value: 'createdAt'
                },
                {
                    text: 'HÀNH ĐỘNG',
                    align: 'right',
                    sortable: false,
                    value: 'role'
                },
            ],
            rename: {
                validName: true,
                dialog: false,
                newName: '',
                service: {}
            },
            deleteDialog: {
                dialog: false,
                id: ''
            },
            createService: {
                validName: false,
                name: '',
                dialog: false
            }
        }
    },
    methods: {
        createNewService(){
            let body = {
                name: this.createService.name
            }
            serviceAPI.createService(this.idAccount, body).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                    this.getService();
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                this.createService.dialog = false;
                this.createService.name = '';
                this.deleteDialog.id = '';
                this.deleteDialog.dialog = false;
            });
            this.search = '';
        },
        deleteService(id){
            serviceAPI.deleteService(this.idAccount, id).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                    this.getService();
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                this.deleteDialog.id = '';
                this.deleteDialog.dialog = false;
            })
            this.search = '';
        },
        confirmDeleteService(id){
            this.deleteDialog.id = id;
            this.deleteDialog.dialog = true;
        },
        confirmRenameService(id){
            for (let i = 0; i < this.allService.length;i++){
                if (this.allService[i].accountServiceId == id){
                    this.rename.service = this.allService[i];
                    this.rename.newName = this.rename.service.name;
                }
            }
            this.rename.dialog = true;
        },
        renameService(){
            let obj = this.rename.service;
            obj.name = this.rename.newName;
            let body = {
                name: obj.name
            }
            serviceAPI.updateService(this.idAccount, obj.accountServiceId, body).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                    this.rename.service = {};
                    this.rename.newName = '';
                    this.rename.dialog = false;
                    let tempArr = [];
                    serviceAPI.getService(this.idAccount).then(result => {
                        if(result.code == 'SUCCESS'){
                            tempArr = result.response.reverse();
                            for (let i = 0; i < tempArr.length; i++){
                                if(tempArr[i] != this.allService[i]){
                                    this.allService[i] = tempArr[i];
                                }
                            }
                            this.allService = [...this.allService];
                            this.displayService = this.allService;
                        }
                        else {
                            dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                        }
                    }).catch(error => {
                        console.log(error);
                })
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            })
            this.search = '';
        },
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('YYYY/MM/DD, HH:mm')
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
        goToMyInfoPage(){
            let link = `/settings/${this.currentUser.accountId}/myinfo`;
            this.$router.push(link);
        },
        updateAccountCountry(){
            let body = [];
            for (let i = 0; i < this.country.length; i++){
                body.push(this.country[i].value)
            }
            accountAPI.updateAccountCountry(this.idAccount, body).then(result => {
                let time = moment();
                const {
                    dispatch
                } = this.$store;
                if (result.code == "SUCCESS") {
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                } else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            })
        },
        onSelect(items){
            this.country = items;
            console.log(this.country)
        },
        getAccountInfo(){
            this.country = [];
            accountAPI.getAccountInfo(this.idAccount).then(result => {
                let time = moment();
                const {
                    dispatch
                } = this.$store;
                if (result.code == "SUCCESS") {
                    let country = result.response.country;
                    for(let i = 0; i < country.length; i++){
                        this.country.push(this.getCountryFromAllCountry(country[i]))
                    }
                } else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            })
        },
        getCountryFromAllCountry(code){
            let obj = {};
            for(let i = 0; i < this.allCountry.length;i++){
                if(code == this.allCountry[i].value){
                    obj = this.allCountry[i]
                    break;
                }
            }
            return obj;
        },
        getAllCountry(){
            this.allCountry = [];
            accountAPI.getCountryCode(this.idAccount).then(result => {
                let time = moment();
                const {
                    dispatch
                } = this.$store;
                if (result.code == "SUCCESS") {
                    let res = result.response;
                    for (let i = 0; i < res.length; i++){
                        let obj = {
                            text: res[i].name,
                            value: res[i].code
                        }
                        this.allCountry.push(obj);
                    }
                } else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.getAccountInfo();
            })
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
            let role = this.currentUser.authorities;
            if(role.includes('ROLE_SYSADMIN_SYSADMIN_ACCEPT')){
                this.isSysadmin = true;
            }
            if(role.includes('ROLE_ADMIN_EDITACCOUNTDEFAULTS_ACCEPT') || role.includes('ROLE_SYSADMIN_SYSADMIN_ACCEPT')){
                this.access = true;
            }
            if(this.access == true){
                this.getService();
                this.getAllCountry();
            }
            
        },
        getService(){
            this.loadingTable = true;
            serviceAPI.getService(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    this.allService = result.response.reverse();
                    this.displayService = this.allService;
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.loadingTable = false;
            })
            this.search = '';
        }
    },
    created(){
        this.$store.state.colorNumber = 9;
        this.getCurrentUser();
    }
}
</script>
<style scoped>

</style>