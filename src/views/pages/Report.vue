<template>
    <v-content class="mt-4 pl-2 pr-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md11 lg11 xl11>
                <h1 class="ml-3">Báo cáo tổng quan</h1>
            </v-flex>
            <v-flex xs12 sm12 md1 lg1 xl1>

            </v-flex>
        </v-layout>
        <v-divider class="mt-5" :divider="divider"></v-divider>
        <v-layout row wrap>
            <v-flex xs12 sm12 md6 lg6 xl6>
                <v-card style="height: 550px;">
                    <v-card-title>
                        <h2>Biến động Lead theo tháng</h2>
                    </v-card-title>
                    <v-card-text>
                        <div style="width: 100%; height: 450px; padding: 8px;" class="hello" ref="chartdiv1">
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md6 lg6 xl6>
                <v-card style="height: 550px;">
                    <v-card-title>
                        <h2>Biến động Lead theo tháng</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-btn @click="getDealAmountStaff()">Click</v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12 class="mt-3 md-3">
                <v-card style="height: 100%">
                    <v-card-title>
                        <h2>Số lượng Lead của mỗi tài khoản</h2>
                    </v-card-title>
                    <v-card-text>
                        <div style="width: 100%; height: 550px; padding: 8px;" class="hello" ref="chartdiv2">
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12 class="mt-3 md-3">
                <v-card style="height: 100%;">
                    <v-card-title>
                        <h2>Số lượng Lead theo Trạng thái Lead</h2>
                    </v-card-title>
                    <v-card-text>
                        <div style="width: 100%; height: 550px; padding: 8px;" class="hello" ref="chartdiv3">
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12 class="mt-3 md-3">
                <v-card style="height: 100%;">
                    <v-card-title>
                        <h2>Số lượng Lead được chăm sóc thường xuyên</h2>
                    </v-card-title>
                    <v-card-text>
                        <div style="width: 100%; height: 550px; padding: 8px;" class="hello" ref="chartdiv4">
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs6 sm6 md6 lg6 xl6>
                <v-card style="height: 100%;">
                    <v-card-title>
                        <h2>Thống kê thỏa thuận theo từng tháng</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table style="width: 100%" :headers="chart5.headers" :items="chart5.data">
                            <template v-slot:items="props">
                                <tr>
                                <!-- <td><router-link :to="takeLink(props.item.contactId)">{{ props.item.lastName }} {{ props.item.firstName }}</router-link></td> -->
                                    <td class="text-xs-left">{{ props.item.date }}</td>
                                    <td class="text-xs-left">{{ props.item.owner }}</td>
                                    <td class="text-xs-left">{{ props.item.count }}</td>
                                    <td class="text-xs-left">{{ props.item.SumAmount }}</td>
                                </tr>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md6 lg6 xl6>
                <v-card>
                    
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
        divider: true,
        chart1: {
            data: [],
            chart: null
        },
        chart2: {
            data: [],
            chart: null
        },
        chart3: {
            data: [],
            chart: null
        },
        chart4: {
            data: [],
            chart: null
        },
        chart5: {
            data: [],
            chart: null,
            headers: [{
                    text: 'THỜI GIAN',
                    align: 'left',
                    value: '',
                    // sortable: false
                },
                {
                    text: 'CHỦ SỞ HỮU',
                    align: 'left',
                    value: 'owner',
                    // sortable: false
                },
                {
                    text: 'SỐ THỎA THUẬN',
                    align: 'left',
                    value: 'count',
                    // sortable: false
                },
                {
                    text: 'GIÁ TRỊ',
                    align: 'left',
                    value: 'SumAmount',
                    // sortable: false
                },
            ],
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

            let valueAxis = this.chart1.chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "Số Lead";

            var series = this.chart1.chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "count";
            series.dataFields.categoryX = "date";
            series.name = "Biến động Lead theo thời gian";
            series.columns.template.tooltipText = "Tháng {categoryX}\nSố Lead: {valueY}";
            series.columns.template.fill = am4core.color("#039BE5");
        },
        getContactPerMonth(){
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
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.drawChart1()
            })
        },
        getContactPerStaff(){
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
                    // console.log(this.chart2.data)
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.drawChart2()
                this.getContactRegularlyCare()
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
            // this.chart2.chart = am4core.create(this.$refs.chartdiv2, am4charts.XYChart);
            // this.chart2.chart.data = this.chart2.data;
            // let categoryAxis = this.chart2.chart.xAxes.push(new am4charts.CategoryAxis());
            // categoryAxis.dataFields.category = "contactOwner";
            // categoryAxis.title.text = "Tài khoản sở hữu";

            // let valueAxis = this.chart2.chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "Số Lead";
            // var series = this.chart2.chart.series.push(new am4charts.ColumnSeries());
            // series.dataFields.valueY = "count";
            // series.dataFields.categoryX = "contactOwner";
            // series.name = "Biến động Lead theo thời gian";
            // series.columns.template.tooltipText = "Tài khoản: {categoryX}\nSố Lead: {valueY}";
            // series.columns.template.fill = am4core.color("#039BE5");
            
        },
        getContactPerStaffDetail(){
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
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.drawChart3();
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
            // var categoryAxis = this.chart3.chart.xAxes.push(new am4charts.CategoryAxis());
            // categoryAxis.dataFields.category = "contactOwner";
            // categoryAxis.renderer.grid.template.location = 0;

            // var valueAxis = this.chart3.chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.renderer.inside = true;
            // valueAxis.renderer.labels.template.disabled = true;
            // valueAxis.min = 0;
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
        },
        getContactRegularlyCare(){
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
                    // console.log(this.chart4.data)
                }
                
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.drawChart4();
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

            var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
            categoryLabel.label.text = "{name}";
            categoryLabel.label.horizontalCenter = "right";
            categoryLabel.label.dx = -10;
            categoryLabel.label.fill = am4core.color("#fff");
            categoryLabel.label.hideOversized = false;
            categoryLabel.label.truncate = false;
        },
        getDealAmountStaff(){
            this.chart5.data = [];
            reportAPI.getDealAmountStaff(this.idAccount).then(result => {
                if(result.code == 'SUCCESS'){
                    let res = result.response;
                    let tempRes = [];
                    for (let i = 0; i < res.length; i++ ){
                        let date = this.checkString(res[i].month) + '-' + this.checkString(res[i].year)
                        let obj = {
                            // category: date + '-' + res[i].owner,
                            date: date,
                            owner: res[i].owner,
                            count: res[i].count,
                            SumAmount: res[i].SumAmount
                        }
                        this.chart5.data.unshift(obj);
                    }
                    // console.log(this.chart5.data)
                }
                
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                // this.drawChart5()
            })
        }, 
        drawChart5(){






            
            // let data = [
            //     {
            //         category: "10-2019-ductbm@adsplus.vn",
            //         name_fr: "10-2019",
            //         owner: "ductbm@adsplus.vn",
            //         count: 1,
            //         SumAmount: 150000,
            //     },
            //     {
            //         category: "10-2019-anhpq@adsplus.vn",
            //         name_fr: "10-2019",
            //         owner: "anhpq@adsplus.vn",
            //         count: 1,
            //         SumAmount: 150000,
            //     },
            //     {
            //         category: "11-2019-ductbm@adsplus.vn",
            //         name_fr: "11-2019",
            //         owner: "ductbm@adsplus.vn",
            //         count: 1,
            //         SumAmount: 150000,
            //     },
            // ]
            // let byName = _.groupBy(data, "name_fr");
            // let guides = _.map(byName, function(items, key) {
            //     return {
            //         category: _.first(items).category,
            //         toCategory: _.last(items).category,
            //         lineAlpha: 0,
            //         expand: true,
            //         label: key,
            //         labelRotation: 0,
            //         tickLength: 80
            //     };
            // });
            // let config = 
            //     {
            //         type: "serial",
            //         theme: "light",
            //         graphs: [
            //             {
            //                 "type": "column",
            //                 "fillAlphas": .9,
            //                 "title": "Số hợp đồng",
            //                 "valueField": "count",
            //             },
            //             {
            //                 "type": "column",
            //                 "fillAlphas": .9,
            //                 "title": "Giá trị hợp đồng",
            //                 "valueField": "SumAmount"
            //             },
            //         ],
            //         columnSpacing: 1,
            //         valueAxes: [
            //             {
            //                 "position": "left",
            //                 "title": "Số hợp đồng"
            //             },
            //         ],
            //         legend: {
            //             "useGraphSettings": true,
            //             "position": "bottom",
            //             "align": "center"
            //         },
            //         categoryField: "category",
            //         categoryAxis: {
            //             "gridAlpha": 0,
            //             "labelRotation": 90,
            //             "guides": guides,
            //             "labelFunction": function(label, item) {
            //                 return item.dataContext.date;
            //             }
            //         },
            //         dataProvider: data
            //     }
            // this.chart5.chart = am4core.createFromConfig(config, this.$refs.chartdiv5, am4charts.XYChart);
            
        }
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
        if (this.chart5.chart) {
            this.chart5.chart.dispose();
        }
    },
    mounted(){
        this.getContactPerMonth()
        this.getContactPerStaffDetail()
        this.getContactPerStaff();
        this.getDealAmountStaff();
    }
}
</script>
<style scoped>
.hello {
  width: 300px;
  height: 300px;
}
</style>