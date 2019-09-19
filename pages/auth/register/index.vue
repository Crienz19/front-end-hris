<template>
    <v-flex xs12 sm3 md3 lg3>
        <v-card dark hover>
            <v-card-title>
                <h3>HRIS</h3>
            </v-card-title>
            <v-card-text>
                <v-form ref="registerForm">
                    <v-text-field xs12
                        label="Username"
                        prepend-icon="account_circle"
                        v-model.trim="form.name"
                    >
                    </v-text-field>
                    <v-text-field xs12
                        label="Email"
                        prepend-icon="email"
                        v-model.trim="form.email"
                    >
                    </v-text-field>
                    <v-text-field xs12
                        type="password"
                        prepend-icon="lock"
                        label="Password"
                        v-model.trim="form.password"
                    >
                    </v-text-field>
                    <v-text-field xs12
                        type="password"
                        prepend-icon="lock_open"
                        label="Confirm Password"
                        v-model.trim="form.c_password"
                    >
                    </v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="register" color="warning" block :loading="isLoading">Register</v-btn>
                <v-btn to="/" color="info" block>I HAVE AN ACCOUNT</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    layout: 'auth',
    data () {
        return {
            isLoading: false,
            form: {
                name: '',
                email: '',
                password: '',
                c_password: ''
            }
        }
    },
    methods: {
        async register () {
            await this.$axios.post('auth/register', {
                name: this.form.name,
                email: this.form.email,
                password: this.form.password    
            });

            this.$router.push('/');
        }
    }
}
</script>