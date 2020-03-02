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
import {mapGetters} from 'vuex'
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
            console.log(this.activityArray)
            this.activitySortedArray = _.sortBy(this.activityArray, o => o.createdAt).reverse();
            // let tempArr = [];
            // for (let i = 0; i < this.activitySortedArray.length; i++){
                
            // }
        },
        note() {
            this.ownNote = this.note;
            this.activityArray = this.insertToArray(this.activityArray, this.note)
            // this.removeFromArray(this.activityArray, this.ownNote);
            // this.ownNote = this.note;
            // this.insertToArray(this.activityArray, this.ownNote)
        },
        task() {
            this.ownTask = this.task
            this.activityArray = this.insertToArray(this.activityArray, this.task)
            // this.removeFromArray(this.activityArray, this.ownTask);
            // this.ownNote = this.task;
            // this.insertToArray(this.activityArray, this.ownTask)
        },
    },
    computed: {
        ...mapGetters({
            note: 'data/note',
            task: 'data/task'
            // ...
        })
    },
    data(){
        return {
            activitySortedArray: [],
            activityArray: [],
            ownNote: [],
            ownTask: [],
            
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
            console.log(this.ownNote);
            console.log(this.ownTask);
            console.log(this.activityArray)
        },
        insertToArray(arrayToInsert, arrayParam){
            let result = [];
            result = [...arrayToInsert,...arrayParam] 
            return result
        },
        removeFromArray(arrayToPull, arrayParam){
            let result = [];
            result = _.difference(arrayToPull, arrayParam);
            return result;
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
        
        checkString(str){
            if (str == null || str == undefined){
                return ''
            }
            else {
                return str;
            }
        },
        
    },
    created(){
        // this.getNotes();
        // this.getTask();
    }
}
</script>
<style scoped>

</style>