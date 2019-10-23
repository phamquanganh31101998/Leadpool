<template>
    <v-card-text>
        <v-layout row wrap>
            <span class="mt-4"><strong>Đến: </strong></span>
            <span class="ml-4"><v-text-field filled label="Số điện thoại"></v-text-field></span>
        </v-layout>
        <v-divider :divider="divider"></v-divider>
        <v-layout row weap>
            <v-flex xs4 sm4 md4 lg4 xl4>
                <span class="mt-4"><strong>Kiểu </strong></span>
                <span class="ml-4"><v-select :items="smsTypes" v-model="smsType"></v-select></span>
            </v-flex>
            <v-flex offset-xs1 offset-sm1 offset-md1 offset-lg1 offset-xl1 xs4 sm4 md4 lg4 xl4 v-if="smsType=='template'">
                <span class="mt-4"><strong>Chọn mẫu </strong></span>
                <span class="ml-4"><v-select :items="['a', 'b']"></v-select></span>
            </v-flex>
        </v-layout>
        <v-divider :divider="divider"></v-divider>
        <v-layout row wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <br>
                <span class="mt-4"><strong>Nội dung tin nhắn (Không dấu)</strong></span>
                <br>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12>
                <v-textarea label="Nội dung" rows="4" disabled v-if="smsType=='template'" box></v-textarea>
                <v-textarea label="Nội dung" rows="4" v-else counter="160"
                    onkeypress="return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 32)"
                    filled
                ></v-textarea>
            </v-flex>
            
        </v-layout>
        <v-layout wrap>
            <v-btn color="blue darken-1" small flat :disabled="disableSaveButton"
                @click="closeSendSMSDialog()">Gửi</v-btn>
            <v-btn color="red" small flat
                @click="closeSendSMSDialog()">Đóng</v-btn>
        </v-layout>
    </v-card-text>
</template>
<script>
export default {
    props: {
        idAccount: {
            type: String,
            default: null,
        },
        idContact: {
            type: String,
            default: null,
        }
    },
    data(){
        return {
            divider: true,
            smsTypes: [
                {
                    text: 'Thường',
                    value: 'normal'
                },
                {
                    text: 'Theo mẫu',
                    value: 'template'
                }
            ],
            smsType: 'template'
        }
    },
    methods: {
        closeSendSMSDialog(){
            this.$emit('closeSendSMSDialog');
        }
    }
}
</script>
<style>

</style>