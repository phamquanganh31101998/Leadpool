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
                                            <v-btn outline color="indigo" @click="$router.push('../')">
                                                <v-icon>keyboard_arrow_left</v-icon>Danh sách liên lạc<v-icon>person</v-icon>
                                            </v-btn>
                                        </v-flex>
                                        <!-- <v-flex xs5 sm5 md5 lg3 xl2>
                                            <v-menu offset-y left>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn small flat color="primary" left dark v-on="on">
                                                        Option <v-icon>keyboard_arrow_down</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-list>
                                                    <v-list-tile>
                                                        <v-list-tile-title>Unfollow</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-divider :divider="divider"></v-divider>
                                                    <v-list-tile>
                                                        <v-list-tile-title>View all properties</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-list-tile>
                                                        <v-list-tile-title>View properties history</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-divider :divider="divider"></v-divider>
                                                    <v-list-tile>
                                                        <v-list-tile-title>Search in Google</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-list-tile>
                                                        <v-list-tile-title>Opt out of email</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-divider :divider="divider"></v-divider>
                                                    <v-list-tile>
                                                        <v-list-tile-title>Merge</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-list-tile>
                                                        <v-list-tile-title>Delete</v-list-tile-title>
                                                    </v-list-tile>
                                                </v-list>
                                            </v-menu>
                                        </v-flex> -->
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
                                                <v-menu :close-on-content-click="false" :width="100" offset-x v-model="basicInfoDialog">
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn flat color="indigo" dark v-on="on">
                                                            <v-icon>edit</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <v-card class="pa-3">
                                                        <v-layout row>
                                                            <v-flex xs6 sm6 md6 lg6 xl6>
                                                                <v-text-field label="Họ" outline v-model="detail.firstName"></v-text-field>
                                                            </v-flex>
                                                            <v-flex xs6 sm6 md6 lg6 xl6>
                                                                <v-text-field label="Tên" outline v-model="detail.lastName"></v-text-field>
                                                            </v-flex>
                                                        </v-layout>

                                                        <v-layout row>
                                                            <v-text-field label="Email" outline v-model="detail.email"></v-text-field>
                                                        </v-layout>

                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn flat @click="basicInfoDialog = false" color="red">Đóng</v-btn>
                                                            <v-btn color="primary" flat @click="updateBasicInfoContactDetail(detail.firstName, detail.lastName, detail.email)">Lưu lại</v-btn>
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
                                                                <span class="headline">Ghi chú</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <newNote @closeCreateNoteDialog = "createNote = false" :idAccount="this.idAccount" :idContact="this.idContact"/>
                                                            </v-card-text>
                                                            <v-divider :divider="divider"></v-divider>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <p>Ghi chú</p>
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
                                                                <span class="headline">Gửi Email</span>
                                                            </v-card-title>
                                                            <!-- <v-card-text>
                                                                
                                                            </v-card-text> -->
                                                            <!-- <v-divider :divider="divider"></v-divider> -->
                                                            <!-- <v-card-text> -->
                                                                <newEmail :idAccount="this.idAccount" :idContact="this.idContact" @closeCreateEmailDialog="createEmail = false"/>
                                                            <!-- </v-card-text> -->
                                                            <v-divider :divider="divider"></v-divider>
                                                            <!-- <v-card-actions>
                                                                <v-btn color="blue darken-1" small flat
                                                                    @click="createEmail = false">Sent</v-btn>
                                                                <v-btn color="red" small flat
                                                                    @click="createEmail = false">Cancel</v-btn>
                                                            </v-card-actions> -->
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
                                                    <p>Gọi điện</p>
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
                                                                <v-list-tile-title>Lưu thông tin cuộc gọi</v-list-tile-title>
                                                            </v-list-tile>
                                                            <v-list-tile @click="createLogEmail = true">
                                                                <v-list-tile-title>Lưu thông tin email</v-list-tile-title>
                                                            </v-list-tile>
                                                            <v-list-tile @click="createLogMeet= true">
                                                                <v-list-tile-title>Lưu thông tin cuộc họp</v-list-tile-title>
                                                            </v-list-tile>
                                                        </v-list>
                                                    </v-menu>
                                                    <v-dialog v-model="createLogCall" persistent max-width="700px">
                                                        <v-card>
                                                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                                                <span class="headline">Lưu thông tin cuộc gọi</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <newLogCall :idAccount="this.idAccount" :idContact="this.idContact" @closeCreateLogCallDialog="createLogCall = false"/>
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-dialog>
                                                    <v-dialog v-model="createLogEmail" persistent max-width="700px">
                                                        <v-card>
                                                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                                                <span class="headline">Lưu thông tin email</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <newLogEmail :idAccount="this.idAccount" :idContact="this.idContact" @closeCreateLogEmailDialog="createLogEmail = false"/>
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-dialog>
                                                    <v-dialog v-model="createLogMeet" persistent max-width="700px">
                                                        <v-card>
                                                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                                                <span class="headline">Lưu thông tin cuộc họp</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <newLogMeet :idAccount="this.idAccount" :idContact="this.idContact"  @closeCreateLogMeetDialog="createLogMeet = false"/>
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <p>Lưu lại</p>
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
                                                                <span class="headline">Công việc</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <newTask :idAccount="this.idAccount" :idContact="this.idContact" @closeCreateTaskDialog="createTask = false"/>
                                                            </v-card-text>
                                                            <!-- <v-divider :divider="divider"></v-divider>
                                                            <v-card-actions>
                                                                <v-btn color="blue darken-1" small flat
                                                                    @click="createTask = false">Save Task</v-btn>
                                                                <v-btn color="red" small flat
                                                                    @click="createTask = false">Cancel</v-btn>
                                                            </v-card-actions> -->
                                                        </v-card>
                                                    </v-dialog>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <p>Công việc</p>
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
                                                                <span class="headline">Tạo cuộc họp</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <newMeet />
                                                            </v-card-text>
                                                            <v-divider :divider="divider"></v-divider>
                                                            <v-card-actions>
                                                                <v-btn color="blue darken-1" small flat
                                                                    @click="createMeet = false">Save</v-btn>
                                                                <v-btn color="red darken-1" small flat
                                                                    @click="createMeet = false">Cancel</v-btn>
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
                                <v-expansion-panel expand>
                                    <v-expansion-panel-content>
                                        <template v-slot:header>
                                            <div>Thông tin về liên lạc này</div>
                                        </template>
                                        <v-layout row v-for="(item,i) in items" :key="i">
                                            <v-flex xs12 sm12 md12 lg12 xl12 class="pl-4">
                                                <v-hover>
                                                    <v-layout row slot-scope="{ hover }">
                                                        <v-flex xs7 sm7 md7 lg8 xl8>
                                                            <v-text-field :label="item.title" v-model="item.value"
                                                            :readonly = "item.title == 'Thời gian hoạt động gần nhất' || item.title == 'Thời gian liên lạc gần nhất'"
                                                            @change="updateContactDetail(item.property, item.value)">
                                                            </v-text-field>
                                                        </v-flex>
                                                        <v-flex xs5 sm5 md5 lg4 xl4 v-if = "item.title != 'Thời gian hoạt động gần nhất' && item.title != 'Thời gian liên lạc gần nhất'">
                                                            <v-expand-transition>
                                                                <div v-if="hover">
                                                                    <v-dialog v-model="item.dialog" fullscreen
                                                                        hide-overlay
                                                                        transition="dialog-right-transition">
                                                                        <template v-slot:activator="{ on }">
                                                                            <v-btn small dark color="grey darken-1"
                                                                                v-on="on" class="mt-3">
                                                                                Lịch sử thay đổi</v-btn>
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
                            Hoạt động
                        </v-tab>
                        <v-tab href="#tab-2">
                            Ghi chú
                        </v-tab>
                        <v-tab href="#tab-3">
                            Email
                        </v-tab>
                        <v-tab href="#tab-4">
                            Cuộc Gọi
                        </v-tab>
                        <v-tab href="#tab-5">
                            Công việc
                        </v-tab>
                        <v-tab href="#tab-6">
                            Cuộc họp
                        </v-tab>
                        <v-tab-item value="tab-1">
                            <!-- <v-layout row>
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
                            </v-layout> -->
                            <note class="mt-3" :idAccount="this.idAccount" :idContact="this.idContact"/>
                            <email class="mt-3" :idAccount="this.idAccount" :idContact="this.idContact"/>
                            <task class="mt-3" :idAccount="this.idAccount" :idContact="this.idContact"/>
                            <call class="mt-3" :idAccount="this.idAccount" :idContact="this.idContact"/>
                            <meet :idAccount="this.idAccount" :idContact="this.idContact"/>
                        </v-tab-item>
                        <v-tab-item value="tab-2">
                            <v-layout row>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-right pr-2">
                                    <v-btn dark small depressed @click="createNote = true" color="#425b76">Tạo ghi chú
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <note :idAccount="this.idAccount" :idContact="this.idContact"/>
                        </v-tab-item>
                        <v-tab-item value="tab-3">
                            <v-layout row>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-right pr-2">
                                    <v-btn small color="grey lighten-3" @click="createLogEmail=true">Lưu lại thông tin Email</v-btn>
                                    <v-btn dark depressed small color="#425b76" @click="createEmail= true">Gửi email
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <email :idAccount="this.idAccount" :idContact="this.idContact"/>
                        </v-tab-item>
                        <v-tab-item value="tab-4">
                            <v-layout row>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-right pr-2">
                                    <v-btn small color="grey lighten-3" @click="createLogCall = true">Lưu lại thông tin cuộc gọi</v-btn>
                                    <v-btn dark depressed small color="#425b76">Tạo cuộc gọi</v-btn>
                                </v-flex>
                            </v-layout>
                            <call :idAccount="this.idAccount" :idContact="this.idContact"/>
                        </v-tab-item>
                        <v-tab-item value="tab-5">
                            <v-layout row>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-right pr-2">
                                    <v-btn dark depressed small @click="createTask = true" color="#425b76">Tạo công việc
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <task :idAccount="this.idAccount" :idContact="this.idContact"/>
                        </v-tab-item>
                        <v-tab-item value="tab-6">
                            <v-layout row>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-right pr-2">
                                    <v-btn small color="grey lighten-3" @click="createLogMeet=true">Lưu lại thông tin cuộc họp</v-btn>
                                    <v-btn dark depressed small color="#425b76" @click="createMeet=true">Tạo cuộc họp mới
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <meet :idAccount="this.idAccount" :idContact="this.idContact"/>
                        </v-tab-item>
                    </v-tabs>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-content>
