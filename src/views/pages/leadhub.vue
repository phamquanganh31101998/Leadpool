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
                                <v-progress-linear :indeterminate="true" v-if="checkData"></v-progress-linear>
                                <template v-for="(item, index) in items" v-else>
                                    <v-list-tile :key="item.leadHubButtonGroupId" avatar ripple @click="choise(item)">
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                                            <v-list-tile-sub-title>{{returnTime(item.updateAt)}}</v-list-tile-sub-title>
                                        </v-list-tile-content>

                                        <v-list-tile-action>
                                            <v-layout row>
                                                <v-btn flat icon color="warning"
                                                @click="updatedGbtn(item.leadHubButtonGroupId)">
                                                <v-icon>edit</v-icon>
                                            </v-btn>
                                            <v-btn flat icon color="red" @click="deleteConfirm = true">
                                                <v-icon>delete</v-icon>
                                            </v-btn>
                                            </v-layout>
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
                <v-layout row class="mb-2" v-if="showCall === true || showForm == true">
                    <v-flex xs12>
                        <v-card style="width:100%">
                            <v-card-text>
                                <v-layout row>
                                    <p>Để hiển thị menu trên website của bạn. Hãy sao chép đoạn mã bên dưới và dán vào
                                        trong thẻ body trong mã nguồn website của bạn</p>
                                </v-layout>
                                <v-layout row>
                                    <v-flex lg9 class="ml-5 pt-2">
                                        <input style="width:100%; height:38px; border:1px solid #bebebe" type="text"
                                            :value="scrpitText" id="copy">
                                    </v-flex>
                                    <v-flex lg2>
                                        <v-btn class=" ml-2" tile outlined color="success" @click="copy()">
                                            <v-icon left>file_copy</v-icon> Copy
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-layout row>
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
                                        <v-card flat style="padding-left:32%">
                                            <v-img src="../../../mobile.png" height="600px"
                                                style="position:relative; width:290px">
                                                <div :style="styleBtn" v-if="show && selected.vertical == false">
                                                    <v-btn fab :dark="dark" small :color="styleBtnForm.buttonColor" v-if="showForm">
                                                        <v-icon>email</v-icon>
                                                    </v-btn>
                                                    <br>
                                                    <v-btn fab :dark="dark" small :color="styleBtnCall.buttonColor" v-if="showCall">
                                                        <v-icon>phone_in_talk</v-icon>
                                                    </v-btn>
                                                </div>
                                                <div :style="styleBtn" v-if="show && selected.vertical == true">
                                                    <v-btn fab :dark="dark" small :color="styleBtnCall.buttonColor" v-if="showCall">
                                                        <v-icon>phone_in_talk</v-icon>
                                                    </v-btn>
                                                    <v-btn fab :dark="dark" small :color="styleBtnForm.buttonColor" v-if="showForm">
                                                        <v-icon>email</v-icon>
                                                    </v-btn>
                                                </div>
                                            </v-img>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-img src="../../../desktop.png" height="500px" style="position:relative">
                                                <div :style="styleBtnDesktop" v-if="show && selected.vertical == false">
                                                    <v-btn fab :dark="dark" small :color="styleBtnForm.buttonColor" v-if="showForm">
                                                        <v-icon>email</v-icon>
                                                    </v-btn>
                                                    <br>
                                                    <v-btn fab :dark="dark" small :color="styleBtnCall.buttonColor" v-if="showCall">
                                                        <v-icon>phone_in_talk</v-icon>
                                                    </v-btn>
                                                </div>
                                                <div :style="styleBtnDesktop" v-if="show && selected.vertical == true">
                                                    <v-btn fab :dark="dark" small :color="styleBtnCall.buttonColor" v-if="showCall">
                                                        <v-icon>phone_in_talk</v-icon>
                                                    </v-btn>
                                                    <v-btn fab :dark="dark" small :color="styleBtnForm.buttonColor" v-if="showForm">
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
        <v-dialog v-model="deleteConfirm" max-width="500">
            <v-card>
                <v-card-title></v-card-title>
                <v-card-text class="pl-4">
                    <h2>Bạn có chắn chắn muốn xóa bộ nút: {{selected.name}}</h2>
                    <p>Được tạo ngày: {{returnTime(selected.updateAt)}}</p>
                    <p v-if="deleteConfirm">Gồm có: {{selected.listButton.length}} nút</p>
                </v-card-text>
                <v-card-actions>
          
          <v-btn color="gray" flat @click="deleteConfirm = false">Hủy bỏ</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="deleteGbtn()">Đồng ý</v-btn>
        </v-card-actions>
            </v-card>
        </v-dialog>
        <alert />
    </v-content>
