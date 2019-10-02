<template>
    <v-layout row wrap>
        <v-flex offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5 v-if="progress">
            <v-progress-circular
                :size="70"
                :width="7"
                color="grey"
                indeterminate
            ></v-progress-circular>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-3 pr-3" v-else>
            <h3>June 2019</h3>
            
            <template v-for="task in tasks">
                <!-- notcomplete task -->
                <v-card class="pb-3 mt-3" v-if="task.status == 'NOTCOMPLETED'">
                    <v-card-title>
                        <v-layout row>
                            <v-flex xs4 sm4 md4 lg3 xl3>
                                <v-icon small left>
                                    calendar_today
                                </v-icon>
                                <span class="">Task</span>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-layout row wrap>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-4" v-if="checkOverdue(task.dueDate)">
                            <v-btn color="error" outline small class="ml-4">Overdue</v-btn>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-5 mt-3">
                            <v-layout row>
                                <v-btn small fab dark color="grey lighten-1"><v-icon>done</v-icon></v-btn><strong class="mt-3">{{task.title}}</strong>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="mt-3">
                            <v-layout row>
                                <v-flex xs6 sm5 md4 lg3 xl2 class="pl-4">
                                    <v-layout row>
                                        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-4">
                                            <span>Assigned to</span>
                                        </v-flex>
                                    </v-layout>
                                    
                                    <v-layout row>
                                        <v-flex xs6 sm5 md4 lg3 xl2 class="ml-3">
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn color="grey lighten-2" small fab v-on="on">
                                                        <v-icon>person</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>{{task.assignedTo}}</span>
                                            </v-tooltip>
                                        </v-flex>
                                        <v-flex xs6 sm7 md8 lg8 xl9 class="ml-3">
                                            <p class="mt-2 pt-1">{{task.assignedToUser}}</p>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs6 sm7 md8 lg9 xl10>
                                    <v-layout row>
                                        <span>Due date</span>
                                    </v-layout>
                                    <v-layout row>
                                        <p class="mt-2 pt-1">{{coverTimeTooltip(task.dueDate)}}</p>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex xs12 sm12 md12 lg12 xl12 offset-xs1 offset-sm1 offset-md1 offset-lg1 offset-xl1>
                                    <br>
                                    <p>{{task.note}}</p>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                            <v-list-group sub-group no-action>
                                <template v-slot:activator>
                                    <v-list-tile>
                                        <v-list-tile-title><span>Details</span></v-list-tile-title>
                                    </v-list-tile>
                                </template>
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>
                                            <v-layout row>
                                                <v-flex xs12 sm12 md12 lg10 xl8>
                                                    <v-layout row>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>Type</span>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>Reminder</span>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>Queue</span>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>Created by</span>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-flex>
                                            </v-layout>
                                        </v-list-tile-title>
                                        <v-list-tile-sub-title>
                                            <v-layout row>
                                                <v-flex xs12 sm12 md12 lg10 xl8>
                                                    <v-layout row>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>{{task.type}}</span>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>{{coverTimeTooltip(task.emailReminder)}}</span>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>None</span>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>{{task.createdByUser}}</span>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-flex>
                                            </v-layout>
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list-group>
                        </v-flex>
                    </v-layout>
                </v-card>
                <!-- complete task -->
                <v-card class="pb-3 mt-3" v-else>
                    <v-card-title>
                        <v-layout row>
                            <v-flex xs4 sm4 md4 lg3 xl3>
                                <v-icon small left>
                                    calendar_today
                                </v-icon>
                                <span class="">Task</span>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-layout row wrap>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-5 mt-1">
                            <v-layout row>
                                <v-btn small fab dark color="success"><v-icon>done</v-icon></v-btn> <strong class="mt-3">{{task.title}}</strong>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                            <v-list-group sub-group no-action>
                                <template v-slot:activator>
                                    <v-list-tile>
                                        <v-list-tile-title><span>Details</span></v-list-tile-title>
                                    </v-list-tile>
                                </template>
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>
                                            <v-layout row>
                                                <v-flex xs6 sm6 md6 lg3 xl4>
                                                    <v-layout row>
                                                        <span>Assigned to</span>
                                                    </v-layout>
                                                </v-flex>
                                                <v-flex xs6 sm6 md6 lg9 xl8>
                                                    <v-layout row>
                                                        <span>Due date</span>
                                                    </v-layout>
                                                </v-flex>
                                            </v-layout>
                                        </v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                
                                <v-list-tile>
                                    <v-list-tile-avatar>
                                        <v-layout row>
                                            <v-flex xs6 sm6 md6 lg5 xl4>
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn color="grey lighten-2" small fab v-on="on">
                                                            <v-icon>person</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>{{task.assignedToUser}}</span>
                                                </v-tooltip>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title>
                                            <v-layout row>
                                                <v-flex xs6 sm6 lg2 xl2>
                                                    <p>{{task.assignedToUser}}</p>
                                                </v-flex>
                                                <v-flex xs6 sm6 lg10 xl10 class="pl-3">
                                                    <p>{{coverTimeTooltip(task.dueDate)}}</p>
                                                </v-flex>
                                            </v-layout>
                                        </v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>
                                            <v-layout row>
                                                <v-flex xs12 sm12 md12 lg12 xl12 offset-xs1 offset-sm1 offset-md1 offset-lg1 offset-xl1>
                                                    <br>
                                                    <p>{{task.note}}</p>
                                                </v-flex>
                                            </v-layout>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile class="mt-3">
                                    <v-list-tile-content>
                                        <v-list-tile-title>
                                            <v-layout row>
                                                <v-flex xs12 sm12 md12 lg10 xl8>
                                                    <v-layout row>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>Type</span>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>Remider</span>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>Queue</span>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>Created by</span>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-flex>
                                            </v-layout>
                                        </v-list-tile-title>
                                        <v-list-tile-sub-title>
                                            <v-layout row>
                                                <v-flex xs12 sm12 md12 lg10 xl8>
                                                    <v-layout row>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>{{task.type}}</span>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>{{coverTimeTooltip(task.emailReminder)}}</span>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>None</span>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg3 xl3>
                                                            <span>{{task.createdByUser}}</span>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-flex>
                                            </v-layout>
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list-group>
                        </v-flex>
                    </v-layout>
                </v-card>
            </template>
            
        </v-flex>
    </v-layout>
