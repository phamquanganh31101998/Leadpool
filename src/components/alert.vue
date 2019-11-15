<script>
    export default {
        name: 'Alert',
        data() {
            return {
                top: true,
                right: true,
                snackbar: false,
                color: '',
                mode: '',
                timeout: 4000,
                text: ''
            }
        },
        watch: {
            '$store.state.alert.message': function () {

                if (this.$store.state.alert.message == null) return;

                this.text = this.$store.state.alert.message;
                this.mode = 'multi-line';

                switch (this.$store.state.alert.type) {
                    case 'alert-success':
                        this.color = 'success';
                        break;
                    case 'alert-danger':
                        this.color = 'error';
                        break;
                    default:
                        this.color = 'info';
                        break;
                }

                this.snackbar = true;
            },
        }
    }
</script>

<template>
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" :multi-line="mode === 'multi-line'">
        {{ text }}
        <v-btn color="#fff" flat icon @click="snackbar = false">
            <v-icon>clear</v-icon>
        </v-btn>
    </v-snackbar>
</template>