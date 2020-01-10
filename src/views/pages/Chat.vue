<template>
    <v-content class="mt-4 pl-3 pr-3">
        <v-dialog
            v-model="dialog"
            hide-overlay
            persistent
            width="300"
            >
                <v-card
                color="primary"
                dark
                >
                <v-card-text >
                    <p class="pt-1">{{dialogMessage}}</p>
                    <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <h1 class="ml-3"> Chat</h1>
            </v-flex>
            <v-flex xs12 sm12 md7 lg6 xl6>
                
            </v-flex>
        </v-layout>
        <br>
        <v-divider class="mt-2" :divider="divider"></v-divider>
        <v-layout row wrap v-if="access">
            <v-flex xs3 sm3 md3 lg3 xl3>
                <div class="fullHeight">
                    <v-list two-line>
                        <template v-for="item in allTopics">
                            <v-list-tile avatar @click="getNewChatHistory(item.value)">
                                <v-list-tile-avatar>
                                    <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title>{{item.text}}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-list>
                </div>
                
            </v-flex>
            <v-flex xs9 sm9 md9 lg9 xl9>
                <div>
                    <h2>{{this.decodeStr(topic)}}</h2>
                </div>
                <div style="height: 100%">
                    <div class="stickToTop"></div>
                    <div class="messengerBox pl-3 pr-3" id="boxContainChat">
                        <template v-for="item in chatHistory">
                            <v-layout align-center justify-start row v-if="item.name != currentUser.displayName"> 
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-avatar v-on="on" :tile="tile" size="20" color="grey lighten-4">
                                            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
                                        </v-avatar>
                                        <v-chip color="grey" dark> {{item.message}} </v-chip>
                                    </template>
                                    <span>{{item.name}} - {{item.time}}</span>
                                </v-tooltip>
                                
                            </v-layout>
                            <v-layout align-center justify-end row v-else>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-chip color="blue" dark> {{item.message}}</v-chip>
                                        <v-avatar v-on="on" :tile="tile" size="20" color="grey lighten-4">
                                            <img :src="avatar" alt="">
                                        </v-avatar>
                                    </template>
                                    <span>{{item.name}} - {{item.time}}</span>
                                </v-tooltip>
                            </v-layout>
                            
                        </template>
                    </div>
                    
                    <div class="stickToBottom">
                        <v-text-field append-icon="send" @keyup.enter="sendMessage()" @click:append="sendMessage()" v-if="topic != ''" v-model="chatMess" placeholder="Nhập tin nhắn tại đây"></v-text-field>
                    </div>
                </div>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-layout style="height: 300px;">
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-card flat style="height: 300px; margin-top: 100px;" >
                            <v-card-text style="height: 300px; background-color: #FDEDEE; border: 1px solid red;">
                                <v-card flat style="background-color: #FDEDEE; vertical-align: middle">
                                    <v-card-title>
                                        <h2>Không có quyền truy cập</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        Bạn phải có quyền <span style="font-weight: bold">Xem tất cả</span> đối với Lead thì mới có thể sử dụng chức năng này.
                                        <br>
                                        Hãy liên hệ với Quản lý để được cấp quyền truy cập.
                                    </v-card-text>
                                </v-card>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-content>