</template>
<script>
    import moment from 'moment'
    import taskService from '../../../services/task.service'
    import { eventBus } from '../../../eventBus';
    export default {
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
                tasks: [],
                allEmail: [],
                progress: true
            }
        },
        methods: {
            checkOverdue(date){
                // let result = false;
                // let dateToCompare = moment(date);
                // let currentDate = moment();
                // if(dateToCompare.isAfter(currentDate)){
                //     return true;
                // }
                // return result;
                return (!moment(date).isAfter(moment()))
            },
            coverTime(time){
                if (_.isNull(time)) return '';
                return moment(time).format('DD/MM/YYYY')
            },
            coverTimeTooltip(time){
                if (_.isNull(time)) return '';
                return moment(time).format('DD/MM/YYYY HH:mm:ss')
            },
            getTask(){
                taskService.getTask(this.idAccount, this.idContact).then(result => {
                    // result.response.filter(e => {
                    //     e.assignedToUser = this.getNameFromEmail(e.assignedTo);
                    //     e.createdByUser = this.getNameFromEmail(e.createdBy);
                    // })
                    for(let i = 0; i < result.response.length; i++){
                        result.response[i].assignedToUser = this.getNameFromEmail(result.response[i].assignedTo);
                        result.response[i].createdByUser = this.getNameFromEmail(result.response[i].createdBy);
                    }
                    this.tasks = result.response.reverse();
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                    this.progress = false;
                })
            },
            getAllEmail(){
                this.progress = true;
                this.allEmail = [];
                taskService.getAllEmail(this.idAccount).then(result => {
                    result.response.filter(e => {
                        this.allEmail.push(e);
                    });
                    this.getTask();
                }).catch(error => {
                    console.log(error);
                    this.progress = false;
                });
                
            },
            getNameFromEmail(email){
                let result = '';
                for(let i = 0; i< this.allEmail.length;i++){
                    if(this.allEmail[i].email === email){
                        result = this.allEmail[i].name;
                    }
                }
                // this.allEmail.filter(e => {
                //     if(e.email == email){
                //         result = e.name;
                //     }
                // });
                return result;
            }
        },
        created(){
            eventBus.$on('updateTaskList', () => {
                this.getAllEmail();
            })
            this.getAllEmail();
        }
    }
</script>