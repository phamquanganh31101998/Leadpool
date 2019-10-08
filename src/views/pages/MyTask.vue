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
                        <v-btn dark color="warning">Create Task</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-divider class="mt-5" :divider="divider"></v-divider>
        <v-layout row wrap>
            <v-flex xs2 sm2 md2 lg2 xl2>
                <v-list>
                    <v-list-tile @click="type = 'today'">
                        <v-list-tile-content>
                            Due Today
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="type = 'thisweek'">
                        <v-list-tile-content>
                            Due this week
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="type = 'overdue'">
                        <v-list-tile-content>
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
                                <td>{{ props.item.status }}</td>
                                <td>{{ props.item.title }}</td>
                                <td>{{ props.item.type }}</td>
                                <td>{{ coverTimeTooltip(props.item.dueDate) }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-content>
</template>
<script>
import taskService from '../../services/task.service'
import moment from 'moment'
export default {
    props: {
        idAccount: {
            type: String,
            default: null,
        },
    },
    watch: {
        type(){
            this.getMyTask(this.page, this.status, this.type);
        },
        status(){
            this.getMyTask(this.page, this.status, this.type);
        }
    },
    data(){
        return {
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
            page: 1
        }
    },
    methods: {
        getMyTask(page, status, type){
            taskService.getMyTask(this.idAccount, page, status, type).then(result => {
                this.tasks = result.response.results
            }).catch(error => {
                console.log(error);
            })
        },
        coverTimeTooltip(time){
            if (_.isNull(time)) return '';
            return moment(time).format('DD/MM/YYYY HH:mm')
        }
    },
    created(){
        this.getMyTask(this.page, this.status, this.type);
    }
}
</script>
<style>

</style>