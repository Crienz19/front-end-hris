<template>
    <v-row dense>
        <v-col cols="12">
            <v-alert
                type="info"
                transition="scale-transition"
            >
                This is information alert.
            </v-alert>
        </v-col>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    <h5>Leave Requests</h5>
                    <v-spacer></v-spacer>
                    <create-leave />
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table
                    :headers="headers"
                    :items="leaves"
                    :search="search"
                >
                    <template v-slot:item.recommending_approval="{ item }">
                        <v-chip color="warning" v-if="item.recommending_approval == 'Pending'">{{ item.recommending_approval }}</v-chip>
                        <v-chip color="success" text-color="white" v-if="item.recommending_approval == 'Approved'">{{ item.recommending_approval }}</v-chip>
                        <v-chip color="error" text-color="white" v-if="item.recommending_approval == 'Disapproved'">{{ item.recommending_approval }}</v-chip>
                    </template>
            
                    <template v-slot:item.final_approval="{ item }">
                        <v-chip color="warning" v-if="item.final_approval == 'Pending'">{{ item.final_approval }}</v-chip>
                        <v-chip color="success" text-color="white" v-if="item.final_approval == 'Approved'">{{ item.final_approval }}</v-chip>
                        <v-chip color="error" text-color="white" v-if="item.final_approval == 'Disapproved'">{{ item.final_approval }}</v-chip>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <edit-leave v-if="item.recommending_approval == 'Pending'" :leave="item" />
                        <v-btn v-if="item.recommending_approval == 'Pending'" @click="deleteLeave(item.id)" color="error" class="ma-1" small icon>
                            <v-icon small>delete</v-icon>
                        </v-btn>
                        <label v-if="item.recommending_approval != 'Pending'">Not Applicable</label>  
                    </template>

                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import CreateLeave from "@/components/modal/employee/request/leave/CreateLeave.vue";
    import EditLeave from "@/components/modal/employee/request/leave/EditLeave.vue";
    export default {
        middleware: ['auth'],
        components: {
            CreateLeave,
            EditLeave
        },
        head: {
            title: 'Leave Requests'
        },
        computed: {
            leaves () {
                return this.$store.getters['leave/getLeavesByUserId'](this.$auth.user.id);
            }
        },
        data () {
            return {
                search: '',
                dialog: false,
                headers: [
                    {
                        text: 'Type',
                        align: 'center',
                        value: 'type'
                    },
                    {
                        text: 'Pay',
                        align: 'center',
                        value: 'pay_type'
                    },
                    {
                        text: 'From',
                        align: 'center',
                        value: 'from'
                    },
                    {
                        text: 'To',
                        align: 'center',
                        value: 'to'
                    },
                    {
                        text: 'Time From',
                        align: 'center',
                        value: 'time_from'
                    },
                    {
                        text: 'Time To',
                        align: 'center',
                        value: 'time_to'
                    },
                    {
                        text: 'Reason',
                        align: 'center',
                        value: 'reason'
                    },
                    {
                        text: 'Count',
                        align: 'center',
                        value: 'count'
                    },
                    {
                        text: 'Recommending Approval',
                        align: 'center',
                        value: 'recommending_approval'
                    },
                    {
                        text: 'Final Approval',
                        align: 'center',
                        value: 'final_approval'
                    },
                    {
                        text: 'Actions',
                        align: 'center',
                        sortable: false,
                        value: 'actions'
                    }
                ]
            }
        },
        methods: {
            deleteLeave(id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then(async (result) => {
                    this.$store.dispatch('leave/delete', id);
                    if (result.value) {
                        Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                        )
                    }
                })
            }
        },
    }
</script>