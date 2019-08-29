<template>
    <v-flex xs12 lg5>
        <v-alert type="info" icon="info" :value="true">
            <h5>Notice! Please wait for the administrator to activate your account. </h5>
        </v-alert>
    </v-flex>
</template>

<script>
    export default {
        middleware: ['auth'],
        layout: 'auth'   
    }
</script>