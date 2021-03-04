<template>
  <div class="q-gutter-md">
    <q-card-section
      v-bind="filtered"
      ref="editor"
      :class="rest.class + ' input-' + keyName"
      v-html="value"
      @focus="onFocus"
    />
  </div>
</template>

<script>
import { methods, commonMethods } from "./extra";
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
    filtered() {
      let res = {};
      res = { ...this.rest };
      for (const [key, value] of Object.entries(res)) {
        if (typeof value === "function") delete res[key];
      }
      delete res.ref;
      return res;
    },
  },

  methods: {
    ...commonMethods,
    ...methods,
    // reset() {
    //   this.setConfig(this.archiveRest);
    //   this.setValue(this.archiveRest.value);
    // },
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