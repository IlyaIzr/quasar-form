<template>
  <div class="q-gutter-md">
    <q-select
      :value="valueStore"
      :options="parsedOptions"
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
    label: {
      type: String,
      required: false,
      default: "",
    },
    options: {
      type: Array,
      required: false,
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
      valueStore: this.store.getSelectValue(this.keyName),
    };
  },
  computed: {
    parsedOptions() {
      const arr = [];
      this.options.map((option) => {
        arr.push({ label: option.name, value: option.id });
      });
      return arr;
    },
  },
  methods: {
    onInput(val) {
      // const DBformat = "";
      // if (val.label && val.value) {
      //   return { name: val.label, id: val.value };
      // }
      const noObserver = { ...val };
      this.store.updateKeyValue(this.keyName, noObserver);
      this.valueStore = this.store.getValueByKey(this.keyName);
      this.$emit("input", val);
    },
  },
  mounted() {
    // console.log(this.valueStore);
  },
};
</script>

<style>
</style>