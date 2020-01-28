<template>
    <v-dialog persistent v-model="dialog" scrollable max-width="1000px">
      <template v-slot:activator="{ on }">
        <v-btn class="ma-0" icon v-on="on">
            <v-icon>search</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
            <h4>{{ employee.first_name }} {{ employee.last_name }}</h4>
            <v-spacer></v-spacer>
            <v-btn flat icon @click="dialog = false">
                <v-icon>close</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12 md3>
                    <v-img
                        :src="employee.profile_image"
                        aspect-ratio="1"
                        class="grey lighten-2"
                        max-width="500"
                        max-height="300"
                        round
                    ></v-img>
                </v-flex>
                <v-flex xs12 md9>
                    <v-card>
                        <v-tabs
                            v-model="tab"
                            right
                        >
                            <v-tab href="#tab-1">
                                Personal Details
                            </v-tab>

                            <v-tab href="#tab-2">
                                Company Details
                            </v-tab>

                            <v-tab href="#tab-3">
                                Leave Credits
                            </v-tab>
                        </v-tabs>
                        <v-divider></v-divider>
                        <v-tabs-items v-model="tab">
                            <v-tab-item
                                :value="'tab-1'"
                            >
                                <v-card flat>
                                    <v-container grid-list-lg>
                                        <v-layout row wrap>
                                            <v-flex xs12 md4>
                                                <v-text-field
                                                    label="First Name"
                                                    :value="employee.first_name"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md4>
                                                <v-text-field
                                                    label="Middle Name"
                                                    :value="employee.middle_name"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md4>
                                                <v-text-field
                                                    label="Last Name"
                                                    :value="employee.last_name"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md6>
                                                <v-text-field
                                                    label="Birthdate"
                                                    :value="employee.birth_date"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md6>
                                                <v-text-field
                                                    label="Civil Status"
                                                    :value="employee.civil_status"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md6>
                                                <v-text-field
                                                    label="Contact Number #1"
                                                    :value="employee.contact_no_1"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md6>
                                                <v-text-field
                                                    label="Contact Number #2"
                                                    :value="employee.contact_no_2"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md6>
                                                <v-text-field
                                                    label="Present Address"
                                                    :value="employee.present_address"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md6>
                                                <v-text-field
                                                    label="Permanent Address"
                                                    :value="employee.permanent_address"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md3>
                                                <v-text-field
                                                    label="SSS Number"
                                                    :value="employee.sss"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md3>
                                                <v-text-field
                                                    label="PAGIBIG Number"
                                                    :value="employee.pagibig"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md3>
                                                <v-text-field
                                                    label="PhilHealth Number"
                                                    :value="employee.phil_health"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md3>
                                                <v-text-field
                                                    label="Tax Identification Number"
                                                    :value="employee.tin"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item
                                :value="'tab-2'"
                            >
                                <v-card flat>
                                    <v-container grid-list-lg>
                                        <v-layout row wrap>
                                            <v-flex xs12 md6>
                                                <v-text-field
                                                    label="Employee ID"
                                                    :value="employee.employee_id"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md6>
                                                <v-text-field
                                                    label="Date Hired"
                                                    :value="employee.date_hired"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md6>
                                                <v-text-field
                                                    label="Branch"
                                                    :value="employee.branch.name"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md6>
                                                <v-text-field
                                                    label="Skype ID"
                                                    :value="employee.skype_id"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md6>
                                                <v-text-field
                                                    label="Department"
                                                    :value="employee.department.name"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md6>
                                                <v-text-field
                                                    label="Position"
                                                    :value="employee.position"
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item :value="'tab-3'">
                                <v-card flat>
                                    <v-container grid-list-lg>
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                Vacation Leave
                                                <v-progress-linear 
                                                    v-model="getVL"
                                                    class="text-xs-center"
                                                    height="20"
                                                    color="primary"
                                                >{{ employee.credit.VL }}/{{ employee.credit.total_VL }}</v-progress-linear>
                                            </v-flex>
                                            <v-flex xs12>
                                                Sick Leave
                                                <v-progress-linear
                                                    v-model="getSL"
                                                    class="text-xs-center"
                                                    height="20"
                                                    color="info"
                                                >{{ employee.credit.SL }}/{{ employee.credit.total_SL }}</v-progress-linear>
                                            </v-flex>
                                            <v-flex xs12>
                                                Personal Time Off
                                                <v-progress-linear
                                                    v-model="getPTO"
                                                    class="text-xs-center"
                                                    height="20"
                                                    color="error"
                                                >{{ employee.credit.PTO }}/{{ employee.credit.total_PTO }}</v-progress-linear>
                                            </v-flex>
                                            <v-flex xs12>
                                                Special Leave
                                                <v-progress-linear
                                                    v-model="getSpecialLeave"
                                                    class="text-xs-center"
                                                    height="20"
                                                    color="warning"
                                                >{{ employee.credit.special_leave }}/{{ employee.credit.total_special_leave }}</v-progress-linear>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
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
                power: 20,
                tab: null
            }
        },
        computed: {
            employee () {
                return this.$store.state.employee.employees.map(employee => ({
                    ...employee,
                    credit: this.$store.state.credit.credits.find(c => c.user_id == employee.user_id),
                    branch: this.$store.state.branch.branches.find(b => b.id == employee.branch_id),
                    department: this.$store.state.department.departments.find(d => d.id == employee.department_id)
                }))
                .find(employee => employee.user_id == this.userId)
            },
            getVL () {
                return (this.employee.credit.VL / this.employee.credit.total_VL) * 100;
            },
            getSL () {
                return (this.employee.credit.SL / this.employee.credit.total_SL) * 100;
            },
            getPTO () {
                return (this.employee.credit.PTO / this.employee.credit.total_PTO) * 100;
            },
            getSpecialLeave () {
                return (this.employee.credit.special_leave / this.employees.credit.total_special_leave) * 100;
            }
        }
    }
</script>