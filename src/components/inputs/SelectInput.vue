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
      :label="rest.label"
      :rules="rules"
      :clearable="rest.clearable === undefined ? true : rest.clearable"
      v-bind:use-input="
        rest.autocomplete === undefined && rest.multiple === undefined
          ? true
          : rest.autocomplete
      "
      :multiple="rest.multiple"
      @input="input"
      @input-value="inputValue"
      @focus="onFocus"
      @blur="onBlur"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            {{ rest.noResultsMsg || "Нет результатов" }}
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
import { store, optionsStore } from "../../store";
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
      value: this.getStoreValue(),
      localOptions: this.getStoreOptions(),
      rules: this.checkRules(
        this.rest.rules,
        this.rest.required === undefined || this.rest.required
      ),
      archiveRest: { ...this.rest },
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
      let res = [];
      this.localOptions &&
        this.localOptions.map((option) => {
          const noObserver = { ...option };
          // CASE single value
          if (this.value === noObserver.id)
            res = { label: noObserver.name, value: noObserver.id };
          // CASE multivalue
          else if (
            typeof this.value === "object" &&
            this.value.hasOwnProperty(length)
          ) {
            let ops = this.value.filter((value) => value === noObserver.id);
            if (ops[0])
              res.push({ label: noObserver.name, value: noObserver.id });
          }
        });
      // if (!res)
      //   console.log(
      //     "option " + this.value + "wasnt found in options",
      //     this.localOptions
      //   );
      return res;
    },
  },
  methods: {
    storeValue(val) {
      let noObserver =
        val && typeof val === "object"
          ? val.length === undefined
            ? { ...val }
            : [...val]
          : "";
      // handle object
      if (noObserver.value) {
        noObserver = noObserver.value;
      }
      // handle array   of object values
      if (typeof noObserver === "object" && noObserver.hasOwnProperty(length)) {
        let res = [];
        noObserver.forEach((option) => res.push(option.value));
        noObserver = res;
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
      else store.updateKeyValue(this.keyName, noObserver);
      this.value = this.getStoreValue();
    },
    storeOptions(val) {
      let noObserver = val ? [...val] : [];
      if (this.rest.multiKey)
        optionsStore.setOptions(
          this.keyName,
          noObserver,
          this.rest.multiKey,
          this.rest.multiIndex
        );
      else optionsStore.setOptions(this.keyName, noObserver);
    },
    input(val) {
      this.onInput(val);
    },
    inputValue(val) {
      const needle = val.toLocaleLowerCase();
      let newOptions = this.getStoreOptions();
      if (val)
        newOptions = this.localOptions.filter((v) => {
          if (v.name.toLocaleLowerCase().indexOf(needle) > -1) {
            return v;
          }
        });
      this.localOptions = newOptions;
      this.$nextTick(function () {
        this.$refs.input.resetValidation();
      });
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
        this.rest.label = this.rest.label ? this.rest.label + " *" : " *";
        if (typeof rules === "object") {
          res = [
            (val) =>
              (val.value && val.value.length) ||
              this.rest.requiredMessage ||
              "Please select option",
            ...this.rest.rules,
          ];
        } else
          res = [
            (val) =>
              (val.value && val.value.length) ||
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
      return res;
    },
    getStoreOptions() {
      let res;
      if (this.rest.multiKey)
        res = optionsStore.getOptions(
          this.keyName,
          this.rest.multiKey,
          this.rest.multiIndex
        );
      else res = optionsStore.getOptions(this.keyName);
      return res;
    },
    setOptions(options) {
      optionsStore.setOptions(this.keyName, options);
      this.localOptions = options;
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
  watch: {
    "store.state.watcher": function () {
      const val = this.getStoreValue();
      if (val !== this.value) {
        this.value = val;
      }
    },
  },
};
</script>

<style>
</style>