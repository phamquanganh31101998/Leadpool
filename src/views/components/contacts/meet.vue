<template>
    <v-layout row wrap>
        <v-flex offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5 v-if="progressLog">
            <v-progress-circular
                :size="70"
                :width="7"
                color="#3E82F7"
                indeterminate
            ></v-progress-circular>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-3 pr-3">
            <!-- <h3>June 2019</h3> -->
            <template v-for="meetLog in meetLogs">
                <v-hover>
                    <v-card slot-scope="{ hover }" class="pb-3 mt-3">
                        <v-card-title>
                            <v-layout row wrap>
                                <v-flex xs4 sm4 md4 lg3 xl3>
                                    <v-icon small left>
                                        mail
                                    </v-icon>
                                    <span class="">Thông tin cuộc họp được lưu lại</span>
                                </v-flex>
                                <v-flex xs8 sm8 lg9 xl9>
                                    <v-layout row>
                                        <v-flex xs7 sm7 lg8 xl8>
                                            <v-expand-transition>
                                                <!-- <div v-if="hover"> -->
                                                <div v-if="hover">
                                                    <v-layout row>
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
                                                        <v-flex xs3 sm3 md3 lg3 xl3 offset-xs9 offset-sm9 offset-md9 offset-xl9 offset-lg9>
                                                            <a color="indigo" @click="confirmDeleteLog(meetLog.logId)" v-if="access">Xóa
                                                            </a>
                                                        </v-flex>
                                                    </v-layout>
                                                </div>
                                            </v-expand-transition>
                                        </v-flex>
                                        <v-flex xs5 sm5 lg4 xl4>
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <span v-on="on">{{coverTime(meetLog.createdAt)}}</span>
                                                </template>
                                                <span small>{{coverTimeTooltip(meetLog.createdAt)}}</span>
                                            </v-tooltip>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12 sm12 lg12 xl12 class="mt-2">
                                    <h3 class="pl-4 ml-2">{{meetLog.log}}</h3>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-divider :divider="divider"></v-divider>
                        <v-layout row class="mt-2">
                            <v-flex xs12 sm12 md12 lg12 xl12 class="pl-4">
                                <v-layout row class="pl-4">
                                    <v-flex xs4 sm4 md4 lg3 xl3>
                                        <!-- <p>Ngày</p> -->
                                        <v-menu ref="menu1" v-model="meetLog.menu1Log" :close-on-content-click="false"
                                            :nudge-right="40" lazy transition="scale-transition" offset-y full-width
                                            max-width="290px" min-width="290px">
                                            <template v-slot:activator="{ on }">
                                                <v-text-field readonly v-model="meetLog.dateLog" label="Ngày" persistent-hint
                                                    prepend-icon="event" @blur="date = meetLog.dateToPut" v-on="on" v-if="access">
                                                </v-text-field>
                                                <v-text-field readonly v-model="meetLog.dateLog" label="Ngày" persistent-hint
                                                    prepend-icon="event" @blur="date = meetLog.dateToPut" v-else>
                                                </v-text-field>
                                            </template>
                                            <v-date-picker v-model="meetLog.dateLog" no-title @input="meetLog.menu1Log = false, updateTimeLog(meetLog.dateLog, meetLog.timeLog, meetLog.logId)"></v-date-picker>
                                        </v-menu>
                                    </v-flex>
                                    <v-flex xs4 sm4 md4 lg3 xl3 offset-lg2 offset-xl2>
                                        <!-- <p>Giờ</p> -->
                                        <v-dialog ref="dialog" v-model="meetLog.modal2Log" :return-value.sync="timeLog" persistent lazy
                                            full-width width="290px">
                                            <template v-slot:activator="{ on }">
                                                <v-text-field v-model="meetLog.timeLog" label="Giờ"
                                                    prepend-icon="access_time" readonly v-on="on" v-if="access"></v-text-field>
                                                <v-text-field v-model="meetLog.timeLog" label="Giờ"
                                                    prepend-icon="access_time" readonly v-else></v-text-field>
                                            </template>
                                            <v-time-picker v-if="meetLog.modal2Log" v-model="meetLog.timeLog" full-width>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="meetLog.modal2Log = false, updateTimeLog(meetLog.dateLog, meetLog.timeLog, meetLog.logId)">Chọn</v-btn>
                                                <!-- <v-btn flat color="primary" @click="$refs.dialog.save(timeLog)">OK</v-btn> -->
                                                <!-- <v-btn flat color="red" @click="meetLog.modal2Log = false">Chọn</v-btn> -->
                                            </v-time-picker>
                                        </v-dialog>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-divider :divider="divider" class="mt-2"></v-divider>
                        <v-layout row wrap class="mt-3">
                            <v-flex xs3 sm2 md2 lg1 xl1 class="ml-4 pl-3">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="grey lighten-2" small fab v-on="on">
                                            <v-icon>person</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>{{meetLog.createdBy}}</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs7 sm8 md8 lg9 xl9>
                                <p class="mt-2 pt-2"><strong>{{meetLog.createdBy}} </strong> đã lưu lại thông tin cuộc họp</p>
                            </v-flex>
                            <!-- <v-flex xs1 sm1 md1 lg1 xl1>
                                <v-btn v-if="hover && access" @click="updateLog(meetLog.dateLog, meetLog.timeLog, meetLog.logId)" outlined>Lưu</v-btn>
                            </v-flex> -->
                        </v-layout>
                    </v-card>
                </v-hover>
            </template>
            <br>
        </v-flex>
        <br>
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
        <!-- <alert/> -->
    </v-layout>
