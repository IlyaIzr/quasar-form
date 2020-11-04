<template>
  <div>
    <div v-for="row in sortedFields" v-bind:key="sortedFields.indexOf(row)">
      <FormRow :row="row" />
    </div>
  </div>
</template>

<script>
import FormRow from "../components/FormRow";
export default {
  name: "FieldMapper",
  components: {
    FormRow,
  },
  props: {
    fields: {
      type: Array,
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
      const noRowIndexes = [];
      this.fields.map((field) => {
        //Assign value from values source, or else assign default value if it's not in config
        if (this.values[field.key] !== undefined) {
          field.value = this.values[field.key];
        } else if (field.value === undefined) field.value = "";
        //Assign default field type as 'text'
        if (field.type === undefined) field.type = "text";
        //Assign default key if theres none
        if (field.key === undefined)
          field.key = "undefinedKeyN" + Math.random();
        // Make extra array for not indexed fields
        if (field.rowIndex === undefined) {
          noRowIndexes.push([field]);
        } else {
          //Put fields in array by they order. Make several fields share similar index
          const cell = res[field.rowIndex - 1];
          if (cell) {
            res[field.rowIndex - 1] = [...cell, field];
          } else {
            res[field.rowIndex - 1] = [field];
          }
        }
      });
      const resFiltered = res.filter((field, index) => field != null) //delete all empty indexes
      resFiltered.splice(resFiltered.length-1, 0, ...noRowIndexes)  //insert unindexed arrays
      return resFiltered;
    },
  },
};
</script>

<style>
</style>