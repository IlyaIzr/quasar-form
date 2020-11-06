<template>
  <div>
    <p class="text-subtitle1 q-mb-none">{{ label }}</p>
    <div v-for="(item, index) in valueStore" v-bind:key="item.key" class="col">
      <FieldMapper
        :fields="rest.fields"
        :multiKey="multiKey"
        :values="valueStore[index]"
        :rowIndexMultiple="Number(index)"
      />
      <div class="col text-right">
        <q-btn
          class="q-my-sm"
          size="small"
          :label="buttons.deleteField.text || 'x'"
          :color="buttons.deleteField.color || 'red'"
          :text-color="buttons.deleteField.textColor || 'white'"
          :disable="buttons.deleteField.disabled"
          @click="deleteField(index)"
        />
      </div>
    </div>
    <q-btn
      :label="buttons.addField.text || '+'"
      :color="buttons.addField.color || 'green'"
      :text-color="buttons.addField.textColor"
      :disable="buttons.addField.disabled"
      @click="addField"
    />
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
      buttons: this.rest.buttons
        ? this.rest.buttons
        : { addField: {}, deleteField: {} },
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