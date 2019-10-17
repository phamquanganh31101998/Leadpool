<template>
    <v-content class="mt-5 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md2 lg2 xl2>
                <v-btn outline color="indigo" @click="$router.push(`/contacts/${idAccount}/lists`)">
                    <v-icon>keyboard_arrow_left</v-icon>Danh sách
                </v-btn>
            </v-flex>
            <v-flex xs12 sm12 md3 lg4 xl4>
                <v-text-field v-model="newListName" label="Tên danh sách" class="fontSize: 20px; width: 100%"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md7 lg6 xl6>
                <v-layout row>
                    <v-flex xs5 sm5 md5 lg5 xl5 offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <v-text-field append-icon="search" v-model="search" label="Tìm lead theo tên" single-line hide-details></v-text-field>
                    </v-flex>
                    <v-flex xs2 md2 lg2 xl2>
                        <v-btn dark color="warning" :disabled="disableCreateButton" @click="createNewList(newListName, conditions)">Tạo danh sách</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-divider class="mt-4" :divider="divider"></v-divider>
        <v-layout row>
            <v-flex xs12 sm12 md3 lg3 xl3>
                <template v-if="!firstConditionMenu">
                    <div class="conditions">
                        <v-card>
                            <v-card-text style="padding: 8px;">
                                <template v-for="(orCondition, orIndex) in conditions">
                                    <v-card flat style="border: 1px solid #CCCCCC">
                                        <v-card-title style="padding: 8px 0px; margins: 4px 4px">
                                            <v-layout row wrap>
                                                <v-flex xs2 sm2 md2 lg2 xl2 offset-xs10 offset-sm10 offset-md10 offset-xl10 offset-lg10>
                                                    <a color="indigo" @click="deleteOrCondition(orIndex)" style="text-align: right;">
                                                        Xóa
                                                    </a>
                                                </v-flex>
                                            </v-layout>
                                        </v-card-title>
                                        <v-card-text style="padding: 4px 8px; margin: 4px 4px;">
                                            <template v-for="(andCondition, andIndex) in orCondition">
                                                <v-card flat style="border: 1px solid #CCCCCC">
                                                    <v-card-text style="padding: 8px 8px;">
                                                        <v-layout row>
                                                            <v-flex xs10 sm10 md10 lg10 xl10 class="pt-3">
                                                                <p v-if="andCondition.condition == 'IN'">{{getPropertyName(andCondition.property)}} có trong 
                                                                    <template v-for="val in andCondition.value">
                                                                        <v-chip>{{val}}</v-chip>
                                                                    </template>
                                                                </p>
                                                                <p v-if="andCondition.condition == 'EQUAL'">{{getPropertyName(andCondition.property)}} là {{andCondition.value}}</p>
                                                                <p v-if="andCondition.condition == 'LIKE'">{{getPropertyName(andCondition.property)}} chứa {{andCondition.value}}</p>
                                                                <p v-if="andCondition.condition == 'GREAT_THAN'">{{getPropertyName(andCondition.property)}} lớn hơn {{andCondition.value}}</p>
                                                                <p v-if="andCondition.condition == 'LESS_THAN'">{{getPropertyName(andCondition.property)}} nhỏ hơn {{andCondition.value}}</p>
                                                            </v-flex>
                                                            <v-flex xs2 sm2 md2 lg2 xl2>
                                                                <v-tooltip right>
                                                                    <template v-slot:activator="{ on }">
                                                                        <v-btn @click="deleteAndCondition(orIndex, andIndex)" flat v-on="on" fab>
                                                                            <v-icon style="color: red;" >clear</v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <span>Xóa điều kiện này</span>
                                                                </v-tooltip>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-card-text>
                                                </v-card>
                                                <p>và</p>
                                            </template>
                                        </v-card-text>
                                        <v-card-actions style="padding: 8px 8px; margins: 0px 0px">
                                            <v-menu :close-on-content-click="false" :nudge-width="100" offset-x max-width="300">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn class="blue" outline round style="color: blue;" v-on="on"><v-icon>add</v-icon>Thêm điều kiện và</v-btn>
                                                </template>
                                                <v-card style="width: 100%;">
                                                    <v-card-text>
                                                        <v-layout row wrap>
                                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                                <v-select :items="newCondition.contactProperties" label="Thuộc tính" v-model="newCondition.chosenProperty"></v-select>
                                                            </v-flex>
                                                            <br>
                                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                                <v-select :items="newCondition.conditionConstants" label="Điều kiện" v-model="newCondition.chosenConstant"></v-select>
                                                            </v-flex>
                                                            <br>
                                                            <v-flex xs12 sm12 md12 lg12 xl12 v-if="newCondition.chosenConstant == 'IN'">
                                                                <v-text-field v-model="newCondition.vchipTextField" label="Nhập từ khóa" placeholder="Phân tách nhau bằng dấu phẩy"></v-text-field>
                                                                
                                                                <v-btn class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, newCondition.chosenProperty, 'IN', newCondition.vchipTextField)"><v-icon>add</v-icon>Thêm</v-btn>
                                                            </v-flex>
                                                            <v-flex xs12 sm12 md12 lg12 xl12 v-else>
                                                                <v-text-field v-model="newCondition.value" label="Giá trị"></v-text-field>
                                                                <v-btn class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, newCondition.chosenProperty, newCondition.chosenConstant, newCondition.value)"><v-icon>add</v-icon>Thêm</v-btn>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-card-text>
                                                </v-card>
                                            </v-menu>
                                            <!-- <v-btn @click="deleteOrCondition(orIndex)" class="red" outline round style="color: red;">Xóa</v-btn> -->
                                        </v-card-actions>
                                    </v-card>
                                    <p>hoặc</p>
                                </template>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn class="blue" outline round style="color: blue;" @click="addOrCondition()"><v-icon>add</v-icon>Thêm điều kiện hoặc</v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-btn dark color="warning" @click="filter()">Lọc</v-btn>
                    </div>
                </template>
                <template v-else>
                    <br>
                    <v-menu v-model="createFirstCondition.firsrConditionMenu" :close-on-content-click="false" :nudge-width="100" offset-x max-width="300">
                        <template v-slot:activator="{ on }">
                            <a v-on="on"><v-icon>add</v-icon> Thêm điều kiện mới</a>
                        </template>
                        <v-card style="width: 100%;">
                            <v-card-text>
                                <v-layout row wrap>
                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                        <v-select :items="createFirstCondition.contactProperties" label="Chọn thuộc tính" v-model="createFirstCondition.chosenProperty"></v-select>
                                    </v-flex>
                                    <br>
                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                        <v-select :items="createFirstCondition.conditionConstants" label="Chọn điều kiện" v-model="createFirstCondition.chosenConstant"></v-select>
                                    </v-flex>
                                    <br>
                                    <v-flex xs12 sm12 md12 lg12 xl12 v-if="createFirstCondition.chosenConstant == 'IN'">
                                        <v-text-field v-model="createFirstCondition.vchipTextField" label="Nhập từ khóa" placeholder="Phân tách nhau bằng dấu phẩy"></v-text-field>
                                        
                                        <v-btn class="blue" outline round style="color: blue;" @click="addFirstCondition(createFirstCondition.chosenProperty, 'IN', createFirstCondition.vchipTextField)"><v-icon>add</v-icon>Thêm</v-btn>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12 lg12 xl12 v-else>
                                        <v-text-field v-model="createFirstCondition.value" label="Nhập từ khóa" ></v-text-field>
                                        <v-btn class="blue" outline round style="color: blue;"  @click="addFirstCondition(createFirstCondition.chosenProperty, createFirstCondition.chosenConstant, createFirstCondition.value)"><v-icon>add</v-icon>Thêm</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-menu>
                </template>
            </v-flex>
            <v-flex xs12 sm12 md9 lg9 xl9>
                <v-data-table
                    :headers="headersLists"
                    :items="contacts"
                    class="elevation-1 mt-6"
                    hide-actions
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
    computed: {
        disableCreateButton(){
            if(this.newListName == ''){
                return true;
            }
            else {
                return false;
            }
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
            allContacts: [],
            contacts: [],
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
                    text: 'THÀNH PHÓ',
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
                        text: 'Người dùng sở hữu',
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
                    {
                        text: 'lớn hơn',
                        value: 'GREAT_THAN'
                    },
                    {
                        text: 'nhỏ hơn',
                        value: 'LESS_THAN'
                    },
                    {
                        text: 'bằng',
                        value: 'EQUAL'
                    },
                    {
                        text: 'chứa',
                        value: 'LIKE'
                    },
                    {
                        text: 'có trong',
                        value: 'IN'
                    },
                ],
                chosenProperty: 'lifecycle_stage',
                chosenConstant: 'EQUAL',
                value: '',
                vchipTextField: '',
                vchipValue: [],
                newConditionMenu: false
            },
            conditions: [],
            newListName: '',
            createFirstCondition: {
                contactProperties: [
                    {
                        text: 'Lifecycle Stage',
                        value: 'lifecycle_stage'
                    },
                    {
                        text: 'Tài khoản sở hữu',
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
                    {
                        text: 'lớn hơn',
                        value: 'GREAT_THAN'
                    },
                    {
                        text: 'nhỏ hơn',
                        value: 'LESS_THAN'
                    },
                    {
                        text: 'là',
                        value: 'EQUAL'
                    },
                    {
                        text: 'chứa',
                        value: 'LIKE'
                    },
                    {
                        text: 'có trong',
                        value: 'IN'
                    },
                ],
                chosenProperty: 'lifecycle_stage',
                chosenConstant: 'EQUAL',
                value: '',
                vchipTextField: '',
                vchipValue: [],
                firstConditionMenu: false
            },
            firstConditionMenu: true,
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
            // let email = this.currentUser.username;
            // for (let i = 0; i < this.result.response.length;i++){
            //     if(this.result.response[i].email == email){
            //         this.allContacts.push(this.result.response[i]);
            //     }
            // }
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
            this.conditions.splice(orIndex, 1);
            if(this.conditions.length == 0){
                this.firstConditionMenu = true;
            }
        },
        deleteAndCondition(orIndex, andIndex){
            this.conditions[orIndex].splice(andIndex, 1);
            if(this.conditions[orIndex].length == 0){
                this.deleteOrCondition(orIndex);
            }
        },
        addOrCondition(){
            let orConditionExample = []
            this.conditions.push(orConditionExample);
            this.conditions = [...this.conditions];
        },
        addAndCondition(orIndex, property, conditionConstant, value){
            if(conditionConstant == 'IN'){
                var conditionToAdd = {
                    conditionId: null,
                    object: "Contact",
                    property: property,
                    condition: conditionConstant,
                    value: value.split(",")
                }
            }
            else {
                conditionToAdd = {
                    conditionId: null,
                    object: "Contact",
                    property: property,
                    condition: conditionConstant,
                    value: value
                }
            }
            this.conditions[orIndex].push(conditionToAdd);
            this.newCondition.vchipTextField = '';
            this.conditions = [...this.conditions];
        },
        addFirstCondition(property, conditionConstant, value){
            if(conditionConstant == 'IN'){
                var conditionToAdd = {
                    conditionId: null,
                    object: "Contact",
                    property: property,
                    condition: conditionConstant,
                    value: value.split(",")
                }
            }
            else {
                conditionToAdd = {
                    conditionId: null,
                    object: "Contact",
                    property: property,
                    condition: conditionConstant,
                    value: value
                }
            }
            let firstOrArray = [];
            firstOrArray.push(conditionToAdd);
            this.conditions.push(firstOrArray);
            this.conditions = [...this.conditions];
            this.createFirstCondition.firstConditionMenu = false;
            this.firstConditionMenu = false;
        },
        resetFilter(){
            this.conditions = [];
            this.conditions = [...this.conditions];
            this.firstConditionMenu = true;
        },
        createNewList(name, conditions){
            let body = {
                "name": name,
                "conditions": conditions
            }
            listService.createNewList(this.idAccount, body).then(result => {
                console.log(result);
                this.newListName = '';
                this.conditions = [];
                this.goToListPage();
            }).catch(error => {
                console.log(error);
            })
        },
        goToContactPage(idContact){
            let link = `/contacts/${this.idAccount}/contact/${idContact}`;
            this.$router.push(link);
        },
        goToListPage(){
            let link = `/contacts/${this.idAccount}/lists`;
            this.$router.push(link);
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
        },
        filter(){
            this.allContacts = [];
            this.contacts = [];
            listService.findContactByCondition(this.idAccount, this.conditions).then(result => {
                this.allContacts = result.response;
                this.contacts = this.allContacts;
            }).catch(error => {
                console.log(error);
            })
        }
    },
    created(){
        this.getCurrentUser();
    }
}
</script>
<style>
    div.conditions {
        height: 600px;
        overflow-y: scroll;
    }
    p {
        margin: 0px 0px 8px;
    }
    v-card.innerCard {
        
    }
</style>