<template>
    <v-layout wrap>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-layout row>
                <v-flex xs4 sm5 md6 lg6 xl6>
                    <v-text-field placeholder=
                    "Tên công việc" v-model="title"></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4 lg4 xl4>
                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" lazy
                        transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="dateFormatted" label="Ngày hết hạn" persistent-hint prepend-icon="event"
                                v-on="on">
                            </v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs4 sm3 md2 lg2 xl2>
                    <!-- <v-dialog ref="dialog" v-model="modal2" :return-value.sync="time" persistent lazy full-width
                        width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="time" label="Times" prepend-icon="access_time" readonly v-on="on">
                            </v-text-field>
                        </template>
                        <v-time-picker v-if="modal2" v-model="time" full-width>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                        </v-time-picker>
                    </v-dialog> -->
                    <v-select v-model="time" :items="timeToChoose"></v-select>
                </v-flex>
                
            </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-textarea class="mt-2" name="input" label="Ghi chú..." v-model="note"></v-textarea>
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
                <!-- <v-flex class="text-xs-right">
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
                </v-flex> -->
            </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12 class="mt-2">
            <v-divider :divider="divider"></v-divider>
            <v-layout row class="mt-2">
                <v-flex>
                    <p>Kiểu</p>
                    <v-menu :close-on-content-click="false" top offset-y>
                        <template v-slot:activator="{ on }">
                            <a color="indigo" v-on="on">
                                {{type}}
                            </a>
                        </template>
                        <v-list>
                            <v-list-tile v-for="(item, index) in types" :key="index" @click="choisE(item)">
                                <v-list-tile-title>{{ item }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                </v-flex>
                <v-flex>
                    <p>Giao cho</p>
                    <v-menu :close-on-content-click="false" offset-y max-width="300">
                        <template v-slot:activator="{ on }">
                            <a color="indigo" v-on="on">
                                {{chosenName}}
                            </a>
                        </template>
                        <v-card>
                            <v-card-title>
                                <v-layout row wrap>
                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="searchEmail"></v-text-field>
                                    </v-flex>
                                    <br>
                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                        <v-select :items="searchedEmail" v-model="chosenEmail"></v-select>
                                    </v-flex>
                                </v-layout>
                                <!-- <v-layout>
                                    
                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                        <v-select :items="allEmail" v-model="chosenEmail"></v-select>
                                    </v-flex>
                                </v-layout> -->
                                <!-- <v-row>
                                    <v-col xs="12" sm="12" md="12" lg="12" xl="12">
                                        <v-text-field append-icon="search" label="Search" single-line hide-details></v-text-field>
                                    </v-col>
                                </v-row> -->
                                <!-- <v-row>
                                    <v-col xs="12" sm="12" md="12" lg="12" xl="12">
                                        <v-select :items="allEmail" v-model="chosenEmail"></v-select>
                                    </v-col>
                                </v-row> -->
                            </v-card-title>
                        </v-card>
                    </v-menu>
                </v-flex>
                <v-flex>
                    <p>Email nhắc nhở</p>
                    <v-layout row>
                        <v-flex>
                            <v-menu :close-on-content-click="false" top offset-y>
                                <template v-slot:activator="{ on }">
                                    <span>
                                        <a color="indigo" v-on="on">
                                            {{day}}
                                        </a>
                                    </span>
                                    
                                </template>
                                <v-list>
                                    <v-list-tile @click="day = 'The day of'">
                                        <v-list-tile-title>Cùng ngày</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile @click="day = 'The day before'">
                                        <v-list-tile-title>Trước một ngày</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile @click="day = 'The week before'">
                                        <v-list-tile-title>Trước một tuần</v-list-tile-title>
                                    </v-list-tile>
                                    <v-menu :close-on-content-click="false" offset-y v-model="emailReminder.dateMenu">
                                        <template v-slot:activator="{ on }">
                                            <v-list-tile @click="day = 'Custom Date'" v-on="on">
                                                <v-list-tile-title>Chọn ngày</v-list-tile-title>
                                            </v-list-tile>
                                        </template>
                                        <v-date-picker v-model="emailReminder.date" no-title @input="emailReminder.dateMenu = false"></v-date-picker>
                                    </v-menu>
                                    
                                    <v-list-tile @click="day = 'No reminder'">
                                        <v-list-tile-title>Không nhắc trước</v-list-tile-title>
                                    </v-list-tile>
                                    <!-- <v-list-tile v-for="(item, index) in days" :key="index" @click="choiseD(item)">
                                        <v-list-tile-title>No reminder</v-list-tile-title>
                                    </v-list-tile> -->
                                </v-list>
                            </v-menu>
                            
                        </v-flex>
                    </v-layout>
                   
                </v-flex>
                <v-flex v-if="day!='No reminder'">
                    <p>Giờ</p>
                    <v-menu :close-on-content-click="false" lazy
                        transition="scale-transition" offset-y full-width >
                        <template v-slot:activator="{ on }">
                            <!-- <v-text-field v-model="emailReminder.time" prepend-icon="access_time" readonly v-on="on">
                            </v-text-field> -->
                            <span>
                                <a color="indigo" v-on="on">
                                    {{emailReminder.time}}
                                </a>
                            </span>
                        </template>
                        <v-select v-model="emailReminder.time" :items="timeToChoose" style="backgroundColor: white; padding: 0px 10px; width: 100px;"></v-select>
                    </v-menu>
                    <!-- <v-dialog ref="emailReminderDialog" :return-value.sync="emailReminder.time" lazy full-width
                        width="290px" v-if="!(day == 'No reminder')">
                        <template v-slot:activator="{ on }"> -->
                            <!-- <v-text-field v-model="emailReminder.time" prepend-icon="access_time" readonly v-on="on">
                            </v-text-field> -->
                            <!-- <span>
                                <a color="indigo" v-on="on">
                                    {{emailReminder.time}}
                                </a>
                            </span>
                        </template>
                        <v-select v-model="emailReminder.time" :items="timeToChoose"></v-select> -->
                        <!-- <v-time-picker v-if="emailReminder.modal2 " v-model="emailReminder.time" full-width>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="emailReminder.modal2 = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.emailReminderDialog.save(emailReminder.time)">OK</v-btn>
                        </v-time-picker> -->
                    <!-- </v-dialog> -->
                    <!-- <v-menu :close-on-content-click="false" :nudge-right="40" lazy
                        transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                        <template>
                            <span>
                                <a color="indigo" v-on="on">
                                    {{emailReminder.time}}
                                </a>
                            </span>
                        </template>
                        
                    </v-menu> -->
                </v-flex>
                <v-flex>
                    <p>Thứ tự</p>
                    <v-menu :close-on-content-click="false" offset-y>
                        <template v-slot:activator="{ on }">
                            <a color="indigo" v-on="on">
                                None
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
        <v-divider></v-divider>
        <v-divider></v-divider>
        <br>
        <br>
        <v-flex xs12 sm12 md12 lg12 xl12 class="mt-2">
            <v-layout wrap>
                <v-btn color="blue darken-1" small flat
                    @click="createTask()" :disabled="disableSaveButton">Tạo</v-btn>
                <v-btn color="red" small flat
                    @click="closeCreateTaskDialog()">Đóng</v-btn>
            </v-layout>
        </v-flex>
        <!-- <v-menu ref="emailReminderMenu1" v-model="emailReminder.dateMenu" :close-on-content-click="false" :nudge-right="40" lazy
            transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
            <v-date-picker v-model="emailReminder.date" no-title @input="emailReminder.dateMenu = false"></v-date-picker>
        </v-menu> -->
        <v-dialog v-model="successfulDialog" @click:outside="successfulDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="#00C853">
                    <v-toolbar-title>Thành công</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Tạo công việc thành công
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
                    Đã có lỗi xảy ra khi Tạo công việc. Xin hãy thử lại.
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="failDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
    import taskService from '../../../services/task.service'
    import moment from 'moment'
    import { eventBus } from '../../../eventBus';
    export default {
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
            title: '',
            note: '',
            divider: true,
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            time: '08:00',
            menu2: false,
            modal2: false,
            items: ['No answer', 'Busy', 'Wrong number', 'Left live message', 'Left voicemail', 'Connected'],
            types: ['Email', 'To-do', 'Call'],
            type: 'To-do',
            days: ['The day of','The day before','The week before','Custom Date','No reminder'],
            day: 'The day of',
            allEmail: [],
            searchedEmail: [],
            chosenEmail: '',
            chosenName: '',
            searchEmail: '',
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
            emailReminder: {
                date: '',
                dateMenu: false,
                time: '08:00',
                modal2: false,
            },
            successfulDialog: false,
            failDialog: false
        }),
        computed: {
            computedDateFormatted() {
                return this.formatDate(this.date)
            },
            disableSaveButton(){
                if (this.title == ''){
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
            },
            chosenEmail(){
                this.allEmail.filter(e => {
                    if(this.chosenEmail == e.value){
                        this.chosenName = e.name;
                    }
                })
            },
            searchEmail(){
                this.searchedEmail = [];
                this.allEmail.filter(e => {
                    if(e.name.toLowerCase().includes(this.searchEmail.toLowerCase())){
                        this.searchedEmail.push(e);
                    }
                })
            },
            day(){
                if(this.day == 'Custom Date'){
                    this.emailReminder.dateMenu = true;
                }
            }
        },

        methods: {
            coverTime(time){
                if (_.isNull(time)) return '';
                return moment(time).format('YYYY-MM-DD')
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
            choisE(item) {
                this.type = item
            },
            choiseD(item){
                this.day = item
            },
            closeCreateTaskDialog(){
                this.$emit('closeCreateTaskDialog');
            },
            getAllEmail(){
                this.allEmail = [];
                taskService.getAllEmail(this.idAccount).then(result => {
                    result.response.filter(e => {
                        const obj = {
                            text: e.name + ' (' + e.email + ')',
                            value: e.email,
                            name: e.name
                        }
                        this.allEmail.push(obj);
                        this.searchedEmail.push(obj);
                    });
                    this.chosenEmail = this.allEmail[0].value;
                    this.chosenName = this.allEmail[0].name;
                })
            },
            createTask(){
                var date = moment(this.date);
                // console.log(this.coverTime(date.subtract(10, 'days')));
                let emailReminder = '';
                if(this.day == 'The day of'){
                    emailReminder = this.coverTime(date) + 'T' + this.emailReminder.time + ":00"
                }
                else if (this.day == 'The day before'){
                    emailReminder = this.coverTime(date.subtract(1, 'days')) + 'T' + this.emailReminder.time + ":00"
                }
                else if (this.day == 'The week before'){
                    emailReminder = this.coverTime(date.subtract(7, 'days')) + 'T' + this.emailReminder.time + ":00"
                }
                else if (this.day == 'No reminder'){
                    emailReminder = '';
                }
                else if (this.day == 'Custom Date'){
                    emailReminder = this.coverTime(this.emailReminder.date) + 'T' + this.emailReminder.time + ":00";
                }
                let task = {
                    "contactId": this.idContact,
                    "title": this.title,
                    "dueDate": this.date + 'T' + this.time + ":00",
                    "note": this.note,
                    "type": this.type,
                    "assignedTo": this.chosenEmail,
                    "emailReminder": emailReminder,
                    "queue":"None",
                    "status":"NOTCOMPLETED"
                }
                taskService.createTask(this.idAccount, task).then(result => {
                    if(result.code == 'SUCCESS'){
                        this.title = '';
                        this.note = '';
                        this.date = new Date().toISOString().substr(0, 10);
                        this.time = '08:00';
                        this.emailReminder.date = '';
                        this.emailReminder.time = '08:00';
                        this.type = 'To-do';
                        this.day = 'The day of';
                        eventBus.updateTaskList();
                    }
                    this.successfulDialog = true;
                    this.closeCreateTaskDialog();
                }).catch(error => {
                    console.log(error);
                    this.failDialog = true;
                    this.closeCreateTaskDialog();
                })

            }
        },
        created(){
            this.getAllEmail();
        }
    }
</script>