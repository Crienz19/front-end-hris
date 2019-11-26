<template>
    <v-row dense>
        <v-col cols="12">
            <v-alert
                value="true"
                type="info"
                transition="scale-transition"
            >
                This is information alert.
            </v-alert>
        </v-col>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    <h3>COE Request</h3>
                    <v-spacer></v-spacer>
                    <create-COE />
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="coes"
                >
                    <template v-slot:item.compensation="{ item }">
                        <v-icon color="success" v-if="item.compensation == true">check</v-icon>
                        <v-icon color="error" v-if="item.compensation == false">remove</v-icon>
                    </template>
                    <template v-slot:item.status="{ item }">
                        <v-chip color="warning" v-if="item.status == 'Pending'">{{ item.status }}</v-chip>
                        <v-chip color="success" v-if="item.status == 'Acknowledged'">{{ item.status }}</v-chip>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <edit-COE v-if="item.status == 'Pending'" :coe="item"></edit-COE>
                        <v-btn v-if="item.status == 'Pending'" @click="removeCOE(item.id)" class="ma-1" color="error" icon small>
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <label v-if="item.status == 'Acknowledged'">Not Applicable</label>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import CreateCOE from '@/components/modal/employee/request/coe/CreateCOE.vue';
    import EditCOE from '@/components/modal/employee/request/coe/EditCOE.vue';
    export default {
        components: {
            CreateCOE,
            EditCOE
        },
        head: {
            title: 'COE Filing'
        },
        computed: {
            myCoeRequest () {
                return this.$store.state.coe.coes.filter(coe => coe.user_id == this.$auth.user.id);
            }
        },
        data() {
            return {
                headers: [
                    {
                        text: 'Request #',
                        align: 'left',
                        value: 'id'
                    },
                    {
                        text: 'Date Requested',
                        align: 'center',
                        value: 'created_at'
                    },
                    {
                        text: 'Date Needed',
                        align: 'center',
                        value: 'date_needed'
                    },
                    {
                        text: 'Reason',
                        align: 'center',
                        value: 'reason'
                    },
                    {
                        text: 'Compensation',
                        align: 'center',
                        value: 'compensation'
                    },
                    {
                        text: 'Status',
                        align: 'center',
                        value: 'status'
                    },
                    {
                        text: 'Actions',
                        align: 'center',
                        value: 'actions',
                        sortable: false
                    }
                ]
            }
        },
        methods: {
            removeCOE (id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then(async (result) => {
                    if (result.value) {
                        await this.$store.dispatch('coe/delete', id)
                    }
                })
            }
        }
    }
</script>