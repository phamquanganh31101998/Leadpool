<template>
    <v-container grid-list-md>
        <v-layout wrap>
            <!-- <v-form style="width: 100%" v-model="valid">
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-text-field :rules="nameRules" label="Tên hợp đồng" v-model="name"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-text-field :rules="numberRules" type="number" label="Giá trị hợp đồng" v-model="amount"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-form> -->
            <v-flex xs12 sm12 md12 lg12 xl12>
                <span><h4>Tên hợp đồng</h4></span>
                <v-text-field :rules="nameRules" v-model="name"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12 style="padding-top: 20px;padding-bottom: 20px;">
                <!-- <v-text-field :rules="numberRules" type="number" label="Giá trị hợp đồng" v-model="amount"></v-text-field> -->
                <span style="padding-top: 20px; padding-bottom: 10px;"><h4>Giá trị</h4></span>
                <money style="width: 100%; font-size: 16px; " v-model="amount" v-bind="money"></money>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <span><h4>Dịch vụ</h4></span>
                <v-select solo v-model="service" :items="allService"></v-select>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <span><h4>Giai đoạn</h4></span>
                <v-select solo v-model="stage" :items="allStage"></v-select>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <span><h4>Chủ sở hữu</h4></span>
                <v-select solo v-model="owner" :items="allEmail"></v-select>
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

    import {Money} from 'v-money'
    import moment from 'moment'
    import {eventBus} from '../../../eventBus'
    import dealService from '../../../services/deal.service'
    import serviceAPI from '../../../services/service.service'
    export default {
        components: {Money},
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
            }
        },
        computed: {
        },
        methods:{
            createDeal(){
                if (this.idContact == null){
                    var body = {
                        name: this.name, 
                        stage: this.stage,
                        service: this.service, 
                        amount: this.amount,
                        owner: this.owner
                    }
                }
                else {
                    body = {
                        name: this.name, 
                        stage: this.stage,
                        service: this.service, 
                        amount: this.amount,
                        owner: this.owner,
                        contactId: this.idContact
                    }
                }
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
            }
        },
        created(){
            this.getAllEmail();
            this.getService();
        }
    }
</script>