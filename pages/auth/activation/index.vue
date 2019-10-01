<template>
    <v-row>
        <v-col cols="12">
            <v-alert
                prominent
                type="error"
            >
                <v-row align="center">
                    <v-col class="grow">Please wait for the administrator to activate your account.</v-col>
                    <v-col class="shrink">
                        <v-btn small @click="$auth.logout()">Logout</v-btn>
                    </v-col>
                </v-row>
            </v-alert>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        middleware: ['auth'],
        layout: 'auth'   
    }
</script>