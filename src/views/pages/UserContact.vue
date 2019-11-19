<template>
    <v-content class="mt-2">
        <v-layout row>
            <v-flex xs6 sm6 md4 lg4 xl3>
                <v-layout justify-start fill-height>
                    <v-flex d-flex xs12 sm12 md12 lg12 xl12 style="background-color:#fff">
                        <v-card flat>
                            <v-layout row>
                                <v-card-text>
                                    <v-layout row>
                                        <v-flex xs7 sm7 md7 lg9 xl10>
                                            <v-btn outline color="indigo" @click="$router.push('../')">
                                                <v-icon>keyboard_arrow_left</v-icon>LEADS<v-icon>person</v-icon>
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
                            <v-layout row wrap v-if="access == false">
                                <v-flex xs12 sm12 md12 lg12 xl12>
                                    <v-card flat width="100%">
                                        <v-card-text style="background-color: #FDEDEE; border: 1px solid red;">
                                            <v-card flat style="background-color: #FDEDEE">
                                                <v-card-text style="margin: 0px; padding: 0px;">
                                                    Bạn chỉ có thể xem mà không có quyền thao tác trên Lead này.
                                                </v-card-text>
                                            </v-card>
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap v-if="access == true && canSendSMS == false">
                                <v-flex xs12 sm12 md12 lg12 xl12>
                                    <v-card flat width="100%">
                                        <v-card-text style="background-color: #FDEDEE; border: 1px solid red;">
                                            <v-card flat style="background-color: #FDEDEE">
                                                <v-card-text style="margin: 0px; padding: 0px;">
                                                    Bạn chỉ có thể gửi SMS nếu có quyền <span style="font-weight: bold;">Liên lạc tất cả</span> đối với Lead
                                                </v-card-text>
                                            </v-card>
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
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
                                                        <v-btn flat color="indigo" dark v-on="on" >
                                                            <v-icon>edit</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <v-card class="pa-3">
                                                        <v-layout row>
                                                            <v-flex xs6 sm6 md6 lg6 xl6>
                                                                <v-text-field :readonly="!access" label="Họ" outline v-model="detail.firstName"></v-text-field>
                                                            </v-flex>
                                                            <v-flex xs6 sm6 md6 lg6 xl6>
                                                                <v-text-field :readonly="!access" label="Tên" outline v-model="detail.lastName"></v-text-field>
                                                            </v-flex>
                                                        </v-layout>

                                                        <v-layout row>
                                                            <v-form v-model="basicInfoValid" style="width: 100%;">
                                                                <v-text-field style="width: 100%;" :rules="emailRules" :readonly="!access" label="Email" outline v-model="detail.email"></v-text-field>
                                                            </v-form>
                                                            
                                                        </v-layout>

                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn flat @click="basicInfoDialog = false" color="red">Đóng</v-btn>
                                                            <v-btn :disabled="!access || !basicInfoValid" color="primary" flat @click="updateBasicInfoContactDetail(detail.firstName, detail.lastName, detail.email)">Lưu lại</v-btn>
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
                                        <v-flex>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <v-dialog v-model="createNote" persistent max-width="700px">
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn fab small color="#E0E0E0" v-on="on" :disabled="!access">
                                                                <v-icon dark>note_add</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <v-card>
                                                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                                                <span class="headline">Ghi chú</span>
                                                            </v-card-title>
                                                            <newNote @updateLastActivityDate="updateLastActivityDate()" @closeCreateNoteDialog = "createNote = false" :idAccount="this.idAccount" :idContact="this.idContact"/>
                                                            <v-divider :divider="divider"></v-divider>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <p>Ghi chú</p>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <v-dialog v-model="createEmail" persistent max-width="700px">
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn fab small color="#E0E0E0" v-on="on" :disabled="!access">
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
                                                                <newEmail @updateLastContacted="updateLastContacted()" @updateLastActivityDate="updateLastActivityDate()" :idAccount="this.idAccount" :idContact="this.idContact" @closeCreateEmailDialog="createEmail = false"/>
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
                                        <v-flex>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <v-dialog v-model="createSMS" persistent max-width="700px">
                                                        <template v-slot:activator="{ on }">
                                                            <template v-if="access == true">
                                                                <v-btn fab small color="#E0E0E0" v-on="on" v-if="canSendSMS == true">
                                                                    <v-icon>textsms</v-icon>
                                                                </v-btn>
                                                                <v-btn fab small color="#E0E0E0" v-else disabled>
                                                                    <v-icon>textsms</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <template v-else>
                                                                <v-btn fab small color="#E0E0E0" disabled>
                                                                    <v-icon>textsms</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            
                                                        </template>
                                                        <v-card>
                                                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                                                <span class="headline">Gửi tin nhắn SMS</span>
                                                            </v-card-title>
                                                            <!-- <v-card-text>
                                                                
                                                            </v-card-text> -->
                                                            <!-- <v-divider :divider="divider"></v-divider> -->
                                                            <!-- <v-card-text> -->
                                                                <newSMS @updateLastContacted="updateLastContacted()" @updateLastActivityDate="updateLastActivityDate()" :idAccount="this.idAccount" :idContact="this.idContact" @closeSendSMSDialog="createSMS = false"/>
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
                                                    <p>SMS</p>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <v-menu offset-y>
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn fab small color="#E0E0E0" v-on="on" :disabled="!access">
                                                                <v-icon dark>add</v-icon>
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
                                                                <newLogCall @updateLastActivityDate="updateLastActivityDate()" :idAccount="this.idAccount" :idContact="this.idContact" @closeCreateLogCallDialog="createLogCall = false"/>
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-dialog>
                                                    <v-dialog v-model="createLogEmail" persistent max-width="700px">
                                                        <v-card>
                                                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                                                <span class="headline">Lưu thông tin email</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <newLogEmail @updateLastActivityDate="updateLastActivityDate()" :idAccount="this.idAccount" :idContact="this.idContact" @closeCreateLogEmailDialog="createLogEmail = false"/>
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-dialog>
                                                    <v-dialog v-model="createLogMeet" persistent max-width="700px">
                                                        <v-card>
                                                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                                                <span class="headline">Lưu thông tin cuộc họp</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <newLogMeet @updateLastActivityDate="updateLastActivityDate()" :idAccount="this.idAccount" :idContact="this.idContact"  @closeCreateLogMeetDialog="createLogMeet = false"/>
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <p>Lưu lại</p>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center">
                                                    <v-dialog v-model="createTask" persistent max-width="700px">
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn fab small color="#E0E0E0" v-on="on" :disabled="!access">
                                                                <v-icon dark>calendar_today</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <v-card>
                                                            <v-card-title style="background-color:#1E88E5;color:#fff">
                                                                <span class="headline">Công việc</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <newTask @updateLastActivityDate="updateLastActivityDate()" :idAccount="this.idAccount" :idContact="this.idContact" @closeCreateTaskDialog="createTask = false"/>
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
                                        <!-- <v-flex xs2 sm2 md2 lg2 xl2>
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
                                        </v-flex> -->
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-expansion-panel expand v-model="expandDetail">
                                    <v-expansion-panel-content>
                                        <template v-slot:header>
                                            <div><p style="font-weight: bold;">Thông tin Lead</p></div>
                                        </template>
                                        <v-layout row v-for="(item,i) in items" :key="i">
                                            <v-flex xs12 sm12 md12 lg12 xl12 class="pl-4">
                                                <v-hover>
                                                    <v-layout row slot-scope="{ hover }">
                                                        <v-flex xs7 sm7 md7 lg8 xl8>
                                                            <template v-if="item.property == 'lifecycleStage'">
                                                                <v-select :readonly="!access" label="Vòng đời" :items="lifecycleStages" v-model="item.value" @change="updateContactDetail(item.property, item.value)"></v-select>
                                                            </template>
                                                            <template v-else-if="item.property == 'contactOwner'">
                                                                <v-select :readonly="!access" label="Tài khoản sở hữu" :items="allEmail" v-model="item.value" @change="confirmUpdateContactOwner(item.property, item.value)"></v-select>
                                                            </template>
                                                            <template v-else-if="item.property == 'leadStatus'">
                                                                <v-select :readonly="!access" label="Trạng thái" :items="allLeadStatus" v-model="item.value" @change="updateContactDetail(item.property, item.value)"></v-select>
                                                            </template>
                                                            <template v-else-if="item.property == 'city'">
                                                                <v-select :readonly="!access" label="Thành phố" :items="cities" v-model="item.value" @change="updateContactDetail(item.property, item.value)"></v-select>
                                                            </template>
                                                            <template v-else-if="item.property == 'bussiness'">
                                                                <v-select :readonly="!access" label="Ngành nghề" :items="allBussiness" v-model="item.value" @change="updateContactDetail(item.property, item.value)"></v-select>
                                                            </template>
                                                            <template v-else-if="item.property == 'phone'">
                                                                <v-form v-model="validPhone">
                                                                    <v-text-field :label="item.title" v-model="item.value" :rules="phoneRules" :readonly="!access"
                                                                        @change="updateContactDetailWithCondition(item.property, item.value, validPhone)">
                                                                    </v-text-field>
                                                                </v-form>
                                                                
                                                            </template>
                                                            <template v-else-if="item.property == 'email'">
                                                                <v-form v-model="validEmail">
                                                                    <v-text-field :label="item.title" v-model="item.value" :rules="emailRules" :readonly="!access"
                                                                        @change="updateContactDetailWithCondition(item.property, item.value, validEmail)">
                                                                    </v-text-field>
                                                                </v-form>
                                                                
                                                            </template>
                                                            <template v-else>
                                                                <v-text-field :label="item.title" v-model="item.value" :readonly="!access">
                                                                </v-text-field>
                                                            </template>
                                                            
                                                        </v-flex>
                                                        <v-flex xs5 sm5 md5 lg4 xl4>
                                                            <v-expand-transition>
                                                                <div v-if="hover">
                                                                    <v-btn small dark color="grey darken-1"
                                                                        class="mt-3" @click="getActionLog(item.property, item.title)">
                                                                        Lịch sử thay đổi</v-btn>
                                                                    <!-- <v-dialog v-model="item.dialog" fullscreen hide-overlay transition="dialog-right-transition">
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
                                                                    </v-dialog> -->
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
                            <!-- <v-layout row>
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
                            </v-layout> -->
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
                            <note @updateLastActivityDate="updateLastActivityDate()" :idAccount="this.idAccount" :idContact="this.idContact"/>
                            <email @updateLastActivityDate="updateLastActivityDate()" :idAccount="this.idAccount" :idContact="this.idContact"/>
                            <task @updateLastActivityDate="updateLastActivityDate()" :idAccount="this.idAccount" :idContact="this.idContact"/>
                            <call @updateLastActivityDate="updateLastActivityDate()" :idAccount="this.idAccount" :idContact="this.idContact"/>
                            <meet @updateLastActivityDate="updateLastActivityDate()" :idAccount="this.idAccount" :idContact="this.idContact"/>
                        </v-tab-item>
                        <v-tab-item value="tab-2">
                            <v-layout row>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-right pr-2">
                                    <v-btn dark small @click="createNote = true" color="#3E82F7" v-if="access">Tạo ghi chú
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <note :idAccount="this.idAccount" :idContact="this.idContact"/>
                        </v-tab-item>
                        <v-tab-item value="tab-3">
                            <v-layout row>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-right pr-2">
                                    <v-btn small color="grey lighten-3" @click="createLogEmail=true" v-if="access">Lưu thông tin Email</v-btn>
                                    <v-btn dark small color="#3E82F7" @click="createEmail= true" v-if="access">Gửi email
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <email :idAccount="this.idAccount" :idContact="this.idContact"/>
                        </v-tab-item>
                        <v-tab-item value="tab-4">
                            <v-layout row>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-right pr-2">
                                    <v-btn small color="grey lighten-3" @click="createLogCall = true" v-if="access">Lưu thông tin cuộc gọi</v-btn>
                                    <!-- <v-btn dark depressed small color="#425b76">Tạo cuộc gọi</v-btn> -->
                                </v-flex>
                            </v-layout>
                            <call :idAccount="this.idAccount" :idContact="this.idContact"/>
                        </v-tab-item>
                        <v-tab-item value="tab-5">
                            <v-layout row>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-right pr-2">
                                    <v-btn dark small @click="createTask = true" color="#3E82F7" v-if="access">Tạo công việc
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <task :idAccount="this.idAccount" :idContact="this.idContact"/>
                        </v-tab-item>
                        <v-tab-item value="tab-6">
                            <v-layout row>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-right pr-2">
                                    <v-btn small color="grey lighten-3" @click="createLogMeet=true" v-if="access">Lưu thông tin cuộc họp</v-btn>
                                    <!-- <v-btn dark depressed small color="#425b76" @click="createMeet=true">Tạo cuộc họp mới
                                    </v-btn> -->
                                </v-flex>
                            </v-layout>
                            <meet :idAccount="this.idAccount" :idContact="this.idContact"/>
                        </v-tab-item>
                    </v-tabs>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-dialog v-model="actionLog.dialog" width="60%" persistent>
            <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff" >
                    <span class="headline">Lịch sử thay đổi {{actionLog.title}}</span>
                </v-card-title>
                <v-card-text class>
                    <v-data-table :headers="actionLog.headers" :items="actionLog.changeArray" no-data-text="Chưa có lịch sử thay đổi thuộc tính này">
                        <template v-slot:items="props">
                            <td>{{ actionLog.title }}</td>
                            <td v-if="actionLog.title == 'Thời gian hoạt động gần nhất' || actionLog.title == 'Thời gian liên lạc gần nhất'">{{ coverTimeTooltip(props.item.newValue + '+0000') }}</td>
                            <td v-else>{{ props.item.newValue }}</td>
                            <td>{{ coverTimeTooltip(props.item.created_at) }}</td>
                            <td>{{ props.item.createdBy }}</td>
                        </template>
                    </v-data-table>
                </v-card-text>
                <v-divider :divider="divider"></v-divider>
                <v-card-actions>
                    <v-btn flat color="red" @click="actionLog.dialog = false">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="failDialog" @click:outside="failDialog = false" transition="dialog-bottom-transition" scrollable width="30%" >
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Thất bại</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Đã có lỗi xảy ra khi lấy thông tin chi tiết của Lead. Xin hãy thử lại.
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="failDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="actionLog.failDialog" width="60%" persistent>
            <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff" >
                    <span class="headline">Lịch sử thay đổi {{actionLog.title}}</span>
                </v-card-title>
                <v-card-text class>
                    <v-data-table :headers="actionLog.headers" :items="actionLog.failArray" no-data-text="Chưa có lịch sử thay đổi thuộc tính này">
                        <template v-slot:items="props">
                            <td>{{ actionLog.title }}</td>
                            <td>{{ props.item.newValue }}</td>
                            <td>{{ coverTimeTooltip(props.item.created_at) }}</td>
                            <td>{{ props.item.createdBy }}</td>
                        </template>
                    </v-data-table>
                </v-card-text>
                <v-divider :divider="divider"></v-divider>
                <v-card-actions>
                    <v-btn flat color="red" @click="actionLog.failDialog = false">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="changeContactOwner.dialog" width="30%" persistent>
            <v-card>
                <v-card-title style="background-color: #1E88E5; color:#fff" >
                    <span class="headline">Thay đổi tài khoản sở hữu</span>
                </v-card-title>
                <v-card-text class>
                    Bạn có chắc chắn muốn chuyển Lead này sang cho tài khoản {{changeContactOwner.value}} quản lý? 
                    <br>
                    <br>
                    <p style="font-Weight: bold">
                        Lưu ý: 
                        <br>
                        - Không thể tiếp tục xem Lead này nếu không có quyền Xem tất cả
                        <br>
                        - Không thể tiếp tục thao tác trên Lead này nếu không có quyền Chỉnh sửa tất cả
                    </p>
                    
                </v-card-text>
                <v-divider :divider="divider"></v-divider>
                <v-card-actions>
                    <!-- <v-btn flat color="primary" @click="updateContactDetail('contactOwner', changeContactOwner.value), changeContactOwner.dialog = false, updateLastActivityDate(), access = false">Chuyển</v-btn> -->
                    <v-btn flat color="primary" @click="updateContactOwner()">Chuyển</v-btn>
                    <v-btn flat color="red" @click="items[2].value = currentUser.username, changeContactOwner.dialog = false">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
    import newSMS from '../components/creates/createSMS'
    import contact from '../../services/contacts.service'
    import moment from 'moment'
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
            actionLog: {
                failDialog: false,
                dialog: false,
                changeArray: [],
                failArray: [],
                headers: [{
                    text: 'THUỘC TÍNH',
                    align: 'left',
                    value: 'property'
                    },
                    {
                    text: 'GIÁ TRỊ',
                    align: 'left',
                    value: 'changedTo'
                    },
                    {
                    text: 'THỜI ĐIỂM THAY ĐỔI',
                    align: 'left',
                    value: 'timeChanged'
                    },
                    {
                    text: 'NGƯỜI THAY ĐỔI',
                    align: 'left',
                    value: 'userChanged'
                    },
                ],
                title: ''
            },
            lifecycleStages: [
                'Lead',
                'Subscriber',
                'Marketing Qualified Lead',
                'Sales Qualified Lead',
                'Opportunity',
                'Customer',
                'Evangelist',
                'Other'
            ],
            allLeadStatus: [
                'New', 'Open', 'In Progress', 'Open Deal', 'Unqualified', 'Attempted to Contact', 'Connected', 'Bad Timing'
            ],
            cities: ['An Giang', 'Bà Rịa - Vũng Tàu', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Bình Định', 'Bạc Liêu', 'Bắc Giang', 'Bắc Kạn', 'Bắc Ninh',
                'Bến Tre', 'Cao Bằng', 'Cà Mau', 'Cần Thơ', 'Hà Giang', 'Hà Nam', 'Hà Nội', 'Hà Tĩnh', ' Hòa Bình', 'Hưng Yên', 'Hải Dương', 'Hải Phòng', 'Hậu Giang',
                'Hồ Chí Minh', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Long An', 'Lào Cai', 'Lâm Đồng', 'Lạng Sơn', 'Nam Định', 'Nghệ An', 'Ninh Bình', 'Ninh Thuận',
                'Phú Thọ', 'Phú Yên', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Thanh Hóa', 'Thái Bình', 'Thái Nguyên', 'Thừa Thiên Huế',
                'Tiền Giang', 'Trà Vinh', 'Tuyên Quang', 'Tây Ninh', 'Gia Lai', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái', 'Điện Biên', 'Đà Nẵng', 'Đắk Lắk', 'Đắk Nông', 'Đồng Nai', 'Đồng Tháp'
            ],
            allBussiness: ['Giáo dục (Trường ĐH, cao đẳng, TT ngoại ngữ', 'Đồ gia dụng (Điện tử, điện lạnh, đồ dùng bếp...)', 'Dịch vụ (Pháp lí, kế toán, sửa chữa...)', 'Bất động sản',
                'Nội thất', 'Thương mại điện tử', 'Mỹ phẩm', 'Du học/ Định cư', 'Làm đẹp (Spa, salon, thẩm mỹ viện,...)', 'Thời trang (Quần áo, giày dép, túi xách...)',
                'Chăn ga gối đệm', 'Hàng tiêu dùng', 'Xây dựng (Thi công, thiết kế, nội thất)', 'Sức khỏe (Dược, phòng khám, bệnh viện, thiết bị y tế...)', 'Du lịch', 'Phần mềm',
                'Bảo hiểm', 'Thiết bị chiếu sáng (Đèn trần, đèn led,...)', 'Tài chính', 'Nông, Lâm, Thủy sản', 'Khác'],
            divider: true,
            dialog: false,
            createNote: false,
            createEmail: false,
            createTask: false,
            createMeet: false,
            createLogCall: false,
            createLogEmail: false,
            createLogMeet: false,
            createSMS: false,
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
            detail: {
                "contactId": "",
                "accountId": "",
                "teamId": null,
                "email": "",
                "firstName": "",
                "lastName": "",
                "phone": "",
                "contactOwner": "",
                "lifecycleStage": "",
                "leadStatus": null,
                "city": "",
                "bussiness": "",
                "lastActivityDate": null,
                "lastContacted": null,
                "sourceFromMar": null,
                "createdAt": "",
                "updateAt": "",
                "createdBy": "",
                "updateBy": "",
                "customValue": {}
            },
            expandDetail: [true],
            basicInfoDialog: false,
            basicInfoValid: true,
            allEmail: [],
            failDialog: false,
            access: false,
            canSendSMS: false,
            currentUser: null,
            validPhone: true,
            validEmail: true,
            emailRules: [
                v => !!v || 'Chưa nhập E-mail',
                v => /.+@.+/.test(v) || 'E-mail không đúng định dạng',
            ],
            phoneRules: [
                v => !!v || 'Chưa nhập số điện thoại',
                // v => v.length > 2 || 'Tối thiểu 3 kí tự',
                // v => /^\d{1,}$/.test(v) || 'Không đúng cú pháp'
                v => /^[0-9\+]{3,15}$/.test(v) || 'Chỉ được nhập số, từ 3 - 15 kí tự, (có thể bắt đầu bằng dấu +) '
            ],
            changeContactOwner: {
                dialog: false,
                value: ''
            }
        }),
        methods:{
            updateEmail(){
                eventBus.updateEmail();
            },
            updatePhone(){
                eventBus.updatePhone();
            },
            getAllEmail(){
                this.allEmail = [];
                contact.getAllEmail(this.idAccount).then(result => {
                    result.response.filter(e => {
                        const obj = {
                            text: e.name + ' (' + e.email + ')',
                            value: e.email,
                            name: e.name
                        }
                        this.allEmail.push(obj);
                    });
                })
            },
            getActionLog(property, title){
                this.actionLog.title = title;
                let params = {
                    objectName: "Contact",
                    objectId: this.idContact,
                    property: property
                }
                console.log(params)
                contact.getActionLog(this.idAccount, params).then(result => {
                    console.log(result);
                    this.actionLog.changeArray = result.response.Detail.reverse();
                    this.actionLog.dialog = true;
                }).catch(error => {
                    console.log(error);
                    this.actionLog.failDialog = true;
                })
            },
            coverTimeTooltip(time){
                if (_.isNull(time)) return '';
                return moment(time).format('DD/MM/YYYY, HH:mm:ss')
            },
            getDetail(){
                contact.getdetailContact(this.idAccount,this.idContact).then(result =>{
                    this.detail = result.response
                    // console.log(this.detail)
                    this.items = [{
                            title: 'Vòng đời',
                            description: 'The qualification of contacts to sales readiness. It can be set through imports, forms, workflows, and manually on a per contact basis.',
                            value: result.response.lifecycleStage,
                            dialog: false,
                            property: 'lifecycleStage'
                        },
                        {
                            title: 'Trạng thái',
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
                            value: this.coverTimeTooltip(result.response.lastActivityDate),
                            dialog: false,
                            property: 'lastActivityDate'
                        },
                        {
                            title: 'Thời gian liên lạc gần nhất',
                            description: 'The last time a call, email, or meeting was logged for a contact. This is set automatically by HubSpot based on user actions in the contact record.',
                            value: this.coverTimeTooltip(result.response.lastContacted),
                            dialog: false,
                            property: 'lastContacted'
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
                }).catch(error => {
                    this.failDialog = true;
                    console.log(error);
                }).finally(() => {
                    this.getCurrentUser()
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
                console.log(body)
                contact.updateContactDetail(this.idAccount, this.idContact, body).then(result => {
                    console.log(result);
                    
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                    this.updateLastActivityDate();
                })
            },
            updateContactDetailWithCondition(property, value, valid){
                if (valid){
                    this.updateContactDetail(property, value);
                }
                if (property == 'email'){
                    this.updateEmail();
                }
                else if (property == 'phone'){
                    this.updatePhone();
                }
                
                
            },
            confirmUpdateContactOwner(property, value){
                let role = this.currentUser.authorities;
                this.changeContactOwner.value = value;
                this.changeContactOwner.dialog = true;
                // for (let i = 0; i < role.length;i++){
                //     if (role[i] == 'ROLE_CONTACT_EDIT_EVERYTHING'){
                //         this.updateContactDetail(property, value)
                //     }
                //     if(role[i] == 'ROLE_CONTACT_EDIT_OWNEDONLY'){
                //         this.changeContactOwner.value = value;
                //         this.changeContactOwner.dialog = true;
                //     }
                // }
            },
            updateContactOwner(){
                let viewRole = '';
                let contactRole = '';
                let role = this.currentUser.authorities;
                for (let i = 0; i < role.length; i++){
                    if (role[i].includes('VIEW')){
                        viewRole = role[i];
                    }
                    else if (role[i].includes('CONTACT_EDIT')){
                        contactRole = role[i];
                    }
                }
                
                if (viewRole.includes('OWNEDONLY')){
                    // this.updateContactDetail('contactOwner', changeC)
                    let body = {
                        properties: [
                            {
                                property: 'contactOwner',
                                value: this.changeContactOwner.value
                            }
                        ]
                    }
                    this.updateLastActivityDate();
                    contact.updateContactDetail(this.idAccount, this.idContact, body).then(result => {
                        console.log(result);
                    }).catch(error => {
                        console.log(error);
                    }).finally(() => {
                        this.$router.go(-1);
                    })
                }
                else {
                    console.log('done')
                    console.log(contactRole)
                    if (contactRole.includes('EVERYTHING')){
                        let body = {
                            properties: [
                                {
                                    property: 'contactOwner',
                                    value: this.changeContactOwner.value
                                }
                            ]
                        }
                        
                        contact.updateContactDetail(this.idAccount, this.idContact, body).then(result => {
                            console.log(result);
                        }).catch(error => {
                            console.log(error);
                        }).finally(() => {
                            this.updateLastActivityDate();
                            this.changeContactOwner.dialog = false;
                        })
                    }
                    else if (contactRole.includes('OWNEDONLY')){
                        let body = {
                            properties: [
                                {
                                    property: 'contactOwner',
                                    value: this.changeContactOwner.value
                                }
                            ]
                        }
                        
                        contact.updateContactDetail(this.idAccount, this.idContact, body).then(result => {
                            console.log(result);
                        }).catch(error => {
                            console.log(error);
                        }).finally(() => {
                            this.updateLastActivityDate();
                            this.access = false;
                            this.changeContactOwner.dialog = false;
                        })
                    }
                }
            },
            updateLastActivityDate(){
                let timeToSend = moment().utc().format().substring(0, 19)
                let body = {
                    properties: [
                        {
                            property: 'lastActivityDate',
                            value: timeToSend
                        }
                    ]
                }
                contact.updateContactDetail(this.idAccount, this.idContact, body).then(result => {
                    console.log(result);
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                    this.getDetail();
                })
            },
            updateLastContacted(){
                let timeToSend = moment().utc().format().substring(0, 19)
                let body = {
                    properties: [
                        {
                            property: 'lastContacted',
                            value: timeToSend
                        }
                    ]
                }
                contact.updateContactDetail(this.idAccount, this.idContact, body).then(result => {
                    console.log(result);
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                    this.getDetail();
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
                }).finally(() => {
                    this.updateLastActivityDate();
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
                        if (this.detail.contactOwner == this.currentUser.username){
                            this.access = true;
                        }
                    }
                    if (role[i] == 'ROLE_SYSADMIN_SYSADMIN_ACCEPT' || role[i] == 'ROLE_CONTACT_COMMUNICATE_EVERYTHING'){
                        this.canSendSMS = true;
                    }
                }
            }
        },
        created(){
            this.getDetail();
            this.getAllEmail();
            this.$store.state.colorNumber = 0;
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
            newSMS
        }
    }
    // đã làm được phần lấy list thuộc tính
    // chuyển dc trang lấy dc các thông tin cần thiết
    // thêm được contact mới
</script>