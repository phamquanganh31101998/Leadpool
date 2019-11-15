<template>
    <v-layout row wrap>
        <v-flex offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5 v-if="progress">
            <v-progress-circular
                :size="70"
                :width="7"
                color="#3E82F7"
                indeterminate
            ></v-progress-circular>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-3 pr-3">
            <!-- <h3>June 2019</h3> -->
            <template v-for="(note, index) in notes">
                <v-hover>
                    <v-card slot-scope="{ hover }" class="pb-3 mt-3">
                        <v-card-title>
                            <v-layout row>
                                <v-flex xs4 sm4 md4 lg3 xl3>
                                    <v-icon small left>
                                        library_books
                                    </v-icon>
                                    <span class="">Ghi chú</span>
                                </v-flex>
                                <v-flex xs8 sm8 lg9 xl9>
                                    <v-layout row>
                                        <v-flex xs7 sm7 lg8 xl8>
                                            <v-expand-transition>
                                                <div v-if="hover">
                                                    <v-layout row v-if="access">
                                                        <!-- <v-flex xs6 sm6 md6 lg6 xl6>
                                                            <v-menu :close-on-content-click="false" :nudge-width="200"
                                                                offset-y>
                                                                <template v-slot:activator="{ on }">
                                                                    <a color="indigo" v-on="on">
                                                                        Associated with 1 record
                                                                    </a>
                                                                </template>
                                                                <v-card>
                                                                    <v-card-title>
                                                                        <v-layout row>
                                                                            <v-text-field append-icon="search" 
                                                                                label="Search" single-line hide-details>
                                                                            </v-text-field>
                                                                        </v-layout>
                                                                    </v-card-title>
                                                                </v-card>
                                                            </v-menu>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg2 xl3>
                                                            <a color="indigo">Ghim
                                                            </a>
                                                        </v-flex> -->
                                                        <v-flex xs3 sm3 md3 lg3 xl3 offset-xs9 offset-sm9 offset-md9 offset-lg9 offset-xl9 >
                                                            <a color="indigo" @click="confirmDeleteNote(note.noteId)">Xóa
                                                            </a>
                                                        </v-flex>
                                                    </v-layout>
                                                </div>
                                            </v-expand-transition>
                                        </v-flex>
                                        <v-flex xs5 sm5 lg4 xl4>
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <span v-on="on">{{coverTime(note.createdAt)}}</span>
                                                </template>
                                                <span small>{{coverTimeTooltip(note.createdAt)}}</span>
                                            </v-tooltip>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-layout row wrap>
                            <v-flex xs11 sm11 md11 lg11 xl11 class="pl-5">
                                <v-text-field outlined label="Note" v-model="note.note"  @focus="note.disableSaveButton = false" :readonly="!access"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12 lg12 xl12>
                                <v-layout row>
                                    <v-flex xs3 sm2 md2 lg1 xl1 class="ml-4 pl-3">
                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="grey lighten-2" small fab v-on="on">
                                                    <v-icon>person</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>{{note.createdBy}}</span>
                                        </v-tooltip>
                                    </v-flex>
                                    <v-flex xs7 sm8 md8 lg9 xl9>
                                        <p class="mt-2 pt-1"><strong>{{note.createdBy}} </strong> đã tạo 1 ghi chú</p>
                                    </v-flex>
                                    <v-flex xs2 sm2 md2 lg2 xl2>
                                        <v-btn v-if="hover && access" @click="updateNote(note.note, note.noteId)" outlined :disabled="note.disableSaveButton" >Lưu lại</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-layout row>

                        </v-layout>
                    </v-card>
                </v-hover>
            </template>
        </v-flex>
        <v-dialog v-model="deleteNoteDialog.dialog" @click:outside="deleteNoteDialog.dialog = false" transition="dialog-bottom-transition" scrollable width="30%">
            <v-card tile>
                <v-toolbar card dark color="red">
                    <v-toolbar-title>Xóa?</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    Bạn có chắc chắn muốn xóa ghi chú này?
                </v-card-text>
                <v-card-actions>
                <v-btn flat color="red" @click="deleteNote(deleteNoteDialog.id)">Xóa</v-btn>
                <v-btn flat color="primary" @click="deleteNoteDialog.dialog = false">Quay lại</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
import moment from 'moment'
import contact from '../../../services/contacts.service'
import noteService from '../../../services/note.service'
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
        return{
            notes: [],
            progress: true,
            deleteNoteDialog: {
                dialog: false,
                id: ''
            },
            currentContact: null,
            currentUser: null,
            access: false,
        }
    },
    methods: {
        deleteNote(noteId){
            noteService.deleteNote(this.idAccount, this.idContact, noteId).then(result => {
                this.$emit('updateLastActivityDate');
                eventBus.updateNoteList();
                this.deleteNoteDialog.id = '';
                this.deleteNoteDialog.dialog = false;
                
            }).catch(error => {
                console.log(error)
            });
        },
        confirmDeleteNote(id){
            this.deleteNoteDialog.dialog = true;
            this.deleteNoteDialog.id = id;
        },
        coverTime(time){
            if (_.isNull(time)) return '';
            return moment(time).format('DD/MM/YYYY')
        },
        coverTimeTooltip(time){
            if (_.isNull(time)) return '';
            return moment(time).format('dddd, DD MMMM YYYY HH:mm:ss')
        },
        getNotesList(){
            noteService.getNotes(this.idAccount, this.idContact).then(result => {
                for (let i = 0;i < result.response.length; i++){
                        result.response[i].disableSaveButton = true;
                    }
                this.notes = result.response.reverse();
                this.notes = [...this.notes];
                this.progress = false;
            }).catch (error => {
                console.log(error);
                this.progress = false;
            })
        },
        updateNote(note, noteId){
            if(note==''){
                alert('Note không nên để rỗng...');
                this.getNotesList();
            }
            else{
                let body = {
                    "note": note
                }
                noteService.updateNote(this.idAccount, this.idContact, body, noteId).then(result => {
                    this.$emit('updateLastActivityDate');
                    eventBus.updateNoteList();
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        getDetail(){
            contact.getdetailContact(this.idAccount,this.idContact).then(result =>{
                this.currentContact = result.response
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.getCurrentUser()
            })
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
            let role = this.currentUser.authorities;
            for (let i = 0; i < role.length;i++){
                if (role[i] == 'ROLE_CONTACT_EDIT_EVERYTHING'){
                    this.access = true;
                }
                if(role[i] == 'ROLE_CONTACT_EDIT_OWNEDONLY'){
                    if (this.currentContact.contactOwner == this.currentUser.username){
                        this.access = true;
                    }
                }
            }
        }
    },
    created(){
        this.getDetail();
        eventBus.$on('updateNoteList', () => {
            this.getNotesList();
        })
        this.getNotesList();
    },
    destroyed(){
        eventBus.$off('updateNoteList', () => {
            this.getNotesList();
        })
    }
}
</script>