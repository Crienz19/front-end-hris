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
                                <v-img :src="user.profile_image" alt="avatar" />
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
                                <v-progress-linear :value="value" height="20" color="info">
                                    <p style="text-align: center;">6/6</p>
                                </v-progress-linear>
                            </div>
                            <div id="sl-meter">
                                <label class="caption">Sick Leave</label>
                                <v-progress-linear :value="value" height="20" color="error">
                                    <p style="text-align: center;">6/6</p>
                                </v-progress-linear>
                            </div>
                            <div id="pto-meter">
                                <label class="caption">Personal Time Off</label>
                                <v-progress-linear :value="value" height="20" color="warning">
                                    <p style="text-align: center;">6/6</p>
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
                            <v-btn to="/sa/dashboard" color="warning" small round>Go Back</v-btn>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12 lg4>
                                    <v-text-field
                                        label="First Name"
                                        :value="user.employee.first_name"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg4>
                                    <v-text-field
                                        label="Middle Name"
                                        :value="user.employee.middle_name"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg4>
                                    <v-text-field
                                        label="Last Name"
                                        :value="user.employee.last_name"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Birthdate"
                                        :value="user.employee.birth_date"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Civil Status"
                                        :value="user.employee.civil_status"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Contact Number #1"
                                        :value="user.employee.contact_no_1"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Contact Number #2"
                                        :value="user.employee.contact_no_2"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Present Address"
                                        :value="user.employee.present_address"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Permanent Address"
                                        :value="user.employee.permanent_address"
                                        disabled
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 lg3>
                                    <v-text-field
                                        label="SSS No."
                                        :value="user.employee.sss"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg3>
                                    <v-text-field
                                        label="PAGIBIG No."
                                        :value="user.employee.pagibig"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg3>
                                    <v-text-field
                                        label="PhilHealth No."
                                        :value="user.employee.philhealth"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg3>
                                    <v-text-field
                                        label="Tax Identification No"
                                        :value="user.employee.tin"
                                        disabled
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
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="User ID"
                                        :value="user.employee.employee_id"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Date Hired"
                                        :value="user.employee.date_hired"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Branch"
                                        :value="user.employee.branch.name"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Skype ID"
                                        :value="user.employee.skype_id"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Department"
                                        :value="user.employee.department.name"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-text-field
                                        label="Position"
                                        :value="user.employee.position"
                                        disabled
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
    export default {
        async asyncData({ $axios, params }) {
            let {data} = await $axios.$get(`/users/${params.id}`);
            return {
                user: data
            }
        }
    }
</script>
