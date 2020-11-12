<template>
  <div class="q-gutter-md">
    <q-select
      ref="input"
      :value="parsedValue"
      :options="parsedOptions"
      :name="keyName"
      :readonly="rest.readonly"
      :disable="rest.disable"
      :label="rest.label"
      :rules="rules"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
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
      valueStore: this.getStoreValue(),
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
    setProp(name = "", value) {
      if (!name) console.log("WARNING! No prop name was given");
      this.rest[name] = value;
      this.$forceUpdate();
    },
  },
  methods: {
    input(val) {
      let noObserver = val && typeof val === "object" ? { ...val } : "";
      if (noObserver.value) {
        noObserver = noObserver.value;
      }
      // handle string
      if (typeof val === "string") noObserver = val;

      if (this.rest.multiKey)
        store.updateKeyValue(
          this.keyName,
          noObserver,
          this.rest.multiKey,
          this.rest.multiIndex
        );
      else this.store.updateKeyValue(this.keyName, noObserver);
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