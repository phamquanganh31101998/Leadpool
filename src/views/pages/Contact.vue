<template>
  <v-content class="mt-5 pl-3 pr-3">
    <v-layout row wrap>
      <v-flex xs12 sm12 md5 lg6 xl6>
        <h1 class="ml-3">Contact</h1>
      </v-flex>
      <v-flex xs12 sm12 md7 lg6 xl6>
        <v-layout row>
          <v-flex xs5 sm5 md5 lg5 xl5>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
          </v-flex>
          <v-flex xs2 sm2 md2 lg2 xl2>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn outline color="warning" dark v-on="on">
                  Actions
                </v-btn>
              </template>
              <v-list>
                <v-list-tile v-for="(item, index) in items" :key="index" @click="">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>
          <v-flex xs2 md2 lg2 xl2>
            <v-btn outline color="warning">
              Import
            </v-btn>
          </v-flex>
          <v-flex xs3 md3 lg3 xl3>
            <v-dialog v-model="checkInfo" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn dark color="warning" v-on="on">create contact</v-btn>
              </template>
              <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                  <span class="headline">Create contact</span>
                </v-card-title>
                <v-card-text>
                  <v-form v-model="valid">
                    <v-container grid-list-xl>
                      <v-layout wrap>
                        <v-flex xs12 md12 lg12 xl12>
                          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 lg12 xl12>
                          <v-text-field v-model="firstname" :rules="nameRules" label="First name" required>
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 lg12 xl12>
                          <v-text-field v-model="lastname" :rules="nameRules" label="Last name" required>
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 lg12 xl12>
                          <v-text-field v-model="phone" label="Phone number" required :rules="phoneRules">
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 lg12 xl12>
                          <v-select v-model="lifecycleStage" :items="lifecycleStages" :rules="[v => !!v || 'Chưa chọn']"
                            label="Life Cycle Stage" required></v-select>
                        </v-flex>
                        <v-flex xs12 md12 lg12 xl12>
                          <v-text-field v-model="city" label="Thành phố" required>
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 lg12 xl12>
                          <v-text-field v-model="bussiness" label="Ngành Nghề" required>
                          </v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" flat @click="createContacts">Create</v-btn>
                  <v-btn color="warning" flat @click="checkInfo = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider class="mt-4" :divider="divider"></v-divider>
    <v-layout row wrap class="mt-3">
      <v-flex xs6 sm4 md4 lg3 xl3>
        <v-list>
          <v-list-tile @click="">
            <v-list-tile-title>My Contacts</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="dialog = true">
            <v-list-tile-title>All saved filter<v-icon>keyboard_arrow_right</v-icon>
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>My Contacts</v-list-tile-title>
              <v-list-tile-sub-title><small>1 contact</small>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn small flat color="primary" left dark v-on="on">
                      option <v-icon>keyboard_arrow_down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile v-for="(item, index) in items" :key="index" @click="">
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-title>
              <v-icon>add</v-icon> Add filter
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex xs6 sm8 md8 lg9 xl9>
        <v-data-table :headers="headers" :items="contacts" :search="search" hide-actions class="elevation-1">
          <template v-slot:items="props">
           
              <tr>
              <td><router-link :to="takeLink(props.item.contactId)">{{ props.item.lastName }} {{ props.item.firstName }}</router-link></td>
              <td class="text-xs-center">{{ props.item.email }}</td>
              <td class="text-xs-center">{{ props.item.phone }}</td>
              <td class="text-xs-center">{{ props.item.leadStatus }}</td>
              <td class="text-xs-center">{{ covertime(props.item.updateAt) }}</td>
              <td class="text-xs-right text-md-right text-lg-right">
                <v-btn class="red" outlined  dark @click="deleteContact(props.item.contactId)">Delete</v-btn>
              </td>
            </tr>
           
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="page" :length="pages"></v-pagination>
        </div>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>All contact saved filters (10)</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-layout row>
            <v-flex>
              <h3>Standard</h3>
            </v-flex>
            <v-flex>
              <h3>Created by me</h3>
            </v-flex>
            <v-flex>
              <h3>Created by others</h3>
            </v-flex>
          </v-layout>
        </v-card-text>
        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </v-content>
