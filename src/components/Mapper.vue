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
  },
  computed: {
    sortedFields: function () {
      const res = [];
      this.settings.data.fields.map((field, i) => {
        const cell = res[field.rowIndex - 1];
        // TODO assign def values here
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