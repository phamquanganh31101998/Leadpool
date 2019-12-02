<template>
    <v-container grid-list-md>
        <v-layout wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-textarea name="input" label="Ghi chú tại đây..." v-model="note"></v-textarea>
            </v-flex>
        </v-layout>
        <br>
        <v-layout wrap>
            <v-btn color="blue darken-1" small flat
                @click="closeCreateDealDialog()" >Tạo</v-btn>
            <v-btn color="red" small flat
                @click="closeCreateDealDialog()">Đóng</v-btn>
        </v-layout>
    </v-container>
</template>
<script>
    import moment from 'moment'
    import {eventBus} from '../../../eventBus'
    import noteService from '../../../services/note.service'
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
            return{
            }
        },
        computed: {
        },
        methods:{
            coverTimeDetail(time){
                if (_.isNull(time)) return '';
                return moment(time).format('HH:mm:ss, DD/MM/YYYY')
            },
            closeCreateDealDialog(){
                this.$emit('closeCreateDealDialog');
            }
        }
    }
</script>