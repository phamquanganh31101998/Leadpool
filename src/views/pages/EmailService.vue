<template>
    <v-content class="mt-4 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <!-- <h3 style="position: absolute; font-size: 36px;" class="ml-3">Quản lý mẫu email</h3> -->
                <h1 style="position: absolute; font-size: 28px;"  class="ml-3">Quản lý email</h1>
                <br>
            </v-flex>
            <v-flex xs12 sm12 md7 lg6 xl6>
                <v-layout row>
                    <!-- <v-flex xs5 sm5 md5 lg5 xl5 offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <v-text-field append-icon="search" v-model="search" label="Search" single-line hide-details></v-text-field>
                    </v-flex> -->
                    <!-- <v-flex xs2 md2 lg2 xl2>
                        <v-btn dark color="warning" @click="createTask = true">Create Task</v-btn>
                    </v-flex> -->
                </v-layout>
            </v-flex>
        </v-layout>
        <v-divider class="mt-5" :divider="divider"></v-divider>
        <v-layout row wrap v-if="access">
            <v-flex xs2 sm2 md2 lg2 xl2>
                <v-list>
                    <v-list-tile @click="page = 'manage', getEmailTemplate()">
                        <v-list-tile-content :style="fontWeight[0]">
                            Quản lý mẫu email
                        </v-list-tile-content>
                    </v-list-tile>
                    <!-- <v-list-tile @click="page = 'createSchedule'">
                        <v-list-tile-content :style="fontWeight[1]">
                            Đặt lịch gửi email
                        </v-list-tile-content>
                    </v-list-tile> -->
                    <v-list-tile @click="page = 'manageSchedule', getSchedule()">
                        <v-list-tile-content :style="fontWeight[2]">
                            Quản lý lịch gửi email
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <br>
                <v-divider :divider="divider"></v-divider>
            </v-flex>
            <v-flex xs10 sm10 md10 lg10 xl10 v-if="page=='manage'">
                <v-layout row>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <span><v-btn class="mt-3" round color="#3E82F7" dark @click="startCreatingTemplate()"> <v-icon>add</v-icon> Tạo mẫu email mới</v-btn></span>
                        <v-card class=" mt-3">
                            <v-card-text>
                                <!-- <div id="templateBody" style="width: 100%; margin: 10px;"></div> -->
                                <v-data-table :loading="loadingTable" rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]" :headers="headers" :items="templateSelect">
                                    <template v-slot:items="props">
                                        <tr>
                                            <td>{{props.item.text}}</td>
                                            <td>{{props.item.createdBy}}</td>
                                            <td>{{props.item.createdAt}}</td>
                                            <td>{{props.item.updatedBy}}</td>
                                            <td>{{props.item.updatedAt}}</td>
                                            <v-menu>
                                                <template v-slot:activator="{ on }">
                                                    <td class="text-xs-right"><v-btn flat fab small v-on="on"><v-icon>more_vert</v-icon></v-btn></td>
                                                </template>
                                                <v-list>
                                                    <v-list-tile @click="templateId = props.item.value, setChosenTemplate()">
                                                        <v-list-tile-content>Xem nội dung mẫu</v-list-tile-content>
                                                    </v-list-tile>
                                                    <v-list-tile @click="createBtn = false, templateId = props.item.value, getHTMLAndCSS(props.item.value)">
                                                        <v-list-tile-content>Chỉnh sửa mẫu</v-list-tile-content>
                                                    </v-list-tile>
                                                    <v-list-tile @click="confirmDeleteEmailTemplate(props.item.value)">
                                                        <v-list-tile-content>Xóa</v-list-tile-content>
                                                    </v-list-tile>
                                                </v-list>
                                            </v-menu>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-dialog persistent fullscreen v-model="createScheduleDialog">
                <v-card>
                    <v-toolbar card dark color="primary">
                        <v-btn icon dark @click="page = 'manageSchedule'">
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Tạo lịch gửi email mới</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-layout row>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-layout row>
                            <v-flex xs12 sm12 md3 lg3 xl3>
                                <v-card flat>
                                    <v-card-text>
                                        <span class="ml-4"><v-select prepend-icon="account_box" :items="allEmail" v-model="createSchedule.from" label="Chọn tài khoản gửi email"></v-select></span>
                                        <span class="ml-4"><v-text-field prepend-icon="title" v-model="createSchedule.title" label="Tiêu đề"></v-text-field></span>
                                        <span class="ml-4"><v-select :items="templateSelect" v-model="createSchedule.chosenContentId" prepend-icon="textsms" label="Chọn nội dung email"></v-select></span>

                                        <span class="ml-4"><a v-if="createSchedule.chosenContentId != ''" @click="templateId = createSchedule.chosenContentId, setChosenTemplate()">Xem mẫu email </a></span>
                                        <br>
                                        <br>
                                        <v-divider :divider="divider"></v-divider>
                                        <v-select prepend-icon="people" :items="createSchedule.list" label="Chọn danh sách gửi" v-model="createSchedule.selectedListToSendSMS"></v-select>
                                        <v-divider :divider="divider"></v-divider>
                                        <span class="ml-4">
                                            <v-menu ref="menu1" v-model="createSchedule.menu1" :close-on-content-click="false" lazy
                                                transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field v-model="createSchedule.date" label="Chọn ngày gửi"  persistent-hint prepend-icon="event"
                                                        v-on="on">
                                                    </v-text-field>
                                                </template>
                                                <v-date-picker v-model="createSchedule.date"  no-title @input="createSchedule.menu1 = false"></v-date-picker>
                                            </v-menu>
                                        </span>
                                        <span class="ml-4">
                                            <v-select  prepend-icon="access_time" label="Chọn giờ gửi" v-model="createSchedule.time" :items="createSchedule.timeToChoose"></v-select>
                                        </span>
                                    </v-card-text>
                                </v-card>
                                <v-card flat>
                                    <v-card-text>
                                        <h4>Đã chọn {{createSchedule.numberOfRecipient}} người nhận</h4>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn dark block color="#3E82F7" :disabled="createSchedule.from == '' || createSchedule.title == '' || createSchedule.chosenContentId == ''" @click="sendEmail()">Đặt lịch gửi</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm12 md9 lg9 xl9 class="ml-3">
                                <v-card flat v-if="createSchedule.displayContacts.length > 0">
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
                                                <v-alert type="error" :value="send.exceedRecipientAlert" >Số lượng người nhận không được lớn hơn số tin nhắn còn lại (Bạn đã chọn {{send.emailToSend.length}} người nhận)</v-alert>
                                            </v-flex> -->
                                        </v-layout>
                                    </v-card-title>
                                    <v-card-text>

                                        <v-data-table :loading="loadingTable" rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]" dense :headers="createSchedule.headers" :items="createSchedule.displayContacts" class="elevation-1" no-data-text="Chưa chọn danh sách ">
                                            <template v-slot:items="props">
                                                <tr>
                                                    <!-- @change="checkChosenContact(props.item.contactId, props.item.chosen)" -->
                                                    <td><v-checkbox style="padding: 0px 0px 0px 0px; height: 30px;" 
                                                            v-model="props.item.chosen" 
                                                            @change="getEmailToSend()"
                                                            >
                                                            </v-checkbox></td>
                                                    <td>{{ props.item.firstName }} {{ props.item.lastName}}</td>
                                                    <td>{{ props.item.email }}</td>
                                                </tr>
                                            </template>
                                        </v-data-table>
                                        <br>
                                        <!-- <v-pagination v-model="send.page" :length="send.pages"></v-pagination> -->
                                        <br>

                                    
                                    </v-card-text>
                                </v-card>
                                <v-card flat class="mt-3" v-if="createSchedule.additionalContacts.length > 0">
                                    <v-card-title>
                                        <v-layout row wrap>
                                            <v-flex xs6 sm6 md6 lg6 xl6>
                                                <h2>Chọn thêm người nhận</h2>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-title>
                                    <v-card-text>
                                        <!-- <v-select label="Danh sách người nhận" :items="['Theo danh sách', 'Tự chọn']"></v-select> -->
                                        <v-data-table :loading="loadingTable" rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]" dense :headers="createSchedule.headers" :items="createSchedule.additionalContacts"  class="elevation-1">
                                            <template v-slot:items="props">
                                                <tr>
                                                    <!-- @change="checkChosenContact(props.item.contactId, props.item.chosen)" -->
                                                    <td><v-checkbox style="padding: 0px 0px 0px 0px; height: 30px;" 
                                                            v-model="props.item.chosen" 
                                                            @change="getEmailToSend()"
                                                            >
                                                            </v-checkbox></td>
                                                    <td>{{ props.item.firstName }} {{ props.item.lastName}}</td>
                                                    <td>{{ props.item.email }}</td>
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
                    </v-flex>
                </v-layout>
                </v-card>
            </v-dialog>
            <v-flex xs10 sm10 md10 lg10 xl10 v-if="page=='manageSchedule'">
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12 xl12 class="mb-3 mt-3">
                        <v-btn round dark color="#3E82F7" @click="page='createSchedule'"> <v-icon>add</v-icon> Tạo lịch gửi mới</v-btn>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-card width="100%">
                            <v-data-table :loading="loadingTable" rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]" :headers="manageSchedule.headers" :items="manageSchedule.list">
                                <template v-slot:items="props">
                                    <tr>
                                        <!-- @change="checkChosenContact(props.item.contactId, props.item.chosen)" -->
                                        <td>{{ props.item.title }}</td>
                                        <td>{{ props.item.from }} </td>
                                        <td>{{ props.item.time }} </td>
                                        <td style="color: red" v-if="props.item.status == 'INACTIVE'">{{ returnStatus(props.item.status) }}</td>
                                        <td style="color: green" v-if="props.item.status == 'ACTIVE'">{{ returnStatus(props.item.status) }}</td>
                                        <td>{{props.item.createdBy}}</td>
                                        <v-menu offset-x>
                                            <template v-slot:activator="{ on }">
                                                <td class="text-xs-right">
                                                    <v-btn flat fab small v-on="on"><v-icon>more_vert</v-icon></v-btn>
                                                </td>
                                            </template>
                                            <v-list>
                                                <v-list-tile @click="templateId = props.item.templateId, setChosenTemplate()">
                                                    <v-list-tile-content>Xem nội dung email</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile @click="openScheduleDetailDialog(props.item.id)">
                                                    <v-list-tile-content>Xem chi tiết lịch gửi</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile v-if="props.item.status == 'ACTIVE'" @click="changeScheduleStatus(props.item.id, 'INACTIVE'), props.item.status = 'INACTIVE'">
                                                    <v-list-tile-content>Tắt lịch gửi</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile v-if="props.item.status == 'INACTIVE'" @click="changeScheduleStatus(props.item.id, 'ACTIVE'), props.item.status = 'ACTIVE'">
                                                    <v-list-tile-content>Kích hoạt lịch gửi</v-list-tile-content>
                                                </v-list-tile>
                                            </v-list>
                                        </v-menu>
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-card>
                        
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-layout style="height: 300px;">
                    <v-flex xs12 sm12 md12 lg12 xl12>
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
                    <!-- <v-flex xs3 sm3 md3 lg3 xl3 offset-xs1 offset-sm1 offset-md1 offset-lg1 offset-xl1>
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
                    </v-flex> -->
                </v-layout>
            </v-flex>
        </v-layout>
        <v-dialog v-model="manageSchedule.detail.dialog" width="60%" persistent>
            <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                    <span class="headline">Chi tiết</span>
                </v-card-title>
                <v-card-text>
                    <v-data-table :loading="loadingTable" rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]" :headers="manageSchedule.detail.headers" :items="manageSchedule.detail.listEmail">
                        <template v-slot:items="props">
                            <tr>
                                <!-- @change="checkChosenContact(props.item.contactId, props.item.chosen)" -->
                                <td>{{ props.item.email}}</td>
                                <td>{{ returnTime(props.item.timeToSend) }} </td>
                                <td :style="returnStatusColor(props.item.status)">{{ returnStatus(props.item.status) }}</td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card-text>
                <v-divider :divider="divider"></v-divider>
                <v-card-actions>
                    <v-btn flat color="red" @click="manageSchedule.detail.dialog = false">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <v-dialog v-model="viewDialog" persistent>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="viewDialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Nội dung mẫu email</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        
                       
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <div id="templateBody" style="width: 100%; margin: 10px;"></div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="create.editorDialog" fullscreen>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="create.editorDialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Mẫu email</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- <v-toolbar-items>
                        <v-tooltip top v-if="!create.btn">
                            <template v-slot:activator="{ on }">
                                <v-icon color="primary" dark v-on="on">help</v-icon>
                            </template>
                            <span>Kéo các thành phần vào ở cột bên trái, chỉnh sửa thuộc tính của thành phần ở cột bên phải</span>
                            <span></span>
                        </v-tooltip>
                    </v-toolbar-items> -->
                    <v-toolbar-items>
                        <v-btn dark flat v-if="createBtn" @click="create.dialog = true">Tạo</v-btn>
                        <v-btn dark flat v-else @click="updateTemplate(templateId)">Lưu lại</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-layout>
                    <v-flex xs2 sm2 md2 lg2 xl2>
                        <div id="blocks" style="width: 100%; height: 100%;" ></div>
                    </v-flex>
                    <v-flex xs10 sm10 md10 lg10 xl10>
                        <div class="editor-row" style="height: 100%;">
                            <div class="editor-canvas" style="height: 100%;">
                                <div id="gjs" style="height: 100%;"></div>
                            </div>
                            <div class="panel__right" >
                                <div class="layers-container"></div>
                                <div class="styles-container"></div>
                                <div class="traits-container"></div>
                            </div>
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>
        <v-dialog v-model="create.dialog" width="30%" persistent>
            <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                    <span class="headline">Tạo mẫu email mới</span>
                </v-card-title>
                <v-card-text>
                    <span class="mt-4"><strong>Tên mẫu </strong></span>
                    <span class="ml-4"><v-text-field v-model="create.name"></v-text-field></span>
                </v-card-text>
                <v-divider :divider="divider"></v-divider>
                <v-card-actions>
                    <v-btn flat color="primary" @click="createNewTemplate()" :disabled="create.name == ''">Tạo</v-btn>
                    <v-btn flat color="red" @click="create.dialog = false">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="create.successfulDialog" @click:outside="create.successfulDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="#00C853">
                    <v-toolbar-title>Thành công</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Tạo mẫu email mới thành công
                </v-card-text>
                <v-card-actions>
                    <v-btn flat color="#00C853" @click="create.successfulDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="create.failDialog" @click:outside="create.failDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Thất bại</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Đã có lỗi xảy ra khi tạo mẫu email. Xin hãy thử lại.
                </v-card-text>
                <v-card-actions>
                    <v-btn flat color="red" @click="create.failDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="createSchedule.successfulDialog" @click:outside="createSchedule.successfulDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="#00C853">
                    <v-toolbar-title>Thành công</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Tạo lịch gửi thành công
                </v-card-text>
                <v-card-actions>
                    <v-btn flat color="#00C853" @click="createSchedule.successfulDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="createSchedule.failDialog" @click:outside="createSchedule.failDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Thất bại</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Đã có lỗi xảy ra khi tạo lịch gửi. Xin hãy thử lại.
                </v-card-text>
                <v-card-actions>
                    <v-btn flat color="red" @click="createSchedule.failDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="deleteEmailTemplateDialog.dialog" @click:outside="deleteEmailTemplateDialog.dialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                <v-toolbar-title>Xóa?</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Bạn có chắc chắn muốn xóa mẫu email này?
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="deleteEmailTemplate(deleteEmailTemplateDialog.id)">Xóa</v-btn>
                <v-btn flat color="primary" @click="deleteEmailTemplateDialog.dialog = false">Quay lại</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-content>