</template>
<script>
  import moment from 'moment'
  import contacts from '../../services/contacts.service'
import contactsService from '../../services/contacts.service';
  export default {
    props: {
			idUser: {
				type: String,
				default: null,
			},},
    data: () => ({
      items: [{
          title: 'Edit columns'
        },
        {
          title: 'Edit properties'
        },
        {
          title: 'Manager duplicates'
        },
        {
          title: 'Restore contact'
        }
      ],
      checkInfo: false,
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Chưa nhập tên',
        // v => v.length <= 15 || 'Tên nhỏ hơn 15 kí tự',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Chưa nhập E-mail',
        v => /.+@.+/.test(v) || 'E-mail không đúng định dạng',
      ],
      lifecycleStage: 'Lead',
      lifecycleStages: [
        'Lead',
        'Subcriber',
        'Marketing qualified lead',
        'Sales qualified lead',
        'Opportunity',
        'Customer',
        'Evangelist',
        'Other'
      ],
      city: '',
      bussiness: '',
      divider: true,
      dialog: false,
      search: '',
      notifications: false,
      sound: true,
      phone: '',
      phoneRules: [
        v => !!v || 'Chưa nhập số điện thoại',
        v => /^\d{1,}$/.test(v) || 'Không đúng cú pháp'
      ],
      widgets: false,
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      headers: [{
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Email',
          align: 'center',
          value: 'calories'
        },
        {
          text: 'Phone Number',
          align: 'center',
          value: 'fat'
        },
        {
          text: 'Lead Status',
          align: 'center',
          value: 'carbs'
        },
        {
          text: 'Create Date(GMT +7)',
          align: 'center',
          value: 'protein'
        },
        {
          text: 'Delete',
          align: 'center',
          value: 'delete'
        }
      ],
      contacts: [],
      page: 1,
      pages: 0,
      deleteDialog: false
    }),
    methods: {
      createContacts() {
        let userInfo = JSON.parse(localStorage.getItem('user'));
        let userName = userInfo.username;
        let contact = [{
            "property": "email",
            "value": this.email
          },
          {
            "property": "firstName",
            "value": this.firstname
          },
          {
            "property": "lastName",
            "value": this.lastname
          },
          {
            "property": "phone",
            "value": this.phone
          },
          {
            "property": "contactOwner",
            "value": userName
          },
          {
            "property": "lifecycleStage",
            "value": this.lifecycleStage
          },
          {
            "property": "city",
            "value": this.city
          },
          {
            "property": "bussiness",
            "value": this.bussiness
          }
        ]
        contacts.createContact(this.idUser, contact).then(result => {
          this.$router.push(this.takeLink(result.response.contactId))
          this.checkInfo = false
          this.email = ''
          this.firstname = ''
          this.lastname = ''
          this.phone = ''
          this.lifecycleStage = ''
          this.city = ''
          this.bussiness = ''
          this.getAllContact()
        })
      },
      getAllContact() {
        this.contacts = []
        contacts.getAllContact(this.idUser, this.page).then(result => {
          this.contacts = result.response.results
          this.pages = result.response.totalPage
        })
      },
      covertime(time) {
        if (_.isNull(time)) return '';
        return moment(time).format('DD/MM/YYYY hh:mm:ss')
      },
      takeLink(idContact){
        return `/contacts/${this.idUser}/contact/${idContact}`;
      },
      deleteContact(idContact){
        contacts.deleteContact(this.idUser, idContact).then(result => {
          console.log(result);
          this.getAllContact();
        })
      }
    },
    computed: {},
    watch:{
      page(){
        this.contacts = []
        this.getAllContact()
      }
    },
    created() {
      this.getAllContact()
    }
  }
</script>