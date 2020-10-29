<template>
  <div class="q-gutter-md">
    <q-input
      :value="valueStore"
      :label="label"
      :type="type"
      :rest="rest"
      :name="rest.key"
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
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      required: false,
    },
    rest: {
      type: Object,
      required: false,
    },
    store: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      valueStore: this.store.getValueByKey(this.rest.key)
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
      this.store.updateKeyValue(this.rest.key, val);
      this.valueStore = this.store.getValueByKey(this.rest.key);
      this.$emit('customevent', val)
    },
  }
};
</script>

<style>
</style>