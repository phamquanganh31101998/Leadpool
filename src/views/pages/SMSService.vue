<template>
    <v-content class="mt-5 pr-3 pd-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <h1 class="ml-3">Gửi tin nhắn SMS</h1>
            </v-flex>
        </v-layout>
        <v-divider class="mt-5" :divider="divider"></v-divider>
        <v-layout row>
            <v-flex xs2 sm2 md2 lg2 xl2>
                <v-list>
                    <v-list-tile @click="page='send'">
                        <v-list-tile-content>Gửi tin nhắn</v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-list>
                    <v-list-tile @click="page='saveKey'">
                        <v-list-tile-content>Quản lý chiến dịch</v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-list>
                    <v-list-tile @click="page='template'">
                        <v-list-tile-content>Mẫu tin nhắn</v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
            <v-flex xs10 sm10 md10 lg10 xl10 class="ml-3 mt-3">
                <v-layout row v-if="page=='send'">
                    <v-flex xs3 sm3 md3 lg3 xl3 style="height: 100%">
                        <v-card >
                            <v-card-text>
                                <span class="mt-4"><strong>Chọn chiến dịch </strong></span>
                                <span class="ml-4"><v-select></v-select></span>
                            </v-card-text>
                            <v-divider :divider="divider"></v-divider>
                            <v-card-text>
                                <span class="mt-4"><strong>Chọn mẫu tin nhắn</strong></span>
                                <span class="ml-4"><v-select></v-select></span>
                                <v-textarea box disabled rows="13"></v-textarea>
                            </v-card-text>
                            <v-divider :divider="divider"></v-divider>
                            <v-card-text>
                                <span class="mt-4"><strong>Chọn thời gian gửi</strong></span>
                                <span class="ml-4"><v-text-field></v-text-field></span>
                            </v-card-text>
                            <v-divider :divider="divider"></v-divider>
                            <v-card-actions>
                                <v-btn block color="primary" >Gửi ngay</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-flex xs9 sm9 md9 lg9 xl9 class="ml-3">
                        <v-card>
                            <v-card-title>
                                <v-layout row>
                                    <v-flex xs7 sm7 md7 lg7 xl7>
                                        <h3>Đã chọn {{numberOfRecipient}} người nhận</h3>
                                    </v-flex>
                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                        <v-btn color="success" @click="markAllContact()">
                                            Chọn tất cả
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                        <v-btn @click="unmarkAllContact()">
                                            Bỏ chọn tất cả
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-card-title>
                            <v-card-text>
                                <!-- <v-select label="Danh sách người nhận" :items="['Theo danh sách', 'Tự chọn']"></v-select> -->
                                <v-data-table dense :headers="send.headers" :items="send.displayContacts" hide-actions class="elevation-1">
                                    <template v-slot:items="props">
                                        <tr>
                                            <td><v-checkbox style="padding: 0px 0px 0px 0px; height: 30px;" v-model="props.item.chosen" @change="checkChosenContact(props.item.contactId, props.item.chosen)"></v-checkbox></td>
                                            <td>{{ props.item.firstName }} {{ props.item.lastName}}</td>
                                            <td>{{ props.item.phone }}</td>
                                        </tr>
                                    </template>
                                </v-data-table>
                                <br>
                                <v-pagination v-model="send.page" :length="send.pages"></v-pagination>
                                <br>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-layout row v-if="page=='saveKey'">
                    <v-flex xs3 sm3 md3 lg3 xl3>
                        <v-card>
                            <v-card-title>
                                <h3>Quản lý chiến dịch</h3>
                            </v-card-title>
                            <v-card-text>
                                <span class="mt-4"><strong>Chọn chiến dịch </strong></span>
                                <span class="ml-4"><v-select></v-select></span>
                            </v-card-text>
                            <v-divider :divider="divider"></v-divider>
                            
                            <v-card-actions>
                                <v-btn block color="primary" @click="saveKey.createCampaign = true"><v-icon>add</v-icon>Tạo chiến dịch mới</v-btn>
                                <v-dialog v-model="saveKey.createCampaign" width="30%" persistent>
                                    <v-card>
                                        <v-card-title style="background-color:#1E88E5;color:#fff">
                                            <span class="headline">Tạo chiến dịch mới</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <span class="mt-4"><strong>Tên chiến dịch </strong></span>
                                            <span class="ml-4"><v-text-field></v-text-field></span>
                                            <span class="mt-4"><strong>Key </strong></span>
                                            <span class="ml-4"><v-text-field placeholder="Nhập key"></v-text-field></span>
                                        </v-card-text>
                                        <v-divider :divider="divider"></v-divider>
                                        <v-card-actions>
                                            <v-btn flat color="primary" @click="saveKey.createCampaign = false">Tạo</v-btn>
                                            <v-btn flat color="red" @click="saveKey.createCampaign = false">Đóng</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-flex xs9 sm9 md9 lg9 xl9 class="ml-3">
                        <v-layout row >
                            <v-flex xs12>
                                <v-card height="100%" style="width:100%">
                                    <v-card-title>
                                        <h2>Số tin nhắn trong chiến dịch</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-layout row>
                                            <v-flex xs4 class="text-center">
                                                <h3>Đăng ký</h3>
                                                <v-layout row class="mt-4">
                                                    <div class="score" style="background-color:#00adef; padding-top:12%">
                                                        {{saveKey.currentCampaign.total}}</div>
                                                </v-layout>
                                            </v-flex>
                                            <v-flex xs4 class="text-center">
                                                <h3>Còn lại</h3>
                                                <v-layout row class="mt-4">
                                                    <div class="score" style="background-color:#00adef; padding-top:12%">
                                                        {{saveKey.currentCampaign.remain}}</div>
                                                </v-layout>
                                            </v-flex>
                                            <v-flex xs4 class="text-center">
                                                <h3>Đã gửi</h3>
                                                <v-layout row class="mt-4" >
                                                    <div class="score" style="background-color:#00adef; padding-top:12%">
                                                        {{saveKey.currentCampaign.total - saveKey.currentCampaign.remain}}</div>
                                                </v-layout>
                                            </v-flex>
                                            <v-flex xs4 class="text-center">
                                                <h3>Lỗi</h3>
                                                <v-layout row class="mt-4">
                                                    <div class="score" style="background-color:#EF5350;">
                                                        <v-btn style="color: white; margin-left: -8px" flat @click="saveKey.showSmsSuccess = false, saveKey.showSmsError = true, saveKey.showSmsTemplate = false">
                                                            <span style="font-size: 20px">{{saveKey.currentCampaign.fail}}</span></v-btn>
                                                    </div>
                                                </v-layout>
                                            </v-flex>
                                            <v-flex xs4 class="text-center">
                                                <h3>Thành công</h3>
                                                <v-layout row class="mt-4">
                                                    <div class="score" style="background-color: #00C853;">
                                                        <v-btn style="color: white; margin-left: -8px" flat @click="saveKey.showSmsError = false, saveKey.showSmsTemplate = false, saveKey.showSmsSuccess = true">
                                                            <span style="font-size: 20px">{{saveKey.currentCampaign.success}}</span></v-btn>
                                                    </div>
                                                </v-layout>
                                            </v-flex>
                                            <v-flex xs4 class="text-center">
                                                <h3>Template sử dụng</h3>
                                                <v-layout row class="mt-4">
                                                    <div class="score" style="background-color: #00C853;">
                                                        <v-btn style="color: white; margin-left: -8px" flat @click="saveKey.showSmsTemplate = true, saveKey.showSmsError = false, saveKey.showSmsSuccess = false">
                                                            <span style="font-size: 20px">{{saveKey.currentCampaign.templateUsed}}</span></v-btn>
                                                    </div>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                        <v-layout row class="mt-5" v-if="saveKey.currentCampaign.remain <= 0">
                            <v-flex xs12>
                                <v-alert type="error">
                                    Bạn đã dùng hết sms cần phải gia hạn thêm
                                </v-alert>
                            </v-flex>
                        </v-layout>
                        <v-layout class="mt-3" row v-if="saveKey.showSmsSuccess">
                            <v-card width="100%">
                                <v-card-title>
                                    <p>
                                        <v-icon class="mr-2">perm_contact_calendar</v-icon>0123456789
                                    </p>
                                </v-card-title>
                                <v-card-text>
                                    <span style="font-weight:bold">Nội dung tin nhắn</span>: Không có lỗi
                                    <br>
                                    <span style="font-weight:bold">Thời gian gửi</span> 13/10/2019
                                </v-card-text>
                            </v-card>
                            <br>
                            <br>
                        </v-layout>
                        <v-layout class="mt-3" row v-if="saveKey.showSmsError">
                            <v-card width="100%">
                                <v-card-title>
                                    <p>
                                        <v-icon class="mr-2">perm_contact_calendar</v-icon>0123456789
                                    </p>
                                </v-card-title>
                                <v-card-text>
                                    <span style="font-weight:bold">Nội dung tin nhắn</span>: Lỗi
                                    <p><span style="font-weight:bold">Thời gian gửi</span> 31/10/1998</p>
                                    <p><span style="font-weight:bold">Lỗi:</span> Gửi nhầm só</p>
                                </v-card-text>
                            </v-card>
                        </v-layout>
                        <!-- <v-layout class="mt-3" row v-if="saveKey.showSmsTemplate">
                            <v-flex v-for="(item,key) in templateSmsShow" :key="key" class="pa-2">
                                <div style="background-image: url('smsboder.png');background-color: #fff;background-position: center;
                                background-repeat: no-repeat; width:100%;height:150px" class="px-2 py-2">
                                    <p>{{item.content}}</p>
                                </div>
                            </v-flex>
                        </v-layout> -->
                        <br>
                        <br>
                        <br>
                    </v-flex>
                </v-layout>
                <v-layout row v-if="page=='template'">
                    <v-flex xs3 sm3 md3 lg3 xl3>
                        <v-card>
                            <v-card-title>
                                <h3>Mẫu tin nhắn</h3>
                            </v-card-title>
                            <v-card-text>
                                <span class="mt-4"><strong>Chọn mẫu </strong></span>
                                <span class="ml-4"><v-select :disabled="template.creatingTemplate" :items="template.currentTemplates" v-model="template.selectTemplate"></v-select></span>
                            </v-card-text>
                            <v-divider :divider="divider"></v-divider>
                            <v-card-text v-if="template.creatingTemplate"> 
                                <span class="mt-4"><strong>Tên mẫu</strong></span>
                                <v-text-field label="Nhập tên mẫu" v-model="template.name" ></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn block color="primary" :disabled="template.creatingTemplate" @click="startCreatingTemplate()"><v-icon>add</v-icon>Thêm mẫu mới</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-flex xs9 sm9 md9 lg9 xl9 class="ml-3">
                        <v-card>
                            <v-card-title>
                                <h3 v-if="!template.creatingTemplate">Nội dung tin nhắn</h3>
                                <h3 v-else>Nhập mẫu tin nhắn mới tại đây (không dấu)</h3>
                            </v-card-title>
                            <v-card-text>
                                <v-textarea rows="4" box disabled v-if="!template.creatingTemplate" v-model="template.selectTemplate"></v-textarea>
                                <template v-else>
                                    <v-textarea rows="4"
                                        counter="160"
                                        v-model="template.content"
                                        onkeypress="return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 32)"
                                    ></v-textarea>
                                     <v-alert
                                        :value="template.content.length > 160"
                                        type="error"
                                        >
                                        Độ dài tin nhắn phải nhỏ hơn 160 kí tự.
                                    </v-alert>
                                </template>
                                
                            </v-card-text>
                            <v-card-actions>
                                <v-btn v-if="template.creatingTemplate" :disabled="template.content == '' || template.content.length > 160" color="primary" @click="createNewTemplate()"><v-icon>add</v-icon>Tạo mới</v-btn>
                                <v-btn v-if="template.creatingTemplate" color="red" dark @click="template.creatingTemplate = false">Quay lại</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-content>
