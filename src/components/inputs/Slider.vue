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
        tabindex="0"
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
      valueStore: store.getValueByKey(this.keyName),
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
      store.updateKeyValue(this.keyName, val);
      this.valueStore = store.getValueByKey(this.keyName);
    },
  },
  watch: {
    "store.state.watcher": function () {
      const val = store.getValueByKey(this.keyName);
      if (val !== this.valueStore) {
        this.valueStore = val;
      }
    },
  },
};
</script>

<style>
</style>