<template>
    <v-content class="mt-5 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs2 sm2 md2 lg2 xl2>
                <v-btn outline color="indigo" @click="$router.push(`/contacts/${idAccount}/lists`)">
                    <v-icon>keyboard_arrow_left</v-icon>Danh sách
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <h1 class="ml-3">Chi tiết danh sách: {{list.name}}</h1>
            </v-flex>
            <v-flex xs12 sm12 md7 lg6 xl6>
                <v-layout row>
                    <v-flex xs5 sm5 md5 lg5 xl5 offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <v-text-field append-icon="search" v-model="search" label="Tìm kiếm Lead theo tên.." single-line hide-details></v-text-field>
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
        <v-layout row>
            <v-flex xs12 sm12 md3 lg3 xl3>
                <div class="conditions">
                    <v-card>
                        <v-card-text style="padding: 8px;">
                            <template v-for="(orCondition, orIndex) in list.conditions">
                                <v-card flat style="border: 1px solid #CCCCCC">
                                    <v-card-text style="padding: 4px 8px; margin: 4px 4px;">
                                        <template v-for="(andCondition, andIndex) in orCondition">
                                            <v-card flat style="border: 1px solid #7C98B6; background-color: #F5F8FA;">
                                                <v-card-text style="padding: 8px 8px;">
                                                    <p v-if="andCondition.condition == 'IN'"><span style="font-weight: bold">{{getPropertyName(andCondition.property)}}</span> có trong
                                                        <template v-for="val in andCondition.value">
                                                            <v-chip>{{val}}</v-chip>
                                                        </template>
                                                    </p>
                                                    <p v-if="andCondition.condition == 'EQUAL'"><span style="font-weight: bold">{{getPropertyName(andCondition.property)}}</span> là <span style="font-weight: bold">{{andCondition.value}}</span></p>
                                                    <p v-if="andCondition.condition == 'LIKE'"><span style="font-weight: bold">{{getPropertyName(andCondition.property)}}</span> chứa <span style="font-weight: bold">{{andCondition.value}}</span></p>
                                                    <p v-if="andCondition.condition == 'GREAT_THAN'"><span style="font-weight: bold">{{getPropertyName(andCondition.property)}}</span> lớn hơn <span style="font-weight: bold">{{andCondition.value}}</span></p>
                                                    <p v-if="andCondition.condition == 'LESS_THAN'"><span style="font-weight: bold">{{getPropertyName(andCondition.property)}}</span> nhỏ hơn <span style="font-weight: bold">{{andCondition.value}}</span></p>
                                                </v-card-text>
                                                <!-- <v-card-actions>
                                                    <div class="flex-grow-1"></div>
                                                    <v-btn class="red" outline round style="color: red;" @click="deleteAndCondition(orIndex, andIndex)">Xóa</v-btn>
                                                </v-card-actions> -->
                                            </v-card>
                                            <p v-if="andIndex < orCondition.length - 1">và</p>
                                        </template>
                                        <!-- <v-btn class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex)">AND</v-btn> -->
                                    </v-card-text>
                                </v-card>
                                <p v-if="orIndex < list.conditions.length - 1">hoặc</p>
                            </template>
                        </v-card-text>
                    </v-card>
                </div>
                
            </v-flex>
            <v-flex xs12 sm12 md9 lg9 xl9>
                <v-data-table
                    :headers="headersLists"
                    :items="contacts"
                    class="elevation-1 mt-6"
                    no-data-text="Không có kết quả nào phù hợp"
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
        <v-dialog v-model="failDialog" @click:outside="failDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Thất bại</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Đã có lỗi xảy ra khi lấy chi tiết danh sách. Xin hãy thử lại.
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="failDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
                    text: 'SỐ ĐIỆN THOẠI',
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
                    text: 'THUỘC SỞ HỮU',
                    align: 'left',
                    sortable: true,
                    value: 'contactOwner'
                },
                {
                    text: 'THÀNH PHỐ',
                    align: 'left',
                    sortable: true,
                    value: 'city'
                },
                {
                    text: 'NGÀNH NGHỀ',
                    align: 'left',
                    sortable: true,
                    value: 'bussiness'
                },
            ],
            list: null,
            newCondition: {
                contactProperties: [
                    {
                        text: 'Lifecycle Stage',
                        value: 'lifecycle_stage'
                    },
                    {
                        text: 'Lead Status',
                        value: 'lead_status'
                    },
                    {
                        text: 'Thuộc sở hữu',
                        value: 'contact_owner'
                    },
                    {
                        text: 'Số điện thoại',
                        value: 'phone_number'
                    },
                    {
                        text: 'Email',
                        value: 'email'
                    },
                    {
                        text: 'Thành phố',
                        value: 'city'
                    },
                    {
                        text: 'Ngành nghề',
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
            failDialog: false
        }
    },
    methods: {
        getPropertyName(value){
            let result = ''
            for(let i = 0; i<this.newCondition.contactProperties.length;i++){
                if(value == this.newCondition.contactProperties[i].value){
                    result = this.newCondition.contactProperties[i].text;
                }
            }
            return result;
        },
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
            }).catch(error => {
                console.log(error);
                this.failDialog = true;
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
        height: 600px;
        overflow-y: scroll;
    }
</style>