</template>
<script>
import {mapGetters} from 'vuex'
import numberFormat from '../../helpers/numberformat'
import moment from 'moment'
import chatAPI from '../../services/chat.service'
import userAPI from '../../services/user.service'
export default {
    components: {
        
    },
    computed: {
        ...mapGetters({
            hasNewMessage: 'hasNewMessage',
            topicChange: 'topicChange',
            newMessage: 'newMessage'
            // ...
        })
    },
    props: {
        idAccount: {
            type: String,
            default: null,
        },
    },
    data(){
        return{
            tile: false,
            dialog: false,
            dialogMessage: '',
            chatMess: '',
            chatpage: 1,
            allChatPage: 1,
            topicPage: 1, 
            allTopicPage: 1,
            currentUser: null,
            access: true,
            divider: true,
            allTopics: [],
            topic: '',
            chatHistory: [],
            chatminiCRM: null,
            avatar: ''
            // chatminiCRMArr: []
        }
    },
    watch: {
        hasNewMessage(){
            if(this.hasNewMessage == true){
                
                if(this.topic == this.topicChange){
                    if(this.newMessage.name != this.currentUser.displayName){
                        this.chatHistory.push(this.newMessage);
                        this.$store.dispatch('alert/success', `${this.newMessage.name} đã gửi một tin nhắn mới tại cuộc trò chuyện ${this.decodeStr(this.topicChange)} (${this.coverTimeHourOnly(moment())})`)
                    }
                    
                    $('#boxContainChat').animate({
						scrollTop: $('#boxContainChat')[0].scrollHeight
					}, 0);
                }
                else {
                    this.$store.dispatch('alert/success', `${this.newMessage.name} đã gửi một tin nhắn mới tại cuộc trò chuyện ${this.decodeStr(this.topicChange)} (${this.coverTimeHourOnly(moment())})`)
                }
            }
            this.$store.dispatch('noNewMessage')
        }
    },
    methods: {
        getAvatar(){
            userAPI.getMyInfo(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    this.avatar = result.response.userAvatar;
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
            })
        },
        formatNumber(num){
            return numberFormat.number_format(num);
        },
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        coverTimeHourOnly(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss')
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
            // let role = this.currentUser.authorities;
            // if ((role.includes('ROLE_SYSADMIN_SYSADMIN_ACCEPT')) || role.includes("ROLE_CONTACT_VIEW_EVERYTHING")){
            //     this.access = true;
            // }
            if(this.access == true){
                this.getTopic()
            }
        },
        getTopic(){
            this.dialogMessage = 'Đang lấy danh sách cuộc trò chuyện...'
            this.dialog = true;
            chatAPI.getTopic(this.idAccount, this.topicPage).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let res = result.response.results;
                    for (let i = 0; i < res.length; i++){
                        let obj = {
                            text: this.decodeStr(res[i].topic),
                            value: res[i].topic,
                            status: res[i].status,
                            lastTime: this.coverTimeDetail(res[i].nearTime)
                        }
                        this.allTopics.push(obj)
                        this.chatminiCRM.child(res[i]).on('child_added', function(snapshot){
                            var message = snapshot.val();
                            dispatch('newMessage', message);
                            dispatch('topicChange', res[i]);
                            dispatch('hasNewMessage');
                        })
                    }
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.dialog = false;
                this.getAvatar()
            })
        },
        getNewChatHistory(topic){
            this.topic = topic;
            this.chatHistory = [];
            this.chatPage = 1;
            this.dialogMessage = 'Đang lấy lịch sử cuộc trò chuyện...'
            this.dialog = true;
            chatAPI.getHistory(this.idAccount, topic, this.chatPage).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let res = result.response.results.reverse();
                    for (let i = 0; i < res.length; i++){
                        let obj = {
                            name: res[i].name,
                            message: res[i].message,
                            time: this.coverTimeHourOnly(res[i].createdAt)
                        }
                        this.chatHistory.push(obj)
                        // let chatWatcherObj = new Firebase('https://minicrm-245403.firebaseio.com/')
                        // this.chatminiCRMArr
                    }
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.dialog = false;
            })
        },
        sendMessage(){
            if(this.chatMess != ''){
                let body = {
                    topic: this.topic,
                    name: this.currentUser.displayName,
                    message: this.chatMess,
                    accountId: this.idAccount,
                    isCustomer: false,
                }
                let newMessage = {
                    name: this.currentUser.displayName,
                    message: this.chatMess,
                    time: this.coverTimeHourOnly(moment())
                }
                this.chatMess = '';
                this.chatHistory.push(newMessage)
                chatAPI.sendMessage(body).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    let time = moment();
                    if(result.code == 'SUCCESS'){
                        // let res = result.response;
                        // let obj = {
                        //     name: res.name,
                        //     message: res.message,
                        //     time: this.coverTimeHourOnly(res.createdAt)
                        // }
                        // this.chatHistory.push(obj)
                        // this.chatMess = ''
                    }
                    else {
                        this.chatHistory.pop()
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    }
                    
                }).catch(error => {
                    this.chatHistory.pop()
                    console.log(error)
                }).finally(() => {
                    
                })
            }
        },
        checkString(str){
            if (str == null || str == undefined){
                return ''
            }
            else {
                return str;
            }
        },
        decodeStr(str){
            let result = ''
            let regex = /-dot-/gi
            let noDotStr = str.replace(regex, ".");
            let strArr = noDotStr.split("-");
            let removeFirstElementArray = [];
            for(let i = 1; i < strArr.length; i++){
                removeFirstElementArray.push(strArr[i])
            }
            result = removeFirstElementArray.join("-")
            return result;
        }
    },
    created(){
        this.$store.state.colorNumber = 8;
        this.getCurrentUser();
        this.chatminiCRM = new Firebase('https://minicrm-245403.firebaseio.com/');
        
    }
}
</script>
<style>
    .fullHeight{
        height: 100%;
        width: 80%;
        position: relative;
    }

    .messengerBox {
        height: 65%;
        width: 73%;
        position: fixed;
        overflow-y: scroll;
    }
    .stickToBottom {
        position: fixed;
        bottom: 0;
        width: 73%;
    }

    .stickToTop {
        position: fixed;
        top: 0;
        width: 73%;
    }
</style>