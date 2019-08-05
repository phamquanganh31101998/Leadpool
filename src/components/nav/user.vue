<template>
    <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="120" left offset-y>
            <template v-slot:activator="{ on }">
                <v-icon v-on="on" x-large>account_circle</v-icon>
            </template>
            <v-list two-line class="pl-3 pr-3">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="../../assets/user.png">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{name}}</v-list-tile-title>
                        <v-list-tile-sub-title>
                            <p>{{email}}</p>
                        </v-list-tile-sub-title>
                        <v-list-title-sub-title>
                            <a href="#">Profile & Preferences</a>
                        </v-list-title-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider class="mt-2"></v-divider>
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>ADSPLUS.VN</v-list-tile-title>
                        <v-list-tile-sub-title>3385135</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
            </v-list>
            <v-list class="pl-3 pr-3">
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>ACCOUNT & BILLING</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>INTERGRATIONs</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>LEARNING CENTER</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>PRICING & FEATURES</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>TRAINING & SERVICES</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile-action>
                    <v-layout row class="mt-2">
                        <v-flex>
                            <a href="#" color="success">Profile</a>
                        </v-flex>
                        <v-flex class="text-xs-right">
                            <a @click="logout()" color="error">Logout</a>
                        </v-flex>
                    </v-layout>
                </v-list-tile-action>
            </v-list>
        </v-menu>
    </div>
</template>
<script>
    export default {
        name: 'user',
        data: () => ({
            fav: true,
            menu: false,
            message: false,
            hints: true,
            divider: true,
            name: '',
            email: ''
        }),
        computed: {

        },
        methods: {
            displayName() {
                let a = JSON.parse(localStorage.getItem('user'));
                this.name = a.displayName
                this.email = a.username
            },
            logout() {
                const {
                    dispatch
                } = this.$store;
                dispatch('user/logout')
            }
        },
        created() {
            this.displayName()
        }
    }
</script>