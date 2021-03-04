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
import {
  methods,
  commonMethods,
  watchers,
  mountedCommon,
  computed,
} from "./extra";

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
    ...computed,
  },
  methods: {
    ...commonMethods,
    ...methods,
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