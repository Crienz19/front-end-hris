<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="3" md="3" lg="3">
            <v-card hover>
                <v-card-title>
                    <v-row justify="center">
                        <v-avatar size="150">
                            <v-img
                                src="https://picsum.photos/id/11/500/300"
                                lazy-src="https://picsum.photos/id/11/10/6"
                                aspect-ratio="1"
                                class="grey lighten-2"
                                max-width="150"
                                max-height="150"
                                elevation-19
                            ></v-img>
                        </v-avatar>
                    </v-row>
                </v-card-title>
                <v-container grid-list-lg>
                    <v-form ref="registerForm">
                        <v-row dense>
                            <v-col cols="12">
                                <v-text-field xs12
                                    label="Username"
                                    prepend-icon="account_circle"
                                    v-model.trim="form.name"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field xs12
                                    label="Email"
                                    prepend-icon="email"
                                    v-model.trim="form.email"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field xs12
                                    type="password"
                                    prepend-icon="lock"
                                    label="Password"
                                    v-model.trim="form.password"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field xs12
                                    type="password"
                                    prepend-icon="lock_open"
                                    label="Confirm Password"
                                    v-model.trim="form.c_password"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-btn @click="register" color="warning" block :loading="isLoading">Register</v-btn>
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