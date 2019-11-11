<template>
    <v-layout wrap>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-layout row>
                <v-flex xs6 sm6 md6 lg6 xl6>
                    <!-- <p>Date</p> -->
                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy
                        transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="dateFormatted" label="Ngày" persistent-hint prepend-icon="event"
                                @blur="date = parseDate(dateFormatted)" v-on="on">
                            </v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs4 sm4 md4 lg3 xl3 offset-lg1 offseo-xl1>
                    <!-- <p>Time</p> -->
                    <v-dialog ref="dialog" v-model="modal2" :return-value.sync="time" persistent lazy full-width
                        width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="time" label="Giờ" prepend-icon="access_time" readonly v-on="on">
                            </v-text-field>
                        </template>
                        <v-time-picker v-if="modal2" v-model="time" full-width>
                            <v-spacer></v-spacer>
                            <v-btn flat color="red" @click="modal2 = false">Đóng</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialog.save(time)">Chọn</v-btn>
                        </v-time-picker>
                    </v-dialog>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12 class="mt-2">
            <v-divider :divider="divider"></v-divider>
            <v-textarea class="mt-2" name="input" label="Mô tả cuộc họp..." v-model="log"></v-textarea>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-layout row>
                <v-flex>
                    <v-btn flat icon small color="green">
                        <v-icon>text_format</v-icon>
                    </v-btn>
                    <v-btn flat icon small color="green">
                        <v-icon>link</v-icon>
                    </v-btn>
                    <v-btn flat icon small color="green">
                        <v-icon>receipt</v-icon>
                    </v-btn>
                    <v-btn flat icon small color="green">
                        <v-icon>photo</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex class="text-xs-right">
                    <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
                        <template v-slot:activator="{ on }">
                            <a color="indigo" v-on="on" class="mt-2 ml-5">
                                Associated with 1 record
                            </a>
                        </template>
                        <v-card>
                            <v-card-title>
                                <v-layout row>
                                    <v-text-field append-icon="search" label="Search" single-line hide-details>
                                    </v-text-field>
                                </v-layout>
                            </v-card-title>
                        </v-card>
                    </v-menu>
                </v-flex>
            </v-layout>
        </v-flex>
        <br>
        <br>
        <v-layout wrap>
            <v-btn color="blue darken-1" small flat :disabled="disableSaveButton"
                @click="createLogMeet()">Tạo</v-btn>
            <v-btn color="red" small flat
                @click="closeCreateLogMeetDialog()">Đóng</v-btn>
        </v-layout>
        <v-dialog v-model="successfulDialog" @click:outside="successfulDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="#00C853">
                    <v-toolbar-title>Thành công</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Lưu thông tin cuộc họp thành công
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="#00C853" @click="successfulDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="failDialog" @click:outside="failDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Thất bại</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Đã có lỗi xảy ra khi Lưu thông tin cuộc họp. Xin hãy thử lại.
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="failDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
    import logService from '../../../services/log.service'
    import { eventBus } from '../../../eventBus';
    import moment from 'moment';
    export default {
        data: vm => ({
            divider: true,
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            time: '08:00',
            menu2: false,
            modal2: false,
            log: '',
            successfulDialog: false,
            failDialog: false
        }),
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
        computed: {
            computedDateFormatted() {
                return this.formatDate(this.date)
            },
            disableSaveButton(){
                if (this.log == ''){
                    return true;
                }
                else {
                    return false;
                }
            }
        },

        watch: {
            date(val) {
                this.dateFormatted = this.formatDate(this.date)
            }
        },

        methods: {
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
            closeCreateLogMeetDialog(){
                this.$emit('closeCreateLogMeetDialog');
            },
            createLogMeet(){
                let timeString = this.date + 'T' + this.time
                let timeToSend = moment(timeString).utc().format().substring(0, 19)
                let data = {
                    "contactId": this.idContact,
                    "time": timeToSend,
                    "log": this.log,
                    "type":"meeting",
                }
                logService.createLog(this.idAccount, this.idContact, data).then(result => {
                    this.successfulDialog = true;
                    this.log = '';
                    eventBus.updateLogMeetList();
                }).catch(error => {
                    this.failDialog = true;
                    console.log(error);
                });
                this.$emit('closeCreateLogMeetDialog');
            }
        }
    }
</script>