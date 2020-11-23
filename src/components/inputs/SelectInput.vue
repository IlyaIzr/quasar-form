<template>
  <div class="q-gutter-md">
    <q-select
      v-if="rest.visible === undefined ? true : rest.visible"
      ref="input"
      :value="parsedValue"
      :options="parsedOptions"
      :name="keyName"
      :readonly="rest.readonly"
      :disable="rest.disable"
      :label="rest.required ? (rest.label || '') + ' *' : rest.label"
      :rules="rules"
      :clearable="rest.clearable === undefined ? true : rest.clearable"
      v-bind:use-input="
        rest.autocomplete === undefined ? true : rest.autocomplete
      "
      @filter="filterFn"
      @input="input"
      @focus="onFocus"
      @blur="onBlur"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
import { store } from "../../store";
export default {
  name: "SelectInput",
  props: {
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
      rules: this.checkRules(this.rest.rules, this.rest.required),
      parsedOptions: this.parseOptions(this.options),
    };
  },
  computed: {
    parsedValue() {
      let res;
      this.options &&
        this.options.map((option) => {
          const noObserver = { ...option };
          if (this.valueStore === noObserver.id)
            res = { label: noObserver.name, value: noObserver.id };
        });
      // if (!res)
      //   console.log(
      //     "option " + this.valueStore + "wasnt found in options",
      //     this.options
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
    storeValue(val) {
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
      this.valueStore = this.getStoreValue();
    },
    input(val) {
      this.onInput(val);
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
            (val) => val || this.rest.requiredMessage || "Please select option",
            ...this.rest.rules,
          ];
        } else
          res = [
            (val) => val || this.rest.requiredMessage || "Please select option",
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
    setOptions(options) {
      this.parsedOptions = options;
    },
    parseOptions(options) {
      const arr = [];
      options.map((option) => {
        const noObserver = { ...option };
        arr.push({ label: noObserver.name, value: noObserver.id });
      });
      return arr;
    },
    filterFn(input, update) {
      if (input === "") {
        update(() => {
          this.parsedOptions = this.parseOptions(this.options);
        });
        return;
      }

      update(() => {
        const needle = input.toLocaleLowerCase();
        let parsedOptions = this.parsedOptions.filter((v) => {
          console.log(v);
          if (v.label.toLocaleLowerCase().indexOf(needle) > -1) {
            return v;
          }
        });
        this.parsedOptions = parsedOptions;
      });
    },
  },
};
</script>

<style>
</style>