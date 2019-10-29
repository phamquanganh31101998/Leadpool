<template>
    <v-content>
        <v-layout row wrap class="mt-5 pl-5 pr-5">
            <v-flex xs12 sm12 md12 lg12 xl12>
                <h1 class="ml-3">Cài đặt</h1>
            </v-flex>
        </v-layout>
        <v-divider class="mt-5" :divider="divider"></v-divider>
        <v-layout row wrap class="mt-5 pl-5 pr-5">
            <v-flex xs3 sm3 md3 lg3 xl3>
                <v-list>
                    <!-- <v-list-tile>
                        <v-list-tile-content>
                            Sales
                        </v-list-tile-content>
                    </v-list-tile> -->
                    <v-list-tile @click="goToUserAndTeamSettingPage()">
                        <v-list-tile-content>
                            Người dùng và nhóm
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content style="font-weight: bold;">
                            Quản lý tổ chức
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
            <v-flex xs9 sm9 md9 lg9 xl9>
                <h1>Quản lý các tổ chức</h1>
                <br>
            </v-flex>
        </v-layout>
    </v-content>
</template>
<script>
export default {
    props: {
        idAccount: {
            type: String,
            default: null,
        },
    },
    data(){
        return{
            currentUser: null
        }
    },
    methods: {
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
        },
        goToUserAndTeamSettingPage(){
            let link = `/settings/${this.currentUser.accountId}/userandteam`;
            this.$router.push(link);
        }
    },
    created(){
        this.getCurrentUser();
    }
}
</script>
<style>

</style>