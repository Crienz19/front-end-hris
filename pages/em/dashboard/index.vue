<template>
    <v-row dense>
        <v-dialog v-model="upload" persistent max-width="500px">
            <v-card :loading="loading.image">
                <v-card-title>
                    Upload Image
                    <v-spacer></v-spacer>
                    <v-btn @click="upload = false;" color="default" icon>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-file-input
                        v-model="image"
                        label="File input"
                        filled
                        prepend-icon="mdi-camera"
                        show-size
                    ></v-file-input>
                    <v-btn @click="updateImage" color="primary" block>Upload</v-btn>
                </v-card-text> 
            </v-card>
        </v-dialog>
        <v-col cols="12" sm="12" md="3" lg="3">
            <v-row dense>
                <v-col>
                    <v-hover>
                        <v-card slot-scope="{ hover }" class="pa-3">
                            <v-card-text>
                                <v-layout row justify-center>
                                    <v-avatar
                                        size="250"
                                        color="grey lighten-4"
                                    >
                                        <v-img :src="$auth.user.profile_image" alt="avatar">
                                            <v-expand-transition>
                                                <div
                                                    v-if="hover"
                                                    class="d-flex transition-fast-in-fast-out blue darken-2 v-card--reveal display-3 white--text"
                                                    style="height: 100%;"
                                                >
                                                    <v-icon @click="upload = true;">cloud_upload</v-icon>
                                                </div>
                                            </v-expand-transition>
                                        </v-img>
                                    </v-avatar>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title class="pa-5 blue darken-4 white--text">
                            <h4>Filing Credits</h4>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-container grid-list-xs>
                            <v-row>
                                <v-col id="vl-meter">
                                    <label class="caption">Vacation Leave</label>
                                    <v-progress-linear :value="getVL" height="20" color="blue">
                                        <template>
                                            <strong>{{ this.employee.credit.VL}} / {{ this.employee.credit.total_VL }}</strong>
                                        </template>
                                    </v-progress-linear>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <label class="caption">Sick Leave</label>
                                    <v-progress-linear v-model="getSL" height="20" color="red">
                                        <template>
                                            <strong>{{ this.employee.credit.SL }} / {{ this.employee.credit.total_SL }}</strong>
                                        </template>
                                    </v-progress-linear>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <label class="caption">Personal Time Off</label>
                                    <v-progress-linear v-model="getPTO" height="20" color="yellow">
                                        <template>
                                            <strong>{{ this.employee.credit.PTO }}/{{ this.employee.credit.total_PTO }}</strong>
                                        </template>
                                    </v-progress-linear>
                                </v-col>
                            </v-row>
                            <v-row v-if="employee.credit.special_leave > 0">
                                <v-col>
                                    <label class="caption">Special Leave</label>
                                    <v-progress-linear v-model="getSpecialLeave" height="20" color="yellow">
                                        <template>
                                            <strong>{{ this.employee.credit.special_leave }}/{{ this.employee.credit.total_special_leave }}</strong>
                                        </template>
                                    </v-progress-linear>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-card-text>
                            
                            <div id="sl-meter">
                                
                            </div>
                            <div id="pto-meter">
                                
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="9" lg="9">
            <v-row dense>
                <v-col cols="12">
                    <v-card :loading="loading.personal">
                        <v-card-title class="pa-5 blue darken-4 white--text">
                            <h3>Personal Details</h3>
                            <v-spacer></v-spacer>
                            <v-icon v-if="isEditPersonal == true" @click="updatePersonal" color="white">check</v-icon>
                            <v-icon v-else @click="isEditPersonal = true" color="white">edit</v-icon>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-container grid-list-lg>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="4" lg="4">
                                    <v-text-field
                                        label="First Name"
                                        v-model="employee.first_name"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="4" lg="4">
                                    <v-text-field
                                        label="Middle Name"
                                        v-model="employee.middle_name"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="4" lg="4">
                                    <v-text-field
                                        label="Last Name"
                                        v-model="employee.last_name"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <DatePicker
                                        label="Birthdate"
                                        placeholder="2000-01-01"
                                        v-model="employee.birth_date"
                                        :disabled="!isEditPersonal"
                                    ></DatePicker>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <v-text-field
                                        label="Civil Status"
                                        placeholder="SINGLE"
                                        v-model="employee.civil_status"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <v-text-field
                                        label="Contact Number #1"
                                        v-model="employee.contact_no_1"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <v-text-field
                                        label="Contact Number #2"
                                        v-model="employee.contact_no_2"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <v-text-field
                                        label="Present Address"
                                        v-model="employee.present_address"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <v-text-field
                                        label="Permanent Address"
                                        v-model="employee.permanent_address"
                                        :disabled="!isEditPersonal"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="3" lg="3">
                                    <v-text-field
                                        label="SSS No."
                                        v-model="employee.sss"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="3" lg="3">
                                    <v-text-field
                                        label="PAGIBIG No."
                                        v-model="employee.pagibig"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="3" lg="3">
                                    <v-text-field
                                        label="PhilHealth No."
                                        v-model="employee.philhealth"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="3" lg="3">
                                    <v-text-field
                                        label="Tax Identification No"
                                        v-model="employee.tin"
                                        :disabled="!isEditPersonal"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card :loading="loading.company">
                        <v-card-title class="pa-5 blue darken-4 white--text">
                            <h3>Company Details</h3>
                            <v-spacer></v-spacer>
                            <v-icon v-if="isEditCompany == true" @click="updateCompany" color="white">check</v-icon>
                            <v-icon v-else @click="isEditCompany = true" color="white">edit</v-icon>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-container grid-list-lg>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <v-text-field
                                        label="Employee ID"
                                        v-model="employee.employee_id"
                                        :disabled="!isEditCompany"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <DatePicker
                                        label="Date Hired"
                                        placeholder="2000-01-01"
                                        v-model="employee.date_hired"
                                        :disabled="!isEditCompany"
                                    ></DatePicker>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <v-text-field
                                        label="Branch"
                                        v-model="employee.branch.name"
                                        :disabled="!isEditCompany"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <v-text-field
                                        label="Skype ID"
                                        v-model="employee.skype_id"
                                        :disabled="!isEditCompany"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <v-text-field
                                        label="Department"
                                        v-model="employee.department.name"
                                        :disabled="!isEditCompany"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <v-text-field
                                        label="Position"
                                        v-model="employee.position"
                                        :disabled="!isEditCompany"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<style scoped>
    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: .5;
        position: absolute;
        width: 100%;
    }
