<template>
  <v-toolbar dark color="#3E82F7" style="height: 50px; padding: 0px 0px;">
    <v-toolbar-title>
      <!-- <v-img
        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
        aspect-ratio="1"
        class="grey lighten-2"
      > -->
    </v-toolbar-title>
    <v-menu :nudge-width="200" v-if="$vuetify.breakpoint.xsOnly">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <span>Menu</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-toolbar-title>
        </template>

        <v-list>
          <v-list-tile @click="goToContactsPage()">
            <v-list-tile-title>Leads</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="goToListsPage()">
            <v-list-tile-title>Danh sách</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="goToMyTaskPage()">
            <v-list-tile-title>Công việc</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="goToSMSServicePage()">
            <v-list-tile-title>SMS</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="goToEmailServicePage()">
            <v-list-tile-title>Email</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="goToDealServicePage()">
            <v-list-tile-title>Thỏa thuận</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="gotoLeadHubPage()">
            <v-list-tile-title>Lead Hub</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="goToChatPage()">
            <v-list-tile-title>Chat</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="goToReportPage()">
            <v-list-tile-title>Báo cáo</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    <v-toolbar-items color="#3E82F7" style="padding: 0px 0px;" v-else>
      <img style="height: 33px; margin-top: 8px;" src="/favicon.ico" alt="logo"/>
      <v-btn class="ml-3" depressed :color="background[0]" @click="goToContactsPage()" style="height: 50px; margin-bottom: 15px;">
        LEADS 
        <v-icon color="white" class="ml-2">people_outline</v-icon>
        <!-- <v-icon color="#ff7a59">keyboard_arrow_down</v-icon> -->
      </v-btn>
      <v-divider :divider="divider" vertical></v-divider>
      <v-btn depressed :color="background[1]" @click="goToListsPage()" v-if="contactViewEverything" style="height: 50px; margin-bottom: 15px;">
        Danh sách 
        <v-icon color="white" class="ml-2">list</v-icon>
        <!-- <v-icon color="#ff7a59">keyboard_arrow_down</v-icon> -->
      </v-btn>
      <v-divider :divider="divider" vertical></v-divider>
      <v-btn depressed :color="background[2]" @click="goToMyTaskPage()" style="height: 50px; margin-bottom: 15px;"> 
        Công việc 
        <v-icon color="white" class="ml-2">check</v-icon>
        <!-- <v-icon color="#ff7a59">keyboard_arrow_down</v-icon> -->
      </v-btn>
      <v-divider :divider="divider" vertical ></v-divider>
      <v-btn depressed :color="background[3]" @click="goToSMSServicePage()" v-if="contactCommunicateEverything" style="height: 50px; margin-bottom: 15px;">
        SMS 
        <v-icon color="white" class="ml-2">textsms</v-icon>
        <!-- <v-icon color="#ff7a59">keyboard_arrow_down</v-icon> -->
      </v-btn>
      <v-divider :divider="divider" vertical></v-divider>
      <v-btn depressed :color="background[4]" @click="goToEmailServicePage()" style="height: 50px; margin-bottom: 15px;">
        Email
        <v-icon color="white" class="ml-2">mail_outline</v-icon>
        <!-- <v-icon color="#ff7a59">keyboard_arrow_down</v-icon> -->
      </v-btn>
      <v-divider :divider="divider" vertical></v-divider>
      <v-btn depressed :color="background[5]" @click="goToDealServicePage()" style="height: 50px; margin-bottom: 15px;">
        Thỏa thuận
        <v-icon color="white" class="ml-2">thumb_up</v-icon>
        <!-- <v-icon color="#ff7a59">keyboard_arrow_down</v-icon> -->
      </v-btn>
      <v-divider :divider="divider" vertical></v-divider>
      <v-btn :color="background[6]" depressed @click="gotoLeadHubPage()" style="height: 50px; margin-bottom: 15px;">
        Lead Hub
        <v-icon color="white" class="ml-2">device_hub</v-icon>
      </v-btn>
      <v-divider :divider="divider" vertical></v-divider>
      <v-btn :color="background[8]" @click="goToChatPage()" depressed style="height: 50px; margin-bottom: 15px;">
        Chat
        <v-icon color="white" class="ml-2">question_answer</v-icon>
        <v-icon v-if="notification" color="red" class="ml-2" style="font-size: 10px">brightness_1</v-icon>
      </v-btn>
      <v-divider :divider="divider" vertical></v-divider>
      <v-btn :color="background[7]" @click="goToReportPage()" depressed style="height: 50px; margin-bottom: 15px;">
        Báo cáo
        <v-icon color="white" class="ml-2">bar_chart</v-icon>
      </v-btn>
      <v-divider :divider="divider" vertical></v-divider>
      
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn icon @click="goToSettingsPage()" style="padding-bottom: 20px;">
      <v-icon>build</v-icon>
    </v-btn>
    <!-- <loginAgen /> -->
    <!-- <v-spacer></v-spacer> -->
    <user />
  </v-toolbar>