</template>
<script>
import alert from '@/components/alert'
import listService from '../../services/list.services'
import moment from 'moment'
import contactService from '../../services/contacts.service'
import emailService from '../../services/email.service'
export default {
    components: {
        alert
    },
    data(){
        return{
            loadingTable: false,
            createBtn: true,
            title: 'Tạo mẫu email mới',
            allEmail: [],
            currentUser: null,
            access: false,
            page: 'manage',
            fontWeight: ['font-weight: bold', '', ''],
            templates: [],
            templateSelect: [],
            templateId: '',
            chosenTemplate: null,
            htmlText: '',
            divider: true,
            editor: null,
            counter: 0,
            headers: [
                {
                    text: 'TÊN MẪU',
                    align: 'left',
                    // sortable: false,
                    value: 'text'
                },
                {
                    text: 'NGƯỜI TẠO',
                    align: 'left',
                    // sortable: false,
                    value: 'createdBy'
                },
                {
                    text: 'THỜI GIAN TẠO',
                    align: 'left',
                    // sortable: false,
                    value: 'createdAt'
                },
                {
                    text: 'NGƯỜI CHỈNH SỬA LẦN CUỐI',
                    align: 'left',
                    // sortable: false,
                    value: 'updatedBy'
                },
                {
                    text: 'THỜI GIAN CHỈNH SỬA CUỐI CÙNG',
                    align: 'left',
                    // sortable: false,
                    value: 'updatedAt'
                },
                {
                    text: 'HÀNH ĐỘNG',
                    align: 'right',
                    sortable: false,
                    value: 'name'
                }
            ],
            create: {
                dialog: false,
                name: '',
                btn: true,
                editorDialog: false,
                successfulDialog: false,
                failDialog: false,
            },
            viewDialog: false,
            createSchedule: {
                successfulDialog: false,
                failDialog: false,
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
                        text: 'EMAIL',
                        align: 'left',
                        value: 'fat',
                        sortable: false
                    },
                ],
                page: 1,
                //lưu id của list được chọn
                selectedListToSendSMS: '',
                pages: 1,
                remain: 10,
                emailToSend: [],
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
                from: '',
                title: ''
            },
            manageSchedule: {
                headers: [
                    {
                        text: 'TIÊU ĐỀ',
                        align: 'left',
                        value: 'title',
                        // sortable: false
                    },
                    {
                        text: 'NGƯỜI GỬI',
                        align: 'left',
                        value: 'from',
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
                        text: 'NGƯỜI ĐẶT LỊCH',
                        align: 'left',
                        value: 'createdBy',
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
                    listEmail: [],
                    headers: [
                        {
                            text: 'NGƯỜI NHẬN',
                            align: 'left',
                            value: 'email',
                            // sortable: false
                        },
                        {
                            text: 'THỜI GIAN NHẬN',
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
                }
            },
            deleteEmailTemplateDialog: {
                dialog: false,
                id: ''
            }
        }
    },
    props: {
        idAccount: {
            type: String,
            default: null
        }
    },
    watch: {
        page(){
            this.fontWeight = ['','',''];
            if(this.page == 'manage'){
                this.fontWeight[0] = 'font-weight: bold';
            }
            else if (this.page == 'createSchedule'){
                this.fontWeight[1] = 'font-weight: bold';
            }
            else {
                this.fontWeight[2] = 'font-weight: bold'
            }
        },
        'create.editorDialog'(){
            if(this.create.editorDialog == true && this.counter == 0){
                this.grape()
            }
            this.counter = this.counter + 1 ;
        },
        'createSchedule.selectedListToSendSMS'(){
            this.createSchedule.displayContacts = [];
            this.createSchedule.additionalContacts = [];
            //lấy danh sách các contact để hiển thị
            for (let i = 0; i < this.createSchedule.list.length; i++){
                if (this.createSchedule.selectedListToSendSMS == this.createSchedule.list[i].value){
                    this.createSchedule.displayContacts = this.createSchedule.list[i].contact;
                }
            }
            for (let i = 0; i < this.createSchedule.displayContacts.length; i++){
                this.createSchedule.displayContacts[i].chosen = true;
            }
            //lấy danh sách các contact để chọn thêm
            for (let k = 0; k < this.createSchedule.allContacts.length; k++){
                let found = false;
                for (let j = 0; j < this.createSchedule.displayContacts.length; j++){
                    if(this.createSchedule.displayContacts[j].contactId == this.createSchedule.allContacts[k].contactId){
                        found = true;
                    }
                }
                if (found == false){
                    this.createSchedule.additionalContacts.push(this.createSchedule.allContacts[k])
                }
            }
            for (let i = 0; i < this.createSchedule.additionalContacts.length; i++){
                this.createSchedule.additionalContacts[i].chosen = false;
            }
            this.createSchedule.additionalContacts = [...this.createSchedule.additionalContacts];
            this.createSchedule.displayContacts = [...this.createSchedule.displayContacts]
            this.getEmailToSend()
        },
    },
    computed: {
        createScheduleDialog(){
            if (this.page == 'createSchedule'){
                return true;
            }
            else {
                return false;
            }
        }
    },
    methods: {
        startCreatingTemplate(){
            this.createBtn = true;
            localStorage.setItem('gjs-html', '');
            localStorage.setItem('gjs-css', '');
            this.create.editorDialog = true;
            this.load()
            
        },
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        confirmDeleteEmailTemplate(idTemplate){
            this.deleteEmailTemplateDialog.dialog = true;
            this.deleteEmailTemplateDialog.id = idTemplate;
        },
        deleteEmailTemplate(id){
            emailService.deleteEmailTemplate(this.idAccount, id).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                    eventBus.updateNoteList();
                    this.deleteNoteDialog.id = '';
                    this.deleteNoteDialog.dialog = false;
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.deleteEmailTemplateDialog.dialog = false;
                this.getEmailTemplate();
            })
        },
        //manage template
        covertime(time) {
            if (_.isNull(time)) return '';
            return moment(time).format('YYYY/MM/DD, HH:mm:ss')
        },
        getEmailTemplate(){
            this.loadingTable = true;
            emailService.getEmailTemplate(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    this.templates = result.response.reverse();
                    this.templateSelect = [];
                    this.templateSelect = this.setSelectEmailTemplate(this.templates);
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
        setSelectEmailTemplate(templateArray){
            let result = [];
            for (let i = 0; i < templateArray.length;i++){
                const obj = {
                    text: templateArray[i].title,
                    value: templateArray[i].emailTemplateId,
                    createdBy: templateArray[i].createdBy,
                    createdAt: this.covertime(templateArray[i].createdAt),
                    updatedBy: templateArray[i].updatedBy,
                    updatedAt: this.covertime(templateArray[i].updateAt),
                    content: templateArray[i].content
                }
                result.push(obj);
            }
            return result;
        },
        setChosenTemplate(){
            for (let i = 0; i < this.templates.length; i++){
                if(this.templates[i].emailTemplateId == this.templateId){
                    this.chosenTemplate = this.templates[i];
                }
            }
            let regex = /\\\"/gi
            this.htmlText = this.chosenTemplate.content;
            document.getElementById("templateBody").innerHTML = this.htmlText.replace(regex, "\"");
            this.viewDialog = true;
        },
        grape(){
            this.editor = null;
            this.editor = grapesjs.init({
                // Indicate where to init the editor. You can also pass an HTMLElement
                container: '#gjs',
                // Get the content for the canvas directly from the element
                // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
                fromElement: true,
                // Size of the editor
                height: '100%',
                width: '100%',
                // Disable the storage manager for the moment
                storageManager: {
                    id: 'gjs-',             // Prefix identifier that will be used inside storing and loading
                    type: 'local',          // Type of the storage
                    autosave: true,         // Store data automatically
                    autoload: false,         // Autoload stored data on init
                    stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
                    storeComponents: false,  // Enable/Disable storing of components in JSON format
                    storeStyles: false,      // Enable/Disable storing of rules in JSON format
                    storeHtml: true,        // Enable/Disable storing of components as HTML string
                    storeCss: true,         // Enable/Disable storing of rules as CSS string
                },
                // layerManager: {
                //     appendTo: '.layers-container'
                // },
                traitManager: {
                    appendTo: '.traits-container',
                },
                // We define a default panel as a sidebar to contain layers
                panels: {
                    
                    defaults: [{
                    id: 'layers',
                    el: '.panel__right',
                    // Make the panel resizable
                    resizable: {
                        maxDim: 350,
                        minDim: 200,
                        tc: 0, // Top handler
                        cl: 1, // Left handler
                        cr: 0, // Right handler
                        bc: 0, // Bottom handler
                        // Being a flex child we need to change `flex-basis` property
                        // instead of the `width` (default)
                        keyWidth: 'flex-basis',
                    },
                    buttons: [
                            // {
                            //     id: 'show-layers',
                            //     active: true,
                            //     label: 'Layers',
                            //     command: 'show-layers',
                            //     // Once activated disable the possibility to turn it off
                            //     togglable: false,
                            // }, 
                            // {
                            //     id: 'show-style',
                            //     active: true,
                            //     label: 'Styles',
                            //     command: 'show-styles',
                            //     togglable: false,
                            // },
                            // {
                            //     id: 'show-traits',
                            //     active: true,
                            //     label: 'Traits',
                            //     command: 'show-traits',
                            //     togglable: false,
                            // }
                        ]
                    }]
                },
                // selectorManager: {
                //     appendTo: '.styles-container'
                // },
                blockManager: {
                    appendTo: '#blocks',
                    blocks: [

                        {
                            id: 'label',
                            label: '<h2>Tiêu đề</h2>',
                            content: '<h1 style="text-align: center;">Tiêu đề</h1>',
                        },
                        {
                            id: 'section',
                            label: '<h2>Đề mục</h2>',
                            content: '<div><h3>Đề mục</h3><p>Nội dung........</p></div>',
                        },
                        {
                            id: 'text',
                            label: '<h2>Văn bản</h2>',
                            content: '<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Nulla pellentesque dignissim enim sit amet venenatis urna cursus eget. Leo urna molestie at elementum eu facilisis sed. Tortor id aliquet lectus proin nibh nisl. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel. Venenatis cras sed felis eget velit aliquet sagittis id. Pretium quam vulputate dignissim suspendisse in est. Massa placerat duis ultricies lacus sed turpis tincidunt id. Duis ultricies lacus sed turpis tincidunt. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus. Rhoncus mattis rhoncus urna neque viverra justo nec. Malesuada fames ac turpis egestas integer eget. Felis bibendum ut tristique et egestas quis ipsum. Augue neque gravida in fermentum.</span>',
                            
                        }, 
                        {
                            id: 'image',
                            label: '<h2>Hình ảnh</h2>',
                            // Select the component once it's dropped
                            select: true,
                            // You can pass components as a JSON instead of a simple HTML string,
                            // in this case we also use a defined component type `image`
                            content: { type: 'image' },
                            // This triggers `active` event on dropped components and the `image`
                            // reacts by opening the AssetManager
                            activate: true,
                        },
                        {
                            id: 'link',
                            label: '<h2>Đường dẫn</h2>',
                            // Select the component once it's dropped
                            select: true,
                            // You can pass components as a JSON instead of a simple HTML string,
                            // in this case we also use a defined component type `image`
                            content: '<span><a href="http://www.google.com.vn">Đường dẫn đến.............</a></span>',
                            // This triggers `active` event on dropped components and the `image`
                            // reacts by opening the AssetManager
                            activate: true,
                        },
                        {
                            id: 'btn-link',
                            label: '<h2>Đường dẫn (nút bấm)</h2>',
                            // Select the component once it's dropped
                            select: true,
                            // You can pass components as a JSON instead of a simple HTML string,
                            // in this case we also use a defined component type `image`
                            content: '<span><a href="https://www.google.com/" style="background-color: #1c87c9;border: none;color: white;padding: 20px 34px;text-align: center;text-decoration: none;display: inline-block;font-size: 20px;margin: 4px 2px;cursor: pointer;">Click Here</a></span>',
                            // This triggers `active` event on dropped components and the `image`
                            // reacts by opening the AssetManager
                            activate: true,
                        },
                        {
                            id: 'divider',
                            label: '<h2>Đường kẻ phân tách</h2>',
                            // Select the component once it's dropped
                            select: true,
                            // You can pass components as a JSON instead of a simple HTML string,
                            // in this case we also use a defined component type `image`
                            content: '<hr style="color: #DDDDDD">',
                            // This triggers `active` event on dropped components and the `image`
                            // reacts by opening the AssetManager
                            activate: true,
                        },
                        {
                            id: 'table',
                            label: '<h2>2 cột </h2>',
                            // Select the component once it's dropped
                            select: true,
                            // You can pass components as a JSON instead of a simple HTML string,
                            // in this case we also use a defined component type `image`
                            content: '<table ><tr><td style="width: 400px;"><div>Nội dung</div></td><td style="width: 400px;"><div>Nội dung</div></td></table>',
                            // This triggers `active` event on dropped components and the `image`
                            // reacts by opening the AssetManager
                            activate: true,
                        },
                        {
                            id: 'lastName',
                            label: '<h2>Họ</h2>',
                            select: true,
                            content: '<span>{{Contact.lastName}}</span>',
                            activate: true,
                        },
                        {
                            id: 'firstName',
                            label: '<h2>Tên</h2>',
                            select: true,
                            content: '<span>{{Contact.firstName}}</span>',
                            activate: true,
                        },
                        {
                            id: 'city',
                            label: '<h2>Thành phố</h2>',
                            select: true,
                            content: '<span>{{Contact.city}}</span>',
                            activate: true,
                        },
                        {
                            id: 'phone',
                            label: '<h2>Số điện thoại</h2>',
                            select: true,
                            content: '<span>{{Contact.phone}}</span>',
                            activate: true,
                        },
                        {
                            id: 'bussiness',
                            label: '<h2>Công ty</h2>',
                            select: true,
                            content: '<span>{{Contact.bussiness}}</span>',
                            activate: true,
                        },
                        {
                            id: 'email',
                            label: '<h2>Email</h2>',
                            select: true,
                            content: '<span>{{Contact.email}}</span>',
                            activate: true,
                        },
                    ]
                },
                styleManager: {
                    appendTo: '.styles-container',
                    sectors: 
                    [
                        {
                            name: 'Spacing',
                            open: false,
                            // Use built-in properties
                            buildProps: ['width', 'height', 'padding-top' , 'padding-bottom' , 'padding-left' , 'padding-right', 
                            'margin-top', 'margin-bottom', 'margin-left', 'margin-right' ],
                            // Use `properties` to define/override single property
                            properties: [
                                {
                                    // Type of the input,
                                    // options: integer | radio | select | color | slider | file | composite | stack
                                    type: 'integer',
                                    name: '<h3>Width</h3>', // Label for the property
                                    property: 'width', // CSS property (if buildProps contains it will be extended)
                                    units: ['px', '%'], // Units, available only for 'integer' types
                                    defaults: 'auto', // Default value
                                    min: 0, // Min value, available only for 'integer' types
                                },
                                {
                                    // Type of the input,
                                    // options: integer | radio | select | color | slider | file | composite | stack
                                    type: 'integer',
                                    name: '<h3>Height</h3>', // Label for the property
                                    property: 'height', // CSS property (if buildProps contains it will be extended)
                                    units: ['px', '%'], // Units, available only for 'integer' types
                                    defaults: 'auto', // Default value
                                    min: 0, // Min value, available only for 'integer' types
                                },
                                {
                                    // Type of the input,
                                    // options: integer | radio | select | color | slider | file | composite | stack
                                    type: 'integer',
                                    name: '<h3>Padding Top</h3>', // Label for the property
                                    property: 'padding-top', // CSS property (if buildProps contains it will be extended)
                                    units: ['px', '%'], // Units, available only for 'integer' types
                                    defaults: 'auto', // Default value
                                    min: 0, // Min value, available only for 'integer' types
                                },
                                {
                                    // Type of the input,
                                    // options: integer | radio | select | color | slider | file | composite | stack
                                    type: 'integer',
                                    name: '<h3>Padding Bottom</h3>', // Label for the property
                                    property: 'padding-bottom', // CSS property (if buildProps contains it will be extended)
                                    units: ['px', '%'], // Units, available only for 'integer' types
                                    defaults: 'auto', // Default value
                                    min: 0, // Min value, available only for 'integer' types
                                },
                                {
                                    // Type of the input,
                                    // options: integer | radio | select | color | slider | file | composite | stack
                                    type: 'integer',
                                    name: '<h3>Padding Left</h3>', // Label for the property
                                    property: 'padding-left', // CSS property (if buildProps contains it will be extended)
                                    units: ['px', '%'], // Units, available only for 'integer' types
                                    defaults: 'auto', // Default value
                                    min: 0, // Min value, available only for 'integer' types
                                },
                                {
                                    // Type of the input,
                                    // options: integer | radio | select | color | slider | file | composite | stack
                                    type: 'integer',
                                    name: '<h3>Padding Right</h3>', // Label for the property
                                    property: 'padding-right', // CSS property (if buildProps contains it will be extended)
                                    units: ['px', '%'], // Units, available only for 'integer' types
                                    defaults: 'auto', // Default value
                                    min: 0, // Min value, available only for 'integer' types
                                },

                                {
                                    // Type of the input,
                                    // options: integer | radio | select | color | slider | file | composite | stack
                                    type: 'integer',
                                    name: '<h3>Margin Top</h3>', // Label for the property
                                    property: 'margin-top', // CSS property (if buildProps contains it will be extended)
                                    units: ['px', '%'], // Units, available only for 'integer' types
                                    defaults: 'auto', // Default value
                                    min: 0, // Min value, available only for 'integer' types
                                },
                                {
                                    // Type of the input,
                                    // options: integer | radio | select | color | slider | file | composite | stack
                                    type: 'integer',
                                    name: '<h3>Margin Bottom</h3>', // Label for the property
                                    property: 'margin-bottom', // CSS property (if buildProps contains it will be extended)
                                    units: ['px', '%'], // Units, available only for 'integer' types
                                    defaults: 'auto', // Default value
                                    min: 0, // Min value, available only for 'integer' types
                                },
                                {
                                    // Type of the input,
                                    // options: integer | radio | select | color | slider | file | composite | stack
                                    type: 'integer',
                                    name: '<h3>Margin Left</h3>', // Label for the property
                                    property: 'margin-left', // CSS property (if buildProps contains it will be extended)
                                    units: ['px', '%'], // Units, available only for 'integer' types
                                    defaults: 'auto', // Default value
                                    min: 0, // Min value, available only for 'integer' types
                                },
                                {
                                    // Type of the input,
                                    // options: integer | radio | select | color | slider | file | composite | stack
                                    type: 'integer',
                                    name: '<h3>Margin Right</h3>', // Label for the property
                                    property: 'margin-right', // CSS property (if buildProps contains it will be extended)
                                    units: ['px', '%'], // Units, available only for 'integer' types
                                    defaults: 'auto', // Default value
                                    min: 0, // Min value, available only for 'integer' types
                                },
                            ]
                        },
                        {
                            name: 'Styling',
                            open: true,
                            buildProps: ['background-color', 'font-family', 'custom-prop', 'color', 'font-size'],
                            properties: [
                                {
                                    id: 'font-size',
                                    name: '<h3>Size</h3>',
                                    property: 'font-size',
                                    type: 'integer',
                                    units: ['px', '%'],
                                    defaults: 'auto',
                                    min: 1
                                },
                                {
                                    id: 'font-family',
                                    name: '<h3>Font</h3>',
                                    property: 'font-family',
                                    type: 'select',
                                    defaults: 'auto',
                                    // List of options, available only for 'select' and 'radio'  types
                                    options: [
                                        { value: 'Arial', name: 'Arial' },
                                        { value: 'Times New Roman', name: 'Times New Roman' },
                                        { value: 'Roboto', name: 'Roboto' },
                                        { value: 'Georgia', name: 'Georgia' },
                                        { value: 'Helvetica', name: 'Helvetica' },
                                        { value: 'Tahoma', name: 'Tahoma' },
                                        { value: 'Verdana', name: 'Verdana' },
                                        { value: 'Impact', name: 'Impact' },
                                        { value: 'Brush Script MT', name: 'Brush Script MT' },
                                        { value: 'Trebuchet MS', name: 'Trebuchet MS' },
                                        { value: 'Courier New', name: 'Courier New' },
                                    ],
                                },
                                {
                                    id: 'custom-prop',
                                    name: '<h3>Alignment</h3>',
                                    property: 'text-align',
                                    type: 'select',
                                    defaults: 'auto',
                                    // List of options, available only for 'select' and 'radio'  types
                                    options: [
                                        { value: 'center', name: 'Center' },
                                        { value: 'left', name: 'Left' },
                                        { value: 'right', name: 'Right' },
                                        { value: 'justify', name: 'Justify' },
                                    ],
                                },
                                {
                                    id: 'background-color',
                                    name: '<h3>Background Color</h3>',
                                    property: 'background-color',
                                    type: 'color',
                                    defaults: 'auto',
                                },
                                {
                                    id: 'color',
                                    name: '<h3>Text Color</h3>',
                                    property: 'color',
                                    type: 'color',
                                    defaults: 'auto',
                                }
                            ]
                        },
                        {
                            name: 'Border',
                            open: false,
                            buildProps: ['border'],
                            
                        }
                    ]
                },
                assetManager: {
                    assets: [
                        'http://placehold.it/350x250/78c5d6/fff/image1.jpg',
                        // Pass an object with your properties
                        {
                            type: 'image',
                            src: 'http://placehold.it/350x250/459ba8/fff/image2.jpg',
                            height: 350,
                            width: 250
                        },
                        {
                            // As the 'image' is the base type of assets, omitting it will
                            // be set as `image` by default
                            src: 'http://placehold.it/350x250/79c267/fff/image3.jpg',
                            height: 350,
                            width: 250
                        },
                    ],
                    uploadText: 'Hiện tại chưa hỗ trợ upload ảnh từ máy tính của bạn (ảnh sẽ không thể hiển thị bên phía người nhận), bạn có thể lấy link ảnh từ google drive,...',
                    addBtnText: 'Thêm ảnh từ link',
                    handleAdd: (textFromInput) => {
                            // some check...
                            console.log(textFromInput)
                            if (textFromInput.includes('https://drive.google.com/open?')){
                                var ggLink = this.getImageFromGGDriveLink(textFromInput);
                                this.editor.AssetManager.add(ggLink);
                            }
                            else {
                                this.editor.AssetManager.add(textFromInput);
                            }
                            
                        }
                    }
            });
            
            this.editor.Commands.add('show-styles', {
                getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
                getStyleEl(row) { return row.querySelector('.styles-container') },

                run(editor, sender) {
                    const smEl = this.getStyleEl(this.getRowEl(editor));
                    smEl.style.display = '';
                },
                stop(editor, sender) {
                    const smEl = this.getStyleEl(this.getRowEl(editor));
                    smEl.style.display = 'none';
                },
            });
            

            this.editor.on('asset:upload:start', opts => {
                console.log(opts)
            });
            this.editor.on('asset:remove', opts => {
                console.log(opts)
            });
            this.editor.on('asset:add', opts => {
                console.log(opts)
            });
            // The upload is ended (completed or not)
            this.editor.on('asset:upload:end', opts => {
                console.log(opts)
            });

            // Error handling
            this.editor.on('asset:upload:error', (err) => {
                console.log(err)
            });

            // Do something on response
            this.editor.on('asset:upload:response', (response) => {
                // alert('hú');
            });

            console.log(this.editor)
        },
        getImageFromGGDriveLink(link){
            let result = '';
            result = link.replace('open?', 'uc?');
            return result;
        },
        alerting(){
            // alert('hú');
        },
        getHTMLAndCSS(id){
            try {
                let obj = {};
                for (let i = 0; i < this.templates.length; i++){
                    if(this.templates[i].emailTemplateId == id){
                        obj = this.templates[i];
                    }
                }
                let regex = /\\\"/gi
                let newStr = obj.content.replace(regex, "\"");
                let startHTML = newStr.indexOf('<body>');
                let endHTML = newStr.lastIndexOf('</body>');
                let startCSS = newStr.indexOf('<style>');
                let endCSS = newStr.indexOf('</style>')
                let HTML = newStr.substring(startHTML + 6, endHTML);
                let CSS = newStr.substring(startCSS + 7, endCSS);
                localStorage.setItem('gjs-html', HTML);
                localStorage.setItem('gjs-css', CSS);
                
            } catch (error) {
                
            }
            finally {
                // this.load();
                this.create.editorDialog = true;    
                this.load()
            }
            
        },
        load(){
            this.editor.load();
        },
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        updateTemplate(id){
            let obj = {};
            for (let i = 0; i < this.templates.length; i++){
                if(this.templates[i].emailTemplateId == id){
                    obj = this.templates[i];
                }
            }
            let html = localStorage.getItem('gjs-html');
            let css = localStorage.getItem('gjs-css');
            let content = `<!DOCTYPE html><html><head><style>` + css + `</style></head><body>` + html + `</body></html>`
            let body = {
                emailTemplateId: obj.emailTemplateId,
                title: obj.title,
                content: content,
                status: 'draft',
                accountId: this.idAccount
            };
            emailService.updateEmailTemplate(this.idAccount, body).then(result => {
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

            }).finally(() => {
                this.create.editorDialog = false;
                this.getEmailTemplate()
            })
        },
        createNewTemplate(){
            let html = localStorage.getItem('gjs-html');
            let css = localStorage.getItem('gjs-css');
            let content = `<!DOCTYPE html><html><head><style>` + css + `</style></head><body>` + html + `</body></html>`
            let body = {
                title: this.create.name,
                content: content,
                status: 'draft'
            };
            emailService.createEmailTemplate(this.idAccount, body).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                    localStorage.removeItem('gjs-html');
                    localStorage.removeItem('gjs-css');
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.create.dialog = false;
                this.create.editorDialog = false;
                this.getEmailTemplate()
            })
        },





        //create schedule
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
                            let obj = {
                                text: res[i].name,
                                value: res[i].contactConditionGroupId
                            }
                            for (let k = 0; k < result.response.length; k++){
                                result.response[k].chosen = true;
                            }
                            obj.contact = result.response;
                            this.createSchedule.list.push(obj);
                        })
                    }
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
                // console.log(this.createSchedule.list);
            }).then(() => {
                this.getAllContact()
            }).catch(error => {
                console.log(error);
            })
        },
        getAllEmail(){
            this.allEmail = [];
            emailService.getAllEmail(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    result.response.filter(e => {
                        const obj = {
                            text: e.name + ' (' + e.email + ')',
                            value: e.email,
                            name: e.name
                        }
                        this.allEmail.push(obj);
                    });
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            })
        },
        getAllContact(){
            contactService.getAllContact(this.idAccount, 1).then(result => {
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
                                    result.response.results[k].chosen = true;
                                    this.createSchedule.allContacts.push(result.response.results[k]);
                                }
                            }
                            else {
                                dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                            }
                        }).catch(error => {
                            console.log(error);
                        })
                    }
                    // console.log(this.createSchedule.allContacts.length)
                    let obj = {
                        text: 'Tất cả các Lead',
                        value: 'all',
                        contact: this.createSchedule.allContacts
                    }
                    this.createSchedule.list.unshift(obj);
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
            }).catch(error => {
                console.log(error);
            })
        },
        getChosenContactFromListByListId(id){
            let result = []
            let allContactArray = [];
            //Lấy mảng tất cả các contact
            if(id == 'additional'){
                allContactArray = this.createSchedule.additionalContacts;
            }
            else {
                for (let i = 0; i < this.createSchedule.list.length;i++){
                    if(id == this.createSchedule.list[i].value){
                        allContactArray = this.createSchedule.list[i].contact
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
        getEmailToSend(){
            let contactToSend = [];
            this.createSchedule.emailToSend = []
            let id = this.createSchedule.selectedListToSendSMS;
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
            }
            for (let index = 0; index < uniqueContact.length; index++){
                let object = {
                    email: uniqueContact[index].email,
                    contactId: uniqueContact[index].contactId
                }
                this.createSchedule.emailToSend.push(object);
            }
            console.log(this.createSchedule.emailToSend);
            this.createSchedule.numberOfRecipient = this.createSchedule.emailToSend.length;
        },
        sendEmail(){
            let timeString = this.createSchedule.date + 'T' + this.createSchedule.time
            let timeToSend = moment(timeString).utc().format().substring(0, 19)
            
            let body = {
                from: this.createSchedule.from,
                title: this.createSchedule.title,
                emailTemplateId: this.createSchedule.chosenContentId,
                timeToSend: timeToSend,
                emailScheduleDetails: this.createSchedule.emailToSend
            }

            console.log(body)
            emailService.createEmailSchedule(this.idAccount, body).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                    this.getSchedule();
                    this.page = 'manageSchedule';
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
                
            }).catch(error => {
                this.createSchedule.failDialog = true;
                console.log(error);
            })
        },

        
        //manage schedule
        returnTime(data) {
            return moment(data).format('YYYY/MM/DD HH:mm')
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
        checkString(str){
            if (str == null || str == undefined){
                return ''
            }
            else {
                return str;
            }
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
        getSchedule(){
            this.loadingTable = true;
            this.manageSchedule.list = [];
            emailService.getEmailSchedule(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let data = result.response.reverse();
                    for (let i = 0; i < data.length; i++){
                        let obj = {
                            from: this.checkString(data[i].from),
                            title: this.checkString(data[i].title),
                            id: this.checkString(data[i].emailScheduleId),
                            templateId: this.checkString(data[i].emailTemplateId),
                            time: this.returnTime(this.checkString(data[i].timeToSend)),
                            status: this.checkString(data[i].status),
                            createdBy: this.checkString(data[i].createdBy)
                        }
                        this.manageSchedule.list.push(obj);
                    }
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.loadingTable = false;
            })
        },
        changeScheduleStatus(id, status){
            if (status == 'ACTIVE'){
                emailService.activateSchedule(this.idAccount, id).then(result => {
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
                    console.log(error)
                })
            }
            else {
                emailService.deactivateSchedule(this.idAccount, id).then(result => {
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
                    console.log(error)
                })
            }
        },
        openScheduleDetailDialog(id){
            let obj = null;
            emailService.getEmailSchedule(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let data = result.response;
                    for (let i = 0; i < data.length; i++){
                        if (id == data[i].emailScheduleId){
                            obj = data[i];
                            this.manageSchedule.detail.listEmail = obj.emailScheduleDetails;
                            this.manageSchedule.detail.dialog = true;
                        }
                    }
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            })
        },
        getTemplateNameFromId(id){
            
            let name = '';
            for(let i = 0; i < this.templateSelect.length; i++){
                if (this.templateSelect[i].value == id){
                    // console.log(id + '---' + this.templateSelect[i].value)
                    return this.templateSelect[i].text;
                }
            }
            return name;
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
            this.getEmailTemplate();
            this.getList();
            this.getAllEmail()
            if (this.access == true){
                this.grape();
                
                
                // this.getSchedule();
            }
        }
    },

    created(){
        this.$store.state.colorNumber = 4;
        this.getCurrentUser();
        
        // console.log(result)
        // this.grape()
    }
}
</script>
<style scoped>
/* We can remove the border we've set at the beginnig */
#gjs {
  border: none;
  width: 100%;
  height: 100%
}

/* Theming */



/* Primary color for the background */
.gjs-one-bg {
  background-color: #47453e;
}

/* Secondary color for the text color */
.gjs-two-color {
  color: rgba(255, 255, 255, 0.7);
}

/* Tertiary color for the background */
.gjs-three-bg {
  background-color: #ec5896;
  color: white;
}

/* Quaternary color for the text color */
.gjs-four-color,
.gjs-four-color-h:hover {
  color: #ec5896;
}
/* Reset some default styling */
.gjs-cv-canvas {
  width: 100%;
  height: 100%;

}

.panel__top {
  padding: 0;
  width: 100%;
  display: flex;
  position: initial;
  justify-content: center;
  justify-content: space-between;
}
.panel__basic-actions {
  position: initial;
}
.editor-row {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: nowrap;
  height: 100%;
}

.editor-canvas {
  flex-grow: 1;
}

.panel__right {
  flex-basis: 230px;
  position: relative;
  overflow-y: auto;
}

.panel__switcher {
  position: initial;
}

.gjs-editor {
    padding-left: 50px;
}
</style>