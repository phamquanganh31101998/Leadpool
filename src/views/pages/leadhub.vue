<template>
    <v-content>
        <v-layout row wrap class="px-3 my-3">
            <h2>Cài đặt</h2>
        </v-layout>
        <v-layout row wrap class="pl-3 pr-3">
            <v-flex lg4 class="pr-2">
                <v-card>
                    <v-card-text>
                        <v-layout row class="pl-3">
                            <v-flex>
                                <span style="font-size:17px">Danh sách nút</span>
                            </v-flex>
                            <v-flex class="text-xs-right">
                                <v-btn small color="primary" dark @click="gotoSetting">
                                    <v-icon>add</v-icon> Thêm nút
                                </v-btn>
                            </v-flex>
                        </v-layout>
                        <v-divider class="mt-3"></v-divider>
                        <v-layout row>
                            <v-list two-line style="width:100%">
                                <template v-for="(item, index) in items">
                                    <v-list-tile :key="item.leadHubButtonGroupId" avatar ripple @click="choise(item)">
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                                        </v-list-tile-content>

                                        <v-list-tile-action>
                                            <v-list-tile-action-text>{{ item.createdAt }}</v-list-tile-action-text>
                                        </v-list-tile-action>

                                    </v-list-tile>
                                    <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
                                </template>
                            </v-list>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex lg8>
                <v-layout row>
                    <v-flex xs12>
                        <v-card style="width:100%">
                            <v-card-text>
                                <v-layout row>
                                    <p>Để hiển thị menu trên website của bạn. Hãy sao chép đoạn mã bên dưới và dán vào
                                        trong thẻ body trong mã nguồn website của bạn</p>
                                </v-layout>
                                <v-layout row>
                                    <v-flex lg9 class="ml-5">
                                        <input style="width:100%; height:38px; border:1px solid #bebebe" type="text"
                                            :value="scrpitText"
                                            id="copy">
                                    </v-flex>
                                    <v-flex lg22>
                                        <v-btn class=" ml-2" tile outlined color="success" @click="copy()">
                                            <v-icon left>file_copy</v-icon> Copy
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-layout row class="mt-3">
                    <v-flex xs12>
                        <v-card style="width:100%">
                            <v-card-text>
                                <v-tabs v-model="tab" background-color="transparent" centered>
                                    <v-tab v-for="(n,key) in tabs" :key="key">
                                        {{ n.text }}
                                    </v-tab>
                                </v-tabs>
                                <v-tabs-items v-model="tab">
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-img src="../../../mobile.png" height="500px" style="position:relative; width:290px">
                                                <div style="position: absolute; bottom: 6px; left: 13px;z-index: 999999"
                                                    v-if="show && selected.vertical == false">
                                                    <v-btn class="" fab dark small :color="styleBtnCall.buttonColor">
                                                        <v-icon>phone_in_talk</v-icon>
                                                    </v-btn>
                                                    <br>
                                                    <v-btn style="" fab dark small :color="styleBtnForm.buttonColor"
                                                        class="">
                                                        <v-icon>email</v-icon>
                                                    </v-btn>
                                                </div>
                                                <div style="position: absolute; bottom: 6px; left: 0;z-index: 999999"
                                                    v-if="show && selected.vertical == true">
                                                    <v-btn class="" fab dark small :color="styleBtnCall.buttonColor">
                                                        <v-icon>phone_in_talk</v-icon>
                                                    </v-btn>
                                                    <v-btn style="top:0; left: 0" fab dark small :color="styleBtnForm.buttonColor"
                                                        class="">
                                                        <v-icon>email</v-icon>
                                                    </v-btn>
                                                </div>
                                            </v-img>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-img src="../../../desktop.png" height="500px" style="position:relative">
                                                <div style="position: absolute; bottom: 50px; left: 30px;z-index: 999999"
                                                    v-if="show && selected.vertical == false">
                                                    <v-btn class="" fab dark small :color="styleBtnCall.buttonColor">
                                                        <v-icon>phone_in_talk</v-icon>
                                                    </v-btn>
                                                    <br>
                                                    <v-btn style="top:0; left: 0" fab dark small :color="styleBtnForm.buttonColor"
                                                        class="">
                                                        <v-icon>email</v-icon>
                                                    </v-btn>
                                                </div>
                                                <div style="position: absolute; bottom: 6px; left: 0;z-index: 999999"
                                                    v-if="show && selected.vertical == true">
                                                    <v-btn class="" fab dark small :color="styleBtnCall.buttonColor">
                                                        <v-icon>phone_in_talk</v-icon>
                                                    </v-btn>
                                                    <v-btn style="top:0; left: 0" fab dark small :color="styleBtnForm.buttonColor"
                                                        class="">
                                                        <v-icon>email</v-icon>
                                                    </v-btn>
                                                </div>
                                            </v-img>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <alert />
    </v-content>
</template>
<script>
    import router from '@/router'
    import alert from '@/components/alert'
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
                selected: {},
                items: [],
                tabs: [{
                    text: 'Giao diện mobile'
                }, {
                    text: 'Giao diện máy tính'
                }],
                tab: null,
                show: false,
                styleBtnCall: null,
                styleBtnForm: null
            }
        },
        watch: {
            selected() {
                this.show = true
            }
        },
        computed:{
            scrpitText(){
                return `<script src="${process.env.VUE_APP_BASE_URL}test.js?accId=${this.selected.accountId}&gBtnId=${this.selected.leadHubButtonGroupId}" type="text/javascript" async><\/script>`
            }
        },
        methods: {
            gotoSetting() {
                router.replace(`/contacts/${this.idAccount}/setting`)
            },
            copy() {
                /* Get the text field */
                var copyText = document.getElementById("copy");

                /* Select the text field */
                copyText.select();

                /* Copy the text inside the text field */
                document.execCommand("copy");
            },
            choise(key) {
                this.selected = key
                for (let i = 0; i < key.listButton.length; i++) {
                    if(key.listButton[i].type == "CALL"){
                        this.styleBtnCall = key.listButton[i]
                    }else if (key.listButton[i].type == "FORM") {
                        this.styleBtnForm = key.listButton[i]
                    }
                }
                console.log(this.selected)
            },
            getAllGroupBtn(){
                leadhubService.getListGbtn(this.idAccount).then(result =>{
                    this.items = result.response
                })
            }
        },
        created(){
            this.getAllGroupBtn()
        },
        components: {
            alert
        }
    }
</script>