<template>
    <v-card-text>
        <v-layout row>
            <v-flex>
                <a @click.stop="emailTemplateDialog = true">
                    Gửi email theo mẫu
                </a>
            </v-flex>
            <!-- <v-flex>
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
            </v-flex> -->
        </v-layout>
        <v-layout wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-form v-model="valid">
                    <v-layout row>
                        <span class="mt-4"><strong>Đến: </strong></span>
                        <span class="ml-4" style="width: 100%"><v-text-field readonly v-model="to" :rules="emailRules"></v-text-field></span>
                        <!-- <span class="ml-4 mt-2">{{currentContact.lastName}} {{currentContact.firstName}} ({{currentContact.email}})</span> -->
                    <!-- <v-chip v-model="chip" class="ml-4" small close>Tunt</v-chip> -->
                    
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                            <span><strong>Từ: </strong></span>
                            <span class="ml-4">{{currentUser.displayName}} ({{currentUser.username}})</span>
                        </v-flex>
                        <!-- <v-flex class="text-xs-right">
                            <a href="#" style="text-decoration: none">Cc</a>
                            <a href="#" style="text-decoration: none" class="ml-3">Bcc</a>
                            
                            
                        </v-flex> -->
                    </v-layout>
                    <v-layout row>
                        <span class="mt-4"><strong>Định dạng</strong></span>
                        <span class="ml-4" style="width: 50px;"><v-select :items="types" v-model="type"></v-select></span>
                    </v-layout>
                </v-form>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12 class="mt-3">
                <v-divider :divider="divider"></v-divider>
                <v-layout row>
                    <span class="mt-4"><strong>Chủ đề</strong></span>
                    <v-text-field class="ml-4" v-model="subject" label="chủ đề..."></v-text-field>
                </v-layout>
                <v-divider :divider="divider"></v-divider>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-textarea name="input" label="Nội dung" v-model="body"></v-textarea>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-layout row>
                    <!-- <v-btn flat icon small color="green">
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
                    </v-btn> -->
                    <!-- <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
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
                    </v-menu> -->
                </v-layout>
            </v-flex>
            <v-divider :divider="divider"></v-divider>
            <v-flex>
                <v-btn color="blue darken-1" small flat
                    @click="sendEmail()" :disabled="!valid || waiting">Gửi</v-btn>
                <v-btn color="red" small flat
                    @click="closeCreateEmailDialog()">Đóng</v-btn>
            </v-flex>
            <v-dialog v-model="emailTemplateDialog" width="90%">
                <emailTemplate :currentContact="this.currentContact" @updateLastContacted="updateLastContacted()" @updateLastActivityDate="updateLastActivityDate()" @closeEmailTemplateDialog="closeCreateEmailDialog()" :idAccount="this.idAccount" :idContact="this.idContact"/>
            </v-dialog>
        </v-layout>
        <v-dialog v-model="successfulDialog" @click:outside="successfulDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="#00C853">
                    <v-toolbar-title>Thành công</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Gửi email thành công
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
                    Đã có lỗi xảy ra khi gửi email. Xin hãy thử lại.
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="failDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card-text>
</template>
<script>
    import moment from 'moment'
    import {eventBus} from '../../../eventBus'
    import emailServices from '../../../services/email.service'
    import contactsService from '../../../services/contacts.service'
    import emailTemplate from './EmailTemplate'
    export default {
        components: {
            emailTemplate
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
        data: () => ({
            waiting: false,
            emailRules: [
                v => !!v || 'Chưa nhập E-mail',
                v => /.+@.+/.test(v) || 'E-mail không đúng định dạng',
            ],
            input: 'demo',
            divider: true,
            chip: true,
            to: '',
            types: ['text', 'html'],
            type: 'text',
            subject: '',
            body: '',
            // currentContact: null,
            valid: false,
            emailTemplateDialog: false,
            currentUser: null,
            successfulDialog: false,
            failDialog: false
        }),
        watch: {
            currentContact(){
                if(this.currentContact != null){
                    this.to = this.currentContact.email;
                    // this.getCurrentUser();
                }
            },
        },
        methods: {
            getCurrentContact(){
                contactsService.getdetailContact(this.idAccount, this.idContact).then(result => {
                    this.currentContact = result.response;
                    this.to = this.currentContact.email;
                }).catch(error => {
                    console.log(error);
                })
            },
            closeCreateEmailDialog(){
                this.emailTemplateDialog = false;
                this.$emit('closeCreateEmailDialog');
            },
            updateLastActivityDate(){
                this.$emit('updateLastActivityDate');
            },
            updateLastContacted(){
                this.$emit('updateLastContacted');
            },
            coverTimeDetail(time){
                if (_.isNull(time)) return '';
                return moment(time).format('HH:mm:ss, DD/MM/YYYY')
            },
            sendEmail(){
                let body = {
                    "from": this.currentUser.username,
                    "to": this.to,
                    "subject": this.subject,
                    "body": this.body,
                    "type": this.type,
                }
                this.waiting = true;
                emailServices.sendEmail(this.idAccount, this.idContact, body).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    let time = moment();
                    if(result.code == 'SUCCESS'){
                        dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                        
                        this.updateLastActivityDate()
                        this.updateLastContacted();
                        eventBus.updateEmailList();
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    }
                    this.waiting = false;
                    this.closeCreateEmailDialog();
                    // this.successfulDialog = true;
                    
                }).catch(error => {
                    // this.failDialog = true;
                    console.log(error);
                    this.waiting = false;
                    this.closeCreateEmailDialog();
                })
            },
            getCurrentUser(){
                this.currentUser = JSON.parse(localStorage.getItem('user'));
            }
        },
        created(){
            // this.getCurrentContact();
            this.getCurrentUser();
            eventBus.$on('updateEmail', () => {
                // this.getCurrentContact();
            })
        }
    }
</script>