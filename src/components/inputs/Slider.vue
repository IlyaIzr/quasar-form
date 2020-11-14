<template>
  <div class="q-gutter-md">
    <q-field
      borderless
      :label="rest.required ? (rest.label || '') + ' *' : rest.label"
      :rules="rules"
      :value="valueStore"
    >
      <q-slider
        v-if="rest.visible === undefined ? true : rest.visible"
        ref="input"
        :value="valueStore"
        :name="keyName"
        :min="rest.min"
        :max="rest.max"
        :label="rest.showValue"
        :step="0.01 && rest.step"
        :reverse="rest.reverse || false"
        :vertical="rest.vertical"
        :disable="rest.disable"
        :readonly="rest.readonly"
        :color="rest.color"
        :label-color="rest.labelColor"
        :label-text-color="rest.labelTextColor"
        @change="onChange"
        @input="onInput"
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
      valueStore: Number(this.getStoreValue()),
      rules: this.checkRules(this.rest.rules, this.rest.required),
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
    checkRules(rules, required) {
      let res;
      if (required) {
        if (typeof rules === "object") {
          res = [
            // typeof because input stuff gives me [] as def empty value
            (val) =>
              Number(val) > 0 || this.rest.requiredMessage || "Please fill",
            ...this.rest.rules,
          ];
        } else
          res = [
            (val) =>
              Number(val) || this.rest.requiredMessage || "Please fill",
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