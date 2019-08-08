<template>
    <v-layout row>
        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-3 pr-3 mt-3">
            <h3>June 2019</h3>
            <template v-for="(note, index) in notes">
                <v-hover>
                    <v-card slot-scope="{ hover }" class="pb-3 mt-3">
                        <v-card-title>
                            <v-layout row>
                                <v-flex xs4 sm4 md4 lg3 xl3>
                                    <v-icon small left>
                                        library_books
                                    </v-icon>
                                    <span class="">Note</span>
                                </v-flex>
                                <v-flex xs8 sm8 lg9 xl9>
                                    <v-layout row>
                                        <v-flex xs7 sm7 lg8 xl8>
                                            <v-expand-transition>
                                                <div v-if="hover">
                                                    <v-layout row>
                                                        <v-flex xs6 sm6 md6 lg6 xl6>
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
                                                            <a color="indigo">Pin
                                                            </a>
                                                        </v-flex>
                                                        <v-flex xs3 sm3 md3 lg2 xl3>
                                                            <a color="indigo" @click="deleteNote(index)">Delete
                                                            </a>
                                                        </v-flex>
                                                    </v-layout>
                                                </div>
                                            </v-expand-transition>
                                        </v-flex>
                                        <v-flex xs5 sm5 lg4 xl4>
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <span v-on="on">{{note.date}}</span>
                                                </template>
                                                <span small>{{note.date}}</span>
                                            </v-tooltip>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-layout row wrap>
                            <v-flex xs11 sm11 md11 lg11 xl11 class="pl-5">
                                <p>{{note.content}}</p>
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
                                            <span>{{note.firstname}}</span>
                                        </v-tooltip>
                                    </v-flex>
                                    <v-flex xs8 sm9 md9 lg10 xl10>
                                        <p class="mt-2 pt-1"><strong>{{note.firstname}} {{note.lastname}} </strong> left a
                                            note</p>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-layout row>

                        </v-layout>
                    </v-card>
                </v-hover>
            </template>
            <br>
            <br>
            <br>
            <br>
        </v-flex>
    </v-layout>
</template>
<script>
import noteService from '../../../services/note.service'
export default {
    props: {
        idUser: {
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
            notes: []
        }

    },
    methods: {
        deleteNote(index){
            
        }
    },
    created(){
        noteService.getNotes
    }
}
</script>