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
                        <v-list-tile-content :style="fontWeight[0]">Gửi tin nhắn</v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-list>
                    <v-list-tile @click="page='saveKey'">
                        <v-list-tile-content :style="fontWeight[1]">Quản lý chiến dịch</v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-list>
                    <v-list-tile @click="page='template'">
                        <v-list-tile-content :style="fontWeight[2]">Mẫu tin nhắn</v-list-tile-content>
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
                                <p>Chiến dịch này còn {{send.remain}} tin nhắn</p>
                                <v-textarea box disabled rows="6"></v-textarea>
                            </v-card-text>
                            <v-divider :divider="divider"></v-divider>
                            <v-card-text>
                                <span class="mt-4"><strong>Chọn danh sách gửi </strong></span>
                                <v-select :items="send.list" v-model="send.selectedListToSendSMS" ></v-select>
                            </v-card-text>
                            <v-card-text>
                                <span class="mt-4"><strong>Chọn thời gian gửi</strong></span>
                                <span class="ml-4">
                                    <v-menu ref="menu1" v-model="send.menu1" :close-on-content-click="false" lazy
                                        transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="send.dateFormatted" label="Ngày hết hạn" persistent-hint prepend-icon="event"
                                                v-on="on">
                                            </v-text-field>
                                        </template>
                                        <v-date-picker v-model="send.date" no-title @input="send.menu1 = false"></v-date-picker>
                                    </v-menu>
                                </span>
                                <br>
                                <span class="ml-4">
                                    <v-select v-model="send.time" :items="send.timeToChoose"></v-select>
                                </span>
                            </v-card-text>
                            <v-divider :divider="divider"></v-divider>
                            <v-card-actions>
                                <v-btn block color="primary" :disabled="send.remain < 0" @click="getPhoneNumberToSendSMS()">Gửi ngay</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-flex xs9 sm9 md9 lg9 xl9 class="ml-3">
                        <v-card>
                            <v-card-title>
                                <v-layout row wrap>
                                    <!-- <v-flex xs6 sm6 md6 lg6 xl6>
                                        <h2>Đã chọn {{numberOfRecipient}} người nhận</h2>
                                    </v-flex> -->
                                    <!-- <v-flex xs2 sm2 md2 lg2 xl2>
                                        <v-select label="Chọn danh sách để xem" :items="send.list" v-model="send.selectedListWithOptions"></v-select>
                                    </v-flex> -->
                                    <!-- <v-flex xs2 sm2 md2 lg2 xl2>
                                        <v-btn color="success" @click="markAllContact()">
                                            Chọn tất cả
                                        </v-btn>
                                    </v-flex>
                                    
                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                        <v-btn @click="unmarkAllContact()">
                                            Bỏ chọn tất cả
                                        </v-btn>
                                    </v-flex> -->
                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                        <v-alert type="error" :value="send.exceedRecipientAlert" >Số lượng người nhận không được lớn hơn số tin nhắn còn lại (Bạn đã chọn {{send.phoneNumberToSend.length}} người nhận)</v-alert>
                                    </v-flex>
                                </v-layout>
                            </v-card-title>
                            <v-card-text>
                                <!-- <v-select label="Danh sách người nhận" :items="['Theo danh sách', 'Tự chọn']"></v-select> -->
                                <v-data-table dense :headers="send.headers" :items="send.displayContacts" hide-actions class="elevation-1">
                                    <template v-slot:items="props">
                                        <tr>
                                            <!-- @change="checkChosenContact(props.item.contactId, props.item.chosen)" -->
                                            <td><v-checkbox style="padding: 0px 0px 0px 0px; height: 30px;" 
                                                    v-model="props.item.chosen" 
                                                    @change="getPhoneNumberToSendSMS()"
                                                    >
                                                    </v-checkbox></td>
                                            <td>{{ props.item.firstName }} {{ props.item.lastName}}</td>
                                            <td>{{ props.item.phone }}</td>
                                        </tr>
                                    </template>
                                </v-data-table>
                                <br>
                                <!-- <v-pagination v-model="send.page" :length="send.pages"></v-pagination> -->
                                <br>

                            
                            </v-card-text>
                        </v-card>
                        <br>
                        <v-card>
                            <v-card-title>
                                <v-layout row wrap>
                                    <v-flex xs6 sm6 md6 lg6 xl6>
                                        <h2>Chọn thêm người nhận</h2>
                                    </v-flex>
                                </v-layout>
                            </v-card-title>
                            <v-card-text>
                                <!-- <v-select label="Danh sách người nhận" :items="['Theo danh sách', 'Tự chọn']"></v-select> -->
                                <v-data-table dense :headers="send.headers" :items="send.additionalContacts" hide-actions class="elevation-1">
                                    <template v-slot:items="props">
                                        <tr>
                                            <!-- @change="checkChosenContact(props.item.contactId, props.item.chosen)" -->
                                            <td><v-checkbox style="padding: 0px 0px 0px 0px; height: 30px;" 
                                                    v-model="props.item.chosen" 
                                                    @change="getPhoneNumberToSendSMS()"
                                                    >
                                                    </v-checkbox></td>
                                            <td>{{ props.item.firstName }} {{ props.item.lastName}}</td>
                                            <td>{{ props.item.phone }}</td>
                                        </tr>
                                    </template>
                                </v-data-table>
                                <br>
                                <!-- <v-pagination v-model="send.page" :length="send.pages"></v-pagination> -->
                                <br>

                            
                            </v-card-text>
                        </v-card>
                        <br>
                    </v-flex>
                </v-layout>
                <v-layout row v-if="page=='saveKey'">
                    <v-flex xs3 sm3 md3 lg3 xl3>
                        <v-card>
                            <v-card-title>
                                <h2>Quản lý chiến dịch</h2>
                            </v-card-title>
                            <v-card-text>
                                <span class="mt-4"><strong>Chọn chiến dịch </strong></span>
                                <span class="ml-4"><v-select :items="saveKey.list" v-model="saveKey.selectedCampaignId" @input="getStatisticAndHistory()"></v-select></span>
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
                                            <v-form v-model="saveKey.createValid">
                                                <span class="mt-4"><strong>Tên chiến dịch </strong></span>
                                                <span class="ml-4"><v-text-field :rules="saveKey.inputRules" v-model="saveKey.createData.campaign"></v-text-field></span>
                                                <span class="mt-4"><strong>Nhập Key </strong></span>
                                                <span class="ml-4"><v-text-field :rules="saveKey.inputRules" v-model="saveKey.createData.key"></v-text-field></span>
                                                <span class="mt-4"><strong>Nhập branch name </strong></span>
                                                <span class="ml-4"><v-text-field :rules="saveKey.inputRules" v-model="saveKey.createData.name"></v-text-field></span>
                                            </v-form>
                                        </v-card-text>
                                        <v-divider :divider="divider"></v-divider>
                                        <v-card-actions>
                                            <v-btn flat color="primary" @click="createCampaign()" :disabled="!saveKey.createValid">Tạo</v-btn>
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
                                                        {{saveKey.selectedCampaignDetail.total}}</div>
                                                </v-layout>
                                            </v-flex>
                                            <v-flex xs4 class="text-center">
                                                <h3>Còn lại</h3>
                                                <v-layout row class="mt-4">
                                                    <div class="score" style="background-color:#00adef; padding-top:12%">
                                                        {{saveKey.selectedCampaignDetail.remain}}</div>
                                                </v-layout>
                                            </v-flex>
                                            <v-flex xs4 class="text-center">
                                                <h3>Đã gửi</h3>
                                                <v-layout row class="mt-4" >
                                                    <div class="score" style="background-color:#00adef; padding-top:12%">
                                                        {{saveKey.selectedCampaignDetail.total - saveKey.selectedCampaignDetail.remain}}</div>
                                                </v-layout>
                                            </v-flex>
                                            <v-flex xs4 class="text-center">
                                                <h3>Thành công</h3>
                                                <v-layout row class="mt-4">
                                                    <div class="score" style="background-color: #00C853;">
                                                        <v-btn style="color: white; margin-left: -8px" flat @click="saveKey.showSmsError = false, saveKey.showSmsTemplate = false, saveKey.showSmsSuccess = true">
                                                            <span style="font-size: 20px">{{saveKey.selectedCampaignDetail.success}}</span></v-btn>
                                                    </div>
                                                </v-layout>
                                            </v-flex>
                                            <v-flex xs4 class="text-center">
                                                <h3>Thất bại</h3>
                                                <v-layout row class="mt-4">
                                                    <div class="score" style="background-color:#EF5350;">
                                                        <v-btn style="color: white; margin-left: -8px" flat @click="saveKey.showSmsSuccess = false, saveKey.showSmsError = true, saveKey.showSmsTemplate = false">
                                                            <span style="font-size: 20px">{{saveKey.selectedCampaignDetail.fail}}</span></v-btn>
                                                    </div>
                                                </v-layout>
                                            </v-flex>
                                            <!-- <v-flex xs4 class="text-center">
                                                <h3>Template sử dụng</h3>
                                                <v-layout row class="mt-4">
                                                    <div class="score" style="background-color: #00C853;">
                                                        <v-btn style="color: white; margin-left: -8px" flat @click="saveKey.showSmsTemplate = true, saveKey.showSmsError = false, saveKey.showSmsSuccess = false">
                                                            <span style="font-size: 20px">{{saveKey.currentCampaign.templateUsed}}</span></v-btn>
                                                    </div>
                                                </v-layout>
                                            </v-flex> -->
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                        <v-layout row class="mt-5" v-if="saveKey.selectedCampaignDetail.remain <= 0">
                            <v-flex xs12>
                                <v-alert type="error">
                                    Bạn đã dùng hết số lượng tin nhắn được cấp. Cần phải gia hạn thêm
                                </v-alert>
                            </v-flex>
                        </v-layout>
                        <v-layout class="mt-3" wrap v-if="saveKey.showSmsSuccess">
                            <template v-for="sms in saveKey.selectedCampaignHistory.success">
                                <v-flex xs12 sm12 md12 lg12 xl12 >
                                    <v-card width="100%" height="100%">
                                        <v-card-title>
                                            <span style="font-weight:bold"><v-icon class="mr-2">perm_contact_calendar</v-icon>Đến: {{sms.phoneNumber}}</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <span style="font-weight:bold">Nội dung tin nhắn</span>: {{sms.message}}
                                            <br>
                                            <span style="font-weight:bold">Thời gian gửi</span>: {{sms.time}}
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                                
                                <br>
                            </template>
                            
                        </v-layout>
                        <v-layout class="mt-3" wrap v-if="saveKey.showSmsError">
                            <template v-for="sms in saveKey.selectedCampaignHistory.fail">
                                <v-flex xs12 sm12 md12 lg12 xl12>
                                    <v-card width="100%" height="100%">
                                        <v-card-title>
                                            <span style="font-weight:bold">
                                                <v-icon class="mr-2">perm_contact_calendar</v-icon>Đến: {{sms.phoneNumber}}
                                            </span>
                                        </v-card-title>
                                        <v-card-text>
                                            <span style="font-weight:bold">Nội dung tin nhắn</span>: {{sms.message}}
                                            <p><span style="font-weight:bold">Thời gian gửi</span>: {{sms.time}} </p>
                                            <p><span style="font-weight:bold">Lỗi:</span> {{sms.statusMessage}} </p>
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                                <br>
                                <br>
                            </template>
                            
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
                                <span class="ml-4"><v-select :disabled="template.creatingTemplate" :items="template.currentTemplates" v-model="template.selectedTemplateId" @input="setTemplateContent()"></v-select></span>
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
                                <template v-if="!template.creatingTemplate">
                                    <v-textarea 
                                        rows="4" 
                                        box 
                                        v-model="template.selectedTemplateContent"
                                        onkeypress="return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 32)"
                                        ></v-textarea>
                                    <v-btn color="primary" @click="updateTemplate">Lưu lại</v-btn>
                                </template>
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
import moment from 'moment'
import contactService from '../../services/contacts.service'
import SMSService from '../../services/sms.service'
export default {
    props: {
        idAccount: {
            type: String,
            default: null,
        },
    },
    watch: {
        // 'send.page'(){
        //     this.getAllContact(this.idAccount, this.send.page);
        // },
        page(){
            this.fontWeight = ['', '', ''];
            if(this.page == 'send'){
                this.fontWeight[0] = 'fontWeight: bold';
            }
            else if (this.page == 'saveKey'){
                this.fontWeight[1] = 'fontWeight: bold';
            }
            else{
                this.fontWeight[2] = 'fontWeight: bold';
            }
        },
        'send.selectedListToSendSMS'(){
            this.send.displayContacts = [];
            this.send.additionalContacts = [];
            //lấy danh sách các contact để hiển thị
            for (let i = 0; i < this.send.list.length; i++){
                if (this.send.selectedListToSendSMS == this.send.list[i].value){
                    this.send.displayContacts = this.send.list[i].contact;
                }
            }
            for (let i = 0; i < this.send.displayContacts.length; i++){
                this.send.displayContacts[i].chosen = true;
            }
            //lấy danh sách các contact để chọn thêm
            for (let k = 0; k < this.send.allContacts.length; k++){
                let found = false;
                for (let j = 0; j < this.send.displayContacts.length; j++){
                    if(this.send.displayContacts[j].contactId == this.send.allContacts[k].contactId){
                        found = true;
                    }
                }
                if (found == false){
                    this.send.additionalContacts.push(this.send.allContacts[k])
                }
            }
            for (let i = 0; i < this.send.additionalContacts.length; i++){
                this.send.additionalContacts[i].chosen = false;
            }
            this.send.additionalContacts = [...this.send.additionalContacts];
            this.send.displayContacts = [...this.send.displayContacts]
            this.getPhoneNumberToSendSMS()
        },
        'send.phoneNumberToSend.length'(){
            if(this.send.phoneNumberToSend.length > this.send.remain){
                this.send.exceedRecipientAlert = true;
            }
            else {
                this.send.exceedRecipientAlert = false;
            }
        }
    },
    data(){
        return {
            fontWeight: ['fontWeight: bold', '', ''],
            page: 'send',
            divider: true,
            saveKey: {
                list: [],
                selectedCampaignDetail: {
                    total: 0,
                    remain: 0,
                    fail: 0,
                    success: 0,
                },
                selectedCampaignId: '',
                selectedCampaignHistory: {
                    success: [],
                    fail: []
                },
                showSmsSuccess: false,
                showSmsError: false,
                showSmsTemplate: false,
                createCampaign: false,
                createValid: false,
                inputRules: [
                    v => !!v || 'Không được để trống',
                    // v => v.length <= 15 || 'Tên nhỏ hơn 15 kí tự',
                ],
                createData: {
                    name: '',
                    key: '',
                    campaign: ''
                }
            },
            template: {
                currentTemplates: [],
                content: '',
                name: '',
                selectedTemplateContent: '',
                selectedTemplateId: '',
                creatingTemplate: false,
                
            },
            send: {
                displayContacts: [],
                allContacts: [],
                additionalContacts: [],
                chosenContacts: [],
                list: [],
                selectedListWithOptions: 'all',
                headers: [
                    {
                        text: 'CHỌN',
                        align: 'left',
                        value: 'name',
                        sortable: false
                    },
                    {
                        text: 'TÊN LEAD',
                        align: 'left',
                        value: 'calories',
                        sortable: false
                    },
                    {
                        text: 'SỐ ĐIỆN THOẠI',
                        align: 'left',
                        value: 'fat',
                        sortable: false
                    },
                ],
                page: 1,
                //lưu id của list được chọn
                selectedListToSendSMS: 'all',
                pages: 1,
                remain: 10,
                phoneNumberToSend: [],
                numberOfRecipient: 0,
                exceedRecipientAlert: false,
                date: new Date().toISOString().substr(0, 10),
                // dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
                menu1: false,
                time: '08:00',
                menu2: false,
                modal2: false,
                timeToChoose: [
                    '00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', 
                    '02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45',
                    '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45',
                    '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45',
                    '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45',
                    '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45',
                    '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45',
                    '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45',
                    '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45',
                    '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45',
                    '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45',
                    '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45',
                ],
            }
        }
    },
    computed: {
        exceedRecipientAlert(){
            if(this.send.phoneNumberToSend.length > this.send.remain){
                return true;
            }
            else {
                return false;
            }
        }
    },
    methods: {
        coverTime(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss DD/MM/YYYY');
        },
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate(date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        getList(){
            listService.getList(this.idAccount).then(result => {
                let res = result.response;
                for (let i = 0; i < res.length; i++){
                    listService.getContactByListId(this.idAccount, res[i].contactConditionGroupId).then(result => {
                        let obj = {
                            text: res[i].name,
                            value: res[i].contactConditionGroupId
                        }
                        for (let k = 0; k < result.response.length; k++){
                            result.response[k].chosen = true;
                        }
                        obj.contact = result.response;
                        this.send.list.push(obj);
                    })
                }
                // console.log(this.send.list);
            }).then(() => {
                this.getAllContact()
            })
        },
        getAllContact(){
            contactService.getAllContact(this.idAccount, this.send.page).then(result => {
                for (let i = 1; i <= result.response.totalPage;i++){
                    contactService.getAllContact(this.idAccount, i).then(result => {
                        for(let k = 0; k < result.response.results.length; k++){
                            result.response.results[k].chosen = true;
                            this.send.allContacts.push(result.response.results[k]);
                        }
                    })
                }
                // console.log(this.send.allContacts.length)
                let obj = {
                    text: 'Tất cả các Lead',
                    value: 'all',
                    contact: this.send.allContacts
                }
                
                this.send.list.push(obj);
                // console.log(this.send.list)
                this.send.displayContacts = this.send.allContacts;
                console.log(this.send.allContacts.constructor.name)
                // this.send.allContacts.filter(e => {
                //     console.log(e)
                //     this.send.phoneNumberToSend.push(e.phone)
                // })
                for (let i = 0; i < this.send.allContacts.length; i++){
                    // console.log(i)
                    this.send.phoneNumberToSend.push(this.send.allContacts[i].phone)
                }
                // console.log(this.send.phoneNumberToSend)
                
                if (this.send.phoneNumberToSend.length > this.send.remain){
                    console.log('lon hon')
                    this.send.exceedRecipientAlert = true;
                }
                else {
                    console.log('nho hon')
                    this.send.exceedRecipientAlert = false;
                }
            })
            // console.log(this.send.pages);
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
        getContactById(id){
            let result = null;
            for (let i = 0; i < this.send.displayContacts.length; i++){
                if(this.send.displayContacts[i].contactId == id){
                    result = this.send.displayContacts[i];
                }
            }
            return result;
        },
        logging(){
            // console.log(this.send.selectedListToSendSMS)
        },
        //Lấy tất cả các số điện thoại từ các list đã chọn
        
        getPhoneNumberToSendSMS(){
            let contactToSend = [];
            this.send.phoneNumberToSend = []
            let id = this.send.selectedListToSendSMS;
            contactToSend = [...this.getChosenContactFromListByListId(id), ...this.getChosenContactFromListByListId('additional')]
            let uniqueContact = [];
            for (let k = 0; k < contactToSend.length;k++){
                let found = false;
                for (let j = 0; j < uniqueContact.length; j++){
                    if(uniqueContact[j].contactId == contactToSend[k].contactId){
                        found = true;
                    }
                }
                if(found == false){
                    uniqueContact.push(contactToSend[k]);
                }
                // if(uniqueContact.includes(contactToSend[k]) == false){
                //     uniqueContact.push(contactToSend[k]);
                // }
            }
            // console.log(uniqueContact)
            for (let index = 0; index < uniqueContact.length; index++){
                this.send.phoneNumberToSend.push(uniqueContact[index].phone);
            }
            console.log(this.send.phoneNumberToSend);
            this.send.numberOfRecipient = this.send.phoneNumberToSend.length;
            //kiểm tra trùng lặp  theo số điện thoại
            // for (let i = 0; i < contactToSend.length;i++){
            //     this.send.phoneNumberToSend.push(contactToSend[i].phone)
            // }
            // this.send.phoneNumberToSend = [...new Set(this.send.phoneNumberToSend)]
            // console.log(this.send.phoneNumberToSend)
        },
        //Trả lại mảng các contact được đánh dấu để gửi trong 1 list dựa vào id của list (value)
        getChosenContactFromListByListId(id){
            let result = []
            let allContactArray = [];
            //Lấy mảng tất cả các contact
            if(id == 'additional'){
                allContactArray = this.send.additionalContacts;
            }
            else {
                for (let i = 0; i < this.send.list.length;i++){
                    if(id == this.send.list[i].value){
                        allContactArray = this.send.list[i].contact
                    }
                }
            }
            //Lấy các contact được chọn từ mảng tất cả các contact
            for (let i = 0; i < allContactArray.length;i++){
                if(allContactArray[i].chosen == true){
                    result.push(allContactArray[i]);
                }
            }
            return result;
        },
        sendSMS(){

        },

        //SaveKey
        getListDeviceKey(){
            this.saveKey.list = [];
            SMSService.getListDeviceKey(this.idAccount).then(result => {
                console.log(result)
                for (let i = 0; i < result.response.length; i++){
                    let name = '';
                    if (result.response[i].campaign == null){
                        name = '*chiến dịch không có tên*' + ' (' + result.response[i].name + ')'
                    }
                    else{
                        name = result.response[i].campaign + ' (' + result.response[i].name + ')'
                    }
                    let obj = {
                        text: name,
                        value: result.response[i].smsDeviceId
                    }
                    this.saveKey.list.push(obj)
                }
                this.saveKey.list = this.saveKey.list.reverse();
                this.saveKey.selectedCampaignId = this.saveKey.list[0].value;
                this.getStatisticAndHistory();
            }).catch(error => {
                console.log(error)
            })
        },
        getStatisticAndHistory(){
            this.saveKey.selectedCampaignDetail = {
                total: 0,
                remain: 0,
                fail: 0,
                success: 0,
            }
            SMSService.getStatisticDetail(this.idAccount, this.saveKey.selectedCampaignId).then(result => {
                console.log(result);
                this.saveKey.selectedCampaignDetail.success = result.response.success;
                this.saveKey.selectedCampaignDetail.fail = result.response.fail;
            });
            this.saveKey.selectedCampaignHistory.success = [];
            this.saveKey.selectedCampaignHistory.fail = [];
            SMSService.getHistoryDetail(this.idAccount, this.saveKey.selectedCampaignId).then(result => {
                console.log(result);
                result.response = result.response.reverse();
                for (let i = 0; i < result.response.length; i++){
                    let obj = {
                        phoneNumber: result.response[i].phoneNumber,
                        message: result.response[i].message,
                        statusMessage: this.returnBug(result.response[i].status),
                        status: result.response[i].status,
                        time: this.coverTime(result.response[i].createdAt)
                    }
                    if (obj.status == 'SUCCESS'){
                        this.saveKey.selectedCampaignHistory.success.push(obj);
                    }
                    else {
                        this.saveKey.selectedCampaignHistory.fail.push(obj);
                    }
                }
            })
        },
        createCampaign(){
            let body = {
                name: this.saveKey.createData.name,
                apiKey: this.saveKey.createData.key,
                campaign: this.saveKey.createData.campaign,
            }
            SMSService.createDeviceKey(this.idAccount, body).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error);
            })
            SMSService.getListDeviceKey(this.idAccount).then(result => {
                let data = result.response.reverse();
                let newDeviceKey = {
                    text: data[0].campaign + ' ' + '(' + data[0].name + ')',
                    value: data[0].smsDeviceId
                }
                this.saveKey.list.unshift(newDeviceKey);
                this.saveKey.list = [...this.saveKey.list]
                this.saveKey.selectedCampaignId = newDeviceKey.value
                this.saveKey.createCampaign = false;
            }).catch(error => {
                console.log(error);
            })
            
        },
        returnBug(data) {
            if (data == 'SUCCESS') {
                return "Thành công"
            } 
            else {
                let a = parseInt(data)
                switch (a) {
                    case 356:
                        return "Mã dịch vụ để trống"
                        break;
                    case 357:
                        return "Dịch vụ không tồn tại hoặc chưa được kích hoạt"
                        break;
                    case 359:
                        return "Phiên không tồn tại hoặc chưa được kích hoạt"
                        break;
                    case 392:
                        return "không tìm thấy Telcos , số điện thoại bị sai"
                        break;
                    case 360:
                        return "số điện thoại có trong danh sách từ chối nhận tin"
                        break;
                    case 393:
                        return "sai account gửi hoặc password gửi tin"
                        break;
                    case 394:
                        return "đối tác không tìm thấy với User gửi"
                        break;
                    case 395:
                        return "địa chỉ IP không được đăng ký"
                        break;
                    case 267:
                        return "Sai Username hoặc Password, hoặc IP không được phép gửi tin"
                        break;
                    case 396:
                        return "không tìm thấy phiên dịch vụ"
                        break;
                    case 397:
                        return "không tìm thấy nhà cung cấp"
                        break;
                    case 398:
                        return "Không tìm thấy đối tác"
                        break;
                    case 399:
                        return "MT của đối tác bị lặp"
                        break;
                    case 304:
                        return "MT gửi lặp (cùng 1 nội dung gửi tới 1 số điện thoại trong thời gian ngắn)"
                        break;
                    case 509:
                        return "Template IC chưa được khai báo"
                        break;
                    case 253:
                        return "thêm mới vào bảng Concentrator bị sai"
                        break;
                    case 511:
                        return "Chưa khai báo SessionPrefix"
                        break;
                }
            }
        },



        //Template
        startCreatingTemplate(){
            this.template.creatingTemplate = true;
        },
        createNewTemplate(){
            let obj = {
                name: this.template.name,
                content: this.template.content,
                status: 'ACTIVE'
            }
            SMSService.createTemplate(this.idAccount, obj).then(result => {
                console.log(result);
                let obj = {
                    text: result.response.name,
                    content: result.response.content,
                    value: result.response.smsTemplateId
                }
                this.template.currentTemplates.unshift(obj);
                this.template.selectedTemplateContent = this.template.currentTemplates[0].content;
                this.template.selectedTemplateId = this.template.currentTemplates[0].value;
            }).catch(error => {
                console.log(error);
            })
            this.template.creatingTemplate = false;
        },
        setTemplateContent(){
            for (let i = 0; i < this.template.currentTemplates.length; i++){
                if(this.template.selectedTemplateId == this.template.currentTemplates[i].value){
                    this.template.selectedTemplateContent = this.template.currentTemplates[i].content
                }
            }
        },
        getTemplate(){
            SMSService.getTemplate(this.idAccount).then(result => {
                console.log(result);
                for (let i = 0; i < result.response.length; i++){
                    let obj = {
                        text: result.response[i].name,
                        content: result.response[i].content,
                        value: result.response[i].smsTemplateId
                    }
                    this.template.currentTemplates.push(obj)
                }
                this.template.currentTemplates = this.template.currentTemplates.reverse();
                this.template.selectedTemplateContent = this.template.currentTemplates[0].content;
                this.template.selectedTemplateId = this.template.currentTemplates[0].value
            })
        },
        updateTemplate(){
            let body = {
                smsTemplateId: this.template.selectedTemplateId,
                content: this.template.selectedTemplateContent
            }
            SMSService.updateTemplate(this.idAccount, body).then(result => {
                console.log(result)
                SMSService.getTemplate(this.idAccount).then(result => {
                    let tempArr = [];
                    for (let i = 0; i < result.response.length; i++){
                        let obj = {
                            text: result.response[i].name,
                            content: result.response[i].content,
                            value: result.response[i].smsTemplateId
                        }
                        tempArr.push(obj)
                    }
                    tempArr = tempArr.reverse()
                    for (let i = 0; i < tempArr.length; i++){
                        if(this.template.currentTemplates[i] != tempArr[i]){
                            this.template.currentTemplates[i] = tempArr[i]
                        }
                    }
                    this.template.currentTemplates = [...this.template.currentTemplates]
                })
            }).catch(error => {
                console.log(error)
            })
        }
        // markAllContact(){
        //     for (let i = 0; i < this.send.displayContacts.length;i++){
        //         if(this.send.displayContacts[i].chosen == false){
        //             this.send.displayContacts[i].chosen = true;
        //             this.send.remain = this.send.remain - 1;
        //             this.send.chosenContacts.push(this.send.displayContacts[i]);
        //         }
        //     }
        //     this.send.chosenContacts = [...this.send.chosenContacts];
        //     console.log(this.send.chosenContacts);
        // },
        // unmarkAllContact(){
        //     let tempArr = [];
        //     for (let i = 0; i<this.send.displayContacts.length;i++){
        //         if(this.send.displayContacts[i].chosen == true){
        //             this.send.displayContacts[i].chosen = false;
        //             tempArr.push(this.send.displayContacts[i])
        //         }
        //     }
        //     for (let i = 0; i < this.send.chosenContacts.length; i++){
        //         for (let k = 0; k < tempArr.length; k++){
        //             if (this.send.chosenContacts[i].contactId == tempArr[k].contactId){
        //                 this.send.chosenContacts.splice(i, 1);
        //                 this.send.remain = this.send.remain + 1;
        //             }
        //         }
        //     }
        //     this.send.chosenContacts = [...this.send.chosenContacts];
        //     console.log(this.send.chosenContacts);
        // }
    },
    created(){
        this.getList();
        this.getTemplate();
        this.getListDeviceKey();
        // this.getAllContact();
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