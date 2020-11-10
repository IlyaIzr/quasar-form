<template>
  <div class="q-gutter-md">
    <q-input
      ref="input"
      :value="valueStore"
      :label="label"
      :type="type"
      :rest="rest"
      :name="keyName"
      :required="required"
      :mask="rest.mask"
      :fill-mask="rest.fillMask || false"
      :reverse-fill-mask="rest.reverseFill"
      :clearable="rest.clearable"
      :prefix="rest.prefix"
      :suffix="rest.suffix"
      :autogrow="rest.autogrow || true"
      :hint="rest.hint"
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
      valueStore: this.getStoreValue(),
      required: this.rest.required === undefined ? false : this.rest.required,
    };
  },
  methods: {
    onFocus(e) {
      this.$emit("focus", e);
    },
    onBlur(e) {
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