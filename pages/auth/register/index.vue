<template>
    <v-flex xs12 sm3 md3 lg3>
        <v-card dark>
            <v-card-title>
                <h3>HRIS</h3>
            </v-card-title>
            <v-card-text>
                <v-form ref="registerForm">
                    <v-text-field xs12
                        label="Username"
                    >
                    </v-text-field>
                    <v-text-field xs12
                        type="password"
                        label="Password"
                    >
                    </v-text-field>
                    <v-text-field xs12
                        type="password"
                        label="Confirm Password"
                    >
                    </v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="register" color="warning" block>Register</v-btn>
                <v-btn @click="login" color="info" block>I HAVE AN ACCOUNT</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    layout: 'auth',
    data () {
        return {

        }
    },
    methods: {
        login () {
            this.$router.push('/');
        },
        register () {
            if (this.$refs.registerForm.validate()) {
                alert('Fill details');
            } else {
                alert()
            }
        }
    }
}
</script>