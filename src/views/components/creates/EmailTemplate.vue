<template>
    <v-card v-if="!createEmailTemplate.dialog">
        <v-card-title style="background-color:#1E88E5;color:#fff; padding: 16px;">
            <span class="headline">Gửi email theo mẫu</span>
        </v-card-title>
        <v-card-text style="padding: 20px">
            <v-layout row wrap >
                <v-flex xs12 sm12 md3 lg3 xl3> 
                    <v-form v-model="valid">
                        <v-layout row>
                            <span class="mt-2"><strong>Đến</strong></span>
                            <!-- <span class="ml-4 mt-2">{{currentContact.lastName}} {{currentContact.firstName}} ({{currentContact.email}})</span> -->
                            <span class="ml-4" style="width: 100%"><v-text-field readonly v-model="to" :rules="emailRules"></v-text-field></span>
                        </v-layout>
                        <br>
                        <v-layout row>
                            <v-flex>
                                <span><strong>Từ</strong></span>
                                <span class="ml-4">{{currentUser.displayName}} ({{currentUser.username}})</span>
                            </v-flex>
                        </v-layout>
                        <br>
                    </v-form>
                    <br>
                    <v-layout row>
                        <span class="mt-2"><strong>Chủ đề</strong></span>
                        <v-text-field class="ml-4" v-model="subject" placeholder="your subject..."></v-text-field>
                    </v-layout>
                    <br>
                    <v-divider :divider="divider"></v-divider>
                    <br>
                    <span class="mt-2"><strong>Chọn mẫu</strong></span>
                    <span class="ml-4" ><v-select :items="templateSelect" v-model="templateId" @input="setChosenTemplate()"></v-select></span>
                    <!-- <span><a @click.stop="createNewTemplateSection()">Tạo mẫu mới</a></span> -->
                </v-flex>
                <v-flex xs12 sm12 md9 lg9 xl9> 
                    <h4 class="pl-3">Mẫu email</h4>
                    <div id="templateBody" style="width: 100%; overflow-y: scroll; height: 500px; margin: 10px; border: 1px solid #DDDDDD"></div>
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-card-actions>
            <v-btn flat color="green" @click="sendEmailViaTemplate(idAccount, idContact, templateId)" :disabled="disableSendButton || waiting">Gửi</v-btn>
            <v-btn flat color="red" @click="closeEmailTemplateDialog()">Đóng</v-btn>
        </v-card-actions>
    </v-card>
    <v-card v-else width="100%">
        <v-card-title style="background-color:#1E88E5;color:#fff; padding: 16px;">
            <span class="headline">Tạo mẫu email</span>
        </v-card-title>
        <v-card-text style="padding: 20px; width: 100%" width="100%">
            <br>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md2 lg2 xl2>
                        <h3>Tên mẫu</h3>
                        <v-text-field v-model="createEmailTemplate.title" placeholder="name here..." ></v-text-field>
                        <br>
                        <br>
                        <h4>Thêm thuộc tính của liên lạc: chọn rồi copy đoạn text sang ô tạo mẫu bên cạnh</h4>
                        <br>
                        <v-select style="width: 100%" box label="Thuộc tính" :items="createEmailTemplate.properties" v-model="createEmailTemplate.property"></v-select>
                        <v-text-field readonly solo v-model="createEmailTemplate.property"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md4 lg4 xl4>
                        <h3 style="padding-right: 10px;">Tạo mẫu email tại đây, nhấn Kết quả để xem</h3>
                        <v-textarea autofocus v-model="createEmailTemplate.htmlText" rows="22" box style="margin: 10px;">
                        </v-textarea>
                        <v-btn @click="clickTranslate()" block color="success" class="mr-2 ml-2">Kết quả</v-btn>
                    </v-flex>
                    <v-flex xs12 sm12 md6 lg6 xl6>
                        <div id="call"></div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-btn flat color="green" @click="createTemplate()" :disabled="!createEmailTemplate.button">Tạo mẫu</v-btn>
            <v-btn flat color="red" @click="createEmailTemplate.dialog = false">Quay lại</v-btn>
        </v-card-actions>
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
    </v-card>
