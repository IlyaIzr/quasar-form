<template>
  <div class="q-gutter-md">
    <p class="text-subtitle1 q-mb-none">{{ rest.label }}</p>
    <q-editor
      v-if="rest.visible === undefined ? true : rest.visible"
      ref="input"
      :value="valueStore"
      :readonly="rest.readonly"
      :disable="rest.disable"
      :min-height="rest.minHeight"
      :max-height="rest.maxHeight"
      :height="rest.height"
      :toolbar="rest.toolbar"
      @focus="onFocus"
      @blur="onBlur"
      @input="input"
      :placeholder="rest.placeholder"
    />
    <!-- TODO clearable btn -->
  </div>
</template>

<script>
import { store } from "../../store";
export default {
  name: "Editor",
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
      valueStore: this.getStoreValue(),
      lang: this.rest.localization || "ru",
      archiveRest: { ...this.rest },
    };
  },
  methods: {
    onFocus(e) {
      this.$emit("focus", e);
    },
    onBlur(e) {
      this.$emit("blur", e);
    },
    onInput(val) {
      this.storeValue(val);
      this.$emit("input", val);
    },
    input(val) {
      this.onInput(val);
    },
    storeValue(val) {
      if (this.rest.multiKey)
        store.updateKeyValue(
          this.keyName,
          val,
          this.rest.multiKey,
          this.rest.multiIndex
        );
      else store.updateKeyValue(this.keyName, val);
      this.valueStore = this.getStoreValue();
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
      this.storeValue(val);
    },
    reset() {
      this.setConfig(this.archiveRest)
      this.setValue(this.archiveRest.value)
    },
    clear(){
      this.setValue('')
    }
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