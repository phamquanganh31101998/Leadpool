<template>
    <v-layout row wrap>
        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-3 pr-3">
            <template>
                <v-hover v-for="email in emails">
                    <v-card slot-scope="{ hover }" class="pb-3 mt-3">
                        <v-card-title>
                            <v-layout row wrap>
                                <v-flex xs4 sm4 md4 lg3 xl3>
                                    <v-icon small left>
                                        mail
                                    </v-icon>
                                    <span class="">Email</span>
                                </v-flex>
                                <v-flex xs8 sm8 lg9 xl9>
                                    <v-layout row>
                                        <v-flex xs7 sm7 lg8 xl8>
                                            <v-expand-transition>
                                                <div v-if="hover">
                                                    <!-- <v-layout row>
                                                        <v-flex xs6 sm6 md6 lg6 xl6>
                                                            <v-menu :close-on-content-click="false" :nudge-width="200"
                                                                offset-y>
                                                                <template v-slot:activator="{ on }">
                                                                    <a color="indigo" v-on="on">
                                                                        Associated with 1 record
                                                                    </a>
                                                                </template>
                                                                <v-card>
                                                                    <v-card-title>
                                                                        <v-layout row>
                                                                            <v-text-field append-icon="search"
                                                                                label="Search" single-line hide-details>
                                                                            </v-text-field>
                                                                        </v-layout>
                                                                    </v-card-title>
                                                                </v-card>
                                                            </v-menu>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg2 xl3>
                                                            <a color="indigo">Ghim
                                                            </a>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg3 xl3 offset-xs9 offset-sm9 offset-md9 offset-lg9 offset-xl9>
                                                            <a color="indigo">Xóa
                                                            </a>
                                                        </v-flex>
                                                    </v-layout> -->
                                                </div>
                                            </v-expand-transition>
                                        </v-flex>
                                        <v-flex xs5 sm5 lg4 xl4>
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <span v-on="on">{{coverTime(email.createdAt)}}</span>
                                                </template>
                                                <span small>{{coverTimeTooltip(email.createdAt)}}</span>
                                            </v-tooltip>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12 sm12 lg12 xl12 class="mt-2">
                                    <h3 class="pl-4 ml-2">{{email.subject}}</h3>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-divider :divider="divider"></v-divider>
                        <v-layout row class="mt-2">
                            <v-flex xs12 sm12 md12 lg12 xl12 class="pl-4">
                                <v-btn class="disable-events ml-4" outline style="color: black;" small :color="returnStatusColor(email.status)" v-if="email.status">{{returnStatus(email.status)}}</v-btn>
                                <template>
                                    <span class="ml-4">Số lượt mở: 
                                        <strong>{{email.open}}</strong>
                                    </span>
                                    <span class="ml-4">Số lượt click: 
                                        <strong>{{email.click}}</strong>
                                    </span>
                                </template>
                                <!-- <v-progress-circular
                                    :size="20"
                                    :width="1"
                                    color="grey"
                                    indeterminate
                                    v-else
                                ></v-progress-circular>
                                 -->
                                <!-- <v-btn outline dark small color="grey" @click="email.showDetail =!email.showDetail">Detail</v-btn> -->
                                <!-- <span class="ml-4"><v-btn v-if="email.updateDetailBtn" outline small dark color="success" @click="trackingEmailActivities(email.emailId)"> <v-icon>cached</v-icon> Cập nhật</v-btn></span> -->
                            </v-flex>
                        </v-layout>
                        <!-- <v-divider :divider="divider" class="mt-2"></v-divider>
                        <v-layout row v-show="email.showDetail">
                            <v-flex xs12 sm12 md12 lg12 xl12 class="pl-4">
                                <v-timeline dense class="ml-4">
                                    <v-timeline-item color="grey" small>
                                        <v-layout row wrap>
                                            <v-flex>
                                                <p>Đã mở</p>
                                                <p>12 Jul 2019 at 23:28 GMT+7</p>
                                            </v-flex>
                                        </v-layout>
                                    </v-timeline-item>
                                    <v-timeline-item color="grey" small>
                                        <v-layout row wrap>
                                            <v-flex>
                                                <p>Đã gửi</p>
                                                <p>{{coverTimeTooltip(email.createdAt)}}</p>
                                            </v-flex>
                                        </v-layout>
                                    </v-timeline-item>
                                </v-timeline>
                            </v-flex>
                        </v-layout> -->
                        <v-layout row wrap class="mt-3">
                            <v-flex xs11 sm11 md11 lg11 xl11 class="pl-5">
                                <!-- <p v-if="email.type == 'text/html'">
                                    
                                </p> -->
                                <!-- <div :id="email.emailId" v-if="email.type == 'text/html'"></div>
                                <p v-else>{{email.body}}</p> -->
                                <a style="font-size: 16px;" @click.stop="viewEmailContent(email.body)">Xem nội dung email</a>
                            </v-flex>
                            <v-flex xs12 sm12 md12 lg12 xl12>
                                <v-layout row>
                                    <!-- <v-flex xs3 sm2 md2 lg1 xl1 class="ml-4 pl-3">
                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="grey lighten-2" small fab v-on="on">
                                                    <v-icon>person</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>{{email.from}}</span>
                                        </v-tooltip>
                                    </v-flex> -->
                                    <v-flex xs8 sm9 md9 lg10 xl10 class="ml-4 pl-4">
                                        <p class="mt-2 pt-1"><strong>{{email.from}} </strong> đã gửi 1 email cho {{email.to}}</p>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-hover>
            </template>
            <v-flex offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5 v-if="progressLog">
                <v-progress-circular
                    :size="70"
                    :width="7"
                    color="#3E82F7"
                    indeterminate
                ></v-progress-circular>
            </v-flex>
            <template v-for="emailLog in emailLogs">
                <v-hover>
                    <v-card slot-scope="{ hover }" class="pb-3 mt-3">
                        <v-card-title>
                            <v-layout row wrap>
                                <v-flex xs4 sm4 md4 lg3 xl3>
                                    <v-icon small left>
                                        mail
                                    </v-icon>
                                    <span class="">Thông tin email được lưu</span>
                                </v-flex>
                                <v-flex xs8 sm8 lg9 xl9>
                                    <v-layout row>
                                        <v-flex xs7 sm7 lg8 xl8>
                                            <v-expand-transition>
                                                <!-- <div v-if="hover"> -->
                                                <div v-if="hover">
                                                    <v-layout row v-if="access">
                                                        <!-- <v-flex xs6 sm6 md6 lg6 xl6>
                                                            <v-menu :close-on-content-click="false" :nudge-width="200"
                                                                offset-y>
                                                                <template v-slot:activator="{ on }">
                                                                    <a color="indigo" v-on="on">
                                                                        Associated with 1 record
                                                                    </a>
                                                                </template>
                                                                <v-card>
                                                                    <v-card-title>
                                                                        <v-layout row>
                                                                            <v-text-field append-icon="search"
                                                                                label="Search" single-line hide-details>
                                                                            </v-text-field>
                                                                        </v-layout>
                                                                    </v-card-title>
                                                                </v-card>
                                                            </v-menu>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg2 xl3>
                                                            <a color="indigo">Ghim
                                                            </a>
                                                        </v-flex> -->
                                                        <v-flex xs3 sm3 md3 lg3 xl3 offset-xs9 offset-sm9 offset-md9 offset-lg9 offset-xl9>
                                                            <a color="indigo" @click="confirmDeleteLog(emailLog.logId)">Xóa
                                                            </a>
                                                        </v-flex>
                                                    </v-layout>
                                                </div>
                                            </v-expand-transition>
                                        </v-flex>
                                        <v-flex xs5 sm5 lg4 xl4>
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <span v-on="on">{{coverTime(emailLog.createdAt)}}</span>
                                                </template>
                                                <span small>{{coverTimeTooltip(emailLog.createdAt)}}</span>
                                            </v-tooltip>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12 sm12 lg12 xl12 class="mt-2">
                                    <h3 class="pl-4 ml-2">{{emailLog.log}}</h3>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-divider :divider="divider"></v-divider>
                        <v-layout row class="mt-2">
                            <v-flex xs12 sm12 md12 lg12 xl12 class="pl-4">
                                <v-layout row class="pl-4">
                                    <v-flex xs4 sm4 md4 lg3 xl3>
                                        <!-- <p>Ngày</p> -->
                                        <v-menu ref="menu1" v-model="emailLog.menu1Log" :close-on-content-click="false"
                                            :nudge-right="40" lazy transition="scale-transition" offset-y full-width
                                            max-width="290px" min-width="290px">
                                            <template v-slot:activator="{ on }">
                                                <v-text-field readonly v-model="emailLog.dateLog" label="Ngày" persistent-hint
                                                    prepend-icon="event" @blur="date = emailLog.dateToPut" v-on="on" v-if="access">
                                                </v-text-field>
                                                <v-text-field readonly v-model="emailLog.dateLog" label="Ngày" persistent-hint
                                                    prepend-icon="event" @blur="date = emailLog.dateToPut" v-else>
                                                </v-text-field>
                                            </template>
                                            <v-date-picker v-model="emailLog.dateLog" no-title @input="updateLog(emailLog.dateLog, emailLog.timeLog, emailLog.logId), emailLog.menu1Log = false"></v-date-picker>
                                        </v-menu>
                                    </v-flex>
                                    <v-flex xs4 sm4 md4 lg3 xl3 offset-lg2 offset-xl2>
                                        <!-- <p>Giờ</p> -->
                                        <v-dialog ref="dialog" v-model="emailLog.modal2Log" :return-value.sync="timeLog" persistent lazy
                                            full-width width="290px">
                                            <template v-slot:activator="{ on }">
                                                <v-text-field readonly v-model="emailLog.timeLog" label="Giờ"
                                                    prepend-icon="access_time" v-on="on" v-if="access"></v-text-field >
                                                    <v-text-field readonly v-model="emailLog.timeLog" label="Giờ"
                                                    prepend-icon="access_time" v-else></v-text-field >
                                            </template>
                                            <v-time-picker v-if="emailLog.modal2Log" v-model="emailLog.timeLog" full-width>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="updateLog(emailLog.dateLog, emailLog.timeLog, emailLog.logId), emailLog.modal2Log = false">Chọn</v-btn>
                                                <!-- <v-btn flat color="red" @click="emailLog.modal2Log = false">Đóng</v-btn> -->
                                                
                                            </v-time-picker>
                                        </v-dialog>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-divider :divider="divider" class="mt-2"></v-divider>
                        <v-layout row wrap class="mt-3">
                            <!-- <v-flex xs3 sm2 md2 lg1 xl1 class="ml-4 pl-3">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="grey lighten-2" small fab v-on="on">
                                            <v-icon>person</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>{{emailLog.createdBy}}</span>
                                </v-tooltip>
                            </v-flex> -->
                            <v-flex xs7 sm8 md8 lg9 xl9 class="ml-4 pl-4">
                                <p class="mt-2 pt-2"><strong>{{emailLog.createdBy}} </strong> đã lưu thông tin về email</p>
                            </v-flex>
                            <!-- <v-flex xs1 sm1 md1 lg1 xl1>
                                <v-btn v-if="hover && access" @click="updateLog(emailLog.dateLog, emailLog.timeLog, emailLog.logId)" outlined>Lưu lại</v-btn>
                            </v-flex> -->
                        </v-layout>
                    </v-card>
                </v-hover>
            </template>
        </v-flex>
        <v-dialog v-model="deleteLogDialog.dialog" @click:outside="deleteLogDialog.dialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Xóa?</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Bạn có chắc chắn muốn xóa?
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="deleteLog(deleteLogDialog.id)">Xóa</v-btn>
                <v-btn flat color="primary" @click="deleteLogDialog.dialog = false">Quay lại</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="viewEmailContentDialog" persistent>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="viewEmailContentDialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Nội dung email</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <div id="templateBody" style="width: 100%; margin: 10px;"></div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- <alert/> -->
    </v-layout>
    
