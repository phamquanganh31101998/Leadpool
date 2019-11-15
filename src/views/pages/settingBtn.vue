<template>
    <v-content>
        <v-layout row>
            <v-card style="width:100%">
                <v-card-text>
                    <v-layout row class="pl-5">
                        <v-flex lg4 xl4>
                            <v-layout row wrap class="">
                                <v-flex xs12>
                                    <h3>Nhập tên nút</h3>
                                    <v-text-field v-model="nameBtn" class="mt-3" :rules="rule" style="width:100%"
                                        placeholder="Tên nút" outlined dense></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <h3>Các tiện ích tương tác</h3>
                                </v-flex>
                                <v-flex xs12 class="mt-3">
                                    <v-layout row>
                                        <v-flex xs5 class="pl-3 pr-3">
                                            <v-card class="pa-2" style="border-radius:7px"
                                                @click="dialogCall = true, dialogForm = false">
                                                <v-flex xs12 class="text-xs-center">
                                                    <v-icon>phone_in_talk</v-icon><br>
                                                    <span>Gọi ngay</span>
                                                </v-flex>
                                            </v-card>
                                            <v-checkbox v-model="call" class="mx-2 ml-5"></v-checkbox>
                                        </v-flex>
                                        <v-flex xs5 class="pl-3 pr-3">
                                            <v-card class="pa-2" style="border-radius:7px"
                                                @click="dialogForm = true, dialogCall = false">
                                                <v-flex xs12 class="text-xs-center">
                                                    <v-icon>mail_outline</v-icon><br>
                                                    <span>Đăng ký</span>
                                                </v-flex>
                                            </v-card>
                                            <v-checkbox v-model="form" class="mx-2 ml-5"></v-checkbox>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <strong>Màu chữ</strong>
                                    <v-radio-group v-model="colorText" row>
                                        <v-radio label="Sáng" value="#000"></v-radio>
                                        <v-radio label="Tối" value="#fff"></v-radio>
                                    </v-radio-group>
                                </v-flex>
                                <v-flex xs12>
                                    <strong>Kích cỡ</strong>
                                </v-flex>
                                <v-layout row class="mt-5 pl-5">
                                    <v-btn fab class="mt-2" @click="small = true; large = false" small>X0,5</v-btn>
                                    <v-btn fab class="mt-1 ml-5" @click="small = false; large = false">X1</v-btn>
                                    <v-btn fab large class="ml-5" @click="small = false; large = true">X1.5</v-btn>
                                </v-layout>
                                <v-flex xs12>
                                    <strong>Vị trí</strong>
                                </v-flex>
                                <v-layout row v-if="xy" style="width:100%">
                                    <v-flex xs4 class="pa-2">
                                        <v-card @click="styleForBtn('bottom:10px','left:0')" class="pa-2">Bottom-Left
                                        </v-card>
                                    </v-flex>
                                    <v-flex xs4 class="pa-2">
                                        <v-card @click="styleForBtn('bottom:10px','left:45%')" class="pa-2">
                                            Bottom-Center
                                        </v-card>
                                    </v-flex>
                                    <v-flex xs4 class="pa-2">
                                        <v-card @click="styleForBtn('bottom:10px','right:0')" class="pa-2">Bottom-Right
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                                <v-layout row v-else>
                                    <v-flex xs6 class="pa-2">
                                        <v-card @click="styleForBtn('top:45%','left:0')" class="pa-2">Mid-Left
                                        </v-card>
                                    </v-flex>
                                    <v-flex xs6 class="pa-2">
                                        <v-card @click="styleForBtn('top:45%','right:0')" class="pa-2">Mid-Right
                                        </v-card>
                                    </v-flex>
                                    <v-flex xs6 class="pa-2">
                                        <v-card @click="styleForBtn('bottom:10px','left:0')" class="pa-2">Bottom-Left
                                        </v-card>
                                    </v-flex>
                                    <v-flex xs6 class="pa-2">
                                        <v-card @click="styleForBtn('bottom:10px','right:0')" class="pa-2">Bottom-Right
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap class="mt-3" style="width:100%">
                                    <v-flex xs12>
                                        <strong>Phương hướng</strong>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-btn @click="xy = false">Dọc</v-btn>
                                        <v-btn @click="xy = true" class="ml-5">Ngang</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-layout>
                            <div :style="styleBtn" v-if="xy">
                                <v-btn v-show="call" fab :dark="dark" :small="small" :large="large" :color="color">
                                    <v-icon>phone_in_talk</v-icon>
                                </v-btn>
                                <v-btn v-show="form" @click="showForDialog = true" fab :dark="dark" :small="small"
                                    :large="large" :color="colorForm">
                                    <v-icon>email</v-icon>
                                </v-btn>
                            </div>
                            <div :style="styleBtn" v-else>
                                <v-btn v-show="form" @click="showForDialog = true" fab :dark="dark" :small="small"
                                    :large="large" :color="colorForm">
                                    <v-icon>email</v-icon>
                                </v-btn>
                                <br />
                                <v-btn v-show="call" fab :dark="dark" :small="small" :large="large" :color="color">
                                    <v-icon>phone_in_talk</v-icon>
                                </v-btn>
                            </div>
                        </v-flex>
                        <v-flex lg6 xl7 offset-lg1 v-if="dialogCall">
                            <v-card>
                                <v-card-title>
                                    Cài đặt nút gọi
                                </v-card-title>
                                <v-card-text>
                                    <v-layout row wrap class="pl-5 pr-3">
                                        <v-flex xs12>
                                            <h4>Số điện thoại</h4>
                                            <v-text-field v-model="text" :rules="rule" placeholder="Nhập số điện thoại"
                                                outlined dense>
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 class="mt-3">
                                            <h4>Thông điệp nút</h4>
                                            <v-text-field v-model="textCall" placeholder="Nhập thông điệp nút"
                                                outlined dense>
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <h4>Màu nền</h4>
                                            <v-btn class="mt-2" :color="color" @click="dialog = true" dark>Chọn màu sắc
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="gray darken-1" text @click="dialogCall = false">
                                        Đóng
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="green darken-1" dark text @click="checkCall()">
                                        Lưu
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                        <v-flex lg6 xl7 offset-lg1 v-if="dialogForm">
                            <v-card>
                                <v-card-title>
                                    <h1>Cài đặt nút nhập form</h1>
                                </v-card-title>
                                <v-card-text>
                                    <v-layout row wrap class="pl-5 pr-3">
                                        <v-flex xs12>
                                            <h3>Tiêu đề</h3>
                                            <v-text-field v-model="nameForm" outlined dense></v-text-field>
                                            <h3>Thông báo</h3>
                                            <v-text-field v-model="alertFinish" outlined dense></v-text-field>
                                            <h3 class="mb-3">Custom input</h3>
                                            <v-layout v-for="(properti,key) in numberProperties" :key="key" xs12>
                                                <!-- <v-text-field v-model="item.value" outlined dense></v-text-field> -->
                                                <v-select v-model="properti.value" :items="input" item-text="label"
                                                    item-value="value" label="Chọn trường nhập" outline></v-select>
                                                <v-btn class="mt-2 ml-3" color="error" v-if="properti.value != 'lastName' && properti.value != 'email' && properti.value != 'phone'" flat icon
                                                    @click="removeInput(key)">
                                                    <v-icon>clear</v-icon>
                                                </v-btn>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-btn class="mt-2 mr-5" color="primary" @click="addInput()">Thêm trường
                                                nhập
                                            </v-btn>
                                            <v-btn class="mt-2 ml-5" :color="colorForm" @click="dialog1 = true" dark>
                                                Chọn màu
                                                sắc
                                                nút</v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="gray darken-1" text @click="dialogForm = false">
                                        Đóng
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="green darken-1" text dark
                                        @click="form = true, alertSuccess('Lưu nút form thành công')">
                                        Lưu
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <v-divider class="mt-5"></v-divider>
                </v-card-text>
                <v-card-actions>
                    <v-layout row class="pb-3">
                        <v-flex xs6 class="text-xs-left px-5">
                            <v-btn color="grey" to="/setting">Hủy bỏ</v-btn>
                        </v-flex>
                        <v-flex xs6 class="pr-5 text-xs-center">
                            <v-btn color="success" @click="saveBtn()">Lưu</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-layout>
        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title>
                    <h1>Màu sắc</h1>
                </v-card-title>
                <v-card-text>
                    <v-radio-group v-model="color" row>
                        <div style="width:30px;height:30px;background-color:#8300e9"></div>
                        <v-radio value="#8300e9"></v-radio>
                        <div style="width:30px;height:30px;background-color:#0c71c3"></div>
                        <v-radio value="#0c71c3"></v-radio>
                        <div style="width:30px;height:30px;background-color:#7cda24"></div>
                        <v-radio value="#7cda24"></v-radio>
                        <div style="width:30px;height:30px;background-color:#edf000"></div>
                        <v-radio value="#edf000"></v-radio>
                        <div style="width:30px;height:30px;background-color:#e09900"></div>
                        <v-radio value="#e09900"></v-radio>
                        <div style="width:30px;height:30px;background-color:#e02b20"></div>
                        <v-radio value="#e02b20"></v-radio>
                    </v-radio-group>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="gray" text @click="dialog = false">
                        Đóng
                    </v-btn>
                    <v-btn color="green darken-1" text @click="dialog = false">
                        Xác nhận
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog1" max-width="400">
            <v-card>
                <v-card-title>
                    Màu sắc
                </v-card-title>
                <v-card-text>
                    <v-radio-group v-model="colorForm" row>
                        <div style="width:30px;height:30px;background-color:#8300e9"></div>
                        <v-radio value="#8300e9"></v-radio>
                        <div style="width:30px;height:30px;background-color:#0c71c3"></div>
                        <v-radio value="#0c71c3"></v-radio>
                        <div style="width:30px;height:30px;background-color:#7cda24"></div>
                        <v-radio value="#7cda24"></v-radio>
                        <div style="width:30px;height:30px;background-color:#edf000"></div>
                        <v-radio value="#edf000"></v-radio>
                        <div style="width:30px;height:30px;background-color:#e09900"></div>
                        <v-radio value="#e09900"></v-radio>
                        <div style="width:30px;height:30px;background-color:#e02b20"></div>
                        <v-radio value="#e02b20"></v-radio>
                    </v-radio-group>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="gray" text @click="dialog1 = false">
                        Đóng
                    </v-btn>
                    <v-btn color="green darken-1" text @click="dialog1 = false">
                        Xác nhận
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showForDialog" max-width="400">
            <v-card>
                <v-card-title>
                    <h1>{{nameForm}}</h1>
                </v-card-title>
                <v-card-text class="py-2">
                    <v-layout row wrap>
                        <template v-for="(item,key) in numberProperties">
                            <v-text-field :key="key" style="width:100%" :placeholder="item.value" outlined dense>
                            </v-text-field>
                        </template>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-flex class="text-xs-left">
                        <v-btn color="error" text @click="showForDialog = false">Hủy bỏ</v-btn>
                    </v-flex>
                    <v-flex class="text-xs-right">
                        <v-btn color="green darken-1" dark text @click="showForDialog = false">Xác nhận</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <alert />
    </v-content>
