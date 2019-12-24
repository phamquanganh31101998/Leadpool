<template>
    <v-container grid-list-md>
        <v-layout wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <span><h4>Chủ sở hữu</h4></span>
                <v-select v-model="owner" :items="allEmail"></v-select>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <span><h4>Tên thỏa thuận</h4></span>
                <v-text-field :rules="nameRules" v-model="name"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12 style="padding-top: 20px;padding-bottom: 20px;">
                <!-- <v-text-field :rules="numberRules" type="number" label="Giá trị hợp đồng" v-model="amount"></v-text-field> -->
                <span style="padding-top: 20px; padding-bottom: 10px;"><h4>Giá trị</h4></span>
                <money style="width: 100%; margin-top: 0px; padding-top: 0px; font-size: 16px; border-bottom: 1px solid grey;" v-model="amount" v-bind="money"></money>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12 v-if="idContact == 'all'">
                <span><h4>Các Lead có trong thỏa thuận</h4></span>
                <multi-select :options="allContacts"
                    :selected-options="contacts"
                    @select="onSelect"
                    option-value="value"
                    option-text="text"
                    placeholder="Chọn Lead">
                </multi-select>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <span><h4>Dịch vụ</h4></span>
                <v-select v-model="service" :items="allService"></v-select>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <span><h4>Giai đoạn</h4></span>
                <v-select v-model="stage" :items="allStage"></v-select>
            </v-flex>
        </v-layout>
        <br>
        <v-layout wrap>
            <v-btn color="blue darken-1" small flat :disabled="name == '' || amount == ''"
                @click="createDeal()" >Tạo</v-btn>
            <v-btn color="red" small flat
                @click="closeCreateDealDialog()">Đóng</v-btn>
        </v-layout>
    </v-container>
</template>
<script>
    import { MultiSelect } from 'vue-search-select'
    import {Money} from 'v-money'
    import moment from 'moment'
    import {eventBus} from '../../../eventBus'
    import dealService from '../../../services/deal.service'
    import serviceAPI from '../../../services/service.service'
    import contactAPI from '../../../services/contacts.service'
    export default {
        components: {Money, MultiSelect},
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
            return{
                money: {
                    decimal: ',',
                    thousands: '.',
                    prefix: '',
                    suffix: ' VND',
                    precision: 0,
                    masked: false
                },
                allEmail: [],
                owner: '',
                allService: [],
                service: '',
                allStage: ['Có nhu cầu', 'Đã đề xuất', 'Chốt', 'Won', 'Lost'],
                stage: 'Có nhu cầu',
                amount: 0,
                name: '',
                numberRules: [
                    v => !!v || 'Không được để trống',
                ],
                nameRules: [
                    v => !!v || 'Không được để trống',
                ],
                valid: false,
                createWaiting: false,
                allContacts: [],
                contacts: []
            }
        },
        computed: {
        },
        methods:{
            createDeal(){
                var contactArr = [];
                if (this.idContact == 'all'){
                    for(let i = 0; i < this.contacts.length;i++){
                        contactArr.push(this.contacts[i].value)
                    }
                    var body = {
                        name: this.name, 
                        stage: this.stage,
                        service: this.service, 
                        amount: this.amount,
                        owner: this.owner,
                        contactId: contactArr
                    }
                }
                else {
                    contactArr.push(this.idContact)
                    body = {
                        name: this.name, 
                        stage: this.stage,
                        service: this.service, 
                        amount: this.amount,
                        owner: this.owner,
                        contactId: contactArr
                    }
                }
                // console.log(body)
                dealService.createDeal(this.idAccount, body).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    let time = moment();
                    if(result.code == 'SUCCESS'){
                        dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                        eventBus.updateDealList();
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    }
                    this.closeCreateDealDialog()
                }).catch(error => {
                    console.log(error);
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
                        this.owner = this.allEmail[0].value;
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    }
                    
                })
            },
            coverTimeDetail(time){
                if (_.isNull(time)) return '';
                return moment(time).format('HH:mm:ss, DD/MM/YYYY')
            },
            closeCreateDealDialog(){
                this.$emit('closeCreateDealDialog');
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
                        this.service = this.allService[0]
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    }
                }).catch(error => {
                    console.log(error);
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
            onSelect(items){
                this.contacts = items;
                // console.log(this.contacts)
            },
            getAllContact(){
                this.allContacts = [];
                contactAPI.getAllContact(this.idAccount, 1).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    let time = moment();
                    if(result.code == 'SUCCESS'){
                        for (let i = 1; i <= result.response.totalPage;i++){
                            contactAPI.getAllContact(this.idAccount, i).then(result => {
                                const {
                                    dispatch
                                } = this.$store;
                                let time = moment();
                                if(result.code == 'SUCCESS'){
                                    for(let k = 0; k < result.response.results.length; k++){
                                        let tempObj = result.response.results[k];
                                        let obj = {
                                            text: this.checkString(tempObj.lastName) + ' ' + this.checkString(tempObj.firstName) + ' (' + this.checkString(tempObj.email) + ')',
                                            value: this.checkString(tempObj.contactId)
                                        }
                                        this.allContacts.push(obj);
                                    }
                                }
                                else {
                                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                                }
                            }).catch(error => {
                                console.log(error);
                            })
                        }
                        
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    }
                    
                }).catch(error => {
                    console.log(error);
                })
            },
        },
        created(){
            this.getAllEmail();
            this.getService();
            if(this.idContact == 'all'){
                this.getAllContact();
            }
            // this.getAllContact();
        }
    }
</script>