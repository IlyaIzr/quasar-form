<template>
  <div class="q-gutter-md">
    <q-select
      v-if="rest.visible === undefined ? true : rest.visible"
      ref="input"
      :value="value"
      :name="keyName"
      :readonly="rest.readonly"
      :disable="rest.disable"
      :label="rest.label"
      :rules="rules"
      :clearable="rest.clearable === undefined ? true : rest.clearable"
      clear-icon="close"
      use-chips
      use-input
      multiple
      hide-dropdown-icon
      input-debounce="0"
      new-value-mode="add-unique"
      @input="input"
      @focus="onFocus"
      @blur="onBlur"
    >
    </q-select>
  </div>
</template>

<script>
import { store, optionsStore } from "../../store";
export default {
  name: "SelectCreatable",
  props: {
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
      value: this.getStoreValue() || null,
      rules: this.checkRules(
        this.rest.rules,
        this.rest.required === undefined || this.rest.required
      ),
      archiveRest: { ...this.rest },
    };
  },
  methods: {
    storeValue(val) {
      if (this.rest.multiKey)
        store.updateKeyValue(
          this.keyName,
          val,
          this.rest.multiKey,
          this.rest.multiIndex
        );
      else store.updateKeyValue(this.keyName, val);
      this.value = this.getStoreValue();
    },
    input(val) {      
      this.storeValue(val);
      this.$emit("input", val);
    },
    onInput(val) {
      this.storeValue(val);
      this.$emit("input", val);
    },
    onFocus(e) {
      this.$emit("focus", e);
    },
    onBlur(e) {
      this.$emit("blur", e);
    },
    checkRules(rules, required) {
      let res;
      if (required) {
        if (typeof rules === "object") {
          res = [
            (val) =>
              val ||
              this.rest.requiredMessage ||
              "Please select option",
            ...this.rest.rules,
          ];
        } else
          res = [
            (val) =>
              Boolean(val) ||
              this.rest.requiredMessage ||
              "Please select option",
          ];
      } else res = this.rest.rules;
      return res;
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
      if (res === "") res = null
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
    reset() {
      this.setConfig(this.archiveRest);
      this.setOptions(this.archiveRest.options);
      this.setValue(this.archiveRest.value);
      this.$nextTick(function () {
        this.$refs.input.resetValidation();
      });
    },
    clear() {
      this.setValue("");
      this.$nextTick(function () {
        this.$refs.input.resetValidation();
      });
    },
  },
  mounted() {
    this.validate = this.$refs.input.validate;
    if (this.rest.hasOwnProperty("visible") && !this.rest.visible) {
      this.$parent.$el.parentNode.className += " hidden";
    }
  },
  watch: {
    "store.state.watcher": function () {
      const val = this.getStoreValue();
      if (val !== this.value) {
        this.value = val;
      }
    },
    "this.rest.visible": function () {
      if (this.rest.hasOwnProperty("visible") && !this.rest.visible) {
        this.$parent.$el.parentNode.className += " hidden";
      }
    },
  },
};
</script>

<style>
</style>