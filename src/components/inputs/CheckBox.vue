<template>
  <div class="q-gutter-md">
    <q-field
      ref="checkbox"
      v-if="rest.visible === undefined ? true : rest.visible"
      :value="value"
      :rules="rules"
      borderless
      dense
    >
      <template v-slot:control>
        <q-checkbox
          ref="input"
          :value="value"
          :label="rest.label"
          :name="keyName"
          :disable="rest.disable"
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
      value: this.getStoreValue(),
      rules: this.checkRules(
        this.rest.rules,
        this.rest.required === undefined || this.rest.required
      ),
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
      this.$refs.checkbox.validate();
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
      this.storeValue(val);
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
    reset() {
      this.setConfig(this.archiveRest);
      this.setValue(this.archiveRest.value);
      this.$nextTick(function () {
        this.$refs.checkbox.resetValidation();
      });
    },
    clear() {
      this.setValue("");
      this.$nextTick(function () {
        this.$refs.checkbox.resetValidation();
      });
    },
  },
  mounted() {
    this.validate = this.$refs.checkbox.validate
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