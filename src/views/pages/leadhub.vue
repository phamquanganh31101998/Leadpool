<template>
    <v-content>
        <v-layout row wrap class="px-3 my-3">
            
            <v-flex xs12 sm12 md12 lg12 xl12>
                <h1>{{title}}</h1>
                <br>
                <!-- <v-select :items="selectSection" v-model="section"></v-select> -->
                <v-btn :color="sectionColor[0]" @click="section='setting', sectionColor[0] = 'primary', sectionColor[1] = ''">Cài đặt bộ nút</v-btn>
                <v-btn :color="sectionColor[1]" @click="section='tracking', sectionColor[0] = '', sectionColor[1] = 'primary'">Thống kê</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="pl-3 pr-3" v-show="section == 'setting'">
            <v-flex xs12 sm12 md4 lg4 xl4 class="pr-2">
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
            <v-flex xs12 sm12 md8 lg8 xl8 v-if="$vuetify.breakpoint.mdAndUp">
                <v-layout row class="mb-2"
                    v-if="showCall === true || showForm == true || showChat == true || showFb == true || showZalo == true">
                    <v-flex xs12>
                        <v-layout row class="mb-2" v-if="selected.leadHubButtonGroupId && selected.googleCustomerId == null">
                            <!-- <v-alert :value="true" color="warning" icon="priority_high" outline >
                                Bạn chưa gán bộ nút này vào tài khoản quảng cáo nào. Hãy gán ngay để theo dõi chuyển đổi trên trang web của bạn
                            </v-alert> -->
                            <v-flex lg9 class="pt-2">
                                <div style="border:1px solid #fb8c00; color: #fb8c00; text-align:center; padding:1%">
                                    <span>Bạn chưa gán bộ nút này vào tài khoản quảng cáo nào. Hãy gán ngay để theo dõi chuyển
                                        đổi
                                        trên trang web của bạn</span>
                                </div>
                            </v-flex>
                            <v-flex lg3>
                                <v-btn v-if="checkDataGgAds" class=" ml-2" large tile outlined color="primary"
                                    @click="connectGoogleAds()">
                                    Liên kết tài khoản
                                </v-btn>
                                <v-btn v-else class=" ml-2" large tile outlined color="primary" @click="accountAds = true">
                                    Liên kết tài khoản
                                </v-btn>
                            </v-flex>
                        </v-layout>
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
                                            <v-img src="../../../ip.png" height="600px"
                                                style="position:relative; width:290px">
                                                <div :style="styleBtn" v-if="show && selected.vertical == false">
                                                    <v-btn fab small v-if="showFb">
                                                        <v-img src="/mess.png" alt="facebook" style="width:100%"
                                                            aspect-ratio="1"></v-img>
                                                    </v-btn>
                                                    <br v-if="showZalo"/>
                                                    <v-btn fab small v-if="showZalo">
                                                        <v-img src="/zalo.png" alt="zalo" style="width:100%"
                                                            aspect-ratio="1"></v-img>
                                                    </v-btn>
                                                    <br v-if="showForm"/>
                                                    <v-btn fab :dark="dark" small :color="styleBtnForm.buttonColor"
                                                        v-if="showForm">
                                                        <v-icon>email</v-icon>
                                                    </v-btn>
                                                    <br v-if="showCall"/>
                                                    <v-btn fab :dark="dark" small :color="styleBtnCall.buttonColor"
                                                        v-if="showCall">
                                                        <v-icon>phone_in_talk</v-icon>
                                                    </v-btn>
                                                    <br v-if="showChat" />
                                                    <v-btn fab :dark="dark" small :color="styleBtnChat.buttonColor"
                                                        v-if="showChat">
                                                        <v-icon>message</v-icon>
                                                    </v-btn>
                                                </div>
                                                <div :style="styleBtn" v-if="show && selected.vertical == true">
                                                    <v-btn fab :dark="dark" small :color="styleBtnCall.buttonColor"
                                                        v-if="showCall">
                                                        <v-icon>phone_in_talk</v-icon>
                                                    </v-btn>
                                                    <v-btn fab :dark="dark" small :color="styleBtnForm.buttonColor"
                                                        v-if="showForm">
                                                        <v-icon>email</v-icon>
                                                    </v-btn>
                                                    <v-btn fab :dark="dark" small :color="styleBtnChat.buttonColor"
                                                        v-if="showChat">
                                                        <v-icon>message</v-icon>
                                                    </v-btn>
                                                    <v-btn fab small v-if="showFb">
                                                        <v-img src="/mess.png" alt="facebook" style="width:100%"
                                                            aspect-ratio="1"></v-img>
                                                    </v-btn>
                                                    <v-btn fab small v-if="showZalo">
                                                        <v-img src="/zalo.png" alt="zalo" style="width:100%"
                                                            aspect-ratio="1"></v-img>
                                                    </v-btn>
                                                </div>
                                            </v-img>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-img src="../../../desktop.png" height="500px" style="position:relative">
                                                <div :style="styleBtnDesktop" v-if="show && selected.vertical == false">
                                                    <v-btn fab small v-if="showFb">
                                                        <v-img src="/mess.png" alt="facebook" style="width:100%"
                                                            aspect-ratio="1"></v-img>
                                                    </v-btn>
                                                    <br v-if="showZalo"/>
                                                    <v-btn fab small v-if="showZalo">
                                                        <v-img src="/zalo.png" alt="zalo" style="width:100%"
                                                            aspect-ratio="1"></v-img>
                                                    </v-btn>
                                                    <br v-if="showForm"/>
                                                    <v-btn fab :dark="dark" small :color="styleBtnForm.buttonColor"
                                                        v-if="showForm">
                                                        <v-icon>email</v-icon>
                                                    </v-btn>
                                                    <br v-if="showCall"/>
                                                    <v-btn fab :dark="dark" small :color="styleBtnCall.buttonColor"
                                                        v-if="showCall">
                                                        <v-icon>phone_in_talk</v-icon>
                                                    </v-btn>
                                                    <br v-if="showChat"/>
                                                    <v-btn fab :dark="dark" small :color="styleBtnChat.buttonColor"
                                                        v-if="showChat">
                                                        <v-icon>message</v-icon>
                                                    </v-btn>
                                                </div>
                                                <div :style="styleBtnDesktop" v-if="show && selected.vertical == true">
                                                    <v-btn fab :dark="dark" small :color="styleBtnCall.buttonColor"
                                                        v-if="showCall">
                                                        <v-icon>phone_in_talk</v-icon>
                                                    </v-btn>
                                                    <v-btn fab :dark="dark" small :color="styleBtnForm.buttonColor"
                                                        v-if="showForm">
                                                        <v-icon>email</v-icon>
                                                    </v-btn>
                                                    <v-btn fab :dark="dark" small :color="styleBtnChat.buttonColor"
                                                        v-if="showChat">
                                                        <v-icon>message</v-icon>
                                                    </v-btn>
                                                    <v-btn fab small v-if="showFb">
                                                        <v-img src="/mess.png" alt="facebook" style="width:100%"
                                                            aspect-ratio="1"></v-img>
                                                    </v-btn>
                                                    <v-btn fab small v-if="showZalo">
                                                        <v-img src="/zalo.png" alt="zalo" style="width:100%"
                                                            aspect-ratio="1"></v-img>
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
        <v-layout row wrap class="pl-3 pr-3" v-show="section == 'tracking'">
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-data-table :custom-sort="customSort" densed style="width: 100%" :headers="trackingObj.headers" :items="trackingObj.data" hide-actions class="elevation-1" no-data-text="Không có kết quả nào phù hợp">
                    <template v-slot:items="props">
                        <tr>
                        <!-- <td><router-link :to="takeLink(props.item.contactId)">{{ props.item.lastName }} {{ props.item.firstName }}</router-link></td> -->
                            <td class="text-xs-left">{{ checkString(props.item.type) }}</td>
                            <td class="text-xs-left">{{ checkString(props.item.utm_source) }}</td>
                            <td class="text-xs-left">{{ checkString(props.item.utm_medium) }}</td>
                            <td class="text-xs-left">{{ checkString(props.item.utm_campaign) }}</td>
                            <td class="text-xs-left">{{ checkString(props.item.utm_term) }}</td>
                            <td class="text-xs-left">{{ checkString(props.item.utm_content) }}</td>
                            <!-- <td class="text-xs-left">{{ checkString(props.item.gclid) }}</td> -->
                            <td class="text-xs-left">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <a @click="openPage(props.item.link)" v-on="on">{{ cutLongString(props.item.link) }}</a>
                                    </template>
                                    <span>{{ checkString(props.item.link) }}</span>
                                </v-tooltip>
                            </td>
                            <td class="text-xs-left">{{ checkString(props.item.time) }}</td>
                            <td class="text-xs-left">{{ checkString(props.item.conversionValue) }}</td>
                            <!-- <td class="text-xs-left">{{ checkString(props.item.resourceName) }}</td> -->
                            <td class="text-xs-left">{{ checkString(props.item.status) }}</td>
                            <td class="text-xs-left">{{ returnTime(props.item.createdAt) }}</td>
                        </tr>
                    </template>
                </v-data-table>
            </v-flex>
            <v-flex xs12 sm12 md5 lg5 xl5 offset-md5 offset-lg5 offset-xl5>
                <br>
                <v-pagination v-model="trackingObj.page" :total-visible="7" :length="trackingObj.totalPage"></v-pagination>
                <br>
            </v-flex>
            <br>
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
        <v-dialog v-model="accountAds" max-width='500'>
            <v-card>
                <v-card-text class="pl-4">
                    <v-layout row>
                        <v-list two-line
                            style="width:100% !imnportant;max-height:400px !imnportant;overflow-y:auto !imnportant">
                            <v-subheader>
                                <h3 style="color:#1875ef">Chọn tài khoản Google Ads</h3>
                            </v-subheader>
                            <template v-for="(cid, key) in listCidAds">
                                <v-list-tile :key="key" avatar ripple @click="addCoversionToGbtn(cid.cId)">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{cid.descriptiveName}} </v-list-tile-title>
                                        <v-list-tile-sub-title v-if="cid.cId != '' && cid.cId != null">({{cid.cId}})
                                        </v-list-tile-sub-title>
                                        <v-list-tile-sub-title v-else>( Không có tên )</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="gray darken-1" flat @click="accountAds = false">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showLoading" persistent width="300">
            <v-card color="primary" dark>
                <v-card-text>
                    Xin đợi 1 chút. Chúng tôi đang liên kết tài khoản cho bạn
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
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
    import config from '@/config'
    import ggAds from '@/services/ggAds.service.js'
    export default {
        props: {
            idAccount: {
                type: String,
                default: null,
            },
            code: {
                type: String,
                default: null
            }
        },
        data() {
            return {
                selectSection: [
                    {
                        text: 'Cài đặt',
                        value: 'setting'
                    },
                    {
                        text: 'Thống kê',
                        value: 'tracking'
                    }
                ],
                section: 'setting',
                sectionColor: ['primary', ''],
                trackingObj: {
                    sortBy: '',
                    orderBy: 'ASC',
                    page: 1,
                    totalPage: 1,
                    data: [],
                    headers: [{
                            text: 'TYPE',
                            align: 'left',
                            value: 'type',
                            // sortable: false
                        },
                        {
                            text: 'UTM_SOURCE',
                            align: 'left',
                            value: 'utm_source',
                            // sortable: false
                        },
                        {
                            text: 'UTM_MEDIUM',
                            align: 'left',
                            value: 'utm_medium',
                            // sortable: false
                        },
                        {
                            text: 'UTM_CAMPAIGN',
                            align: 'left',
                            value: 'utm_campaign',
                            // sortable: false
                        },
                        {
                            text: 'UTM_TERM',
                            align: 'left',
                            value: 'utm_term',
                            // sortable: false
                        },
                        {
                            text: 'UTM_CONTENT',
                            align: 'left',
                            value: 'utm_content',
                            // sortable: false
                        },
                        // {
                        //     text: 'GCLID',
                        //     align: 'left',
                        //     value: 'gclid',
                        //     // sortable: false
                        // },
                        {
                            text: 'LINK',
                            align: 'left',
                            value: 'link',
                            // sortable: false
                        },
                        {
                            text: 'TIME',
                            align: 'left',
                            value: 'time',
                            // sortable: false
                        },
                        {
                            text: 'CONVERSION VALUE',
                            align: 'left',
                            value: 'conversionValue',
                            // sortable: false
                        },
                        // {
                        //     text: 'RESOURCE NAME',
                        //     align: 'left',
                        //     value: 'resourceName',
                        //     // sortable: false
                        // },
                        {
                            text: 'STATUS',
                            align: 'left',
                            value: 'status',
                            // sortable: false
                        },
                        {
                            text: 'Thời gian tạo',
                            align: 'left',
                            value: 'createdAt',
                            // sortable: false
                        }
                    ],
                },
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
                styleBtnChat: null,
                styleBtn: '',
                styleBtnDesktop: '',
                showCall: false,
                showForm: false,
                showChat: false,
                checkData: true,
                dark: true,
                deleteConfirm: false,
                showFb: false,
                showZalo: false,
                listCidAds: [],
                showLoading: false,
                checkDataGgAds: true,
                accountAds: false
            }
        },
        watch: {
            selected() {
                this.show = true
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
            },
            'trackingObj.page'(){
                this.getTracking(this.idAccount, this.trackingObj.sortBy, this.trackingObj.orderBy, this.trackingObj.page)
            },
            'trackingObj.sortBy'(){
                this.getTracking(this.idAccount, this.trackingObj.sortBy, this.trackingObj.orderBy, this.trackingObj.page)
            },
            'trackingObj.orderBy'(){
                this.getTracking(this.idAccount, this.trackingObj.sortBy, this.trackingObj.orderBy, this.trackingObj.page)
            }
        },
        computed: {
            scrpitText() {
                return `<script src="${process.env.VUE_APP_BASE_URL}adstech-leadhub.js?accId=${this.selected.accountId}&gBtnId=${this.selected.leadHubButtonGroupId}" type="text/javascript" async><\/script>`
            },
            title(){
                if(this.section == 'tracking'){
                    return 'Thống kê'
                }
                else {
                    return 'Cài đặt bộ nút'
                }
            },
            mounted() {
                this.connectGG()
            },
        },
        methods: {
            returnTime(data) {
                return moment(data).locale('vi').format('LLLL')
            },
            openPage(link){
                window.open(link, '_blank')
            },
            customSort(items, index, isDescending) {
                // The following is informations as far as I researched.
                // items:  items to be sorted
                // index: Enabled sort headers value. (black arrow status).
                // isDescending: Whether enabled sort headers is desc
                // console.log(items)
                this.trackingObj.sortBy = index;
                this.trackingObj.orderBy = (isDescending) ? 'DESC' : 'ASC';
                return items;
            },
            cutLongString(str){
                if(str.length <= 20){
                    return str
                }
                else {
                    let res = str.substring(0, 20) + '...'
                    return res
                }
            },
            checkString(str){
                if (str == null || str == undefined){
                    return '_'
                }
                else {
                    return str;
                }
            },
            returnTime(data) {
                return moment(data).lang('vi').format('llll')
            },
            gotoSetting() {
                router.push(`/contacts/${this.idAccount}/setting`)
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
                this.showChat = false
                this.showFb = false
                this.showZalo = false
                for (let i = 0; i < key.listButton.length; i++) {
                    if (key.listButton[i].type == "CALL") {
                        this.styleBtnCall = key.listButton[i]
                        this.showCall = true
                    } else if (key.listButton[i].type == "FORM") {
                        this.styleBtnForm = key.listButton[i]
                        this.showForm = true
                    } else if (key.listButton[i].type == "CHAT") {
                        this.styleBtnChat = key.listButton[i]
                        this.showChat = true
                    } else if (key.listButton[i].type == "FACEBOOK") {
                        this.showFb = true
                    } else if (key.listButton[i].type == "ZALO") {
                        this.showZalo = true
                    }
                }
                if (key.style.color == "#fff") {
                    this.dark = true
                } else if (key.style.color == "#000") {
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
                router.push(`/contacts/${this.idAccount}/update/${GBtnId}`)
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
            },
            connectGoogleAds() {
                window.location.href = `${config.connectUrl}${window.location.href}`
            },
            connectGG() {
                if (this.code == '' || this.code == null) return;
                else this.takeListGgAdsConnect();
            },
            takeListGgAdsConnect() {
                const {
                    dispatch
                } = this.$store;
                this.showLoading = true
                ggAds.takeInfoCid(this.idAccount, this.code).then(result => {
                    if (result.code == "SUCCESS") {
                        dispatch('alert/success', 'Liên kết tài khoản thành công')
                        let path = `/contacts/${this.idAccount}/leadhub`
                        this.$router.replace(path)
                        this.showLoading = false
                    } else {
                        dispatch('alert/error', result.message)
                        this.showLoading = false
                    }
                })
            },
            takeListGgAdsInSerrve() {
                this.showLoading = true
                ggAds.getListCid(this.idAccount).then(result => {
                    if (result.code == "SUCCESS" && result.response.length > 0) {
                        this.checkDataGgAds = false
                        this.showLoading = false
                        for (let i = 0; i < result.response.length; i++) {
                            let coverCid = result.response[i].resourceName.split('/')
                            let position = coverCid.length - 1
                            let a = {
                                cId: coverCid[position],
                                descriptiveName: result.response[i].descriptiveName
                            }
                            this.listCidAds.push(a)
                        }
                    } else {
                        this.checkDataGgAds = true
                        this.showLoading = false
                    }
                })
            },
            addCoversionToGbtn(cId) {
                const {
                    dispatch
                } = this.$store;
                this.showLoading = true
                ggAds.convertGbtnToCid(this.idAccount, this.selected.leadHubButtonGroupId, cId).then(result => {
                    if (result.code == "SUCCESS") {
                        this.showLoading = false
                        this.accountAds = false
                        dispatch('alert/success', `Gán tài khoản ${cId} thành công`)
                    } else {
                        dispatch('alert/error', result.message)
                        this.showLoading = false
                        this.accountAds = true
                    }
                })
                this.getAllGroupBtn()
                this.selected.googleCustomerId = cId
            },
            getTracking(accId, sortBy, orderBy, page){
                this.trackingObj.data = []
                leadhubService.getTracking(accId, sortBy, orderBy, page).then(result => {
                    if(result.code == 'SUCCESS'){
                        this.trackingObj.totalPage = result.response.totalPage;
                        this.trackingObj.data = result.response.results
                        //this.addToTrackingData(result.response.results)
                    }
                })
            },
            // addToTrackingData(trackingRes){
            //     for (let i = 0; i < trackingRes.length; i++){
            //         let obj = {
            //             type: this.checkString(trackingRes[i].type),
            //             utm_source: this.checkString(trackingRes[i].utm_source),
            //             utm_medium: this.checkString(trackingRes[i].utm_medium),
            //             utm_campaign: this.checkString(trackingRes[i].utm_campaign),
            //             utm_term: this.checkString(trackingRes[i].utm_term),
            //             utm_content: this.checkString(trackingRes[i].utm_content),
            //             gclid: this.checkString(trackingRes[i].gclid),
            //             link: this.checkString(trackingRes[i].link),
            //             time: this.checkString(trackingRes[i].time),
            //             conversionValue: this.checkString(trackingRes[i].conversionValue),
            //             resourceName: this.checkString(trackingRes[i].resourceName),
            //             status: this.checkString(trackingRes[i].status),
            //             createdAt: this.checkString(trackingRes[i].createdAt)
            //         }
            //         this.trackingObj.data.push(obj)
            //     }
            // }
        },
        created() {
            this.$store.state.colorNumber = 6;
            this.getAllGroupBtn()
            this.takeListGgAdsInSerrve()
            this.getTracking(this.idAccount, this.trackingObj.sortBy, this.trackingObj.orderBy, this.trackingObj.page)
            console.log(this.trackingObj)
        },
        components: {
            alert
        }
    }
</script>