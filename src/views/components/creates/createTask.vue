<template>
    <v-layout wrap>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-layout row>
                <v-flex xs4 sm5 md6 lg6 xl6>
                    <v-text-field placeholder="Enter your task" v-model="title"></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4 lg4 xl4>
                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy
                        transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="dateFormatted" label="Due Date" persistent-hint prepend-icon="event"
                                @blur="date = parseDate(dateFormatted)" v-on="on">
                            </v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs4 sm3 md2 lg2 xl2>
                    <v-dialog ref="dialog" v-model="modal2" :return-value.sync="time" persistent lazy full-width
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
                    </v-dialog>
                </v-flex>
                
            </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-textarea class="mt-2" name="input" label="Notes..." v-model="note"></v-textarea>
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
                    <p>Type</p>
                    <v-menu :close-on-content-click="false" :nudge-width="75" top offset-y>
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
                    <p>Assigned to</p>
                    <v-menu :close-on-content-click="false" :nudge-width="100" offset-y max-width="300">
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
                    <p>Email reminder</p>
                    <v-layout row>
                        <v-flex>
                            <v-menu :close-on-content-click="false" :nudge-width="100" top offset-y>
                                <template v-slot:activator="{ on }">
                                    <a color="indigo" v-on="on">
                                        {{day}}
                                    </a>
                                </template>
                                <v-list>
                                    <v-list-tile @click="day = 'The day of'">
                                        <v-list-tile-title>The day of</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile @click="day = 'The day before'">
                                        <v-list-tile-title>The day before</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile @click="day = 'The week before'">
                                        <v-list-tile-title>The week before</v-list-tile-title>
                                    </v-list-tile>
                                    <v-menu :close-on-content-click="false" :nudge-width="200" offset-y v-model="emailReminder.dateMenu">
                                        <template v-slot:activator="{ on }">
                                            <v-list-tile @click="day = 'Custom Date'" v-on="on">
                                                <v-list-tile-title>Custom Date</v-list-tile-title>
                                            </v-list-tile>
                                        </template>
                                        <v-date-picker v-model="emailReminder.date" no-title @input="emailReminder.dateMenu = false"></v-date-picker>
                                    </v-menu>
                                    
                                    <v-list-tile @click="day = 'No reminder'">
                                        <v-list-tile-title>No reminder</v-list-tile-title>
                                    </v-list-tile>
                                    <!-- <v-list-tile v-for="(item, index) in days" :key="index" @click="choiseD(item)">
                                        <v-list-tile-title>No reminder</v-list-tile-title>
                                    </v-list-tile> -->
                                </v-list>
                            </v-menu>
                            <v-dialog ref="emailReminderDialog" v-model="emailReminder.modal2" :return-value.sync="emailReminder.time" persistent lazy full-width
                                width="290px" v-if="!(day == 'No reminder')">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="emailReminder.time" prepend-icon="access_time" readonly v-on="on">
                                    </v-text-field>
                                </template>
                                <v-time-picker v-if="emailReminder.modal2 " v-model="emailReminder.time" full-width>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="emailReminder.modal2 = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.emailReminderDialog.save(emailReminder.time)">OK</v-btn>
                                </v-time-picker>
                            </v-dialog>
                        </v-flex>
                    </v-layout>
                   
                </v-flex>
                <v-flex>
                    <p>Queue</p>
                    <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
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
                    @click="createTask()" :disabled="disableSaveButton">Save Task</v-btn>
                <v-btn color="red" small flat
                    @click="closeCreateTaskDialog()">Close</v-btn>
            </v-layout>
        </v-flex>
        <!-- <v-menu ref="emailReminderMenu1" v-model="emailReminder.dateMenu" :close-on-content-click="false" :nudge-right="40" lazy
            transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
            <v-date-picker v-model="emailReminder.date" no-title @input="emailReminder.dateMenu = false"></v-date-picker>
        </v-menu> -->
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
            emailReminder: {
                date: '',
                dateMenu: false,
                time: '08:00',
                modal2: false,
            }
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
                    this.closeCreateTaskDialog();
                })

            }
        },
        created(){
            this.getAllEmail();
        }
    }
</script>