</style>

<script>
    import UploadImage from '@/components/modal/employee/dashboard/UploadImage.vue';
    import DatePicker from '@/components/datepicker/Datepicker-No-Button.vue';
    export default {
        middleware: ['auth'],
        components: {
            DatePicker,
            UploadImage
        },
        head: {
            title: 'Dashboard'
        },
        data () {
            return {
                loading: {
                    image: false,
                    personal: false,
                    company: false
                },
                image: [],
                upload: false,
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
        computed: {
            employee () {
                return this.$store.state.employee.employees.map(employee => ({
                    ...employee,
                    user: this.$store.state.user.users.find(user => user.id == employee.user_id),
                    credit: this.$store.state.credit.credits.find(credit => credit.user_id == employee.user_id),
                    department: this.$store.state.department.departments.find(department => department.id == employee.department_id),
                    branch: this.$store.state.branch.branches.find(branch => branch.id == employee.branch_id)
                }))
                .find(employee => employee.user_id == this.$auth.user.id)
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
                return (this.employee.credit.special_leave / this.employee.credit.total_special_leave) * 100;
            }
        },
        methods: {
            async updatePersonal () {
                this.loading.personal = true;
                await this.$store.dispatch('employee/update', {
                    user_id: this.$auth.user.id,
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
                })
                this.isEditPersonal = false;
                this.loading.personal = false;
            },
            async updateCompany () {
                this.loading.company = true;
                await this.$store.dispatch('employee/update', {
                    user_id: this.$auth.user.id,
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
                })
                this.isEditCompany = false;
                this.loading.company = false;
            },
            async updateImage () {
                this.loading.image = true;
                let formData = new FormData();
                formData.append('image', this.image)
                await this.$axios.$post(`/employees/photo`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response) => {
                    this.loading.image = false;
                    this.data = response.data;
                    alert('Uploaded!');
                }).catch(error => {
                    this.loading.image = false;
                    alert('Not Uploaded')
                })
            }
        }
    }
</script>