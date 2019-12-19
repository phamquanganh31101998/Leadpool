<template>
  <v-content class="mt-4 pl-3 pr-3">
    <v-layout row wrap>
      <v-flex xs12 sm12 md5 lg5 xl5>
        <h1 class="ml-3">Quản lý Leads</h1>
      </v-flex>
      <v-flex xs12 sm12 md7 lg7 xl7>
        <v-layout row>
          <v-flex xs1 sm1 md1 lg1 xl1>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon color="primary" v-on="on" class="mt-4">help</v-icon>
              </template>
              Tìm kiếm (phân biệt chữ thường, chữ hoa và có dấu)
            </v-tooltip>
            
          </v-flex>
          <v-flex xs7 sm7 md7 lg7 xl7>
            <v-text-field label="Nhập từ khóa rồi nhấn Enter để tìm kiếm" v-model="search" @keyup.enter="section = 'search', searchContact() " append-icon="search" single-line hide-details></v-text-field>
          </v-flex>
          <v-flex xs1 sm1 md1 lg1 xl1>
            <v-dialog v-model="uploadFileDialog.dialog" width="400">
              <template v-slot:activator="{ on }">
                <v-btn round dark color="#3E82F7" class="ml-4" v-on="on" >Import</v-btn>
              </template>
              <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                  <span class="headline">Thêm Lead từ file excel</span>
                </v-card-title>
                <v-card-text style="padding: 0px 0px;">
                  <v-layout row>
                    <div class="container">
                      <div>
                        <label><h4  style="font-weight: bold;">Chọn file excel từ máy tính của bạn để thêm lead (Định dạng .xlsx, .xlsm, ...)</h4>
                          <br>
                          <br>
                          <input type="file" value="Click để chọn file để tải lên" id="file" ref="file" v-on:change="handleFileUpload()"/>
                          <br>
                          <br>
                          <a href="https://drive.google.com/uc?export=download&id=17GK6txShIoewWnthjD3tlNB3MvRHJfek" download>Tải file mẫu tại đây</a><v-icon>attach_file</v-icon>
                        </label>
                      </div>
                    </div>
                  </v-layout>
                </v-card-text>
                <v-alert
                  :value="!checkFileExtension(uploadFileDialog.file.name) && uploadFileDialog.file.name != ''"
                  type="error"
                  >
                  File không đúng định dạng của excel
                </v-alert>
                <v-card-actions>
                  <v-btn color="primary" :disabled="!checkFileExtension(uploadFileDialog.file.name)" flat @click="submitFile()">Tải lên</v-btn>
                  <v-btn color="red" flat @click="uploadFileDialog.dialog = false">Đóng</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="uploadResult.dialog" width="60%">
              <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                  <span class="headline">Kết quả</span>
                </v-card-title>
                <v-card-text>
                  <v-layout row>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                      <h2>Thành công: <span style="color: green;">{{uploadResult.SUCCESS.count}}</span></h2>
                      <a @click.stop="uploadResult.SUCCESS.display = !uploadResult.SUCCESS.display">Hiển thị 
                        <v-icon v-if="uploadResult.SUCCESS.display == true">
                          arrow_drop_down
                        </v-icon>
                        <v-icon v-if="uploadResult.SUCCESS.display == false">
                          arrow_drop_up
                        </v-icon>
                      </a>
                      <v-layout row wrap v-if="uploadResult.SUCCESS.display == true">
                          <v-flex xs12 sm12 md3 lg3 xl3 v-for="(success, index) in uploadResult.SUCCESS.description">
                            <p>{{success}}</p>
                          </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                      <h2>Bị trùng: <span style="color: red;">{{uploadResult.DUPLICATE.count}}</span></h2>
                      <a @click.stop="uploadResult.DUPLICATE.display = !uploadResult.DUPLICATE.display">Hiển thị 
                        <v-icon v-if="uploadResult.DUPLICATE.display == true">
                          arrow_drop_down
                        </v-icon>
                        <v-icon v-if="uploadResult.DUPLICATE.display == false">
                          arrow_drop_up
                        </v-icon>
                      </a>
                      <v-layout row wrap v-if="uploadResult.DUPLICATE.display == true">
                          <v-flex xs12 sm12 md3 lg3 xl3 v-for="(dup, index) in uploadResult.DUPLICATE.description">
                            <p>{{dup}}</p>
                          </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                      <h2>Lỗi: <span style="color: red;">{{uploadResult.ERROR.count}}</span></h2>
                      <a @click.stop="uploadResult.ERROR.display = !uploadResult.ERROR.display">Hiển thị 
                        <v-icon v-if="uploadResult.ERROR.display == true">
                          arrow_drop_down
                        </v-icon>
                        <v-icon v-if="uploadResult.ERROR.display == false">
                          arrow_drop_up
                        </v-icon>
                      </a>
                      <v-layout row wrap v-if="uploadResult.ERROR.display == true">
                          <v-flex xs12 sm12 md3 lg3 xl3 v-for="(err, index) in uploadResult.ERROR.description">
                            <p>{{err}}</p>
                          </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                      <h2>Thất bại: <span style="color: red;">{{uploadResult.FAIL.count}}</span></h2>
                      <a @click.stop="uploadResult.FAIL.display = !uploadResult.FAIL.display">Hiển thị 
                        <v-icon v-if="uploadResult.FAIL.display == true">
                          arrow_drop_down
                        </v-icon>
                        <v-icon v-if="uploadResult.FAIL.display == false">
                          arrow_drop_up
                        </v-icon>
                      </a>
                      <v-layout row wrap v-if="uploadResult.FAIL.display == true">
                          <v-flex xs12 sm12 md3 lg3 xl3 v-for="(fail, index) in uploadResult.FAIL.description">
                            <p>{{fail}}</p>
                          </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="red" flat @click="uploadResult.dialog = false">Đóng</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
          <v-dialog v-model="uploadFileDialog.resultDialog">
            <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                  <span class="headline">Kết quả Import</span>
                </v-card-title>
                <v-card-text style="padding: 0px 0px;">
                  <v-layout row>
                    Thành công: {{}}
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="red" flat @click="uploadFileDialog.uploadFileDialog.resultDialog = false">Đóng</v-btn>
                </v-card-actions>
              </v-card>
          </v-dialog>
          <v-flex xs2 sm2 md2 lg2 xl2 class="ml-4">
            <v-dialog v-model="checkInfo" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn round dark color="#3E82F7" class="ml-4" v-on="on" > <v-icon>person_add</v-icon> Tạo Lead mới</v-btn>
              </template>
              <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                  <span class="headline">  Tạo Lead mới</span>
                </v-card-title>
                <v-card-text style="padding: 0px 16px;">
                  <v-form v-model="valid">
                    <v-container grid-list-xl>
                      <v-layout wrap>
                        <v-flex xs12 md12 lg12 xl12 style="padding: 0px 16px;">
                          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 lg12 xl12 style="padding: 0px 16px;">
                          <v-text-field v-model="lastname" :rules="nameRules" label="Họ" required>
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 lg12 xl12 style="padding: 0px 16px;">
                          <v-text-field v-model="firstname" :rules="nameRules" label="Tên" required>
                          </v-text-field>
                        </v-flex>
                        
                        <v-flex xs12 md12 lg12 xl12 style="padding: 0px 16px;">
                          
                          <v-text-field v-model="phone" type="number" label="Số điện thoại" required :rules="phoneRules">
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 lg12 xl12 style="padding: 0px 16px;">
                          <span><h3>Vòng đời</h3></span>
                          <v-select solo v-model="lifecycleStage" :items="lifecycleStages" :rules="[v => !!v || 'Chưa chọn']"
                            label="Vòng đời" required></v-select>
                        </v-flex>
                        <v-flex xs12 md12 lg12 xl12 style="padding: 0px 16px;">
                          <span><h3>Dịch vụ</h3></span>
                          <v-select solo v-model="service" :items="allService"></v-select>
                        </v-flex>
                        <v-flex xs12 md12 lg12 xl12 style="padding: 0px 16px;" class="mb-4">
                          <span><h3>Thành phố</h3></span>
                          <!-- <v-select label="Thành phố" v-model="city" :items="cities" :rules="[v => !!v || 'Chưa chọn']"></v-select> -->
                          <model-select :options="cities" v-model="city" label="Chọn thành phố"></model-select>
                        </v-flex>
                        <v-flex xs12 md12 lg12 xl12 style="padding: 0px 16px;">
                          <span class="mt-4"><h3>Ngành nghề</h3></span>
                          <v-layout row wrap>
                            <v-flex xs12 sm12 md12 lg12 xl12>
                              <v-select solo label="Ngành nghề" v-model="bussiness" :items="allBussiness" @change="changeBussiness(bussiness)"></v-select>
                            </v-flex>
                            <!-- <v-flex xs4 sm4 md4 lg4 xl4>
                              <v-checkbox v-model="isOtherBussiness" label="Ngành nghề khác:"></v-checkbox>
                            </v-flex> -->
                            <v-flex xs12 sm12 md12 lg12 xl12>
                              <v-text-field v-if="isOtherBussiness" v-model="otherBussinessValue" placeholder="Nhập ngành nghề khác"></v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" flat @click="createContacts" :disabled="createWaiting || !valid">Tạo</v-btn>
                  <v-btn color="red" flat @click="checkInfo = false">Đóng</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider class="mt-3" :divider="divider"></v-divider>
    <v-layout row>
      <v-flex xs12 sm4 md2 lg2 xl2>
        <v-list>
          <v-list-tile v-if="viewRole == 'ROLE_CONTACT_VIEW_EVERYTHING'  || isSysAdmin == true" @click="section = 'allContact', page = 1, getAllContact(), search=''">
            <v-list-tile-title>Tất cả các Lead</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="section = 'myContact', page = 1, getMyContact(), search=''">
            <v-list-tile-title>Các Lead của tôi</v-list-tile-title>
          </v-list-tile>
          <template v-for="filter in filters">
            <v-list-tile @click="filterId = filter.contactConditionGroupId">
              <v-list-tile-title>{{filter.name}}</v-list-tile-title>
            </v-list-tile>
          </template>
          <!-- <v-list-tile>
            <v-list-tile-content>
              <h4>Các bộ lọc hiện có</h4>
              <v-select label="Chọn bộ lọc" v-model="filterId" :items="filters" item-text="name" item-value="contactConditionGroupId"></v-select>
            </v-list-tile-content>
          </v-list-tile> -->
        </v-list>
        <v-divider divider="true" class="mr-3"></v-divider>
        <template v-if="!firstConditionMenu">
          <v-card class="mr-3">
            <v-card-text>
                <h3>Bộ lọc kết quả</h3>
                <br>
                <v-text-field :rules="nameRules" label="Tên bộ lọc" v-model="filterName"></v-text-field>
                <template v-for="(orCondition, orIndex) in conditions">
                    <v-card flat>
                        <v-card-text style="padding: 0px 0px; margins: 0px 0px">
                          <template v-for="(andCondition, andIndex) in orCondition">
                            <v-card flat style="border: 1px solid #7C98B6; background-color: #F5F8FA">
                              <v-card-text style="padding: 8px 8px;">
                                    <v-layout row>
                                        <v-flex xs9 sm9 md9 lg9 xl9 class="pt-2">
                                            <p v-if="andCondition.condition == 'IN'"><span style="font-weight: bold;">{{getPropertyName(andCondition.property)}}</span> có trong 
                                                <template v-for="val in andCondition.value">
                                                    <v-chip>{{val}}</v-chip>
                                                </template>
                                            </p>
                                            <p v-if="andCondition.condition == 'EQUAL'"><span style="font-weight: bold;">{{getPropertyName(andCondition.property)}}</span> là <span style="font-weight: bold;">{{andCondition.value}}</span></p>
                                            <p v-if="andCondition.condition == 'LIKE'"><span style="font-weight: bold;">{{getPropertyName(andCondition.property)}}</span> chứa <span style="font-weight: bold;">{{andCondition.value}}</span></p>
                                            <p v-if="andCondition.condition == 'GREAT_THAN'"><span style="font-weight: bold;">{{getPropertyName(andCondition.property)}}</span> lớn hơn <span style="font-weight: bold;">{{andCondition.value}}</span></p>
                                            <p v-if="andCondition.condition == 'LESS_THAN'"><span style="font-weight: bold;">{{getPropertyName(andCondition.property)}}</span> nhỏ hơn <span style="font-weight: bold;">{{andCondition.value}}</span></p>
                                        </v-flex>
                                        <v-flex xs3 sm3 md3 lg3 xl3>
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
                            <br>
                          </template>
                            
                        </v-card-text>
                        <v-card-actions style="padding: 8px 8px; margins: 0px 0px">
                            <v-menu v-model="newCondition.menu" :close-on-content-click="false" :nudge-width="100" offset-x max-width="400">
                                <template v-slot:activator="{ on }">
                                    <v-btn class="blue" outline round style="color: blue;" v-on="on"><v-icon>add</v-icon>Thêm điều kiện</v-btn>
                                </template>
                                <v-card style="width: 100%;">
                                    <v-card-text>
                                        <v-layout row wrap>
                                            <v-flex xs6 sm6 md6 lg6 xl6>
                                                <v-select :items="newCondition.contactProperties" label="Thuộc tính" v-model="newCondition.chosenProperty" @input="newCondition.chosenConstant = 'LIKE', newCondition.value = ''"></v-select>
                                            </v-flex>
                                            <br>
                                            <v-flex xs6 sm6 md6 lg6 xl6>
                                                <v-select v-if="newCondition.chosenProperty == 'lifecycle_stage' || newCondition.chosenProperty == 'city' || newCondition.chosenProperty == 'bussiness' || newCondition.chosenProperty == 'service'" 
                                                  :items="[{text: 'chứa từ khóa', value: 'LIKE'}, {text: 'là', value: 'EQUAL'}, {text: 'có trong', value: 'IN'}]" 
                                                  label="Chọn điều kiện lọc" v-model="newCondition.chosenConstant"></v-select>
                                                <v-select v-if="newCondition.chosenProperty == 'contact_owner' || newCondition.chosenProperty == 'phone' || newCondition.chosenProperty == 'email'" 
                                                  :items="[{text: 'chứa từ khóa', value: 'LIKE'}, {text: 'có trong', value: 'IN'}]" 
                                                  label="Chọn điều kiện lọc" v-model="newCondition.chosenConstant"></v-select>
                                            </v-flex>
                                            <br>
                                            <template v-if="newCondition.chosenProperty == 'lifecycle_stage'">
                                              <template v-if="newCondition.chosenConstant == 'IN'">
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-select label="Chọn giá trị" :items="lifecycleStages" multiple chips v-model="newCondition.chosenLifecycleStageValue"></v-select>
                                                    <v-btn :disabled="newCondition.chosenLifecycleStageValue.length == 0"  class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, 'lifecycle_stage', 'IN', newCondition.chosenLifecycleStageValue, true)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                              <template v-else-if="newCondition.chosenConstant == 'LIKE'">
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-text-field label="Nhập từ khóa" v-model="newCondition.value"></v-text-field>
                                                    <v-btn :disabled="newCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, 'lifecycle_stage', 'LIKE', newCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                              <template v-else>
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-select :items="lifecycleStages" v-model="newCondition.chosenLifecycleStage" label="Chọn giá trị"></v-select>
                                                    <v-btn class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, 'lifecycle_stage', newCondition.chosenConstant, newCondition.chosenLifecycleStage, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                            </template>
                                            <template v-else-if="newCondition.chosenProperty == 'contact_owner'">
                                              <template v-if="newCondition.chosenConstant == 'IN'">
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-text-field label="Nhập các tài khoản cần tìm kiếm, phân tách nhau bằng dấu phẩy" v-model="newCondition.value"></v-text-field>
                                                    <v-btn :disabled="newCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, 'contact_owner', 'IN', newCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                              <template v-else>
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-text-field label="Nhập từ khóa" v-model="newCondition.value"></v-text-field>
                                                    <v-btn :disabled="newCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, 'contact_owner', 'LIKE', newCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                            </template>
                                            <template v-else-if="newCondition.chosenProperty == 'phone'">
                                              <template v-if="newCondition.chosenConstant == 'IN'">
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                  <v-form v-model="newCondition.checkValidInPhone">
                                                    <v-text-field :rules="phoneSearchInRules" label="Nhập các số điện thoại cần tìm kiếm, phân tách nhau bằng dấu phẩy" v-model="newCondition.value"></v-text-field>
                                                  </v-form>
                                                  <v-btn :disabled="!newCondition.checkValidInPhone"  class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, 'phone', 'IN', newCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                              <template v-else>
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-text-field type="number" label="Nhập từ khóa" v-model="newCondition.value"></v-text-field>
                                                    <v-btn :disabled="newCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, 'phone', 'LIKE', newCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                            </template>
                                            <template v-else-if="newCondition.chosenProperty == 'email'">
                                              <template v-if="newCondition.chosenConstant == 'IN'">
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-text-field label="Nhập các email cần tìm kiếm, phân tách nhau bằng dấu phẩy" v-model="newCondition.value"></v-text-field>
                                                    <v-btn :disabled="newCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, 'email', 'IN', newCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                              <template v-else>
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-text-field label="Nhập từ khóa" v-model="newCondition.value"></v-text-field>
                                                    <v-btn :disabled="newCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, 'email', 'LIKE', newCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                            </template>
                                            <template v-else-if="newCondition.chosenProperty == 'city'">
                                              <template v-if="newCondition.chosenConstant == 'IN'">
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-select label="Chọn giá trị" :items="cities" multiple chips v-model="newCondition.chosenCities"></v-select>
                                                    <v-btn :disabled="newCondition.chosenCities.length == 0"  class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, 'city', 'IN', newCondition.chosenCities, true)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                              <template v-else-if="newCondition.chosenConstant == 'LIKE'">
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-text-field label="Nhập từ khóa" v-model="newCondition.value"></v-text-field>
                                                    <v-btn :disabled="newCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, 'city', 'LIKE', newCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                              <template v-else>
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-select :items="cities" v-model="newCondition.chosenCity" label="Chọn giá trị"></v-select>
                                                    <v-btn class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, 'city', newCondition.chosenConstant, newCondition.chosenCity, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                            </template>
                                            <template v-else-if="newCondition.chosenProperty == 'bussiness'">
                                              <template v-if="newCondition.chosenConstant == 'IN'">
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-select label="Chọn giá trị" :items="allBussiness" multiple chips v-model="newCondition.chosenBussinesses"></v-select>
                                                    <v-btn :disabled="newCondition.chosenBussinesses.length == 0"  class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, 'bussiness', 'IN', newCondition.chosenBussinesses, true)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                              <template v-else-if="newCondition.chosenConstant == 'LIKE'">
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-text-field label="Nhập từ khóa" v-model="newCondition.value"></v-text-field>
                                                    <v-btn :disabled="newCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, 'bussiness', 'LIKE', newCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                              <template v-else>
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-select :items="allBussiness" v-model="newCondition.chosenBussiness" label="Chọn giá trị"></v-select>
                                                    <v-btn class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, 'bussiness', newCondition.chosenConstant, newCondition.chosenBussiness, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                            </template>
                                            <template v-else-if="newCondition.chosenProperty == 'service'">
                                              <template v-if="newCondition.chosenConstant == 'IN'">
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-select label="Chọn giá trị" :items="allService" multiple chips v-model="newCondition.chosenServices"></v-select>
                                                    <v-btn :disabled="newCondition.chosenServices.length == 0"  class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, newCondition.chosenProperty, 'IN', newCondition.chosenServices, true)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                              <template v-else-if="newCondition.chosenConstant == 'LIKE'">
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-text-field label="Nhập từ khóa" v-model="newCondition.value"></v-text-field>
                                                    <v-btn :disabled="newCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, newCondition.chosenProperty, 'LIKE', newCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                              <template v-else>
                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                    <v-select :items="allService" v-model="newCondition.value" label="Chọn giá trị"></v-select>
                                                    <v-btn :disabled="newCondition.value.length == 0" class="blue" outline round style="color: blue;" @click="addAndCondition(orIndex, newCondition.chosenProperty, newCondition.chosenConstant, newCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                </v-flex>
                                              </template>
                                            </template>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-card-text>
          </v-card>
          <br>
          <v-layout row wrap>
            <v-flex>
              <v-btn style="backgroundColor: #425B76" dark @click="filter()">Lọc</v-btn>
            </v-flex>
            <v-flex>
              <v-btn v-if="filterId != ''" @click="updateFilter(filterId)">Cập nhật</v-btn>
              <v-btn v-else :disabled="filterName ==''" @click="createFilter(filterName, conditions)">Tạo mới</v-btn>
            </v-flex>
            <v-flex>
              <v-btn color="error" v-if="filterId != ''" @click="deleteFilterDialog = true">Xóa bộ lọc</v-btn>
            </v-flex>
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
          <!-- first condition -->
          <v-menu v-model="createFirstCondition.firstConditionMenu" :close-on-content-click="false" :nudge-width="100" offset-x max-width="400">
              <template v-slot:activator="{ on }">
                  <a v-on="on" style="color: #1976D2"><v-icon>add</v-icon> Tìm kiếm Lead theo điều kiện</a>
              </template>
              <v-card style="width: 100%;">
                  <v-card-text>
                      <v-layout row wrap>
                          <v-flex xs6 sm6 md6 lg6 xl6>
                              <v-select :items="createFirstCondition.contactProperties" label="Chọn thuộc tính" v-model="createFirstCondition.chosenProperty" @input="createFirstCondition.chosenConstant = 'LIKE', createFirstCondition.value = ''"></v-select>
                          </v-flex>
                          <br>
                          <v-flex xs6 sm6 md6 lg6 xl6>
                              <v-select v-if="createFirstCondition.chosenProperty == 'lifecycle_stage' || createFirstCondition.chosenProperty == 'city' || createFirstCondition.chosenProperty == 'bussiness' || createFirstCondition.chosenProperty == 'service'" 
                                :items="[{text: 'chứa từ khóa', value: 'LIKE'}, {text: 'là', value: 'EQUAL'}, {text: 'có trong', value: 'IN'}]" 
                                label="Chọn điều kiện lọc" v-model="createFirstCondition.chosenConstant"></v-select>
                              <v-select v-if="createFirstCondition.chosenProperty == 'contact_owner' || createFirstCondition.chosenProperty == 'phone' || createFirstCondition.chosenProperty == 'email'" 
                                :items="[{text: 'chứa từ khóa', value: 'LIKE'}, {text: 'có trong', value: 'IN'}]" 
                                label="Chọn điều kiện lọc" v-model="createFirstCondition.chosenConstant"></v-select>
                          </v-flex>
                          <br>
                          <template v-if="createFirstCondition.chosenProperty == 'lifecycle_stage'">
                            <template v-if="createFirstCondition.chosenConstant == 'IN'">
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-select label="Chọn giá trị" :items="lifecycleStages" multiple chips v-model="createFirstCondition.chosenLifecycleStageValue"></v-select>
                                  <v-btn :disabled="createFirstCondition.chosenLifecycleStageValue.length == 0"  class="blue" outline round style="color: blue;" @click="addFirstCondition('lifecycle_stage', 'IN', createFirstCondition.chosenLifecycleStageValue, true)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                            <template v-else-if="createFirstCondition.chosenConstant == 'LIKE'">
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-text-field label="Nhập từ khóa" v-model="createFirstCondition.value"></v-text-field>
                                  <v-btn :disabled="createFirstCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addFirstCondition('lifecycle_stage', 'LIKE', createFirstCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                            <template v-else>
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-select :items="lifecycleStages" v-model="createFirstCondition.chosenLifecycleStage" label="Chọn giá trị"></v-select>
                                  <v-btn class="blue" outline round style="color: blue;" @click="addFirstCondition('lifecycle_stage', createFirstCondition.chosenConstant, createFirstCondition.chosenLifecycleStage, false)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                          </template>
                          <template v-else-if="createFirstCondition.chosenProperty == 'contact_owner'">
                            <template v-if="createFirstCondition.chosenConstant == 'IN'">
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-text-field label="Nhập các tài khoản cần tìm kiếm, phân tách nhau bằng dấu phẩy" v-model="createFirstCondition.value"></v-text-field>
                                  <v-btn :disabled="createFirstCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addFirstCondition('contact_owner', 'IN', createFirstCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                            <template v-else>
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-text-field label="Nhập từ khóa" v-model="createFirstCondition.value"></v-text-field>
                                  <v-btn :disabled="createFirstCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addFirstCondition('contact_owner', 'LIKE', createFirstCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                          </template>
                          <template v-else-if="createFirstCondition.chosenProperty == 'phone'">
                            <template v-if="createFirstCondition.chosenConstant == 'IN'">
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                <v-form v-model="createFirstCondition.checkValidInPhone">
                                  <v-text-field :rules="phoneSearchInRules" label="Nhập các số điện thoại cần tìm kiếm, phân tách nhau bằng dấu phẩy" v-model="createFirstCondition.value"></v-text-field>
                                </v-form>
                                <v-btn :disabled="!createFirstCondition.checkValidInPhone"  class="blue" outline round style="color: blue;" @click="addFirstCondition(createFirstCondition.chosenProperty, createFirstCondition.chosenConstant, createFirstCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                            <template v-else>
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-text-field label="Nhập từ khóa" type="number" v-model="createFirstCondition.value"></v-text-field>
                                  <v-btn :disabled="createFirstCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addFirstCondition(createFirstCondition.chosenProperty, createFirstCondition.chosenConstant, createFirstCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                          </template>
                          <template v-else-if="createFirstCondition.chosenProperty == 'email'">
                            <template v-if="createFirstCondition.chosenConstant == 'IN'">
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-text-field label="Nhập các email cần tìm kiếm, phân tách nhau bằng dấu phẩy" v-model="createFirstCondition.value"></v-text-field>
                                  <v-btn :disabled="createFirstCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addFirstCondition('email', 'IN', createFirstCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                            <template v-else>
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-text-field label="Nhập từ khóa" v-model="createFirstCondition.value"></v-text-field>
                                  <v-btn :disabled="createFirstCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addFirstCondition('email', 'LIKE', createFirstCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                          </template>
                          <template v-else-if="createFirstCondition.chosenProperty == 'city'">
                            <template v-if="createFirstCondition.chosenConstant == 'IN'">
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-select label="Chọn giá trị" :items="cities" multiple chips v-model="createFirstCondition.chosenCities"></v-select>
                                  <v-btn :disabled="createFirstCondition.chosenCities.length == 0"  class="blue" outline round style="color: blue;" @click="addFirstCondition('city', 'IN', createFirstCondition.chosenCities, true)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                            <template v-else-if="createFirstCondition.chosenConstant == 'LIKE'">
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-text-field label="Nhập từ khóa" v-model="createFirstCondition.value"></v-text-field>
                                  <v-btn :disabled="createFirstCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addFirstCondition('city', 'LIKE', createFirstCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                            <template v-else>
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-select :items="cities" v-model="createFirstCondition.chosenCity" label="Chọn giá trị"></v-select>
                                  <v-btn class="blue" outline round style="color: blue;" @click="addFirstCondition('city', createFirstCondition.chosenConstant, createFirstCondition.chosenCity, false)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                          </template>
                          <template v-else-if="createFirstCondition.chosenProperty == 'bussiness'">
                            <template v-if="createFirstCondition.chosenConstant == 'IN'">
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-select label="Chọn giá trị" :items="allBussiness" multiple chips v-model="createFirstCondition.chosenBussinesses"></v-select>
                                  <v-btn :disabled="createFirstCondition.chosenBussinesses.length == 0"  class="blue" outline round style="color: blue;" @click="addFirstCondition('bussiness', 'IN', createFirstCondition.chosenBussinesses, true)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                            <template v-else-if="createFirstCondition.chosenConstant == 'LIKE'">
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-text-field label="Nhập từ khóa" v-model="createFirstCondition.value"></v-text-field>
                                  <v-btn :disabled="createFirstCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addFirstCondition('bussiness', 'LIKE', createFirstCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                            <template v-else>
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-select :items="allBussiness" v-model="createFirstCondition.chosenBussiness" label="Chọn giá trị"></v-select>
                                  <v-btn class="blue" outline round style="color: blue;" @click="addFirstCondition('bussiness', createFirstCondition.chosenConstant, createFirstCondition.chosenBussiness, false)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                          </template>
                          <template v-else-if="createFirstCondition.chosenProperty == 'service'">
                            <template v-if="createFirstCondition.chosenConstant == 'IN'">
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-select label="Chọn giá trị" :items="allService" multiple chips v-model="createFirstCondition.chosenServices"></v-select>
                                  <v-btn :disabled="createFirstCondition.chosenServices.length == 0"  class="blue" outline round style="color: blue;" @click="addFirstCondition(createFirstCondition.chosenProperty, 'IN', createFirstCondition.chosenServices, true)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                            <template v-else-if="createFirstCondition.chosenConstant == 'LIKE'">
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-text-field label="Nhập từ khóa" v-model="createFirstCondition.value"></v-text-field>
                                  <v-btn :disabled="createFirstCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addFirstCondition(createFirstCondition.chosenProperty, 'LIKE', createFirstCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                            <template v-else>
                              <v-flex xs12 sm12 md12 lg12 xl12>
                                  <v-select :items="allService" v-model="createFirstCondition.value" label="Chọn giá trị"></v-select>
                                  <v-btn :disabled="createFirstCondition.value.length == 0" class="blue" outline round style="color: blue;" @click="addFirstCondition(createFirstCondition.chosenProperty, createFirstCondition.chosenConstant, createFirstCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                              </v-flex>
                            </template>
                          </template>
                      </v-layout>
                  </v-card-text>
              </v-card>
          </v-menu>
        </template>
      </v-flex>
      <v-flex xs12 sm8 md10 lg10 xl10>
        <v-data-table v-if="section == 'allContact' || section == 'myContact'" :custom-sort="customSort" :loading="loadingTable" style="width: 100%" :headers="headers" :items="contacts" hide-actions class="elevation-1" no-data-text="Không có kết quả nào phù hợp">
          <template v-slot:items="props">
              <tr>
              <!-- <td><router-link :to="takeLink(props.item.contactId)">{{ props.item.lastName }} {{ props.item.firstName }}</router-link></td> -->
                <td><a @click="$router.push(takeLink(props.item.contactId))">{{ props.item.fullname }}</a></td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{ props.item.phone }}</td>
                <td class="text-xs-left">{{ props.item.lifecycleStage }}</td>
                <td class="text-xs-left">{{ props.item.contactOwner }}</td>
                <td class="text-xs-left">{{ props.item.city }}</td>
                <td class="text-xs-left">{{ props.item.bussiness }}</td>
                <td class="text-xs-left">{{ props.item.service }}</td>
                <v-menu>
                  <template v-slot:activator="{ on }">
                      <td class="text-xs-right" ><v-btn flat fab small v-on="on"><v-icon>more_vert</v-icon></v-btn> </td>
                  </template>
                  <v-list>
                    <v-list-tile @click="$router.push(takeLink(props.item.contactId))">
                      <v-list-tile-content>Xem chi tiết</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="canDelete(props.item.contactOwner)" @click="confirmDeleteContact(props.item.contactId)">
                      <v-list-tile-content>Xóa Lead</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-menu>
            </tr>
          </template>
        </v-data-table>
        <v-data-table v-else-if="section == 'filter'" :loading="loadingTable" style="width: 100%" :headers="headers" :items="contacts" hide-actions class="elevation-1" no-data-text="Không có kết quả nào phù hợp">
          <template v-slot:items="props">
              <tr>
              <!-- <td><router-link :to="takeLink(props.item.contactId)">{{ props.item.lastName }} {{ props.item.firstName }}</router-link></td> -->
                <td><a @click="$router.push(takeLink(props.item.contactId))">{{ props.item.fullname }}</a></td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{ props.item.phone }}</td>
                <td class="text-xs-left">{{ props.item.lifecycleStage }}</td>
                <td class="text-xs-left">{{ props.item.contactOwner }}</td>
                <td class="text-xs-left">{{ props.item.city }}</td>
                <td class="text-xs-left">{{ props.item.bussiness }}</td>
                <td class="text-xs-left">{{ props.item.service }}</td>
                <v-menu>
                  <template v-slot:activator="{ on }">
                      <td class="text-xs-right" ><v-btn flat fab small v-on="on"><v-icon>more_vert</v-icon></v-btn> </td>
                  </template>
                  <v-list>
                    <v-list-tile @click="$router.push(takeLink(props.item.contactId))">
                      <v-list-tile-content>Xem chi tiết</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="canDelete(props.item.contactOwner)" @click="confirmDeleteContact(props.item.contactId)">
                      <v-list-tile-content>Xóa Lead</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-menu>
            </tr>
          </template>
        </v-data-table>
        <v-data-table v-else :loading="loadingTable" style="width: 100%" :headers="headersSearch" :items="contacts" hide-actions class="elevation-1" no-data-text="Không có kết quả nào phù hợp">
          <template v-slot:items="props">
              <tr>
              <!-- <td><router-link :to="takeLink(props.item.contactId)">{{ props.item.lastName }} {{ props.item.firstName }}</router-link></td> -->
                <td><a @click="$router.push(takeLink(props.item.contactId))">{{ props.item.fullname }}</a></td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{ props.item.phone }}</td>
                <td class="text-xs-left">{{ props.item.lifecycleStage }}</td>
                <td class="text-xs-left">{{ props.item.contactOwner }}</td>
                <td class="text-xs-left">{{ props.item.city }}</td>
                <td class="text-xs-left">{{ props.item.bussiness }}</td>
                <td class="text-xs-left">{{ props.item.service }}</td>
                <v-menu>
                  <template v-slot:activator="{ on }">
                      <td class="text-xs-right" ><v-btn flat fab small v-on="on"><v-icon>more_vert</v-icon></v-btn> </td>
                  </template>
                  <v-list>
                    <v-list-tile @click="$router.push(takeLink(props.item.contactId))">
                      <v-list-tile-content>Xem chi tiết</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="canDelete(props.item.contactOwner)" @click="confirmDeleteContact(props.item.contactId)">
                      <v-list-tile-content>Xóa Lead</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-menu>
            </tr>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination :total-visible="7" v-model="page" :length="pages"></v-pagination>
        </div>
        <br>
        <br>
      </v-flex>
    </v-layout>
    <v-dialog v-model="deleteFilterDialog" @click:outside="deleteFilterDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
      <v-card tile>
        <v-toolbar card dark color="red">
          <v-toolbar-title>Xóa?</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            Bạn có chắc chắn muốn xóa bộ lọc này?
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="red" @click="deleteFilter(filterId)">Xóa</v-btn>
          <v-btn flat color="primary" @click="deleteFilterDialog = false">Quay lại</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          <v-btn flat color="primary" @click="deleteContactDialog.dialog = false, deleteContactDialog.id = ''">Quay lại</v-btn>
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
                Đã có lỗi xảy ra khi lấy danh sách Lead. Xin hãy thử lại.
            </v-card-text>
            <v-card-actions>
            <v-btn flat color="red" @click="failDialog = false">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="createFailDialog" @click:outside="createFailDialog = false, createFailResponse = ''" transition="dialog-bottom-transition" scrollable width="30%">
        <v-card tile>
            <v-toolbar card dark color="red">
                <v-toolbar-title>Thất bại</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                {{createFailResponse}}
            </v-card-text>
            <v-card-actions>
            <v-btn flat color="red" @click="createFailDialog = false, createFailResponse = ''">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="cannotDeleteDialog" @click:outside="cannotDeleteDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
        <v-card tile>
            <v-toolbar card dark color="red">
                <v-toolbar-title>Thất bại</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                Không thể xóa Lead thuộc quyền sở hữu của người khác
            </v-card-text>
            <v-card-actions>
            <v-btn flat color="red" @click="cannotDeleteDialog = false">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-content>
