<template>
    <v-content class="mt-5 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs2 sm2 md2 lg2 xl2>
                <v-btn outline color="indigo" @click="$router.push(`/contacts/${idAccount}/lists`)">
                    <v-icon>keyboard_arrow_left</v-icon>Danh sách
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm12 md4 lg4 xl4>
                <h1 class="ml-3 mt-2">Chi tiết danh sách</h1>
            </v-flex>
            <v-flex xs12 sm12 md8 lg8 xl8 v-if="access">
                <v-layout row>
                    <v-flex xs5 md5 lg5 xl5>
                        <v-text-field v-model="list.name" :rules="nameRules" label="Tên danh sách" class="fontSize: 20px; width: 100%"></v-text-field>
                    </v-flex>
                    <v-flex xs4 sm4 md4 lg4 xl4 offset-xs1 offset-sm1 offset-md1 offset-lg1 offset-xl1>
                        <v-text-field append-icon="search" v-model="search" label="Tìm kiếm Lead theo tên.." single-line hide-details></v-text-field>
                    </v-flex>
                
                    <v-flex xs2 md2 lg2 xl2>
                        <v-btn block round v-if="list.name.length > 0" dark color="#3E82F7" @click="updateList()">Lưu danh sách</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-divider class="mt-4" :divider="divider"></v-divider>
        <br>
        <br>
        <v-layout row v-if="access">
            <v-flex xs12 sm12 md3 lg3 xl3>
                <template v-if="!firstConditionMenu">
                        <v-card>
                            <v-card-text style="padding: 8px;">
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
                                                <v-card flat style="border: 1px solid #7C98B6; background-color: #F5F8FA;">
                                                    <v-card-text style="padding: 8px 8px;">
                                                        <v-layout row>
                                                            <v-flex xs10 sm10 md10 lg10 xl10 class="pt-3">
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
                                            <v-menu :close-on-content-click="false" :nudge-width="100" offset-x max-width="400">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn class="blue" outline round style="color: blue;" v-on="on"><v-icon>add</v-icon>Thêm điều kiện và</v-btn>
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
                                            <!-- <v-btn @click="deleteOrCondition(orIndex)" class="red" outline round style="color: red;">Xóa</v-btn> -->
                                        </v-card-actions>
                                    </v-card>
                                    <p>hoặc</p>
                                </template>
                            </v-card-text>
                            <v-card-actions style="padding: 8px 8px; margins: 0px 0px">
                                <v-menu v-model="newOrCondition.menu" :close-on-content-click="false" :nudge-width="100" offset-x max-width="400">
                                    <template v-slot:activator="{ on }">
                                        <v-btn class="blue" outline round style="color: blue;" v-on="on"><v-icon>add</v-icon>Thêm điều kiện hoặc</v-btn>
                                    </template>
                                    <v-card style="width: 100%;">
                                        <v-card-text>
                                            <v-layout row wrap>
                                                <v-flex xs6 sm6 md6 lg6 xl6>
                                                    <v-select :items="newOrCondition.contactProperties" label="Thuộc tính" v-model="newOrCondition.chosenProperty" @input="newOrCondition.chosenConstant = 'LIKE', newOrCondition.value = ''"></v-select>
                                                </v-flex>
                                                <br>
                                                <v-flex xs6 sm6 md6 lg6 xl6>
                                                    <v-select v-if="newOrCondition.chosenProperty == 'lifecycle_stage' || newOrCondition.chosenProperty == 'city' || newOrCondition.chosenProperty == 'bussiness' || newOrCondition.chosenProperty == 'service'" 
                                                        :items="[{text: 'chứa từ khóa', value: 'LIKE'}, {text: 'là', value: 'EQUAL'}, {text: 'có trong', value: 'IN'}]" 
                                                        label="Chọn điều kiện lọc" v-model="newOrCondition.chosenConstant"></v-select>
                                                    <v-select v-if="newOrCondition.chosenProperty == 'contact_owner' || newOrCondition.chosenProperty == 'phone' || newOrCondition.chosenProperty == 'email'" 
                                                        :items="[{text: 'chứa từ khóa', value: 'LIKE'}, {text: 'có trong', value: 'IN'}]" 
                                                        label="Chọn điều kiện lọc" v-model="newOrCondition.chosenConstant"></v-select>
                                                </v-flex>
                                                <br>
                                                <template v-if="newOrCondition.chosenProperty == 'lifecycle_stage'">
                                                    <template v-if="newOrCondition.chosenConstant == 'IN'">
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-select label="Chọn giá trị" :items="lifecycleStages" multiple chips v-model="newOrCondition.chosenLifecycleStageValue"></v-select>
                                                            <v-btn :disabled="newOrCondition.chosenLifecycleStageValue.length == 0"  class="blue" outline round style="color: blue;" @click="addOrCondition('lifecycle_stage', 'IN', newOrCondition.chosenLifecycleStageValue, true)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                    <template v-else-if="newOrCondition.chosenConstant == 'LIKE'">
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-text-field label="Nhập từ khóa" v-model="newOrCondition.value"></v-text-field>
                                                            <v-btn :disabled="newOrCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addOrCondition('lifecycle_stage', 'LIKE', newOrCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                    <template v-else>
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-select :items="lifecycleStages" v-model="newOrCondition.chosenLifecycleStage" label="Chọn giá trị"></v-select>
                                                            <v-btn class="blue" outline round style="color: blue;" @click="addOrCondition('lifecycle_stage', newOrCondition.chosenConstant, newOrCondition.chosenLifecycleStage, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                </template>
                                                <template v-else-if="newOrCondition.chosenProperty == 'contact_owner'">
                                                    <template v-if="newOrCondition.chosenConstant == 'IN'">
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-text-field label="Nhập các tài khoản cần tìm kiếm, phân tách nhau bằng dấu phẩy" v-model="newOrCondition.value"></v-text-field>
                                                            <v-btn :disabled="newOrCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addOrCondition('contact_owner', 'IN', newOrCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                    <template v-else>
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-text-field label="Nhập từ khóa" v-model="newOrCondition.value"></v-text-field>
                                                            <v-btn :disabled="newOrCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addOrCondition('contact_owner', 'LIKE', newOrCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                </template>
                                                <template v-else-if="newOrCondition.chosenProperty == 'phone'">
                                                    <template v-if="newOrCondition.chosenConstant == 'IN'">
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-form v-model="newOrCondition.checkValidInPhone">
                                                                <v-text-field :rules="phoneSearchInRules" label="Nhập các số điện thoại cần tìm kiếm, phân tách nhau bằng dấu phẩy" v-model="newOrCondition.value"></v-text-field>
                                                            </v-form>
                                                            
                                                            <v-btn :disabled="!newOrCondition.checkValidInPhone"  class="blue" outline round style="color: blue;" @click="addOrCondition('phone', 'IN', newOrCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                    <template v-else>
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-text-field type="number" label="Nhập từ khóa" v-model="newOrCondition.value"></v-text-field>
                                                            <v-btn :disabled="newOrCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addOrCondition('phone', 'LIKE', newOrCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                </template>
                                                <template v-else-if="newOrCondition.chosenProperty == 'email'">
                                                    <template v-if="newOrCondition.chosenConstant == 'IN'">
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-text-field label="Nhập các email cần tìm kiếm, phân tách nhau bằng dấu phẩy" v-model="newOrCondition.value"></v-text-field>
                                                            <v-btn :disabled="newOrCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addOrCondition('email', 'IN', newOrCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                    <template v-else>
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-text-field label="Nhập từ khóa" v-model="newOrCondition.value"></v-text-field>
                                                            <v-btn :disabled="newOrCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addOrCondition('email', 'LIKE', newOrCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                </template>
                                                <template v-else-if="newOrCondition.chosenProperty == 'city'">
                                                    <template v-if="newOrCondition.chosenConstant == 'IN'">
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-select label="Chọn giá trị" :items="cities" multiple chips v-model="newOrCondition.chosenCities"></v-select>
                                                            <v-btn :disabled="newOrCondition.chosenCities.length == 0"  class="blue" outline round style="color: blue;" @click="addOrCondition('city', 'IN', newOrCondition.chosenCities, true)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                    <template v-else-if="newOrCondition.chosenConstant == 'LIKE'">
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-text-field label="Nhập từ khóa" v-model="newOrCondition.value"></v-text-field>
                                                            <v-btn :disabled="newOrCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addOrCondition('city', 'LIKE', newOrCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                    <template v-else>
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-select :items="cities" v-model="newOrCondition.chosenCity" label="Chọn giá trị"></v-select>
                                                            <v-btn class="blue" outline round style="color: blue;" @click="addOrCondition('city', newOrCondition.chosenConstant, newOrCondition.chosenCity, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                </template>
                                                <template v-else-if="newOrCondition.chosenProperty == 'bussiness'">
                                                    <template v-if="newOrCondition.chosenConstant == 'IN'">
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-select label="Chọn giá trị" :items="allBussiness" multiple chips v-model="newOrCondition.chosenBussinesses"></v-select>
                                                            <v-btn :disabled="newOrCondition.chosenBussinesses.length == 0"  class="blue" outline round style="color: blue;" @click="addOrCondition('bussiness', 'IN', newOrCondition.chosenBussinesses, true)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                    <template v-else-if="newOrCondition.chosenConstant == 'LIKE'">
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-text-field label="Nhập từ khóa" v-model="newOrCondition.value"></v-text-field>
                                                            <v-btn :disabled="newOrCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addOrCondition('bussiness', 'LIKE', newOrCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                    <template v-else>
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-select :items="allBussiness" v-model="newOrCondition.chosenBussiness" label="Chọn giá trị"></v-select>
                                                            <v-btn class="blue" outline round style="color: blue;" @click="addOrCondition('bussiness', newOrCondition.chosenConstant, newOrCondition.chosenBussiness, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                </template>
                                                <template v-else-if="newOrCondition.chosenProperty == 'service'">
                                                    <template v-if="newOrCondition.chosenConstant == 'IN'">
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-select label="Chọn giá trị" :items="allService" multiple chips v-model="newOrCondition.chosenServices"></v-select>
                                                            <v-btn :disabled="newOrCondition.chosenServices.length == 0"  class="blue" outline round style="color: blue;" @click="addOrCondition(newOrCondition.chosenProperty, 'IN', newOrCondition.chosenServices, true)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                    <template v-else-if="newOrCondition.chosenConstant == 'LIKE'">
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-text-field label="Nhập từ khóa" v-model="newOrCondition.value"></v-text-field>
                                                            <v-btn :disabled="newOrCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addOrCondition(newOrCondition.chosenProperty, 'LIKE', newOrCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                    <template v-else>
                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                            <v-select :items="allService" v-model="newOrCondition.value" label="Chọn giá trị"></v-select>
                                                            <v-btn :disabled="newOrCondition.value.length == 0" class="blue" outline round style="color: blue;" @click="addOrCondition(newOrCondition.chosenProperty, newOrCondition.chosenConstant, newOrCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                                        </v-flex>
                                                    </template>
                                                </template>
                                            </v-layout>
                                        </v-card-text>
                                    </v-card>
                                </v-menu>
                            </v-card-actions>
                        </v-card>
                        <v-btn dark color="#425B76" @click="filter()">Lọc</v-btn>
                </template>
                <template v-else>
                    <br>
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
                                                
                                                <v-btn :disabled="!createFirstCondition.checkValidInPhone"  class="blue" outline round style="color: blue;" @click="addFirstCondition('phone', 'IN', createFirstCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
                                            </v-flex>
                                        </template>
                                        <template v-else>
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                <v-text-field type="number" label="Nhập từ khóa" v-model="createFirstCondition.value"></v-text-field>
                                                <v-btn :disabled="createFirstCondition.value.length == 0"  class="blue" outline round style="color: blue;" @click="addFirstCondition('phone', 'LIKE', createFirstCondition.value, false)"><v-icon>add</v-icon>Thêm</v-btn>
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
            <v-flex xs12 sm12 md9 lg9 xl9>
                <v-data-table
                    rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]"
                    no-data-text="Không có kết quả nào phù hợp"
                    :headers="headersLists"
                    :items="contacts"
                    class="elevation-1 mt-6"
                >
                    <template v-slot:items="props">
                        <td><a @click.stop="goToContactPage(props.item.contactId)">{{props.item.fullname}}</a></td>
                        <td>{{ props.item.email }}</td>
                        <td>{{ props.item.phone }}</td>
                        <td>{{ props.item.lifecycleStage }}</td>
                        <td>{{ props.item.contactOwner }}</td>
                        <td>{{ props.item.city }}</td>
                        <td>{{ props.item.bussiness }}</td>
                        <td>{{ props.item.service }}</td>
                    </template>
                    <template v-slot:no-results>
                        <v-alert :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                        </v-alert>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-card flat>
                    <v-card-text style="background-color: #FDEDEE; border: 1px solid red;">
                        <v-card flat style="background-color: #FDEDEE">
                            <v-card-title>
                                <h2>Không có quyền truy cập</h2>
                            </v-card-title>
                            <v-card-text>
                                Bạn phải có quyền Xem tất cả các Lead mới có thể sử dụng chức năng này. Hãy liên hệ với Quản lý để được cấp quyền truy cập.
                            </v-card-text>
                        </v-card>
                    </v-card-text>
                </v-card>
                
            </v-flex>
        </v-layout>
        <v-dialog v-model="failDialog" @click:outside="failDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Thất bại</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Đã có lỗi xảy ra khi lấy chi tiết danh sách. Xin hãy thử lại.
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="failDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-content>
</template>
<script>
import moment from 'moment'
import serviceAPI from '../../../services/service.service'
import listService from '../../../services/list.services'
export default {
    props: {
        idAccount: {
            type: String,
            default: null,
        },
        idList: {
            type: String,
            default: null,
        }
    },
    watch: {
        search(){
            this.contacts = [];
            for (let i = 0; i < this.allContacts.length; i++){
                const name = this.allContacts[i].firstName + ' ' + this.allContacts[i].lastName;
                if(this.normalText(name.toLowerCase()).includes(this.normalText(this.search.toLowerCase().trim()))){
                    this.contacts.push(this.allContacts[i]);
                }
            }
        }
    },
    data(){
        return {
            allService: [],
            access: false,
            currentUser: null,
            divider: true,
            search: '',
            allContacts: [
            ],
            contacts: [
                
            ],
            headersLists: [
                {
                    text: 'TÊN',
                    align: 'left',
                    // sortable: false,
                    value: 'fullname'
                },
                {
                    text: 'EMAIL',
                    align: 'left',
                    // sortable: false,
                    value: 'email'
                },
                {
                    text: 'SỐ ĐIỆN THOẠI',
                    align: 'left',
                    // sortable: false,
                    value: 'phone'
                },
                {
                    text: 'VÒNG ĐỜI',
                    align: 'left',
                    // sortable: false,
                    value: 'lifecycleStage'
                },
                {
                    text: 'TÀI KHOẢN SỞ HỮU',
                    align: 'left',
                    // sortable: false,
                    value: 'contactOwner'
                },
                {
                    text: 'THÀNH PHỐ',
                    align: 'left',
                    // sortable: false,
                    value: 'city'
                },
                {
                    text: 'NGÀNH NGHỀ',
                    align: 'left',
                    // sortable: false,
                    value: 'bussiness'
                },
                {
                    text: 'DỊCH VỤ',
                    align: 'left',
                    // sortable: false,
                    value: 'service'
                },
            ],
            list: {
                name: ''
            },
            newCondition: {
                chosenServices: [],
                checkValidInPhone: false,
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
                    },
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
                value: '',
                vchipTextField: '',
                vchipValue: [],
                newConditionMenu: false,
                menu: false,
            },
            newOrCondition: {
                chosenServices: [],
                checkValidInPhone: false,
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
                    },
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
                value: '',
                vchipTextField: '',
                vchipValue: [],
                newConditionMenu: false,
                menu: false,
            },
            conditions: [],
            newListName: '',
            createFirstCondition: {
                chosenServices: [],
                checkValidInPhone: false,
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
                    },
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
                value: '',
                vchipTextField: '',
                vchipValue: [],
                firstConditionMenu: false
            },
            firstConditionMenu: false,
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
            nameRules: [
                v => !!v || 'Chưa nhập tên',
                // v => v.length <= 15 || 'Tên nhỏ hơn 15 kí tự',
            ],
            cities: ['An Giang', 'Bà Rịa - Vũng Tàu', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Bình Định', 'Bạc Liêu', 'Bắc Giang', 'Bắc Kạn', 'Bắc Ninh',
                'Bến Tre', 'Cao Bằng', 'Cà Mau', 'Cần Thơ', 'Hà Giang', 'Hà Nam', 'Hà Nội', 'Hà Tĩnh', ' Hòa Bình', 'Hưng Yên', 'Hải Dương', 'Hải Phòng', 'Hậu Giang',
                'Hồ Chí Minh', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Long An', 'Lào Cai', 'Lâm Đồng', 'Lạng Sơn', 'Nam Định', 'Nghệ An', 'Ninh Bình', 'Ninh Thuận',
                'Phú Thọ', 'Phú Yên', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Thanh Hóa', 'Thái Bình', 'Thái Nguyên', 'Thừa Thiên Huế',
                'Tiền Giang', 'Trà Vinh', 'Tuyên Quang', 'Tây Ninh', 'Gia Lai', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái', 'Điện Biên', 'Đà Nẵng', 'Đắk Lắk', 'Đắk Nông', 'Đồng Nai', 'Đồng Tháp'
            ],
            allBussiness: ['Giáo dục (Trường ĐH, cao đẳng, TT ngoại ngữ', 'Đồ gia dụng (Điện tử, điện lạnh, đồ dùng bếp...)', 'Dịch vụ (Pháp lí, kế toán, sửa chữa...)', 'Bất động sản',
                'Nội thất', 'Thương mại điện tử', 'Mỹ phẩm', 'Du học/ Định cư', 'Làm đẹp (Spa, salon, thẩm mỹ viện,...)', 'Thời trang (Quần áo, giày dép, túi xách...)',
                'Chăn ga gối đệm', 'Hàng tiêu dùng', 'Xây dựng (Thi công, thiết kế, nội thất)', 'Sức khỏe (Dược, phòng khám, bệnh viện, thiết bị y tế...)', 'Du lịch', 'Phần mềm',
                'Bảo hiểm', 'Thiết bị chiếu sáng (Đèn trần, đèn led,...)', 'Tài chính', 'Nông, Lâm, Thủy sản', 'Khác'],
            bussiness: 'Khác',
            
            conditionsExample: 
            [
                [
                    {
                        "conditionId": null,
                        "object": "Contact",
                        "property": "city",
                        "condition": "EQUAL",
                        "value": "Hà Nội"
                    },
                    {
                        "conditionId": null,
                        "object": "Contact",
                        "property": "bussiness",
                        "condition": "IN",
                        "value": [
                            "Hải Hà", "công ty", "bốc họ"
                        ]
                    }
                ],
                [
                    {
                        "conditionId": null,
                        "object": "Contact",
                        "property": "lifecycle_stage",
                        "condition": "LIKE",
                        "value": "Lead"
                    }
                ]
            ],
            failDialog: false
        }
    },
    methods: {
        getService(){
            this.allService = [];
            serviceAPI.getService(this.idAccount).then(result => {
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
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        normalText(str){
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
        },
        getPropertyName(value){
            let result = ''
            for(let i = 0; i<this.newCondition.contactProperties.length;i++){
                if(value == this.newCondition.contactProperties[i].value){
                    result = this.newCondition.contactProperties[i].text;
                }
            }
            return result;
        },
        getAllContacts(){
            listService.getContactByListId(this.idAccount, this.idList).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    for(let i = 0; i < result.response.length; i++){
                        result.response[i].fullname = this.checkString(result.response[i].firstName) + ' ' + this.checkString(result.response[i].lastName)
                    }
                    this.allContacts = result.response;
                    this.contacts = this.allContacts;
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            })
        },
        getThisList(){
            listService.getList(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    const response = result.response;
                    for (let i = 0; i < response.length; i++){
                        if(response[i].contactConditionGroupId == this.idList){
                            this.list = response[i];
                            this.conditions = this.list.conditions;
                        }
                    }
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).then(() => {
                this.getAllContacts();
            }).catch(error => {
                console.log(error);
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
        addOrCondition(property, conditionConstant, value, isArray){
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
                    conditionToAdd = {
                        conditionId: null,
                        object: "Contact",
                        property: property,
                        condition: conditionConstant,
                        value: value.split(",")
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
            let orArray = [];
            orArray.push(conditionToAdd);
            this.conditions.push(orArray);
            this.conditions = [...this.conditions];
            this.newOrCondition.value = '';
            this.newOrCondition.chosenLifecycleStageValue = [];
            this.newOrCondition.vchipTextField = '';
            this.newOrCondition.firstConditionMenu = false;
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
                else {
                    conditionToAdd = {
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
                    conditionToAdd = {
                        conditionId: null,
                        object: "Contact",
                        property: property,
                        condition: conditionConstant,
                        value: value.split(",")
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
            this.createFirstCondition.vchipTextField = '';
            this.createFirstCondition.firstConditionMenu = false;
            this.firstConditionMenu = false;
        },
        goToContactPage(idContact){
            let link = `/contacts/${this.idAccount}/contact/${idContact}`;
            this.$router.push(link);
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
            let role = this.currentUser.authorities;
            for (let i = 0; i < role.length;i++){
                if (role[i] == 'ROLE_CONTACT_VIEW_EVERYTHING' || role[i] == 'ROLE_SYSADMIN_SYSADMIN_ACCEPT'){
                    this.access = true;
                }
            }
            if (this.access){
                this.getThisList();
                this.getService();
            }
        },
        goToNewListPage(){
            let link = `/contacts/${this.currentUser.accountId}/lists/newList`
            this.$router.push(link);
        },
        checkString(str){
            if (str == null || str == undefined){
                return ''
            }
            else {
                return str;
            }
        },
        filter(){
            this.allContacts = [];
            this.contacts = [];
            listService.findContactByCondition(this.idAccount, this.conditions).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    for(let i = 0; i < result.response.length; i++){
                        result.response[i].fullname = this.checkString(result.response[i].firstName) + ' ' + this.checkString(result.response[i].lastName)
                    }
                    this.allContacts = result.response;
                    this.contacts = this.allContacts;
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            })
        },
        updateList(){
            let body = {
                "contactConditionGroupId": this.list.contactConditionGroupId,
                "name": this.list.name,
                "accountId": this.list.accountId,
                "conditions": this.conditions,
                "createdAt": this.list.createdAt,
                "createdBy": this.list.createdBy
            }
            listService.updateList(this.idAccount, body).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            })
        }
    },
    created(){
        this.getCurrentUser();
        this.$store.state.colorNumber = 1;
        // this.getThisList();
    }
}
</script>
<style>
    div.conditions {
        height: 600px;
        overflow-y: scroll;
    }
</style>