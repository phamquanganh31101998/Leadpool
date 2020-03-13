<template>
    <v-card-text>
        <v-layout row wrap>
            <span class="mt-4"><strong>Đến: </strong></span>
            <span class="ml-4"><v-text-field readonly v-model="to"></v-text-field></span>
        </v-layout>
        <v-divider :divider="divider"></v-divider>
        <v-layout row weap>
            <v-flex xs2 sm2 md2 lg2 xl2>
                <span class="mt-4"><strong> </strong></span>
                <span class="ml-4"><v-select label="Chọn nội dung" :items="smsTypes" v-model="smsType"></v-select></span>
            </v-flex>
            <v-flex offset-xs1 offset-sm1 offset-md1 offset-lg1 offset-xl1 xs5 sm5 md5 lg5 xl5>
                <span class="mt-4"><strong> </strong></span>
                <span class="ml-4"><v-select label="Chọn chiến dịch" :items="allDeviceKey" v-model="deviceKey"></v-select></span>
            </v-flex>
            <v-flex offset-xs1 offset-sm1 offset-md1 offset-lg1 offset-xl1 xs3 sm3 md3 lg3 xl3 v-if="smsType=='template'">
                <span class="mt-4"><strong> </strong></span>
                <span class="ml-4"><v-select label="Chọn mẫu tin nhắn" :items="allTemplates" v-model="content"></v-select></span>
            </v-flex>
            
        </v-layout>
        <v-divider :divider="divider"></v-divider>
        <v-layout row wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <br>
                <span class="mt-4"><strong>Nội dung tin nhắn (Không dấu)</strong></span>
                <br>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-textarea label="Nội dung" rows="4" readonly v-if="smsType=='template'" box v-model="content"></v-textarea>
                <template v-else>
                    <v-layout>
                        <v-flex xs5 sm5 md5 lg5 xl5>
                            <v-textarea label="Nhập nội dung tin nhắn tại đây" rows="6" counter="160"
                                filled v-model="content" maxlength="160"
                            ></v-textarea>
                        </v-flex>
                        <v-flex xs5 sm5 md5 lg5 xl5 offset-xs1 offset-sm1 offset-md1 offset-xl1 offset-lg1>
                            <v-textarea label="Nội dung hiển thị phía người nhận" rows="6" counter="160"
                                readonly
                                filled :value="normalText(content)" maxlength="160"
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                    
                    
                    <v-alert
                        :value="content.length > 160"
                        type="error"
                        >
                        Độ dài tin nhắn phải nhỏ hơn 160 kí tự.
                    </v-alert>
                </template>
                
            </v-flex>
            
        </v-layout>
        <v-layout wrap>
            <v-btn color="blue darken-1" small flat
                @click="sendSMS()">Gửi</v-btn>
            <v-btn color="red" small flat
                @click="closeSendSMSDialog()">Đóng</v-btn>
        </v-layout>
        <v-dialog v-model="successfulDialog" @click:outside="successfulDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="#00C853">
                    <v-toolbar-title>Thành công</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Gửi tin nhắn SMS thành công
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
                    Đã có lỗi xảy ra khi gửi tin nhắn. Xin hãy thử lại.
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
import contactsService from '../../../services/contacts.service'
import smsService from '../../../services/sms.service'
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
        },
        currentContact: {
            type: Object,
            default: null
        }
    },
    
    data(){
        return {
            divider: true,
            smsTypes: [
                {
                    text: 'Thường',
                    value: 'normal'
                },
                {
                    text: 'Theo mẫu',
                    value: 'template'
                }
            ],
            smsType: 'normal',
            content: '',
            to: '',
            allTemplates: [],
            allDeviceKey: [],
            deviceKey: '',
            // currentContact: null,
            waiting: false,
            successfulDialog: false,
            failDialog: false,
            currentUser: null,
            canSendSMS: false,
        }
    },
    watch: {
        currentContact(){
            if(this.currentContact != null){
                this.to = this.currentContact.phone;
                this.getCurrentUser();
            }
        },
        smsType(){
            if(this.smsType == 'normal'){
                this.content = '';
            }
            else {
                this.content = this.allTemplates[0].value;
            }
        }
    },
    methods: {
        normalText(str){
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
        },
        getCurrentContact(){
            contactsService.getdetailContact(this.idAccount, this.idContact).then(result => {
                this.currentContact = result.response;
                this.to = this.currentContact.phone;
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.getCurrentUser();
            })
        },
        closeSendSMSDialog(){
            this.$emit('closeSendSMSDialog');
        },
        getAllDeviceKey(){
            this.allDeviceKey = [];
            smsService.getListDeviceKey(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let res = result.response.reverse();
                    for (let i = 0; i < res.length;i++){
                        let name = '';
                        if (res[i].campaign == null){
                            name = '*chiến dịch không có tên*' + ' (' + res[i].name + ')'
                        }
                        else{
                            name = res[i].campaign + ' (' + res[i].name + ')'
                        }
                        let obj = {
                            text: name,
                            value: res[i].smsDeviceId
                        }
                        this.allDeviceKey.push(obj);
                    }
                    this.deviceKey = this.allDeviceKey[0].value;
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
            }).catch(error => {
                console.log(error);
            })
        },
        getAllTemplates(){
            this.allTemplates = [];
            smsService.getTemplate(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let res = result.response.reverse();
                    for (let i = 0; i < res.length;i++){
                        let obj = {
                            text: res[i].name,
                            value: res[i].content
                        }
                        this.allTemplates.push(obj);
                    }
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
                
            }).catch(error => {
                console.log(error);
            })
        },
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        sendSMS(){
            let body = {
                "phoneNumber": this.to,
                "message": this.normalText(this.content),
                "smsDeviceId": this.deviceKey
            }
            smsService.sendSMS(this.idAccount, body).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                    this.$emit('updateLastActivityDate');
                    this.$emit('updateLastContacted');
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.closeSendSMSDialog();
            })
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
            let role = this.currentUser.authorities;
            for (let i = 0; i < role.length;i++){
                if (role[i] == 'ROLE_SYSADMIN_SYSADMIN_ACCEPT' || role[i] == 'ROLE_CONTACT_COMMUNICATE_EVERYTHING'){
                    this.canSendSMS = true;
                }
            }
            if (this.canSendSMS == true){
                this.getAllTemplates()
                this.getAllDeviceKey()
            }
        }
    },
    created(){
        this.getCurrentUser();
        // this.getCurrentContact()
        eventBus.$on('updatePhone', () => {
            // this.getCurrentContact();
        })
    }
}
</script>
<style>

</style>