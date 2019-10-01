<template>
  <v-toolbar dark color="#2e3f50" style="border-top:4px solid #ff7a59">
    <v-toolbar-items color="#2e3f50">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat color="#fff" dark v-on="on">
            Contacts <v-icon color="#ff7a59">keyboard_arrow_down</v-icon>
          </v-btn>
        </template>
        <v-list dark style="background-color:#253342">
          <v-list-tile>
            <v-list-tile-title>Contacts</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Companies</v-list-tile-title>
          </v-list-tile>
          <v-divider :divider="divider"></v-divider>
          <v-list-tile>
            <v-list-tile-title>Activity Feed</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Lists</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu offset-y>
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
      </v-menu>
      <v-menu offset-y>
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
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat color="#fff" dark v-on="on">
            Sales <v-icon color="#ff7a59">keyboard_arrow_down</v-icon>
          </v-btn>
        </template>
        <v-list dark style="background-color:#253342">
          <v-list-tile>
            <v-list-tile-title>Deals</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Tasks</v-list-tile-title>
          </v-list-tile>
          <v-divider :divider="divider"></v-divider>
          <v-list-tile>
            <v-list-tile-title>Documents</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Meetings</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu offset-y>
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
      </v-menu>
      <v-menu offset-y>
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
      </v-menu>
      <v-menu offset-y>
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
      </v-menu>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <loginAgen />
    <v-spacer></v-spacer>
    <user />
  </v-toolbar>
</template>
<script>
  import loginAgen from './loginAgen'
  import user from './user'
  export default {
    data: () => ({
      divider: true
    }),
    components: {
      loginAgen,
      user
    }
  }
</script>