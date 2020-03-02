<template>
    <v-container grid-list-md>
        <v-layout wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-textarea name="input" label="Ghi chú tại đây..." v-model="note"></v-textarea>
            </v-flex>
            <!-- <v-flex xs12 sm12 md12 lg12 xl12>
                <v-layout row>
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
                    <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
                        <template v-slot:activator="{ on }">
                            <a color="indigo" v-on="on" class="mt-2 ml-5">
                                Associated with 1 record
                            </a>
                        </template>
                        <v-card>
                            <v-card-title>
                                <v-layout row>
                                    <v-text-field append-icon="search" label="Search" single-line hide-details required>
                                    </v-text-field>
                                </v-layout>
                            </v-card-title>
                        </v-card>
                    </v-menu>
                </v-layout>
            </v-flex> -->
        </v-layout>
        <br>
        <v-layout wrap>
            <v-btn color="blue darken-1" small flat
                @click="createNote()" :disabled="disableSaveButton">Tạo</v-btn>
            <v-btn color="red" small flat
                @click="closeCreateNoteDialog">Đóng</v-btn>
        </v-layout>
        <v-dialog v-model="successfulDialog" @click:outside="successfulDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="#00C853">
                    <v-toolbar-title>Thành công</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Tạo ghi chú thành công
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="#00C853" @click="successfulDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="failDialog" @click:outside="failDialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Thất bại</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Đã có lỗi xảy ra khi tạo ghi chú. Xin hãy thử lại.
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="failDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
                note:'',
                successfulDialog: false,
                failDialog: false
            }
        },
        computed: {
            disableSaveButton(){
                if (this.note == ''){
                    return true;
                }
                else {
                    return false;
                }
            },
        },
        methods:{
            coverTimeDetail(time){
                if (_.isNull(time)) return '';
                return moment(time).format('HH:mm:ss, DD/MM/YYYY')
            },
            createNote(){
                let note = 
                    {
                        "contactId": this.idContact,
                        "note": this.note
                    }
                noteService.createNote(this.idAccount, this.idContact, note).then(result => {
                    const {
                        dispatch
                    } = this.$store;
                    let time = moment();
                    if(result.code == 'SUCCESS'){
                        dispatch('alert/success', `${result.message} (${this.coverTimeDetail(time)})`)
                        this.note = '';
                        eventBus.updateNoteList();
                        this.$emit('updateLastActivityDate');
                    }
                    else {
                        dispatch('alert/error', `${result.message} (${this.coverTimeDetail(time)})`)
                    }
                }).catch(error => {
                    console.log(error);
                });
                this.$emit('closeCreateNoteDialog');
            },
            closeCreateNoteDialog(){
                this.$emit('closeCreateNoteDialog');
            }
        }
    }
</script>