</template>
<script>
    import router from '@/router'
    import alert from '@/components/alert'
    import leadhubService from '@/services/leadhub.service.js'
    import moment from 'moment'
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
                styleBtnForm: null,
                styleBtn: '',
                styleBtnDesktop: '',
                showCall: false,
                showForm: false,
                checkData: true,
                dark: true,
                deleteConfirm: false,
            }
        },
        watch: {
            selected() {
                this.show = true
                console.log(this.selected)
                if (this.selected.style.bottom == "5" && this.selected.style.left == "2" && this.selected.style
                    .top == null && this.selected.style.right == null) {
                    this.styleGroupBtn("bottom:5%", "left:4%")
                    this.styleGroupBtnDesk("bottom:10%", "left:4%")
                } else if (this.selected.style.bottom == "5" && this.selected.style.left == "45" && this.selected
                    .style.top == null && this.selected.style.right == null) {
                    this.styleGroupBtn("bottom:5%", "left:30%")
                    this.styleGroupBtnDesk("bottom:10%", "left:43%")
                } else if (this.selected.style.bottom == "5" && this.selected.style.left == null && this.selected
                    .style.top == null && this.selected.style.right == "2") {
                    this.styleGroupBtn("bottom:5%", "right:10%")
                    this.styleGroupBtnDesk("bottom:10%", "right:4%")
                } else if (this.selected.style.bottom == null && this.selected.style.left == "2" && this.selected
                    .style.top == "45" && this.selected.style.right == null) {
                    this.styleGroupBtn("top:45%", "left:4%")
                    this.styleGroupBtnDesk("top:45%", "left:4%")
                } else if (this.selected.style.bottom == null && this.selected.style.left == null && this.selected
                    .style.top == "45" && this.selected.style.right == "2") {
                    this.styleGroupBtn("top:45%", "right:10%")
                    this.styleGroupBtnDesk("top:45%", "right:4%")
                } else if (this.selected.style.bottom == "5" && this.selected.style.left == null && this.selected
                    .style.top == null && this.selected.style.right == "2") {
                    this.styleGroupBtn("bottom:5%", "right:10%")
                    this.styleGroupBtnDesk("bottom:10%", "right:4%")
                }
            }
        },
        computed: {
            scrpitText() {
                return `<script src="${process.env.VUE_APP_BASE_URL}adstech-leadhub.js?accId=${this.selected.accountId}&gBtnId=${this.selected.leadHubButtonGroupId}" type="text/javascript" async><\/script>`
            }
        },
        methods: {
            returnTime(data){
                return moment(data).lang('vi').format('llll')
            },
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
                this.showCall = false
                this.showForm = false
                for (let i = 0; i < key.listButton.length; i++) {
                    if (key.listButton[i].type == "CALL") {
                        this.styleBtnCall = key.listButton[i]
                        this.showCall = true
                    } else if (key.listButton[i].type == "FORM") {
                        this.styleBtnForm = key.listButton[i]
                        this.showForm = true
                    }
                }
                if (key.style.color == "#fff") {
                    this.dark = true
                }else if(key.style.color == "#000"){
                    this.dark = false
                }
            },
            getAllGroupBtn() {
                leadhubService.getListGbtn(this.idAccount).then(result => {
                    this.items = result.response
                    this.checkData = false
                })
            },
            updatedGbtn(GBtnId) {
                router.replace(`/contacts/${this.idAccount}/update/${GBtnId}`)
            },
            deleteGbtn() {
                leadhubService.deleteGbtn(this.idAccount, this.selected.leadHubButtonGroupId).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    if (result.code == "SUCCESS") {
                        dispatch('alert/success', `Xóa bộ nút ${this.selected.name} thành công`)
                        this.showForm = false
                        this.showCall = false
                        this.deleteConfirm = false
                        this.selected = {}
                    } else {
                        dispatch('alert/error', result.message)
                    }
                    this.getAllGroupBtn()
                })
            },
            styleGroupBtn(tOb, lOr) {
                this.styleBtn = `position: absolute; ${tOb}; ${lOr};z-index: 999999`
            },
            styleGroupBtnDesk(tOb, lOr) {
                this.styleBtnDesktop = `position: absolute; ${tOb}; ${lOr};z-index: 999999`
            }
        },
        created() {
            this.getAllGroupBtn()
        },
        components: {
            alert
        }
    }
</script>