</template>
<script>
import listService from '../../services/list.services'
import contactService from '../../services/contacts.service'
export default {
    props: {
        idAccount: {
            type: String,
            default: null,
        },
    },
    watch: {
        'send.page'(){
            this.getAllContact(this.idAccount, this.send.page);
        }
    },
    computed: {
        numberOfRecipient(){
            return this.send.chosenContacts.length;
        }
    },
    data(){
        return {
            page: 'send',
            divider: true,
            saveKey: {
                currentCampaign: {
                    total: 10,
                    remain: 7,
                    fail: 1,
                    success: 2,
                    templateUsed: 1,
                },
                showSmsSuccess: false,
                showSmsError: false,
                showSmsTemplate: false,
                createCampaign: false
            },
            template: {
                currentTemplates: [
                    {
                        text: 'Mẫu 1',
                        value: 'Hihi'
                    },
                    {
                        text: 'Mẫu 2',
                        value: 'hohohohoho'
                    },
                ],
                content: '',
                name: '',
                selectTemplate: 'Hihi',
                creatingTemplate: false
            },
            send: {
                displayContacts: [],
                chosenContacts: [],
                list: [],
                headers: [{
                    text: 'CHỌN',
                    align: 'left',
                    value: 'name'
                    },
                    {
                    text: 'TÊN LEAD',
                    align: 'left',
                    value: 'calories'
                    },
                    {
                    text: 'SỐ ĐIỆN THOẠI',
                    align: 'left',
                    value: 'fat'
                    },
                ],
                page: 1,
                pages: 1
            }
        }
    },
    methods: {
        startCreatingTemplate(){
            this.template.creatingTemplate = true;
        },
        createNewTemplate(){
            let obj = {
                text: this.template.name,
                value: this.template.content
            }
            this.template.currentTemplates.push(obj);
            this.template.selectTemplate = this.template.currentTemplates[this.template.currentTemplates.length - 1].value
            this.template.creatingTemplate = false;
        },
        getList(){
            listService.getList(this.idAccount).then(result => {
                console.log(result);
            })
        },
        getAllContact(){
            contactService.getAllContact(this.idAccount, this.send.page).then(result => {
                console.log(result);
                this.send.pages = result.response.totalPage;
                for (let i = 0; i < result.response.results.length; i++){
                    result.response.results[i].chosen = this.checkIncludeContact(this.send.chosenContacts, result.response.results[i].contactId);
                }
                this.send.displayContacts = result.response.results;
            })
        },
        checkIncludeContact(array, id){
            let result = false;
            for (let i = 0; i<array.length;i++){
                if(array[i].contactId == id){
                    result = true;
                }
            }
            return result;
        },
        checkChosenContact(id, choice){
            if(choice == true){
                this.send.chosenContacts.push(this.getContactById(id))
            }
            else{
                let obj = this.getContactById(id);
                for (let i = 0; i < this.send.chosenContacts.length;i++){
                    if(this.send.chosenContacts[i].contactId == obj.contactId){
                        this.send.chosenContacts.splice(i, 1);
                    }
                }
            }
            this.send.chosenContacts = [...this.send.chosenContacts];
            console.log(this.send.chosenContacts)
            // if(this.send.chosenContacts.length == 0){
            //     this.send.chosenContacts.push(this.getContactById(id))
            // }
            // else {
            //     for (let i = 0; i < this.send.chosenContacts.length; i++){
            //         if(this.send.chosenContacts[i].contactId == id){
            //             this.send.chosenContacts.splice(i, 1);

            //         }
            //         else {
            //             this.send.chosenContacts.push(this.getContactById(id))
            //         }
            //     }
            // }
            
            // this.send.chosenContacts = [...this.send.chosenContacts];
            // console.log(this.send.chosenContacts)
        },
        getContactById(id){
            let result = null;
            for (let i = 0; i < this.send.displayContacts.length; i++){
                if(this.send.displayContacts[i].contactId == id){
                    result = this.send.displayContacts[i];
                }
            }
            return result;
        },
        markAllContact(){
            for (let i = 0; i < this.send.displayContacts.length;i++){
                if(this.send.displayContacts[i].chosen == false){
                    this.send.displayContacts[i].chosen = true;
                    this.send.chosenContacts.push(this.send.displayContacts[i]);
                }
            }
            this.send.chosenContacts = [...this.send.chosenContacts];
            console.log(this.send.chosenContacts);
        },
        unmarkAllContact(){
            let tempArr = [];
            for (let i = 0; i<this.send.displayContacts.length;i++){
                if(this.send.displayContacts[i].chosen == true){
                    this.send.displayContacts[i].chosen = false;
                    tempArr.push(this.send.displayContacts[i])
                }
            }
            for (let i = 0; i < this.send.chosenContacts.length; i++){
                for (let k = 0; k < tempArr.length; k++){
                    if (this.send.chosenContacts[i].contactId == tempArr[k].contactId){
                        this.send.chosenContacts.splice(i, 1);
                    }
                }
            }
            this.send.chosenContacts = [...this.send.chosenContacts];
            console.log(this.send.chosenContacts);
        }
    },
    created(){
        this.getList();
        this.getAllContact();
    }
}
</script>
<style>
    .score {
        border-radius: 10px;
        height: 70px;
        width: 70px;
        padding-top: 7%;
        text-align: center;
        color: rgb(255, 255, 255);
        font-size: 20px
    }
</style>