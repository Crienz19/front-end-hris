<template>
    <v-layout row justify-center>
        <v-dialog v-model="isOpen" persistent max-width="700px">
            <slot />
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        props: [
            'isOpen'
        ]
    }
</script>