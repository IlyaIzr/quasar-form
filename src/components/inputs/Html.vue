<template>
  <div class="q-gutter-md">
    <q-card-section
      v-if="rest.visible === undefined ? true : rest.visible"
      ref="editor"
      :name="keyName"
      :disable="rest.disable"
      v-html="valueStore"
      @focus="onFocus"
    />
  </div>
</template>

<script>
import { store } from "../../store";
export default {
  name: "Html",
  props: {
    keyName: {
      type: String,
      required: true,
    },
    rest: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      valueStore: this.getStoreValue(),
    };
  },

  methods: {
    onFocus(e) {
      this.$emit("focus", e);
    },
    getStoreValue() {
      let res;
      if (this.rest.multiKey)
        res = store.getValueByKey(
          this.keyName,
          this.rest.multiKey,
          this.rest.multiIndex
        );
      else res = store.getValueByKey(this.keyName);
      return res;
    },
    setConfig(arg1 = "", arg2) {
      if (arguments.length === 2) {
        if (arg1) this.rest[arg1] = arg2;
        else console.log("WARNING! No name provided!");
      } else if (arguments.length === 1) {
        if (arg1 && typeof arg1 === "object") {
          for (const [key, value] of Object.entries(arg1)) {
            this.rest[key] = value;
          }
        } else console.log("WARNING! No value object provided!");
      }
      this.$forceUpdate();
    },
    setValue(val) {
      this.input(val);
      this.$emit("input", val);
      this.valueStore = val;
      this.$forceUpdate();
    },
    // checkRules(rules, required) {
    //   let res;
    //   if (required) {
    //     if (typeof rules === "object") {
    //       res = [
    //         // typeof because input stuff gives me [] as def empty value
    //         (val) => (val && typeof val === 'string')  || this.rest.requiredMessage || "Please fill",
    //         ...this.rest.rules,
    //       ];
    //     } else res = [(val) => (val && typeof val === 'string') || this.rest.requiredMessage || "Please fill"];
    //   } else res = this.rest.rules;
    //   return res;
    // },
  },
  watch: {
    "store.state.watcher": function () {
      const val = this.getStoreValue();
      if (val !== this.valueStore) {
        this.valueStore = val;
      }
    },
  },
};
</script>

<style>
</style>