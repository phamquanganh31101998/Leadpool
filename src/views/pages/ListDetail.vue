<template>
    <v-content class="mt-5 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <h1 class="ml-3">List Detail</h1>
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
        <br>
        <br>
        <v-layout row>
            <v-flex xs12 sm12 md3 lg3 xl3>
                <div class="conditions">
                    <v-card>
                        <v-card-text>
                            <template v-for="(orCondition, orIndex) in conditionsExample">
                                <v-card>
                                    <v-card-text >
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
                                                <v-card-actions>
                                                    <div class="flex-grow-1"></div>
                                                    <v-btn class="red" outline round style="color: red;" @click="deleteAndCondition(orIndex, andIndex)">Xóa</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                            <br>
                                            <p>AND</p>
                                        </template>
                                        <!-- <v-btn class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex)">AND</v-btn> -->
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
                                                            <v-text-field v-model="newCondition.vchipTextField" @keyup.enter="addNewChip()" placeholder="Nhập rồi nhấn Enter"></v-text-field>
                                                            <v-btn class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, newCondition.chosenProperty, 'IN', newCondition.vchipValue)">AND</v-btn>
                                                        </v-flex>
                                                        <v-flex xs12 sm12 md12 lg12 xl12 v-else>
                                                            <v-text-field v-model="newCondition.value" label="Value"></v-text-field>
                                                            <v-btn class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, newCondition.chosenProperty, newCondition.chosenConstant, newCondition.value)">AND</v-btn>
                                                        </v-flex>
                                                    </v-layout>
                                                    <!-- <v-layout>
                                                        <v-btn class="blue" outline round style="color: blue;" v-on="on" @click="addAndCondition(orIndex, newCondition.chosenProperty, newCondition.chosenConstant, newCondition.value, newCondition.vchipValue)">AND</v-btn>
                                                    </v-layout> -->
                                                </v-card-text>
                                            </v-card>
                                        </v-menu>
                                        <v-btn @click="deleteOrCondition(orIndex)" class="red" outline round style="color: red;">Xóa</v-btn>
                                    </v-card-text>
                                </v-card>
                                <br>
                                <p>OR</p>
                            </template>
                            <v-btn class="blue" outline round style="color: blue;" @click="addOrCondition()">OR</v-btn>
                        </v-card-text>
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

