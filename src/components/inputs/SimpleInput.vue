<template>
  <div class="q-gutter-md">
    <q-input
      v-if="rest.visible === undefined ? true : rest.visible"
      ref="input"
      :value="valueStore"
      :label="rest.required ? (rest.label || '') + ' *' : rest.label"
      :type="type"
      :name="keyName"
      :mask="rest.mask"
      :fill-mask="rest.fillMask || false"
      :reverse-fill-mask="rest.reverseFill"
      :unmasked-value="rest.unmaskedValue"
      :clearable="rest.clearable === undefined ? true : rest.clearable"
      :prefix="rest.prefix"
      :suffix="rest.suffix"
      :autogrow="rest.autogrow"
      :hint="rest.hint"
      :readonly="rest.readonly"
      :disable="rest.disable"
      @focus="onFocus"
      @blur="onBlur"
      @input="input"
      :rules="rules"
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
      rules: this.checkRules(this.rest.rules, this.rest.required),
      archiveRest: { ...this.rest },
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
      this.storeValue(val);
      this.$emit("input", val);
    },
    input(val) {
      this.onInput(val);
    },
    storeValue(val) {
      if (this.rest.multiKey)
        store.updateKeyValue(
          this.keyName,
          val,
          this.rest.multiKey,
          this.rest.multiIndex
        );
      else store.updateKeyValue(this.keyName, val);
      this.valueStore = this.getStoreValue();
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
    setConfig(arg1 = "", arg2) {
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
    setValue(val) {
      this.storeValue(val);
    },
    checkRules(rules, required) {
      let res;
      if (required) {
        if (typeof rules === "object") {
          res = [
            // typeof because input stuff gives me [] as def empty value
            (val) =>
              (val && typeof val === "string") ||
              this.rest.requiredMessage ||
              "Please fill",
            ...this.rest.rules,
          ];
        } else
          res = [
            (val) =>
              (val && typeof val === "string") ||
              this.rest.requiredMessage ||
              "Please fill",
          ];
      } else res = this.rest.rules;
      return res;
    },
    reset() {
      this.setConfig(this.archiveRest)
      this.setValue(this.archiveRest.value)
      this.$nextTick(function(){
        this.$refs.input.resetValidation()
      })
    },
    clear(){
      this.setValue('')
      this.$nextTick(function(){
        this.$refs.input.resetValidation()
      })
    }
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