<template>
    <v-content class="mt-4 pl-2 pr-3">
        <v-layout row wrap>
            <v-flex xs10 sm10 md10 lg10 xl10>
                <h1 class="ml-3">Báo cáo tổng quan</h1>
            </v-flex>
            <v-flex xs2 sm2 md2 lg2 xl2>
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on }">
                        <v-text-field readonly label="Chọn mốc thời gian" v-on="on" v-model="date"></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="date"
                        type="month"
                        no-title
                        scrollable
                        @input="$refs.menu.save(date)"
                        >
                    </v-date-picker>
                </v-menu>
            </v-flex>
            <!-- <v-flex xs2 sm2 md2 lg2 xl2>
                <v-select class="ml-3" :items="selectSection" v-model="section" label="Chọn loại báo cáo"></v-select>
            </v-flex> -->
            
        </v-layout>
        <v-divider class="mt-5" :divider="divider"></v-divider>
        <v-layout>
            <v-flex xs12 sm12 md6 lg6 xl6>
                <v-card style="height: 100%;" class="text-center" v-show="chart1.loading">
                    <v-card-title>
                        <h2>Biến động Lead theo tháng</h2>
                    </v-card-title>
                    <v-layout>
                        <v-flex offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                            <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                            ></v-progress-circular>
                        </v-flex>
                    </v-layout>
                </v-card>
                <v-card style="height: 100%;" v-show="!chart1.loading">
                    <v-card-title>
                        <h2>Biến động Lead theo tháng</h2>
                    </v-card-title>
                    <v-card-text>
                        <div style="width: 100%; height: 450px; padding: 8px;" class="hello" ref="chartdiv1">
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12 lg6 xl6 class="ml-3">
                <v-card style="height: 100%;" class="text-center" v-show="chart2.loading">
                    <v-card-title>
                        <h2>Số lượng Lead của mỗi tài khoản</h2>
                    </v-card-title>
                    <v-layout>
                        <v-flex offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                            <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                            ></v-progress-circular>
                        </v-flex>
                    </v-layout>
                </v-card>
                <v-card style="height: 100%" v-show="!chart2.loading">
                    <v-card-title>
                        <h2>Số lượng Lead của mỗi tài khoản</h2>
                    </v-card-title>
                    <v-card-text>
                        <div style="width: 100%; height: 550px; padding: 8px;" class="hello" ref="chartdiv2">
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm12 md6 lg6 xl6 class="mt-3 md-3">
                <v-card style="height: 100%;" class="text-center" v-show="chart4.loading">
                    <v-card-title>
                        <h2>Số lượng Lead theo Trạng thái của các tài khoản</h2>
                    </v-card-title>
                    <v-layout>
                        <v-flex offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                            <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                            ></v-progress-circular>
                        </v-flex>
                    </v-layout>
                </v-card>
                <v-card style="height: 100%;" v-show="!chart4.loading">
                    <v-card-title>
                        <h2>Số lượng Lead được chăm sóc thường xuyên</h2>
                    </v-card-title>
                    <v-card-text>
                        <div style="width: 100%; height: 550px; padding: 8px;" class="hello" ref="chartdiv4">
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12 lg6 xl6 class="mt-3 ml-3 md-3">
                <v-card style="height: 100%;" class="text-center" v-show="chart3.loading">
                    <v-card-title>
                        <h2>Số lượng Lead theo Trạng thái của các tài khoản</h2>
                    </v-card-title>
                    <v-layout>
                        <v-flex offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                            <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                            ></v-progress-circular>
                        </v-flex>
                    </v-layout>
                </v-card>
                <v-card style="height: 100%;" v-show="!chart3.loading">
                    <v-card-title>
                        <h2>Số lượng Lead theo Trạng thái của các tài khoản</h2>
                    </v-card-title>
                    <v-card-text>
                        <div style="width: 100%; height: 550px; padding: 8px;" class="hello" ref="chartdiv3">
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm12 md12 lg6 xl6>
                <v-card style="height: 100%;" >
                    <v-card-title>
                        <h2>Thống kê thỏa thuận theo nhân viên</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table :loading="chart5.loadingData" style="width: 100%" :headers="chart5.headers" :items="chart5.data">
                            <template v-slot:items="props">
                                <tr>
                                <!-- <td><router-link :to="takeLink(props.item.contactId)">{{ props.item.lastName }} {{ props.item.firstName }}</router-link></td> -->
                                    <td class="text-xs-left">{{ props.item.date }}</td>
                                    <td class="text-xs-left">{{ props.item.owner }}</td>
                                    <td class="text-xs-left">{{ props.item.SumAmount }}</td>
                                    <td class="text-xs-left">{{ props.item.count }}</td>
                                </tr>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12 lg6 xl6 class="ml-3">
                <v-card style="height: 100%;" >
                    <v-card-title>
                        <h2>Thống kê thỏa thuận theo các giai đoạn</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table :loading="chart6.loadingData" style="width: 100%" :headers="chart6.headers" :items="chart6.data">
                            <template v-slot:items="props">
                                <tr>
                                <!-- <td><router-link :to="takeLink(props.item.contactId)">{{ props.item.lastName }} {{ props.item.firstName }}</router-link></td> -->
                                    <td class="text-xs-left">{{ props.item.date }}</td>
                                    <td class="text-xs-left">{{ props.item.stage }}</td>
                                    <td class="text-xs-left">{{ props.item.SumAmount }}</td>
                                    <td class="text-xs-left">{{ props.item.count }}</td>
                                </tr>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout class="mt-3">
            <v-flex xs12 sm12 md12 lg6 xl6>
                <v-card style="height: 100%;" class="text-center" v-show="chart5.loading5a">
                    <v-card-title>
                        <h2>Tỉ lệ theo số thỏa thuận - tính theo từng nhân viên (%)</h2>
                    </v-card-title>
                    <v-layout>
                        <v-flex offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                            <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                            ></v-progress-circular>
                        </v-flex>
                    </v-layout>
                </v-card>
                
                <v-card style="height: 100%;" v-show="!chart5.loading5a">
                    <v-card-title>
                        <h2>Tỉ lệ theo số thỏa thuận - tính theo từng nhân viên (%)</h2>
                    </v-card-title>
                    <div style="width: 100%; height: 550px; padding: 8px;" class="hello" ref="chartdiv5a">
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12 lg6 xl6 class="ml-3">
                <v-card style="height: 100%;" class="text-center" v-show="chart6.loading6a">
                    <v-card-title>
                        <h2>Tỉ lệ theo số thỏa thuận - tính theo từng giai đoạn (%)</h2>
                    </v-card-title>
                    <v-layout>
                        <v-flex offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                            <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                            ></v-progress-circular>
                        </v-flex>
                    </v-layout>
                </v-card>
                <v-card style="height: 100%;" v-show="!chart6.loading6a">
                    <v-card-title>
                        <h2>Tỉ lệ theo số thỏa thuận - tính theo từng giai đoạn (%)</h2>
                    </v-card-title>
                    <div style="width: 100%; height: 550px; padding: 8px;" class="hello" ref="chartdiv6a">
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout class="mt-3">
            <v-flex xs12 sm12 md12 lg6 xl6>
                <v-card style="height: 100%;" class="text-center" v-show="chart5.loading5b">
                    <v-card-title>
                        <h2>Tỉ lệ theo giá trị thỏa thuận - tính theo từng nhân viên (%)</h2>
                    </v-card-title>
                    <v-layout>
                        <v-flex offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                            <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                            ></v-progress-circular>
                        </v-flex>
                    </v-layout>
                    
                </v-card>
                <v-card style="height: 100%;" v-show="!chart5.loading5b" >
                    <v-card-title>
                        <h2>Tỉ lệ theo giá trị thỏa thuận - tính theo từng nhân viên (%)</h2>
                    </v-card-title>
                    <div style="width: 100%; height: 550px; padding: 8px;" class="hello" ref="chartdiv5b">
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12 lg6 xl6 class="ml-3">
                <v-card style="height: 100%;" class="text-center" v-show="chart6.loading6b">
                    <v-card-title>
                        <h2>Tỉ lệ theo giá trị thỏa thuận - tính theo từng giai đoạn (%)</h2>
                    </v-card-title>
                    <v-layout>
                        <v-flex offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                            <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                            ></v-progress-circular>
                        </v-flex>
                    </v-layout>
                </v-card>
                <v-card style="height: 100%;" v-show="!chart6.loading6b">
                    <v-card-title>
                        <h2>Tỉ lệ theo giá trị thỏa thuận - tính theo từng giai đoạn (%)</h2>
                    </v-card-title>
                    <div style="width: 100%; height: 550px; padding: 8px;" class="hello" ref="chartdiv6b">
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-content>
</template>
<script>
var _ = require('lodash');
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
import moment from 'moment'
import reportAPI from '../../services/report.service'
export default {
    components: {

    },
    props: {
        idAccount: {
            type: String,
            default: null,
        },
        
    },
    watch: {

    },
    data: vm => ({
        date: '',
        menu: false,
        modal: false,
        section: 'contact',
        selectSection: [
            {
                text: 'Báo cáo theo Lead',
                value: 'contact',
            },
            {
                text: 'Báo cáo theo thỏa thuận',
                value: 'deal',
            },
        ],
        divider: true,
        chart1: {
            data: [],
            chart: null,
            loading: false
        },
        chart2: {
            data: [],
            chart: null,
            loading: false
        },
        chart3: {
            data: [],
            chart: null,
            loading: false
        },
        chart4: {
            data: [],
            chart: null,
            loading: false
        },
        chart5: {
            data: [],
            drawData: [],
            chart5a: null,
            chart5b: null,
            headers: [{
                    text: 'THỜI GIAN',
                    align: 'left',
                    value: 'date',
                    // sortable: false
                },
                {
                    text: 'CHỦ SỞ HỮU',
                    align: 'left',
                    value: 'owner',
                    // sortable: false
                },
                {
                    text: 'GIÁ TRỊ',
                    align: 'left',
                    value: 'SumAmount',
                    // sortable: false
                },
                {
                    text: 'SỐ LƯỢNG',
                    align: 'left',
                    value: 'count',
                    // sortable: false
                },
                
            ],
            loadingData: false,
            loading5a: false,
            loading5b: false
        },
        chart6: {
            data: [],
            drawData: [],
            chart6a: null,
            chart6b: null,
            headers: [{
                    text: 'THỜI GIAN',
                    align: 'left',
                    value: 'date',
                    // sortable: false
                },
                {
                    text: 'GIAI ĐOẠN',
                    align: 'left',
                    value: 'stage',
                    // sortable: false
                },
                {
                    text: 'GIÁ TRỊ',
                    align: 'left',
                    value: 'SumAmount',
                    // sortable: false
                },
                {
                    text: 'SỐ LƯỢNG',
                    align: 'left',
                    value: 'count',
                    // sortable: false
                },
                
            ],
            loadingData: false,
            loading6a: false,
            loading6b: false
        }
    }),
    methods: {
        checkString(str){
            if (str == null || str == undefined){
                return ''
            }
            else {
                return str;
            }
        },
        checkNumber(number){
            if (number == null || number == undefined){
                return 0;
            }
            else {
                return number;
            }
        },
        coverTimeDetail(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm:ss, DD/MM/YYYY')
        },
        drawChart1(){
            this.chart1.chart = am4core.create(this.$refs.chartdiv1, am4charts.XYChart);
            this.chart1.chart.data = this.chart1.data;
            let categoryAxis = this.chart1.chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "date";
            categoryAxis.title.text = "Thời gian";
            categoryAxis.labelRotation = 90;
            let valueAxis = this.chart1.chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "Số Lead";

            var series = this.chart1.chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "count";
            series.dataFields.categoryX = "date";
            series.name = "Biến động Lead theo thời gian";
            series.tooltipText = "Tháng {date}: [bold]{count}[/]"

            series.tooltip.pointerOrientation = "vertical";

            this.chart1.chart.cursor = new am4charts.XYCursor();
            this.chart1.chart.cursor.snapToSeries = series;
            this.chart1.chart.cursor.xAxis = categoryAxis;
            this.chart1.loading = false;
        },
        getContactPerMonth(){
            this.chart1.loading = true;
            this.chart1.data = [];
            reportAPI.getContactPerMonth(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let res = result.response;
                    for (let i = 0; i < res.length; i++){
                        let obj = {
                            date: this.checkString(res[i].month) + '-' + this.checkString(res[i].year),
                            count: res[i].count
                        }
                        this.chart1.data.push(obj)
                    }
                    this.drawChart1()
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
                this.chart1.loading = false;
            }).finally(() => {
                
            })
        },
        updateContactPerMonth(date){
            this.chart1.loading = true;
            this.chart1.data = [];
            reportAPI.getContactPerMonth(this.idAccount, date).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let res = result.response;
                    for (let i = 0; i < res.length; i++){
                        let obj = {
                            date: this.checkString(res[i].month) + '-' + this.checkString(res[i].year),
                            count: res[i].count
                        }
                        this.chart1.data.push(obj)
                    }
                    this.chart1.chart.data = this.chart1.data;
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.chart1.loading = false;
            })
        },
        getContactPerStaff(){
            this.chart2.loading = true;
            this.chart2.data = [];
            reportAPI.getContactPerStaff(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let res = result.response;
                    for (let i = 0; i < res.length; i++){
                        let obj = {
                            contactOwner: (res[i]._id == null) ? 'Không có chủ sở hữu' : res[i]._id,
                            count: res[i].count
                        }
                        this.chart2.data.push(obj)
                    }
                    this.drawChart2()
                    this.getContactRegularlyCare()
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
                this.chart2.loading = false;
            }).finally(() => {
                
            })
        },
        updateContactPerStaff(date){
            this.chart2.loading = true;
            this.chart2.data = [];
            reportAPI.getContactPerStaff(this.idAccount, date).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let res = result.response;
                    for (let i = 0; i < res.length; i++){
                        let obj = {
                            contactOwner: (res[i]._id == null) ? 'Không có chủ sở hữu' : res[i]._id,
                            count: res[i].count
                        }
                        this.chart2.data.push(obj)
                    }
                    
                    this.chart2.chart.data = this.chart2.data;
                    this.updateContactRegularlyCare(this.date + '-01');
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.chart2.loading = false;
            })
        },
        createSeriesForChart2(field, name){
            var series = this.chart2.chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = field;
            series.dataFields.categoryY = "contactOwner";
            series.name = name;
            series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
            series.columns.template.height = am4core.percent(80);
            series.sequencedInterpolation = true;

            var valueLabel = series.bullets.push(new am4charts.LabelBullet());
            valueLabel.label.text = "{valueX}";
            valueLabel.label.horizontalCenter = "left";
            valueLabel.label.dx = 10;
            valueLabel.label.hideOversized = false;
            valueLabel.label.truncate = false;

            var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
            // categoryLabel.label.text = "{name}";
            categoryLabel.label.horizontalCenter = "right";
            categoryLabel.label.dx = -10;
            categoryLabel.label.fill = am4core.color("#fff");
            categoryLabel.label.hideOversized = false;
            categoryLabel.label.truncate = false;
            
        },
        drawChart2(){
            this.chart2.chart = am4core.create(this.$refs.chartdiv2, am4charts.XYChart);
            this.chart2.chart.data = this.chart2.data;
            var categoryAxis = this.chart2.chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "contactOwner";
            
            var  valueAxis = this.chart2.chart.xAxes.push(new am4charts.ValueAxis()); 
            valueAxis.renderer.opposite = true;
            this.createSeriesForChart2("count", "Số lượng");
            this.chart2.loading = false;
        },
        getContactPerStaffDetail(){
            this.chart3.loading = true;
            this.chart3.data = [];
            reportAPI.getContactPerStaffDetail(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let bieudo = []
                    let res = result.response;
                    for(let i = 0; i < res.length; i++){
                        if (res[i].leadStatus == null || res[i].leadStatus == undefined){
                            res[i].leadStatus = "none";
                        }
                        let phantu=[];
                        if (bieudo[res[i].contactOwner]!=null || bieudo[res[i].contactOwner]!=undefined){
                            phantu = bieudo[res[i].contactOwner];
                        }
                        phantu["contactOwner"] = (res[i].contactOwner == undefined) ? 'None' : res[i].contactOwner;
                        phantu[res[i].leadStatus] = res[i].count;
                        bieudo[res[i].contactOwner] = phantu;
                    }

                    let listValue = Object.values(bieudo)
                    for (let element of listValue){
                        this.chart3.data.push(Object.assign({}, element));
                    }
                    this.drawChart3();
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                }).catch(error => {
                    console.log(error);
                    this.chart3.loading = false;
                }).finally(() => {
                    
                })
        },
        updateContactPerStaffDetail(date){
            this.chart3.loading = true;
            this.chart3.data = [];
            reportAPI.getContactPerStaffDetail(this.idAccount, date).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    let bieudo = []
                    let res = result.response;
                    for(let i = 0; i < res.length; i++){
                        if (res[i].leadStatus == null || res[i].leadStatus == undefined){
                            res[i].leadStatus = "none";
                        }
                        let phantu=[];
                        if (bieudo[res[i].contactOwner]!=null || bieudo[res[i].contactOwner]!=undefined){
                            phantu = bieudo[res[i].contactOwner];
                        }
                        phantu["contactOwner"] = (res[i].contactOwner == undefined) ? 'None' : res[i].contactOwner;
                        phantu[res[i].leadStatus] = res[i].count;
                        bieudo[res[i].contactOwner] = phantu;
                    }

                    let listValue = Object.values(bieudo)
                    for (let element of listValue){
                        this.chart3.data.push(Object.assign({}, element));
                    }
                    this.chart3.chart.data = this.chart3.data;
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    this.chart3.loading = false;
                })
        },
        // Create series
        createSeriesForChart3(field, name) {
            
            // Set up series
            var series = this.chart3.chart.series.push(new am4charts.ColumnSeries());
            series.name = name;
            series.dataFields.valueX = field;
            series.dataFields.categoryY = "contactOwner";
            series.sequencedInterpolation = true;
            
            // Make it stacked
            series.stacked = true;
            
            // Configure columns
            series.columns.template.width = am4core.percent(60);
            series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryY}: {valueX}";
            
            // Add label
            var labelBullet = series.bullets.push(new am4charts.LabelBullet());
            labelBullet.label.text = "{valueX}";
            labelBullet.locationX = 0.5;
            labelBullet.label.fill = am4core.color("#fff");
            return series;
        },
        drawChart3(){
            this.chart3.chart = am4core.create(this.$refs.chartdiv3, am4charts.XYChart);
            // Add data
            this.chart3.chart.data = this.chart3.data;

            // Create axes
            var categoryAxis = this.chart3.chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "contactOwner";

            var  valueAxis = this.chart3.chart.xAxes.push(new am4charts.ValueAxis()); 
            valueAxis.renderer.opposite = true;
            this.createSeriesForChart3("none", "Không có trạng thái");
            this.createSeriesForChart3("New", "New");
            this.createSeriesForChart3("Open", "Open");
            this.createSeriesForChart3("In Progress", "In Progress");
            this.createSeriesForChart3("Open Deal", "Open Deal");
            this.createSeriesForChart3("Unqualified", "Unqualified");
            this.createSeriesForChart3("Attempted To Contact", "Attempted To Contact");
            this.createSeriesForChart3("Connected", "Connected");
            this.createSeriesForChart3("Bad Timing", "Bad Timing");

            // Legend
            this.chart3.chart.legend = new am4charts.Legend();
            this.chart3.loading = false;
            // this.chart3.chart.legend.position = "top"
        },
        getContactRegularlyCare(){
            this.chart4.loading = true;
            this.chart4.data = [...this.chart2.data]
            reportAPI.getContactRegularlyCare(this.idAccount).then(result => {
                if(result.code == 'SUCCESS'){
                    let careArray = [];
                    for (let i = 0; i < result.response.length; i++){
                        let obj = {
                            _id: (result.response[i]._id == null) ? 'Không có chủ sở hữu' : result.response[i]._id,
                            count: result.response[i].count
                        }
                        careArray.push(obj)
                    }
                    let kq = [];
                    // console.log(this.chart4.data)
                    for (let i = 0; i < this.chart4.data.length;i++){
                        kq[this.chart4.data[i].contactOwner] = this.chart4.data[i]
                    }
                    for (let i = 0; i < careArray.length;i++){
                        kq[careArray[i]._id].care = careArray[i].count;
                    }
                    let listValue = Object.values(kq)
                    this.chart4.data = []
                    for (let element of listValue){
                        this.chart4.data.push(Object.assign({}, element));
                    }
                    this.drawChart4();
                }
                
            }).catch(error => {
                console.log(error)
                this.chart4.loading = false;
            }).finally(() => {
                
            })
        },
        updateContactRegularlyCare(date){
            this.chart4.loading = true;
            this.chart4.data = [...this.chart2.data]
            reportAPI.getContactRegularlyCare(this.idAccount, date).then(result => {
                if(result.code == 'SUCCESS'){
                    let careArray = [];
                    for (let i = 0; i < result.response.length; i++){
                        let obj = {
                            _id: (result.response[i]._id == null) ? 'Không có chủ sở hữu' : result.response[i]._id,
                            count: result.response[i].count
                        }
                        careArray.push(obj)
                    }
                    let kq = [];
                    // console.log(this.chart4.data)
                    for (let i = 0; i < this.chart4.data.length;i++){
                        kq[this.chart4.data[i].contactOwner] = this.chart4.data[i]
                    }
                    for (let i = 0; i < careArray.length;i++){
                        kq[careArray[i]._id].care = careArray[i].count;
                    }
                    let listValue = Object.values(kq)
                    this.chart4.data = []
                    for (let element of listValue){
                        this.chart4.data.push(Object.assign({}, element));
                    }
                    this.chart4.chart.data = this.chart4.data
                }
                
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.chart4.loading = false;
            })
        },
        drawChart4(){
            this.chart4.chart = am4core.create(this.$refs.chartdiv4, am4charts.XYChart);
            this.chart4.chart.data = this.chart4.data;
            var categoryAxis = this.chart4.chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "contactOwner";

            var  valueAxis = this.chart4.chart.xAxes.push(new am4charts.ValueAxis()); 
            valueAxis.renderer.opposite = true;
            this.createSeriesForChart4("count", "Số Lead");
            this.createSeriesForChart4("care", "Thường xuyên");
            this.chart4.chart.legend = new am4charts.Legend()
            this.chart4.loading = false;
        },
        createSeriesForChart4(field, name){
            var series = this.chart4.chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = field;
            series.dataFields.categoryY = "contactOwner";
            series.name = name;
            series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
            series.columns.template.height = am4core.percent(80);
            series.sequencedInterpolation = true;

            var valueLabel = series.bullets.push(new am4charts.LabelBullet());
            valueLabel.label.text = "{valueX}";
            valueLabel.label.horizontalCenter = "left";
            valueLabel.label.dx = 10;
            valueLabel.label.hideOversized = false;
            valueLabel.label.truncate = false;

            // var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
            // categoryLabel.label.text = "{name}";
            // categoryLabel.label.horizontalCenter = "right";
            // categoryLabel.label.dx = -10;
            // categoryLabel.label.fill = am4core.color("#fff");
            // categoryLabel.label.hideOversized = false;
            // categoryLabel.label.truncate = false;
        },
        getDealAmountStaff(){
            this.chart5.loadingData = true;
            this.chart5.loading5a = true;
            this.chart5.loading5b = true;
            this.chart5.data = [];
            this.chart5.drawData = [];
            reportAPI.getDealAmountStaff(this.idAccount).then(result => {
                if(result.code == 'SUCCESS'){
                    let res = result.response;
                    let tempRes = [];
                    for (let i = 0; i < res.length; i++ ){
                        let date = this.checkString(res[i].month) + '-' + this.checkString(res[i].year)
                        let obj = {
                            date: date,
                            owner: res[i].owner,
                            count: res[i].count,
                            SumAmount: res[i].SumAmount
                        }
                        this.chart5.data.unshift(obj);
                    }
                    let ownerIndexes = [];
                    for(let i = 0; i < this.chart5.data.length; i++){
                        let obj = Object.assign({}, this.chart5.data[i]);

                        if(ownerIndexes.includes(obj.owner)){
                            let index = ownerIndexes.indexOf(obj.owner)
                            this.chart5.drawData[index].count += obj.count;
                            this.chart5.drawData[index].SumAmount += obj.SumAmount;
                        }
                        else {
                            this.chart5.drawData.push(obj);
                            ownerIndexes.push(obj.owner)
                        }
                    }
                    this.drawChart5a()
                    this.drawChart5b();
                }
                this.chart5.loadingData = false;
            }).catch(error => {
                console.log(error);
                this.chart5.loadingData = false;
                this.chart5.loading5a = false;
                this.chart5.loading5b = false;
            }).finally(() => {
                
            })
        }, 
        updateDealAmountStaff(date){
            this.chart5.loadingData = true;
            this.chart5.loading5a = true;
            this.chart5.loading5b = true;
            this.chart5.data = [];
            this.chart5.drawData = [];
            reportAPI.getDealAmountStaff(this.idAccount, date).then(result => {
                if(result.code == 'SUCCESS'){
                    let res = result.response;
                    let tempRes = [];
                    for (let i = 0; i < res.length; i++ ){
                        let date = this.checkString(res[i].month) + '-' + this.checkString(res[i].year)
                        let obj = {
                            date: date,
                            owner: res[i].owner,
                            count: res[i].count,
                            SumAmount: res[i].SumAmount
                        }
                        this.chart5.data.unshift(obj);
                    }
                    let ownerIndexes = [];
                    for(let i = 0; i < this.chart5.data.length; i++){
                        let obj = Object.assign({}, this.chart5.data[i]);

                        if(ownerIndexes.includes(obj.owner)){
                            let index = ownerIndexes.indexOf(obj.owner)
                            this.chart5.drawData[index].count += obj.count;
                            this.chart5.drawData[index].SumAmount += obj.SumAmount;
                        }
                        else {
                            this.chart5.drawData.push(obj);
                            ownerIndexes.push(obj.owner)
                        }
                    }
                    this.chart5.chart6a.data = this.chart5.drawData;
                    this.chart5.chart6b.data = this.chart5.drawData;
                }
                
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.chart5.loadingData = false;
                this.chart5.loading5a = false;
                this.chart5.loading5b = false;
            })
        }, 
        drawChart5a(){
            this.chart5.chart5a = am4core.create(this.$refs.chartdiv5a, am4charts.PieChart);
            this.chart5.chart5a.data = this.chart5.drawData
            var pieSeries = this.chart5.chart5a.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "count";
            pieSeries.dataFields.category = "owner";
            pieSeries.ticks.template.disabled = true;
            pieSeries.alignLabels = false;
            pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
            pieSeries.labels.template.radius = am4core.percent(-40);
            pieSeries.labels.template.fill = am4core.color("white");
            this.chart5.chart5a.legend = new am4charts.Legend();
            this.chart5.chart5a.legend.position = "right";
            this.chart5.loading5a = false;
        },
        drawChart5b(){
            this.chart5.chart5b = am4core.create(this.$refs.chartdiv5b, am4charts.PieChart);
            this.chart5.chart5b.data = this.chart5.drawData
            var pieSeries = this.chart5.chart5b.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "SumAmount";
            pieSeries.dataFields.category = "owner";
            pieSeries.ticks.template.disabled = true;
            pieSeries.alignLabels = false;
            pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
            pieSeries.labels.template.radius = am4core.percent(-40);
            pieSeries.labels.template.fill = am4core.color("white");
            this.chart5.chart5b.legend = new am4charts.Legend();
            this.chart5.chart5b.legend.position = "right";
            this.chart5.loading5b = false;

        },
        getDealAmountStage(){
            this.chart6.loadingData = true;
            this.chart6.loading6a = true;
            this.chart6.loading6b = true;
            this.chart6.data = [];
            this.chart6.drawData = [];
            reportAPI.getDealAmountStage(this.idAccount).then(result => {
                if(result.code == 'SUCCESS'){
                    let res = result.response;
                    let tempRes = [];
                    for (let i = 0; i < res.length; i++ ){
                        let date = this.checkString(res[i].month) + '-' + this.checkString(res[i].year)
                        let obj = {
                            // category: date + '-' + res[i].stage,
                            date: date,
                            stage: res[i].stage,
                            count: res[i].count,
                            SumAmount: res[i].SumAmount
                        }
                        this.chart6.data.push(obj);
                    }
                    let stageIndexes = [];
                    for(let i = 0; i < this.chart6.data.length; i++){
                        let obj = Object.assign({}, this.chart6.data[i]);

                        if(stageIndexes.includes(obj.stage)){
                            let index = stageIndexes.indexOf(obj.stage)
                            this.chart6.drawData[index].count += obj.count;
                            this.chart6.drawData[index].SumAmount += obj.SumAmount;
                        }
                        else {
                            this.chart6.drawData.push(obj);
                            stageIndexes.push(obj.stage)
                        }
                    }
                    this.drawChart6a()
                    this.drawChart6b();
                }
                this.chart6.loadingData = false;
            }).catch(error => {
                console.log(error);
                this.chart6.loadingData = false;
                this.chart6.loading6a = false;
                this.chart6.loading6b = false;
            }).finally(() => {
                
            })
        },
        updateDealAmountStage(date){
            this.chart6.loadingData = true;
            this.chart6.loading6a = true;
            this.chart6.loading6b = true;
            this.chart6.data = [];
            this.chart6.drawData = [];
            reportAPI.getDealAmountStage(this.idAccount, date).then(result => {
                if(result.code == 'SUCCESS'){
                    let res = result.response;
                    let tempRes = [];
                    for (let i = 0; i < res.length; i++ ){
                        let date = this.checkString(res[i].month) + '-' + this.checkString(res[i].year)
                        let obj = {
                            date: date,
                            stage: res[i].stage,
                            count: res[i].count,
                            SumAmount: res[i].SumAmount
                        }
                        this.chart6.data.unshift(obj);
                    }
                    let stageIndexes = [];
                    for(let i = 0; i < this.chart6.data.length; i++){
                        let obj = Object.assign({}, this.chart6.data[i]);

                        if(stageIndexes.includes(obj.stage)){
                            let index = stageIndexes.indexOf(obj.stage)
                            this.chart6.drawData[index].count += obj.count;
                            this.chart6.drawData[index].SumAmount += obj.SumAmount;
                        }
                        else {
                            this.chart6.drawData.push(obj);
                            stageIndexes.push(obj.stage)
                        }
                    }
                    this.chart6.chart6a.data = this.chart6.drawData;
                    this.chart6.chart6b.data = this.chart6.drawData;
                }
                
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.chart6.loadingData = false;
                this.chart6.loading6a = false;
                this.chart6.loading6b = false;
            })
        },
        drawChart6a(){
            this.chart6.chart6a = am4core.create(this.$refs.chartdiv6a, am4charts.PieChart);
            this.chart6.chart6a.data = this.chart6.drawData
            var pieSeries = this.chart6.chart6a.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "count";
            pieSeries.dataFields.category = "stage";
            pieSeries.ticks.template.disabled = true;
            pieSeries.alignLabels = false;
            pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
            pieSeries.labels.template.radius = am4core.percent(-40);
            pieSeries.labels.template.fill = am4core.color("white");
            this.chart6.chart6a.legend = new am4charts.Legend();
            this.chart6.chart6a.legend.position = "right";
            this.chart6.loading6a = false;
        },
        drawChart6b(){
            this.chart6.chart6b = am4core.create(this.$refs.chartdiv6b, am4charts.PieChart);
            this.chart6.chart6b.data = this.chart6.drawData
            var pieSeries = this.chart6.chart6b.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "SumAmount";
            pieSeries.dataFields.category = "stage";
            pieSeries.ticks.template.disabled = true;
            pieSeries.alignLabels = false;
            pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
            pieSeries.labels.template.radius = am4core.percent(-40);
            pieSeries.labels.template.fill = am4core.color("white");
            this.chart6.chart6b.legend = new am4charts.Legend();
            this.chart6.chart6b.legend.position = "right";
            this.chart6.loading6b = false;
        },
    },
    created(){
        this.$store.state.colorNumber = 7;
    },
    beforeDestroy() {
        if (this.chart1.chart) {
            this.chart1.chart.dispose();
        }
        if (this.chart2.chart) {
            this.chart2.chart.dispose();
        }
        if (this.chart3.chart) {
            this.chart3.chart.dispose();
        }
        if (this.chart4.chart) {
            this.chart4.chart.dispose();
        }
        if (this.chart5a.chart) {
            this.chart5a.chart.dispose();
        }
        if (this.chart5b.chart) {
            this.chart5b.chart.dispose();
        }
        if (this.chart6a.chart) {
            this.chart6a.chart.dispose();
        }
        if (this.chart6b.chart) {
            this.chart6b.chart.dispose();
        }
        
    },
    watch: {
        date(){
            let fullDate = this.date + '-01';
            this.updateContactPerMonth(fullDate);
            this.updateContactPerStaff(fullDate);
            this.updateContactRegularlyCare(fullDate);
            this.updateContactPerStaffDetail(fullDate);
            this.updateDealAmountStaff(fullDate);
            this.updateDealAmountStage(fullDate);
        }
    },
    mounted(){
        this.getContactPerMonth()
        this.getContactPerStaffDetail()
        this.getContactPerStaff();
        this.getDealAmountStaff();
        this.getDealAmountStage();
    }
}
</script>
<style scoped>
.hello {
  width: 100%;
  height: 100%;
}
</style>