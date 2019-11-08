<template>
    <v-content>
        <v-container>
            <v-layout>
                <v-flex xs12 sm6 md4 lg4 xl4 offset-sm3 offset-md4 offset-lg4 offset-xl4>
                    <v-card flat>
                        <v-card-title>

                        </v-card-title>
                        <v-card-text style="background-color: #FDEDEE">
                            <v-card flat style="background-color: #FDEDEE">
                                <v-card-title>
                                    <h3>Email không tồn tại</h3>
                                </v-card-title>
                                <v-card-text>
                                    Bạn không thuộc tổ chức nào, hãy liên hệ với admin để được thêm vào tổ chức.
                                </v-card-text>
                            </v-card>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" block @click="logout()">Đăng xuất</v-btn>
                        </v-card-actions>
                    </v-card>
                    
                </v-flex>
            </v-layout>

        </v-container>
    </v-content>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        logout(){
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            this.$router.replace('/login')
        }
    }
}
</script>
<style>

</style>