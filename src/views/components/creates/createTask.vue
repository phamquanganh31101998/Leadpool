<template>
    <v-layout wrap>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-layout row>
                <v-flex xs4 sm5 md6 lg6 xl6>
                    <v-text-field placeholder="Enter your task"></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4 lg4 xl4>
                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy
                        transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="dateFormatted" label="Date" persistent-hint prepend-icon="event"
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
            <v-textarea class="mt-2" name="input" label="Notes..." value=""></v-textarea>
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
                    <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
                        <template v-slot:activator="{ on }">
                            <a color="indigo" v-on="on">
                                tu nguyen
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
                                    <v-list-tile v-for="(item, index) in days" :key="index" @click="choiseD(item)">
                                        <v-list-tile-title>{{ item }}</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
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
    </v-layout>
</template>
<script>
    export default {
        data: vm => ({
            divider: true,
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            time: null,
            menu2: false,
            modal2: false,
            items: ['No answer', 'Busy', 'Wrong number', 'Left live message', 'left voicemail', 'connected'],
            types: ['Email', 'Todo', 'Call'],
            type: 'Todo',
            days: ['The day of','The day before','The week before','Custom Date','No remider'],
            day: 'The day of'
        }),
        computed: {
            computedDateFormatted() {
                return this.formatDate(this.date)
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
            choisE(item) {
                this.type = item
            },
            choiseD(item){
                this.day = item
            }
        }
    }
</script>