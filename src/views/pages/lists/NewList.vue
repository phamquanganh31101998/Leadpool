<template>
    <v-content class="mt-5 pl-3 pr-3" v-if="access">
        <v-layout row wrap>
            <v-flex xs12 sm12 md2 lg2 xl2>
                <v-btn outline color="indigo" @click="$router.push(`/contacts/${idAccount}/lists`)">
                    <v-icon>keyboard_arrow_left</v-icon>Quản lý danh sách
                </v-btn>
            </v-flex>
            <v-flex xs12 sm12 md3 lg4 xl4>
                <v-text-field v-model="newListName" :rules="nameRules" label="Tên danh sách" class="fontSize: 20px; width: 100%"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md7 lg6 xl6>
                <v-layout row>
                    <v-flex xs4 sm4 md4 lg4 xl4 offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <v-text-field append-icon="search" v-model="search" label="Tìm lead theo tên" single-line hide-details></v-text-field>
                    </v-flex>
                    <v-flex xs3 md3 lg3 xl3>
                        <v-btn dark color="#3E82F7" :disabled="disableCreateButton" @click="createNewList(newListName, conditions)">Tạo danh sách</v-btn>
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
                                                <v-card flat style="border: 1px solid #7C98B6; background-color: #F5F8FA;">
                                                    <v-card-text style="padding: 8px 8px;">
                                                        <v-layout row>
                                                            <v-flex xs10 sm10 md10 lg10 xl10 class="pt-3">
                                                                <p v-if="andCondition.condition == 'IN'"><span style="font-weight: bold;">{{getPropertyName(andCondition.property)}}</span> có trong 
                                                                    <template v-for="val in andCondition.value">
                                                                        <v-chip>{{val}}</v-chip>
                                                                    </template>
                                                                </p>
                                                                <p v-if="andCondition.condition == 'EQUAL'"><span style="font-weight: bold;">{{getPropertyName(andCondition.property)}}</span> là <span style="font-weight: bold;">{{andCondition.value}}</span></p>
                                                                <p v-if="andCondition.condition == 'LIKE'"><span style="font-weight: bold;">{{getPropertyName(andCondition.property)}}</span> chứa <span style="font-weight: bold;">{{andCondition.value}}</span></p>
                                                                <p v-if="andCondition.condition == 'GREAT_THAN'"><span style="font-weight: bold;">{{getPropertyName(andCondition.property)}}</span> lớn hơn <span style="font-weight: bold;">{{andCondition.value}}</span></p>
                                                                <p v-if="andCondition.condition == 'LESS_THAN'"><span style="font-weight: bold;">{{getPropertyName(andCondition.property)}}</span> nhỏ hơn <span style="font-weight: bold;">{{andCondition.value}}</span></p>
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
                                            <v-menu v-model="newCondition.menu" :close-on-content-click="false" :nudge-width="100" offset-x max-width="300">
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
                                                            <v-flex xs12 sm12 md12 lg12 xl12 v-if="newCondition.chosenConstant == 'IN' && newCondition.chosenProperty == 'lifecycle_stage'">
                                                                <v-select label="Chọn giá trị" :items="lifecycleStages" multiple chips v-model="newCondition.chosenLifecycleStageValue"></v-select>
                                                                <v-btn :disabled="newCondition.chosenLifecycleStageValue.length == 0" class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, newCondition.chosenProperty, 'IN', newCondition.chosenLifecycleStageValue, true)"><v-icon>add</v-icon>Thêm</v-btn>
                                                            </v-flex>
                                                            <v-flex xs12 sm12 md12 lg12 xl12 v-if="newCondition.chosenConstant != 'IN' && newCondition.chosenProperty == 'lifecycle_stage'">
                                                                <!-- <v-text-field v-model="newCondition.value" label="Giá trị"></v-text-field> -->
                                                                <v-select label="Chọn giá trị" :items="lifecycleStages" v-model="newCondition.chosenLifecycleStage"></v-select>
                                                                <v-btn class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, newCondition.chosenProperty, newCondition.chosenConstant, newCondition.chosenLifecycleStage, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                            </v-flex>
                                                            <v-flex xs12 sm12 md12 lg12 xl12 v-if="newCondition.chosenConstant == 'IN' && newCondition.chosenProperty != 'lifecycle_stage'">
                                                                <v-text-field v-model="newCondition.vchipTextField" label="Nhập từ khóa" placeholder="Phân tách nhau bằng dấu phẩy"></v-text-field>
                                                                <v-btn :disabled="newCondition.value.length == 0" class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, newCondition.chosenProperty, 'IN', newCondition.vchipTextField, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                            </v-flex>
                                                            <v-flex xs12 sm12 md12 lg12 xl12 v-if="newCondition.chosenConstant != 'IN' && newCondition.chosenProperty != 'lifecycle_stage'">
                                                                <v-text-field v-model="newCondition.value" label="Giá trị"></v-text-field>
                                                                <v-btn :disabled="newCondition.value.length == 0" class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, newCondition.chosenProperty, newCondition.chosenConstant, newCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
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
                        <v-btn dark color="#425B76" @click="filter()">Lọc</v-btn>
                    </div>
                </template>
                <template v-else>
                    <br>
                    <v-menu v-model="createFirstCondition.firstConditionMenu" :close-on-content-click="false" :nudge-width="100" offset-x max-width="300">
                        <template v-slot:activator="{ on }">
                            <a v-on="on"><v-icon>add</v-icon> Tìm kiếm Lead theo điều kiện</a>
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
                                    <v-flex xs12 sm12 md12 lg12 xl12 v-if="createFirstCondition.chosenConstant == 'IN' && createFirstCondition.chosenProperty == 'lifecycle_stage'">
                                        <v-select :items="lifecycleStages" multiple chips v-model="createFirstCondition.chosenLifecycleStageValue"></v-select>
                                        <v-btn :disabled="createFirstCondition.chosenLifecycleStageValue.length == 0" class="blue" outline round style="color: blue;" @click="addFirstCondition(createFirstCondition.chosenProperty, 'IN', createFirstCondition.chosenLifecycleStageValue, true)"><v-icon>add</v-icon>Thêm</v-btn>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12 lg12 xl12 v-if="createFirstCondition.chosenConstant != 'IN' && createFirstCondition.chosenProperty == 'lifecycle_stage'">
                                        <!-- <v-text-field v-model="newCondition.value" label="Giá trị"></v-text-field> -->
                                        <v-select :items="lifecycleStages" v-model="createFirstCondition.chosenLifecycleStage"></v-select>
                                        <v-btn class="blue" outline round style="color: blue;" @click="addFirstCondition(createFirstCondition.chosenProperty, createFirstCondition.chosenConstant, createFirstCondition.chosenLifecycleStage, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12 lg12 xl12 v-if="createFirstCondition.chosenConstant == 'IN' && createFirstCondition.chosenProperty != 'lifecycle_stage'">
                                        <v-text-field v-model="createFirstCondition.vchipTextField" label="Nhập từ khóa" placeholder="Phân tách nhau bằng dấu phẩy"></v-text-field>
                                        <v-btn :disabled="createFirstCondition.vchipTextField.length == 0" class="blue" outline round style="color: blue;" @click="addFirstCondition(createFirstCondition.chosenProperty, 'IN', createFirstCondition.vchipTextField, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12 lg12 xl12 v-if="createFirstCondition.chosenConstant != 'IN' && createFirstCondition.chosenProperty != 'lifecycle_stage'">
                                        <v-text-field v-model="createFirstCondition.value" label="Giá trị"></v-text-field>
                                        <v-btn :disabled="createFirstCondition.value.length == 0" class="blue" outline round style="color: blue;" @click="addFirstCondition(createFirstCondition.chosenProperty, createFirstCondition.chosenConstant, createFirstCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-menu>
                </template>
            </v-flex>
            <v-flex xs12 sm12 md9 lg9 xl9>
                <v-data-table
                    no-data-text="Không có kết quả nào phù hợp"
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
        <v-dialog v-model="failDialog" @click:outside="failDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Thất bại</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Đã có lỗi xảy ra khi lấy thông tin các Lead. Xin hãy thử lại.
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="failDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-content>
    <v-content v-else class="mt-5 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <h1 class="ml-3">Tạo danh sách mới</h1>
            </v-flex>
        </v-layout>
        
        <v-divider class="mt-4" :divider="divider"></v-divider>
        <br>
        <br>
        <v-layout>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-card flat>
                    <v-card-text style="background-color: #FDEDEE; border: 1px solid red;">
                        <v-card flat style="background-color: #FDEDEE">
                            <v-card-title>
                                <h2>Không có quyền truy cập</h2>
                            </v-card-title>
                            <v-card-text>
                                Bạn phải có quyền Xem tất cả các Lead mới có thể sử dụng chức năng này. Hãy liên hệ với Admin
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
                if(this.normalText(name).toLowerCase().includes(this.normalText(this.search).toLowerCase())){
                    this.contacts.push(this.allContacts[i]);
                }
            }
        }
    },
    data(){
        return {
            access: false,
            failDialog: false,
            currentUser: null,
            divider: true,
            search: '',
            allContacts: [],
            contacts: [],
            headersLists: [
                {
                    text: 'TÊN',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                {
                    text: 'EMAIL',
                    align: 'left',
                    sortable: false,
                    value: 'email'
                },
                {
                    text: 'SỐ ĐIỆN THOẠI',
                    align: 'left',
                    sortable: false,
                    value: 'phone'
                },
                {
                    text: 'VÒNG ĐỜI',
                    align: 'left',
                    sortable: false,
                    value: 'lifecycleStage'
                },
                {
                    text: 'TÀI KHOẢN SỞ HỮU',
                    align: 'left',
                    sortable: false,
                    value: 'contactOwner'
                },
                {
                    text: 'THÀNH PHÓ',
                    align: 'left',
                    sortable: false,
                    value: 'city'
                },
                {
                    text: 'NGÀNH NGHỀ',
                    align: 'left',
                    sortable: false,
                    value: 'bussiness'
                },
            ],
            list: null,
            newCondition: {
                contactProperties: [
                    {
                        text: 'Vòng đời',
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
                chosenLifecycleStage: 'Lead',
                chosenLifecycleStageValue: [],
                value: '',
                vchipTextField: '',
                vchipValue: [],
                newConditionMenu: false,
                menu: false,
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
                chosenLifecycleStage: 'Lead',
                chosenLifecycleStageValue: [],
                value: '',
                vchipTextField: '',
                vchipValue: [],
                firstConditionMenu: false
            },
            firstConditionMenu: true,
            lifecycleStages: [
                'Lead',
                'Subscriber',
                'Marketing qualified lead',
                'Sales qualified lead',
                'Opportunity',
                'Customer',
                'Evangelist',
                'Other'
            ],
            nameRules: [
                v => !!v || 'Chưa nhập tên',
                // v => v.length <= 15 || 'Tên nhỏ hơn 15 kí tự',
            ],
        }
    },
    methods: {
        normalText(str){
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
        },
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
        addAndCondition(orIndex, property, conditionConstant, value, isArray){
            if(conditionConstant == 'IN'){
                if(isArray == true){
                    var conditionToAdd = {
                        conditionId: null,
                        object: "Contact",
                        property: property,
                        condition: conditionConstant,
                        value: value
                    }
                }
                else {
                    var conditionToAdd = {
                        conditionId: null,
                        object: "Contact",
                        property: property,
                        condition: conditionConstant,
                        value: value.split(",")
                    }
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
            this.newCondition.value = '';
            this.newCondition.chosenLifecycleStageValue = [];
            this.conditions = [...this.conditions];
            this.newCondition.menu = false;
        },
        addFirstCondition(property, conditionConstant, value, isArray){
            if(conditionConstant == 'IN'){
                if(isArray == true){
                    var conditionToAdd = {
                        conditionId: null,
                        object: "Contact",
                        property: property,
                        condition: conditionConstant,
                        value: value
                    }
                }
                else {
                    var conditionToAdd = {
                        conditionId: null,
                        object: "Contact",
                        property: property,
                        condition: conditionConstant,
                        value: value.split(",")
                    }
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
            this.createFirstCondition.value = '';
            this.createFirstCondition.chosenLifecycleStageValue = [];
            this.createFirstCondition.vchipTextField = '';
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
            let role = this.currentUser.authorities;
            for (let i = 0; i < role.length;i++){
                if (role[i] == 'ROLE_CONTACT_VIEW_EVERYTHING'){
                    this.access = true;
                }
            }
        },
        filter(){
            this.allContacts = [];
            this.contacts = [];
            listService.findContactByCondition(this.idAccount, this.conditions).then(result => {
                this.allContacts = result.response;
                this.contacts = this.allContacts;
            }).catch(error => {
                this.failDialog = true;
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