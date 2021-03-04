<template>
  <div class="q-gutter-md">
    <q-file
      bottom-slots
      v-bind="filtered"
      :class="rest.class + ' input-' + keyName"
      @blur="onBlur"
      @input="input"
    >
      <template v-slot:prepend>
        <q-icon name="cloud_upload" @click.stop />
      </template>

      <template v-slot:hint> {{ rest.hint }} </template>
    </q-file>
  </div>
</template>

<script>
import { methods, commonMethods } from "./extra";
export default {
  name: "File",
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
  },
  mounted() {
    this.validate = this.$refs.input.validate;
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