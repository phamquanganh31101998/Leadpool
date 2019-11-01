<template>
    <v-content class="mt-5 pl-2 pr-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <h1 class="ml-2">Công việc</h1>
            </v-flex>
            <v-flex xs12 sm12 md7 lg6 xl6>
                <v-layout row>
                    <!-- <v-flex xs5 sm5 md5 lg5 xl5 offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <v-text-field append-icon="search" v-model="search" label="Search" single-line hide-details></v-text-field>
                    </v-flex> -->
                    <!-- <v-flex xs2 md2 lg2 xl2>
                        <v-btn dark color="warning" @click="createTask = true">Create Task</v-btn>
                    </v-flex> -->
                </v-layout>
            </v-flex>
        </v-layout>
        <v-divider class="mt-5" :divider="divider"></v-divider>
        <v-layout row wrap>
            <v-flex xs2 sm2 md2 lg2 xl2>
                <v-list>
                    <v-list-tile @click="changeStyleBeforeGetTask(0)">
                        <v-list-tile-content :style="fontWeight[0]">
                            Hết hạn hôm nay
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="changeStyleBeforeGetTask(1)">
                        <v-list-tile-content :style="fontWeight[1]">
                            Hết hạn trong tuần này
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="changeStyleBeforeGetTask(2)">
                        <v-list-tile-content :style="fontWeight[2]">
                            Quá hạn
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="changeStyleBeforeGetTask(3)">
                        <v-list-tile-content :style="fontWeight[3]">
                            Đã hoàn thành
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <br>
                <v-divider :divider="divider"></v-divider>
                <!-- <v-select v-model="status" :items="statusToChoose" label="Status" style="width: 60%;" class="ml-2"></v-select> -->
            </v-flex>
            <v-flex xs10 sm10 md10 lg10 xl10>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-data-table :headers="headers" :items="displayTasks" hide-actions no-data-text="Không có công việc nào">
                            <template v-slot:items="props">
                                <td v-if="props.item.status == 'NOTCOMPLETED'">
                                    <v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                            <v-btn small fab dark color="grey lighten-1" @click="updateTask(props.item.taskId, props.item.contactId, 'status', 'COMPLETED')" v-on="on"><v-icon>done</v-icon></v-btn>
                                        </template>
                                        <span>Đánh dấu đã hoàn thành</span>
                                    </v-tooltip>
                                </td>
                                <td v-if="props.item.status == 'COMPLETED'">
                                     <v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                            <v-btn v-on="on" small fab dark color="success" @click="updateTask(props.item.taskId, props.item.contactId, 'status', 'NOTCOMPLETED')" ><v-icon>done</v-icon></v-btn>
                                        </template>
                                        <span>Đánh dấu chưa hoàn thành</span>
                                    </v-tooltip>
                                </td>
                                <td>{{ props.item.title }}</td>
                                <td>{{ props.item.type }}</td>
                                <td>{{ coverTimeTooltip(props.item.dueDate) }}</td>
                                <td>
                                    <v-btn color="primary" round outline flat @click.stop="getTaskById(props.item.taskId)">Xem chi tiết</v-btn>
                                </td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <v-pagination v-model="pagination.page" :length="length" @input="changePage()"></v-pagination>
                        <br>
                        <br>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <!-- <v-dialog v-model="createTask" persistent max-width="700px">
            <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                    <span class="headline">Create Task</span>
                </v-card-title>
                <v-card-text>
                    <newTask :idAccount="this.idAccount" :idContact="this.idContact" @closeCreateTaskDialog="closeCreateTaskDialog()"/>
                </v-card-text>
            </v-card>
        </v-dialog> -->
        <v-dialog v-model="viewTask.dialog" persistent max-width="700">
            <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                    <span class="headline">Chi tiết công việc</span>
                </v-card-title>
                <v-card-text>
                    <v-layout wrap>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                            <v-layout row>
                                <v-flex xs4 sm5 md6 lg6 xl6>
                                    <v-text-field label="Tên" v-model="viewTask.task.title" @change="updateTask(viewTask.task.taskId, 'a', 'title', viewTask.task.title)"></v-text-field>
                                </v-flex>
                                <v-flex xs4 sm4 md4 lg4 xl4>
                                    <v-menu ref="menu1" v-model="viewTask.task.menu1" :close-on-content-click="false" lazy
                                        transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="viewTask.task.dueDateDate" label="Hạn cuối" persistent-hint prepend-icon="event"
                                                v-on="on">
                                            </v-text-field>
                                        </template>
                                        <v-date-picker v-model="viewTask.task.dueDateDate" no-title @change="updateTask(viewTask.task.taskId, 'a', 'dueDate', viewTask.task.dueDateDate + 'T' + viewTask.task.dueDateTime + ':00')"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs4 sm3 md2 lg2 xl2>
                                    <v-select 
                                        v-model="viewTask.task.dueDateTime" 
                                        :items="viewTask.timeToChoose"
                                        @change="updateTask(viewTask.task.taskId, 'a', 'dueDate', viewTask.task.dueDateDate + 'T' + viewTask.task.dueDateTime + ':00')"
                                        ></v-select>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                            <v-textarea class="mt-2" name="input" label="Ghi chú..." v-model="viewTask.task.note" @change="updateTask(viewTask.task.taskId, 'a', 'note', viewTask.task.note)"></v-textarea>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                            <v-layout row>
                                <v-flex>
                                    <v-btn flat icon small color="green">
                                        <v-icon>text_format</v-icon>
                                    </v-btn>
                                    <v-btn flat icon small color="green">
                                        <v-icon>link</v-icon>
                                    </v-btn>
                                    <v-btn flat icon small color="green">
                                        <v-icon>receipt</v-icon>
                                    </v-btn>
                                    <v-btn flat icon small color="green">
                                        <v-icon>photo</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="mt-2">
                            <v-divider :divider="divider"></v-divider>
                            <v-layout row class="mt-2">
                                <v-flex>
                                    <p>Kiểu</p>
                                    <v-menu :close-on-content-click="false" top offset-y>
                                        <template v-slot:activator="{ on }">
                                            <a color="indigo" v-on="on">
                                                {{viewTask.task.type}}
                                            </a>
                                        </template>
                                        <v-list>
                                            <v-list-tile @click="changeType(viewTask.task.taskId, 'To-do')" style="backgroundColor: white;">
                                                <v-list-tile-title>To-do</v-list-tile-title>
                                            </v-list-tile>
                                            <v-list-tile @click="changeType(viewTask.task.taskId, 'Email')" style="backgroundColor: white;">
                                                <v-list-tile-title>Email</v-list-tile-title>
                                            </v-list-tile>
                                            <v-list-tile @click="changeType(viewTask.task.taskId, 'Call')" style="backgroundColor: white;">
                                                <v-list-tile-title>Call</v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
                                </v-flex>
                                <v-flex>
                                    <p>Giao cho</p>
                                    <v-menu :close-on-content-click="false" offset-y max-width="300">
                                        <template v-slot:activator="{ on }">
                                            <a color="indigo" v-on="on">
                                                {{getNameFromEmail(viewTask.task.assignedTo)}}
                                            </a>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                <v-layout row wrap>
                                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                                        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="viewTask.searchEmail"></v-text-field>
                                                    </v-flex>
                                                    <br>
                                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                                        <v-select :items="viewTask.searchedEmail" item-text="displayText" item-value="email" v-model="viewTask.task.assignedTo" @change="updateTask(viewTask.task.taskId, 'a', 'assignedTo', viewTask.task.assignedTo)"></v-select>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card-title>
                                        </v-card>
                                    </v-menu>
                                </v-flex>
                                <v-flex>
                                    <p>Email nhắc nhở</p>
                                    <v-layout row>
                                        <v-flex>
                                            <v-menu :close-on-content-click="false" top offset-y>
                                                <template v-slot:activator="{ on }" v-if="viewTask.task.emailReminderDate != ''">
                                                    <span>
                                                        <a color="indigo" v-on="on">
                                                            {{viewTask.task.emailReminderDate}}
                                                        </a>
                                                    </span>
                                                </template>
                                                <template v-slot:activator="{ on }" v-else>
                                                    <span>
                                                        <a color="indigo" v-on="on">
                                                            {{viewTask.task.emailReminderChoice}}
                                                        </a>
                                                    </span>
                                                </template>
                                                <v-list>
                                                    <!-- <v-list-tile @click="day = 'The day of'">
                                                        <v-list-tile-title>The day of</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-list-tile @click="day = 'The day before'">
                                                        <v-list-tile-title>The day before</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-list-tile @click="day = 'The week before'">
                                                        <v-list-tile-title>The week before</v-list-tile-title>
                                                    </v-list-tile> -->
                                                    <v-menu :close-on-content-click="false" offset-y v-model="viewTask.task.menu2">
                                                        <template v-slot:activator="{ on }">
                                                            <v-list-tile v-on="on" @click="viewTask.task.emailReminderChoice = 'Custom Date'">
                                                                <v-list-tile-title>Chọn ngày</v-list-tile-title>
                                                            </v-list-tile>
                                                        </template>
                                                        <v-date-picker 
                                                            v-model="viewTask.task.emailReminderDate" 
                                                            no-title 
                                                            @change="updateTask(viewTask.task.taskId, 'a', 'emailReminder', viewTask.task.emailReminderDate + 'T' + viewTask.task.emailReminderTime + ':00')"
                                                            >
                                                        </v-date-picker>
                                                    </v-menu>
                                                    
                                                    <v-list-tile @click="setNoReminder(viewTask.task.taskId)">
                                                        <v-list-tile-title>Không nhắc trước</v-list-tile-title>
                                                    </v-list-tile>
                                                </v-list>
                                            </v-menu>
                                        </v-flex>
                                    </v-layout>
                                
                                </v-flex>
                                <v-flex v-if="viewTask.task.emailReminderChoice!= 'No reminder'">
                                    <p>Thời gian</p>
                                    <v-menu :close-on-content-click="false" lazy
                                        transition="scale-transition" offset-y full-width >
                                        <template v-slot:activator="{ on }">
                                            <span>
                                                <a color="indigo" v-on="on">
                                                    {{viewTask.task.emailReminderTime}}
                                                </a>
                                            </span>
                                        </template>
                                        <v-select 
                                            v-model="viewTask.task.emailReminderTime" 
                                                :items="viewTask.timeToChoose" 
                                                style="backgroundColor: white; padding: 0px 10px; width: 100px;"
                                                @change="updateTask(viewTask.task.taskId, 'a', 'emailReminder', viewTask.task.emailReminderDate + 'T' + viewTask.task.emailReminderTime + ':00')"
                                            ></v-select>
                                    </v-menu>
                                </v-flex>
                                <v-flex>
                                    <p>Thứ tự</p>
                                    <v-menu :close-on-content-click="false" offset-y>
                                        <template v-slot:activator="{ on }">
                                            <a color="indigo" v-on="on">
                                                Không
                                            </a>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                <v-layout row>
                                                    <v-text-field append-icon="search" label="Search" single-line hide-details>
                                                    </v-text-field>
                                                </v-layout>
                                            </v-card-title>
                                        </v-card>
                                    </v-menu>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <br>
                        <br>
                        <v-divider></v-divider>
                        <v-divider></v-divider>
                        <br>
                        <br>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="mt-2">
                            <v-layout wrap>
                                <v-btn color="red" small flat @click="viewTask.dialog = false">Đóng</v-btn>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="failDialog" @click:outside="failDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Thất bại</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Đã có lỗi xảy ra khi lấy danh sách công việc. Xin hãy thử lại.
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="failDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-content>
</template>
<script>
import taskService from '../../services/task.service'
import moment from 'moment'
import { eventBus } from '../../eventBus';
import newTask from '../components/creates/createTask'
export default {
    components: {
        newTask
    },
    props: {
        idAccount: {
            type: String,
            default: null,
        },
    },
    watch: {
        search(){
            this.displayTasks = [];
            for(let i = 0; i< this.tasks.length;i++){
                if(this.tasks[i].title.toLowerCase().includes(this.search.toLowerCase())){
                    this.displayTasks.push(this.tasks[i]);
                }
            }
        },
        'viewTask.searchEmail'(){
            this.viewTask.searchedEmail = [];
            for (let i = 0; i < this.viewTask.allEmail.length;i++){
                if(this.viewTask.allEmail[i].name.toLowerCase().includes(this.viewTask.searchEmail.toLowerCase())){
                    this.viewTask.searchedEmail.push(this.viewTask.allEmail[i]);
                }
            }
            this.viewTask.searchedEmail = [...this.viewTask.searchedEmail];
        },
    },
    data(){
        return {
            failDialog: false,
            pagination: {
                page: 1,
            },
            createTask: false,
            search: '',
            divider: true,
            statusToChoose: [
                {
                    text: 'Not completed',
                    value: 'NOTCOMPLETED'
                },
                {
                    text: 'Completed',
                    value: 'COMPLETED'
                }
            ],
            status: 'NOTCOMPLETED',
            headers: [
                {
                    text: 'TRẠNG THÁI',
                    align: 'left',
                    sortable: false,
                    value: 'status'
                },
                {
                    text: 'TÊN CÔNG VIỆC',
                    align: 'left',
                    sortable: false,
                    value: 'title'
                },
                {
                    text: 'KIỂU',
                    align: 'left',
                    sortable: false,
                    value: 'type'
                },
                {
                    text: 'HẠN CUỐI',
                    align: 'left',
                    sortable: false,
                    value: 'dueDate'
                },
                {
                    text: 'XEM CHI TIẾT',
                    align: 'left',
                    sortable: false,
                    value: 'detail'
                },
            ],
            tasks: [],
            displayTasks: [],
            type: 'today',
            length: 0,
            fontWeight: ['font-weight: bold', '', '', ''],
            viewTask: {
                dialog: false,
                task: {
                    "taskId": "5da3fc76b051160001e9c7a2",
                    "contactId": "5da3f33eb051160001e9c78b",
                    "title": "Task 1",
                    "dueDate": "2019-10-14T08:00:00.000+0000",
                    "note": "Task 1",
                    "type": "To-do",
                    "assignedTo": "anhpq.adsplus@gmail.com",
                    "emailReminder": "2019-10-14T08:00:00.000+0000",
                    "queue": "None",
                    "status": "COMPLETED",
                    "createdBy": "anhpq.adsplus@gmail.com",
                    "updateBy": "anhpq.adsplus@gmail.com",
                    "createdAt": "2019-10-14T04:41:26.776+0000",
                    "updatedAt": "2019-10-15T07:26:38.120+0000"
                },
                allEmail: [],
                searchedEmail: [],
                progress: true,
                timeToChoose: [
                    '00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', 
                    '02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45',
                    '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45',
                    '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45',
                    '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45',
                    '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45',
                    '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45',
                    '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45',
                    '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45',
                    '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45',
                    '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45',
                    '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45',],
                searchEmail: '',
                types: ['Email', 'To-do', 'Call'],
            }
        }
    },
    methods: {
        changeType(taskId, item){
            this.viewTask.task.type = item;
            this.updateTask(taskId, 'a', 'type', item);
        },
        changePage(){
            if(this.status == 'COMPLETED'){
                this.getMyTask(this.pagination.page, 'COMPLETED', this.type);
            }
            else{
                this.getMyTask(this.pagination.page, this.status, this.type);
            }
        },
        changeStyleBeforeGetTask(value){
            this.fontWeight = ['', '', '', ''];
            this.fontWeight[value] = 'font-weight: bold';
            switch(value){
                case 0:
                    this.status = 'NOTCOMPLETED';
                    this.type = 'today';
                    break;
                case 1:
                    this.status = 'NOTCOMPLETED';
                    this.type = 'thisweek';
                    break;
                case 2:
                    this.status = 'NOTCOMPLETED';
                    this.type = 'overdue';
                    break;
                case 3:
                    this.status = 'COMPLETED';
                    this.type = 'today';
                    break;
            }
            this.pagination.page = 1;
            this.getMyTask(this.pagination.page, this.status, this.type);
        },
        getAllEmail(){
            this.viewTask.allEmail = [];
            taskService.getAllEmail(this.idAccount).then(result => {
                result.response.filter(e => {
                    e.displayText = e.name + ' (' + e.email + ')'
                    this.viewTask.allEmail.push(e);
                    this.viewTask.searchedEmail.push(e);
                    console.log(this.viewTask.searchedEmail);
                });
            }).catch(error => {
                console.log(error);
                this.progress = false;
            });
            
        },
        getNameFromEmail(email){
            let result = '';
            for(let i = 0; i< this.viewTask.allEmail.length;i++){
                if(this.viewTask.allEmail[i].email === email){
                    result = this.viewTask.allEmail[i].name;
                }
            }
            return result;
        },
        getMyTask(page, status, type){
            if(status == 'COMPLETED'){
                var params = {
                    page: page,
                    status: status
                }
            } 
            else {
                params = {
                    page: page,
                    type: type
                }
            }
            taskService.getMyTask(this.idAccount, params).then(result => {
               
                this.type = type;
                this.status = status;
                this.page = page;
                this.tasks = []
                this.tasks = result.response.results
                this.tasks = [...this.tasks]
                this.displayTasks = this.tasks;
                this.length = result.response.totalPage;
                // this.viewTask.task = this.tasks[0];
            }).catch(error => {
                this.failDialog = true;
                console.log(error);
            })
        },
        coverTimeTooltip(time){
            if (_.isNull(time)) return '';
            return moment(time).subtract(7, 'hours').format('DD/MM/YYYY HH:mm')
        },
        updateTask(taskId, contactId, property, value){
            let body = {
                "property": property,
                "value": value,
            }
            taskService.updateTask(this.idAccount, contactId, taskId, body).then(result => {
                console.log(result);
                eventBus.updateTaskList();
                this.getMyTask(this.pagination.page, this.status, this.type);
            }).catch(error => {
                console.log(error);
            })
        },
        closeCreateTaskDialog(){
            this.createTask = false;
            this.getMyTask(this.pagination.page, this.status, this.type);
        },
        setNoReminder(id){
            this.viewTask.task.emailReminderChoice = 'No reminder'
            this.updateTask(id, 'a', 'emailReminder', '');
        },
        getTaskById(id){
            taskService.getTaskById(this.idAccount, id).then(result => {
                result.response.assignedToUser = this.getNameFromEmail(result.response.assignedTo);
                result.response.createdByUser = this.getNameFromEmail(result.response.createdBy);
                result.response.menu1 = false;
                result.response.time1 = false;
                result.response.dueDateDate = result.response.dueDate.substring(0, 10);
                result.response.dueDateTime = result.response.dueDate.substring(11, 16);
                result.response.menu2 = false;
                result.response.time2 = false;
                if(result.response.emailReminder != null){
                    result.response.emailReminderDate = result.response.emailReminder.substring(0, 10);
                    result.response.emailReminderTime = result.response.emailReminder.substring(11, 16);
                    result.response.emailReminderChoice = 'Custom Date'
                }
                else {
                    result.response.emailReminderDate = '';
                    result.response.emailReminderTime = '08:00';
                    result.response.emailReminderChoice = 'No reminder'
                }
                this.viewTask.task = result.response;
                this.viewTask.dialog = true;
                console.log(this.viewTask.task)
            }).catch(error => {
                console.log(error);
            })
        },
    },
    created(){
        this.getAllEmail();
        this.getMyTask(this.pagination.page, this.status, this.type);
        eventBus.$on('updateTaskList', () => {
            this.getMyTask(this.pagination.page, this.status, this.type);
        })
    }
}
</script>
<style>

</style>