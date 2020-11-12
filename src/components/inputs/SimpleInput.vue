<template>
  <div class="q-gutter-md">
    <q-input
      ref="input"
      :value="valueStore"
      :label="rest.label"
      :type="type"
      :name="keyName"
      :required="rest.required"
      :mask="rest.mask"
      :fill-mask="rest.fillMask || false"
      :reverse-fill-mask="rest.reverseFill"
      :clearable="rest.clearable"
      :prefix="rest.prefix"
      :suffix="rest.suffix"
      :autogrow="rest.autogrow || true"
      :hint="rest.hint"
      :readonly="rest.readonly"
      :disable="rest.disable"
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
    setProp(arg1 = "", arg2) {
      if (arguments.length === 2) {
        if (arg1) this.rest[arg1] = arg2;
        else console.log("WARNING! No name provided!");
      } else if (arguments.length === 1) {
        if (arg1 && typeof arg1 === "object") {
          for (const [key, value] of Object.entries(arg1)) {
            this.rest[key] = value;
          }
        } else console.log("WARNING! No value object provided!");
      }
      this.$forceUpdate();
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