<template>
  <div class="q-gutter-md">
    <input type="text" :value="valueStore" @input="onInput" />
    <br />
    Store mini message: {{ store.state.msg }}
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
      console.log("extra called");
    },
    onChange(e) {
      // console.log("change event triggered");
    },
    onInput(val) {
      this.store.updateKeyValue(this.rest.key, val.target.value);
      this.valueStore = this.store.getValueByKey(this.rest.key);
      this.$emit('customevent', val.target.value)
    },
  },
  computed: {
    // valueStore: {
    //   get() {
    //     console.log(this.rest)
    //     return store.getValueByKey(this.rest.key);
    //   },
    // set(value) {
    //   store.updateKeyValue(this.rest.key, value);
    // },
    // },
  },
};
</script>

<style>
</style>