<template>
  <div class="q-gutter-md">
    <q-input
      :value="valueStore"
      :label="label"
      :type="type"
      :rest="rest"
      :name="keyName"
      :required="required"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      :rules="rest.rules"
    />
  </div>
</template>

<script>
import { store } from "../../store";
export default {
  name: "SimpleInput",
  props: {
    type: {
      type: String,
      required: false,
      default: "text",
    },
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
      required:
        this.rest.required === undefined ? false : this.rest.required,
    };
  },
  methods: {
    async onFocus(e) {
      this.$emit("focus", e);
    },
    async onBlur(e) {
      this.$emit("blur", e);
    },
    async onInput(val) {      
      store.updateKeyValue(this.keyName, val);
      this.valueStore = store.getValueByKey(this.keyName);
      this.$emit("input", val);
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