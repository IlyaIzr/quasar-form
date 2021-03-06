<template>
  <div class="q-gutter-md">
    <q-select
      v-bind="filtered"
      :value="parsedValue"
      :options="parsedOptions"
      :rules="rules"
      :use-chips="Boolean(value && value.length)"
      :use-input="
        rest.writable === undefined && rest.multiple === undefined
          ? true
          : rest.writable
      "
      :class="rest.class + ' input-' + keyName"
      @input="input"
      @input-value="shortOptions"
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
import {
  methods,
  commonMethods,
  watchers,
  mountedCommon,
  computed,
} from "./extra";

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
    ...computed,

    parsedOptions() {
      const arr = [];
      this.localOptions.map((option) => {
        const noObserver = { ...option };
        arr.push({ label: noObserver.name, value: noObserver.id });
      });
      return arr;
    },
    parsedValue() {
      let res = "";
      res = this.parseValue(this.value, this.localOptions);
      return res;
    },
  },
  methods: {
    ...commonMethods,
    ...methods,

    parseValue(value, options) {
      let res = [];
      options &&
        options.map((option) => {
          const noObserver = { ...option };

          // CASE single value
          if (value === noObserver.id)
            res = { label: noObserver.name, value: noObserver.id };
          // CASE multivalue
          else if (typeof value === "object" && value.hasOwnProperty(length)) {
            let ops = value.filter((val) => val === noObserver.id);
            if (ops[0])
              res.push({ label: noObserver.name, value: noObserver.id });
          }
        });
      // if (!res)
      //   console.log(
      //     "option " + value + "wasnt found in options",
      //     options
      //   );
      return res;
    },
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
      if (val && this.rest.multiple) {
        // check what values aren't in current options, to delete them later
        const valToDelete = this.parsedOptions.filter(
          ({ value: id1 }) => !val.some(({ value: id2 }) => id2 === id1)
        );

        const prevValue = this.parseValue(this.value, this.getStoreOptions());

        const filteredPrev = prevValue.filter(
          ({ value: id1 }) => !valToDelete.some(({ value: id2 }) => id2 === id1)
        );

        const connected = filteredPrev.concat(val);

        const uniqueArray = (a) =>
          [...new Set(a.map((o) => JSON.stringify(o)))].map((s) =>
            JSON.parse(s)
          );
        const filtered = uniqueArray(connected);
        this.onInput(filtered);
      } else if (this.rest.multiple) this.onInput([]);
      else this.onInput(val);
    },
    shortOptions(val) {
      const needle = val.toLocaleLowerCase();
      let newOptions = this.getStoreOptions();
      if (val)
        newOptions = this.localOptions.filter((v) => {
          if (v.name.toLocaleLowerCase().indexOf(needle) > -1) {
            return v;
          }
        });
      this.localOptions = newOptions;
      this.$emit("optionInput", val);
      this.$nextTick(function () {
        this.$refs.input?.resetValidation?.();
      });
    },
    checkRules(rules, required) {
      let res;
      if (required) {
        if (typeof rules === "object") {
          res = [
            (val) =>
              (val.value && val.value.length) ||
              (val.length && val[0].value && val[0].value.length) ||
              this.rest.requiredMessage ||
              "Please select option",
            ...this.rest.rules,
          ];
        } else
          res = [
            (val) =>
              (val.value && val.value.length) ||
              (val.length && val[0].value && val[0].value.length) ||
              this.rest.requiredMessage ||
              "Please select option",
          ];
      } else res = this.rest.rules;
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
    reset() {
      this.setConfig(this.archiveRest);
      this.setOptions(this.archiveRest.options); // The only difference to methods
      this.setValue(this.archiveRest.value);
      this.$nextTick(function () {
        this.$refs.input.resetValidation();
      });
    },
  },
  mounted() {
    mountedCommon(this);
  },
  watch: {
    ...watchers,
  },
};
</script>

<style>
</style>