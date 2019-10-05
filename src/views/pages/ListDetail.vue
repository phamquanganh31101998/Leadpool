<template>
    <v-content class="mt-5 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <h1 class="ml-3">List Detail</h1>
            </v-flex>
            <v-flex xs12 sm12 md7 lg6 xl6>
                <v-layout row>
                    <v-flex xs5 sm5 md5 lg5 xl5 offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <v-text-field append-icon="search" v-model="search" label="Search" single-line hide-details></v-text-field>
                    </v-flex>
                
                    <v-flex xs2 md2 lg2 xl2>
                        <v-dialog max-width="600px">
                            <template v-slot:activator="{ on }">
                                <v-btn dark color="warning" v-on="on">Create List</v-btn>
                            </template>
                            <v-card>
                                <v-card-title style="background-color:#1E88E5;color:#fff">
                                    <span class="headline">Create contact</span>
                                </v-card-title>
                                <v-card-text>
                                    
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="primary">Create</v-btn>
                                    <v-btn color="warning">Close</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-divider class="mt-4" :divider="divider"></v-divider>
        <v-layout row>
            <v-flex xs12 sm12 md3 lg3 xl3>
                <v-card>
                    <v-card-title>
                        <div id="div1">
                            {{appendSomething()}}
                        </div>
                    </v-card-title>
                    <v-card-text>

                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md9 lg9 xl9></v-flex>
        </v-layout>
    </v-content>
</template>
<script>

import listService from '../../services/list.services'
export default {
    props: {
        idAccount: {
            type: String,
            default: null,
        },
        idList: {
            type: String,
            default: null,
        }
    },
    data(){
        return {
            contacts: [],
            list: null,
            stringEx: '<p style="color: red;">Hello</p>',
            conditionExample: 
            [
                [
                    {
                        "conditionId": null,
                        "object": "Contact",
                        "property": "city",
                        "condition": "EQUAL",
                        "value": "Hà Nội"
                    },
                    {
                        "conditionId": null,
                        "object": "Contact",
                        "property": "bussiness",
                        "condition": "LIKE",
                        "value": [
                            "Hải Hà"
                        ]
                    }
                ],
                [
                    {
                        "conditionId": null,
                        "object": "Contact",
                        "property": "lifecycle_stage",
                        "condition": "EQUAL",
                        "value": "Lead"
                    }
                ]
            ]
        }
    },
    methods: {
        getContacts(){
            listService.findContactByCondition(this.idAccount, this.list.conditions).then(result => {
                console.log(result);
            })
        },
        getThisList(){
            listService.getList(this.idAccount).then(result => {
                const response = result.response;
                for (let i = 0; i < response.length; i++){
                    if(response[i].contactConditionGroupId == this.idList){
                        this.list = response[i];
                    }
                }
            }).then(() => {
                this.getContacts();
            })
        },
        appendSomething(){
            try {
                var el = document.createElement('html');
                el.innerHTML = "<p style='color: red;'>abcxyz</p><br><p style='color: red;'>defghi</p>";
                return el.innerText;
                // var des = document.getElementById("div1");
                // des.append("<html><head><title>titleTest</title></head><body><a href='test0'>test01</a><a href='test1'>test02</a><a href='test2'>test03</a></body></html>")
                // console.log(document);
            } catch (error) {
                console.log(error);
            }
        }
    },
    created(){
        this.getThisList();
        this.appendSomething();
    }
}
</script>
<style>

</style>