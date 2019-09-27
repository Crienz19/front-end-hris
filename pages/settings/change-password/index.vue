<template>
    <v-row justify="center" class="align-center">
        <v-col cols="4">
            <v-card :loading="loading">
                <v-card-title>
                    <h5>Change Password</h5>
                    <v-spacer></v-spacer>
                    <v-btn v-if="$auth.user.role == 'employee'" to="/em/dashboard" text>
                        Go Back
                    </v-btn>
                    <v-btn v-if="$auth.user.role == 'supervisor'" to="/sup/dashboard" text>
                        Go Back
                    </v-btn>
                </v-card-title>
                <v-container fluid>
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field
                                prepend-icon="lock_open"
                                label="Current Password"
                                type="password"
                                v-model="form.current_password"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                prepend-icon="lock"
                                label="New Password"
                                type="password"
                                v-model="form.new_password"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-btn :disabled="isFilled" block color="success" @click="changePassword">Change Password</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        middleware: ['auth'],
        data () {
            return {
                loading: false,
                form: {
                    current_password: '',
                    new_password: ''
                }
            }
        },
        computed: {
            isFilled () {
                if (!this.form.current_password) {
                    return true;
                } else if (!this.form.new_password) {
                    return true;
                }

                return false;
            }
        },
        methods: {
            async changePassword () {
                this.loading = true;
                await this.$axios.$post('/users/changePassword', this.form)
                    .then((response) => {
                        this.loading = false;
                        this.form.current_password = '';
                        this.form.new_password = '';
                        alert(response.message);
                    }).catch(error => {
                        this.loading = false;
                        alert('Current password not match.');
                    });
            }
        },
    }
</script>