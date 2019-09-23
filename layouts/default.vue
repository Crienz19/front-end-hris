<template>
  <v-app app>
    <v-navigation-drawer app width="310" color="grey lighten-2">
      <v-list-item class="pa-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">
            HRIS
          </v-list-item-title>
          <v-list-item-subtitle>
            Human Resource System
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      
      <v-list class="pa-0" v-if="auth.role === 'superadministrator'">
        <v-list-item to="/sa/dashboard">
          <v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-subheader>Timekeeping</v-subheader>
        <v-list-item to="/sa/timekeeping/leave-requests">
          <v-list-item-icon>
            <v-icon>card_travel</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Leave Request</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/sa/timekeeping/overtime-requests">
          <v-list-item-icon>
            <v-icon>av_timer</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Overtime Request</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item to="/sa/timekeeping/trip-requests">
          <v-list-item-icon>
            <v-icon>emoji_transportation</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Business Trip Request</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-subheader>Settings</v-subheader>
        <v-list-item to="/sa/settings/branch">
          <v-list-item-icon>
            <v-icon>timeline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Branch</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/sa/settings/department">
          <v-list-item-icon>
            <v-icon>bookmark_border</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Department</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/sa/settings/role">
          <v-list-item-icon>
            <v-icon>assignment_ind</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Role</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
      <v-list class="pa-0" v-if="auth.role === 'supervisor'">
        <v-list-item to="/sup/dashboard">
          <v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-subheader>Filing</v-subheader>
        <v-list-item to="/sup/filing/leave">
          <v-list-item-icon>
            <v-icon>card_travel</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Leave Request</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/sup/filing/overtime">
          <v-list-item-icon>
            <v-icon>av_timer</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Overtime Request</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/sup/filing/trip">
          <v-list-item-icon>
            <v-icon>emoji_transportation</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Business Trip Request</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/sup/filing/coe">
          <v-list-item-icon>
            <v-icon>layers</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>COE Request</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-subheader>Requests</v-subheader>
        <v-list-item to="/sup/requests/leave">
          <v-list-item-icon>
            <v-icon>card_travel</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Leave</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/sup/requests/overtime">
          <v-list-item-icon>
            <v-icon>av_timer</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Overtime</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list v-if="auth.role === 'administrator'">
        <v-list-item to="/admin/dashboard">
          <v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-subheader>Requests</v-subheader>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>card_travel</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Leave</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item to="/admin/requests/leave/supervisor">
            <v-list-item-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Supervisor</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/admin/requests/leave/employee">
            <v-list-item-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Employee</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-divider></v-divider>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>av_timer</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Overtime</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item to="/admin/requests/overtime/supervisor">
            <v-list-item-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Supervisor</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/admin/requests/overtime/employee">
            <v-list-item-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Employee</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-divider></v-divider>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>emoji_transportation</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Official Business Trip</v-list-item-title>
            </v-list-item-content>
          </template>
          
          <v-list-item to="/admin/requests/trip/supervisor">
            <v-list-item-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Supervisor</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/admin/requests/trip/employee">
            <v-list-item-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Employee</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list> 
      <v-divider></v-divider>
      <v-list class="pa-0" v-if="auth.role === 'hr'">
        <v-list-item to="/hr/dashboard">
          <v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-subheader>Requests</v-subheader>
        <v-list-item to="/hr/requests/leave">
          <v-list-item-icon>
            <v-icon>card_travel</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Leave</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/hr/requests/overtime">
          <v-list-item-icon>
            <v-icon>av_timer</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Overtime</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/hr/requests/trip">
          <v-list-item-icon>
            <v-icon>emoji_transportation</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Business Trip</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/hr/requests/coe">
          <v-list-item-icon>
            <v-icon>layers</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>COE</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list class="pa-0" v-if="auth.role === 'employee'">
          <v-list-item to="/em/dashboard">
            <v-list-item-icon>
              <v-icon>dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-subheader>Filing</v-subheader>
          <v-list-item to="/em/filing/leave-request">
            <v-list-item-icon>
              <v-icon>card_travel</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Leave Request</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/em/filing/overtime-request">
            <v-list-item-icon>
              <v-icon>av_timer</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Overtime Request</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/em/filing/trip-request">
            <v-list-item-icon>
              <v-icon>emoji_transportation</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Business Trip Request</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/em/filing/coe-request">
            <v-list-item-icon>
              <v-icon>layers</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>COE Request</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app height="75">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      
      <v-btn icon @click="logout">
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>

      <!-- Provides the application the proper gutter -->
      <v-container grid-list-lg>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      mini: false
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
</script>
