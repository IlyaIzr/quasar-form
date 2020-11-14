<template>
  <div class="q-gutter-md">
    <q-field
      ref="checkbox"
      v-if="rest.visible === undefined ? true : rest.visible"
      :value="valueStore"
      :rules="rules"
      borderless
      dense
    >
      <template v-slot:control>
        <q-checkbox
          ref="input"
          :value="valueStore"
          :label="rest.required ? (rest.label || '') + ' *' : rest.label"
          :name="keyName"
          :disable="rest.disable"
          @focus="onFocus"
          @blur="onBlur"
          @input="onInput"
          :rules="rules"
        />
      </template>
    </q-field>
  </div>
</template>

<script>
import { store } from "../../store";
export default {
  name: "CheckBox",
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
      valueStore: this.getStoreValue(),
      rules: this.checkRules(this.rest.rules, this.rest.required),
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
      this.$refs.checkbox.validate();
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
      if (Array.isArray(res) && !res.length) res = false;
      return Boolean(res);
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
      this.input(val);
      this.$emit("input", val);
      this.valueStore = val;
      this.$forceUpdate();
    },
    checkRules(rules, required) {
      let res;
      if (required) {
        if (typeof rules === "object") {
          res = [
            // typeof because input stuff gives me [] as def empty value
            (val) =>
              (val && typeof val === "boolean") ||
              this.rest.requiredMessage ||
              "Please fill",
            ...this.rest.rules,
          ];
        } else
          res = [
            (val) =>
              (val && typeof val === "boolean") ||
              this.rest.requiredMessage ||
              "Please fill",
          ];
      } else res = this.rest.rules;
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