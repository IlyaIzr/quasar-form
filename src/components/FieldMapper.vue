<template>
  <div>
    <Stepper
      v-if="tabs"
      :fields="sortedFields"
      :tabs="tabs"
      :settings="settings || false"
      @clear="$emit('clear')"
      @reset="$emit('reset')"
      @submit="$emit('submit')"
    />

    <div
      v-else-if="wrappedFields"
      v-for="row in wrappedFields"
      v-bind:key="wrappedFields.indexOf(row)"
    >
      <q-card flat bordered v-if="row[0]" class="q-pa-sm q-my-sm">
        <div v-for="subRow in row" v-bind:key="row.indexOf(subRow)">
          <FormRow v-if="typeof subRow === 'object'" :row="subRow" />
        </div>
      </q-card>
      <FormRow v-else :row="row[1]" />
    </div>

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
          if (
            this.values &&
            this.values[field.key] !== undefined &&
            !this.multiKey
          ) {
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
              res[field.rowIndex - 1] = [{ ...field, value: field.value }];
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
    wrappedFields() {
      let res = null;
      const wrap = this.settings.wrap;
      if (wrap) {
        res = [];
        this.sortedFields?.map((row) => {
          const thisIndex = row[0]?.rowIndex;
          const needsWrap = wrap.find(
            (wrapItem) => wrapItem.indexOf(thisIndex) > -1
          );
          const prevFieldNeedsWrap = res?.[res.length - 1]?.[0];
          const prevFieldRowIndex = res?.[res.length - 1]?.[1]?.[0]?.rowIndex;
          const prevFieldBelongsToUs =
            needsWrap?.indexOf(prevFieldRowIndex) > -1;
          if (needsWrap) {
            if (prevFieldNeedsWrap && prevFieldBelongsToUs)
              res[res.length - 1].push(row);
            else res.push([true, row]);
          } else res.push([false, row]);
        });
      }
      return res;
    },
  },
  mounted() {
    console.log(this.wrappedFields);
  },
};
</script>

<style>
</style>