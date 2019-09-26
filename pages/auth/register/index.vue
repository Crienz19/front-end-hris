<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="10" md="5" lg="4" xl="3">
            <v-card hover>
                <v-card-title class="pa-5 display-1 justify-center">
                    <div class="ma-9">
                        <h1>HRIS</h1>
                    </div>
                </v-card-title>
                <v-container grid-list-lg>
                    <v-form ref="registerForm">
                        <v-row dense>
                            <v-col cols="12">
                                <v-text-field xs12
                                    label="Username"
                                    prepend-icon="account_circle"
                                    v-model.trim="form.name"
                                    :rules="[
                                        () => !!form.name || 'This field is required.'
                                    ]"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field xs12
                                    label="Email"
                                    prepend-icon="email"
                                    v-model.trim="form.email"
                                    :rules="[
                                        () => !!form.email || 'This field is required.'
                                    ]"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field xs12
                                    type="password"
                                    prepend-icon="lock"
                                    label="Password"
                                    v-model.trim="form.password"
                                    :rules="[
                                        () => !!form.email || 'This field is required.'
                                    ]"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field xs12
                                    type="password"
                                    prepend-icon="lock_open"
                                    label="Confirm Password"
                                    v-model.trim="form.c_password"
                                    :rules="[
                                        () => !!form.c_password || 'This field is required.'
                                    ]"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-btn :disabled="isFilled" @click="register" color="warning" block :loading="isLoading">Register</v-btn>
                            </v-col>
                            <v-col cols="12">
                                <v-btn to="/" color="info" block>I HAVE AN ACCOUNT</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<style scoped>
  .full-height {
    flex: block;
    justify-items: center;
    align-content: center;
    height: 100%;
  }
</style>

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
    computed: {
        isFilled () {
            if (!this.form.name) {
                return true;
            } else if (!this.form.email) {
                return true;
            } else if (!this.form.password) {
                return true;
            } else if (!this.form.c_password) {
                return true;
            }

            return false;
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