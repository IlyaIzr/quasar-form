<template>
  <div class="q-gutter-md">
    <q-select
      v-bind="filtered"
      :value="value"
      :rules="rules"
      use-chips
      use-input
      multiple
      hide-dropdown-icon
      input-debounce="0"
      new-value-mode="add-unique"
      :class="rest.class + ' input-' + keyName"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    >
    </q-select>
  </div>
</template>

<script>
import { store } from "../../store";
import {
  methods,
  commonMethods,
  mountedCommon,
  watchers,
  stringRules,
  computed,
} from "./extra";

export default {
  name: "SelectCreatable",
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
      value: this.getStoreValue() || null,
      rules: this.checkRules(
        this.rest.rules,
        this.rest.required === undefined || this.rest.required
      ),
      archiveRest: { ...this.rest },
    };
  },
  computed: {
    ...computed,
  },
  methods: {
    ...commonMethods,
    ...methods,
    ...stringRules,

    getStoreValue() {
      let res;
      if (this.rest.multiKey)
        res = store.getValueByKey(
          this.keyName,
          this.rest.multiKey,
          this.rest.multiIndex
        );
      else res = store.getValueByKey(this.keyName);
      if (res === "") res = null;
      return res;
    },
    reset() {
      this.setConfig(this.archiveRest);
      this.setOptions(this.archiveRest.options);
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