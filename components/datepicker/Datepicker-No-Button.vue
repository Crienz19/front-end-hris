<template>
    <div>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            :placeholder="placeholder"
            :label="label"
            :prepend-icon="icon"
            :disabled="disabled"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker :landscape="true" @change="$emit('input', date)" v-model="date" @input="menu = false"></v-date-picker>
      </v-menu>
    </div>
</template>

<script>
    export default {
        props: [
          'label',
          'placeholder',
          'icon',
          'value',
          'disabled'
        ],
        data () {
            return {
                menu: false,
                date: this.value
            }
        }
    }
</script>