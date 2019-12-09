<template>
    <v-content class="mt-4 pr-3 pd-3 pl-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <h1 class="ml-3">Quản lý tin nhắn SMS</h1>
            </v-flex>
        </v-layout>
        <v-divider class="mt-5" :divider="divider"></v-divider>
        <v-layout row v-if="access">
            <v-flex xs2 sm2 md2 lg2 xl2>
                <v-list>
                    <v-list-tile @click="page='schedule', getSchedule()">
                        <v-list-tile-content :style="fontWeight[3]">Quản lý lịch gửi </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="page='saveKey', getListDeviceKey()">
                        <v-list-tile-content :style="fontWeight[1]">Quản lý chiến dịch</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="page='template', getTemplate()">
                        <v-list-tile-content :style="fontWeight[2]">Quản lý mẫu tin nhắn</v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
            <v-flex xs10 sm10 md10 lg10 xl10 class="ml-3 mt-3">
                <v-dialog persistent fullscreen v-model="createScheduleDialog">
                    <v-card>
                        <v-toolbar card dark color="primary">
                            <v-btn icon dark @click="page = 'schedule'">
                                <v-icon>close</v-icon>
                            </v-btn>
                            <v-toolbar-title>Tạo lịch gửi SMS mới</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-layout row>
                            <v-flex xs12 sm12 md12 lg12 xl12>
                                <v-layout row>
                                    <v-flex xs12 sm12 md3 lg3 xl3>
                                        <v-card flat>
                                            <v-card-text>
                                                <span class="ml-4"><v-select prepend-icon="textsms"  label="Chọn mẫu tin nhắn" :items="template.currentTemplates" v-model="send.chosenContentId" @change="logging()"></v-select></span>
                                                <!-- <p>Chiến dịch này còn {{send.remain}} tin nhắn</p> -->
                                                <v-divider :divider="divider"></v-divider>
                                                <v-textarea box readonly rows="4" label="Nội dung" v-model="send.chosenContent"></v-textarea>
                                                <v-divider :divider="divider"></v-divider>
                                                <span class="ml-4"><v-select prepend-icon="list"  label="Chọn chiến dịch gửi tin nhắn" :items="saveKey.list" v-model="send.chosenCampaign" @change="logging()"></v-select></span>
                                                <v-divider :divider="divider"></v-divider>
                                                <v-select prepend-icon="people" :items="send.list" label="Chọn danh sách gửi" v-model="send.selectedListToSendSMS" ></v-select>
                                                <v-divider :divider="divider"></v-divider>
                                                <span class="ml-4">
                                                    <v-menu ref="menu1" v-model="send.menu1" :close-on-content-click="false" lazy
                                                        transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                                        <template v-slot:activator="{ on }">
                                                            <v-text-field v-model="send.date" label="Chọn ngày gửi"  persistent-hint prepend-icon="event"
                                                                v-on="on">
                                                            </v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="send.date"  no-title @input="send.menu1 = false"></v-date-picker>
                                                    </v-menu>
                                                </span>
                                                <span class="ml-4">
                                                    <v-select prepend-icon="access_time" label="Chọn giờ gửi" v-model="send.time" :items="send.timeToChoose"></v-select>
                                                </span>
                                            </v-card-text>
                                        </v-card>
                                        <v-card flat>
                                            <v-card-text>
                                                <h4>Đã chọn {{send.numberOfRecipient}} người nhận</h4>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-btn dark block color="#3E82F7" :disabled="send.chosenContentId == '' || send.chosenCampaign == '' || send.numberOfRecipient == 0  " @click="sendSMS()">Đặt lịch gửi</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-flex>
                                    <v-flex xs12 sm12 md9 lg9 xl9 class="ml-3">
                                        <v-card flat v-if="send.displayContacts.length > 0">
                                            <v-card-title>
                                                <v-layout row wrap>
                                                    <v-flex xs6 sm6 md6 lg6 xl6>
                                                        <h2>Danh sách</h2>
                                                    </v-flex>
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
                                                    <!-- <v-flex xs12 sm12 md12 lg12 xl12>
                                                        <v-alert type="error" :value="send.exceedRecipientAlert" >Số lượng người nhận không được lớn hơn số tin nhắn còn lại (Bạn đã chọn {{send.phoneNumberToSend.length}} người nhận)</v-alert>
                                                    </v-flex> -->
                                                </v-layout>
                                            </v-card-title>
                                            <v-card-text>
                                                <!-- <v-select label="Danh sách người nhận" :items="['Theo danh sách', 'Tự chọn']"></v-select> -->
                                                <v-data-table :loading="loadingTable" rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]" dense :headers="send.headers" :items="send.displayContacts" class="elevation-1" no-data-text="Chưa chọn danh sách ">
                                                    <template v-slot:items="props">
                                                        <tr>
                                                            <!-- @change="checkChosenContact(props.item.contactId, props.item.chosen)" -->
                                                            <td><v-checkbox style="padding: 0px 0px 0px 0px; height: 30px;" 
                                                                    v-model="props.item.chosen" 
                                                                    @change="getPhoneNumberToSendSMS()"
                                                                    >
                                                                    </v-checkbox></td>
                                                            <td>{{ props.item.fullName}}</td>
                                                            <td>{{ props.item.phone }}</td>
                                                        </tr>
                                                    </template>
                                                </v-data-table>
                                                <br>
                                                <!-- <v-pagination v-model="send.page" :length="send.pages"></v-pagination> -->
                                                <br>

                                            
                                            </v-card-text>
                                        </v-card>
                                        <v-card flat class="mt-3" v-if="send.additionalContacts.length > 0">
                                            <v-card-title>
                                                <v-layout row wrap>
                                                    <v-flex xs6 sm6 md6 lg6 xl6>
                                                        <h2>Chọn thêm người nhận</h2>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card-title>
                                            <v-card-text>
                                                <!-- <v-select label="Danh sách người nhận" :items="['Theo danh sách', 'Tự chọn']"></v-select> -->
                                                <v-data-table :loading="loadingTable" rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]" dense :headers="send.headers" :items="send.additionalContacts"  class="elevation-1">
                                                    <template v-slot:items="props">
                                                        <tr>
                                                            <!-- @change="checkChosenContact(props.item.contactId, props.item.chosen)" -->
                                                            <td><v-checkbox style="padding: 0px 0px 0px 0px; height: 30px;" 
                                                                    v-model="props.item.chosen" 
                                                                    @change="getPhoneNumberToSendSMS()"
                                                                    >
                                                                    </v-checkbox></td>
                                                            <td>{{ props.item.fullName}}</td>
                                                            <td>{{ props.item.phone }}</td>
                                                        </tr>
                                                    </template>
                                                </v-data-table>
                                                <br>
                                                <!-- <v-pagination v-model="send.page" :length="send.pages"></v-pagination> -->
                                                <br>

                                            
                                            </v-card-text>
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                                <br>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-dialog>
                <v-layout row v-if="page=='saveKey'">
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-layout row>
                            <v-flex xs3 sm3 md3 lg3 xl3 >
                                <v-card style="height: 220px;">
                                    <v-card-text>
                                        <span class="mt-4"><strong>Chọn chiến dịch </strong></span>
                                        <span class="ml-4"><v-select :items="saveKey.list" v-model="saveKey.selectedCampaignId" @input="getStatisticAndHistory()"></v-select></span>
                                    </v-card-text>
                                    <v-divider class="mt-4" :divider="divider"></v-divider>
                                    <v-card-actions>
                                        <v-btn block color="#3E82F7" dark @click="saveKey.createCampaign = true"><v-icon>add</v-icon>Tạo chiến dịch mới</v-btn>
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
                                        <v-card style="width:100%; height: 220px;">
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
                                                                {{saveKey.selectedCampaignDetail.success + saveKey.selectedCampaignDetail.fail}}</div>
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
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs12 sm12 md12 lg12 xl12>
                                <v-layout class="mt-3" wrap v-if="saveKey.showSmsSuccess">
                                    <!-- <template v-for="sms in saveKey.selectedCampaignHistory.success">
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
                                     -->
                                    <v-data-table :loading="loadingTable" rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]" style="width: 100%;" class="elevation-1" no-data-text="Chưa có tin nhắn nào" :headers="saveKey.selectedCampaignHistory.successHeaders" :items="saveKey.selectedCampaignHistory.success">
                                        <template v-slot:items="props">
                                            <tr>
                                                <td>{{props.item.phoneNumber}}</td>
                                                <td>{{props.item.time}}</td>
                                                <td style="color: green">{{props.item.statusMessage}}</td>
                                                <td>{{props.item.message}}</td>
                                            </tr>
                                        </template>
                                    </v-data-table>
                                </v-layout>
                                <v-layout class="mt-3" wrap v-if="saveKey.showSmsError">
                                    <!-- <template v-for="sms in saveKey.selectedCampaignHistory.fail">
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
                                     -->
                                    <v-data-table :loading="loadingTable" rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]" style="width: 100%;" class="elevation-1" no-data-text="Chưa có tin nhắn nào" :headers="saveKey.selectedCampaignHistory.failHeaders" :items="saveKey.selectedCampaignHistory.fail">
                                        <template v-slot:items="props">
                                            <tr>
                                                <td>{{props.item.phoneNumber}}</td>
                                                <td>{{props.item.time}}</td>
                                                <td style="color: red">
                                                    <span style="margin-right: 5px;">Thất bại</span>
                                                    <v-tooltip top>
                                                        <template v-slot:activator="{ on }">
                                                            <span><v-icon color="red" dark v-on="on">help</v-icon></span>
                                                        </template>
                                                        <span>{{props.item.statusMessage}}</span>
                                                    </v-tooltip>
                                                </td>
                                                <td>{{props.item.message}}</td>
                                            </tr>
                                        </template>
                                    </v-data-table>
                                </v-layout>
                                <br>
                                <br>
                                <br>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    
                    
                </v-layout>
                <v-layout row v-if="page=='template'">
                    <v-flex xs3 sm3 md3 lg3 xl3>
                        <v-card style="height: 400px;">
                            <v-card-title>
                                <h2>Mẫu tin nhắn</h2>
                            </v-card-title>
                            <v-card-text>
                                <span class="mt-4"><strong>Chọn mẫu </strong></span>
                                <span class="ml-4"><v-select :disabled="template.creatingTemplate" :items="template.currentTemplates" v-model="template.selectedTemplateId" @input="setTemplateContent()"></v-select></span>
                            </v-card-text>
                            <v-divider class="mt-5" :divider="divider"></v-divider>
                            <v-card-text v-if="template.creatingTemplate"> 
                                <span class="mt-4"><strong>Tên mẫu</strong></span>
                                <v-text-field label="Nhập tên mẫu" v-model="template.name" ></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn block dark color="#3E82F7" :disabled="template.creatingTemplate" @click="startCreatingTemplate()"><v-icon>add</v-icon>Tạo mẫu mới</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-flex xs9 sm9 md9 lg9 xl9 class="ml-3">
                        <v-card style="height: 400px;">
                            <v-card-title>
                                <h2 v-if="!template.creatingTemplate">Nội dung tin nhắn</h2>
                                <h2 v-else>Tạo mẫu tin nhắn mới</h2>
                            </v-card-title>
                            <v-card-text>
                                <template v-if="!template.creatingTemplate">
                                    <v-layout>
                                        <v-flex xs5 sm5 md5 lg5 xl5>
                                            <v-textarea 
                                                label="Chỉnh sửa mẫu tin nhắn tại đây"
                                                rows="4" 
                                                box 
                                                counter="160"
                                                maxlength="160"
                                                v-model="template.selectedTemplateContent"
                                                @focus="template.updateTemplateView = true"
                                            ></v-textarea>
                                        </v-flex>
                                        <v-flex xs5 sm5 md5 lg5 xl5 offset-xs1 offset-sm1 offset-md1 offset-xl1 offset-lg1 v-if="template.updateTemplateView">
                                            <v-textarea 
                                                box
                                                label="Nội dung hiển thị (không dấu)"
                                                rows="4" 
                                                readonly
                                                :value="normalText(template.selectedTemplateContent)"
                                            ></v-textarea>
                                        </v-flex>
                                    </v-layout>
                                    <v-btn color="primary" @click="updateTemplate()" :disabled="normalText(this.template.selectedTemplateContent) == template.oldContent">Lưu lại</v-btn>
                                </template>
                                <template v-else>
                                    <v-layout>
                                        <v-flex xs5 sm5 md5 lg5 xl5>
                                            <v-textarea rows="8"
                                                label="Nhập mẫu tin nhắn mới tại đây"
                                                counter="160"
                                                maxlength="160"
                                                box
                                                v-model="template.content"
                                            ></v-textarea>
                                        </v-flex>
                                        <v-flex xs5 sm5 md5 lg5 xl5 offset-xs1 offset-sm1 offset-md1 offset-xl1 offset-lg1>
                                            <v-textarea rows="8"
                                                label="Nội dung hiển thị"
                                                disabled
                                                counter="160"
                                                box
                                                maxlength="160"
                                                :value="normalText(template.content)"
                                            ></v-textarea>
                                        </v-flex>
                                    </v-layout>
                                    <v-btn v-if="template.creatingTemplate" :disabled="template.content == '' || template.content.length > 160" color="primary" @click="createNewTemplate()"><v-icon>add</v-icon>Tạo mới</v-btn>
                                    <v-btn v-if="template.creatingTemplate" color="grey" dark @click="template.creatingTemplate = false">Quay lại</v-btn>
                                    
                                    <v-alert
                                        :value="template.content.length > 160"
                                        type="error"
                                        >
                                        Độ dài tin nhắn phải nhỏ hơn 160 kí tự.
                                    </v-alert>
                                </template>
                                
                            </v-card-text>
                            <v-card-actions>
                                
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-layout row wrap v-if="page=='schedule'">
                    <v-flex xs12 sm12 md12 lg12 xl12 class="mb-4">
                        <v-btn dark round color = "#3E82F7" @click="page = 'send'">Tạo lịch gửi mới</v-btn>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-card width="100%">
                            <v-data-table :loading="loadingTable" rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]" :headers="schedule.headers" :items="schedule.list">
                                <template v-slot:items="props">
                                    <tr>
                                        <!-- @change="checkChosenContact(props.item.contactId, props.item.chosen)" -->
                                        <td>{{ props.item.campaign}}</td>
                                        <td>{{ props.item.time }} </td>
                                        <td style="color: red" v-if="props.item.status == 'INACTIVE'">{{ returnStatus(props.item.status) }}</td>
                                        <td style="color: green" v-if="props.item.status == 'ACTIVE'">{{ returnStatus(props.item.status) }}</td>
                                        <!-- <v-menu :close-on-content-click="false" right offset-x style="background-color: white">
                                            <template v-slot:activator="{ on }">
                                                
                                                <td>
                                                    <a color="indigo" v-on="on">
                                                        {{ props.item.status }}
                                                    </a>
                                                </td>
                                                
                                            </template>
                                            <v-select  style="background-color: white; width: 120px; padding: 0px 10px;" v-model="props.item.status" :items="['ACTIVE', 'INACTIVE']" @change="changeScheduleStatus(props.item.number, props.item.status)" ></v-select>
                                        </v-menu> -->
                                        <v-menu offset-x>
                                            <template v-slot:activator="{ on }">
                                                <td class="text-xs-right">
                                                    <v-btn flat fab small v-on="on"><v-icon>more_vert</v-icon></v-btn>
                                                </td>
                                            </template>
                                            <v-list>
                                                <v-list-tile @click.stop="openScheduleDetailDialog(props.item.id)">
                                                    <v-list-tile-content>Xem chi tiết</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile v-if="props.item.status == 'ACTIVE'" @click="changeScheduleStatus(props.item.number, 'INACTIVE')">
                                                    <v-list-tile-content>Tắt lịch gửi</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile v-if="props.item.status == 'INACTIVE'" @click="changeScheduleStatus(props.item.number, 'ACTIVE')">
                                                    <v-list-tile-content>Kích hoạt lịch gửi</v-list-tile-content>
                                                </v-list-tile>
                                            </v-list>
                                        </v-menu>
                                        <!-- <td><a @click.stop="openScheduleDetailDialog(props.item.number)"> Xem chi tiết >> </a></td>
                                        <td v-if="props.item.status == 'ACTIVE'"><v-btn color="red" outline round @click="changeScheduleStatus(props.item.number, 'INACTIVE'), props.item.status = 'INACTIVE'">Tắt lịch gửi</v-btn></td>
                                        <td v-if="props.item.status == 'INACTIVE'"><v-btn color="primary" outline round @click="changeScheduleStatus(props.item.number, 'ACTIVE'), props.item.status = 'ACTIVE'">Kích hoạt lịch gửi</v-btn></td> -->
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-card>
                        
                    </v-flex>
                    <v-dialog v-model="schedule.detail.dialog" width="40%" persistent>
                        <v-card>
                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                <span class="headline">Chi tiết</span>
                            </v-card-title>
                            <v-card-text>
                                <p>Nội dung tin nhắn: </p>
                                <v-textarea v-model="schedule.detail.content" readonly rows="2" box></v-textarea>
                                <br>
                                <v-data-table :loading="loadingTable" rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]" :headers="schedule.detail.headers" :items="schedule.detail.listPhone">
                                    <template v-slot:items="props">
                                        <tr>
                                            <!-- @change="checkChosenContact(props.item.contactId, props.item.chosen)" -->
                                            <td>{{ props.item.phoneNumber}}</td>
                                            <td>{{ returnTime(props.item.timeToSend) }} </td>
                                            <td :style="returnStatusColor(props.item.status)">{{ returnStatus(props.item.status) }}</td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                            <v-divider :divider="divider"></v-divider>
                            <v-card-actions>
                                <v-btn flat color="red" @click="schedule.detail.dialog = false">Đóng</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-layout style="height: 300px;">
                    <v-flex xs3 sm3 md3 lg3 xl3 offset-xs1 offset-sm1 offset-md1 offset-lg1 offset-xl1>
                        <v-card flat style="height: 300px; margin-top: 100px;" >
                            <v-card-text style="height: 300px; background-color: #FDEDEE; border: 1px solid red;">
                                <v-card flat style="background-color: #FDEDEE; vertical-align: middle">
                                    <v-card-title>
                                        <h2>Không có quyền truy cập</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        Bạn phải có quyền <span style="font-weight: bold">Xem tất cả</span> và <span style="font-weight: bold">Liên lạc tất cả</span> đối với Lead thì mới có thể sử dụng chức năng này.
                                        <br>
                                        Hãy liên hệ với Quản lý để được cấp quyền truy cập.
                                    </v-card-text>
                                </v-card>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs8 sm8 md8 lg8 xl8>
                        <v-card flat style="height: 500px; margin-top: 100px;">
                            <v-img alt="ảnh ở đây" width="100%" src="../../../sms2.png"></v-img>
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
            this.fontWeight = ['', '', '', ''];
            if(this.page == 'send'){
                this.fontWeight[0] = 'fontWeight: bold';
            }
            else if (this.page == 'saveKey'){
                this.fontWeight[1] = 'fontWeight: bold';
            }
            else if (this.page == 'template'){
                this.fontWeight[2] = 'fontWeight: bold';
            }
            else {
                this.fontWeight[3] = 'fontWeight: bold';
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
        },
        'send.chosenContentId'(){
            for (let i = 0; i < this.template.currentTemplates.length; i++){
                if(this.send.chosenContentId == this.template.currentTemplates[i].value){
                    this.send.chosenContent = this.template.currentTemplates[i].content;
                } 
            }
        }
    },
    data(){
        return {
            loadingTable: false,
            currentUser: null,
            access: false,
            fontWeight: ['', '', '', 'fontWeight: bold'],
            page: 'schedule',
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
                    successHeaders: [
                        {
                            text: 'SỐ ĐIỆN THOẠI',
                            align: 'left',
                            value: 'phoneNumber',
                            // sortable: false
                        },
                        {
                            text: 'THỜI GIAN GỬI',
                            align: 'left',
                            value: 'time',
                            // sortable: false
                        },
                        {
                            text: 'TRẠNG THÁI',
                            align: 'left',
                            value: 'statusMessage',
                            sortable: false
                        },
                        {
                            text: 'NỘI DUNG',
                            align: 'left',
                            value: 'message',
                            // sortable: false
                        },
                    ],
                    fail: [],
                    failHeaders: [
                        {
                            text: 'SỐ ĐIỆN THOẠI',
                            align: 'left',
                            value: 'phoneNumber',
                            // sortable: false
                        },
                        {
                            text: 'THỜI GIAN GỬI',
                            align: 'left',
                            value: 'time',
                            // sortable: false
                        },
                        {
                            text: 'TRẠNG THÁI',
                            align: 'left',
                            value: 'statusMessage',
                            sortable: false
                        },
                        {
                            text: 'NỘI DUNG',
                            align: 'left',
                            value: 'message',
                            // sortable: false
                        },
                    ],
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
                updateTemplateView: false,
                creatingTemplate: false,
                change: false,
                oldContent: '',
            },
            send: {
                displayContacts: [],
                allContacts: [],
                additionalContacts: [],
                chosenContacts: [],
                chosenCampaign: '',
                chosenContentId: '',
                chosenContent: '',
                list: [],
                selectedListWithOptions: 'all',
                headers: [
                    {
                        text: 'CHỌN',
                        align: 'left',
                        value: 'chosen',
                        sortable: false
                    },
                    {
                        text: 'TÊN LEAD',
                        align: 'left',
                        value: 'fullName',
                        // sortable: false
                    },
                    {
                        text: 'SỐ ĐIỆN THOẠI',
                        align: 'left',
                        value: 'phone',
                        // sortable: false
                    },
                ],
                page: 1,
                //lưu id của list được chọn
                selectedListToSendSMS: '',
                pages: 1,
                remain: 10,
                phoneNumberToSend: [],
                numberOfRecipient: 0,
                exceedRecipientAlert: false,
                date: new Date().toISOString().substr(0, 10),
                // dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
                dateFormatted: '',
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
            },
            schedule: {
                headers: [
                    {
                        text: 'TÊN MẪU TIN NHẮN',
                        align: 'left',
                        value: 'campaign',
                        // sortable: false
                    },
                    {
                        text: 'THỜI GIAN GỬI',
                        align: 'left',
                        value: 'time',
                        // sortable: false
                    },
                    {
                        text: 'TRẠNG THÁI',
                        align: 'left',
                        value: 'status',
                        // sortable: false
                    },
                    {
                        text: 'HÀNH ĐỘNG',
                        align: 'right',
                        value: 'fat',
                        sortable: false
                    },
                ],
                list: [],
                detail: {
                    dialog: false,
                    content: '',
                    headers: [
                        {
                            text: 'SỐ ĐIỆN THOẠI',
                            align: 'left',
                            value: 'phoneNumber',
                            // sortable: false
                        },
                        {
                            text: 'NGÀY NHẬN',
                            align: 'left',
                            value: 'timeToSend',
                            // sortable: false
                        },
                        {
                            text: 'TRẠNG THÁI',
                            align: 'left',
                            value: 'status',
                            // sortable: false
                        },
                    ],
                    listPhone: []
                }
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
        },
        createScheduleDialog(){
            if (this.page == 'send'){
                return true;
            }
            else {
                return false;
            }
        }
    },
    methods: {
        returnTime(data) {
            return moment(data).format('YYYY/MM/DD, HH:mm:ss')
        },
        normalText(str){
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
        },
        coverTime(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss DD/MM/YYYY');
        },
        coverTime2(time){
            if (_.isNull(time)) return '';
            return moment(time).subtract(7, 'hours').format('HH:mm:ss DD/MM/YYYY');
        },
        coverTimeToSend(time){
            if (_.isNull(time)) return '';
            return moment(time).format('YYYY-MM-DDTHH:mm:ss');
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
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let res = result.response;
                    for (let i = 0; i < res.length; i++){
                        listService.getContactByListId(this.idAccount, res[i].contactConditionGroupId).then(result => {
                            const {
                                dispatch
                            } = this.$store;
                            let time = moment();
                            if(result.code == 'SUCCESS'){
                                let obj = {
                                    text: res[i].name,
                                    value: res[i].contactConditionGroupId
                                }
                                for (let k = 0; k < result.response.length; k++){
                                    result.response[k].chosen = true;
                                    result.response[k].fullName = this.checkString(result.response[k].firstName) + ' ' + this.checkString(result.response[k].lastName)
                                }
                                obj.contact = result.response;
                                this.send.list.push(obj);
                            }
                            else {
                                dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                            }
                            
                        })
                    }
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                // console.log(this.send.list);
            }).then(() => {
                this.getAllContact()
            })
        },
        checkString(str){
            if (str == null || str == undefined){
                return ''
            }
            else {
                return str;
            }
        },
        getAllContact(){
            contactService.getAllContact(this.idAccount, this.send.page).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    for (let i = 1; i <= result.response.totalPage;i++){
                        contactService.getAllContact(this.idAccount, i).then(result => {
                            const {
                                dispatch
                            } = this.$store;
                            let time = moment();
                            if(result.code == 'SUCCESS'){
                                for(let k = 0; k < result.response.results.length; k++){
                                    result.response.results[k].fullName = this.checkString(result.response.results[k].firstName) + ' ' + this.checkString(result.response.results[k].lastName)
                                    result.response.results[k].chosen = true;
                                    this.send.allContacts.push(result.response.results[k]);
                                }
                            }
                            else {
                                dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                            }
                            
                        })
                    }
                    // console.log(this.send.allContacts.length)
                    let obj = {
                        text: 'Tất cả các Lead',
                        value: 'all',
                        contact: this.send.allContacts
                    }
                    this.send.list.unshift(obj);
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
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
            console.log(this.send.chosenCampaign)
            console.log(this.send.chosenContentId);
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
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        sendSMS(){
            let timeString = this.send.date + 'T' + this.send.time
            let timeToSend = moment(timeString).utc().format().substring(0, 19)
            let listPhone = [];
            for (let i = 0; i < this.send.phoneNumberToSend.length;i++){
                let obj = {
                    phoneNumber: this.send.phoneNumberToSend[i]
                }
                listPhone.push(obj)
            }
            let body = {
                device: {
                    smsDeviceId: this.send.chosenCampaign
                },
                content: this.send.chosenContent,
                timeToSend: timeToSend,
                listPhone: listPhone
            }
            SMSService.createSchedule(this.idAccount, body).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                    this.getSchedule();
                    this.page = 'schedule'
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
            })
        },

        //SaveKey
        getListDeviceKey(){
            this.saveKey.list = [];
            SMSService.getListDeviceKey(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
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
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
            }).catch(error => {
                console.log(error)
            })
        },
        getStatisticAndHistory(){
            this.loadingTable = true;
            this.saveKey.selectedCampaignDetail = {
                total: 0,
                remain: 0,
                fail: 0,
                success: 0,
            }
            SMSService.getInfo(this.idAccount, this.saveKey.selectedCampaignId).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    this.saveKey.selectedCampaignDetail.total = result.response.smsTotal;
                    this.saveKey.selectedCampaignDetail.remain = result.response.smsRemain;
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
            })
            SMSService.getStatisticDetail(this.idAccount, this.saveKey.selectedCampaignId).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    this.saveKey.selectedCampaignDetail.success = result.response.success;
                    this.saveKey.selectedCampaignDetail.fail = result.response.fail;
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.loadingTable = false;
            });
            this.saveKey.selectedCampaignHistory.success = [];
            this.saveKey.selectedCampaignHistory.fail = [];
            SMSService.getHistoryDetail(this.idAccount, this.saveKey.selectedCampaignId).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    result.response = result.response.reverse();
                    for (let i = 0; i < result.response.length; i++){
                        let obj = {
                            phoneNumber: result.response[i].phoneNumber,
                            message: result.response[i].message,
                            statusMessage: this.returnBug(result.response[i].status),
                            status: result.response[i].status,
                            time: this.returnTime(result.response[i].createdAt)
                        }
                        if (obj.status == 'SUCCESS'){
                            this.saveKey.selectedCampaignHistory.success.push(obj);
                        }
                        else {
                            this.saveKey.selectedCampaignHistory.fail.push(obj);
                        }
                    }
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
            })
            this.loadingTable = false;
        },
        createCampaign(){
            let body = {
                name: this.saveKey.createData.name,
                apikey: this.saveKey.createData.key,
                campaign: this.saveKey.createData.campaign,
            }
            SMSService.createDeviceKey(this.idAccount, body).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            })
            SMSService.getListDeviceKey(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let data = result.response.reverse();
                    let newDeviceKey = {
                        text: data[0].campaign + ' ' + '(' + data[0].name + ')',
                        value: data[0].smsDeviceId
                    }
                    this.saveKey.list.unshift(newDeviceKey);
                    this.saveKey.list = [...this.saveKey.list]
                    this.saveKey.selectedCampaignId = newDeviceKey.value
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
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
        returnStatus(status){
            let result = ''
            if (status == 'ACTIVE'){
                result = 'Được kích hoạt'
            }
            else if (status == 'INACTIVE'){
                result = 'Đã tắt'
            }
            else if (status == 'PENDING'){
                result = 'Chờ xử lý...'
            }
            else if (status == 'INPROGRESS'){
                result = 'Đang xử lý...'
            }
            else if (status == 'STOP'){
                result = 'Bị dừng'
            }
            else if (status == 'ERROR' || status == 'FAIL'){
                result = 'Lỗi'
            }
            else if (status == 'DONE'){
                result = 'Đã gửi'
            }
            else if (status == 'TIMEOUT'){
                result = 'Bị dừng (do tốn quá nhiều thời gian xử lý)'
            }
            return result;
        },
        returnStatusColor(status){
            if (status == 'DONE'){
                return 'color: green;'
            }
            else if (status == 'STOP' || status == 'ERROR' || status == 'FAIL' || status == 'TIMEOUT'){
                return 'color: red;'
            }
            else {
                return 'color: blue;'
            }
        },
        //Template
        startCreatingTemplate(){
            this.template.creatingTemplate = true;
        },
        createNewTemplate(){
            let obj = {
                name: this.template.name,
                content: this.normalText(this.template.content),
                status: 'ACTIVE'
            }
            SMSService.createTemplate(this.idAccount, obj).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                        let obj = {
                        text: result.response.name,
                        content: result.response.content,
                        value: result.response.smsTemplateId
                    }
                    this.template.currentTemplates.unshift(obj);
                    this.template.selectedTemplateContent = this.template.currentTemplates[0].content;
                    this.template.selectedTemplateId = this.template.currentTemplates[0].value;
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
            }).catch(error => {
                console.log(error);
            })
            this.template.creatingTemplate = false;
        },
        setTemplateContent(){
            for (let i = 0; i < this.template.currentTemplates.length; i++){
                if(this.template.selectedTemplateId == this.template.currentTemplates[i].value){
                    this.template.selectedTemplateContent = this.template.currentTemplates[i].content
                    this.template.oldContent = this.template.selectedTemplateContent;
                }
            }
        },
        getTemplate(){
            SMSService.getTemplate(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
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
                    this.template.oldContent = this.template.selectedTemplateContent;
                    this.template.selectedTemplateId = this.template.currentTemplates[0].value
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
            }).catch(error => {
                console.log(error)
            })
        },
        updateTemplate(){
            this.template.selectedTemplateContent = this.normalText(this.template.selectedTemplateContent)
            let body = {
                smsTemplateId: this.template.selectedTemplateId,
                content: this.normalText(this.template.selectedTemplateContent)
            }
            SMSService.updateTemplate(this.idAccount, body).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                    SMSService.getTemplate(this.idAccount).then(result => {
                        const {
                            dispatch
                        } = this.$store;
                        let time = moment();
                        if(result.code == 'SUCCESS'){
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
                            this.template.oldContent = this.template.selectedTemplateContent;
                        }
                        else {
                            dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                        }
                        
                    })
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                this.template.updateTemplateView = false;
            }).catch(error => {
                console.log(error)
            })
        },

        //Schedule
        getSchedule(){
            this.loadingTable = true;
            this.schedule.list = [];
            SMSService.getSchedule(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let data = result.response;
                    for (let i = 0; i < data.length; i++){
                        let name = '';
                        if (data[i].device.campaign == null){
                            name = '*chiến dịch không có tên*' + ' (' + data[i].device.name + ')'
                        }
                        else{
                            name = data[i].device.campaign + ' (' + data[i].device.name + ')'
                        }
                        let obj = {
                            content: data[i].content,
                            campaign: name,
                            time: this.returnTime(data[i].timeToSend),
                            status: data[i].status,
                            listPhone: data[i].listPhone,
                            number: i,
                            id: data[i].smsScheduleId
                        }
                        this.schedule.list.push(obj);
                    }
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.loadingTable = false;
            })
        },
        openScheduleDetailDialog(id){
            this.loadingTable = true;
            let obj = null;
            SMSService.getSchedule(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let data = result.response;
                    for (let i = 0; i < data.length; i++){
                        if (id == data[i].smsScheduleId){
                            obj = data[i];
                            this.schedule.detail.content = obj.content;
                            this.schedule.detail.listPhone = obj.listPhone;
                            this.schedule.detail.dialog = true;
                        }
                    }
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
            }).catch(error => {
                console.log(error);
            }).finally (() => {
                this.loadingTable = false;
            })
        },
        changeScheduleStatus(number, status){
            let obj = this.schedule.list[number];
            let id = obj.id;
            if (status == 'ACTIVE'){
                SMSService.activateSchedule(this.idAccount, id).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    let time = moment();
                    if(result.code == 'SUCCESS'){
                        dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                        obj.status = 'ACTIVE';
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
            else {
                SMSService.deactivateSchedule(this.idAccount, id).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    let time = moment();
                    if(result.code == 'SUCCESS'){
                        dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`);
                        obj.status = 'INACTIVE';
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
            let role = this.currentUser.authorities;
            // for (let i = 0; i < role.length;i++){
            //     if ((role[i] == 'ROLE_CONTACT_COMMUNICATE_EVERYTHING' && role[i] == 'ROLE_CONTACT_VIEW_EVERYTHING') || role[i] == 'ROLE_SYSADMIN_SYSADMIN_ACCEPT'){
            //         this.access = true;
            //     }
            // }
            if ((role.includes('ROLE_SYSADMIN_SYSADMIN_ACCEPT')) || (role.includes('ROLE_CONTACT_COMMUNICATE_EVERYTHING') && role.includes("ROLE_CONTACT_VIEW_EVERYTHING"))){
                this.access = true;
            }
            if (this.access == true){
                this.getList();
                // this.getTemplate();
                // this.getListDeviceKey();
                this.getSchedule();
            }
        },
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
        this.$store.state.colorNumber = 3;
        this.getCurrentUser();
        this.send.dateFormatted = this.formatDate(new Date().toISOString().substr(0, 10))
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