</template>
<script>
import {eventBus} from '../../../eventBus'
import emailServices from '../../../services/email.service'
import contactsService from '../../../services/contacts.service'
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
    computed: {
        disableSendButton(){
            if(this.templateId == '' || this.valid == false){
                return true;
            }
            else{
                return false;
            }
        }
    },
    watch: {
        'createEmailTemplate.title'(){
            if(this.createEmailTemplate.title == ''){
                this.createEmailTemplate.button = false
            }
            else{
                this.createEmailTemplate.button = true
            }
        }
    },
    data(){
        return{
            waiting: false,
            successfulDialog: false,
            failDialog: false,
            first: null,
            iframe: null,
            btn: null,
            htmlText: '',
            currentContact: null,
            to: '',
            emailRules: [
                v => !!v || 'Chưa nhập E-mail',
                v => /.+@.+/.test(v) || 'E-mail không đúng định dạng',
            ],
            divider: true,
            valid: false,
            subject: '',
            templates: [],
            templateSelect: [],
            templateId: '',
            chosenTemplate: null,
            htmlText: '',
            currentUser: null,
            createEmailTemplate: {
                dialog: false,
                htmlText: '',
                title: '',
                properties: [
                    {
                        text: 'Họ',
                        value: '{{Contacts.firstName}}',
                    },
                    {
                        text: 'Tên',
                        value: '{{Contacts.lastName}}',
                    },
                    {
                        text: 'Email',
                        value: '{{Contacts.email}}',
                    },
                    {
                        text: 'Số điện thoại',
                        value: '{{Contacts.phone}}',
                    },
                    {
                        text: 'Tài khoản sở hữu',
                        value: '{{Contacts.contactOwner}}',
                    },
                    {
                        text: 'Lifecycle Stage',
                        value: '{{Contacts.lifecycleStage}}',
                    },
                    {
                        text: 'Lead Status',
                        value: '{{Contacts.leadStatus}}',
                    },
                    {
                        text: 'Thành phố',
                        value: '{{Contacts.city}}',
                    },
                    {
                        text: 'Ngành nghề',
                        value: '{{Contacts.bussiness}}',
                    }
                ],
                property: '',
                button: false
            },
        }
    },
    methods: {
        createNewTemplateSection(){
            document.getElementById("templateBody").innerHTML = '';
            this.createEmailTemplate.dialog = true
        },
        setChosenTemplate(){
            let obj = null;
            for (let i = 0; i < this.templates.length; i++){
                if(this.templates[i].emailTemplateId == this.templateId){
                    this.chosenTemplate = this.templates[i];
                }
            }
            let regex = /\\\"/gi
            this.htmlText = this.chosenTemplate.content;
            console.log(this.htmlText)
            document.getElementById("templateBody").innerHTML = this.htmlText.replace(regex, "\"");

            document.getElementById("call").innerHTML = '';
        },
        logging(){
            console.log(this.templates)
            console.log(this.templateId)
            console.log(this.chosenTemplate);
        },
        clickTranslate(){
            try {
                document.getElementById("call").innerHTML = this.createEmailTemplate.htmlText;
            } catch (error) {
                console.log(error)
            }
        },
        closeEmailTemplateDialog(){
            this.$emit('closeEmailTemplateDialog');
        },
        getCurrentContact(){
            contactsService.getdetailContact(this.idAccount, this.idContact).then(result => {
                this.currentContact = result.response;
                this.to = this.currentContact.email;
            })
        },
        getEmailTemplate(){
            emailServices.getEmailTemplate(this.idAccount).then(result => {
                this.templates = result.response;
                this.templateSelect = [];
                this.templateSelect = this.setSelectEmailTemplate(this.templates);
            })
        },
        setSelectEmailTemplate(templateArray){
            let result = [];
            for (let i = 0; i < templateArray.length;i++){
                const obj = {
                    text: templateArray[i].title,
                    value: templateArray[i].emailTemplateId
                }
                result.push(obj);
            }
            return result;
        },
        sendEmailViaTemplate(idAccount, idContact, templateId){
            let body = {
                from: this.currentUser.username, 
                to: this.to, 
                subject: this.subject
            }
            this.waiting = true;
            console.log(body)
            emailServices.sendEmailViaTemplate(idAccount, idContact, templateId, body).then(result => {
                console.log(result);
                this.successfulDialog = true;
                this.waiting = false;
                this.$emit('updateLastActivityDate');
                this.$emit('updateLastContacted');
                eventBus.updateEmailList();
                this.closeEmailTemplateDialog();
            }).catch(error => {
                this.failDialog = true;
                this.closeEmailTemplateDialog();
                console.log(error);
                this.waiting = false;
            })
        },
        createTemplate(){
            var regex = /\"/gi;
            // console.log(this.createEmailTemplate.htmlText.replace(regex, "\\\""));
            // let content = this.createEmailTemplate.htmlText.replace(regex, "\\\"");
            let content = this.createEmailTemplate.htmlText;
            console.log(content);
            let body = {
                title: this.createEmailTemplate.title,
                content: content,
                status: "draft"
            }
            emailServices.createEmailTemplate(this.idAccount, body).then(result => {
                this.getEmailTemplate();
                this.createEmailTemplate.dialog = false;
            }).catch(error => {
                console.log(error);
            })
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
        }
    },
    created(){
        this.getCurrentContact();
        this.getEmailTemplate();
        this.getCurrentUser();
        eventBus.$on('updateEmail', () => {
            this.getCurrentContact();
        })
    }
}
</script>
<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}


.btn {
  poistion:fixed;
  right:0;
   padding: 0.4rem;
  width: 4rem;
  background: rgb(0, 0, 0);
  color: gold;
  font-size: 1rem;
  outline:none;
  cursor:pointer;
   height:90vh;
}
.btn:hover{
   color:white;
   background: blue;
}


.main-editor {
  background: rgba(0, 0, 0, 0.91);
  display: flex;
  width: 100%;
  padding: 1rem;
  box-shadow:0 2px 3px black;
  position:fixed;
  height:100vh;
   justify-content: center;
    align-items: center;
  border: 7px solid #36383f;
}

.first {
  background-color: #ffffff;
  width: 50%;
  overflow-x: hidden;
  overflow-y: auto;
  white-space: pre;
  box-shadow: 0 1px 1px rgb(22, 22, 22);
  outline: none;
  padding: 0.4rem;
  height: 90vh;
}

.second {
  background-color: rgb(255, 255, 255);
  width: 50%;
  overflow-y: auto;
  white-space: pre;
  right: 0;
  box-shadow: 0 1px 1px rgb(22, 22, 22);
  padding: 0.4rem;
  height: 90vh;
}

#call{
    border: 1px solid #CCCCCC;
    margin: 30px;
    height: 430px;
    width: 100%;
    overflow-y: scroll
}
</style>