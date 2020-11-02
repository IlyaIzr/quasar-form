<template>
  <div class="q-gutter-md">
    <q-select
      :value="parsedValue"
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
    value: {
      type: String || Object,
      required: false,
      default: "",
    },
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
      valueStore: this.store.getValueByKey(this.keyName),
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
    parsedValue(){
      let res;
      this.localOptions && this.localOptions.map((option) => {
        const noObserver = {...option};
        if (this.valueStore === noObserver.id)
          res = { label: noObserver.name, value: noObserver.id };
      });
      // if (!res)
      //   console.log(
      //     "option " + this.valueStore + "wasnt found in options",
      //     this.localOptions
      //   );
      return res;
    }
  },
  methods: {
    onInput(val) {
      // console.log("val of", val);
      let noObserver = val && typeof val === "object" ? { ...val } : "";
      if (noObserver.value) {
        noObserver = noObserver.value;
      }
      // handle string
      if (typeof val === "string") noObserver = val;
      // console.log("returned reselut of ", noObserver);

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