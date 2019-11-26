<template>
    <v-row align-content="center" justify="center">
        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-col cols="12" sm="10" md="5" lg="4" xl="3">
            <v-card hover :loading="loading">
                <v-card-title class="pa-5 display-1 justify-center">
                    <div class="ma-9">
                        <h1>HRIS</h1>
                    </div>
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
            await this.$auth.loginWith('local', {
                data: this.form
            }).then((response) => {
                this.loading = true;
                
                Swal.fire({
                    title: 'Authentication verified!',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Log Me In!'
                }).then(async (result) => {
                    if (result.value) {
                        this.loading = false;
                        await this.$store.dispatch('user/load');
                        await this.$store.dispatch('employee/load');
                        await this.$store.dispatch('leave/load');
                        await this.$store.dispatch('overtime/load');
                        await this.$store.dispatch('trip/load');
                        await this.$store.dispatch('coe/load');
                        await this.$store.dispatch('branch/load');
                        await this.$store.dispatch('role/load');
                        await this.$store.dispatch('department/load');
                        await this.$store.dispatch('credit/load');   
                        
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
                    }
                })
            }).catch(error => {
                alert(error.response.data.message);
                this.loading = false;
            });
        }
    }
}
</script>