</template>
<script>
  const axios = require('axios');
  function validateFormOnSubmit(theForm) {
      console.log(theForm)
      return false;
  }
  import {authHeader} from '../../helpers/auth-header'
  import config from '../../config'
  import UploadButton from 'vuetify-upload-button';
  import accountAPI from '../../services/accountsetting.service'
  import { ModelSelect } from 'vue-search-select'
  import moment from 'moment'
  import contacts from '../../services/contacts.service'
  import contactsService from '../../services/contacts.service';
  import listService from '../../services/list.services'
  import serviceAPI from '../../services/service.service'
  import filterAPI from '../../services/filter.service'
  export default {
    props: {
			idUser: {
				type: String,
				default: null,
      },
    },
    data: () => ({
      uploadResult: {
        dialog: false,
        SUCCESS: {
          display: false,
          count: 0,
          description: []
        },
        DUPLICATE: {
          display: false,
          count: 0,
          description: []
        },
        ERROR: {
          display: false,
          count: 0,
          description: []
        },
        FAIL: {
          display: false,
          count: 0,
          description: []
        },
      },
      filters: [],
      filterId: '',
      filterName: '',
      deleteFilterDialog: false,
      loadingTable: false,
      sortContact: {
        contactProperties: 
          [
              {
                  text: 'Tên',
                  value: 'firstName'
              },
              {
                  text: 'Họ',
                  value: 'lastName'
              },
              {
                  text: 'Vòng đời',
                  value: 'lifecycleStage'
              },
              {
                  text: 'Tài khoản sở hữu',
                  value: 'contactOwner'
              },
              {
                  text: 'Số điện thoại',
                  value: 'phone'
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
              },
              {
                  text: 'Dịch vụ',
                  value: 'service'
              }
          ],
        property: 'lastName',
        orderBy: [
          {
            text: 'Tăng dần',
            value: 'ASC'
          },
          {
            text: 'Giảm dần',
            value: 'DSC'
          }
        ],
        order: 'ASC'
      },
      allService: [],
      service: '',
      isOtherBussiness: false,
      otherBussinessValue: '',
      cannotDeleteDialog: false,
      currentUser: null,
      logoutDialog: false,
      section: 'allContact',
      createFailDialog: false,
      createFailResponse: 'Đã có lỗi xảy ra khi tạo Lead. Xin hãy thử lại',
      createWaiting: false,
      failDialog: false,
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
        v => !!v || 'Không được để trống',
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
        'Marketing Qualified Lead',
        'Sales Qualified Lead',
        'Opportunity',
        'Customer',
        'Evangelist',
        'Other'
      ],
      cities: [],
      city: '',
      allBussiness: ['Giáo dục (Trường ĐH, cao đẳng, TT ngoại ngữ', 'Đồ gia dụng (Điện tử, điện lạnh, đồ dùng bếp...)', 'Dịch vụ (Pháp lí, kế toán, sửa chữa...)', 'Bất động sản',
        'Nội thất', 'Thương mại điện tử', 'Mỹ phẩm', 'Du học/ Định cư', 'Làm đẹp (Spa, salon, thẩm mỹ viện,...)', 'Thời trang (Quần áo, giày dép, túi xách...)',
        'Chăn ga gối đệm', 'Hàng tiêu dùng', 'Xây dựng (Thi công, thiết kế, nội thất)', 'Sức khỏe (Dược, phòng khám, bệnh viện, thiết bị y tế...)', 'Du lịch', 'Phần mềm',
        'Bảo hiểm', 'Thiết bị chiếu sáng (Đèn trần, đèn led,...)', 'Tài chính', 'Nông, Lâm, Thủy sản', 'Khác'],
      bussiness: 'Giáo dục (Trường ĐH, cao đẳng, TT ngoại ngữ',
      divider: true,
      dialog: false,
      search: '',
      notifications: false,
      sound: true,
      phone: '',
      phoneSearchInRules: [
        v => !!v || 'Không được để trống',
        v => /^[0-9\+,\s]*$/.test(v) || 'Chỉ được nhập số và dấu phẩy'
      ],
      phoneRules: [
        v => !!v || 'Chưa nhập số điện thoại',
        // v => v.length > 2 || 'Tối thiểu 3 kí tự',
        // v => /^\d{1,}$/.test(v) || 'Không đúng cú pháp'
        v => /^[0-9\+]{3,15}$/.test(v) || 'Chỉ được nhập số, từ 3 - 15 kí tự, (có thể bắt đầu bằng dấu +) '
      ],
      widgets: false,
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      headers: [{
          text: 'TÊN',
          align: 'left',
          value: 'fullname',
          // sortable: false
        },
        {
          text: 'EMAIL',
          align: 'left',
          value: 'email',
          // sortable: false
        },
        {
          text: 'SỐ ĐIỆN THOẠI',
          align: 'left',
          value: 'phone',
          // sortable: false
        },
        {
          text: 'VÒNG ĐỜI',
          align: 'left',
          value: 'lifecycleStage',
          // sortable: false
        },
        {
          text: 'TÀI KHOẢN SỞ HỮU',
          align: 'left',
          value: 'contactOwner',
          // sortable: false
        },
        {
          text: 'THÀNH PHỐ',
          align: 'left',
          value: 'city',
          // sortable: false
        },
        {
          text: 'NGÀNH NGHỀ',
          align: 'left',
          value: 'bussiness',
          // sortable: false
        },
        {
          text: 'DỊCH VỤ',
          align: 'left',
          value: 'service',
          // sortable: false
        },
        {
          text: 'HÀNH ĐỘNG',
          align: 'right',
          value: 'delete',
          sortable: false
        }
      ],
      headersSearch: [{
          text: 'TÊN',
          align: 'left',
          value: 'fullname',
          sortable: false
        },
        {
          text: 'EMAIL',
          align: 'left',
          value: 'email',
          sortable: false
        },
        {
          text: 'SỐ ĐIỆN THOẠI',
          align: 'left',
          value: 'phone',
          sortable: false
        },
        {
          text: 'VÒNG ĐỜI',
          align: 'left',
          value: 'lifecycleStage',
          sortable: false
        },
        {
          text: 'TÀI KHOẢN SỞ HỮU',
          align: 'left',
          value: 'contactOwner',
          sortable: false
        },
        {
          text: 'THÀNH PHỐ',
          align: 'left',
          value: 'city',
          sortable: false
        },
        {
          text: 'NGÀNH NGHỀ',
          align: 'left',
          value: 'bussiness',
          sortable: false
        },
        {
          text: 'DỊCH VỤ',
          align: 'left',
          value: 'service',
          sortable: false
        },
        {
          text: 'HÀNH ĐỘNG',
          align: 'right',
          value: 'delete',
          sortable: false
        }
      ],
      contacts: [],
      allContacts: [],
      allEmail: [],
      page: 1,
      pages: 0,
      deleteDialog: false,
      conditions: [],
      newCondition: {
        contactProperties: [
            {
                text: 'Vòng đời',
                value: 'lifecycle_stage'
            },
            {
                text: 'Tài khoản sở hữu',
                value: 'contact_owner'
            },
            {
                text: 'Số điện thoại',
                value: 'phone'
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
            },
            {
                text: 'Dịch vụ',
                value: 'service'
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
        chosenServices: [],
        checkValidInPhone: false,
        chosenProperty: 'lifecycle_stage',
        chosenConstant: 'LIKE',
        chosenLifecycleStage: 'Lead',
        chosenLifecycleStageValue: [],
        chosenCities: [],
        chosenCity: 'Hà Nội',
        chosenBussiness: 'Khác',
        chosenBussinesses: [],
        value: '',
        vchipTextField: '',
        vchipValue: [],
        menu: false
      },
      createFirstCondition: {
        contactProperties: [
            {
                text: 'Vòng đời',
                value: 'lifecycle_stage'
            },
            {
                text: 'Tài khoản sở hữu',
                value: 'contact_owner'
            },
            {
                text: 'Số điện thoại',
                value: 'phone'
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
            },
            {
                text: 'Dịch vụ',
                value: 'service'
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
        chosenConstant: 'LIKE',
        chosenLifecycleStage: 'Lead',
        chosenLifecycleStageValue: [],
        chosenCities: [],
        chosenCity: 'Hà Nội',
        chosenBussiness: 'Khác',
        chosenBussinesses: [],
        chosenServices: [],
        value: '',
        vchipTextField: '',
        vchipValue: [],
        checkValidInPhone: false,
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
      },
      editRole: '',
      viewRole: '',
      isSysAdmin: false,
      uploadFileDialog: {
        resultDialog: false,
        result: {
          "IMPORT DUPLICATE": {
            0: ""
          },
          "IMPORT ERROR": {
            0: ""
          },
          "IMPORT FAIL": {
            0: ""
          },
          "IMPORT SUCCESS": {
            0: ""
          },
        },
        dialog: false,
        file: {
          name: ''
        },
        extension: ['xlsx', 'xlsm', 'xlsb', 'xltx', 
        'xltm', 'xls', 'xlt', 'xml', 
        'xlam', 'xla', 'xlr', 'csv', 'dif', 'ods', 'ots'
        , 'tsv']
      }
      
    }),
    computed: {
      path(){
        return `${config.apiContact}/${this.idUser}/import`
      },
      disableSaveFilterButton(){
        if (this.saveFilter.name == ''){
          return true;
        }
        else {
          return false;
        }
      },
    },
    components: {
      ModelSelect,
      'upload-btn': UploadButton
    },
    methods: {
      checkFileExtension(filename) {
        let ext = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
        if(this.uploadFileDialog.extension.includes(ext)){
          return true
        }
        else{
          return false
        }
      },
      handleFileUpload(){
        this.uploadFileDialog.file = this.$refs.file.files[0];
      },
      submitFile(){
        let formData = new FormData();
        formData.append('file', this.uploadFileDialog.file);
        // console.log(this.uploadFileDialog.file)
        let link = `${config.apiContact}/${this.idUser}/import`
        axios.post(link,
          formData,
          {
            headers: authHeader()
          }
        ).then(result => {
          const {
              dispatch
          } = this.$store;
          let time = moment();
          if(result.data.code == 'SUCCESS'){
              dispatch('alert/success', `${result.data.message} (${this.coverTimeDetail(time)})`)
              this.uploadResult.SUCCESS.count = result.data.response.SUCCESS.count;
              this.uploadResult.DUPLICATE.count = result.data.response.DUPLICATE.count;
              this.uploadResult.ERROR.count = result.data.response.ERROR.count;
              this.uploadResult.FAIL.count = result.data.response.FAIL.count;
              this.uploadResult.SUCCESS.description = this.checkString(result.data.response.SUCCESS.description.split(" "));
              this.uploadResult.DUPLICATE.description = this.checkString(result.data.response.DUPLICATE.description.split(" "));
              this.uploadResult.ERROR.description = this.checkString(result.data.response.ERROR.description.split(" "));
              this.uploadResult.FAIL.description = this.checkString(result.data.response.FAIL.description.split(" "));
              console.log(this.uploadResult)
              this.uploadResult.dialog = true;
          }
          else {
              dispatch('alert/error', `Import thất ${result.data.message} (${this.coverTimeDetail(time)})`)
          }
        })
        .catch(error => {
          console.log(error);
        }).finally(() => {
          this.uploadFileDialog.dialog = false;
        });
      },
      updateFile(file){
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        let fd = new FormData();
        fd.append('file',file)
        contacts.importContactFromFile(this.idUser, fd).then(result => {
          console.log(error);
        }).catch(error => {
          console.log(error)
        })
      },
      customSort(items, index, isDescending) {
        // The following is informations as far as I researched.
        // items:  items to be sorted
        // index: Enabled sort headers value. (black arrow status).
        // isDescending: Whether enabled sort headers is desc
        // console.log(items)
        this.sortContact.property = (index == 'fullname') ? 'lastName' : index;
        this.sortContact.order = (isDescending) ? 'DSC' : 'ASC';
        return items;
      },
      getService(){
          this.allService = [];
          serviceAPI.getService(this.idUser).then(result => {
              const {
                  dispatch
              } = this.$store;
              let time = moment();
              if(result.code == 'SUCCESS'){
                let res = result.response.reverse();
                for (let i = 0; i < res.length; i++){
                  this.allService.push(res[i].name)
                }
              }
              else {
                  dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
              }
          }).catch(error => {
              console.log(error);
          })
      },
      getCity(){
        this.cities = [];
        accountAPI.getCity(this.idUser).then(result => {
          const {
              dispatch
          } = this.$store;
          let time = moment();
          if(result.code == 'SUCCESS'){
            let res = result.response;
            for(let i = 0; i < res.length; i++){
              let obj = {
                text: res[i].name + ' - ' + res[i].countryCode,
                value: res[i].name
              }
              this.cities.push(obj);
            }
            this.city = this.cities[0].value;
          }
          else {
              dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
          } 
        }).catch(error => {
          console.log(error)
        })
      },
      coverTimeDetail(time){
          if (_.isNull(time)) return '';
          return moment(time).format('HH:mm:ss, DD/MM/YYYY')
      },
      getAllEmail(){
          this.allEmail = [];
          contacts.getAllEmail(this.idAccount).then(result => {
              result.response.filter(e => {
                  const obj = {
                      text: e.name + ' (' + e.email + ')',
                      value: e.email,
                      name: e.name
                  }
                  this.allEmail.push(obj);
              });
          }).catch(error => {
            console.log(error);
          }).finally(() => {
            this.getAllContact();
          })
      },
      returnNameFromEmail(email){
        let result = '';
        if (email != null){
          for (let i = 0; i < this.allEmail.length; i++){
            if (this.allEmail[i].value == email){
              result = this.allEmail[i].name;
            }
          }
          
        }
        else {
          result = '';
        }
        return result;
      },
      canDelete(email){
        if (this.editRole == 'ROLE_CONTACT_EDIT_EVERYTHING' || this.isSysAdmin == true){
          return true;
        }
        else if (this.editRole == 'ROLE_CONTACT_EDIT_OWNEDONLY'){
          if (email == this.currentUser.username){
            return true;
          }
          else {
            return false;
          }
        }
      },
      getCurrentUser(){
        this.getFilter();
        this.getCity();
        this.getService();
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        let role = this.currentUser.authorities;
        for (let i = 0; i < role.length; i++){
          if (role[i].includes('ROLE_CONTACT_EDIT')){
            this.editRole = role[i];
          }
          if (role[i] == 'ROLE_SYSADMIN_SYSADMIN_ACCEPT'){
            this.isSysAdmin = true;
          }
          if (role[i].includes('ROLE_CONTACT_VIEW')){
            this.viewRole = role[i];
          }
        }
        if(this.viewRole == 'ROLE_CONTACT_VIEW_EVERYTHING' || this.isSysAdmin == true){
          this.getAllContact();
        }
        else {
          this.section = 'myContact';
          this.getMyContact();
        }
      },
      getPropertyName(value){
        let result = ''
        for(let i = 0; i<this.createFirstCondition.contactProperties.length;i++){
          if(value == this.createFirstCondition.contactProperties[i].value){
            result = this.createFirstCondition.contactProperties[i].text;
          }
        }
        return result;
      },
      changeBussiness(value){
        if(value != 'Khác'){
          this.isOtherBussiness = false;
        }
        else {
          this.isOtherBussiness = true;
        }
      },
      createContacts() {
        this.createWaiting = true;
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
            "value": (this.isOtherBussiness ? this.otherBussinessValue : this.bussiness)
          }
        ]
        if(this.service != ''){
          let obj = {
            "property": "service",
            "value": this.service
          }
          contact.push(obj)
        }
        // console.log(contact);
        contacts.createContact(this.idUser, contact).then(result => {
          if(result.code == 'SUCCESS'){
            this.$router.push(this.takeLink(result.response.contactId));
            this.checkInfo = false
            this.email = ''
            this.firstname = ''
            this.lastname = ''
            this.phone = ''
            this.lifecycleStage = ''
            this.city = ''
            this.bussiness = ''
          }
          else {
            this.createFailResponse = result.response;
            // this.createFailDialog = true;
            dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
          }
          this.getAllContact();
          this.createWaiting = false;
        }).catch(error => {
          console.log(error);
          this.createFailResponse = error.response.status;
          // this.createFailDialog = true;
          this.checkInfo = false;
          this.createWaiting = false;
        }).finally(()=> {
          this.getAllContact();
          this.createWaiting = false;
        })
      },
      checkString(str){
          if (str == null || str == undefined){
              return ''
          }
          else {
              return str;
          }
      },
      getAllContact() {
        this.loadingTable = true;
        this.contacts = []
        this.allContacts = [];
        contacts.getAllContact(this.idUser, this.page, this.sortContact.property, this.sortContact.order).then(result => {
          const {
              dispatch
          } = this.$store;
          let time = moment();
          if(result.code == 'SUCCESS'){
              for(let i = 0; i < result.response.results.length; i++){
                  result.response.results[i].fullname = this.checkString(result.response.results[i].lastName) + ' ' + this.checkString(result.response.results[i].firstName)
              }
              this.allContacts = result.response.results;
              this.contacts = this.allContacts;
              this.pages = result.response.totalPage
          }
          else {
              dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
          }
        }).catch(error => {
          // this.failDialog = true;
          console.log(error);
        }).finally(() => {
          this.loadingTable = false;
        })
      },
      getMyContact(){
        this.loadingTable = true;
        this.contacts = []
        this.allContacts = [];
        contacts.getMyContact(this.idUser, this.page, this.sortContact.property, this.sortContact.order).then(result => {
          const {
              dispatch
          } = this.$store;
          let time = moment();
          if(result.code == 'SUCCESS'){
              for(let i = 0; i < result.response.results.length; i++){
                  result.response.results[i].fullname = this.checkString(result.response.results[i].lastName) + ' ' + this.checkString(result.response.results[i].firstName)
              }
              this.allContacts = result.response.results;
              this.contacts = this.allContacts;
              this.pages = result.response.totalPage
          }
          else {
              dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
          } 
          
        }).catch(error => {
          console.log(error);
        }).finally(() => {
          this.loadingTable = false;
        })

      },
      covertime(time) {
        if (_.isNull(time)) return '';
        return moment(time).format('DD/MM/YYYY HH:mm:ss')
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
          const {
              dispatch
          } = this.$store;
          let time = moment();
          if(result.code == 'SUCCESS'){
              dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
              this.deleteContactDialog.id = '';
              if (this.section == 'allContact'){
                this.getAllContact()
              }
              else if(this.section == 'myContact') {
                this.getMyContact()
              }
              else if (this.section == 'search'){
                this.searchContact();
              }
          }
          else {
              dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
          }
          this.deleteContactDialog.dialog = false;
        }).catch(error => {
          console.log(error);
          // this.cannotDeleteDialog = true;
        }).finally(() => {
          
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
      addAndCondition(orIndex, property, conditionConstant, value, isArray){
          if(conditionConstant == 'IN'){
            if(isArray == true){
              var conditionToAdd = {
                conditionId: null,
                object: "Contact",
                property: property,
                condition: conditionConstant,
                value: value
              }
            }
            else{
              var conditionToAdd = {
                conditionId: null, 
                object: "Contact",
                property: property,
                condition: conditionConstant,
                value: value.replace(/\s/g, "").split(",")
              }
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
          this.newCondition.value = '';
          this.newCondition.chosenLifecycleStageValue = [];
          this.conditions = [...this.conditions];
          this.newCondition.menu = false;
      },
      addFirstCondition(property, conditionConstant, value, isArray){
        if(conditionConstant == 'IN'){
          if(isArray == true){
            var conditionToAdd = {
              conditionId: null,
              object: "Contact",
              property: property,
              condition: conditionConstant,
              value: value
            }
          }
          else {
            var conditionToAdd = {
              conditionId: null,
              object: "Contact",
              property: property,
              condition: conditionConstant,
              value: value.replace(/\s/g, "").split(",")
            }
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
        this.createFirstCondition.value = '';
        this.createFirstCondition.chosenLifecycleStageValue = [];
        this.createFirstCondition.firstConditionMenu = false;
        this.firstConditionMenu = false;
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
        this.loadingTable = true;
        this.section = 'filter';
        let conditions = this.conditions;
        // console.log(conditions)
        
        listService.findContactByCondition(this.idUser, conditions, this.page).then(result => {
          const {
              dispatch
          } = this.$store;
          let time = moment();
          if(result.code == 'SUCCESS'){
              for(let i = 0; i < result.response.results.length; i++){
                  result.response.results[i].fullname = this.checkString(result.response.results[i].lastName) + ' ' + this.checkString(result.response.results[i].firstName)
              }
              this.allContacts = result.response.results;
              this.contacts = this.allContacts;
              this.page = result.response.page;
              this.pages = result.response.totalPage;
          }
          else {
              dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
          }
        }).catch(error => {
          // this.failDialog = true;
          console.log(error);
        }).finally(() => {
          this.loadingTable = false;
        })
      },
      updateFilter(id){
        let body = this.getFilterFromId(id);
        body.name = this.filterName;
        filterAPI.updateFilter(this.idUser, body).then(result => {
          const {
              dispatch
          } = this.$store;
          let time = moment();
          if(result.code == 'SUCCESS'){
              dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`);
              this.getFilter();
          }
          else {
              dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
          }
        })
      },
      getFilterFromId(id){
        let res = null;
        for (let i = 0; i < this.filters.length;i++){
          let obj = Object.assign({}, this.filters[i])
          if (obj.contactConditionGroupId == id){
            res = Object.assign({}, obj)
            break;
          }
        }
        return res;
      },
      getFilter(){
        filterAPI.getFilter(this.idUser).then(result => {
          const {
              dispatch
          } = this.$store;
          let time = moment();
          if(result.code == 'SUCCESS'){
              this.filters = result.response;
          }
          else {
              dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      deleteFilter(id){
        this.deleteFilterDialog = false;
        filterAPI.deleteFilter(this.idUser, id).then(result => {
          const {
              dispatch
          } = this.$store;
          let time = moment();
          if(result.code == 'SUCCESS'){
              this.filterId = '';
              dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
              this.getFilter()
              if(this.viewRole == 'ROLE_CONTACT_VIEW_EVERYTHING' || this.isSysAdmin == true){
                this.getAllContact();
              }
              else {
                this.section = 'myContact';
                this.getMyContact();
              }
          }
          else {
              dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      createFilter(name, conditions){
        let body = {
          name: name,
          conditions: conditions
        }
        filterAPI.createFilter(this.idUser, body).then(result => {
          const {
              dispatch
          } = this.$store;
          let time = moment();
          if(result.code == 'SUCCESS'){
              dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
              this.filters.push(result.response)
              this.filterId = this.filters[this.filters.length - 1].contactConditionGroupId;
          }
          else {
              dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      normalText(str){
          return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
      },
      searchContact(){
        this.loadingTable = true;
        this.contacts = []
        this.allContacts = [];
        contacts.searchContact(this.idUser, this.page, this.search).then(result => {
          const {
              dispatch
          } = this.$store;
          let time = moment();
          if(result.code == 'SUCCESS'){
              for(let i = 0; i < result.response.results.length; i++){
                  result.response.results[i].fullname = this.checkString(result.response.results[i].lastName) + ' ' + this.checkString(result.response.results[i].firstName)
              }
              this.allContacts = result.response.results;
              this.contacts = this.allContacts;
              this.pages = result.response.totalPage
          }
          else {
              dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
          }
        }).catch(error => {
          console.log(error);
        }).finally(() => {
          this.loadingTable = false;
        })
      }
    },
    watch:{
      section(){
        if (this.section != 'filter'){
          this.firstConditionMenu = true;
          this.conditions = [];
          this.filterName = '';
          this.filterId = ''
        }
      },
      'sortContact.property'(){
        this.contacts = []
        if(this.sortContact.property != null){
          if (this.section == 'allContact'){
            this.getAllContact()
          }
          else if(this.section == 'myContact') {
            this.getMyContact()
          }
        }
      },
      'sortContact.order'(){
        this.contacts = []
        if (this.section == 'allContact'){
          this.getAllContact()
        }
        else if(this.section == 'myContact') {
          this.getMyContact()
        }
      },
      page(){
        this.contacts = []
        if (this.section == 'allContact'){
          this.getAllContact()
        }
        else if(this.section == 'myContact') {
          this.getMyContact()
        }
        else if (this.section == 'search'){
          this.searchContact();
        }
        else if (this.section == 'filter'){
          this.filter();
        }
      },
      filterId(){
        if(this.filterId != ''){
          this.conditions = [];
          this.firstConditionMenu = false;
          let obj = Object.assign({}, this.getFilterFromId(this.filterId));
          // console.log(obj)
          this.conditions = Array.from(obj.conditions)
          // console.log(this.conditions)
          this.filterName = obj.name;
          
          this.filter();
        }
        else {
          this.getFilter()
          this.firstConditionMenu = true;
          this.conditions = [];
          this.filterName = '';
        }
      }

    },
    created() {
      this.getCurrentUser();
      this.$store.state.colorNumber = 0;
    }
  }
</script>