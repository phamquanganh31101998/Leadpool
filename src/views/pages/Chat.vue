<template>
    <v-content class="mt-4 pl-3 pr-3">
        <v-dialog
            v-model="dialog"
            hide-overlay
            persistent
            width="300"
            >
                <v-card
                color="#3E82F7"
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
        <v-layout fill-height row v-if="access">
            <v-flex xs12 sm12 md3 lg3 xl3 class="mr-3" style=" border-right: 1px solid #DCDCDC;">
                <div style="height: 100%;">
                    <h1 class="ml-3"> Chat</h1>
                    <div class="fullHeight pr-3" style="background-color: #FAFAFA">
                        <v-list two-line>
                            <v-subheader>
                                Danh sách các cuộc trò chuyện
                            </v-subheader>
                            <template v-for="(item, index) in allTopics">
                                <v-list-tile avatar @click="markReadTopic(item.value, index), getNewChatHistory(item.value)">
                                    <v-list-tile-avatar>
                                        <v-btn class="disable-events" small fab dark color="blue-grey">
                                            <span style="font-size: 18px;">{{item.text[0]}}</span>
                                        </v-btn>
                                        <!-- <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"> -->
                                    </v-list-tile-avatar>

                                    <v-list-tile-content v-if="item.status == 'UNREAD'" style="font-weight: bold;">
                                        <v-list-tile-title>{{item.text}}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{item.lastTime}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-content v-if="item.status == 'READ'">
                                        <v-list-tile-title>{{item.text}}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{item.lastTime}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action v-if="item.status == 'UNREAD'">
                                        <v-icon style="font-size: 10px" color="blue">brightness_1</v-icon>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </template>
                        </v-list>
                        <v-btn block small v-if="topicPage < allTopicPage" @click="getOlderTopic()">Xem các cuộc trò chuyện cũ hơn</v-btn>
                    </div>
                    
                </div>
                
            </v-flex>
            <v-flex xs12 sm12 md9 lg9 xl9>
                <div>
                    <div>
                        <h2>{{this.decodeStr(topic)}}</h2>
                    </div>
                    <div style="height: 100%; width: 100%">
                        <div>
                            <v-btn small block color="#3E82F7" dark @click="getOlderHistory(topic)" v-if="chatPage < allChatPage">Xem các tin nhắn cũ hơn</v-btn>
                        </div>
                        <div class="messengerBox" id="boxContainChat">
                            <template v-for="item in chatHistory" >
                                <v-layout align-center justify-start row :key="item.chatMessageId" v-if="item.isCustomer == true || item.isCustomer == null"> 
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-avatar v-on="on" :tile="tile" size="20" color="blue-grey" style="color: white; font-size: 11px;">
                                                {{item.name[0]}}
                                            </v-avatar>
                                            <v-chip color="grey" dark> {{item.message}} </v-chip>
                                        </template>
                                        <span>{{item.name}} - {{item.time}}</span>
                                    </v-tooltip>
                                </v-layout>
                                <v-layout align-center justify-end row :key="item.chatMessageId" v-if="item.isCustomer == false" >
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-chip color="blue" dark> {{item.message}}</v-chip>
                                            <v-avatar v-on="on" :tile="tile" size="20" color="blue-grey" style="color: white; font-size: 11px;">
                                                {{item.name[0]}}
                                            </v-avatar>
                                        </template>
                                        <span>{{item.name}} (Admin) - {{item.time}}</span>
                                    </v-tooltip>
                                </v-layout>
                                
                            </template>
                        </div>
                        <div class="stickToBottom">
                            <v-text-field append-icon="send" @keyup.enter="sendMessage()" @click:append="sendMessage()" v-if="topic != ''" v-model="chatMess" placeholder="Nhập tin nhắn tại đây"></v-text-field>
                        </div>
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
            newMessage: 'newMessage',
            hasNewTopic: 'hasNewTopic'
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
            newItem: false,
            vertical: true,
            divider: true,
            tile: false,
            dialog: false,
            dialogMessage: '',
            chatMess: '',
            chatPage: 1,
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
            avatar: '',
            countNewMessage: 0,
            countNewTopic: 0,
            // chatminiCRMArr: []
        }
    },
    watch: {
        hasNewMessage(){
            if(this.hasNewMessage == true){
                // console.log(this.newMessage)
                //get TopicObj change
                let topicObjChange = this.getTopicByTopicName(this.topicChange);
                let indexChange = this.getTopicNumberByTopicName(this.topicChange)
                // console.log(indexChange)
                topicObjChange.lastTime = this.coverTimeDisplayForChat(moment());
                //When this topic has new Message
                if(this.topic == this.topicChange){
                    this.countNewMessage = this.countNewMessage + 1;
                    //Customer send message to Admin
                    if(this.newMessage.name != this.currentUser.displayName){
                        this.chatHistory.push(this.newMessage);
                        this.$store.dispatch('alert/success', `${this.newMessage.name} đã gửi một tin nhắn mới tại cuộc trò chuyện ${this.decodeStr(this.topicChange)} (${this.coverTimeHourOnly(moment())})`)
                    }
                    
                    $('#boxContainChat').animate({
						scrollTop: $('#boxContainChat')[0].scrollHeight
					}, 0);
                }
                //When other topic has new Message
                else {
                    topicObjChange.status = 'UNREAD';
                    topicObjChange.lastTime = this.coverTimeDisplayForChat(moment());
                    this.$store.dispatch('alert/success', `${this.newMessage.name} đã gửi một tin nhắn mới tại cuộc trò chuyện ${this.decodeStr(this.topicChange)} (${this.coverTimeHourOnly(moment())})`)
                }
                this.allTopics.splice(indexChange, 1);
                this.allTopics.unshift(topicObjChange);
            }
            this.$store.dispatch('noNewMessage')
        },
        hasNewTopic(){
            if(this.hasNewTopic == true){
                this.countNewTopic++;
                this.getFirstTopic()
                this.$store.dispatch('noNewTopic')
            }
            
        }
    },
    methods: {
        markReadTopic(topic, index){
            this.allTopics[index].status = 'READ';
            chatAPI.markReadTopic(this.idAccount, this.getTopicByTopicName(topic).chatTopicId).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
            })
        },
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
        coverTimeDisplayForChat(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm, DD/MM/YYYY')
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
                this.allTopicPage = result.response.totalPage;
                if(result.code == 'SUCCESS'){
                    let res = result.response.results;
                    for (let i = 0; i < res.length; i++){
                        let obj = {
                            text: this.decodeStr(res[i].topic),
                            value: res[i].topic,
                            status: res[i].status,
                            lastTime: this.coverTimeDisplayForChat(res[i].nearTime),
                            chatTopicId: res[i].chatTopicId
                        }
                        this.allTopics.push(obj)
                        this.chatminiCRM.child(res[i].topic).on('child_added', function(snapshot){
                            var message = snapshot.val();
                            dispatch('newMessage', message);
                            dispatch('topicChange', res[i].topic);
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
                this.setListenToNewTopic()
            })
        },
        setListenToNewTopic(){
            const {
                dispatch
            } = this.$store;
            if(this.newItem == true){
                this.chatminiCRM.child("topic").child(this.idAccount).on('child_added', function(message) {
                    var message = message.val();
                    dispatch('hasNewTopic')
                });
            }
            this.newItem == true
        },
        getOlderTopic(){
            if(this.countNewTopic == 0){
                this.topicPage++;
                this.getTopic();
            }
            else {
                let pageToLoad = this.topicPage + Math.floor(this.countNewTopic / 15) + 1;
                this.topicPage = pageToLoad;
                let topicToRemove = this.countNewTopic % 15;
                chatAPI.getTopic(this.idAccount, this.topicPage).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    let time = moment();
                    if(result.code == 'SUCCESS'){
                        let res = result.response.results;
                        this.allTopicPage = result.response.totalPage;
                        for (let i = topicToRemove; i < res.length; i++){
                            let obj = {
                                text: this.decodeStr(res[i].topic),
                                value: res[i].topic,
                                status: res[i].status,
                                lastTime: this.coverTimeDisplayForChat(res[i].nearTime),
                                chatTopicId: res[i].chatTopicId
                            }
                            this.allTopics.push(obj)
                            this.chatminiCRM.child(res[i].topic).on('child_added', function(snapshot){
                                var message = snapshot.val();
                                dispatch('newMessage', message);
                                dispatch('topicChange', res[i].topic);
                                dispatch('hasNewMessage');
                            })
                        }
                        this.countNewTopic = 0;
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    }
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    this.dialog = false;
                    // this.getAvatar()
                })
            }
        },
        getOlderHistory(topic){
            if (this.countNewMessage == 0){
                this.chatPage++;
                this.dialogMessage = 'Đang lấy lịch sử cuộc trò chuyện ' + this.decodeStr(topic) + '...';
                this.dialog = true;
                chatAPI.getHistory(this.idAccount, topic, this.chatPage).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    let time = moment();
                    if(result.code == 'SUCCESS'){
                        this.allChatPage = result.response.totalPage;
                        let res = result.response.results;
                        for (let i = 0; i < res.length; i++){
                            let obj = {
                                name: res[i].name,
                                message: res[i].message,
                                time: this.coverTimeDisplayForChat(res[i].createdAt),
                                isCustomer: res[i].isCustomer
                            }
                            this.chatHistory.unshift(obj)
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
            }
            else {
                let pageToLoad = this.chatPage + Math.floor(this.countNewMessage / 15) + 1;
                this.chatPage = pageToLoad;
                let messageToRemove = this.countNewMessage % 15;
                // console.log("Cần load trang: " + pageToLoad);
                // console.log("Bỏ đi " + messageToRemove + " tin nhắn đầu")
                chatAPI.getHistory(this.idAccount, topic, this.chatPage).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    let time = moment();
                    if(result.code == 'SUCCESS'){
                        this.allChatPage = result.response.totalPage;
                        let res = result.response.results;
                        for (let i = messageToRemove; i < res.length; i++){
                            let obj = {
                                name: res[i].name,
                                message: res[i].message,
                                time: this.coverTimeDisplayForChat(res[i].createdAt),
                                isCustomer: res[i].isCustomer
                            }
                            this.chatHistory.unshift(obj)
                        }
                        this.countNewMessage = 0;
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    }
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    this.dialog = false;
                })
            }
        },
        getNewChatHistory(topic){
            this.countNewMessage = 0;
            this.topic = topic;
            this.chatHistory = [];
            this.chatPage = 1;
            this.dialogMessage = 'Đang lấy lịch sử cuộc trò chuyện ' + this.decodeStr(topic) + '...';
            this.dialog = true;
            chatAPI.getHistory(this.idAccount, topic, this.chatPage).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    this.allChatPage = result.response.totalPage;
                    let res = result.response.results.reverse();
                    for (let i = 0; i < res.length; i++){
                        let obj = {
                            name: res[i].name,
                            message: res[i].message,
                            time: this.coverTimeDisplayForChat(res[i].createdAt),
                            isCustomer: res[i].isCustomer
                        }
                        
                        this.chatHistory.push(obj)
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
                    time: this.coverTimeHourOnly(moment()),
                    isCustomer: false
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
        },
        getTopicByTopicName(topicName){
            let result = null;
            for(let i = 0; i < this.allTopics.length; i++){
                if(this.allTopics[i].value == topicName){
                    result = this.allTopics[i];
                    return result;
                }
            }
        },
        getTopicNumberByTopicName(topicName){
            let result = null;
            for(let i = 0; i < this.allTopics.length; i++){
                if(this.allTopics[i].value == topicName){
                    result = i;
                    return i;
                }
            }
        },
        getFirstTopic(){
            chatAPI.getTopic(this.idAccount, 1).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let res = result.response.results[0];
                    this.allTopicPage = result.response.totalPage;
                    let obj = {
                        text: this.decodeStr(res.topic),
                        value: res.topic,
                        status: res.status,
                        lastTime: this.coverTimeDisplayForChat(res.nearTime),
                        chatTopicId: res.chatTopicId
                    }
                    this.allTopics.unshift(obj)
                    this.chatminiCRM.child(res.topic).on('child_added', function(snapshot){
                        var message = snapshot.val();
                        dispatch('newMessage', message);
                        dispatch('topicChange', res.topic);
                        dispatch('hasNewMessage');
                    })
                    dispatch('alert/success', `Bạn có 1 cuộc trò chuyện mới (${this.coverTimeDetail(time)})`)
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.dialog = false;
                // this.getAvatar()
            })
        }
    },
    created(){
        this.$store.state.colorNumber = 8;
        this.getCurrentUser();
        this.chatminiCRM = new Firebase('https://minicrm-245403.firebaseio.com/');
        this.$store.dispatch('noNewNotification')
    }
}
</script>
<style>
    .fullHeight{
        height: 100%;
        width: 100%;
        position: relative;
    }


    /* #boxContainChat {
        border-left: 1px solid #DCDCDC
    }    */
    .messengerBox {
        /* border-left: 1px solid #DCDCDC; */
        height: 70%;
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
    .disable-events {
        pointer-events: none
    }
</style>