</template>
<script>
import alert from '@/components/alert'
import moment from 'moment'
import logService from '../../../services/log.service'
import { eventBus } from '../../../eventBus';
import emailService from '../../../services/email.service';
import contact from '../../../services/contacts.service'
    export default {
        components: {
            alert
        },
        props: {
            idAccount: {
                type: String,
                default: null,
            },
            idContact: {
                type: String,
                default: null,
            },
            currentContact: {
                type: Object,
                default: null
            }
        },
        data: vm => ({
            viewEmailContentDialog: false,
            divider: true,
            show: false,
            dateLog: new Date().toISOString().substr(0, 10),
            dateFormattedLog: vm.formatDate(new Date().toISOString().substr(0, 10)),
            menu1Log: false,
            timeLog: null,
            menu2Log: false,
            modal2Log: false,
            emailLogs: [],
            progressLog: true,
            emails: [],
            deleteLogDialog: {
                dialog: false,
                id: ''
            },
            // currentContact: null,
            currentUser: null,
            access: false,
        }),
        computed: {
            computedDateFormatted() {
                return this.formatDate(this.dateLog)
            }
        },
        watch: {
            currentContact(){
                if(this.currentContact != null){
                    this.getCurrentUser();
                }
            },
            dateLog(val) {
                this.dateFormatted = this.formatDate(this.dateLog)
            }
        },
        methods: {
            viewEmailContent(body){
                // console.log(body);
                let regex = /\\\"/gi
                document.getElementById("templateBody").innerHTML = body.replace(regex, "\"");
                this.viewEmailContentDialog = true;
            },
            returnStatus(status){
                let result = ''
                if (status == 'SENT'){
                    result = 'Đã gửi'
                }
                else if (status == 'SENDING'){
                    result = 'Đang gửi'
                }
                else if (status == 'FAIL'){
                    result = 'Lỗi'
                }
                else if (status == 'processed'){
                    result = 'Đã xử lý'
                }
                else if (status == 'clicks'){
                    result = 'Đã click'
                }
                else if (status == 'delivered'){
                    result = 'Đã nhận'
                }
                else if (status == 'opens'){
                    result = 'Đã xem'
                }
                else if (status == 'unsubscribes'){
                    result = 'Đã bỏ theo dõi'
                }
                else if (status == 'group unsubscribes'){
                    result = 'Đã bỏ theo dõi nhóm'
                }
                else if (status == 'group resubscribes'){
                    result = 'Đã theo dõi nhóm lại'
                }
                else if (status == 'deferred'){
                    result = 'Bị hoãn'
                }
                else if (status == 'drops'){
                    result = 'Đã gửi (người dùng đã từ chối nhận hoặc báo cáo là spam)'
                }
                else if (status == 'bounces'){
                    result = 'Bị từ chối nhận'
                }
                else if (status == 'blocks'){
                    result = 'Bị chặn'
                }
                else if (status == 'spam reports'){
                    result = 'Bị báo cáo là spam'
                }
                else {
                    result = status;
                }
                return result;
            },
            returnStatusColor(status){
                if (status == 'SENT' || status == 'clicks' || status == 'opens' || status == 'delivered' || status == 'group resubscribes'){
                    return 'success'
                }
                else if (status == 'FAIL' || status == 'unsubscribes' || status == 'group unsubscribes' || status == 'deferred' || status == 'bounces' || status == 'blocks' || status == 'spam reports'){
                    return 'alert'
                }
                else {
                    return 'warning'
                }
            },
            coverTimeDetail(time){
                if (_.isNull(time)) return '';
                return moment(time).format('HH:mm:ss, DD/MM/YYYY')
            },
            // getDetail(){
            //     contact.getdetailContact(this.idAccount,this.idContact).then(result =>{
            //         this.currentContact = result.response
            //     }).catch(error => {
            //         console.log(error);
            //     }).finally(() => {
            //         this.getCurrentUser()
            //     })
            // },
            getCurrentUser(){
                this.currentUser = JSON.parse(localStorage.getItem('user'));
                let role = this.currentUser.authorities;
                for (let i = 0; i < role.length;i++){
                    if (role[i] == 'ROLE_CONTACT_EDIT_EVERYTHING'){
                        this.access = true;
                    }
                    if(role[i] == 'ROLE_CONTACT_EDIT_OWNEDONLY'){
                        if (this.currentContact.contactOwner == this.currentUser.username){
                            this.access = true;
                        }
                    }
                }
            },
            formatDate(date) {
                if (!date) return null
                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate(date) {
                if (!date) return null
                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
            getEmailLogsList(){
                let type = 'email';
                logService.getLogsByType(this.idAccount, this.idContact, type).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    let time = moment();
                    if(result.code == 'SUCCESS'){
                        for (let i = 0;i < result.response.length; i++){
                            result.response[i].dateToPut = this.coverTime(result.response[i].time);
                            result.response[i].timeToPut = this.coverTimeHourOnly(result.response[i].time);
                            result.response[i].menu1Log = false;
                            result.response[i].modal2Log = false;
                            result.response[i].dateLog = new Date(result.response[i].time).toISOString().substr(0, 10);
                            result.response[i].timeLog = this.coverTimeHourOnly(result.response[i].time);
                        }
                        this.emailLogs = result.response.reverse();
                        this.emailLogs = [...this.emailLogs];
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    }
                    this.progressLog = false;
                }).catch(error => {
                    console.log(error);
                    this.progressLog = false;
                })
            },
            confirmDeleteLog(id){
                this.deleteLogDialog.dialog = true;
                this.deleteLogDialog.id = id;
            },
            deleteLog(idLog){
                logService.deleteLog(this.idAccount, this.idContact, idLog).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    let time = moment();
                    if(result.code == 'SUCCESS'){
                        dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                        this.$emit('updateLastActivityDate');
                        eventBus.updateLogEmailList();
                        this.deleteLogDialog.id = '';
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    }
                    this.deleteLogDialog.dialog = false;
                    
                }).catch(error => {
                    console.log(error);
                })
            },
            updateLog(date, time, idLog){
                let timeString = date + 'T' + time
                let timeToSend = moment(timeString).utc().format().substring(0, 19)
                let body = {
                    "property": "time",
                    "value": timeToSend
                }
                logService.updateLog(this.idAccount, this.idContact, body, idLog).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    let timeChange = moment();
                    if(result.code == 'SUCCESS'){
                        dispatch('alert/success', `${result.message} (${this.coverTimeDetail(timeChange)})`)
                        this.$emit('updateLastActivityDate');
                        eventBus.updateLogEmailList();
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(timeChange)})`)
                    }
                    
                }).catch(error => {
                    console.log(error);
                })
            },
            coverTime(time){
                if (_.isNull(time)) return '';
                return moment(time).format('DD/MM/YYYY')
            },
            coverTimeTooltip(time){
                if (_.isNull(time)) return '';
                return moment(time).format('dddd, DD MMMM YYYY HH:mm:ss')
            },
            coverTimeHourOnly(time){
                if (_.isNull(time)) return '';
                return moment(time).format('HH:mm')
            },
            getEmail(){
                emailService.getEmailHistory(this.idAccount, this.idContact).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    let time = moment();
                    if(result.code == 'SUCCESS'){
                        for(let i = 0; i < result.response.length; i++){
                            result.response[i].showDetail = false;
                            result.response[i].number = i;
                            result.response[i].updateDetailBtn = true;
                        }
                        this.emails = result.response.reverse();
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    }
                    
                    // console.log(this.emails);
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                    this.trackingAllEmailActivities();
                })
            },
            async trackingAllEmailActivities(){
                for (let i = 0; i < this.emails.length; i++){
                    if (this.emails[i].open == 0 && this.emails[i].click == 0){
                        await this.trackingEmailActivities(this.emails[i].emailId)
                    }
                }
            },
            getEmailFromEmailId(id){
                let result = null;
                for (let i = 0; i < this.emails.length; i++){
                    if (this.emails[i].emailId == id){
                        result = this.emails[i];
                    }
                }
                return result;
            },
            trackingEmailActivities(id){
                let email = this.getEmailFromEmailId(id);
                // console.log('tracking email with id ' + email.emailId);
                // email.updateDetailBtn = false;
                // let email = this.emails[number];
                let body = {
                    "limit":"1",
                    "query": `(Contains(categories,\"${email.emailId}\"))`
                }
                emailService.trackingEmailActivities(this.idAccount, this.idContact, body).then(result => {
                    // console.log('Tracking result!!!!!!!!!!!!!!!!!')
                    // console.log(result);
                    if (result.code == 'SUCCESS'){
                        if (result.response.messages.length > 0){
                            let data = result.response.messages[0];
                            email.open = data.opens_count;
                            email.click = data.clicks_count;
                        }
                    }
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                    // email.updateDetailBtn = true;
                })
            },
            setEmailContentDialog(id, body){
                console.log(id);
                console.log(body)
                let regex = /\\\"/gi;
                // for (let i = 0; i < this.$refs.length;i++){
                //     if (this.$refs[i] == id){
                //         console.log('Hihi')
                //         this.$refs[i].innerHTML = body.replace(regex, "\"");
                //     }
                // }
                // console.log(this.$refs.id)
                // document.getElementsByName('hihi')[0].innerHTML = body.replace(regex, "\"");
                // document.getElementById(id).innerHTML = body.replace(regex, "\"");
            }
        },
        created(){
            // this.getDetail();
            this.getEmail();
            eventBus.$on('updateEmailList', ()=>{
                this.getEmail();
            })
            this.getEmailLogsList();
            eventBus.$on('updateLogEmailList', ()=>{
                this.getEmailLogsList();
            })
        },
        destroyed(){
            eventBus.$off('updateLogEmailList', ()=>{
                this.getEmailLogsList();
            })
        }
    }
</script>
<style scoped>
    .disable-events {
        pointer-events: none
    }
</style>