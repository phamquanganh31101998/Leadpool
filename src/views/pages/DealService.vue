<template>
    <v-content class="mt-4 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <h1 class="ml-3"> Quản lý Thỏa thuận</h1>
            </v-flex>
            <v-flex xs12 sm12 md7 lg6 xl6>
                <v-layout row>
                    <v-flex xs5 sm5 md5 lg5 xl5 offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <!-- <v-text-field append-icon="search" label="Tìm kiếm danh sách..." single-line hide-details></v-text-field> -->
                    </v-flex>
                    <v-flex xs2 md2 lg2 xl2>
                        <v-dialog v-model="createDeal" persistent max-width="700px">
                            <template v-slot:activator="{ on }">
                                <v-btn v-if="access" round dark color="#3E82F7" v-on="on"> <v-icon>add</v-icon> Tạo mới</v-btn>
                            </template>
                            <v-card>
                                <v-card-title style="background-color:#1E88E5;color:#fff">
                                    <span class="headline">Tạo Thỏa thuận</span>
                                </v-card-title>
                                <v-card-text>
                                    <newDeal :idAccount="this.idAccount" @closeCreateDealDialog="createDeal = false"/>
                                </v-card-text>
                                <v-divider :divider="divider"></v-divider>
                            </v-card>
                        </v-dialog>
                        
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <br>
        <v-divider class="mt-4" :divider="divider"></v-divider>
        <v-layout row wrap v-if="access">
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-data-table
                        no-data-text="Không có dữ liệu" rows-per-page-text="Hiển thị" :rows-per-page-items="[25,10,5, {text: 'Tất cả', value: -1}]"
                        :headers="headers"
                        :items="allDeal"
                        class="elevation-1 mt-6"
                    >
                    <template v-slot:items="props">
                        <td><a @click.stop="openDetailDialog(props.item.number)">{{ props.item.name }}</a></td>
                        <td>{{formatNumber(props.item.amount)}} VND</td>
                        <td>{{props.item.owner}}</td>
                        <td>{{props.item.service}}</td>
                        <td>{{props.item.stage}}</td>
                        <v-menu>
                            <template v-slot:activator="{ on }">
                                <td class="text-xs-right" ><v-btn flat fab small v-on="on"><v-icon>more_vert</v-icon></v-btn> </td>
                            </template>
                            <v-list>
                                <v-list-tile @click="openDetailDialog(props.item.number)">
                                    <v-list-tile-content>Xem chi tiết</v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile @click="confirmDeleteDeal(props.item.dealId)">
                                    <v-list-tile-content>Xóa</v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </template>
                    <template v-slot:no-results>
                        <v-alert :value="true" color="error" icon="warning">
                        Không có kết quả khi tìm kiếm với "{{ search }}"
                        </v-alert>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-layout style="height: 300px;">
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-card flat style="height: 300px; margin-top: 100px;" >
                            <v-card-text style="height: 300px; background-color: #FDEDEE; border: 1px solid red;">
                                <v-card flat style="background-color: #FDEDEE; vertical-align: middle">
                                    <v-card-title>
                                        <h2>Không có quyền truy cập</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        Bạn phải có quyền <span style="font-weight: bold">Xem tất cả</span> đối với Lead thì mới có thể sử dụng chức năng này.
                                        <br>
                                        Hãy liên hệ với Quản lý để được cấp quyền truy cập.
                                    </v-card-text>
                                </v-card>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <!-- <v-flex xs3 sm3 md3 lg3 xl3 offset-xs1 offset-sm1 offset-md1 offset-lg1 offset-xl1>
                        <v-card flat style="height: 300px; margin-top: 100px;" >
                            <v-card-text style="height: 300px; background-color: #FDEDEE; border: 1px solid red;">
                                <v-card flat style="background-color: #FDEDEE; vertical-align: middle">
                                    <v-card-title>
                                        <h2>Không có quyền truy cập</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        Bạn phải có quyền <span style="font-weight: bold">Xem tất cả</span> đối với Lead thì mới có thể sử dụng chức năng này.
                                        <br>
                                        Hãy liên hệ với Quản lý để được cấp quyền truy cập.
                                    </v-card-text>
                                </v-card>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs8 sm8 md8 lg8 xl8>
                        <v-card flat style="height: 500px; margin-top: 100px;">
                            <v-img alt="ảnh ở đây" width="100%" src="../../../sms2.png"></v-img>
                        </v-card>
                    </v-flex> -->
                </v-layout>
            </v-flex>
        </v-layout>
        <v-dialog v-model="detailDialog" persistent width="700">
            <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                    <span class="headline">Chi tiết Thỏa thuận</span>
                </v-card-title>
                <v-card-text>
                    <v-layout wrap>
                        <!-- <v-layout row wrap>
                            <v-flex xs6 sm6 md6 lg6 xl6>
                                <v-text-field :rules="nameRules" label="Tên Thỏa thuận" v-model="detailDeal.name"></v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6 lg6 xl6>
                                <v-text-field :rules="numberRules" type="number" label="Giá trị Thỏa thuận" v-model="detailDeal.amount"></v-text-field>
                            </v-flex>
                        </v-layout> -->
                        <v-flex xs12 sm12 md12 lg12 xl12>
                            <span><h4>Tên thỏa thuận</h4></span>
                            <v-text-field :rules="nameRules" v-model="detailDeal.name"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12 style="padding-top: 20px;padding-bottom: 20px;">
                            <!-- <v-text-field :rules="numberRules" type="number" label="Giá trị Thỏa thuận" v-model="amount"></v-text-field> -->
                            <span style="padding-top: 20px; padding-bottom: 10px;"><h4>Giá trị</h4></span>
                            <money style="width: 100%; margin-top: 0px; padding-top: 0px; font-size: 16px; border-bottom: 1px solid grey;" v-model="detailDeal.amount" v-bind="money"></money>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                            <span><h4>Dịch vụ</h4></span>
                            <v-select solo v-model="detailDeal.service" :items="allService"></v-select>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                            <span><h4>Giai đoạn</h4></span>
                            <v-select solo v-model="detailDeal.stage" :items="allStage"></v-select>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                            <span><h4>Chủ sở hữu</h4></span>
                            <v-select solo v-model="detailDeal.owner" :items="allEmail"></v-select>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" flat :disabled="detailDeal.name == '' || detailDeal.amount ==''" @click="updateDeal()">Lưu lại</v-btn>
                    <v-btn flat @click="detailDialog = false" color="red">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="deleteDealDialog.dialog" persistent transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Xác nhận xóa</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Bạn có chắc chắn muốn xóa Thỏa thuận này?
                </v-card-text>
                <v-card-actions>
                    <v-btn flat color="red" @click="deleteDeal(deleteDealDialog.id)" >XÓA</v-btn>
                    <v-btn flat color="primary" @click="deleteDealDialog.dialog = false, deleteDealDialog.id = ''">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-content>