</template>
<script>
    import alert from '@/components/alert'
    import contact from '../../../services/contacts.service'
    import moment from 'moment'
    import logService from '../../../services/log.service'
    import { eventBus } from '../../../eventBus';
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
            }
        },
        data: vm => ({
            divider: true,
            show: false,
            dateLog: new Date().toISOString().substr(0, 10),
            dateFormattedLog: vm.formatDate(new Date().toISOString().substr(0, 10)),
            menu1Log: false,
            timeLog: null,
            menu2Log: false,
            modal2Log: false,
            meetLogs: [],
            progressLog: true,
            deleteLogDialog: {
                dialog: false,
                id: ''
            },
            currentContact: null,
            currentUser: null,
            access: false,
        }),
        computed: {
            computedDateFormatted() {
                return this.formatDate(this.dateLog)
            }
        },
        watch: {
            dateLog(val) {
                this.dateFormattedLog = this.formatDate(this.dateLog)
            }
        },
        methods: {
            coverTimeDetail(time){
                if (_.isNull(time)) return '';
                return moment(time).format('HH:mm:ss, DD/MM/YYYY')
            },
            updateTimeLog(date, time, idLog){
                let timeString = date + 'T' + time
                let timeToSend = moment(timeString).utc().format().substring(0, 19)
                this.updateLog('time', timeToSend, idLog)
            },

            updateLog(property, value, idLog){
                let body = {
                    "property": property,
                    "value": value
                }
                logService.updateLog(this.idAccount, this.idContact, body, idLog).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    let timeChange = moment();
                    if(result.code == 'SUCCESS'){
                        dispatch('alert/success', `${result.message} (${this.coverTimeDetail(timeChange)})`)
                        this.$emit('updateLastActivityDate');
                        eventBus.updateLogCallList();
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(timeChange)})`)
                    }
                    
                }).catch(error => {
                    console.log(error);
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
                        eventBus.updateLogMeetList();
                        this.deleteLogDialog.id = '';
                        this.deleteLogDialog.dialog = false;
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    }
                    
                }).catch(error => {
                    console.log(error);
                })
            },
            getMeetLogsList(){
                let type = 'meeting';
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
                        this.meetLogs = result.response.reverse();
                        this.meetLogs = [...this.meetLogs];
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
            coverTime(time){
                if (_.isNull(time)) return '';
                return moment(time).format('DD/MM/YYYY')
            },
            coverTimeTooltip(time){
                if (_.isNull(time)) return '';
                return moment(time).format('dddd, DD MMMM YYYY hh:mm:ss A')
            },
            coverTimeHourOnly(time){
                if (_.isNull(time)) return '';
                return moment(time).format('HH:mm')
            },
            getDetail(){
                contact.getdetailContact(this.idAccount,this.idContact).then(result =>{
                    this.currentContact = result.response
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                    this.getCurrentUser()
                })
            },
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
            }
        },
        created(){
            this.getDetail()
            this.getMeetLogsList();
            eventBus.$on('updateLogMeetList', ()=>{
                this.getMeetLogsList();
            });
        },
        destroyed(){
            eventBus.$off('updateLogMeetList', ()=>{
                this.getMeetLogsList();
            })
        }
    }
</script>