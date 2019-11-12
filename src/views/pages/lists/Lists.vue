<template>
    <v-content class="mt-5 pl-3 pr-3">
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
        
        <v-divider class="mt-4" :divider="divider" v-if="access"></v-divider>
        <br>
        <br>
        
        <v-layout v-if="access">
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-data-table
                    :headers="headersLists"
                    :items="lists"
                    :hide-headers="true"
                    class="elevation-1 mt-6"
                    v-if="!listDetail"
                    >
                    <template v-slot:items="props">
                        <td><a @click="goToListDetailPage(props.item.contactConditionGroupId)" style="font-size: 20px;">{{ props.item.name }}</a></td>
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
                <v-card flat>
                    <v-card-text style="background-color: #FDEDEE; border: 1px solid red;">
                        <v-card flat style="background-color: #FDEDEE">
                            <v-card-title>
                                <h2>Không có quyền truy cập</h2>
                            </v-card-title>
                            <v-card-text>
                                Bạn phải có quyền Xem tất cả các Lead mới có thể sử dụng chức năng này. Hãy liên hệ với Quản lý để được cấp quyền truy cập.
                            </v-card-text>
                        </v-card>
                    </v-card-text>
                </v-card>
                
            </v-flex>
        </v-layout>
    </v-content>
</template>
<script>
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
            search: '',
            headersLists: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'left',
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
        getList(){
            listService.getList(this.idAccount).then(result => {
                this.allLists = result.response;
                this.lists = result.response;
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
                if (role[i] == 'ROLE_CONTACT_VIEW_EVERYTHING'){
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
    }
}
</script>
<style>

</style>