<template>
  <div class="q-gutter-md">
    <q-field
      borderless
      ref="slider"
      :label="rest.label"
      :rules="rules"
      :value="value"
    >
      <q-slider
        v-if="rest.visible === undefined ? true : rest.visible"
        ref="input"
        :value="value"
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
      value: Number(this.getStoreValue()),
      rules: this.checkRules(
        this.rest.rules,
        this.rest.required === undefined || this.rest.required
      ),
      archiveRest: { ...this.rest },
    };
  },
  methods: {
    onChange(e) {
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
      this.value = this.getStoreValue();
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
    setValue(val) {
      this.storeValue(val);
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
    checkRules(rules, required) {
      let res;
      if (required) {
        this.rest.label =
          this.rest.label && !this.rest.label.endsWith(" *")
            ? this.rest.label + " *"
            : " *";
        if (typeof rules === "object") {
          res = [
            (val) =>
              Number(val) > 0 || this.rest.requiredMessage || "Please fill",
            ...this.rest.rules,
          ];
        } else
          res = [
            (val) => Number(val) || this.rest.requiredMessage || "Please fill",
          ];
      } else res = this.rest.rules;
      return res;
    },
    reset() {
      this.setConfig(this.archiveRest);
      this.setValue(this.archiveRest.value);
      this.$nextTick(function () {
        this.$refs.slider.resetValidation();
      });
    },
    clear() {
      this.setValue(0);
      this.$nextTick(function () {
        this.$refs.slider.resetValidation();
      });
    },
  },
  mounted() {
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