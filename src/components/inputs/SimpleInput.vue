<template>
  <div class="q-gutter-md">
    <q-input
      :value="valueStore"
      :label="label"
      :type="type"
      :rest="rest"
      :name="keyName"
      @focus="onFocusLocal"
      @change="onChange"
      @input="onInput"
    />
  </div>
</template>

<script>
export default {
  name: "SimpleInput",
  props: {
    type: {
      type: String,
      required: false,
      default: "text",
    },
    label: {
      type: String,
      required: false,
      default: '',
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
      valueStore: this.store.getValueByKey(this.keyName)
    };
  },
  methods: {
    onFocusLocal() {
      const res = this.rest && this.rest.onFocus && this.rest.onFocus();
      res && res(this);
    },
    extraMethod() {
      // console.log("extra called");
    },
    onChange(e) {
      // console.log("change event triggered");
    },
    onInput(val) {
      this.store.updateKeyValue(this.keyName, val);
      this.valueStore = this.store.getValueByKey(this.keyName);
      this.$emit('input', val)
    },
  }
};
</script>

<style>
</style>