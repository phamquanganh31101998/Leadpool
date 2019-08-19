<template>
    <v-layout row wrap>
        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-3 pr-3">
            <h3>June 2019</h3>
            <v-card class="pb-3 mt-3">
                <v-card-title>
                    <v-layout row>
                        <v-flex xs4 sm4 md4 lg3 xl3>
                            <v-icon small left>
                                calendar_today
                            </v-icon>
                            <span class="">Task</span>
                        </v-flex>
                    </v-layout>
                </v-card-title>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12 xl12 class="pl-4">
                        <v-btn color="error" outline small class="ml-4">Overdue</v-btn>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 xl12 class="pl-5 mt-3">
                        <v-layout row>
                            <v-btn small fab dark color="grey lighten-1"><v-icon>done</v-icon></v-btn><strong class="mt-3">hello</strong>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 xl12 class="mt-3">
                        <v-layout row>
                            <v-flex xs6 sm5 md4 lg3 xl2 class="pl-4">
                                <v-layout row>
                                    <v-flex xs12 sm12 md12 lg12 xl12 class="pl-4">
                                        <span>Assigned to</span>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs6 sm5 md4 lg3 xl2 class="ml-3">
                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="grey lighten-2" small fab v-on="on">
                                                    <v-icon>person</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>join ichigo</span>
                                        </v-tooltip>
                                    </v-flex>
                                    <v-flex xs6 sm7 md8 lg8 xl9 class="ml-3">
                                        <p class="mt-2 pt-1">join ichigo</p>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs6 sm7 md8 lg9 xl10>
                                <v-layout row>
                                    <span>Due date</span>
                                </v-layout>
                                <v-layout row>
                                    <p class="mt-2 pt-1">11/07/2019 at 16:00</p>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-list-group sub-group no-action>
                            <template v-slot:activator>
                                <v-list-tile>
                                    <v-list-tile-title><span>Details</span></v-list-tile-title>
                                </v-list-tile>
                            </template>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        <v-layout row>
                                            <v-flex xs12 sm12 md12 lg10 xl8>
                                                <v-layout row>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>Type</span>
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>remider</span>
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>Queue</span>
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>Created by</span>
                                                    </v-flex>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        <v-layout row>
                                            <v-flex xs12 sm12 md12 lg10 xl8>
                                                <v-layout row>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>Todo</span>
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>11/07/2019 at 16:00</span>
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>None</span>
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>nguyen tu</span>
                                                    </v-flex>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list-group>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-3 pr-3 mt-4">
            <h3>July 2019</h3>
            <v-card class="pb-3 mt-3">
                <v-card-title>
                    <v-layout row>
                        <v-flex xs4 sm4 md4 lg3 xl3>
                            <v-icon small left>
                                calendar_today
                            </v-icon>
                            <span class="">Task</span>
                        </v-flex>
                    </v-layout>
                </v-card-title>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12 xl12 class="pl-5 mt-1">
                        <v-layout row>
                            <v-btn small fab dark color="success"><v-icon>done</v-icon></v-btn> <strong class="mt-3">hello</strong>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-list-group sub-group no-action>
                            <template v-slot:activator>
                                <v-list-tile>
                                    <v-list-tile-title><span>Details</span></v-list-tile-title>
                                </v-list-tile>
                            </template>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        <v-layout row>
                                            <v-flex xs6 sm6 md6 lg3 xl4>
                                                <v-layout row>
                                                    <span>Assigned to</span>
                                                </v-layout>
                                            </v-flex>
                                            <v-flex xs6 sm6 md6 lg9 xl8>
                                                <v-layout row>
                                                    <span>Due date</span>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-avatar>
                                    <v-layout row>
                                        <v-flex xs6 sm6 md6 lg5 xl4>
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn color="grey lighten-2" small fab v-on="on">
                                                        <v-icon>person</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>join ichigo</span>
                                            </v-tooltip>
                                        </v-flex>
                                    </v-layout>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        <v-layout row>
                                            <v-flex xs6 sm6 lg2 xl2>
                                                <p>To: join</p>
                                            </v-flex>
                                            <v-flex xs6 sm6 lg10 xl10 class="pl-3">
                                                <p>11/07/2019 at 16:00</p>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile class="mt-3">
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        <v-layout row>
                                            <v-flex xs12 sm12 md12 lg10 xl8>
                                                <v-layout row>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>Type</span>
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>remider</span>
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>Queue</span>
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>Created by</span>
                                                    </v-flex>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        <v-layout row>
                                            <v-flex xs12 sm12 md12 lg10 xl8>
                                                <v-layout row>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>Todo</span>
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>11/07/2019 at 16:00</span>
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>None</span>
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg3 xl3>
                                                        <span>nguyen tu</span>
                                                    </v-flex>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list-group>
                    </v-flex>
                </v-layout>
            </v-card>
            <br>
            <br>
            <br>
            <br>
        </v-flex>
    </v-layout>
</template>
<script>
    export default {

    }
</script>