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
    </v-card-text>
</template>
<script>
import contactsService from '../../../services/contacts.service'
import smsService from '../../../services/sms.service'
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
            currentContact: null
        }
    },
    watch: {
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
                this.getAllTemplates()
                this.getAllDeviceKey()
            })
        },
        closeSendSMSDialog(){
            this.$emit('closeSendSMSDialog');
        },
        getAllDeviceKey(){
            this.allDeviceKey = [];
            smsService.getListDeviceKey(this.idAccount).then(result => {
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
            })
        },
        getAllTemplates(){
            this.allTemplates = [];
            smsService.getTemplate(this.idAccount).then(result => {
                let res = result.response.reverse();
                for (let i = 0; i < res.length;i++){
                    let obj = {
                        text: res[i].name,
                        value: res[i].content
                    }
                    this.allTemplates.push(obj);
                }
                
            }).catch(error => {
                console.log(error);
            })
        },
        sendSMS(){
            let body = {
                "phoneNumber": this.to,
                "message": this.normalText(this.content),
                "smsDeviceId": this.deviceKey
            }
            smsService.sendSMS(this.idAccount, body).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error);
            })
        }
    },
    created(){
        this.getCurrentContact()
    }
}
</script>
<style>

</style>