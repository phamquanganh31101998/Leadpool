<template>
    <v-layout wrap>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-layout row>
                <span class="mt-1"><strong>To</strong></span>
                <v-chip v-model="chip" class="ml-4" small close>Tunt</v-chip>
            </v-layout>
            <v-layout row>
                <v-flex>
                    <span><strong>From</strong></span>
                    <span class="ml-4">nguyen tu (tunt.adsplus@gmail.com)</span>
                </v-flex>
                <v-flex class="text-xs-right">
                    <a href="#" style="text-decoration: none">Cc</a>
                    <a href="#" style="text-decoration: none" class="ml-3">Bcc</a>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12 class="mt-3">
            <v-divider :divider="divider"></v-divider>
            <v-layout row>
                <span class="mt-4"><strong>Subject</strong></span>
                <v-text-field class="ml-4" v-model="input"></v-text-field>
            </v-layout>
            <v-divider :divider="divider"></v-divider>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-textarea name="input" label="" value=""></v-textarea>
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
                                <v-text-field append-icon="search" label="Search" single-line hide-details>
                                </v-text-field>
                            </v-layout>
                        </v-card-title>
                    </v-card>
                </v-menu>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script>
    export default {
        data: () => ({
            input: 'demo',
            divider: true,
            chip: true,
        })
    }
</script>