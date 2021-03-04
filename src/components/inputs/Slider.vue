<template>
  <div class="q-gutter-md">
    <q-field
      borderless
      ref="input"
      :label="rest.label"
      :rules="rules"
      :value="value"
      :hint="rest.hint"
    >
      <q-slider
        ref="slider"
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
        :class="rest.class + ' input-' + keyName"
        @change="onBlur"
        @input="onInput"
      />
    </q-field>
  </div>
</template>

<script>
import { store } from "../../store";
import { methods, commonMethods } from "./extra";
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
    ...commonMethods,
    ...methods,
    
    checkRules(rules, required) {
      let res;
      if (required) {
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