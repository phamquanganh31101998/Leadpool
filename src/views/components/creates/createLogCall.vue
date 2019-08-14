<template>
    <v-layout wrap>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-layout row>
                <v-flex xs4 sm4 md4 lg3 xl3>
                    <p>Outcome</p>
                    <v-select :items="items" label="Select an outcome" v-model="item"></v-select>
                </v-flex>
                <v-flex xs4 sm4 md4 lg3 xl3 offset-lg1 offseo-xl1>
                    <p>Date</p>
                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy
                        transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="dateFormatted" label="Date" persistent-hint prepend-icon="event"
                                @blur="date = parseDate(dateFormatted)" v-on="on" required>
                            </v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs4 sm4 md4 lg3 xl3 offset-lg1 offseo-xl1>
                    <p>Time</p>
                    <v-dialog ref="dialog" v-model="modal2" :return-value.sync="time" persistent lazy full-width
                        width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="time" label="Times" prepend-icon="access_time" readonly v-on="on"  required>
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
        <v-flex xs12 sm12 md12 lg12 xl12 class="mt-2">
            <v-divider :divider="divider"></v-divider>
            <v-textarea class="mt-2" name="input" label="Describe the call..." v-model="log" :rules="logRules"></v-textarea>
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
                @click="createLogCall()">Save</v-btn>
            <v-btn color="red" small flat
                @click="closeCreateLogCallDialog()">Close</v-btn>
        </v-layout>
    </v-layout>
</template>
<script>
    import logService from '../../../services/log.service'
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
            log: '',
            divider: true,
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            time: '08:00',
            menu2: false,
            modal2: false,
            items: ['No answer', 'Busy', 'Wrong number', 'Left live message', 'Left voicemail', 'Connected'],
            item: 'No answer',
            logRules: [
                v => !!v || 'Required'
            ],
            // enableSaveButton: true
        }),
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
            },
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
            closeCreateLogCallDialog(){
                this.$emit('closeCreateLogCallDialog');
            },
            createLogCall(){
                let data = {
                    "contactId": this.idContact,
                    "time":this.date + 'T' + this.time + ':00',
                    "log": this.log,
                    "type":"call",
                    "status": this.item
                }
                logService.createLog(this.idAccount, this.idContact, data).then(result => {
                    this.log = '';
                    eventBus.updateLogCallList();
                });
                this.$emit('closeCreateLogCallDialog');
            }
        },
    }
</script>