<template>
    <div>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="300px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            :label="label"
            :placeholder="placeholder"
            :disabled="disabled"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker @change="$emit('input', date)" v-model="date" scrollable>
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
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
            modal: false,
            date: this.value
          }
        }
    }
</script>