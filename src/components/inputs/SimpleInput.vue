<template>
  <div class="q-gutter-md">
    <q-input
      :value="valueStore"
      :label="label"
      :type="type"
      :rest="rest"
      :name="keyName"
      :required="isRequired"
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
      isRequired:
        this.rest.isRequired === undefined ? false : this.rest.isRequired,
    };
  },
  methods: {
    async onFocus(e) {
      if (this.rest.onFocus) {
        const cb = await this.rest.onFocus(this, e);
        if (cb && typeof cb === "function") cb(this);
      }      
    },
    async onBlur(e) {
      if (this.rest.onBlur) {
        const cb = await this.rest.onBlur(this, e);
        if (cb && typeof cb === "function") cb(this);
      }
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