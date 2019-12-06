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
    <v-toolbar-items color="#3E82F7" style="padding: 0px 0px;">
      <v-btn depressed :color="background[0]" @click="goToContactsPage()" style="height: 50px; margin-bottom: 15px;">
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
        <v-icon color="white" class="ml-2">work_outline</v-icon>
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
        <v-icon color="white" class="ml-2">add</v-icon>
        <!-- <v-icon color="#ff7a59">keyboard_arrow_down</v-icon> -->
      </v-btn>
      <v-divider :divider="divider" vertical></v-divider>
      <v-btn :color="background[6]" depressed @click="gotoLeadHubPage()" style="height: 50px; margin-bottom: 15px;">
        Lead Hub
        <v-icon color="white" class="ml-2">device_hub</v-icon>
      </v-btn>

      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat color="#fff" dark v-on="on">
            Liên lạc <v-icon color="#ff7a59">keyboard_arrow_down</v-icon>
          </v-btn>
        </template>
        <v-list dark style="background-color:#253342">
          <v-list-tile @click="goToContactsPage()">
            <v-list-tile-title>Các liên lạc</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Companies</v-list-tile-title>
          </v-list-tile>
          <v-divider :divider="divider"></v-divider>
          <v-list-tile>
            <v-list-tile-title>Activity Feed</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="goToListsPage()">
            <v-list-tile-title>Danh sách</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> -->
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat color="#fff" dark v-on="on">
            Converations <v-icon color="#ff7a59">keyboard_arrow_down</v-icon>
          </v-btn>
        </template>
        <v-list dark style="background-color:#253342">
          <v-list-tile>
            <v-list-tile-title>Inbox</v-list-tile-title>
          </v-list-tile>
          <v-divider :divider="divider"></v-divider>
          <v-list-tile>
            <v-list-tile-title>Chatflows</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Snippets</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Templates</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> -->
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat color="#fff" dark v-on="on">
            Marketing <v-icon color="#ff7a59">keyboard_arrow_down</v-icon>
          </v-btn>
        </template>
        <v-list dark style="background-color:#253342">
          <v-list-tile>
            <v-list-tile-title>Inbox</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> -->
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat color="#fff" dark v-on="on">
            Sales <v-icon color="#ff7a59">keyboard_arrow_down</v-icon>
          </v-btn>
        </template>
        <v-list dark style="background-color:#253342">
          <v-list-tile>
            <v-list-tile-title>Deals</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="goToMyTaskPage()">
            <v-list-tile-title>Công việc</v-list-tile-title>
          </v-list-tile>
          <v-divider :divider="divider"></v-divider>
          <v-list-tile>
            <v-list-tile-title>Documents</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Meetings</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> -->
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat color="#fff" dark v-on="on">
            Services <v-icon color="#ff7a59">keyboard_arrow_down</v-icon>
          </v-btn>
        </template>
        <v-list dark style="background-color:#253342">
          <v-list-tile>
            <v-list-tile-title>Tickets</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> -->
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat color="#fff" dark v-on="on">
            Reports <v-icon color="#ff7a59">keyboard_arrow_down</v-icon>
          </v-btn>
        </template>
        <v-list dark style="background-color:#253342">
          <v-list-tile>
            <v-list-tile-title>Analytics tools</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Dashboards</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> -->
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat color="#fff" dark v-on="on">
            Marketplace <v-icon color="#ff7a59">keyboard_arrow_down</v-icon>
          </v-btn>
        </template>
        <v-list dark style="background-color:#253342">
          <v-list-tile>
            <v-list-tile-title>Listings</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Provider Info</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Transaction</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> -->
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
  import {mapGetters} from 'vuex'
  import loginAgen from './loginAgen'
  import user from './user'
  export default {
    data: () => ({
      divider: true,
      currentUser: null,
      contactViewEverything: true,
      contactCommunicateEverything: true,
      background: ['primary', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7']
    }),
    components: {
      loginAgen,
      user
    },
    computed: {
          ...mapGetters({
              colorNumber: 'colorNumber'
              // ...
      })
    },
    watch: {
      colorNumber(){
        this.checkNavColor(this.colorNumber);
      }
    },
    methods:{
      checkNavColor(number){
        this.background = ['#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7', '#3E82F7'];
        if (number < 8){
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
        let link = `/settings/${this.currentUser.accountId}/userandteam`;
        this.$router.push(link);
      },
    },
    created(){
      this.getCurrentUser();
    }
  }
</script>