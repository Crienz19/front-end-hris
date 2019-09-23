<template>
    <v-row align-content="center" justify="center">
        <v-col cols="12" sm="10" md="5" lg="4" xl="3">
            <v-card class="mx-auto" hover :loading="loading">
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
                    <v-form ref="loginForm">
                        <v-row dense>
                            <v-col cols="12">
                                <v-text-field xs12
                                    v-model.trim="form.name"
                                    type="text"
                                    label="Username"
                                    prepend-icon="account_circle"
                                    :rules="[
                                        () => !!form.name || 'This field is required.'
                                    ]"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field xs12
                                    v-model.trim="form.password"
                                    type="password"
                                    label="Password"
                                    prepend-icon="remove_red_eye"
                                    :rules="[
                                        () => !!form.password || 'This field is required.'
                                    ]"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-btn :disabled="isFilled" @click="login" color="blue" block>LOGIN</v-btn>
                            </v-col>
                            <v-col cols="12">
                                <v-btn to="/auth/register" color="success" block>Create an account</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
export default {
    layout: 'auth',
    data () {
        return {
            form: {
                name: '',
                password: ''
            },
            loading: false,
            errors: []
        }
    },
    computed: {
        isFilled () {
            if (!this.form.name) {
                return true;
            } else if (!this.form.password) {
                return true;
            }

            return false;
        }
    },
    methods: {
        async login () {
            this.loading = true;
            await this.$auth.loginWith('local', {
                data: this.form
            }).then((response) => {
                this.loading = false;
                alert('Login Complete!');
                switch (this.auth.role) {
                    case 'superadministrator':
                        this.$router.push('/sa/dashboard');
                        break;
                    case 'hr':
                        if (this.auth.isActivated) {
                            this.$router.push('/hr/dashboard');
                        }
                        break;
                    case 'administrator':
                        if (this.auth.isActivated) {
                            this.$router.push('/admin/dashboard');
                        }
                        break;
                    case 'supervisor':
                        if (this.auth.isActivated) {
                            if (this.auth.isFilled) {
                                this.$router.push('/sup/dashboard');
                            } else {
                                this.$router.push('/auth/form');
                            }
                        }
                        break;
                    case 'employee':
                        if (this.auth.isActivated) {
                            if (this.auth.isFilled) {
                                this.$router.push('/em/dashboard');
                            } else {
                                this.$router.push('/auth/form');
                            }
                        } else {
                            this.$router.push('/auth/activation');
                        }
                        break;
                    default: 
                        this.$auth.logout();
                        alert('Attention! Please wait for the administrator to activate your account!');
                        break;
                }
            }).catch(error => {
                alert(error.response.data.message);
                this.loading = false;
            });
        }
    }
}
</script>