</template>
<script>
    import alert from '@/components/alert'
    import router from '@/router'
    import leadhubService from '@/services/leadhub.service.js'
    export default {
        props: {
            idAccount: {
                type: String,
                default: null,
            },
        },
        data() {
            return {
                tab: 0,
                tabs: [{
                    text: 'Điện thoại'
                }, {
                    text: 'Máy tính'
                }],
                color: '#8E00FF',
                colorForm: '#8E00FF',
                hideCanvas: false,
                hideInputs: false,
                hideModeSwitch: false,
                showSwatches: false,
                dialog: false,
                dialog1: false,
                colorText: '#000',
                text: null,
                name: '',
                display: 'mobile',
                displayDialog: 'mobile',
                lightsOut: false,
                window: false,
                call: false,
                form: false,
                dialogCall: false,
                dialogForm: false,
                small: false,
                large: false,
                dark: true,
                show: true,
                showBtnCall: false,
                showForDialog: false,
                nameBtn: '',
                input: [{
                    value: 'email',
                    label: 'Địa chỉ Mail'
                }, {
                    value: 'lastName',
                    label: 'Họ và Tên'
                }, {
                    value: 'city',
                    label: 'Thành phố'
                }, {
                    value: 'business',
                    label: 'Nghề nghiệp'
                }, {
                    value: 'phone',
                    label: 'Số điện thoại'
                }],
                nameForm: 'Đăng ký để nhận khuyến mãi',
                styleBtn: 'position: fixed; bottom:10px; left:0;z-index: 999999',
                xy: true,
                rule: [
                    v => !!v || 'Trường này không được bỏ trống'
                ],
                sizeButton: 0,
                bottom: null,
                top: null,
                left: null,
                right: null,
                properties: [],
                numberProperties: [{
                    value: 'lastName'
                },{
                    value: 'email'
                },{
                    value: 'phone'
                }],
                alertFinish: 'Đăng ký thành công',
                textCall: 'Để lại số điện thoại của bạn'
            }
        },
        watch: {
            colorText() {
                this.colorTxt()
            },
            display() {
                this.showDisplay()
            },
            displayDialog() {
                this.showForDisplay()
            },
        },
        methods: {
            showDisplay() {
                if (this.display == 'mobile') {
                    this.show = true
                } else {
                    this.show = false
                }
            },
            showForDisplay() {
                if (this.displayDialog == 'mobile') {
                    this.showForDialog = true
                } else {
                    this.showForDialog = false
                }
            },
            colorTxt() {
                if (this.colorText == '#000') {
                    return this.dark = true
                } else if (this.colorText == '#fff') {
                    return this.dark = false
                }
            },
            styleForBtn(tOb, lOr) {
                this.styleBtn = `position: fixed; ${tOb}; ${lOr};z-index: 999999;-webkit-backface-visibility: hidden;`
                if (tOb == "bottom:10px" && lOr == 'left:0') {
                    this.bottom = 5
                    this.left = 2
                    this.top = null
                    this.right = null
                } else if (tOb == "bottom:10px" && lOr == 'left:45%') {
                    this.bottom = 5
                    this.left = 45
                    this.top = null
                    this.right = null
                } else if (tOb == "bottom:10px" && lOr == 'right:0') {
                    this.bottom = 5
                    this.left = null
                    this.top = null
                    this.right = 2
                } else if (tOb == "top:45%" && lOr == 'left:0') {
                    this.bottom = null
                    this.left = 2
                    this.top = 45
                    this.right = null
                } else if (tOb == "top:45%" && lOr == 'right:0') {
                    this.bottom = null
                    this.left = null
                    this.top = 45
                    this.right = 2
                } else if (tOb == "bottom:10px" && lOr == 'right:0') {
                    this.bottom = 5
                    this.left = null
                    this.top = null
                    this.right = 2
                }
            },
            colorBtn(color) {
                return `background-color:${color}`
            },
            alertSuccess(data) {
                const {
                    dispatch
                } = this.$store;
                dispatch('alert/success', data)
            },
            alertError(data) {
                const {
                    dispatch
                } = this.$store;
                dispatch('alert/error', data)
            },
            checkCall() {
                if (this.text == null) {
                    this.alertError('Chưa điền số điện thoại')
                } else {
                    this.call = true,
                        this.alertSuccess('Lưu nút gọi thành công')
                }
            },
            saveBtn() {
                if (this.nameBtn == '') {
                    this.alertError('Chưa điền tên nút')
                } else {
                    this.alertSuccess('Lưu nút thành công')
                    //router.replace('/setting')
                    this.createGbtn()
                }
            },
            addInput() {
                let a = {
                    value: ''
                }
                this.numberProperties.push(a)
                this.numberProperties = [...this.numberProperties]
            },
            removeInput(data) {
                this.numberProperties.splice(data, 1)
                this.numberProperties = [...this.numberProperties]
            },
            createGbtn() {
                if (this.small == true) {
                    this.sizeButton = 40
                } else if (this.small == false && this.large == false) {
                    this.sizeButton = 52
                } else {
                    this.sizeButton = 70
                }
                for (let i = 0; i < this.numberProperties.length; i++) {
                    this.properties.push(this.numberProperties[i].value)
                }
                let form = {
                    buttonColor: this.colorForm,
                    description: "Gửi ngay đó",
                    formMessage: "Để lại lời nhắn",
                    formMessageReturn: this.alertFinish,
                    title: this.nameForm,
                    type: "FORM",
                    properties: this.properties,

                }
                let call = {
                    buttonColor: this.color,
                    description: "",
                    formMessage: "Gọi ngay",
                    phoneNumber: this.text,
                    title: this.textCall,
                    type: "CALL",
                }
                if (this.call == true && this.form == true) {
                    if (this.bottom == null && this.top == null && this.left == null && this.right == null) {
                        let btn = {
                            name: this.nameBtn,
                            vertical: this.xy,
                            listButton: [
                                form,
                                call
                            ],
                            style: {
                                bottom: 5,
                                top: this.top,
                                right: this.right,
                                color: this.colorText,
                                left: 2,
                                size: `${this.sizeButton}`,
                            }
                        }
                        this.callApiCreate(btn)
                    } else {
                        let btn = {
                            name: this.nameBtn,
                            vertical: this.xy,
                            listButton: [
                                form,
                                call
                            ],
                            style: {
                                bottom: this.bottom,
                                top: this.top,
                                right: this.right,
                                color: this.colorText,
                                left: this.left,
                                size: `${this.sizeButton}`,
                            }
                        }
                        this.callApiCreate(btn)
                    }
                } else if (this.call == false && this.form == true) {
                    if (this.bottom == null && this.top == null && this.left == null && this.right) {
                        let btn = {
                            name: this.nameBtn,
                            vertical: this.xy,
                            listButton: [
                                form
                            ],
                            style: {
                                bottom: 5,
                                top: this.top,
                                right: this.right,
                                color: this.colorText,
                                left: 2,
                                size: `${this.sizeButton}`,
                            }
                        }
                        this.callApiCreate(btn)
                    } else {
                        let btn = {
                            name: this.nameBtn,
                            vertical: this.xy,
                            listButton: [
                                form
                            ],
                            style: {
                                bottom: this.bottom,
                                top: this.top,
                                right: this.right,
                                color: this.colorText,
                                left: this.left,
                                size: `${this.sizeButton}`,
                            }
                        }
                        this.callApiCreate(btn)
                    }
                } else if (this.call == true && this.form == false) {
                    if (this.bottom == null && this.top == null && this.left == null && this.right == null) {
                        let btn = {
                            name: this.nameBtn,
                            vertical: this.xy,
                            listButton: [
                                call
                            ],
                            style: {
                                bottom: 5,
                                top: this.top,
                                right: this.right,
                                color: this.colorText,
                                left: 2,
                                size: `${this.sizeButton}`,
                            }
                        }
                        this.callApiCreate(btn)
                    } else {
                        let btn = {
                            name: this.nameBtn,
                            vertical: this.xy,
                            listButton: [
                                call
                            ],
                            style: {
                                bottom: this.bottom,
                                top: this.top,
                                right: this.right,
                                color: this.colorText,
                                left: this.left,
                                size: `${this.sizeButton}`,
                            }
                        }
                        this.callApiCreate(btn)
                    }
                } else {
                    this.alertError("Bạn chưa chọn nút cần tạo")
                }
            },
            callApiCreate(btn) {
                leadhubService.createGbtn(this.idAccount, btn).then(result => {
                    if (result.code == "SUCCESS") {
                        this.alertSuccess('Thêm nút thành công')
                        router.replace(`/contacts/${this.idAccount}/leadhub`)
                    } else {
                        this.alertError(result.message)
                    }
                })
            }
        },
        components: {
            alert
        }
    }
</script>