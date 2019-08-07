<template>
    <v-container grid-list-md>
        <v-layout wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-textarea name="input" label="Start typing to leave a note" value=""></v-textarea>
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
                                Associated with 1 record adsdassadsasad
                            </a>
                        </template>
                        <v-card>
                            <v-card-title>
                                <v-layout row>
                                    <v-text-field append-icon="search" label="Search" single-line hide-details>
                                    </v-text-field>
                                </v-layout>
                            </v-card-title>
                        </v-card>
                    </v-menu>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default {

    }
</script>