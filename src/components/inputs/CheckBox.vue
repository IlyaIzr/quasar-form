<template>
  <div class="q-gutter-md">
    <q-field
      ref="input"
      :value="value"
      :rules="rules"
      :hint="rest.hint"
      borderless
      dense
    >
      <template v-slot:control>
        <q-checkbox
          v-bind="filtered"
          :value="value"
          :class="rest.class + ' input-' + keyName"
          @focus="onFocus"
          @blur="onBlur"
          @input="input"
          :rules="rules"
        />
      </template>
    </q-field>
  </div>
</template>

<script>
import { methods, commonMethods } from "./extra";
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
      value: this.getStoreValue(),
      rules: this.checkRules(
        this.rest.rules,
        this.rest.required === undefined || this.rest.required
      ),
      archiveRest: { ...this.rest },
    };
  },
  computed: {
    filtered() {
      let res = {};
      res = { ...this.rest };
      for (const [key, value] of Object.entries(res)) {
        if (typeof value === "function") delete res[key];
      }
      return res;
    },
  },
  methods: {
    ...commonMethods,
    ...methods,
    onInput(val) {
      this.storeValue(val);
      this.$refs.input.validate();
      this.$emit("input", val);
    },
    // getStoreValue() {  // Watch it
    //   let res;
    //   if (this.rest.multiKey)
    //     res = store.getValueByKey(
    //       this.keyName,
    //       this.rest.multiKey,
    //       this.rest.multiIndex
    //     );
    //   else res = store.getValueByKey(this.keyName);
    //   if (Array.isArray(res) && !res.length) res = false;
    //   return Boolean(res);
    // },
    checkRules(rules, required) {
      let res;
      if (required) {
        if (typeof rules === "object") {
          res = [
            (val) => Boolean(val) || this.rest.requiredMessage || "Please fill",
            ...this.rest.rules,
          ];
        } else
          res = [
            (val) => Boolean(val) || this.rest.requiredMessage || "Please fill",
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