<template>
    <v-container grid-list-md>
        <v-layout wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-textarea name="input" label="Start typing to leave a note" v-model="note"></v-textarea>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12>
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
            </v-flex>
        </v-layout>
        <br>
        <v-layout wrap>
            <v-btn color="blue darken-1" small flat
                @click="createNote()">Save</v-btn>
            <v-btn color="red" small flat
                @click="closeCreateNoteDialog">Close</v-btn>
        </v-layout>
    </v-container>
</template>
<script>
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
                note:''
            }
        },
        methods:{
            createNote(){
                let note = 
                    {
                        "contactId": this.idContact,
                        "note": this.note
                    }
                noteService.createNote(this.idAccount, this.idContact, note).then(result => {
                    console.log(result);
                    this.note = '';
                    eventBus.updateNoteList();
                });
                this.$emit('closeCreateNoteDialog');
            },
            closeCreateNoteDialog(){
                this.$emit('closeCreateNoteDialog');
            }
        }
    }
</script>