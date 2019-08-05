<template>
    <v-content class="mt-2">
        <v-layout row>
            <v-flex xs6 sm6 md4 lg4 xl3 class="pr-3">
                <v-layout justify-start fill-height>
                    <v-flex d-flex xs12 sm12 md12 lg12 xl12 style="background-color:#fff">
                        <v-card flat>
                            <v-layout row>
                                <v-card-text>
                                    <v-layout row>
                                        <v-flex xs7 sm7 md7 lg9 xl10>
                                            <v-btn outline color="indigo">
                                                <v-icon>keyboard_arrow_left</v-icon>Contacts<v-icon>person</v-icon>
                                            </v-btn>
                                        </v-flex>
                                        <v-flex xs5 sm5 md5 lg3 xl2>
                                            <v-menu offset-y left>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn small flat color="primary" left dark v-on="on">
                                                        option <v-icon>keyboard_arrow_down</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-list>
                                                    <v-list-tile>
                                                        <v-list-tile-title>unfollow</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-divider :divider="divider"></v-divider>
                                                    <v-list-tile>
                                                        <v-list-tile-title>view all properties</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-list-tile>
                                                        <v-list-tile-title>view properties history</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-divider :divider="divider"></v-divider>
                                                    <v-list-tile>
                                                        <v-list-tile-title>search in Google</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-list-tile>
                                                        <v-list-tile-title>opt out of email</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-divider :divider="divider"></v-divider>
                                                    <v-list-tile>
                                                        <v-list-tile-title>merge</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-list-tile>
                                                        <v-list-tile-title>delete</v-list-tile-title>
                                                    </v-list-tile>
                                                </v-list>
                                            </v-menu>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-layout>
                            <v-layout row wrap>
                                <v-card-text class="text-xs-center">
                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                        <v-btn fab dark large color="blue-grey">
                                            {{detail.firstName}}
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                        <v-layout row>
                                            <v-flex xs8 sm8 md7 lg7 xl7 class="text-xs-right">
                                                <h3 class="mt-2">{{detail.lastName}} {{detail.firstName}}</h3>
                                            </v-flex>
                                            <v-flex xs4 sm4 md5 lg5 xl5 class="text-xs-right">
                                                <v-menu :close-on-content-click="false" :width="100" offset-x>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn flat color="indigo" dark v-on="on">
                                                            <v-icon>edit</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <v-card class="pa-3">
                                                        <v-layout row>
                                                            <v-flex xs6 sm6 md6 lg6 xl6>
                                                                <v-text-field label="First Name" outline></v-text-field>
                                                            </v-flex>
                                                            <v-flex xs6 sm6 md6 lg6 xl6>
                                                                <v-text-field label="Last Name" outline></v-text-field>
                                                            </v-flex>
                                                        </v-layout>

                                                        <v-layout row>
                                                            <v-text-field label="Job title" outline></v-text-field>
                                                        </v-layout>

                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn flat>Cancel</v-btn>
                                                            <v-btn color="primary" flat>Save</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-menu>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-card-text>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12 sm12 md10 lg10 xl10 offset-md1 offset-lg1 offset-xl1>
                                    <v-layout row>
                                        <v-flex xs2 sm2 md2 lg2 xl2>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <v-dialog v-model="createNote" persistent max-width="700px">
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn fab small color="#E0E0E0" v-on="on">
                                                                <v-icon dark>note_add</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <v-card>
                                                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                                                <span class="headline">Note</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <newNote />
                                                            </v-card-text>
                                                            <v-divider :divider="divider"></v-divider>
                                                            <v-card-actions>
                                                                <v-btn color="blue darken-1" small flat
                                                                    @click="createNote = false">Save Note</v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <p>Note</p>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs2 sm2 md2 lg2 xl2>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <v-dialog v-model="createEmail" persistent max-width="700px">
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn fab small color="#E0E0E0" v-on="on">
                                                                <v-icon>mail_outline</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <v-card>
                                                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                                                <span class="headline">Email</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <v-layout row>
                                                                    <v-flex>
                                                                        <a href="#">
                                                                            Templates
                                                                        </a>
                                                                    </v-flex>
                                                                    <v-flex>
                                                                        <a href="#">
                                                                            Sequences
                                                                        </a>
                                                                    </v-flex>
                                                                    <v-flex>
                                                                        <a href="#">
                                                                            Documents
                                                                        </a>
                                                                    </v-flex>
                                                                    <v-flex>
                                                                        <a href="#">
                                                                            Meeting
                                                                        </a>
                                                                    </v-flex>
                                                                    <v-flex>
                                                                        <a href="#">
                                                                            Quotes
                                                                        </a>
                                                                    </v-flex>
                                                                </v-layout>
                                                            </v-card-text>
                                                            <v-divider :divider="divider"></v-divider>
                                                            <v-card-text>
                                                                <newEmail />
                                                            </v-card-text>
                                                            <v-divider :divider="divider"></v-divider>
                                                            <v-card-actions>
                                                                <v-btn color="blue darken-1" small flat
                                                                    @click="createEmail = false">Sent</v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <p>Email</p>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs2 sm2 md2 lg2 xl2>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <v-btn fab small color="#E0E0E0">
                                                        <v-icon>phone</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <p>Call</p>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs2 sm2 md2 lg2 xl2>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <v-menu offset-y>
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn fab small color="#E0E0E0">
                                                                <v-icon dark v-on="on">add</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <v-list>
                                                            <v-list-tile @click="createLogCall = true">
                                                                <v-list-tile-title>Log a call</v-list-tile-title>
                                                            </v-list-tile>
                                                            <v-list-tile @click="createLogMail = true">
                                                                <v-list-tile-title>Log an email</v-list-tile-title>
                                                            </v-list-tile>
                                                            <v-list-tile @click="createLogMeet= true">
                                                                <v-list-tile-title>Log a metting</v-list-tile-title>
                                                            </v-list-tile>
                                                        </v-list>
                                                    </v-menu>
                                                    <v-dialog v-model="createLogCall" persistent max-width="700px">
                                                        <v-card>
                                                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                                                <span class="headline">Log call</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <newLogCall />
                                                            </v-card-text>
                                                            <v-divider :divider="divider"></v-divider>
                                                            <v-card-actions>
                                                                <v-btn color="blue darken-1" small flat
                                                                    @click="createLogCall = false">Log active</v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                    <v-dialog v-model="createLogMail" persistent max-width="700px">
                                                        <v-card>
                                                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                                                <span class="headline">Log email</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <newLogEmail />
                                                            </v-card-text>
                                                            <v-divider :divider="divider"></v-divider>
                                                            <v-card-actions>
                                                                <v-btn color="blue darken-1" small flat
                                                                    @click="createLogMail = false">Log active</v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                    <v-dialog v-model="createLogMeet" persistent max-width="700px">
                                                        <v-card>
                                                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                                                <span class="headline">Log meet</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <newLogMeet />
                                                            </v-card-text>
                                                            <v-divider :divider="divider"></v-divider>
                                                            <v-card-actions>
                                                                <v-btn color="blue darken-1" small flat
                                                                    @click="createLogMeet = false">Log active</v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <p>Log</p>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs2 sm2 md2 lg2 xl2>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <v-dialog v-model="createTask" persistent max-width="700px">
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn fab small color="#E0E0E0" v-on="on">
                                                                <v-icon dark>calendar_today</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <v-card>
                                                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                                                <span class="headline">Task</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <newTask />
                                                            </v-card-text>
                                                            <v-divider :divider="divider"></v-divider>
                                                            <v-card-actions>
                                                                <v-btn color="blue darken-1" small flat
                                                                    @click="createTask = false">Save Task</v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <p>Task</p>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs2 sm2 md2 lg2 xl2>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <v-dialog v-model="createMeet" persistent max-width="700px">
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn fab small color="#E0E0E0" v-on="on">
                                                                <v-icon dark>event</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <v-card>
                                                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                                                <span class="headline">Schedule</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <newMeet />
                                                            </v-card-text>
                                                            <v-divider :divider="divider"></v-divider>
                                                            <v-card-actions>
                                                                <v-btn color="blue darken-1" small flat
                                                                    @click="createMeet = false">Save</v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <p>Meet</p>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-expansion-panel>
                                    <v-expansion-panel-content>
                                        <template v-slot:header>
                                            <div>About this contact</div>
                                        </template>
                                        <v-layout row v-for="(item,i) in items" :key="i">
                                            <v-flex xs12 sm12 md12 lg12 xl12 class="pl-4">
                                                <v-hover>
                                                    <v-layout row slot-scope="{ hover }">
                                                        <v-flex xs7 sm7 md7 lg8 xl8>
                                                            <v-text-field :label="item.title" :placeholder="item.value">
                                                            </v-text-field>
                                                        </v-flex>
                                                        <v-flex xs5 sm5 md5 lg4 xl4>
                                                            <v-expand-transition>
                                                                <div v-if="hover">
                                                                    <v-dialog v-model="item.dialog" fullscreen
                                                                        hide-overlay
                                                                        transition="dialog-right-transition">
                                                                        <template v-slot:activator="{ on }">
                                                                            <v-btn small dark color="grey darken-1"
                                                                                v-on="on" class="mt-3">
                                                                                See history</v-btn>
                                                                        </template>
                                                                        <v-card>
                                                                            <v-card-title
                                                                                style="background-color:#1E88E5;color:#fff">
                                                                                <span class="headline">{{item.title}}
                                                                                    history</span>
                                                                            </v-card-title>
                                                                            <v-card-text>
                                                                                <v-layout row wrap>
                                                                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                                                                        <v-layout row>
                                                                                            <strong>Property
                                                                                                description</strong>
                                                                                        </v-layout>
                                                                                    </v-flex>
                                                                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                                                                        <v-layout row>
                                                                                            <p>{{item.description}}
                                                                                            </p>
                                                                                        </v-layout>
                                                                                    </v-flex>
                                                                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                                                                        <logs />
                                                                                    </v-flex>
                                                                                </v-layout>
                                                                            </v-card-text>
                                                                            <v-card-actions>
                                                                                <v-spacer></v-spacer>
                                                                                <v-btn color="error"
                                                                                    @click="item.dialog = false">Close
                                                                                </v-btn>
                                                                                <v-btn color="grey" flat
                                                                                    @click="item.dialog = false">Edit
                                                                                </v-btn>
                                                                            </v-card-actions>
                                                                        </v-card>
                                                                    </v-dialog>
                                                                </div>
                                                            </v-expand-transition>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-hover>
                                            </v-flex>
                                        </v-layout>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-layout>
                            <v-layout row>
                                <v-expansion-panel>
                                    <v-expansion-panel-content>
                                        <template v-slot:header>
                                            <div>Website activity</div>
                                        </template>
                                        <v-layout row>
                                            <p>Website activity shows you how many times a contact has visited your site
                                                and viewed your pages.</p>
                                        </v-layout>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-layout>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs6 sm6 md8 lg8 xl9>
                <v-layout row>
                    <v-tabs left color="transparent" style="width:100%">
                        <v-tabs-slider color="#000000"></v-tabs-slider>
                        <v-tab href="#tab-1">
                            Activity
                        </v-tab>
                        <v-tab href="#tab-2">
                            Notes
                        </v-tab>
                        <v-tab href="#tab-3">
                            Emails
                        </v-tab>
                        <v-tab href="#tab-4">
                            Calls
                        </v-tab>
                        <v-tab href="#tab-5">
                            Tasks
                        </v-tab>
                        <v-tab-item value="tab-1">
                            <v-layout row>
                                <span class="mt-2 ml-3">Filter by:</span>
                                <v-menu :close-on-content-click="false" :nudge-width="120" offset-y>
                                    <template v-slot:activator="{ on }">
                                        <a color="indigo" v-on="on" class="mt-2 ml-5">
                                            Filter activity (24/24)
                                        </a>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <v-layout row>
                                                <v-text-field append-icon="search" label="Search" single-line
                                                    hide-details>
                                                </v-text-field>
                                            </v-layout>
                                        </v-card-title>
                                    </v-card>
                                </v-menu>
                                <v-menu :close-on-content-click="false" :nudge-width="120" offset-y>
                                    <template v-slot:activator="{ on }">
                                        <a color="indigo" v-on="on" class="mt-2 ml-5">
                                            All users
                                        </a>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <v-layout row>
                                                <v-text-field append-icon="search" label="Search" single-line
                                                    hide-details>
                                                </v-text-field>
                                            </v-layout>
                                        </v-card-title>
                                    </v-card>
                                </v-menu>
                                <v-menu :close-on-content-click="false" :nudge-width="120" offset-y>
                                    <template v-slot:activator="{ on }">
                                        <a color="indigo" v-on="on" class="mt-2 ml-5">
                                            All teams
                                        </a>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <v-layout row>
                                                <v-text-field append-icon="search" label="Search" single-line
                                                    hide-details>
                                                </v-text-field>
                                            </v-layout>
                                        </v-card-title>
                                    </v-card>
                                </v-menu>
                            </v-layout>
                            <note class="mt-3" />
                            <email class="mt-3" />
                            <task class="mt-3" />
                            <call class="mt-3" />
                        </v-tab-item>
                        <v-tab-item value="tab-2">
                            <v-layout row>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-right pr-2">
                                    <v-btn dark small depressed @click="createNote = true" color="#425b76">Create Note
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <note />
                        </v-tab-item>
                        <v-tab-item value="tab-3">
                            <v-layout row>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-right pr-2">
                                    <v-btn small color="grey lighten-3">Log Email</v-btn>
                                    <v-btn dark depressed small color="#425b76" @click="createEmail= true">Create Email
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <email />
                        </v-tab-item>
                        <v-tab-item value="tab-4">
                            <v-layout row>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-right pr-2">
                                    <v-btn small color="grey lighten-3" @click="createLogCall = true">Log Call</v-btn>
                                    <v-btn dark depressed small color="#425b76">Make a phone
                                        call</v-btn>
                                </v-flex>
                            </v-layout>
                            <call />
                        </v-tab-item>
                        <v-tab-item value="tab-5">
                            <v-layout row>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-right pr-2">
                                    <v-btn dark depressed small @click="createTask = true" color="#425b76">Create Task
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <task />
                        </v-tab-item>
                    </v-tabs>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-content>
