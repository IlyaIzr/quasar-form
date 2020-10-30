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
      localOptions: this.options,
    };
  },
  computed: {
    parsedOptions() {
      const arr = [];
      this.localOptions.map((option) => {
        const noObserver = { ...option };
        arr.push({ label: noObserver.name, value: noObserver.id });
      });
      return arr;
    },
  },
  methods: {
    onInput(val) {
      const noObserver = val && typeof (val === "object") ? { ...val } : "";
      if (noObserver.id && noObserver.name) {
        noObserver.value = noObserver.id;
        noObserver.label = noObserver.name;
        delete noObserver.id;
        delete noObserver.name;
      }

      this.store.updateKeyValue(this.keyName, noObserver);
      this.valueStore = this.store.getValueByKey(this.keyName);
      this.$emit("input", val);
    },
    setOptions(options) {
      this.localOptions = options;
    },
  },
  mounted() {
    // console.log(this.valueStore);
  },
};
</script>

<style>
</style>