<template>
    <v-dialog v-model="dialog" persistent max-width="600">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
                <v-icon>mdi-clipboard-arrow-down</v-icon>
            </v-btn>
        </template>
        <v-card :loading="false">
            <v-card-title>
                Update {{ userInfo.first_name }} Credit
                <v-spacer> </v-spacer>
                <v-btn @click="dialog = false" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-container>
                <v-row dense>
                    <v-col cols="12" sm="12" md="6" lg="6">
                        <v-text-field
                            label="VL"
                            dense
                            outlined
                            :placeholder="credit.VL == 0 ? '0' : credit.VL"
                            v-model="form.VL"
                            :rules="[
                                () => !!form.VL || 'This field is required.'
                            ]"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="6">
                        <v-text-field
                            label="Total VL"
                            dense
                            outlined
                            :placeholder="credit.total_VL == 0 ? '0' : credit.total_VL"
                            v-model="form.total_VL"
                            :rules="[
                                () => !!form.total_VL || 'This field is required.'
                            ]"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="12" sm="12" md="6" lg="6">
                        <v-text-field
                            label="SL"
                            dense
                            outlined
                            :placeholder="credit.SL == 0 ? '0' : credit.SL"
                            v-model="form.SL"
                            :rules="[
                                () => !!form.SL || 'This field is required.'
                            ]"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="6">
                        <v-text-field
                            label="Total SL"
                            dense
                            outlined
                            :placeholder="credit.total_SL == 0 ? '0' : credit.total_SL"
                            v-model="form.total_SL"
                            :rules="[
                                () => !!form.total_SL || 'This field is required.'
                            ]"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="12" sm="12" md="6" lg="6">
                        <v-text-field
                            label="PTO"
                            dense
                            outlined
                            :placeholder="credit.PTO == 0 ? '0' : credit.PTO"
                            v-model="form.PTO"
                            :rules="[
                                () => !!form.PTO || 'This field is required.'
                            ]"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="6">
                        <v-text-field
                            label="Total PTO"
                            dense
                            outlined
                            :placeholder="credit.total_PTO == 0 ? '0' : credit.total_PTO"
                            v-model="form.total_PTO"
                            :rules="[
                                () => !!form.total_PTO || 'This field is required.'
                            ]"
                        ></v-text-field>
                    </v-col>
                </v-row>                
            </v-container>
            <v-card-actions>
                <v-btn :disabled="isFilled" color="success" block @click="updateCredit">Update</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: [
            'userId'
        ],
        data () {
            return {
                dialog: false,
                loading: false,
                form: {
                    id: this.userId,
                    VL: '',
                    total_VL: '',
                    SL: '',
                    total_SL: '',
                    PTO: '',
                    total_PTO: ''
                }
            }
        },
        computed: {
            userInfo () {
                return this.$store.state.employee.employees.find(e => e.user_id == this.userId);
            },
            credit () {
                return this.$store.state.credit.credits.find(c => c.user_id == this.userId)
            },
            isFilled () {
                if (!this.form.VL) {
                    return true;
                } else if (!this.form.total_VL) {
                    return true;
                } else if (!this.form.SL) {
                    return true;
                } else if (!this.form.total_SL) {
                    return true;
                } else if (!this.form.PTO) {
                    return true;
                } else if (!this.form.total_PTO) {
                    return true;
                }
            }
        },
        methods: {
            async updateCredit () {
                this.loading = true;
                await this.$store.dispatch('credit/update', this.form);
                this.loading = false;
                alert('Credit Updated!');
            }
        },
    }
</script>