</template>
<script>
    import {eventBus} from '../../eventBus'
    import note from '../components/contacts/note'
    import email from '../components/contacts/email'
    import task from '../components/contacts/task'
    import call from '../components/contacts/call'
    import meet from '../components/contacts/meet'
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
            idAccount: {
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
            createLogEmail: false,
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
            detail:[],
            expandDetail: true,
            basicInfoDialog: false
        }),
        methods:{
            getDetail(){
                contact.getdetailContact(this.idAccount,this.idContact).then(result =>{
                    this.detail = result.response
                    this.items = [{
                        title: 'Lifecycle stage',
                        description: 'The qualification of contacts to sales readiness. It can be set through imports, forms, workflows, and manually on a per contact basis.',
                        value: result.response.lifecycleStage,
                        dialog: false,
                        property: 'lifecycleStage'
                    },
                    {
                        title: 'Lead Status',
                        description: "The contact's sales, prospecting or outreach status",
                        value: result.response.leadStatus,
                        dialog: false,
                        property: 'leadStatus'
                    },
                    {
                        title: 'Thuộc sở hữu',
                        description: 'The owner of a contact. This can be any HubSpot user or Salesforce integration user, and can be set manually or via Workflows.',
                        value: result.response.contactOwner,
                        dialog: false,
                        property: 'contactOwner'
                    },
                    {
                        title: 'Số điện thoại',
                        description: "A contact's primary phone number",
                        value: result.response.phone,
                        dialog: false,
                        property: 'phone'
                    },
                    {
                        title: 'Email',
                        description: "A contact's email address",
                        value: result.response.email,
                        dialog: false,
                        property: 'email'
                    },
                    {
                        title: 'Thời gian hoạt động gần nhất',
                        description: 'The last time a note, call, email, meeting, or task was logged for a contact. This is set automatically by HubSpot based on user actions in the contact record.',
                        value: result.response.lastActivityDate,
                        dialog: false,
                    },
                    {
                        title: 'Thời gian liên lạc gần nhất',
                        description: 'The last time a call, email, or meeting was logged for a contact. This is set automatically by HubSpot based on user actions in the contact record.',
                        value: result.response.lastContacted,
                        dialog: false,
                    },
                    {
                        title: 'Thành phố',
                        description: 'Thành phố',
                        value: result.response.city,
                        dialog: false,
                        property: 'city'
                    },
                    {
                        title: 'Ngành nghề',
                        description: 'phân loại ngành nghề',
                        value: result.response.bussiness,
                        dialog: false,
                        property: 'bussiness'
                    }]
                    // console.log(result)
                })
            },
            updateContactDetail(property, value){
                let body = {
                    properties: [
                        {
                            property: property,
                            value: value
                        }
                    ]
                }
                contact.updateContactDetail(this.idAccount, this.idContact, body).then(result => {
                    console.log(result);
                }).catch(error => {
                    console.log(error);
                })
            },
            updateBasicInfoContactDetail(firstName, lastName, email){
                let body = {
                    properties: [
                        {
                            property: 'firstName',
                            value: firstName
                        },
                        {
                            property: 'lastName',
                            value: lastName
                        },
                        {
                            property: 'email',
                            value: email
                        },
                    ]
                }
                contact.updateContactDetail(this.idAccount, this.idContact, body).then(result => {
                    console.log(result);
                    this.basicInfoDialog = false;
                }).catch(error => {
                    console.log(error);
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
            meet,
            logs,
            newEmail,
            newNote,
            newMeet,
            newTask,
            newLogEmail,
            newLogCall,
            newLogMeet,
        
        }
    }
    // đã làm được phần lấy list thuộc tính
    // chuyển dc trang lấy dc các thông tin cần thiết
    // thêm được contact mới
</script>