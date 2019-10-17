<template>
  <v-content class="mt-5 pl-3 pr-3">
    <v-layout row wrap>
      <v-flex xs12 sm12 md5 lg6 xl6>
        <h1 class="ml-3">Leads</h1>
      </v-flex>
      <v-flex xs12 sm12 md7 lg6 xl6>
        <v-layout row>
          <v-flex xs9 sm9 md9 lg9 xl9>
            <v-text-field v-model="search" append-icon="search" label="Tìm kiếm Lead theo tên" single-line hide-details></v-text-field>
          </v-flex>
          <!-- <v-flex xs2 sm2 md2 lg2 xl2>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn outline color="warning" dark v-on="on">
                  Actions
                </v-btn>
              </template>
              <v-list>
                <v-list-tile v-for="(item, index) in items" :key="index">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>
          <v-flex xs2 md2 lg2 xl2>
            <v-btn outline color="warning">
              Import
            </v-btn>
          </v-flex> -->
          <v-flex xs3 sm3 md3 lg3 xl3>
            <v-dialog v-model="checkInfo" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn dark color="warning" v-on="on">Tạo Lead mới</v-btn>
              </template>
              <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                  <span class="headline">Tạo Lead mới</span>
                </v-card-title>
                <v-card-text>
                  <v-form v-model="valid">
                    <v-container grid-list-xl>
                      <v-layout wrap>
                        <v-flex xs12 md12 lg12 xl12>
                          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 lg12 xl12>
                          <v-text-field v-model="firstname" :rules="nameRules" label="Họ" required>
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 lg12 xl12>
                          <v-text-field v-model="lastname" :rules="nameRules" label="Tên" required>
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 lg12 xl12>
                          <v-text-field v-model="phone" label="Số điện thoại" required :rules="phoneRules">
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
                  <v-btn color="primary" flat @click="createContacts">Tạo</v-btn>
                  <v-btn color="red" flat @click="checkInfo = false">Đóng</v-btn>
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
          <v-list-tile @click="getAllContact()">
            <v-list-tile-title>Tất cả các Lead</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="getMyContact()">
            <v-list-tile-title>Các Lead của tôi</v-list-tile-title>
          </v-list-tile>
          <!-- <v-list-tile @click="dialog = true">
            <v-list-tile-title>Các bộ lọc đã lưu<v-icon>keyboard_arrow_right</v-icon>
            </v-list-tile-title>
          </v-list-tile> -->
          <!-- <v-list-tile>
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
                    <v-list-tile v-for="(item, index) in items" :key="index">
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile> -->
        </v-list>
        <v-divider divider="true" class="mr-3"></v-divider>
        <!-- <v-card width="100%">
          <v-card-text>
            <template v-for="(andCondition, andIndex) in conditions[0]">
              <v-card>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs10 sm10 md10 lg10 xl10 class="pt-3">
                      <p v-if="andCondition.condition == 'IN'">{{andCondition.property}} is {{andCondition.condition}} 
                        <template v-for="val in andCondition.value">
                            <v-chip>{{val}}</v-chip>
                        </template>
                      </p>
                      <p v-if="andCondition.condition == 'EQUAL'">{{andCondition.property}} is {{andCondition.condition}} to {{andCondition.value}}</p>
                      <p v-if="andCondition.condition == 'LIKE'">{{andCondition.property}} is {{andCondition.condition}} {{andCondition.value}}</p>
                      <p v-if="andCondition.condition == 'GREAT_THAN'">{{andCondition.property}} is {{andCondition.condition}} {{andCondition.value}}</p>
                      <p v-if="andCondition.condition == 'LESS_THAN'">{{andCondition.property}} is {{andCondition.condition}} {{andCondition.value}}</p>
                    </v-flex>
                    <v-flex xs2 sm2 md2 lg2 xl2>
                      <v-tooltip right>
                        <template v-slot:activator="{ on }">
                            <v-btn @click="deleteFilter(andIndex)" flat v-on="on" fab>
                                <v-icon style="color: red;" >clear</v-icon>
                            </v-btn>
                        </template>
                        <span>Delete this condition</span>
                      </v-tooltip>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
              <br>
            </template>
          </v-card-text>
          <v-card-actions>
            <v-menu :close-on-content-click="false" :nudge-width="100" offset-x max-width="300">
              <template v-slot:activator="{ on }">
                  <a v-on="on" style="fontSize: 16px;"> <v-icon>add</v-icon> Add filter </a>
              </template>
              <v-card style="width: 100%;">
                  <v-card-text>
                      <v-layout row wrap>
                          <v-flex xs12 sm12 md12 lg12 xl12>
                              <v-select :items="newCondition.contactProperties" label="Choose Contact Property" v-model="newCondition.chosenProperty"></v-select>
                          </v-flex>
                          <br>
                          <v-flex xs12 sm12 md12 lg12 xl12>
                              <v-select :items="newCondition.conditionConstants" label="Choose constant" v-model="newCondition.chosenConstant"></v-select>
                          </v-flex>
                          <br>
                          <v-flex xs12 sm12 md12 lg12 xl12 v-if="newCondition.chosenConstant == 'IN'">
                              <v-text-field v-model="newCondition.vchipTextField" label="Nhập từ khóa" placeholder="Phân tách nhau bằng dấu phẩy"></v-text-field>
                              
                              <v-btn class="blue" outline round style="color: blue;" @click="addFilter(newCondition.chosenProperty, 'IN', newCondition.vchipTextField)"><v-icon>add</v-icon> Add</v-btn>
                          </v-flex>
                          <v-flex xs12 sm12 md12 lg12 xl12 v-else>
                              <v-text-field v-model="newCondition.value" label="Value"></v-text-field>
                              <v-btn class="blue" outline round style="color: blue;" @click="addFilter(newCondition.chosenProperty, newCondition.chosenConstant, newCondition.value)" ><v-icon>add</v-icon> Add </v-btn>
                          </v-flex>
                      </v-layout>
                  </v-card-text>
              </v-card>
            </v-menu>
          </v-card-actions>
        </v-card> -->
        <template v-if="!firstConditionMenu">
          <v-card class="mr-3">
            <v-card-title>
              <h3>Bộ lọc kết quả</h3>
            </v-card-title>
            <v-card-text>
                <template v-for="(orCondition, orIndex) in conditions">
                    <v-card flat style="border: 1px solid #CCCCCC">
                        <v-card-title style="padding: 8px 0px; margins: 4px 4px">
                            <v-layout row wrap>
                                <v-flex xs2 sm2 md2 lg2 xl2 offset-xs10 offset-sm10 offset-md10 offset-xl10 offset-lg10>
                                    <a color="indigo" @click="deleteOrCondition(orIndex)" style="text-align: right;">
                                        Xóa
                                    </a>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-card-text style="padding: 4px 8px; margin: 4px 4px;">
                            <template v-for="(andCondition, andIndex) in orCondition">
                                <v-card flat style="border: 1px solid #CCCCCC">
                                    <v-card-text style="padding: 8px 8px;">
                                        <v-layout row>
                                            <v-flex xs10 sm10 md10 lg10 xl10 class="pt-3">
                                                <p v-if="andCondition.condition == 'IN'">{{getPropertyName(andCondition.property)}} có trong 
                                                    <template v-for="val in andCondition.value">
                                                        <v-chip>{{val}}</v-chip>
                                                    </template>
                                                </p>
                                                <p v-if="andCondition.condition == 'EQUAL'">{{getPropertyName(andCondition.property)}} là {{andCondition.value}}</p>
                                                <p v-if="andCondition.condition == 'LIKE'">{{getPropertyName(andCondition.property)}} chứa {{andCondition.value}}</p>
                                                <p v-if="andCondition.condition == 'GREAT_THAN'">{{getPropertyName(andCondition.property)}} lớn hơn {{andCondition.value}}</p>
                                                <p v-if="andCondition.condition == 'LESS_THAN'">{{getPropertyName(andCondition.property)}} nhỏ hơn {{andCondition.value}}</p>
                                            </v-flex>
                                            <v-flex xs2 sm2 md2 lg2 xl2>
                                                <v-tooltip right>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn @click="deleteAndCondition(orIndex, andIndex)" flat v-on="on" fab>
                                                            <v-icon style="color: red;" >clear</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Xóa điều kiện này</span>
                                                </v-tooltip>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                                <p>và</p>
                            </template>
                        </v-card-text>
                        <v-card-actions style="padding: 8px 8px; margins: 0px 0px">
                            <v-menu :close-on-content-click="false" :nudge-width="100" offset-x max-width="300">
                                <template v-slot:activator="{ on }">
                                    <v-btn class="blue" outline round style="color: blue;" v-on="on"><v-icon>add</v-icon>Thêm điều kiện</v-btn>
                                </template>
                                <v-card style="width: 100%;">
                                    <v-card-text>
                                        <v-layout row wrap>
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                <v-select :items="newCondition.contactProperties" label="Thuộc tính" v-model="newCondition.chosenProperty"></v-select>
                                            </v-flex>
                                            <br>
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                <v-select :items="newCondition.conditionConstants" label="Điều kiện" v-model="newCondition.chosenConstant"></v-select>
                                            </v-flex>
                                            <br>
                                            <v-flex xs12 sm12 md12 lg12 xl12 v-if="newCondition.chosenConstant == 'IN'">
                                                <v-text-field v-model="newCondition.vchipTextField" label="Nhập từ khóa" placeholder="Phân tách nhau bằng dấu phẩy"></v-text-field>
                                                
                                                <v-btn class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, newCondition.chosenProperty, 'IN', newCondition.vchipTextField)"><v-icon>add</v-icon>Thêm</v-btn>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12 lg12 xl12 v-else>
                                                <v-text-field v-model="newCondition.value" label="Giá trị" ></v-text-field>
                                                <v-btn class="blue" outline round style="color: blue;"  @click="addAndCondition(orIndex, newCondition.chosenProperty, newCondition.chosenConstant, newCondition.value)"><v-icon>add</v-icon>Thêm</v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                            <!-- <v-btn @click="deleteOrCondition(orIndex)" class="red" outline round style="color: red;">Xóa</v-btn> -->
                        </v-card-actions>
                    </v-card>
                    <!-- <p>hoặc</p> -->
                </template>
            </v-card-text>
            <!-- <v-card-actions>
                <v-btn class="blue" outline round style="color: blue;" @click="addOrCondition()"><v-icon>add</v-icon>điều kiện hoặc</v-btn>
            </v-card-actions> -->
          </v-card>
          <br>
          <v-layout row wrap>
            <v-flex>
              <v-btn style="backgroundColor: #425B76" dark @click="filter()">Lọc</v-btn>
            </v-flex>
            <v-flex>
              <v-btn @click="resetFilter()">Xóa</v-btn>
            </v-flex>
            <!-- <v-dialog
              width="500"
              v-model="saveFilter.dialog"
              >
              <template v-slot:activator="{ on }">
                <v-flex>
                  <v-btn color="warning" v-on="on">Lưu lại</v-btn>
                </v-flex>
              </template>
              <v-card>
                <v-card-title
                  class="headline"
                  style="backgroundColor: #1E88E5; color: white"
                  primary-title
                >
                  Lưu lại danh sách
                </v-card-title>

                <v-card-text>
                  <v-layout row wrap>
                    <p>Tên *</p>
                    <v-text-field style="width: 100%; padding-top: 0px" v-model="saveFilter.name"></v-text-field>
                    <p>Share with *</p>
                    <v-radio-group v-model="saveFilter.shareWith">
                      <v-radio label="Private" value="private"></v-radio>
                      <v-radio label="My Team" value="myteam"></v-radio>
                      <v-radio label="Everyone" value="everyone"></v-radio>
                    </v-radio-group>
                  </v-layout>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-layout row wrap>
                    <v-flex>
                      <v-btn flat color="green" @click="createFilter(saveFilter.name, conditions)" :disabled="disableSaveFilterButton">Lưu</v-btn>
                      <v-btn flat color="red" @click="saveFilter.dialog = false">Hủy</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-dialog> -->
          </v-layout>
          <br>
          <br>
          <br>
          <br>
          <br>
        </template>
        <template v-else>
          <br>
          <br>
          <v-menu v-model="createFirstCondition.firsrConditionMenu" :close-on-content-click="false" :nudge-width="100" offset-x max-width="300">
              <template v-slot:activator="{ on }">
                  <a v-on="on"><v-icon>add</v-icon> Thêm điều kiện mới</a>
              </template>
              <v-card style="width: 100%;">
                  <v-card-text>
                      <v-layout row wrap>
                          <v-flex xs12 sm12 md12 lg12 xl12>
                              <v-select :items="createFirstCondition.contactProperties" label="Chọn thuộc tính" v-model="createFirstCondition.chosenProperty"></v-select>
                          </v-flex>
                          <br>
                          <v-flex xs12 sm12 md12 lg12 xl12>
                              <v-select :items="createFirstCondition.conditionConstants" label="Chọn điều kiện" v-model="createFirstCondition.chosenConstant"></v-select>
                          </v-flex>
                          <br>
                          <v-flex xs12 sm12 md12 lg12 xl12 v-if="createFirstCondition.chosenConstant == 'IN'">
                              <v-text-field v-model="createFirstCondition.vchipTextField" label="Nhập từ khóa" placeholder="Phân tách nhau bằng dấu phẩy"></v-text-field>
                              
                              <v-btn class="blue" outline round style="color: blue;" @click="addFirstCondition(createFirstCondition.chosenProperty, 'IN', createFirstCondition.vchipTextField)"><v-icon>add</v-icon>Thêm</v-btn>
                          </v-flex>
                          <v-flex xs12 sm12 md12 lg12 xl12 v-else>
                              <v-text-field v-model="createFirstCondition.value" label="Nhập từ khóa" ></v-text-field>
                              <v-btn class="blue" outline round style="color: blue;"  @click="addFirstCondition(createFirstCondition.chosenProperty, createFirstCondition.chosenConstant, createFirstCondition.value)"><v-icon>add</v-icon>Thêm</v-btn>
                          </v-flex>
                      </v-layout>
                  </v-card-text>
              </v-card>
          </v-menu>
        </template>
      </v-flex>
      <v-flex xs6 sm8 md8 lg9 xl9>
        <v-data-table :headers="headers" :items="contacts" hide-actions class="elevation-1">
          <template v-slot:items="props">
              <tr>
              <td><router-link :to="takeLink(props.item.contactId)">{{ props.item.lastName }} {{ props.item.firstName }}</router-link></td>
              <td class="text-xs-center">{{ props.item.email }}</td>
              <td class="text-xs-center">{{ props.item.phone }}</td>
              <td class="text-xs-center">{{ props.item.leadStatus }}</td>
              <td class="text-xs-center">{{ covertime(props.item.updateAt) }}</td>
              <td class="text-xs-right text-md-right text-lg-right">
                <v-btn class="red" outline round style="color: red;" @click="confirmDeleteContact(props.item.contactId)">Xóa</v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="page" :length="pages"></v-pagination>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition" scrollable width="50%">
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-toolbar-title>Các danh sách đã lưu</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <template v-for="(list, index) in lists">
              <v-layout row>
                <a @click.stop="setChosenList(index)" style="fontSize: 18px;">{{list.name}}</a>
              </v-layout>
            </template>
        </v-card-text>
        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteContactDialog.dialog" @click:outside="deleteContactDialog.dialog = false" transition="dialog-bottom-transition" scrollable width="30%">
      <v-card tile>
        <v-toolbar card dark color="red">
          <v-toolbar-title>Xóa?</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            Bạn có chắc chắn muốn xóa Lead này?
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="red" @click="deleteContact(deleteContactDialog.id)">Xóa</v-btn>
          <v-btn flat color="primary" @click="deleteContactDialog.dialog = false">Quay lại</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>
