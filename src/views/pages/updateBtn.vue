<template>
    <v-content>
        <v-layout row>
            <v-card style="width:100%">
                <v-card-text>
                    <v-layout row class="pl-2">
                        <v-flex lg4 xl4>
                            <v-layout row wrap class="">
                                <v-flex xs12>
                                    <h3>Các tiện ích tương tác</h3>
                                </v-flex>
                                <v-flex xs12 class="mt-3">
                                    <v-layout row wrap>
                                        <v-flex xs4 class="pl-3 pr-3">
                                            <v-card class="pa-2" style="border-radius:7px"
                                                @click="dialogCall = true, dialogForm = false, chatObj.dialogChat = false, facebook.show = false, zalo.show = false">
                                                <v-flex xs12 class="text-xs-center">
                                                    <v-icon>phone_in_talk</v-icon><br>
                                                    <span>Gọi ngay</span>
                                                </v-flex>
                                            </v-card>
                                            <v-checkbox v-model="call" class="mx-2 ml-5"></v-checkbox>
                                        </v-flex>
                                        <v-flex xs4 class="pl-3 pr-3">
                                            <v-card class="pa-2" style="border-radius:7px"
                                                @click="dialogForm = true, dialogCall = false, chatObj.dialogChat = false, facebook.show = false, zalo.show = false">
                                                <v-flex xs12 class="text-xs-center">
                                                    <v-icon>mail_outline</v-icon><br>
                                                    <span>Đăng ký</span>
                                                </v-flex>
                                            </v-card>
                                            <v-checkbox v-model="form" class="mx-2 ml-5"></v-checkbox>
                                        </v-flex>
                                        <v-flex xs4 class="pl-3 pr-3">
                                            <v-card class="pa-2" style="border-radius:7px"
                                                @click="dialogCall = false, dialogForm = false, chatObj.dialogChat = true, facebook.show = false, zalo.show = false">
                                                <v-flex xs12 class="text-xs-center">
                                                    <v-icon>question_answer</v-icon><br>
                                                    <span>Chat</span>
                                                </v-flex>
                                            </v-card>
                                            <v-checkbox v-model="chatObj.showChat" class="mx-2 ml-5"></v-checkbox>
                                        </v-flex>
                                        <v-flex xs4 class="pl-3 pr-3">
                                            <v-card class="pa-2" style="border-radius:7px"
                                                @click="dialogCall = false, dialogForm = false, chatObj.dialogChat = false, facebook.show = true, zalo.show = false">
                                                <v-flex xs12 class="text-xs-center">
                                                    <v-img src="/mess.png" alt="facebook"
                                                        style="width:30px; margin-left:33%" aspect-ratio="1"></v-img>
                                                    <span>FaceBook</span>
                                                </v-flex>
                                            </v-card>
                                            <v-checkbox v-model="facebook.showBtn" class="mx-2 ml-5"></v-checkbox>
                                        </v-flex>
                                        <v-flex xs4 class="pl-3 pr-3">
                                            <v-card class="pa-2" style="border-radius:7px"
                                                @click="dialogCall = false, dialogForm = false, chatObj.dialogChat = false, facebook.show = false, zalo.show = true">
                                                <v-flex xs12 class="text-xs-center">
                                                    <v-img src="/zalo.png" alt="facebook"
                                                        style="width:30px; margin-left:33%" aspect-ratio="1"></v-img>
                                                    <span>Zalo</span>
                                                </v-flex>
                                            </v-card>
                                            <v-checkbox v-model="zalo.showBtn" class="mx-2 ml-5"></v-checkbox>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <strong>Màu chữ</strong>
                                    <v-radio-group v-model="colorText" row>
                                        <v-radio label="Sáng" value="#fff"></v-radio>
                                        <v-radio label="Tối" value="#000"></v-radio>
                                    </v-radio-group>
                                </v-flex>
                                <v-flex xs12>
                                    <strong>Kích cỡ</strong>
                                </v-flex>
                                <v-layout row class="pl-5">
                                    <v-btn fab class="mt-2" @click="small = true; large = false" small>X0,5</v-btn>
                                    <v-btn fab class="mt-1 ml-5" @click="small = false; large = false">X1</v-btn>
                                    <v-btn fab large class="ml-5" @click="small = false; large = true">X1.5</v-btn>
                                </v-layout>
                                <v-flex xs12>
                                    <strong>Vị trí</strong>
                                </v-flex>
                                <v-layout row v-if="xy" style="width:100%">
                                    <v-flex xs4>
                                        <v-btn @click="styleForBtn('bottom:10px','left:0')" class="pr-1 py-2">
                                            Bottom-Left
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-btn @click="styleForBtn('bottom:10px','left:45%')" class="pa-1 py-2">
                                            Bottom-Center
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-btn @click="styleForBtn('bottom:10px','right:0')" class="pa-1 py-2">
                                            Bottom-Right
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap v-else>
                                    <v-flex xs6>
                                        <v-btn @click="styleForBtn('top:45%','left:0')" class="pa-1 py-2">Mid-Left
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-btn @click="styleForBtn('top:45%','right:0')" class="pa-1 py-2">Mid-Right
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-btn @click="styleForBtn('bottom:10px','left:0')" class="pa-1 py-2">
                                            Bottom-Left
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-btn @click="styleForBtn('bottom:10px','right:0')" class="pa-1 py-2">
                                            Bottom-Right
                                        </v-btn>
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
                                <v-btn v-if="facebook.showBtn" fab :small="small" :large="large">
                                    <v-img src="/mess.png" alt="facebook" style="width:100%" aspect-ratio="1"></v-img>
                                </v-btn>
                                <v-btn v-if="zalo.showBtn" fab :small="small" :large="large">
                                    <v-img src="/zalo.png" alt="zalo" style="width:100%" aspect-ratio="1"></v-img>
                                </v-btn>
                                <v-btn v-if="call" fab :dark="dark" :small="small" :large="large" :color="color">
                                    <v-icon>phone_in_talk</v-icon>
                                </v-btn>
                                <v-btn v-if="form" @click="showForDialog = true" fab :dark="dark" :small="small"
                                    :large="large" :color="colorForm">
                                    <v-icon>email</v-icon>
                                </v-btn>
                                <v-btn v-if="chatObj.showChat" fab :dark="dark" :small="small" :large="large"
                                    :color="chatObj.colorChat">
                                    <v-icon>message</v-icon>
                                </v-btn>
                            </div>
                            <div :style="styleBtn" v-else>
                                <v-btn v-if="facebook.showBtn" fab :small="small" :large="large">
                                    <v-img src="/mess.png" alt="facebook" style="width:100%" aspect-ratio="1"></v-img>
                                </v-btn>
                                <br v-if="zalo.showBtn" />
                                <v-btn v-if="zalo.showBtn" fab :small="small" :large="large">
                                    <v-img src="/zalo.png" alt="zalo" style="width:100%" aspect-ratio="1"></v-img>
                                </v-btn>
                                <br v-if="form" />
                                <v-btn v-if="form" @click="showForDialog = true" fab :dark="dark" :small="small"
                                    :large="large" :color="colorForm">
                                    <v-icon>email</v-icon>
                                </v-btn>
                                <br v-if="call" />
                                <v-btn v-if="call" fab :dark="dark" :small="small" :large="large" :color="color">
                                    <v-icon>phone_in_talk</v-icon>
                                </v-btn>
                                <br v-if="chatObj.showChat" />
                                <v-btn v-if="chatObj.showChat" fab :dark="dark" :small="small" :large="large"
                                    :color="chatObj.colorChat">
                                    <v-icon>message</v-icon>
                                </v-btn>
                            </div>
                        </v-flex>
                        <template v-if="$vuetify.breakpoint.mdAndUp">
                            <v-flex lg6 xl7 offset-lg1 v-if="dialogCall">
                                <v-card>
                                    <v-card-title>
                                        <h3>Cài đặt nút gọi</h3>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-layout row wrap class="pl-5 pr-3">
                                            <v-flex xs12>
                                                <h4>Số điện thoại</h4>
                                                <v-text-field v-model="text" :rules="rule"
                                                    placeholder="Nhập số điện thoại" outlined dense>
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
                                                <v-btn class="mt-2" :color="color" @click="dialog = true" dark>Chọn màu
                                                    sắc
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
                                                <h3>Thông điệp nút</h3>
                                                <v-text-field v-model="formDescription" outlined dense></v-text-field>
                                                <h3>Thông báo</h3>
                                                <v-text-field v-model="alertFinish" outlined dense></v-text-field>
                                                <h3 class="mb-3">Custom input</h3>
                                                <v-layout v-for="(properti,key) in properties" :key="key" xs12>
                                                    <v-select v-model="properti.value" disabled :items="input"
                                                        v-if="key == 0 || key ==1 || key ==2" item-text="label"
                                                        item-value="value" label="Trường bắt buộc" outline></v-select>
                                                    <v-select v-model="properti.value" :items="input1"
                                                        v-if="key == 3 || key == 4" item-text="label" item-value="value"
                                                        label="Chọn trường nhập" outline></v-select>
                                                    <v-btn class="mt-2 ml-3" color="error"
                                                        v-if="properti.value != 'lastName' && properti.value != 'email' && properti.value != 'phone'"
                                                        flat icon @click="removeInput(key)">
                                                        <v-icon>clear</v-icon>
                                                    </v-btn>
                                                </v-layout>
                                            </v-flex>
                                            <v-flex xs12>
                                                <v-btn class="mt-2 mr-5" color="primary" @click="addInput()">Thêm trường
                                                    nhập
                                                </v-btn>
                                                <v-btn class="mt-2 ml-5" :color="colorForm" @click="dialog1 = true"
                                                    dark>
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
                                        <v-btn color="green darken-1" text dark @click="form = true, checkForm()">
                                            Lưu
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                            <v-flex lg6 xl7 offset-lg1 v-if="chatObj.dialogChat">
                                <v-card>
                                    <v-card-title>
                                        <h2>Cài đặt nút Chat</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-layout row wrap class="pl-5 pr-3">
                                            <v-flex xs12>
                                                <v-btn class="mt-2 ml-5" :color="chatObj.colorChat"
                                                    @click="chatObj.colorDialog = true" dark>
                                                    Chọn màu sắc nút</v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="gray darken-1" text @click="chatObj.dialogChat = false">
                                            Đóng
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                            <v-flex lg6 xl7 offset-lg1 v-if="facebook.show">
                                <v-card>
                                    <v-card-title>
                                        <h2>Cài đặt Facebook</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-layout row wrap class="pl-5 pr-3">
                                            <v-flex xs12>
                                                <h4>Link facebook của bạn</h4>
                                                <v-text-field v-model="facebook.url" :rules="rule"
                                                    placeholder="Nhập link facebook" outlined dense>
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="gray darken-1" text @click="facebook.show = false">
                                            Đóng
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" dark text
                                            @click="alertSuccess('Lưu nút thành công'),facebook.show = false">
                                            Lưu
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                            <v-flex lg6 xl7 offset-lg1 v-if="zalo.show">
                                <v-card>
                                    <v-card-title>
                                        <h2>Cài đặt zalo</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-layout row wrap class="pl-5 pr-3">
                                            <v-flex xs12>
                                                <h4>Số điện thoại zalo của bạn</h4>
                                                <v-text-field v-model="zalo.url" :rules="rule"
                                                    placeholder="Nhập số điện thoại" outlined dense>
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="gray darken-1" text @click="zalo.show = false">
                                            Đóng
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" dark text
                                            @click="alertSuccess('Lưu nút thành công'),zalo.show = false">
                                            Lưu
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                        </template>
                        <template v-else>
                            <v-dialog v-model="dialogCall" max-width="400px">
                                <v-card>
                                    <v-card-title>
                                        <h3>Cài đặt nút gọi</h3>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-layout row wrap class="pl-2 pr-2">
                                            <v-flex xs12>
                                                <h4>Số điện thoại</h4>
                                                <v-text-field v-model="text" :rules="rule"
                                                    placeholder="Nhập số điện thoại" outlined dense>
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
                                                <v-btn class="mt-2" :color="color" @click="dialog = true" dark>Chọn màu
                                                    sắc
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
                            </v-dialog>
                            <v-dialog v-model="dialogForm" max-width="400px">
                                <v-card>
                                    <v-card-title>
                                        <h1>Cài đặt nút nhập form</h1>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-layout row wrap class="pl-2 pr-2">
                                            <v-flex xs12>
                                                <h3>Tiêu đề</h3>
                                                <v-text-field v-model="nameForm" outlined dense></v-text-field>
                                                <h3>Thông điệp nút</h3>
                                                <v-text-field v-model="formDescription" outlined dense></v-text-field>
                                                <h3>Thông báo</h3>
                                                <v-text-field v-model="alertFinish" outlined dense></v-text-field>
                                                <h3 class="mb-3">Custom input</h3>
                                                <v-layout v-for="(properti,key) in properties" :key="key" xs12>
                                                    <v-select v-model="properti.value" disabled :items="input"
                                                        v-if="key == 0 || key ==1 || key ==2" item-text="label"
                                                        item-value="value" label="Trường bắt buộc" outline></v-select>
                                                    <v-select v-model="properti.value" :items="input1"
                                                        v-if="key == 3 || key == 4" item-text="label" item-value="value"
                                                        label="Chọn trường nhập" outline></v-select>
                                                    <v-btn class="mt-2 ml-3" color="error"
                                                        v-if="properti.value != 'lastName' && properti.value != 'email' && properti.value != 'phone'"
                                                        flat icon @click="removeInput(key)">
                                                        <v-icon>clear</v-icon>
                                                    </v-btn>
                                                </v-layout>
                                            </v-flex>
                                            <v-flex xs12>
                                                <v-btn class="mt-2 mr-5" color="primary" @click="addInput()">Thêm trường
                                                    nhập
                                                </v-btn>
                                                <v-btn class="mt-2 ml-5" :color="colorForm" @click="dialog1 = true"
                                                    dark>
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
                                        <v-btn color="green darken-1" text dark @click="form = true, checkForm()">
                                            Lưu
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="chatObj.dialogChat" max-width="400px">
                                <v-card>
                                    <v-card-title>
                                        <h2>Cài đặt nút Chat</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-layout row wrap class="pl-2 pr-2">
                                            <v-flex xs12>
                                                <v-btn class="mt-2 ml-5" :color="chatObj.colorChat"
                                                    @click="chatObj.colorDialog = true" dark>
                                                    Chọn màu sắc nút</v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="gray darken-1" text @click="chatObj.dialogChat = false">
                                            Đóng
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="facebook.show" max-width="400px">
                                <v-card>
                                    <v-card-title>
                                        <h2>Cài đặt Facebook</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-layout row wrap class="pl-2 pr-2">
                                            <v-flex xs12>
                                                <h4>Link facebook của bạn</h4>
                                                <v-text-field v-model="facebook.url" :rules="rule"
                                                    placeholder="Nhập link facebook" outlined dense>
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="gray darken-1" text @click="facebook.show = false">
                                            Đóng
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" dark text
                                            @click="alertSuccess('Lưu nút thành công'),facebook.show = false">
                                            Lưu
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="zalo.show" max-width="400px">
                                <v-card>
                                    <v-card-title>
                                        <h2>Cài đặt zalo</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-layout row wrap class="pl-2 pr-2">
                                            <v-flex xs12>
                                                <h4>Số điện thoại zalo của bạn</h4>
                                                <v-text-field v-model="zalo.url" :rules="rule"
                                                    placeholder="Nhập số điện thoại" outlined dense>
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="gray darken-1" text @click="zalo.show = false">
                                            Đóng
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" dark text
                                            @click="alertSuccess('Lưu nút thành công'),zalo.show = false">
                                            Lưu
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </template>
                    </v-layout>
                    <v-divider class="mt-5"></v-divider>
                </v-card-text>
                <v-card-actions>
                    <v-layout row class="pb-3">
                        <v-flex xs6 class="text-xs-left px-5">
                            <v-btn color="grey" @click="cancel()">Hủy bỏ</v-btn>
                        </v-flex>
                        <v-flex xs6 class="pr-5 text-xs-center">
                            <v-btn color="success" @click="dialogNameBtn = true">Lưu</v-btn>
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
                        <div style="width:30px;height:30px;background-color:#0000ff"></div>
                        <v-radio value="#0000ff"></v-radio>
                        <div style="width:30px;height:30px;background-color:#008000"></div>
                        <v-radio value="#008000"></v-radio>
                        <div style="width:30px;height:30px;background-color:#cc66ff"></div>
                        <v-radio value="#cc66ff"></v-radio>
                        <div style="width:30px;height:30px;background-color:#ff6600"></div>
                        <v-radio value="#ff6600"></v-radio>
                        <div style="width:30px;height:30px;background-color:#ffd800"></div>
                        <v-radio value="#ffd800"></v-radio>
                        <div style="width:30px;height:30px;background-color:#333333"></div>
                        <v-radio value="#333333"></v-radio>
                        <div style="width:30px;height:30px;background-color:#989898"></div>
                        <v-radio value="#989898"></v-radio>
                        <div style="width:30px;height:30px;background-color:#d0d0d0"></div>
                        <v-radio value="#d0d0d0"></v-radio>
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
                        <div style="width:30px;height:30px;background-color:#0000ff"></div>
                        <v-radio value="#0000ff"></v-radio>
                        <div style="width:30px;height:30px;background-color:#008000"></div>
                        <v-radio value="#008000"></v-radio>
                        <div style="width:30px;height:30px;background-color:#cc66ff"></div>
                        <v-radio value="#cc66ff"></v-radio>
                        <div style="width:30px;height:30px;background-color:#ff6600"></div>
                        <v-radio value="#ff6600"></v-radio>
                        <div style="width:30px;height:30px;background-color:#ffd800"></div>
                        <v-radio value="#ffd800"></v-radio>
                        <div style="width:30px;height:30px;background-color:#333333"></div>
                        <v-radio value="#333333"></v-radio>
                        <div style="width:30px;height:30px;background-color:#989898"></div>
                        <v-radio value="#989898"></v-radio>
                        <div style="width:30px;height:30px;background-color:#d0d0d0"></div>
                        <v-radio value="#d0d0d0"></v-radio>
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
        <v-dialog v-model="chatObj.colorDialog" max-width="500">
            <v-card>
                <v-card-title>
                    Chọn màu cho nút
                </v-card-title>
                <v-card-text>
                    <v-radio-group v-model="chatObj.colorChat" row>
                        <div style="width:30px;height:30px;background-color:#0000ff"></div>
                        <v-radio value="#0000ff"></v-radio>
                        <div style="width:30px;height:30px;background-color:#008000"></div>
                        <v-radio value="#008000"></v-radio>
                        <div style="width:30px;height:30px;background-color:#cc66ff"></div>
                        <v-radio value="#cc66ff"></v-radio>
                        <div style="width:30px;height:30px;background-color:#ff6600"></div>
                        <v-radio value="#ff6600"></v-radio>
                        <div style="width:30px;height:30px;background-color:#ffd800"></div>
                        <v-radio value="#ffd800"></v-radio>
                        <div style="width:30px;height:30px;background-color:#333333"></div>
                        <v-radio value="#333333"></v-radio>
                        <div style="width:30px;height:30px;background-color:#989898"></div>
                        <v-radio value="#989898"></v-radio>
                        <div style="width:30px;height:30px;background-color:#d0d0d0"></div>
                        <v-radio value="#d0d0d0"></v-radio>
                    </v-radio-group>
                </v-card-text>
                <v-card-actions>
                    <v-flex class="text-xs-left">
                        <v-btn color="gray" text @click="chatObj.colorDialog = false">
                            Đóng
                        </v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showForDialog" max-width="400">
            <v-card>
                <v-card-title :background-color="colorForm">
                    <h2>{{nameForm}}</h2>
                </v-card-title>
                <v-card-text class="py-2">
                    <v-layout row wrap v-for="(item,key) in properties" :key="key"
                        style="border:1px solid #999; border-radius:10px" class="pa-2 mt-2">
                        <!-- <v-text-field :key="key" style="width:100%" :placeholder="item.value" outlined dense>
                        </v-text-field> -->
                        <p class="ml-2 mt-1" v-if="item.value == 'lastName'"><strong>Họ và tên</strong></p>
                        <p class="ml-2 mt-1" v-if="item.value == 'phone'"><strong>Số điện thoại</strong></p>
                        <p class="ml-2 mt-1" v-if="item.value == 'email'"><strong>Đại chỉ email</strong></p>
                        <p class="ml-2 mt-1" v-if="item.value == 'city'"><strong>Thành phố</strong></p>
                        <p class="ml-2 mt-1" v-if="item.value == 'business'"><strong>nghề nghiệp</strong></p>
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
        <v-dialog v-model="dialogNameBtn" max-width="400">
            <v-card>
                <v-card-title></v-card-title>
                <v-card-text>
                    <h2>Nhập tên menu</h2>
                    <v-flex xs12>
                        <v-text-field v-model="nameBtn" class="mt-3" :rules="rule" style="width:100%"
                            placeholder="Tên nút" outlined dense></v-text-field>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-layout row class="pb-3">
                        <v-flex xs12 class="pr-2 text-xs-right">
                            <v-btn color="success" @click="saveBtn()">Lưu</v-btn>
                        </v-flex>
                    </v-layout>
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
            idGroupBtn: {
                type: String,
                default: null
            }
        },
        data() {
            return {
                facebook: {
                    url: '',
                    show: false,
                    showBtn: false
                },
                zalo: {
                    url: '',
                    show: false,
                    showBtn: false
                },
                chatObj: {
                    showChat: false,
                    colorChat: '#8E00FF',
                    dialogChat: false,
                    colorDialog: false,
                    demoChatDialog: false,
                    nameUser: '',
                    emailUser: '',
                    demoChatSection: 'signup',
                    chatHistory: [{
                            text: 'abc',
                            value: 'send'
                        },
                        {
                            text: 'abc',
                            value: 'send'
                        },
                        {
                            text: 'abc',
                            value: 'send'
                        },
                        {
                            text: 'def',
                            value: 'receive'
                        },
                    ]
                },
                tab: 0,
                tabs: [{
                    text: 'Điện thoại'
                }, {
                    text: 'Máy tính'
                }],
                color: '#8E00FF',
                colorForm: '#8E00FF',
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
                    value: 'phone',
                    label: 'Số điện thoại'
                }],
                input1: [{
                    value: 'city',
                    label: 'Thành phố'
                }, {
                    value: 'bussiness',
                    label: 'Nghề nghiệp'
                }],
                nameForm: 'Đăng ký để nhận khuyến mãi',
                formDescription: 'Đăng ký ngay',
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
                properties: [{
                    value: 'lastName'
                }, {
                    value: 'email'
                }, {
                    value: 'phone'
                }],
                textCall: '',
                alertFinish: 'Đăng ký thành công',
                propertiesbtn: [],
                dialogNameBtn: false,
                requestApi: true
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
            }
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
                    this.dark = false
                } else if (this.colorText == '#fff') {
                    this.dark = true
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
                if (this.properties.length >= 5) {
                    this.alertError(`Được phép tạo tối đa 5 trường bạn đã tạo ${this.properties.length}`)
                } else {
                    let a = {
                        value: ''
                    }
                    this.properties.push(a)
                    this.properties = [...this.properties]
                }
            },
            removeInput(data) {
                this.properties.splice(data, 1)
                this.properties = [...this.properties]
            },
            checkForm() {
                this.propertiesbtn = []
                for (let i = 0; i < this.properties.length; i++) {
                    this.propertiesbtn.push(this.properties[i].value)
                }
                if (this.propertiesbtn.indexOf('') > 0) {
                    this.alertError(`Trường ${this.propertiesbtn.indexOf('') + 1} bị rỗng`)
                    this.requestApi = false
                } else {
                    this.alertSuccess(`Lưu nút form thành công với ${this.propertiesbtn.length} trường`)
                    this.requestApi = true
                }
            },
            createGbtn() {
                this.checkForm()
                if (this.small == true) {
                    this.sizeButton = 40
                } else if (this.small == false && this.large == false) {
                    this.sizeButton = 52
                } else {
                    this.sizeButton = 70
                }
                const output = [...new Set(this.propertiesbtn)]
                let form = {
                    buttonColor: this.colorForm,
                    description: this.formDescription,
                    formMessage: "Để lại lời nhắn",
                    formMessageReturn: this.alertFinish,
                    title: this.nameForm,
                    type: "FORM",
                    properties: output,

                }
                let call = {
                    buttonColor: this.color,
                    description: "",
                    formMessage: "Gọingay",
                    phoneNumber: this.text,
                    title: "Vui lòng để lại số điện thoại, chúng tôi sẽ gọi lại ngay sau 5 phút.",
                    type: "CALL",
                }
                let chat = {
                    buttonColor: this.chatObj.colorChat,
                    description: "Để lại thông tin của bạn rồi chat với chúng tôi",
                    formMessage: "Cảm ơn vì đã liên lạc với chúng tôi",
                    title: "Chat ngay thôi",
                    type: "CHAT",
                }
                let facebook = {
                    phoneNumber: this.facebook.url,
                    type: "FACEBOOK"
                }
                let zalo = {
                    phoneNumber: this.zalo.url,
                    type: "ZALO"
                }
                let listButton = [];
                if (this.call == true) {
                    if (this.text == null || this.text == '') {
                        this.alertError("Chưa điền số điện thoại ở nút Click to Call")
                    } else {
                        listButton.push(call)
                    }
                }
                if (this.form == true) {
                    listButton.push(form)
                }
                if (this.chatObj.showChat == true) {
                    listButton.push(chat)
                }
                if (this.facebook.showBtn == true) {
                    if (this.facebook.url.indexOf('https://www.facebook.com/') == 0) {
                        facebook.phoneNumber = this.facebook.url.replace("https://www.facebook.com/", "")
                        listButton.push(facebook)
                    } else if (this.facebook.url.indexOf('https://www.facebook.com/')) {
                        facebook.phoneNumber = this.facebook.url.replace("http://www.facebook.com/", "")
                        listButton.push(facebook)
                    } else {
                        facebook.phoneNumber = this.facebook.url
                        listButton.push(facebook)
                    }
                }
                if (this.zalo.showBtn == true) {
                    listButton.push(zalo)
                }
                if (listButton.length == 0) {
                    this.alertError("Bạn chưa chọn nút cần tạo")
                } else {
                    if (this.bottom == null && this.top == null && this.left == null && this.right == null) {
                        let btn = {
                            name: this.nameBtn,
                            vertical: this.xy,
                            leadHubButtonGroupId: this.idGroupBtn,
                            accountId: this.idAccount,
                            listButton: listButton,
                            style: {
                                bottom: 2,
                                top: null,
                                right: 5,
                                color: this.colorText,
                                left: null,
                                size: `${this.sizeButton}`,
                            }
                        }
                        if(this.call == true && this.text == ''){this.alertError('Bạn chưa điền số điện thoại ở nút gọi')}
                        else if(this.facebook.showBtn == true && this.facebook.url == ''){this.alertError('Bạn chưa điền link ở nút facebook')}
                        else if(this.zalo.showBtn == true && this.zalo.url == ''){this.alertError('Bạn chưa điền số điện thoại ở nút zalo')}
                        else{this.updateGbtn(btn)}
                    } else {
                        let btn = {
                            name: this.nameBtn,
                            vertical: this.xy,
                            leadHubButtonGroupId: this.idGroupBtn,
                            accountId: this.idAccount,
                            listButton: listButton,
                            style: {
                                bottom: this.bottom,
                                top: this.top,
                                right: this.right,
                                color: this.colorText,
                                left: this.left,
                                size: `${this.sizeButton}`,
                            }
                        }
                        if(this.call == true && this.text == ''){this.alertError('Bạn chưa điền số điện thoại ở nút gọi')}
                        else if(this.facebook.showBtn == true && this.facebook.url == ''){this.alertError('Bạn chưa điền link ở nút facebook')}
                        else if(this.zalo.showBtn == true && this.zalo.url == ''){this.alertError('Bạn chưa điền số điện thoại ở nút zalo')}
                        else{this.updateGbtn(btn)}
                    }
                }
            },
            updateGbtn(btn) {
                if (this.requestApi == true) {
                    leadhubService.updateGbtn(this.idAccount, btn).then(result => {
                        if (result.code == "SUCCESS") {
                            this.alertSuccess('Sửa thành công')
                            router.replace(`/contacts/${this.idAccount}/leadhub`)
                        } else {
                            this.alertError(result.message)
                        }
                    })
                }
            },
            getBtnInfo() {
                leadhubService.getInfoBtn(this.idAccount, this.idGroupBtn).then(result => {
                    this.nameBtn = result.response.name
                    this.xy = result.response.vertical
                    for (let i = 0; i < result.response.listButton.length; i++) {
                        if (result.response.listButton[i].type == "CALL") {
                            this.call = true
                            this.color = result.response.listButton[i].buttonColor
                            this.text = result.response.listButton[i].phoneNumber
                            this.textCall = result.response.listButton[i].title
                        } else if (result.response.listButton[i].type == "FORM") {
                            this.form = true
                            this.properties = []
                            this.colorForm = result.response.listButton[i].buttonColor
                            this.alertFinish = result.response.listButton[i].formMessageReturn
                            this.nameForm = result.response.listButton[i].title
                            this.formDescription = result.response.listButton[i].description
                            for (let index = 0; index < result.response.listButton[i].properties
                                .length; index++) {
                                let a = {
                                    value: result.response.listButton[i].properties[index]
                                }
                                this.properties.push(a)
                            }
                        } else if (result.response.listButton[i].type == "CHAT") {
                            this.chatObj.showChat = true
                            this.chatObj.colorChat = result.response.listButton[i].buttonColor
                        } else if (result.response.listButton[i].type == "FACEBOOK") {
                            this.facebook.showBtn = true
                            if (result.response.listButton[i].phoneNumber.indexOf(
                                'https://www.facebook.com/') == 0 || result.response.listButton[i].phoneNumber
                                .indexOf('http://www.facebook.com/') == 0) {
                                this.facebook.url = result.response.listButton[i].phoneNumber
                            } else {
                                this.facebook.url =
                                    `https://www.facebook.com/${result.response.listButton[i].phoneNumber}`
                            }
                        } else if (result.response.listButton[i].type == "ZALO") {
                            this.zalo.showBtn = true
                            this.zalo.url = result.response.listButton[i].phoneNumber
                        }
                    }
                    this.colorText = result.response.style.color
                    if (result.response.style.size == "40") {
                        this.small = true
                        this.large = false
                    } else if (result.response.style.size == "52") {
                        this.small = false
                        this.large = false
                    } else if (result.response.style.size == "70") {
                        this.large = true
                        this.small = false
                    }
                    if (result.response.style.bottom == "5" && result.response.style.left == "2" && result
                        .response.style.top == null && result.response.style.right == null) {
                        this.styleForBtn("bottom:10px", "left:0")
                    } else if (result.response.style.bottom == "5" && result.response.style.left == "45" &&
                        result.response.style.top == null && result.response.style.right == null) {
                        this.styleForBtn("bottom:10px", "left:45%")
                    } else if (result.response.style.bottom == "5" && result.response.style.left == null &&
                        result.response.style.top == null && result.response.style.right == "2") {
                        this.styleForBtn("bottom:10px", "right:0")
                    } else if (result.response.style.bottom == null && result.response.style.left == "2" &&
                        result.response.style.top == "45" && result.response.style.right == null) {
                        this.styleForBtn("top:45%", "left:0")
                    } else if (result.response.style.bottom == null && result.response.style.left == null &&
                        result.response.style.top == "45" && result.response.style.right == "2") {
                        this.styleForBtn("top:45%", "right:0")
                    } else if (result.response.style.bottom == "5" && result.response.style.left == null &&
                        result.response.style.top == null && result.response.style.right == "2") {
                        this.styleForBtn("bottom:10px", "right:0")
                    }
                    this.colorTxt()
                })
            },
            cancel() {
                router.replace(`/contacts/${this.idAccount}/leadhub`)
            }
        },
        created() {
            this.getBtnInfo()
        },
        components: {
            alert
        }
    }
</script>