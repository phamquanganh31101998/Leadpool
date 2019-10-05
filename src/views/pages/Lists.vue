<template>
    <v-content class="mt-5 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <h1 class="ml-3">Lists</h1>
            </v-flex>
            <v-flex xs12 sm12 md7 lg6 xl6>
                <v-layout row>
                    <v-flex xs5 sm5 md5 lg5 xl5 offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <v-text-field append-icon="search" v-model="search" label="Search" single-line hide-details></v-text-field>
                    </v-flex>
                
                    <v-flex xs2 md2 lg2 xl2>
                        <v-dialog max-width="600px">
                            <template v-slot:activator="{ on }">
                                <v-btn dark color="warning" v-on="on">Create List</v-btn>
                            </template>
                            <v-card>
                                <v-card-title style="background-color:#1E88E5;color:#fff">
                                    <span class="headline">Create contact</span>
                                </v-card-title>
                                <v-card-text>
                                    
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="primary">Create</v-btn>
                                    <v-btn color="warning">Close</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        
        <v-divider class="mt-4" :divider="divider"></v-divider>
        <v-data-table
            :headers="headersLists"
            :items="lists"
            :search="search"
            :hide-headers="true"
            class="elevation-1"
            v-if="!listDetail"
            >
            <template v-slot:header>
                <td :colspan="headersLists.length">
                    <strong>This is an extra footer</strong>
                </td>
            </template>
            <template v-slot:items="props">
                <td><a @click="goToListDetailPage(props.item.contactConditionGroupId)" style="font-size: 20px;">{{ props.item.name }}</a></td>
            </template>
            <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
                </v-alert>
            </template>
        </v-data-table>
    </v-content>
</template>
<script>
import listService from '../../services/list.services'
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
            lists: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '1%'
                },
            ],
            listDetail: false,
            currentUser: null
        }
    },
    methods: {
        getList(){
            listService.getList(this.idAccount).then(result => {
                console.log(result);
                this.lists = result.response;
            })
        },
        goToListDetailPage(idList){
            let link = `/contacts/${this.currentUser.accountId}/lists/${idList}`
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