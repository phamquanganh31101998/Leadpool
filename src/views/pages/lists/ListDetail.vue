<template>
    <v-content class="mt-5 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs2 sm2 md2 lg2 xl2>
                <v-btn outline color="indigo" @click="$router.push(`/contacts/${idAccount}/lists`)">
                    <v-icon>keyboard_arrow_left</v-icon>Lists<v-icon>list</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <h1 class="ml-3">List Detail: {{list.name}}</h1>
            </v-flex>
            <v-flex xs12 sm12 md7 lg6 xl6>
                <v-layout row>
                    <v-flex xs5 sm5 md5 lg5 xl5 offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <v-text-field append-icon="search" v-model="search" label="Search" single-line hide-details></v-text-field>
                    </v-flex>
                
                    <v-flex xs2 md2 lg2 xl2>
                        <v-btn dark color="warning" @click="goToNewListPage()">Create List</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-divider class="mt-4" :divider="divider"></v-divider>
        <br>
        <br>
        <v-layout row>
            <v-flex xs12 sm12 md3 lg3 xl3>
                <div class="conditions">
                    <v-card>
                        <v-card-text>
                            <template v-for="(orCondition, orIndex) in list.conditions">
                                <v-card>
                                    <v-card-text>
                                        <template v-for="(andCondition, andIndex) in orCondition">
                                            <v-card>
                                                <v-card-text>
                                                    <p v-if="andCondition.condition == 'IN'">{{andCondition.property}} is {{andCondition.condition}} 
                                                        <template v-for="val in andCondition.value">
                                                            <v-chip>{{val}}</v-chip>
                                                        </template>
                                                    </p>
                                                    <p v-if="andCondition.condition == 'EQUAL'">{{andCondition.property}} is {{andCondition.condition}} to {{andCondition.value}}</p>
                                                    <p v-if="andCondition.condition == 'LIKE'">{{andCondition.property}} is {{andCondition.condition}} {{andCondition.value}}</p>
                                                </v-card-text>
                                                <!-- <v-card-actions>
                                                    <div class="flex-grow-1"></div>
                                                    <v-btn class="red" outline round style="color: red;" @click="deleteAndCondition(orIndex, andIndex)">Xóa</v-btn>
                                                </v-card-actions> -->
                                            </v-card>
                                            <br>
                                            <p v-if="andIndex < orCondition.length - 1">And</p>
                                        </template>
                                        <!-- <v-btn class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex)">AND</v-btn> -->
                                    </v-card-text>
                                    <!-- <v-card-actions>
                                        <v-menu :close-on-content-click="false" :nudge-width="100" offset-x max-width="300">
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="blue" outline round style="color: blue;" v-on="on">AND</v-btn>
                                            </template>
                                            <v-card style="width: 100%;">
                                                <v-card-text>
                                                    <v-layout row wrap>
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-select :items="newCondition.contactProperties" label="Choose Contact Property" v-model="newCondition.chosenProperty"></v-select>
                                                        </v-flex>
                                                        <br>
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-select :items="newCondition.conditionConstants" label="Choose constant" v-model="newCondition.chosenConstant"></v-select>
                                                        </v-flex>
                                                        <br>
                                                        <v-flex xs12 sm12 md12 lg12 xl12 v-if="newCondition.chosenConstant == 'IN'">
                                                            <template v-for="(val, chipIndex) in newCondition.vchipValue">
                                                                <v-chip close @input="deleteChip(chipIndex)">{{val}}</v-chip>
                                                            </template>
                                                            <v-text-field v-model="newCondition.vchipTextField" @keyup.enter="addNewChip(newCondition.vchipTextField)" placeholder="Nhập rồi nhấn Enter"></v-text-field>
                                                            <v-text-field v-model="newCondition.vchipTextField" label="Nhập từ khóa" placeholder="Phân tách nhau bằng dấu phẩy"></v-text-field>
                                                            <v-btn class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, newCondition.chosenProperty, 'IN', newCondition.vchipValue)">AND</v-btn>
                                                            <v-btn class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, newCondition.chosenProperty, 'IN', newCondition.vchipTextField)">AND</v-btn>
                                                        </v-flex>
                                                        <v-flex xs12 sm12 md12 lg12 xl12 v-else>
                                                            <v-text-field v-model="newCondition.value" label="Value"></v-text-field>
                                                            <v-btn class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, newCondition.chosenProperty, newCondition.chosenConstant, newCondition.value)">AND</v-btn>
                                                        </v-flex>
                                                    </v-layout>
                                                    <v-layout>
                                                        <v-btn class="blue" outline round style="color: blue;" v-on="on" @click="addAndCondition(orIndex, newCondition.chosenProperty, newCondition.chosenConstant, newCondition.value, newCondition.vchipValue)">AND</v-btn>
                                                    </v-layout>
                                                </v-card-text>
                                            </v-card>
                                        </v-menu>
                                        <v-btn @click="deleteOrCondition(orIndex)" class="red" outline round style="color: red;">Xóa</v-btn>
                                    </v-card-actions> -->
                                </v-card>
                                <br>
                                <p v-if="orIndex < list.conditions.length - 1">Or</p>
                            </template>
                        </v-card-text>
                        <v-card-actions>
                            <!-- <v-btn class="blue" outline round style="color: blue;" @click="addOrCondition()">OR</v-btn> -->
                        </v-card-actions>
                    </v-card>
                </div>
                
            </v-flex>
            <v-flex xs12 sm12 md9 lg9 xl9>
                <v-data-table
                    :headers="headersLists"
                    :items="contacts"
                    class="elevation-1 mt-6"
                    >
                    <template v-slot:items="props">
                        <td><a @click.stop="goToContactPage(props.item.contactId)">{{ props.item.firstName }} {{props.item.lastName}}</a></td>
                        <td>{{ props.item.email }}</td>
                        <td>{{ props.item.phone }}</td>
                        <td>{{ props.item.lifecycleStage }}</td>
                        <td>{{ props.item.contactOwner }}</td>
                        <td>{{ props.item.city }}</td>
                        <td>{{ props.item.bussiness }}</td>
                
                    </template>
                    <template v-slot:no-results>
                        <v-alert :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                        </v-alert>
                    </template>
                </v-data-table>
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
        idList: {
            type: String,
            default: null,
        }
    },
    watch: {
        search(){
            this.contacts = [];
            for (let i = 0; i < this.allContacts.length; i++){
                const name = this.allContacts[i].firstName + ' ' + this.allContacts[i].lastName;
                if(name.toLowerCase().includes(this.search.toLowerCase())){
                    this.contacts.push(this.allContacts[i]);
                }
            }
        }
    },
    data(){
        return {
            currentUser: null,
            divider: true,
            search: '',
            allContacts: [
            ],
            contacts: [
                
            ],
            headersLists: [
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
                    text: 'PHONE',
                    align: 'left',
                    sortable: true,
                    value: 'phone'
                },
                {
                    text: 'LIFECYCLE STAGE',
                    align: 'left',
                    sortable: true,
                    value: 'lifecycleStage'
                },
                {
                    text: 'CONTACT OWNER',
                    align: 'left',
                    sortable: true,
                    value: 'contactOwner'
                },
                {
                    text: 'CITY',
                    align: 'left',
                    sortable: true,
                    value: 'city'
                },
                {
                    text: 'BUSINESS',
                    align: 'left',
                    sortable: true,
                    value: 'bussiness'
                },
            ],
            list: null,
            stringEx: '<p style="color: red;">Hello</p>',
            newCondition: {
                contactProperties: [
                    {
                        text: 'Lifecycle Stage',
                        value: 'lifecycle_stage'
                    },
                    // {
                    //     text: 'Lead Status',
                    //     value: 'lead_status'
                    // },
                    {
                        text: 'Contact Owner',
                        value: 'contact_owner'
                    },
                    {
                        text: 'Phone Number',
                        value: 'phone_number'
                    },
                    {
                        text: 'Email',
                        value: 'email'
                    },
                    {
                        text: 'City',
                        value: 'city'
                    },
                    {
                        text: 'Business',
                        value: 'bussiness'
                    }
                ],
                conditionConstants: [
                    'EQUAL', 'IN', 'LIKE'
                ],
                chosenProperty: 'lifecycle_stage',
                chosenConstant: 'EQUAL',
                value: '',
                vchipTextField: '',
                vchipValue: [],
                newConditionMenu: false
            },
            
            conditionsExample: 
            [
                [
                    {
                        "conditionId": null,
                        "object": "Contact",
                        "property": "city",
                        "condition": "EQUAL",
                        "value": "Hà Nội"
                    },
                    {
                        "conditionId": null,
                        "object": "Contact",
                        "property": "bussiness",
                        "condition": "IN",
                        "value": [
                            "Hải Hà", "công ty", "bốc họ"
                        ]
                    }
                ],
                [
                    {
                        "conditionId": null,
                        "object": "Contact",
                        "property": "lifecycle_stage",
                        "condition": "LIKE",
                        "value": "Lead"
                    }
                ]
            ],
            
        }
    },
    methods: {
        getAllContacts(){
            listService.getContactByListId(this.idAccount, this.idList).then(result => {
                this.allContacts = result.response;
                this.contacts = this.allContacts;
            })
        },
        getThisList(){
            listService.getList(this.idAccount).then(result => {
                const response = result.response;
                for (let i = 0; i < response.length; i++){
                    if(response[i].contactConditionGroupId == this.idList){
                        this.list = response[i];
                    }
                }
            }).then(() => {
                this.getAllContacts();
            })
        },
        goToContactPage(idContact){
            let link = `/contacts/${this.idAccount}/contact/${idContact}`;
            this.$router.push(link);
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
        },
        goToNewListPage(){
            let link = `/contacts/${this.currentUser.accountId}/lists/newList`
            this.$router.push(link);
        },
    },
    created(){
        this.getCurrentUser();
        this.getThisList();
    }
}
</script>
<style>
    div.conditions {
        height: 800px;
        overflow-y: scroll;
    }
</style>