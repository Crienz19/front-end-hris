<template>
    <v-app app>
        <v-toolbar app v-if="auth">
        <v-toolbar-side-icon>HRIS</v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="auth">
          <v-btn flat>
            {{ auth.name }}
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn @click="$auth.logout()" flat>
              <v-icon>logout</v-icon>  
            </v-btn>
        </v-toolbar-items>
      </v-toolbar>
        <v-container fill-height app fluid>
            <v-layout justify-center align-center row>
                <nuxt />
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
export default {
    
}
</script>