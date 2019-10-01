<template>
    <v-row justify="center" align="center">
        <v-col cols="12" xs="12" sm="6" md="6" lg="5">
            <v-card>
                <v-card-title>
                    <h3>Registration Form</h3>
                </v-card-title>
                <v-divider></v-divider>
                <v-container grid-list-lg>
                    <v-row dense>
                        <v-col cols="12" xs="12" md="4" lg="4">
                            <v-text-field
                                v-model="form.first_name"
                                label="First Name"
                                placeholder="Juan"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" md="4" lg="4">
                            <v-text-field
                                v-model="form.middle_name"
                                label="Middle Name"
                                placeholder="Juan"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" md="4" lg="4">
                            <v-text-field
                                v-model="form.last_name"
                                label="Last Name"
                                placeholder="Dela Cruz"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" md="6" lg="6">
                            <DatePicker 
                                label="Birthdate"
                                placeholder="2000-01-01"
                                v-model="form.birth_date"
                            ></DatePicker>
                        </v-col>
                        <v-col cols="12" xs="12" md="6" lg="6">
                            <v-select
                                :items="['Single', 'Married']"
                                label="Civil Status"
                                v-model="form.civil_status"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" xs="12" md="6" lg="6">
                            <v-text-field
                                v-model="form.present_address"
                                label="Present Address"
                                placeholder="Address"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" md="6" lg="6">
                            <v-text-field
                                v-model="form.permanent_address"
                                label="Permanent Address"
                                placeholder="Address"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" md="6" lg="6">
                            <v-text-field
                                v-model="form.contact_no_1"
                                label="Contact No. #1"
                                placeholder="09123456789"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" md="6" lg="6">
                            <v-text-field
                                v-model="form.contact_no_2"
                                label="Contact No. #2"
                                placeholder="09123456789"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" md="3" lg="3">
                            <v-text-field
                                v-model="form.tin"
                                label="TIN"
                                placeholder="000-000-000-0"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" md="3" lg="3">
                            <v-text-field
                                v-model="form.sss"
                                label="SSS"
                                placeholder="000-000-000-0"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" md="3" lg="3">
                            <v-text-field
                                v-model="form.pagibig"
                                label="PAGIBIG"
                                placeholder="000-000-000-0"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" md="3" lg="3">
                            <v-text-field
                                v-model="form.philhealth"
                                label="PhilHealth"
                                placeholder="000-000-000-0"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
                            <v-text-field
                                v-model="form.employee_id"
                                label="Employee ID"
                                placeholder="20001234"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
                            <v-select
                                :items="branches"
                                item-text="display_name"
                                item-value="id"
                                label="Branch"
                                placeholder="Select Branch"
                                v-model="form.branch_id"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <DatePicker
                                label="Date Hired"
                                placeholder="2000-01-01"
                                v-model="form.date_hired"
                            ></DatePicker>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6">
                            <v-select
                                :items="departments"
                                item-text="display_name"
                                item-value="id"
                                label="Department"
                                placeholder="Select department"
                                v-model="form.department_id"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6">
                            <v-text-field
                                v-model="form.position"
                                label="Position"
                                placeholder="IT Specialist"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="form.skype_id"
                                label="Skype"
                                placeholder="live:test_1"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn ref="submit" @click="submit" block color="info" dark>Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import DatePicker from '@/components/datepicker/Datepicker-No-Button.vue';
    export default {
        middleware: ['auth'],
        layout: 'auth',
        components: {
            DatePicker
        },
        async asyncData({store}) {
            await store.dispatch('branch/loadBranches');
            await store.dispatch('department/loadDepartments');
        },
        data () {
            return {
                form: {
                    user_id: this.$auth.user.id,
                    first_name: '',
                    middle_name: '',
                    last_name: '',
                    birth_date: '',
                    civil_status: '',
                    present_address: '',
                    permanent_address: '',
                    contact_no_1: '',
                    contact_no_2: '',
                    tin: '',
                    sss: '',
                    pagibig: '',
                    philhealth: '',
                    employee_id: '',
                    branch_id: '',
                    date_hired: '',
                    department_id: '',
                    position: '',
                    skype_id: ''
                }
            }
        },
        methods: {
            async submit () {
                await this.$axios.$post('/employees', this.form)
                    .then((response) => {
                        this.$router.push('/em/dashboard');
                    }).catch(error => {
                        alert('Something went wrong!');
                    });
            }
        }
    }
</script>