</template>
<script>
  import chatAPI from '../../services/chat.service'
  import {mapGetters} from 'vuex'
  import loginAgen from './loginAgen'
  import user from './user'
  import moment from 'moment'
  export default {
    data: () => ({
      chatminiCRM: null,
      newItem: false,
      divider: true,
      currentUser: null,
      contactViewEverything: true,
      contactCommunicateEverything: true,
      background: ['primary', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7'],

    }),
    components: {
      loginAgen,
      user
    },
    computed: {
          ...mapGetters({
              colorNumber: 'colorNumber',
              notification: 'notification',
              newTopic: 'newTopic'
              // ...
      })
    },
    watch: {
      colorNumber(){
        this.checkNavColor(this.colorNumber);
      },
      newTopic(){
        const {
              dispatch
          } = this.$store;
        this.chatminiCRM.child(this.newTopic).on('child_added', function(snapshot){
            // console.log('Có tin nhắn mới')
            dispatch('newNotification')
          })
      }
      // notification(){
      //   console.log(this.notification)
      //   if(this.notification == true){
      //     // this.$store.dispatch('noNewNotification')
      //   }
      // }
    },
    methods:{
      getTopic(){
          chatAPI.getTopic(this.currentUser.accountId, 1).then(result => {
              const {
                  dispatch
              } = this.$store;
              let time = moment();
              if(result.code == 'SUCCESS'){
                  let res = result.response.results;
                  for (let i = 0; i < res.length; i++){
                      this.chatminiCRM.child(res[i].topic).on('child_added', function(snapshot){
                        // console.log('Có tin nhắn mới')
                        dispatch('newNotification')
                      })
                  }
              }
              else {
                  dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
              }
          }).catch(error => {
              console.log(error)
          }).finally(() => {
              this.setListenToNewTopic()
          })
      },
      setListenToNewTopic(){
          const {
              dispatch
          } = this.$store;
          this.chatminiCRM.child("topic").child(this.currentUser.accountId).on('child_added', function(message) {
                // console.log('Có chủ đề mới')
                var message = message.val();
                // console.log(message.topic)
                dispatch('newNotification')
                dispatch('addNewTopic', message.topic)
            });
          // if(this.newItem == true){
          //   this.chatminiCRM.child("topic").child(this.currentUser.accountId).on('child_added', function(message) {
          //       // console.log('Có chủ đề mới')
          //       var message = message.val();
          //       // console.log(message.topic)
          //       dispatch('newNotification')
          //       dispatch('addNewTopic', message.topic)
          //   });
          // }
          // this.newItem = true;
          // if(this.newItem == true){
            
          // }
          // else {
          //   this.newItem = true;
          // }
          // this.newItem = true
      },
      checkNavColor(number){
        this.background = ['#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7'];
        if (number < 9){
          this.background[number] = 'primary';
        }
      },
      getCurrentUser(){
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        let role = this.currentUser.authorities;
        for (let i = 0; i < role.length; i++){
          if (role[i] == 'ROLE_CONTACT_VIEW_EVERYTHING'){
            this.contactViewEverything = true;
          }
          if (role[i] == 'ROLE_CONTACT_COMMUNICATE_EVERYTHING'){
            this.contactCommunicateEverything = true;
          } 
        }
        this.getTopic()
      },
      goToContactsPage(){
        let link = `/contacts/${this.currentUser.accountId}`
        this.$router.push(link);
      },
      goToListsPage(){
        let link = `/contacts/${this.currentUser.accountId}/lists`;
        this.$router.push(link);
      },
      goToMyTaskPage(){
        let link = `/contacts/${this.currentUser.accountId}/myTask`;
        this.$router.push(link);
      },
      goToSMSServicePage(){
        let link = `/contacts/${this.currentUser.accountId}/smsservice`;
        this.$router.push(link);
      },
      goToEmailServicePage(){
        let link = `/contacts/${this.currentUser.accountId}/emailservice`;
        this.$router.push(link);
      },
      goToDealServicePage(){
        let link = `/contacts/${this.currentUser.accountId}/dealservice`;
        this.$router.push(link);
      },
      gotoLeadHubPage(){
        let link = `/contacts/${this.currentUser.accountId}/leadhub`;
        this.$router.push(link);
      },
      goToSettingsPage(){
        let link = `/settings/${this.currentUser.accountId}/myinfo`;
        this.$router.push(link);
      },
      goToReportPage(){
        let link = `/contacts/${this.currentUser.accountId}/report`;
        this.$router.push(link);
      },
      goToChatPage(){
        let link = `/contacts/${this.currentUser.accountId}/chat`;
        this.$router.push(link);
      },
      
    },
    created(){
      this.getCurrentUser();
      this.chatminiCRM = new Firebase('https://leadpoolproduct.firebaseio.com/');
    }
  }
</script>