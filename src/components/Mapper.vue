<template>
  <div class="q-pa-md">
    {{ settings.label }}
    <div v-for="row in sortedFields" v-bind:key="sortedFields.indexOf(row)">
      <FormRow :row="row" />
    </div>
  </div>
</template>

<script>
import FormRow from "../components/FormRow";
export default {
  name: "mapper",
  components: {
    FormRow,
  },
  props: {
    settings: {
      type: Object,
      required: true,
    },
    values: {
      type: Object,
      required: false,
    },
  },
  computed: {
    sortedFields: function () {
      const res = [];
      this.settings.data.fields.map((field) => {
        if (this.values[field.key] !== undefined) {
          field.value = this.values[field.key];
        } else if (field.value === undefined) field.value = "";

        const cell = res[field.rowIndex - 1];
        if (cell) {
          res[field.rowIndex - 1] = [...cell, field];
        } else {
          res[field.rowIndex - 1] = [field];
        }
      });
      return res;
    },
  },
};
</script>

<style>
</style>