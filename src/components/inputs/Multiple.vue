<template>
  <div>
    <p class="text-subtitle1 q-mb-none">{{ label }}</p>
    <div v-for="(item, index) in valueStore" v-bind:key="item.key" class="col">
      <FieldMapper
        :fields="rest.fields"
        :multiKey="multiKey"
        :values="rest.value[index]"
        :rowIndexMultiple="Number(index)"
      />
      <q-btn label="x" color="red" @click="deleteField(index)" />
    </div>
    <q-btn label="Add" color="teal" @click="addField" />
  </div>
</template>

<script>
import FieldMapper from "../FieldMapper";
import { store } from "../../store";
export default {
  name: "Multiple",
  components: {
    FieldMapper: () => import("../FieldMapper.vue"),
  },
  props: {
    label: {
      type: String,
      required: false,
      default: "",
    },
    multiKey: {
      type: String,
      required: true,
    },
    rest: {
      type: Object,
      required: true,
    },
    store: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      valueStore: this.store.getValueByKey(this.multiKey),
      // rules: this.checkRules(this.rest.rules, this.rest.required),
    };
  },
  methods: {
    deleteField(index) {
      let res = [...this.valueStore];
      res.splice(index, 1);
      this.valueStore = res;
      store.deleteMultiField(this.multiKey, index);
    },
    addField() {
      let fields = this.valueStore;
      let res = {};
      for (const [key, value] of Object.entries(this.rest.value[0])) {
        res[key] = "";
      }
      fields.push(res);
      this.valueStore = fields;
      store.updateKeyValue(this.multiKey, fields);
    },
  },
  watch: {
    "store.state.watcher": function () {
      const val = this.store.getValueByKey(this.multiKey);
      if (val !== this.valueStore) {
        this.valueStore = val;
      }
    },
  },
};
</script>

<style>
</style>