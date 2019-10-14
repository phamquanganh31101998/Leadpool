<template>
    <v-card v-if="!createEmailTemplate.dialog">
        <v-card-title style="background-color:#1E88E5;color:#fff; padding: 16px;">
            <span class="headline">Send email via template</span>
        </v-card-title>
        <v-card-text style="padding: 20px">
            <v-container>
                <v-layout wrap>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-form v-model="valid">
                            <v-layout row>
                                <span class="mt-2"><strong>To</strong></span>
                                <span class="ml-4" style="width: 100%"><v-text-field v-model="to" :rules="emailRules"></v-text-field></span>
                            </v-layout>
                            <v-layout row>
                                <v-flex>
                                    <span><strong>From</strong></span>
                                    <span class="ml-4">{{currentContact.lastName}} {{currentContact.firstName}} ({{currentContact.email}})</span>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-flex>
                </v-layout>
                <br>
                <v-divider :divider="divider"></v-divider>
                <br>
                <v-layout>
                    <v-flex>
                        <v-layout row>
                            <span class="mt-2"><strong>Subject</strong></span>
                            <v-text-field class="ml-4" v-model="subject" placeholder="your subject..."></v-text-field>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs5 sm5 md5 lg5 xl5>
                        <span class="mt-2"><strong>Choose Template</strong></span>
                        <span class="ml-4" style="width: 50px;"><v-select :items="templateSelect" v-model="templateId" @input="setChosenTemplate()"></v-select></span>
                    </v-flex>
                    <v-flex xs7 sm7 md7 lg7 xl7>
                        <span><a @click.stop="createNewTemplateSection()">Create new template</a></span>
                    </v-flex>
                    
                </v-layout>
                <br>
                <v-divider :divider="divider"></v-divider>
                <br>
                <v-divider :divider="divider"></v-divider>
                <v-layout row wrap>
                    <div id="templateBody"></div>
                </v-layout>
                <!-- <v-layout>
                    <v-flex>
                        <v-textarea v-model="htmlText"  label="Write your html here">

                        </v-textarea>
                        <v-btn @click="clickTranslate()">Translate</v-btn>
                    </v-flex>
                    <v-flex>
                        <div id="call"></div>
                    </v-flex>
                </v-layout> -->
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-btn flat color="green" @click="sendEmailViaTemplate(idAccount, templateId, currentContact.email, to, subject)" :disabled="disableSendButton">Send</v-btn>
            <v-btn flat color="red" @click="closeEmailTemplateDialog()">Cancel</v-btn>
        </v-card-actions>
    </v-card>
    <v-card v-else>
        <v-card-title style="background-color:#1E88E5;color:#fff; padding: 16px;">
            <span class="headline">Create template</span>
        </v-card-title>
        <v-card-text style="padding: 20px">
            <v-container>
                <v-layout>
                    <v-flex>
                        <v-text-field v-model="createEmailTemplate.title" label="Template name" placeholder="name here..."></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md6 lg6 xl6>
                        <v-textarea v-model="createEmailTemplate.htmlText" rows="27">

                        </v-textarea>
                        <v-btn @click="clickTranslate()">Translate</v-btn>
                    </v-flex>
                    <v-flex xs12 sm12 md6 lg6 xl6>
                        <div id="call"></div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-btn flat color="green" @click="createTemplate()">Send</v-btn>
            <v-btn flat color="red" @click="createEmailTemplate.dialog = false">Back</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
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
        templateId(){
            
        }
    },
    data(){
        return{
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
            createEmailTemplate: {
                dialog: false,
                htmlText: '',
                title: ''
            }
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
            console.log(this.htmlText.replace(regex, "\""))
            // console.log(this.htmlText)
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
            })
        },
        getEmailTemplate(){
            emailServices.getEmailTemplate(this.idAccount).then(result => {
                
                this.templates = result.response;
                console.log(this.templates);
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
        sendEmailViaTemplate(idAccount, templateId, from, to, subject){
            let body = {
                from: from, 
                to: to, 
                subject: subject
            }

            emailServices.sendEmailViaTemplate(idAccount, templateId, body).then(result => {
                console.log(result)
            }).catch(error => {
                console.log(error);
            })
        },
        createTemplate(){
            var regex = /\"/gi;
            // console.log(this.createEmailTemplate.htmlText.replace(regex, "\\\""));
            let content = this.createEmailTemplate.htmlText.replace(regex, "\\\"");
            // console.log(content);
            let body = {
                title: this.createEmailTemplate.title,
                content: content,
                status: "draft"
            }
            emailServices.createEmailTemplate(this.idAccount, body).then(result => {
                this.getEmailTemplate();
                this.createEmailTemplate.dialog = false;
            })
        }
    },
    created(){
        this.getCurrentContact();
        this.getEmailTemplate();
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
</style>