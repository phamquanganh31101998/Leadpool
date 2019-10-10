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
                
                    <v-flex xs2 md2 lg2 xl2>
                        <v-btn dark color="warning" @click="createTask = true">Create Task</v-btn>
                    </v-flex>
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
                        <v-data-table :headers="headers" :items="tasks">
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
            </v-flex>
        </v-layout>
        <v-dialog v-model="createTask" persistent max-width="700px">
            <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                    <span class="headline">Task</span>
                </v-card-title>
                <v-card-text>
                    <newTask :idAccount="this.idAccount" :idContact="this.idContact" @closeCreateTaskDialog="closeCreateTaskDialog()"/>
                </v-card-text>
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
            this.getMyTask(this.page, this.status, this.type);
            
        },
        status(){
            this.page = 1;
            this.getMyTask(this.page, this.status, this.type);
        }
    },
    data(){
        return {
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
            type: 'today',
            page: 1,
            fontWeight: ['font-weight: bold', '', '']
        }
    },
    methods: {
        getMyTask(page, status, type){
            taskService.getMyTask(this.idAccount, page, status, type).then(result => {
                this.tasks = []
                this.tasks = result.response.results
                this.tasks = [...this.tasks]
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
                this.getMyTask(this.page, this.status, this.type);
            })
        },
        closeCreateTaskDialog(){
            this.createTask = false;
            this.getMyTask(this.page, this.status, this.type);
        }
    },
    created(){
        this.getMyTask(this.page, this.status, this.type);
    }
}
</script>
<style>

</style>