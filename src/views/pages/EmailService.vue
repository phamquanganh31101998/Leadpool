<template>
    <v-content class="mt-5 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <h1 style="position: absolute; font-size: 36px;" class="ml-3">Email</h1>
                <br>
                <br>
            </v-flex>
            <v-flex xs12 sm12 md7 lg6 xl6>
                <v-layout row>
                    <!-- <v-flex xs5 sm5 md5 lg5 xl5 offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <v-text-field append-icon="search" v-model="search" label="Search" single-line hide-details></v-text-field>
                    </v-flex> -->
                    <!-- <v-flex xs2 md2 lg2 xl2>
                        <v-btn dark color="warning" @click="createTask = true">Create Task</v-btn>
                    </v-flex> -->
                </v-layout>
            </v-flex>
        </v-layout>
        <v-divider class="mt-5" :divider="divider"></v-divider>
        <v-layout row wrap>
            <v-flex xs2 sm2 md2 lg2 xl2>
                <v-list>
                    <v-list-tile @click="page = 'manage'">
                        <v-list-tile-content :style="fontWeight[0]">
                            Quản lý mẫu email
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="page = 'create'">
                        <v-list-tile-content :style="fontWeight[1]">
                            Tạo mẫu email
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <br>
                <v-divider :divider="divider"></v-divider>
                <!-- <v-select v-model="status" :items="statusToChoose" label="Status" style="width: 60%;" class="ml-2"></v-select> -->
            </v-flex>
            <v-flex xs10 sm10 md10 lg10 xl10>
                <v-layout row>
                    <v-flex xs3 sm3 md3 lg3 xl3 class="ml-3 mt-3">
                        <v-card>
                            <v-card-title>
                                <h3 style="padding-top: 8px; position: absolute; font-size: 18px;">Chọn mẫu</h3>
                            </v-card-title>
                            <v-card-text>
                                <span class="ml-4" ><v-select :items="templateSelect" v-model="templateId" @input="setChosenTemplate()"></v-select></span>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs9 sm9 md9 lg9 xl9 class="ml-3 mt-3">
                        <v-card>
                            <v-card-title>
                                <h3 style="padding-top: 8px; position: absolute; font-size: 18px;">Nội dung mẫu</h3>
                            </v-card-title>
                            <v-card-text>
                                <div id="templateBody" style="width: 100%; margin: 10px; border: 1px solid #DDDDDD"></div>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <!-- <v-dialog v-model="createTask" persistent max-width="700px">
            <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                    <span class="headline">Create Task</span>
                </v-card-title>
                <v-card-text>
                    <newTask :idAccount="this.idAccount" :idContact="this.idContact" @closeCreateTaskDialog="closeCreateTaskDialog()"/>
                </v-card-text>
            </v-card>
        </v-dialog> -->
    </v-content>
</template>
<script>
import emailService from '../../services/email.service'
export default {
    data(){
        return{
            page: 'manage',
            fontWeight: ['font-weight: bold', ''],
            templates: [],
            templateSelect: [],
            templateId: '',
            chosenTemplate: null,
            htmlText: '',
            divider: true
        }
    },
    props: {
        idAccount: {
            type: String,
            default: null
        }
    },
    watch: {
        page(){
            this.fontWeight = ['',''];
            if(this.page == 'manage'){
                this.fontWeight[0] = 'font-weight: bold';
            }
            else {
                this.fontWeight[1] = 'font-weight: bold';
            }
        },
    },
    methods: {
        getEmailTemplate(){
            emailService.getEmailTemplate(this.idAccount).then(result => {
                this.templates = result.response;
                this.templateSelect = [];
                this.templateSelect = this.setSelectEmailTemplate(this.templates);
                // console.log(this.templates);
            })
        },
        setSelectEmailTemplate(templateArray){
            let result = [];
            for (let i = 0; i < templateArray.length;i++){
                const obj = {
                    text: templateArray[i].title,
                    value: templateArray[i].emailTemplateId
                }
                result.push(obj);
            }
            return result;
        },
        setChosenTemplate(){
            let obj = null;
            for (let i = 0; i < this.templates.length; i++){
                if(this.templates[i].emailTemplateId == this.templateId){
                    this.chosenTemplate = this.templates[i];
                }
            }
            let regex = /\\\"/gi
            this.htmlText = this.chosenTemplate.content;
            document.getElementById("templateBody").innerHTML = this.htmlText.replace(regex, "\"");
        },
    },
    created(){
        this.getEmailTemplate();
        // let arr1 = [
        //     {
        //         a: 'a'
        //     },
        //     {
        //         b: 'b'
        //     },
        //     {
        //         b: 'b'
        //     },
        //     {
        //         c: 'c'
        //     }
        // ];
        // let result = [...new Set(['a', 'b', 'b', 'c'])]
        // console.log(result)
    }
}
</script>
<style scoped>

</style>