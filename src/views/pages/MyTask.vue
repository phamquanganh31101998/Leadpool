<template>
    <v-content class="mt-5 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <h1 class="ml-3">Tasks</h1>
            </v-flex>
            <v-flex xs12 sm12 md7 lg6 xl6>
                <v-layout row>
                    <v-flex xs5 sm5 md5 lg5 xl5 offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <v-text-field append-icon="search" v-model="search" label="Search" single-line hide-details></v-text-field>
                    </v-flex>
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
                    <v-list-tile @click="type = 'today'">
                        <v-list-tile-content :style="fontWeight[0]">
                            Due Today
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="type = 'thisweek'">
                        <v-list-tile-content :style="fontWeight[1]">
                            Due this week
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="type = 'overdue'">
                        <v-list-tile-content :style="fontWeight[2]">
                            Overdue
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <br>
                <v-divider :divider="divider"></v-divider>
                <v-select v-model="status" :items="statusToChoose" label="Status" style="width: 60%;" class="ml-2"></v-select>
            </v-flex>
            <v-flex xs10 sm10 md10 lg10 xl10>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-data-table :headers="headers" :items="displayTasks" hide-actions>
                            <template v-slot:items="props">
                                <td v-if="props.item.status == 'NOTCOMPLETED'">
                                    <v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                            <v-btn small fab dark color="grey lighten-1" @click="updateTask(props.item.taskId, props.item.contactId, 'status', 'COMPLETED')" v-on="on"><v-icon>done</v-icon></v-btn>
                                        </template>
                                        <span>Mark as completed</span>
                                    </v-tooltip>
                                </td>
                                <td v-if="props.item.status == 'COMPLETED'">
                                     <v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                            <v-btn v-on="on" small fab dark color="success" @click="updateTask(props.item.taskId, props.item.contactId, 'status', 'NOTCOMPLETED')" ><v-icon>done</v-icon></v-btn>
                                        </template>
                                        <span>Mark as incomplete</span>
                                    </v-tooltip>
                                    
                                </td>
                                <td>{{ props.item.title }}</td>
                                <td>{{ props.item.type }}</td>
                                <td>{{ coverTimeTooltip(props.item.dueDate) }}</td>
                            </template>
                        </v-data-table>
                        
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <v-pagination v-model="pagination.page" :length="length"></v-pagination>
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
        <!-- <v-dialog v-model="viewTask.dialog" persistent max-width="700">
            <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                    <span class="headline">Task</span>
                </v-card-title>
                <v-card-text>
                    <v-layout wrap>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                            <v-layout row>
                                <v-flex xs4 sm5 md6 lg6 xl6>
                                    <v-text-field placeholder="Enter your task" v-model="title"></v-text-field>
                                </v-flex>
                                <v-flex xs4 sm4 md4 lg4 xl4>
                                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy
                                        transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="dateFormatted" label="Due Date" persistent-hint prepend-icon="event"
                                                v-on="on">
                                            </v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs4 sm3 md2 lg2 xl2>
                                    <v-select v-model="time" :items="timeToChoose"></v-select>
                                </v-flex>
                                
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                            <v-textarea class="mt-2" name="input" label="Notes..." v-model="note"></v-textarea>
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
                                    <p>Type</p>
                                    <v-menu :close-on-content-click="false" :nudge-width="75" top offset-y>
                                        <template v-slot:activator="{ on }">
                                            <a color="indigo" v-on="on">
                                                {{type}}
                                            </a>
                                        </template>
                                        <v-list>
                                            <v-list-tile v-for="(item, index) in types" :key="index" @click="choisE(item)">
                                                <v-list-tile-title>{{ item }}</v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
                                </v-flex>
                                <v-flex>
                                    <p>Assigned to</p>
                                    <v-menu :close-on-content-click="false" :nudge-width="100" offset-y max-width="300">
                                        <template v-slot:activator="{ on }">
                                            <a color="indigo" v-on="on">
                                                {{chosenName}}
                                            </a>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                <v-layout row wrap>
                                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                                        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="searchEmail"></v-text-field>
                                                    </v-flex>
                                                    <br>
                                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                                        <v-select :items="searchedEmail" v-model="chosenEmail"></v-select>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card-title>
                                        </v-card>
                                    </v-menu>
                                </v-flex>
                                <v-flex>
                                    <p>Email reminder</p>
                                    <v-layout row>
                                        <v-flex>
                                            <v-menu :close-on-content-click="false" :nudge-width="100" top offset-y>
                                                <template v-slot:activator="{ on }">
                                                    <span>
                                                        <a color="indigo" v-on="on">
                                                            {{day}}
                                                        </a>
                                                    </span>
                                                </template>
                                                <v-list>
                                                    <v-list-tile @click="day = 'The day of'">
                                                        <v-list-tile-title>The day of</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-list-tile @click="day = 'The day before'">
                                                        <v-list-tile-title>The day before</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-list-tile @click="day = 'The week before'">
                                                        <v-list-tile-title>The week before</v-list-tile-title>
                                                    </v-list-tile>
                                                    <v-menu :close-on-content-click="false" :nudge-width="200" offset-y v-model="emailReminder.dateMenu">
                                                        <template v-slot:activator="{ on }">
                                                            <v-list-tile @click="day = 'Custom Date'" v-on="on">
                                                                <v-list-tile-title>Custom Date</v-list-tile-title>
                                                            </v-list-tile>
                                                        </template>
                                                        <v-date-picker v-model="emailReminder.date" no-title @input="emailReminder.dateMenu = false"></v-date-picker>
                                                    </v-menu>
                                                    
                                                    <v-list-tile @click="day = 'No reminder'">
                                                        <v-list-tile-title>No reminder</v-list-tile-title>
                                                    </v-list-tile>
                                                </v-list>
                                            </v-menu>
                                        </v-flex>
                                    </v-layout>
                                
                                </v-flex>
                                <v-flex v-if="day!='No reminder'">
                                    <p>Time</p>
                                    <v-menu :close-on-content-click="false" :nudge-right="40" lazy
                                        transition="scale-transition" offset-y full-width >
                                        <template v-slot:activator="{ on }">
                                            <span>
                                                <a color="indigo" v-on="on">
                                                    {{emailReminder.time}}
                                                </a>
                                            </span>
                                        </template>
                                        <v-select v-model="emailReminder.time" :items="timeToChoose" style="backgroundColor: white; padding: 0px 10px; width: 100px;"></v-select>
                                    </v-menu>
                                </v-flex>
                                <v-flex>
                                    <p>Queue</p>
                                    <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
                                        <template v-slot:activator="{ on }">
                                            <a color="indigo" v-on="on">
                                                None
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
                                <v-btn color="blue darken-1" small flat>Save Task</v-btn>
                                <v-btn color="red" small flat>Close</v-btn>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-dialog> -->
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
        type(){
            try {
                this.fontWeight[0] = '';
                this.fontWeight[1] = '';
                this.fontWeight[2] = '';
                if(this.type == 'today'){
                    this.fontWeight[0] = 'font-weight: bold'
                }
                else if (this.type == 'thisweek'){
                    this.fontWeight[1] = 'font-weight: bold'
                }
                else {
                    this.fontWeight[2] = 'font-weight: bold'
                }
            } catch (error) {
                console.log(error);
            }
            this.getMyTask(this.pagination.page, this.status, this.type);
            
        },
        status(){
            this.pagination.page = 1;
            this.getMyTask(this.pagination.page, this.status, this.type);
        },
        search(){
            this.displayTasks = [];
            for(let i = 0; i< this.tasks.length;i++){
                if(this.tasks[i].title.toLowerCase().includes(this.search.toLowerCase())){
                    this.displayTasks.push(this.tasks[i]);
                }
            }
        },
        'pagination.page'(){
            this.getMyTask(this.pagination.page, this.status, this.type);
        }
    },
    data(){
        return {
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
                    text: 'STATUS',
                    align: 'left',
                    sortable: true,
                    value: 'status'
                },
                {
                    text: 'TITLE',
                    align: 'left',
                    sortable: true,
                    value: 'title'
                },
                {
                    text: 'TYPE',
                    align: 'left',
                    sortable: true,
                    value: 'status'
                },
                {
                    text: 'DUE DATE',
                    align: 'left',
                    sortable: true,
                    value: 'status'
                },
            ],
            tasks: [],
            displayTasks: [],
            type: 'today',
            length: 0,
            
            fontWeight: ['font-weight: bold', '', ''],
            viewTask: {
                dialog: false,
                task: null
            }
        }
    },
    methods: {
        getMyTask(page, status, type){
            taskService.getMyTask(this.idAccount, page, status, type).then(result => {
                this.tasks = []
                this.tasks = result.response.results
                this.tasks = [...this.tasks]
                this.displayTasks = this.tasks;
                this.length = result.response.totalPage;
            }).catch(error => {
                console.log(error);
            })
        },
        coverTimeTooltip(time){
            if (_.isNull(time)) return '';
            return moment(time).format('DD/MM/YYYY HH:mm')
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
            })
        },
        closeCreateTaskDialog(){
            this.createTask = false;
            this.getMyTask(this.pagination.page, this.status, this.type);
        }
    },
    created(){
        this.getMyTask(this.pagination.page, this.status, this.type);
    }
}
</script>
<style>

</style>