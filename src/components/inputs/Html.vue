<template>
  <div class="q-gutter-md">
    <q-card-section
      v-bind="filtered"
      ref="input"
      :class="rest.class + ' input-' + keyName"
      v-html="value"
      @focus="onFocus"
    />
  </div>
</template>

<script>
import {
  methods,
  commonMethods,
  watchers,
  mountedCommon,
  computed,
} from "./extra";

export default {
  name: "Html",
  props: {
    keyName: {
      type: String,
      required: true,
    },
    rest: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      value: this.getStoreValue(),
      archiveRest: { ...this.rest },
    };
  },
  computed: {
    ...computed,
  },

  methods: {
    ...commonMethods,
    ...methods,
    // reset() {
    //   this.setConfig(this.archiveRest);
    //   this.setValue(this.archiveRest.value);
    // },
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