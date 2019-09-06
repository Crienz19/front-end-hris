<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12>
                <v-alert
                    value="true"
                    type="info"
                    transition="scale-transition"
                >
                    This is information alert.
                </v-alert>
            </v-flex>
            <v-flex xs12>
                <v-card elevate="24">
                    <v-data-table
                        :headers="headers"
                        :items="leaves"
                    >
                        <template v-slot:items="props">
                            <td>{{ props.item.id }}</td>
                            <td class="text-xs-center">{{ props.item.employee.first_name }}</td>
                            <td class="text-xs-center">{{ props.item.employee.last_name }}</td>
                            <td class="text-xs-center">{{ props.item.type }}</td>
                            <td class="text-xs-center">{{ props.item.pay_type }}</td>
                            <td class="text-xs-center">{{ props.item.from }}</td>
                            <td class="text-xs-center">{{ props.item.to }}</td>
                            <td class="text-xs-center">
                                <v-chip color="warning" v-if="props.item.recommending_approval == 'Pending'">{{ props.item.recommending_approval }}</v-chip>
                                <v-chip color="info" v-if="props.item.recommending_approval == 'Approved'">{{ props.item.recommending_approval }}</v-chip>
                                <v-chip color="error" v-if="props.item.recommending_approval == 'Disapproved'">{{ props.item.recommending_approval }}</v-chip>
                            </td>
                            <td class="text-xs-center">
                                <v-chip color="warning" v-if="props.item.final_approval == 'Pending'">{{ props.item.final_approval }}</v-chip>
                                <v-chip color="info" v-if="props.item.final_approval == 'Approved'">{{ props.item.final_approval }}</v-chip>
                                <v-chip color="error" v-if="props.item.final_approval == 'Disapproved'">{{ props.item.final_approval }}</v-chip>
                            </td>
                            <td class="text-xs-center">{{ props.item.created_at }}</td>
                            <td class="text-xs-center">
                                <view-leave :leave="props.item" />
                            </td>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import DatePickerNoButton from '@/components/datepicker/Datepicker-No-Button.vue';
import ViewLeave from "@/components/modal/superadmin/timekeeping/leave/viewLeave.vue";
export default {
    middleware: ['auth'],
    components: {
        DatePickerNoButton,
        ViewLeave
    },
    async asyncData({store}) {
        await store.dispatch('leave/loadSuperLeaves');
    },
    data () {
        return {
            dialog: false,
            headers: [
                {
                    text: 'ID',
                    align: 'left',
                    value: 'id'
                },
                {
                    text: 'First Name',
                    align: 'center',
                    value: 'employee.first_name'
                },
                {
                    text: 'Last Name',
                    align: 'center',
                    value: 'employee.last_name'
                },
                {
                    text: 'Type',
                    align: 'center',
                    value: 'type'
                },
                {
                    text: 'Pay',
                    align: 'center',
                    value: 'pay'
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
                    text: 'Created At',
                    align: 'center',
                    value: 'created_at'
                },
                {
                    text: 'Actions',
                    align: 'center',
                    sortable: false
                }
            ]
        }
    },
}
</script>