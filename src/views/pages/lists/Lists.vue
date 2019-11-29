<template>
    <v-content class="mt-4 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <h1 class="ml-3"> Quản lý danh sách các Lead</h1>
            </v-flex>
            <v-flex xs12 sm12 md7 lg6 xl6 v-if="access">
                <v-layout row>
                    <v-flex xs5 sm5 md5 lg5 xl5 offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <v-text-field append-icon="search" v-model="search" label="Tìm kiếm danh sách..." single-line hide-details></v-text-field>
                    </v-flex>
                    <v-flex xs2 md2 lg2 xl2>
                        <v-btn dark color="#3E82F7" @click="goToNewListPage()"> <v-icon>list</v-icon> Tạo mới</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <br>
        <v-divider class="mt-4" :divider="divider"></v-divider>
        <v-dialog v-model="deleteListDialog.dialog" @click:outside="deleteListDialog.dialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Xóa?</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Bạn có chắc chắn muốn xóa Lead này?
                </v-card-text>
                <v-card-actions>
                    <v-btn flat color="red" @click="deleteList(deleteListDialog.id)">Xóa</v-btn>
                    <v-btn flat color="primary" @click="deleteListDialog.dialog = false, deleteListDialog.id = ''">Quay lại</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-layout v-if="access">
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-data-table
                        no-data-text="Không có dữ liệu" rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]"
                        :headers="headersLists"
                        :items="lists"
                        class="elevation-1 mt-6"
                        v-if="!listDetail"
                    >
                    <template v-slot:items="props">
                        <td>{{ props.item.name }}</td>
                        <td>{{props.item.createdBy}}</td>
                        <td>{{coverTime(props.item.createdAt)}}</td>
                        <v-menu>
                            <template v-slot:activator="{ on }">
                                <td class="text-xs-right" ><v-btn flat fab small v-on="on"><v-icon>more_vert</v-icon></v-btn> </td>
                            </template>
                            <v-list>
                                <v-list-tile @click="goToListDetailPage(props.item.contactConditionGroupId)">
                                    <v-list-tile-content>Xem chi tiết</v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile @click="confirmDeleteList(props.item.contactConditionGroupId)">
                                    <v-list-tile-content>Xóa danh sách</v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </template>
                    <template v-slot:no-results>
                        <v-alert :value="true" color="error" icon="warning">
                        Không có kết quả khi tìm kiếm với "{{ search }}"
                        </v-alert>
                    </template>
                </v-data-table>
            </v-flex>
            
            <v-dialog v-model="failDialog" @click:outside="failDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
                <v-card tile>
                    <v-toolbar card dark color="red">
                        <v-toolbar-title>Thất bại</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        Đã có lỗi xảy ra khi lấy các danh sách. Xin hãy thử lại.
                    </v-card-text>
                    <v-card-actions>
                    <v-btn flat color="red" @click="failDialog = false">OK</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <v-layout v-else>
            
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-layout style="height: 350px;">
                    <v-flex xs3 sm3 md3 lg3 xl3 offset-xs1 offset-sm1 offset-md1 offset-lg1 offset-xl1>
                        <v-card flat style="height: 350px; margin-top: 100px;" >
                            <v-card-text style="height: 350px; background-color: #FDEDEE; border: 1px solid red;">
                                <v-card flat style="background-color: #FDEDEE; vertical-align: middle">
                                    <v-card-title>
                                        <h2>Không có quyền truy cập</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        Bạn phải có quyền <span style="font-weight: bold">Xem tất cả</span> đối với Lead thì mới có thể sử dụng chức năng này.
                                        <br>
                                        Hãy liên hệ với Quản lý để được cấp quyền truy cập.
                                    </v-card-text>
                                </v-card>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs8 sm8 md8 lg8 xl8>
                        <v-card flat style="height: 500px; margin-top: 100px;">
                            <v-img alt="ảnh ở đây" width="100%" src="../../../../list.png"></v-img>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-content>
</template>
<script>
import moment from 'moment'
import listService from '../../../services/list.services'
export default {
    props: {
        idAccount: {
            type: String,
            default: null,
        },
    },
    data(){
        return{
            deleteListDialog: {
                dialog: false,
                id: ''
            },
            search: '',
            headersLists: [
                {
                    text: 'TÊN DANH SÁCH',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                {
                    text: 'NGƯỜI TẠO',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                {
                    text: 'NGÀY TẠO',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                {
                    text: 'HÀNH ĐỘNG',
                    align: 'right',
                    sortable: false,
                    value: 'name'
                },
            ],
            lists: [],
            allLists: [],
            listDetail: false,
            currentUser: null,
            failDialog: false,
            divider: true,
            access: false,
        }
    },
    watch: {
        search(){
            this.lists = [];
            for (let i = 0; i < this.allLists.length; i++){
                if (this.normalText(this.allLists[i].name.toLowerCase()).includes(this.normalText(this.search.toLowerCase().trim()))){
                    this.lists.push(this.allLists[i])
                }
            }
        }
    },
    methods: {
        confirmDeleteList(id){
            this.deleteListDialog.id = id;
            this.deleteListDialog.dialog = true;
        },
        deleteList(id){
            listService.deleteList(this.idAccount, id).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`);
                    this.getList();
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                this.deleteListDialog.dialog = false;
                this.deleteListDialog.id = '';
            }).catch(error => {
                console.log(error);
            })
        },
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        coverTime(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        getList(){
            listService.getList(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    this.allLists = result.response.reverse();
                    this.lists = this.allLists;
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            })
        },
        goToListDetailPage(idList){
            let link = `/contacts/${this.currentUser.accountId}/lists/${idList}`
            this.$router.push(link);
        },
        goToNewListPage(){
            let link = `/contacts/${this.currentUser.accountId}/lists/newList`
            this.$router.push(link);
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
            let role = this.currentUser.authorities;
            for (let i = 0; i < role.length;i++){
                if (role[i] == 'ROLE_CONTACT_VIEW_EVERYTHING' || role[i] == 'ROLE_SYSADMIN_SYSADMIN_ACCEPT'){
                    this.access = true;
                }
            }
            if (this.access == true){
                this.getList()
            }
        },
        normalText(str){
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
        },
    },
    created(){
        this.getCurrentUser();
        // this.getList();
        this.$store.state.colorNumber = 1;
    }
}
</script>
<style>

</style>