</template>
<script>
import {Money} from 'v-money'
import newDeal from '../components/creates/createDeal'
import serviceAPI from '../../services/service.service'
import moment from 'moment'
import dealService from '../../services/deal.service'
import { eventBus } from '../../eventBus'
import numberFormat from '../../helpers/numberformat'
export default {
    components: {
        newDeal, Money
    },
    props: {
        idAccount: {
            type: String,
            default: null,
        },
    },
    data(){
        return{
            access: false,
            money: {
                decimal: ',',
                thousands: '.',
                prefix: '',
                suffix: ' VND',
                precision: 0,
                masked: false
            },
            createDeal: false,
            numberRules: [
                v => !!v || 'Không được để trống',
            ],
            nameRules: [
                v => !!v || 'Không được để trống',
            ],
            divider: true,
            allEmail: [],
            allService: [],
            allStage: ['Có nhu cầu', 'Đã đề xuất', 'Chốt', 'Won', 'Lost'],
            currentUser: null,
            allDeal: [],
            headers: [
                {
                    text: 'TÊN THỎA THUẬN',
                    align: 'left',
                    // sortable: false,
                    value: 'name'
                },
                {
                    text: 'GIÁ TRỊ',
                    align: 'left',
                    // sortable: false,
                    value: 'amount'
                },
                {
                    text: 'CHỦ SỞ HỮU',
                    align: 'left',
                    // sortable: false,
                    value: 'owner'
                },
                {
                    text: 'DỊCH VỤ',
                    align: 'left',
                    // sortable: false,
                    value: 'service'
                },
                {
                    text: 'GIAI ĐOẠN',
                    align: 'left',
                    // sortable: false,
                    value: 'stage'
                },
                {
                    text: 'HÀNH ĐỘNG',
                    align: 'right',
                    sortable: false,
                    value: 'name'
                },
            ],
            detailDialog: false,
            valid: true,
            detailDeal: {
                "dealId": "",
                "name": "",
                "stage": "",
                "service": "",
                "amount": "",
                "owner": "",
                "contactId": "",
                "accountId": "",
                "createdBy": "",
                "createdAt": "",
                "updatedBy": "",
                "updateAt": ""
            },
            deleteDealDialog: {
                id: '',
                dialog: false,
            }
        }
    },
    watch: {
    },
    methods: {
        formatNumber(num){
            return numberFormat.number_format(num);
        },
        confirmDeleteDeal(id){
            this.deleteDealDialog.id = id;
            this.deleteDealDialog.dialog = true;
        },
        deleteDeal(id){
            dealService.deleteDeal(this.idAccount, id).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                    this.getDeal();
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                this.deleteDealDialog.dialog = false;
            }).catch(error => {
                console.log(error)
            })
        },
        getAllEmail(){
            this.allEmail = [];
            dealService.getAllEmail(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    result.response.filter(e => {
                        const obj = {
                            text: e.name + ' (' + e.email + ')',
                            value: e.email,
                            name: e.name
                        }
                        this.allEmail.push(obj);
                    });
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
            })
        },
        updateDeal(){
            let body = this.detailDeal;
            dealService.updateDeal(this.idAccount, body).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                    dealService.getDealByAccount(this.idAccount).then(result => {
                        const {
                            dispatch
                        } = this.$store;
                        let time = moment();
                        if(result.code == 'SUCCESS'){
                            let tempArr = [];
                            tempArr = result.response.reverse();
                            for (let i = 0; i < this.allDeal.length; i++){
                                tempArr[i].number = i;
                                if(tempArr[i] != this.allDeal[i]){
                                    this.allDeal[i] = tempArr[i];
                                }
                            }
                            this.allDeal = [...this.allDeal];
                        }
                        else {
                            dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                        }
                    }).catch(error => {
                        console.log(error);
                    })
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                this.detailDialog = false;
            }).catch(error => {
                console.log(error)
            })
        },
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
                        this.allService.push(res[i].name);
                    }
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            })
        },
        openDetailDialog(number){
            this.detailDeal = Object.assign({}, this.allDeal[number]);
            this.detailDialog = true;
        },
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
            let role = this.currentUser.authorities;
            if ((role.includes('ROLE_SYSADMIN_SYSADMIN_ACCEPT')) || role.includes("ROLE_CONTACT_VIEW_EVERYTHING")){
                this.access = true;
            }
            if(this.access == true){
                this.getAllEmail();
                this.getService();
                this.getDeal();
            }
            
        },
        getDeal(){
            dealService.getDealByAccount(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    this.allDeal = result.response.reverse();
                    for (let i = 0; i < this.allDeal.length; i++){
                        this.allDeal[i].number = i;
                    }
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            })
        }
    },
    created(){
        this.getCurrentUser();
        this.$store.state.colorNumber = 5;
        eventBus.$on('updateDealList', () => {
            this.getDeal();
        })
    }
}
</script>
<style>

</style>