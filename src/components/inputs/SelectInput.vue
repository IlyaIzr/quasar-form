<template>
  <div class="q-gutter-md">
    <q-select
      ref="input"
      :value="parsedValue"
      :options="parsedOptions"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      :name="keyName"
      :label="label"
      :rest="rest"
      :rules="rules"
    />
  </div>
</template>

<script>
import { store } from "../../store";
export default {
  name: "SelectInput",
  props: {
    value: {
      type: String || Object,
      required: false,
      default: "",
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    options: {
      type: Array,
      required: false,
      default: [],
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
      valueStore: this.store.getValueByKey(this.keyName),
      localOptions: this.options,
      rules: this.checkRules(this.rest.rules, this.rest.required),
    };
  },
  computed: {
    parsedOptions() {
      const arr = [];
      this.localOptions.map((option) => {
        const noObserver = { ...option };
        arr.push({ label: noObserver.name, value: noObserver.id });
      });
      return arr;
    },
    parsedValue() {
      let res;
      this.localOptions &&
        this.localOptions.map((option) => {
          const noObserver = { ...option };
          if (this.valueStore === noObserver.id)
            res = { label: noObserver.name, value: noObserver.id };
        });
      // if (!res)
      //   console.log(
      //     "option " + this.valueStore + "wasnt found in options",
      //     this.localOptions
      //   );
      return res;
    },
  },
  methods: {
    input(val) {
      // console.log("val of", val);
      let noObserver = val && typeof val === "object" ? { ...val } : "";
      if (noObserver.value) {
        noObserver = noObserver.value;
      }
      // handle string
      if (typeof val === "string") noObserver = val;
      // console.log("returned reselut of ", noObserver);

      this.store.updateKeyValue(this.keyName, noObserver);
      this.valueStore = this.store.getValueByKey(this.keyName);
    },
    onInput(val) {
      this.input(val);
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
          res = [(val) => val || "Please select option", ...this.rest.rules];
        } else res = [(val) => val || "Please select option"];
      } else res = this.rest.rules;
      return res;
    },
  },
  watch: {
    "store.state.watcher": function () {
      const val = store.getValueByKey(this.keyName);
      if (val !== this.valueStore) {
        this.valueStore = val;
      }
    },
  },
};
</script>

<style>
</style>