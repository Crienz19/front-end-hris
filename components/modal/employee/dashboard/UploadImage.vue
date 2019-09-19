<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                Upload Image
                <v-spacer></v-spacer>
                <v-btn @click="closeDialog" color="default" icon>
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-file-input
                    label="File input"
                    filled
                    prepend-icon="mdi-camera"
                ></v-file-input>
                <v-btn color="primary" block>Upload</v-btn>
            </v-card-text> 
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: {
            dialog: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            closeDialog () {
                this.dialog = false;
            }
        },
    }
</script>