</template>
<script>
    import note from '../components/contacts/note'
    import email from '../components/contacts/email'
    import task from '../components/contacts/task'
    import call from '../components/contacts/call'
    import activity from '../components/contacts/activity'
    import logs from '../components/logs/history'
    import newNote from '../components/creates/createNote'
    import newEmail from '../components/creates/createEmail'
    import newTask from '../components/creates/createTask'
    import newMeet from '../components/creates/createMeet'
    import newLogCall from '../components/creates/createLogCall'
    import newLogEmail from '../components/creates/createLogEmail'
    import newLogMeet from '../components/creates/createLogMeet'
    import contact from '../../services/contacts.service'
    export default {
        props: {
            idUser: {
                type: String,
                default: null,
            },
            idContact: {
                type: String,
                default: null,
            }
        },
        data: () => ({
            divider: true,
            dialog: false,
            createNote: false,
            createEmail: false,
            createTask: false,
            createMeet: false,
            createLogCall: false,
            createLogMail: false,
            createLogMeet: false,
            items: [{
                    title: 'Lifecycle stage',
                    description: 'The qualification of contacts to sales readiness. It can be set through imports, forms, workflows, and manually on a per contact basis.',
                    value: '',
                    dialog: false,
                },
                {
                    title: 'Lead Status',
                    description: "The contact's sales, prospecting or outreach status",
                    value: '',
                    dialog: false,
                },
                {
                    title: 'Contact owner',
                    description: 'The owner of a contact. This can be any HubSpot user or Salesforce integration user, and can be set manually or via Workflows.',
                    value: '',
                    dialog: false,
                },
                {
                    title: 'Sales Chiến',
                    description: 'Sales chiến tìm khách',
                    value: '',
                    dialog: false,
                },
                {
                    title: 'Mar owner',
                    description: 'khách được SQL bởi MKT',
                    value: '',
                    dialog: false,
                },
                {
                    title: 'Phone number',
                    description: "A contact's primary phone number",
                    value: '',
                    dialog: false,
                },
                {
                    title: 'Email',
                    description: "A contact's email address",
                    value: '',
                    dialog: false,
                },
                {
                    title: 'Dịch vụ',
                    description: 'Để bắn lead cho đúng: adsplus, webdoctor, guru',
                    value: '',
                    dialog: false,
                },
                {
                    title: 'Last active date',
                    description: 'The last time a note, call, email, meeting, or task was logged for a contact. This is set automatically by HubSpot based on user actions in the contact record.',
                    value: '',
                    dialog: false,
                },
                {
                    title: 'Last contactef',
                    description: 'The last time a call, email, or meeting was logged for a contact. This is set automatically by HubSpot based on user actions in the contact record.',
                    value: '',
                    dialog: false,
                },
                {
                    title: 'Website URL',
                    description: "The contact's company website",
                    value: '',
                    dialog: false,
                },
                {
                    title: 'Original Source',
                    description: 'The first known source through which a contact found your website. Source is automatically set by HubSpot, but may be updated manually.',
                    value: '',
                    dialog: false,
                },
                {
                    title: 'Source for mar',
                    description: 'Nguồn thống kê từ team Marketing',
                    value: '',
                    dialog: false,
                },
                {
                    title: 'Thành phố',
                    description: 'Thành phố',
                    value: '',
                    dialog: false,
                },
                {
                    title: 'Ngành nghề',
                    description: 'phân loại ngành nghề',
                    value: '',
                    dialog: false,
                }
            ],
            detail:[]
        }),
        methods:{
            getDetail(){
                contact.getdetailContact(this.idUser,this.idContact).then(result =>{
                    this.detail = result.response
                    this.items = [{
                    title: 'Lifecycle stage',
                    description: 'The qualification of contacts to sales readiness. It can be set through imports, forms, workflows, and manually on a per contact basis.',
                    value: result.response.lifecycleStage,
                    dialog: false,
                },
                {
                    title: 'Lead Status',
                    description: "The contact's sales, prospecting or outreach status",
                    value: result.response.leadStatus,
                    dialog: false,
                },
                {
                    title: 'Contact owner',
                    description: 'The owner of a contact. This can be any HubSpot user or Salesforce integration user, and can be set manually or via Workflows.',
                    value: result.response.contactOwner,
                    dialog: false,
                },
                {
                    title: 'Phone number',
                    description: "A contact's primary phone number",
                    value: result.response.phone,
                    dialog: false,
                },
                {
                    title: 'Email',
                    description: "A contact's email address",
                    value: result.response.email,
                    dialog: false,
                },
                {
                    title: 'Last active date',
                    description: 'The last time a note, call, email, meeting, or task was logged for a contact. This is set automatically by HubSpot based on user actions in the contact record.',
                    value: result.response.lastActivityDate,
                    dialog: false,
                },
                {
                    title: 'Last contacter',
                    description: 'The last time a call, email, or meeting was logged for a contact. This is set automatically by HubSpot based on user actions in the contact record.',
                    value: result.response.lastContacted,
                    dialog: false,
                },
                {
                    title: 'Thành phố',
                    description: 'Thành phố',
                    value: result.response.city,
                    dialog: false,
                },
                {
                    title: 'Ngành nghề',
                    description: 'phân loại ngành nghề',
                    value: result.response.bussiness,
                    dialog: false,
                }]
                    console.log(result)
                })
            }
        },
        created(){
            this.getDetail()
        },
        components: {
            note,
            email,
            task,
            activity,
            call,
            logs,
            newEmail,
            newNote,
            newMeet,
            newTask,
            newLogEmail,
            newLogCall,
            newLogMeet
        }
    }
    // đã làm được phần lấy list thuộc tính
    // chuyển dc trang lấy dc các thông tin cần thiết
    // thêm được contact mới
</script>