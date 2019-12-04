<template>
    <v-layout>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-dialog v-model="deleteDealDialog.dialog" persistent transition="dialog-bottom-transition" scrollable width="30%">
                <v-card tile>
                    <v-toolbar card dark color="red">
                        <v-toolbar-title>Xác nhận xóa</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        Bạn có chắc chắn muốn xóa hợp đồng này?
                    </v-card-text>
                    <v-card-actions>
                        <v-btn flat color="red" @click="deleteDeal(deleteDealDialog.id)" >XÓA</v-btn>
                        <v-btn flat color="primary" @click="deleteDealDialog.dialog = false, deleteDealDialog.id = ''">Đóng</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <template v-for="(deal, index) in allDeal">
                <v-hover>
                    <v-card slot-scope="{ hover }" class="pb-3 mt-3 ml-3 mr-3">
                        <v-card-title>
                            <v-layout row>
                                <v-flex xs4 sm4 md4 lg3 xl3>
                                    <v-icon small left>
                                        add
                                    </v-icon>
                                    <span class="">Hợp đồng</span>
                                </v-flex>
                                <v-flex xs8 sm8 lg9 xl9>
                                    <v-layout row>
                                        <v-flex xs7 sm7 lg8 xl8>
                                            <v-expand-transition>
                                                <div v-if="hover">
                                                    <v-layout row v-if="access">
                                                        <v-flex xs3 sm3 md3 lg3 xl3 offset-xs9 offset-sm9 offset-md9 offset-lg9 offset-xl9 >
                                                            <a color="indigo" @click="confirmDeleteDeal(deal.dealId)">Xóa
                                                            </a>
                                                        </v-flex>
                                                    </v-layout>
                                                </div>
                                            </v-expand-transition>
                                        </v-flex>
                                        <v-flex xs5 sm5 lg4 xl4>
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <span v-on="on">{{coverTime(deal.createdAt)}}</span>
                                                </template>
                                                <span small>{{coverTimeTooltip(deal.createdAt)}}</span>
                                            </v-tooltip>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-layout row wrap>
                            <v-flex xs11 sm11 md11 lg11 xl11 class="pl-5">
                                <v-layout row >
                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                        <v-text-field outlined v-model="deal.name" :readonly="!access"></v-text-field>
                                    </v-flex>
                                    <v-flex xs3 offset-xs1 sm3 offset-sm1 md3 offset-md1 lg3 offset-lg1 xl3 offset-xl1 class="ml-6">
                                        <money style="width: 100%; font-size: 16px; " v-model="deal.amount" v-bind="money"></money>
                                        <!-- <v-text-field outlined type="number" label="Giá trị" v-model="deal.amount" :readonly="!access"></v-text-field> -->
                                    </v-flex>
                                    <v-flex offset-xs1 offset-sm1 offset-md1 offset-lg1 offset-xl1>
                                        <v-select label="Chủ sở hữu" :items="allEmail" v-model="deal.owner"></v-select>
                                    </v-flex>
                                </v-layout>
                                <v-layout row >
                                    <v-flex xs8 sm8 md8 lg8 xl8>
                                        <v-select outlined label="Dịch vụ" :items="allService" v-model="deal.service" :readonly="!access"></v-select>
                                    </v-flex>
                                    <v-flex xs3 offset-xs1 sm3 offset-sm1 md3 offset-md1 lg3 offset-lg1 xl3 offset-xl1 class="ml-6">
                                        <v-select outlined label="Giai đoạn" :items="allStage" v-model="deal.stage" :readonly="!access"></v-select>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12 sm12 md12 lg12 xl12>
                                <v-layout row>
                                    <v-flex xs3 sm2 md2 lg1 xl1 class="ml-4 pl-3">
                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="grey lighten-2" small fab v-on="on">
                                                    <v-icon>person</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>{{deal.createdBy}}</span>
                                        </v-tooltip>
                                    </v-flex>
                                    <v-flex xs7 sm8 md8 lg9 xl9>
                                        <p class="mt-2 pt-1"><strong>{{deal.createdBy}} </strong> đã tạo hợp đồng</p>
                                    </v-flex>
                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                        <v-btn v-if="hover && access" :disabled="deal.name == '' || deal.amount ==''"  @click="updateDeal(deal.number)">Lưu lại</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-hover>
            </template>
            
        </v-flex>
    </v-layout>
</template>
<script>
import {Money} from 'v-money'
import moment from 'moment'
import { eventBus } from '../../../eventBus';
import contact from '../../../services/contacts.service'
import dealService from '../../../services/deal.service'
import serviceAPI from '../../../services/service.service'
export default {
    components: {
        Money
    },
    props: {
        idAccount: {
            type: String,
            default: null,
        },
        idContact: {
            type: String,
            default: null,
        }
    },
    data(){
        return {
            money: {
                decimal: ',',
                thousands: '.',
                prefix: '',
                suffix: ' VND',
                precision: 0,
                masked: false
            },
            access: false,
            allDeal: [],
            currentContact: null,
            currentUser: null,
            allEmail: [],
            allService: [],
            divider: true,
            allStage: ['Có nhu cầu', 'Đã đề xuất', 'Chốt', 'Won', 'Lost'],
            deleteDealDialog: {
                id: '',
                dialog: false,
            }
        }
    },
    methods: {
        logging(){
            alert('hú')
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
                    this.getDealByContact();
                    eventBus.updateDealList();
                    this.$emit('updateLastActivityDate');
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
        coverTime(time){
            if (_.isNull(time)) return '';
            return moment(time).format('DD/MM/YYYY')
        },
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        coverTimeTooltip(time){
            if (_.isNull(time)) return '';
            return moment(time).format('dddd, DD MMMM YYYY HH:mm:ss')
        },
        getDetail(){
            contact.getdetailContact(this.idAccount,this.idContact).then(result =>{
                this.currentContact = result.response
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.getCurrentUser()
            })
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
            let role = this.currentUser.authorities;
            for (let i = 0; i < role.length;i++){
                if (role[i] == 'ROLE_CONTACT_EDIT_EVERYTHING'){
                    this.access = true;
                }
                if(role[i] == 'ROLE_CONTACT_EDIT_OWNEDONLY'){
                    if (this.currentContact.contactOwner == this.currentUser.username){
                        this.access = true;
                    }
                }
            }
            this.getAllEmail();
            this.getService();
        },
        updateDeal(number){
            let body = this.allDeal[number];
            dealService.updateDeal(this.idAccount, body).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                    eventBus.updateDealList();
                    // dealService.getDealByAccount(this.idAccount).then(result => {
                    //     const {
                    //         dispatch
                    //     } = this.$store;
                    //     let time = moment();
                    //     if(result.code == 'SUCCESS'){
                    //         let tempArr = [];
                    //         tempArr = result.response.reverse();
                    //         for (let i = 0; i < this.allDeal.length; i++){
                    //             tempArr[i].number = i;
                    //             if(tempArr[i] != this.allDeal[i]){
                    //                 this.allDeal[i] = tempArr[i];
                    //             }
                    //         }
                    //         this.allDeal = [...this.allDeal];
                    //     }
                    //     else {
                    //         dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    //     }
                    // }).catch(error => {
                    //     console.log(error);
                    // })
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                this.detailDialog = false;
            }).catch(error => {
                console.log(error)
            })
        },
        getDealByContact(){
            dealService.getDealByContact(this.idAccount, this.idContact).then(result => {
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
        this.getDetail();
        this.getDealByContact();
        eventBus.$on('updateDealList', () => {
            this.getDealByContact();
        })
    }
}
</script>
<style scoped>

</style>