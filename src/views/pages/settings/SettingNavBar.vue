<template>
    <v-content class="mt-5 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <h1 class="ml-3">Settings</h1>
            </v-flex>
        </v-layout>
        <v-divider class="mt-4" :divider="divider"></v-divider>
        <br>
        <br>
    </v-content>
</template>
<script>
export default {
    props: {
        idAccount: {
            type: String,
            default: null,
        },
    }
}
</script>
<style>

</style>