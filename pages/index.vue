<template>
    <v-flex xs12 sm10 md5 lg4 xl3>
        <v-card dark>
            <v-card-title>
                <v-layout row align-center justify-center>
                    <v-avatar
                        size="150"
                    >
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
                </v-layout>
            </v-card-title>
            <v-card-text>
                <v-form ref="loginForm">
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
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="isFilled" @click="login" color="warning" block>LOGIN</v-btn>
                <v-btn to="/auth/register" color="info" block>Create an account</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
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
            await this.$auth.loginWith('local', {
                data: this.form
            }).then((response) => {
                alert('Login Complete!');
                switch (this.auth.role) {
                    case 'superadministrator':
                        this.$router.push('/sa/dashboard');
                        break;
                    case 'hr':
                        if (this.auth.isActivated) {
                            if (this.auth.isFilled) {
                                this.$router.push('/hr/dashboard');
                            } else {
                                this.$router.push('/auth/form');
                            }
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
                console.log(error.response);
            });
        }
    }
}
</script>