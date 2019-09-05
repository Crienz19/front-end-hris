<template>
    <v-layout row wrap>
        <v-flex xs12 lg3>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card class="pa-3">
                        <v-card-text>
                            <v-layout row justify-center>
                            <v-avatar
                                size="250"
                                color="grey lighten-4"
                            >
                                <v-img :src="$auth.user.profile_image" alt="avatar" />
                            </v-avatar>
                        </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12>
                    <v-card>
                        <v-card-title class="light-blue white--text">
                            <h3>Filing Credits</h3>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <div id="vl-meter">
                                <label class="caption">Vacation Leave</label>
                                <v-progress-linear v-model="getVL" height="20" color="info">
                                    <p style="text-align: center;">{{ this.employee.credit.VL }}/{{ this.employee.credit.total_VL }}</p>
                                </v-progress-linear>
                            </div>
                            <div id="sl-meter">
                                <label class="caption">Sick Leave</label>
                                <v-progress-linear v-model="getSL" height="20" color="error">
                                    <p style="text-align: center;">{{ this.employee.credit.SL }}/{{ this.employee.credit.total_SL }}</p>
                                </v-progress-linear>
                            </div>
                            <div id="pto-meter">
                                <label class="caption">Personal Time Off</label>
                                <v-progress-linear v-model="getPTO" height="20" color="warning">
                                    <p style="text-align: center;">{{ this.employee.credit.PTO }}/{{ this.employee.credit.total_PTO }}</p>
                                </v-progress-linear>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 lg9>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card>
                        <v-card-title class="light-blue white--text">
                            <h3>Personal Details</h3>
                            <v-spacer></v-spacer>
                            <v-icon @click="(isEditPersonal) ? isEditPersonal = false : isEditPersonal = true;" color="white">{{ (isEditPersonal) ? 'check' : 'edit' }}</v-icon>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12 lg4>
                                    <v-text-field
                                        label="First Name"
                                        v-model="employee.first_name"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg4>
                                    <v-text-field
                                        label="Middle Name"
                                        v-model="employee.middle_name"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg4>
                                    <v-text-field
                                        label="Last Name"
                                        v-model="employee.last_name"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <DatePicker
                                        label="Birthdate"
                                        placeholder="2000-01-01"
                                        v-model="employee.birth_date"
                                        :disabled="!isEditPersonal"
                                    ></DatePicker>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Civil Status"
                                        placeholder="SINGLE"
                                        v-model="employee.civil_status"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Contact Number #1"
                                        v-model="employee.contact_no_1"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Contact Number #2"
                                        v-model="employee.contact_no_2"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Present Address"
                                        v-model="employee.present_address"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Permanent Address"
                                        v-model="employee.permanent_address"
                                        :disabled="!isEditPersonal"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 lg3>
                                    <v-text-field
                                        label="SSS No."
                                        v-model="employee.sss"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg3>
                                    <v-text-field
                                        label="PAGIBIG No."
                                        v-model="employee.pagibig"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg3>
                                    <v-text-field
                                        label="PhilHealth No."
                                        v-model="employee.philhealth"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg3>
                                    <v-text-field
                                        label="Tax Identification No"
                                        v-model="employee.tin"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12>
                    <v-card>
                        <v-card-title class="light-blue white--text">
                            <h3>Company Details</h3>
                            <v-spacer></v-spacer>
                            <v-icon @click="(isEditCompany) ? isEditCompany = false : isEditCompany = true;" color="white">{{ (isEditCompany) ? 'check' : 'edit' }}</v-icon>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Employee ID"
                                        v-model="employee.employee_id"
                                        :disabled="!isEditCompany"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <DatePicker
                                        label="Date Hired"
                                        placeholder="2000-01-01"
                                        v-model="employee.date_hired"
                                        :disabled="!isEditCompany"
                                    ></DatePicker>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Branch"
                                        v-model="employee.branch.name"
                                        :disabled="!isEditCompany"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Skype ID"
                                        v-model="employee.skype_id"
                                        :disabled="!isEditCompany"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Department"
                                        v-model="employee.department.name"
                                        :disabled="!isEditCompany"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Position"
                                        v-model="employee.position"
                                        :disabled="!isEditCompany"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    import DatePicker from '@/components/datepicker/Datepicker-No-Button.vue';
    export default {
        middleware: ['auth'],
        components: {
            DatePicker
        },
        async asyncData({$axios, $auth}) {
            let {data} = await $axios.$get(`/employees/${$auth.user.id}`);

            return {
                employee: data
            }
        },
        data () {
            return {
                isEditPersonal: false,
                isEditCompany: false,
                value: 30,
                student: {
                    first_name: 'Renz',
                    middle_name: 'Dumlao',
                    last_name: 'Mergenio'
                }
            }
        },
        watch: {
            isEditPersonal (value) {
                if (!value) {
                    this.updatePersonal();

                    this.$swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        type: 'success',
                        title: 'Update Successful!'
                    });
                }
            },
            isEditCompany (value) {
                if (!value) {
                    this.$swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        type: 'success',
                        title: 'Update Successful!'
                    });
                }
            }
        },
        computed: {
            getVL () {
                return (this.employee.credit.VL / this.employee.credit.total_VL) * 100;
            },
            getSL () {
                return (this.employee.credit.SL / this.employee.credit.total_SL) * 100;
            },
            getPTO () {
                return (this.employee.credit.PTO / this.employee.credit.total_PTO) * 100;
            }
        },
        methods: {
            async updatePersonal () {
                await this.$axios.$patch(`/employees/${this.auth.id}`, {
                    first_name: this.employee.first_name,
                    middle_name: this.employee.middle_name,
                    last_name: this.employee.last_name,
                    birth_date: this.employee.birth_date,
                    civil_status: this.employee.civil_status,
                    contact_no_1: this.employee.contact_no_1,
                    contact_no_2: this.employee.contact_no_2,
                    present_address: this.employee.present_address,
                    permanent_address: this.employee.permanent_address,
                    sss: this.employee.sss,
                    pagibig: this.employee.pagibig,
                    philhealth: this.employee.philhealth,
                    tin: this.employee.tin,
                    employee_id: this.employee.employee_id,
                    date_hired: this.employee.date_hired,
                    branch_id: this.employee.branch.id,
                    skype_id: this.employee.skype_id,
                    department_id: this.employee.department.id,
                    position: this.employee.position
                }).then((response) => {
                    this.data = response.data;
                }).catch(error => {
                    alert('Something went wrong');
                })
            }
        }
    }
</script>