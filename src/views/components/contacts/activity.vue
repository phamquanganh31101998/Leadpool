<template>
    <v-layout row wrap>
        <v-btn @click="logging()">Log</v-btn>
    </v-layout>
</template>
<script>
var _ = require('lodash');
import moment from 'moment';
import noteAPI from '../../../services/note.service'
import logAPI from '../../../services/log.service'
import taskAPI from '../../../services/task.service'
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
    watch: {
        activityArray(){
            
            this.activitySortedArray = _.sortBy(this.activityArray, o => o.createdAt).reverse();
            // let tempArr = [];
            // for (let i = 0; i < this.activitySortedArray.length; i++){
                
            // }
        }
    },
    data(){
        return {
            nullCreatedByArray: [],
            activitySortedArray: [],
            activityArray: [],
            notes: [],

            tasks: [],
            allEmail: [],





            logCall: [],
            logEmail: [],
            logMeet: [],
        }
    },

    methods: {
        getCreatedByNullObjFromArray(array){
            
        },
        logging(){
            console.log(this.activitySortedArray);
            console.log(this.activityArray);
            console.log("Chưa sort")
            for(let i = 0; i < this.activityArray.length; i++){

                let obj = this.activityArray[i]
                console.log(obj.createdAt)
            }
            console.log("Đã sort")
            for(let i = 0; i < this.activitySortedArray.length; i++){
                let obj = this.activitySortedArray[i]
                console.log(obj.createdAt)
            }
        },
        insertToActivityArray(arrayParam){
            this.activityArray = [...this.activityArray,...arrayParam];
        },
        getAllEmail(){
            // this.progress = true;
            this.allEmail = [];
            taskService.getAllEmail(this.idAccount).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    result.response.filter(e => {
                        e.displayText = e.name + ' (' + e.email + ')'
                        this.allEmail.push(e);
                    });
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
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
            return result;
        },
        coverTimeHourOnly(time){
            if (_.isNull(time)) return '';
            return moment(time).format('HH:mm')
        },
        coverTimeDateOnly(time){
            if (_.isNull(time)) return '';
            return moment(time).format('YYYY-MM-DD')
        },
        getTask(){
            taskAPI.getTask(this.idAccount, this.idContact).then(result => {
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    for(let i = 0; i < result.response.length; i++){
                        result.response[i].milisecond = moment(result.response[i].createdAt).valueOf();
                        // result.response[i].assignedToUser = this.getNameFromEmail(result.response[i].assignedTo);
                        // result.response[i].createdByUser = this.getNameFromEmail(result.response[i].createdBy);
                        // result.response[i].menu1 = false;
                        // result.response[i].time1 = false;
                        // result.response[i].dueDateDate = this.coverTimeDateOnly(result.response[i].dueDate);
                        // result.response[i].dueDateTime = this.coverTimeHourOnly(result.response[i].dueDate)
                        // result.response[i].menu2 = false;
                        // result.response[i].time2 = false;
                        // if(result.response[i].emailReminder != null){
                        //     result.response[i].emailReminderDate = this.coverTimeDateOnly(result.response[i].emailReminder);
                        //     result.response[i].emailReminderTime = this.coverTimeHourOnly(result.response[i].emailReminder)
                        // }
                        // else {
                        //     result.response[i].emailReminderDate = '';
                        //     result.response[i].emailReminderTime = '08:00';
                        //     result.response[i].emailReminderChoice = 'No reminder'
                        // }
                        // result.response[i].typeMenu = false;
                        // result.response[i].assignMenu = false;
                        // result.response[i].reminderMenu = false;
                        // result.response[i].timeMenu = false;
                    }
                    this.tasks = result.response.reverse();
                    this.insertToActivityArray(this.tasks);
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
            }).catch(error => {
                console.log(error);
            }).finally(() => {
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
        getNotes(){
            this.notes = [];
            noteAPI.getNotes(this.idAccount, this.idContact).then(result => {
                // console.log(result)
                const {
                    dispatch
                } = this.$store;
                let time = moment();
                if(result.code == 'SUCCESS'){
                    this.notes = result.response.reverse();
                    for (let i = 0; i < this.notes.length; i++){
                        this.notes[i].createdAt = null;
                        this.notes[i].milisecond = moment(this.checkString(this.notes[i].createdAt)).valueOf();
                    }
                    this.notes = [...this.notes];
                    this.insertToActivityArray(this.notes)
                }
                else {
                    dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                }
                
            }).catch (error => {
                console.log(error);
                
            })
        },
    },
    created(){
        this.getNotes();
        this.getTask();
    }
}
</script>
<style scoped>

</style>