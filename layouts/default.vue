<template>
    <v-app>
      <!-- Sidebar -->
      <v-navigation-drawer 
        app
        absolute
        dark 
        :mini-variant.sync="mini"
        permanent
        v-if="$store.getters['auth/authenticated']"
      >
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>HRIS</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <!-- Superadmin -->
        <v-list class="pa-0" v-if="auth.role === 'superadministrator'">
          <v-divider></v-divider>
          <nuxt-link to="/sa/dashboard" tag="v-list-tile">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </nuxt-link>

          <v-list-group prepend-icon="book">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Time Keeping</v-list-tile-title>
              </v-list-tile>
            </template>

            <nuxt-link to="/sa/timekeeping/leave-requests" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Leave Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

            <nuxt-link to="/sa/timekeeping/overtime-requests" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Overtime Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

            <nuxt-link to="/sa/timekeeping/trip-requests" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Business Trip Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>
          </v-list-group>

          <v-list-group prepend-icon="settings">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Settings</v-list-tile-title>
              </v-list-tile>
            </template>

            <nuxt-link to="/sa/settings/branch" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Branch</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>
            
            <nuxt-link to="/sa/settings/department" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Department</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

            <nuxt-link to="/sa/settings/role" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Role</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

          </v-list-group>
        </v-list>
      <!-- End of Superadmin -->
      <!-- Human Resource -->
        <v-list class="pa-0" v-if="auth.role === 'hr'">
          <v-divider></v-divider>
          <nuxt-link to="/hr/dashboard" tag="v-list-tile">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </nuxt-link>
          
          <v-list-group prepend-icon="book">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Requests</v-list-tile-title>
              </v-list-tile>
            </template>

            <nuxt-link to="/hr/requests/leave" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Leave</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

            <nuxt-link to="/hr/requests/overtime" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Overtime</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

            <nuxt-link to="/hr/requests/trip" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Business Trip</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

            <nuxt-link to="/hr/requests/coe" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>COE</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>
          </v-list-group>
        </v-list>
      <!-- End of Human Resource -->
      <!-- Supervisor -->
        <v-list class="pa-0" v-if="auth.role === 'supervisor'">
          <v-divider></v-divider>
          <nuxt-link to="/sup/dashboard" tag="v-list-tile">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </nuxt-link>

          <v-list-group prepend-icon="book">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Filing</v-list-tile-title>
              </v-list-tile>
            </template>

            <nuxt-link to="/sup/filing/leave" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Leave Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

            <nuxt-link to="/sup/filing/overtime" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Overtime Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

            <nuxt-link to="/sup/filing/trip" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Business Trip Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>
            <nuxt-link to="/sup/filing/coe" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>COE Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>
          </v-list-group>
          <v-list-group prepend-icon="book">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Requests</v-list-tile-title>
              </v-list-tile>
            </template>

            <nuxt-link to="/sup/requests/leave" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Leave Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

            <nuxt-link to="/sup/requests/overtime" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Overtime Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>
          </v-list-group>
        </v-list>
      <!-- End of Supervisor -->
      <!-- Employee -->
        <v-list class="pa-0" v-if="auth.role === 'employee'">
          <v-divider></v-divider>
          <nuxt-link to="/em/dashboard" tag="v-list-tile">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </nuxt-link>

          <v-list-group prepend-icon="book">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Filing</v-list-tile-title>
              </v-list-tile>
            </template>

            <nuxt-link to="/em/filing/leave-request" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Leave Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

            <nuxt-link to="/em/filing/overtime-request" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Overtime Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

            <nuxt-link to="/em/filing/trip-request" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Business Trip Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

            <nuxt-link to="/em/filing/coe-request" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>COE Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>
          </v-list-group>
        </v-list>
      <!-- End of Employee -->
      </v-navigation-drawer>
      <!-- End of Sidebar -->

      <v-toolbar app>
        <v-toolbar-side-icon @click="mini = !mini"></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="auth">
          <v-btn flat>
            {{ auth.name }}
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn @click="logout" flat>
              <v-icon>logout</v-icon>  
            </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container grid-list-lg>
          <nuxt />
        </v-container>
      </v-content>
      <!--<v-footer app></v-footer>-->
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
