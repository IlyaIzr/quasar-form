<template>
  <div class="q-gutter-md">
    <p class="text-subtitle1 q-mb-none">{{ rest.label }}</p>
    <q-editor
      v-bind="filtered"
      :value="value"
      :class="rest.class + ' input-'+keyName"
      @focus="onFocus"
      @blur="onBlur"
      @input="input"
      :placeholder="rest.placeholder"
    />
    <!-- TODO clearable btn -->
  </div>
</template>

<script>
import { methods, commonMethods, watchers, mountedCommon } from "./extra";
export default {
  name: "Editor",
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
      lang: this.rest.localization || "ru",
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
    clear() {
      this.setValue("");
    },
  },
  mounted() {
    mountedCommon(this)
  },
  watch: {
    ...watchers
  },
};
</script>

<style>
</style>