import listService from '../../services/list.services'
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
                {
                    "contactId": "5d2d7f2d6c245a71aa021873",
                    "accountId": "5d1dd258f0aa61074608b0e3",
                    "teamId": null,
                    "email": "custom@email.com",
                    "firstName": "Pham",
                    "lastName": "Huyen",
                    "phone": "03124564756",
                    "contactOwner": "ductbm@adsplus.vn",
                    "lifecycleStage": "Lead",
                    "leadStatus": null,
                    "city": "Hà Nội",
                    "bussiness": "Công ty kẹo bánh Hải Hà",
                    "lastActivityDate": null,
                    "lastContacted": null,
                    "createdAt": "2019-07-16T07:39:25.951+0000",
                    "updateAt": "2019-07-16T07:39:25.951+0000",
                    "createdBy": "minhduc98kl@gmail.com",
                    "updateBy": "minhduc98kl@gmail.com",
                    "customValue": {
                        "source_from_mar": {
                            "attributeValueId": "5d2d7f2d6c245a71aa021871",
                            "value": "Tự tìm",
                            "attribute": {
                                "attributeId": "5d2d510d6c245a4e7796525a",
                                "accountId": "5d1dd258f0aa61074608b0e3",
                                "object": "Contact",
                                "name": "source_from_mar",
                                "label": "Source from mar",
                                "hidden": false,
                                "description": "nguon khach hang",
                                "fieldType": "checkbox",
                                "options": [
                                    {
                                        "label": "Option A",
                                        "value": "option_a"
                                    },
                                    {
                                        "label": "Option B",
                                        "value": "option_b"
                                    },
                                    {
                                        "label": "Option C",
                                        "value": "option_c"
                                    },
                                    {
                                        "label": "Option D",
                                        "value": "option_d"
                                    }
                                ],
                                "dataType": "String",
                                "displayOrder": 1,
                                "defaultValue": null,
                                "createdAt": "2019-07-16T04:22:37.022+0000",
                                "updateAt": null,
                                "createdBy": "ductbm@adsplus.vn",
                                "updatedBy": null,
                                "required": false
                            }
                        },
                        "ngay_hen_ky": {
                            "attributeValueId": "5d2d7f2d6c245a71aa021872",
                            "value": "2019-07-18T17:00:00.000+0000",
                            "attribute": {
                                "attributeId": "5d2d51d96c245a4e7796525b",
                                "accountId": "5d1dd258f0aa61074608b0e3",
                                "object": "Contact",
                                "name": "ngay_hen_ky",
                                "label": "Ngày hẹn ký",
                                "hidden": false,
                                "description": "hẹn ký ",
                                "fieldType": "date picker",
                                "options": null,
                                "dataType": "Date",
                                "displayOrder": 1,
                                "defaultValue": null,
                                "createdAt": "2019-07-16T04:26:01.222+0000",
                                "updateAt": null,
                                "createdBy": "ductbm@adsplus.vn",
                                "updatedBy": null,
                                "required": false
                            }
                        }
                    }
                },
                {
                    "contactId": "5d8ecfe05908010001eef5a6",
                    "accountId": "5d1dd258f0aa61074608b0e3",
                    "teamId": null,
                    "email": "anhpq.adsplus@gmail.com",
                    "firstName": "Phạm",
                    "lastName": "Quang Anh",
                    "phone": "0852665998",
                    "contactOwner": "anhpq.adsplus@gmail.com",
                    "lifecycleStage": "Lead",
                    "leadStatus": null,
                    "city": "Hà Nội",
                    "bussiness": "Thực tập sinh không lương",
                    "lastActivityDate": null,
                    "lastContacted": null,
                    "createdAt": "2019-09-28T03:13:36.569+0000",
                    "updateAt": "2019-09-28T03:13:36.569+0000",
                    "createdBy": "anhpq.adsplus@gmail.com",
                    "updateBy": "anhpq.adsplus@gmail.com",
                    "customValue": {}
                }
            ],
            contacts: [
                {
                    "contactId": "5d2d7f2d6c245a71aa021873",
                    "accountId": "5d1dd258f0aa61074608b0e3",
                    "teamId": null,
                    "email": "custom@email.com",
                    "firstName": "Pham",
                    "lastName": "Huyen",
                    "phone": "03124564756",
                    "contactOwner": "ductbm@adsplus.vn",
                    "lifecycleStage": "Lead",
                    "leadStatus": null,
                    "city": "Hà Nội",
                    "bussiness": "Công ty kẹo bánh Hải Hà",
                    "lastActivityDate": null,
                    "lastContacted": null,
                    "createdAt": "2019-07-16T07:39:25.951+0000",
                    "updateAt": "2019-07-16T07:39:25.951+0000",
                    "createdBy": "minhduc98kl@gmail.com",
                    "updateBy": "minhduc98kl@gmail.com",
                    "customValue": {
                        "source_from_mar": {
                            "attributeValueId": "5d2d7f2d6c245a71aa021871",
                            "value": "Tự tìm",
                            "attribute": {
                                "attributeId": "5d2d510d6c245a4e7796525a",
                                "accountId": "5d1dd258f0aa61074608b0e3",
                                "object": "Contact",
                                "name": "source_from_mar",
                                "label": "Source from mar",
                                "hidden": false,
                                "description": "nguon khach hang",
                                "fieldType": "checkbox",
                                "options": [
                                    {
                                        "label": "Option A",
                                        "value": "option_a"
                                    },
                                    {
                                        "label": "Option B",
                                        "value": "option_b"
                                    },
                                    {
                                        "label": "Option C",
                                        "value": "option_c"
                                    },
                                    {
                                        "label": "Option D",
                                        "value": "option_d"
                                    }
                                ],
                                "dataType": "String",
                                "displayOrder": 1,
                                "defaultValue": null,
                                "createdAt": "2019-07-16T04:22:37.022+0000",
                                "updateAt": null,
                                "createdBy": "ductbm@adsplus.vn",
                                "updatedBy": null,
                                "required": false
                            }
                        },
                        "ngay_hen_ky": {
                            "attributeValueId": "5d2d7f2d6c245a71aa021872",
                            "value": "2019-07-18T17:00:00.000+0000",
                            "attribute": {
                                "attributeId": "5d2d51d96c245a4e7796525b",
                                "accountId": "5d1dd258f0aa61074608b0e3",
                                "object": "Contact",
                                "name": "ngay_hen_ky",
                                "label": "Ngày hẹn ký",
                                "hidden": false,
                                "description": "hẹn ký ",
                                "fieldType": "date picker",
                                "options": null,
                                "dataType": "Date",
                                "displayOrder": 1,
                                "defaultValue": null,
                                "createdAt": "2019-07-16T04:26:01.222+0000",
                                "updateAt": null,
                                "createdBy": "ductbm@adsplus.vn",
                                "updatedBy": null,
                                "required": false
                            }
                        }
                    }
                },
                {
                    "contactId": "5d8ecfe05908010001eef5a6",
                    "accountId": "5d1dd258f0aa61074608b0e3",
                    "teamId": null,
                    "email": "anhpq.adsplus@gmail.com",
                    "firstName": "Phạm",
                    "lastName": "Quang Anh",
                    "phone": "0852665998",
                    "contactOwner": "anhpq.adsplus@gmail.com",
                    "lifecycleStage": "Lead",
                    "leadStatus": null,
                    "city": "Hà Nội",
                    "bussiness": "Thực tập sinh không lương",
                    "lastActivityDate": null,
                    "lastContacted": null,
                    "createdAt": "2019-09-28T03:13:36.569+0000",
                    "updateAt": "2019-09-28T03:13:36.569+0000",
                    "createdBy": "anhpq.adsplus@gmail.com",
                    "updateBy": "anhpq.adsplus@gmail.com",
                    "customValue": {}
                }
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
            // listService.findContactByCondition(this.idAccount, this.list.conditions).then(result => {
            //     console.log(result);
            // })
            let email = this.currentUser.username;
            for (let i = 0; i < this.result.response.length;i++){
                if(this.result.response[i].email == email){
                    this.allContacts.push(this.result.response[i]);
                }
            }
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
                this.getContacts();
            })
        },
        deleteOrCondition(orIndex){
            this.conditionsExample.splice(orIndex, 1);
        },
        deleteAndCondition(orIndex, andIndex){
            this.conditionsExample[orIndex].splice(andIndex, 1);
            if(this.conditionsExample[orIndex].length == 0){
                this.deleteOrCondition(orIndex);
            }
        },
        addOrCondition(){
            let orConditionExample = 
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
                ]
            this.conditionsExample.push(orConditionExample);
        },
        addAndCondition(orIndex, property, conditionConstant, value){
            var conditionToAdd = {
                conditionId: null,
                object: "Contact",
                property: property,
                condition: conditionConstant,
                value: value
            }
            this.conditionsExample[orIndex].push(conditionToAdd);
            
            // this.newCondition.vchipTextField = '';
            // this.newCondition.vchipValue = [];
            this.conditionsExample = [...this.conditionsExample];
        },
        addNewChip(){
            console.log('adding chip');
            this.newCondition.vchipValue.push(this.newCondition.vchipTextField);
            this.newCondition.vchipTextField = '';
        },
        deleteChip(index){
            console.log('deleting chip');
            this.newCondition.vchipValue.splice(index, 1);
        },
        appendSomething(){
            try {
                var el = document.createElement('html');
                el.innerHTML = "<p style='color: red;'>abcxyz</p><br><p style='color: red;'>defghi</p>";
                return el.innerText;
                // var des = document.getElementById("div1");
                // des.append("<html><head><title>titleTest</title></head><body><a href='test0'>test01</a><a href='test1'>test02</a><a href='test2'>test03</a></body></html>")
                // console.log(document);
            } catch (error) {
                console.log(error);
            }
        },
        goToContactPage(idContact){
            let link = `/contacts/${this.idAccount}/contact/${idContact}`;
            this.$router.push(link);
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
        }
    },
    created(){
        // this.getThisList();
        // this.appendSomething();
        this.getCurrentUser();
    }
}
</script>
<style>
    div.conditions {
        height: 800px;
        overflow-y: scroll;
    }
</style>