<template>
    <v-layout row wrap>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-layout row>
                <v-flex xs12 sm12 md6 lg6 xl6>
                    <v-text-field v-model="search" append-icon="search" label="Search properties" outline
                        hide-details></v-text-field>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs11 sm11 md11 lg11 xl11 class="mt-3">
            <v-layout row>
                <v-flex xs12 sm12 md12 lg12 xl12>
                    <v-data-table :headers="headers" :items="desserts" :search="search">
                        <template v-slot:items="props">
                            <td>{{ props.item.name }}</td>
                            <td class="text-xs-center">{{ props.item.calories }}</td>
                            <td class="text-xs-center">{{ props.item.fat }}</td>
                            <td class="text-xs-center">{{ props.item.carbs }}</td>
                        </template>
                        <template v-slot:no-results>
                            <v-alert :value="true" color="error" icon="warning">
                                Your search for "{{ search }}" found no results.
                            </v-alert>
                        </template>
                    </v-data-table>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script>
    export default {
        data() {
            return {
                search: '',
                headers: [{
                        text: 'Dessert (100g serving)',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    {
                        text: 'Calories',
                        align: 'center',
                        value: 'calories'
                    },
                    {
                        text: 'Fat (g)',
                        align: 'center',
                        value: 'fat'
                    },
                    {
                        text: 'Carbs (g)',
                        align: 'center',
                        value: 'carbs'
                    }
                ],
                desserts: [{
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65
                    }
                ]
            }
        }
    }
</script>