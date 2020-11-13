<template>
  <div>
    <Stepper
      v-if="tabs"
      :fields="sortedFields"
      :tabs="tabs"
      :settings="settings || false"
    />

    <div
      v-else
      v-for="row in sortedFields"
      v-bind:key="sortedFields.indexOf(row)"
    >
      <FormRow :row="row" />
    </div>
  </div>
</template>

<script>
import FormRow from "./FormRow";
import Stepper from "./Stepper";
export default {
  name: "FieldMapper",
  components: {
    FormRow,
    Stepper,
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
    tabs: {
      type: Object || undefined,
      required: false,
    },
    multiKey: {
      type: String,
      required: false,
    },
    rowIndexMultiple: {
      type: Number || undefined,
      required: false,
    },
    settings: {
      type: Object,
      required: false,
    },
  },
  computed: {
    sortedFields() {
      const fieldRowSorter = (fields) => {
        const res = [];
        const noRowIndexes = [];
        const fieldSorter = (field) => {};
        fields.map((field) => {
          // Assign multiKey if there's any
          if (this.multiKey) {
            field.multiKey = this.multiKey;
            field.multiIndex = this.rowIndexMultiple;
            // if (this.values[this.rowIndexMultiple] && this.values[this.rowIndexMultiple][this.multiKey]) {
            //   field.value = this.values[this.rowIndexMultiple][this.multiKey]
            // }
          }

          //Assign value from values source, or else assign default value if it's not in config
          if (this.values && this.values[field.key] !== undefined) {
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
              res[field.rowIndex - 1] = [...cell, { ...field }]; //fucking observers
            } else {
              res[field.rowIndex - 1] = [{ ...field, value: String(field.value)  }];  // TODO wired value bug
              // res[field.rowIndex - 1][0].value = 'temsto'
              // console.log(field)
              // console.log(res[field.rowIndex - 1])
            }
          }          
        });

        let resFiltered = res.filter((field) => field != null); //delete all empty indexes
        resFiltered.splice(resFiltered.length - 1, 0, ...noRowIndexes); //insert unindexed arrays
        return resFiltered;
      };

      let sortedFields = fieldRowSorter(this.fields);
      if (!this.tabs) return sortedFields;

      //Tabs case
      let tabbedFields = [];
      sortedFields.map((row, index) => {
        row.map((field) => {
          const tabIndex = field.tabIndex || 1;
          const cell = tabbedFields[tabIndex - 1];
          if (cell) {
            tabbedFields[tabIndex - 1] = [...cell, { ...field }];
          } else {
            tabbedFields[tabIndex - 1] = [{ ...field }];
          }
        });
      });
      tabbedFields = tabbedFields.filter((field) => field != null);
      const tabbedAndSorted = [];
      // console.log('second loop')
      tabbedFields.map((tab, index) => {
        tabbedAndSorted.push(fieldRowSorter(tab));
      });

      return tabbedAndSorted;
    },
  },
};
</script>

<style>
</style>