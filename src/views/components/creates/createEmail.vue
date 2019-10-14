<template>
    <v-card-text>
        <v-layout row>
            <v-flex>
                <a @click.stop="emailTemplateDialog = true">
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
        <v-layout wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-form v-model="valid">
                    <v-layout row>
                        <span class="mt-4"><strong>To</strong></span>
                        <span class="ml-4" style="width: 100%"><v-text-field v-model="to" :rules="emailRules"></v-text-field></span>
                    <!-- <v-chip v-model="chip" class="ml-4" small close>Tunt</v-chip> -->
                    
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                            <span><strong>From</strong></span>
                            <span class="ml-4">{{currentContact.lastName}} {{currentContact.firstName}} ({{currentContact.email}})</span>
                        </v-flex>
                        <!-- <v-flex class="text-xs-right">
                            <a href="#" style="text-decoration: none">Cc</a>
                            <a href="#" style="text-decoration: none" class="ml-3">Bcc</a>
                            
                            
                        </v-flex> -->
                    </v-layout>
                    <v-layout row>
                        <span class="mt-4"><strong>Type</strong></span>
                        <span class="ml-4" style="width: 50px;"><v-select :items="types" v-model="type"></v-select></span>
                    </v-layout>
                </v-form>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12 class="mt-3">
                <v-divider :divider="divider"></v-divider>
                <v-layout row>
                    <span class="mt-4"><strong>Subject</strong></span>
                    <v-text-field class="ml-4" v-model="subject" placeholder="your subject..."></v-text-field>
                </v-layout>
                <v-divider :divider="divider"></v-divider>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-textarea name="input" label="" v-model="body"></v-textarea>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-layout row>
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
                    @click="sendEmail()" :disabled="!valid">Sent</v-btn>
                <v-btn color="red" small flat
                    @click="closeCreateEmailDialog()">Cancel</v-btn>
            </v-flex>
            <v-dialog v-model="emailTemplateDialog" full-screen>
                <emailTemplate @closeEmailTemplateDialog="closeCreateEmailDialog()" :idAccount="this.idAccount" :idContact="this.idContact"/>
            </v-dialog>
        </v-layout>
    </v-card-text>
</template>
<script>
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
            }
        },
        data: () => ({
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
            currentContact: null,
            valid: false,
            emailTemplateDialog: false
        }),
        methods: {
            getCurrentContact(){
                contactsService.getdetailContact(this.idAccount, this.idContact).then(result => {
                    this.currentContact = result.response;
                })
            },
            closeCreateEmailDialog(){
                this.emailTemplateDialog = false;
                this.$emit('closeCreateEmailDialog');
            },
            sendEmail(){
                let body = {
                    "from": this.currentContact.email,
                    "to": this.to,
                    "subject": this.subject,
                    "body": this.body,
                    "type": this.type,
                }
                emailServices.sendEmail(this.idAccount, this.idContact, body).then(result => {
                    console.log(result);
                    alert('Success');
                    this.closeCreateEmailDialog();
                }).catch(error => {
                    console.log(error);
                })
            }
        },
        created(){
            this.getCurrentContact();
        }
    }
</script>