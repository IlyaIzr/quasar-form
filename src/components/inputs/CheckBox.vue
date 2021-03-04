<template>
  <div class="q-gutter-md">
    <q-field
      ref="input"
      :value="value"
      :rules="rules"
      :hint="rest.hint"
      borderless
      dense
    >
      <template v-slot:control>
        <q-checkbox
          v-bind="filtered"
          :value="value"
          :class="rest.class + ' input-' + keyName"
          @focus="onFocus"
          @blur="onBlur"
          @input="input"
          :rules="rules"
        />
      </template>
    </q-field>
  </div>
</template>

<script>
import {
  methods,
  commonMethods,
  mountedCommon,
  watchers,
  stringRules,
  computed,
} from "./extra";

export default {
  name: "CheckBox",
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
    
    onInput(val) {
      this.storeValue(val);
      this.$refs.input.validate();
      this.$emit("input", val);
    },
    // getStoreValue() {  // Watch it
    //   let res;
    //   if (this.rest.multiKey)
    //     res = store.getValueByKey(
    //       this.keyName,
    //       this.rest.multiKey,
    //       this.rest.multiIndex
    //     );
    //   else res = store.getValueByKey(this.keyName);
    //   if (Array.isArray(res) && !res.length) res = false;
    //   return Boolean(res);
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