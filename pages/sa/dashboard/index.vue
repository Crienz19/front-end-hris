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
      <!-- <v-col cols="12" sm="12" md="6" lg="6">
        <v-card elevate="24">
          <v-card-title class="light-blue white--text">
            <h3>Leave Summary</h3>
            <v-spacer></v-spacer>
            <v-icon @click="" color="white">refresh</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <apex-chart width="100%" type="line" :data="chart_data"></apex-chart>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="6" lg="6">
        <v-card elevate="24">
          <v-card-title class="light-blue white--text">
            <h3>Overtime Summary</h3>
            <v-spacer></v-spacer>
            <v-icon @click="" color="white">refresh</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <apex-chart width="100%" type="bar" :data="chart_data"></apex-chart>
          </v-card-text>
        </v-card>
      </v-col> -->

      <v-col cols="12">
        <v-card elevate="24">
          <v-card-title>
            <h5>Registered Users</h5>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="users"
            class="elevation-1"
          >
            <template v-slot:item.isActivated="{ item }">
              <v-icon color="success" v-if="item.isActivated == true">check_circle_outline</v-icon>
              <v-icon color="error" v-if="item.isActivated == false">error_outline</v-icon>
            </template>

            <template v-slot:item.isFilled="{ item }">
              <v-icon color="success" v-if="item.isFilled == true">check_circle_outline</v-icon>
              <v-icon color="error" v-if="item.isFilled == false">error_outline</v-icon>
            </template>

            <template v-slot:item.actions="{ item }">
              <view-employee-details v-if="item.employee" :employee="item.employee"></view-employee-details>
              <v-btn class="ma-0" v-if="item.isActivated" icon small @click="deactivateUser(item.id)">
                <v-icon>lock</v-icon>
              </v-btn>
              <v-btn class="ma-0" v-else icon small @click="activateUser(item.id)">
                <v-icon>lock_open</v-icon>                    
              </v-btn>
              <assign-role-modal :user="item.id" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
import ApexChart from "@/components/apex-chart/ApexChart.vue";
import Menu from "@/components/menu/MenuWithSlot.vue";
import AssignRoleModal from "@/components/modal/superadmin/dashboard/AssignRole.vue";
import ViewEmployeeDetails from "@/components/modal/superadmin/dashboard/EmployeeDetails.vue";
export default {
  middleware: ['auth'],
  components: {
    ApexChart,
    AssignRoleModal,
    ViewEmployeeDetails
  },
  head () {
    return {
      title: 'Dashboard'
    }
  },
  async asyncData({$axios, store}) {
    await store.dispatch('user/loadUsers');
  },
  created() {
    var date = new Date();
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for(var i=0; i<date.getMonth() + 1; i++) {
      console.log(month[i])
    }
  },
  data () {
      return {
        chart_data: {
          options: {
            chart: {
              id: 'vuechart-example'
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }
          },
          series: [
            {
              name: 'VL',
              data: [30, 40, 45, 50, 49, 60, 70, 91, 50, 70, 33, 76]
            },
            {
              name: 'SL',
              data: [25, 35, 40, 45, 44, 55, 65, 86, 50, 49, 60, 70],
            },
            {
              name: 'PTO',
              data: [70, 91, 50, 70, 33, 76, 30, 40, 45, 50, 49, 60]
            },
            {
              name: 'VL - Half',
              data: [90, 88, 53, 13, 67, 89, 55, 33, 11, 66, 45, 21]
            },
            {
              name: 'SL - Half',
              data: [11, 37, 75, 64, 90, 14, 35, 45, 11, 24, 34, 55]
            },
            {
              name: 'PTO - Half',
              data: [37, 56, 23, 15, 64, 10, 33, 65, 32, 57, 46, 64]
            }
          ]
        },
        headers: [
          {
            text: 'ID',
            align: 'left',
            value: 'id'
          },
          { 
            text: 'Username',
            align: 'center',
            value: 'name'
          },
          { 
            text: 'Email', 
            align: 'center',
            value: 'email' 
          },
          { 
            text: 'Role', 
            align: 'center',
            value: 'role' 
          },
          {
            text: 'Activated',
            align: 'center',
            value: 'isActivated'
          },
          {
            text: 'Filled',
            align: 'center',
            value: 'isFilled'
          },
          {
            text: 'Created At',
            align: 'center',
            value: 'created_at'
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
    async activateUser (id) {
      await this.$store.dispatch('user/updateUser', { 'id':id, 'isActivated': true});
    },
    async deactivateUser (id) {
      await this.$store.dispatch('user/updateUser', { 'id':id, 'isActivated': false});
    }
  }
}
</script>