<script>
  import moment from 'moment'
  import contacts from '../../services/contacts.service'
  import contactsService from '../../services/contacts.service';
  import listService from '../../services/list.services'
  export default {
    props: {
			idUser: {
				type: String,
				default: null,
      },
    },
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
        'Subscriber',
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
          text: 'TÊN',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Email',
          align: 'center',
          value: 'calories'
        },
        {
          text: 'SỐ ĐIỆN THOẠI',
          align: 'center',
          value: 'fat'
        },
        {
          text: 'Lead Status',
          align: 'center',
          value: 'carbs'
        },
        {
          text: 'NGÀY TẠO',
          align: 'center',
          value: 'protein'
        },
        {
          text: 'XÓA',
          align: 'center',
          value: 'delete'
        }
      ],
      contacts: [],
      allContacts: [],
      page: 1,
      pages: 0,
      deleteDialog: false,
      conditions: [],
      newCondition: {
        contactProperties: [
            {
                text: 'Lifecycle Stage',
                value: 'lifecycle_stage'
            },
            {
                text: 'Tài khoản sở hữu',
                value: 'contact_owner'
            },
            {
                text: 'Số điện thoại',
                value: 'phone_number'
            },
            {
                text: 'Email',
                value: 'email'
            },
            {
                text: 'Thành phố',
                value: 'city'
            },
            {
                text: 'Ngành nghề',
                value: 'bussiness'
            }
        ],
        conditionConstants: [
            {
                text: 'lớn hơn',
                value: 'GREAT_THAN'
            },
            {
                text: 'nhỏ hơn',
                value: 'LESS_THAN'
            },
            {
                text: 'là',
                value: 'EQUAL'
            },
            {
                text: 'chứa',
                value: 'LIKE'
            },
            {
                text: 'có trong',
                value: 'IN'
            },
        ],
        chosenProperty: 'lifecycle_stage',
        chosenConstant: 'EQUAL',
        value: '',
        vchipTextField: '',
        vchipValue: [],
        newConditionMenu: false
      },
      createFirstCondition: {
        contactProperties: [
            {
                text: 'Lifecycle Stage',
                value: 'lifecycle_stage'
            },
            {
                text: 'Tài khoản sở hữu',
                value: 'contact_owner'
            },
            {
                text: 'Số điện thoại',
                value: 'phone_number'
            },
            {
                text: 'Email',
                value: 'email'
            },
            {
                text: 'Thành phố',
                value: 'city'
            },
            {
                text: 'Ngành nghề',
                value: 'bussiness'
            }
        ],
        conditionConstants: [
            {
                text: 'lớn hơn',
                value: 'GREAT_THAN'
            },
            {
                text: 'nhỏ hơn',
                value: 'LESS_THAN'
            },
            {
                text: 'là',
                value: 'EQUAL'
            },
            {
                text: 'chứa',
                value: 'LIKE'
            },
            {
                text: 'có trong',
                value: 'IN'
            },
        ],
        chosenProperty: 'lifecycle_stage',
        chosenConstant: 'EQUAL',
        value: '',
        vchipTextField: '',
        vchipValue: [],
        firstConditionMenu: false
      },
      firstConditionMenu: true,
      saveFilter: {
        dialog: false,
        name: '',
        shareWith: 'private'
      },
      lists: [],
      chosenList: null,
      deleteContactDialog: {
        dialog: false,
        id: ''
      }
    }),
    computed: {
      disableSaveFilterButton(){
        if (this.saveFilter.name == ''){
          return true;
        }
        else {
          return false;
        }
      },
    },

    methods: {
      getPropertyName(value){
        let result = ''
        for(let i = 0; i<this.createFirstCondition.contactProperties.length;i++){
          if(value == this.createFirstCondition.contactProperties[i].value){
            result = this.createFirstCondition.contactProperties[i].text;
          }
        }
        return result;
      },
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
        this.allContacts = [];
        contacts.getAllContact(this.idUser, this.page).then(result => {
          this.allContacts = result.response.results;
          this.contacts = this.allContacts;
          this.pages = result.response.totalPage
        })
      },
      getMyContact(){
        this.contacts = []
        this.allContacts = [];
        contacts.getAllContact(this.idUser, this.page).then(result => {
          const res = result.response.results;
          const email = JSON.parse(localStorage.getItem("user")).username;
          for(let i = 0; i<res.length;i++){
            if(res[i].createdBy == email){
              this.allContacts.push(res[i]);
            }
          }
          this.contacts = this.allContacts;
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
      confirmDeleteContact(idContact){
        this.deleteContactDialog.dialog = true;
        this.deleteContactDialog.id = idContact;
      },
      deleteContact(idContact){
        contacts.deleteContact(this.idUser, idContact).then(result => {
          console.log(result);
          this.getAllContact();
          this.deleteContactDialog.id = '';
          this.deleteContactDialog.dialog = false;
        })
      },
      deleteOrCondition(orIndex){
          this.conditions.splice(orIndex, 1);
          if(this.conditions.length == 0){
            this.firstConditionMenu = true;
          }
      },
      deleteAndCondition(orIndex, andIndex){
          this.conditions[orIndex].splice(andIndex, 1);
          if(this.conditions[orIndex].length == 0){
              this.deleteOrCondition(orIndex);
          }
      },
      addOrCondition(){
          let orConditionExample = []
          this.conditions.push(orConditionExample);
          this.conditions = [...this.conditions];
      },
      addAndCondition(orIndex, property, conditionConstant, value){
          if(conditionConstant == 'IN'){
              var conditionToAdd = {
                  conditionId: null,
                  object: "Contact",
                  property: property,
                  condition: conditionConstant,
                  value: value.split(",")
              }
          }
          else {
              conditionToAdd = {
                  conditionId: null,
                  object: "Contact",
                  property: property,
                  condition: conditionConstant,
                  value: value
              }
          }
          this.conditions[orIndex].push(conditionToAdd);
          this.newCondition.vchipTextField = '';
          this.conditions = [...this.conditions];
      },
      addFirstCondition(property, conditionConstant, value){
        if(conditionConstant == 'IN'){
            var conditionToAdd = {
                conditionId: null,
                object: "Contact",
                property: property,
                condition: conditionConstant,
                value: value.split(",")
            }
        }
        else {
            conditionToAdd = {
                conditionId: null,
                object: "Contact",
                property: property,
                condition: conditionConstant,
                value: value
            }
        }
        let firstOrArray = [];
        firstOrArray.push(conditionToAdd);
        this.conditions.push(firstOrArray);
        this.conditions = [...this.conditions];
        this.createFirstCondition.firstConditionMenu = false;
        this.firstConditionMenu = false;
      },
      getList(){
        listService.getList(this.idUser).then(result => {
          this.lists = result.response;
        }).catch(error => {
          console.log(error)
        })
      },
      setChosenList(index){
        this.conditions = [];
        this.conditions = this.lists[index].conditions;
        this.conditions = [...this.conditions];
        this.firstConditionMenu = false;
      },
      resetFilter(){
        this.conditions = [];
        this.conditions = [...this.conditions];
        this.firstConditionMenu = true;
        this.getAllContact();
      },
      filter(){
        listService.findContactByCondition(this.idUser, this.conditions).then(result => {
          this.allContacts = result.response;
          this.contacts = this.allContacts;
          this.page = 1;
          this.pages = 1;
        }).catch(error => {
          console.log(error);
        })
      },
      createFilter(name, conditions){
        let body = {
          name: name,
          conditions: conditions
        }
        listService.createNewList(this.idUser, body).then(result => {
          this.getList();
          this.saveFilter.name = '';
          this.saveFilter.dialog = false;
        }).catch(error => {
          console.log(error);
        })
      }
    },
    computed: {},
    watch:{
      page(){
        this.contacts = []
        this.getAllContact()
      },
      search(){
        this.contacts = [];
        for (let i = 0; i < this.allContacts.length; i++){
          const name = this.allContacts[i].firstName + ' ' + this.allContacts[i].lastName;
          if(name.toLowerCase().includes(this.search.toLowerCase())){
            this.contacts.push(this.allContacts[i]);
          }
        }
      },

    },
    created() {
      this.getList();
      this.getAllContact()
    }
  }
</script>