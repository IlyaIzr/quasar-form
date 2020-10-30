<template>
  <div class="q-gutter-md">
    <q-select
      :value="valueStore"
      :options="options"
      @input="onInput"
      :name="keyName"
      :label="label"
      :rest="rest"
    />
  </div>
</template>

<script>
export default {
  name: "SelectInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: false,
    },
    options: {
      type: Array,
      default: [],
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
      valueStore: this.store.getValueByKey(this.keyName),
    };
  },
  methods: {
    onInput(val) {
      this.store.updateKeyValue(this.rest.keyName, val);
      this.valueStore = this.store.getValueByKey(this.rest.keyName);
      this.$emit("input", val);
    },
  },
};
</script>

<style>
</style>