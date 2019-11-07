<template>
    <v-content>
        <v-container>
            <v-layout>
                <v-flex>
                    Bạn không thuộc tổ chức nào, hãy liên hệ với admin để được thêm vào tổ chức.
                </v-flex>
                <v-flex>
                    <v-btn color="primary" @click="logout()">Đăng xuất</v-btn>
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