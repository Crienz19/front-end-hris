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
                            <td class="text-xs-center">{{ props.item.full_name }}</td>
                            <td class="text-xs-center">{{ props.item.type }}</td>
                            <td class="text-xs-center">{{ props.item.pay }}</td>
                            <td class="text-xs-center">{{ props.item.from }}</td>
                            <td class="text-xs-center">{{ props.item.to }}</td>
                            <td class="text-xs-center">{{ props.item.recommending_approval }}</td>
                            <td class="text-xs-center">{{ props.item.final_approval }}</td>
                            <td class="text-xs-center">{{ props.item.created_at }}</td>
                            <td class="text-xs-center">
                                <v-icon @click="viewRequest" small>search</v-icon>
                                <v-icon @click="deleteRequest" small>delete</v-icon>
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
export default {
    components: {
        DatePickerNoButton
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
                    text: 'Full Name',
                    align: 'center',
                    value: 'full_name'
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
                    align: 'center'
                }
            ]
        }
    },
    computed: {
        leaves () {
            return this.$store.getters['leave/getLeaves']
        }
    },
    methods: {
        viewRequest () {
            this.$swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
            )
        },
        deleteRequest () {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.$swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        }
    }
}
</script>