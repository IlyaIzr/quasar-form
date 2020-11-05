<template>
  <div class="q-gutter-md">
    <q-field borderless  :label="label">
      <q-slider
        ref="input"
        :value="valueStore"
        :name="keyName"
        :min="rest.min"
        :max="rest.max"
        :label="rest.showValue"
        :step="0.01 && rest.step"
        :reverse="rest.reverse"
        :vertical="rest.vertical"
        :disable="rest.disable"
        :readonly="rest.readonly"
        :color="rest.color"
        :label-color="rest.labelColor"
        :label-text-color="rest.labelTextColor"
        @change="onChange"
        @input="onInput"
        :rules="rest.rules"
      />
    </q-field>
  </div>
</template>

<script>
import { store } from "../../store";
export default {
  name: "Slider",
  props: {
    label: {
      type: String,
      required: false,
      default: "",
    },
    keyName: {
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
      valueStore: this.getStoreValue(),
      required: this.rest.required === undefined ? false : this.rest.required,
    };
  },
  methods: {
    onChange(e) {
      this.$emit("blur", e);
    },
    onInput(val) {
      this.input(val);
      this.$emit("input", val);
    },
    input(val) {      
      if (this.rest.multiKey)
        store.updateKeyValue(
          this.keyName,
          val,
          this.rest.multiKey,
          this.rest.multiIndex
        );
      else store.updateKeyValue(this.keyName, val);
    },    
    getStoreValue() {
      let res;
      if (this.rest.multiKey)
        res = store.getValueByKey(
          this.keyName,
          this.rest.multiKey,
          this.rest.multiIndex
        );
      else res = store.getValueByKey(this.keyName);
      return res;
    },
  },
  watch: {
    "store.state.watcher": function () {
      const val = this.getStoreValue();
      if (val !== this.valueStore) {
        this.valueStore = val;
      }
    },
  },
};
</script>

<style>
</style>