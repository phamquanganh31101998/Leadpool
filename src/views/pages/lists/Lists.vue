<template>
    <v-content class="mt-5 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <h1 class="ml-3">Danh sách các Lead</h1>
            </v-flex>
            <v-flex xs12 sm12 md7 lg6 xl6>
                <v-layout row>
                    <v-flex xs5 sm5 md5 lg5 xl5 offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <v-text-field append-icon="search" v-model="search" label="Tìm kiếm danh sách..." single-line hide-details></v-text-field>
                    </v-flex>
                
                    <v-flex xs2 md2 lg2 xl2>
                        <v-btn dark color="warning" @click="goToNewListPage()">Tạo mới</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        
        <v-divider class="mt-4" :divider="divider"></v-divider>
        <br>
        <br>
        <v-data-table
            :headers="headersLists"
            :items="lists"
            :search="search"
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
            listDetail: false,
            currentUser: null
        }
    },
    methods: {
        getList(){
            listService.getList(this.idAccount).then(result => {
                this.lists = result.response;
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
        },
    },
    created(){
        this.getCurrentUser();
        this.getList();
    }
}
</script>
<style>

</style>