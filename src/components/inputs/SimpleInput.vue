<template>
  <div class="q-gutter-md">
    <q-input
      ref="input"
      :value="valueStore"
      :label="rest.label"
      :type="type"
      :name="keyName"
      :required="rest.required"
      :mask="rest.mask"
      :fill-mask="rest.fillMask || false"
      :reverse-fill-mask="rest.reverseFill"
      :unmasked-value="rest.unmaskedValue"
      :clearable="rest.clearable"
      :prefix="rest.prefix"
      :suffix="rest.suffix"
      :autogrow="rest.autogrow"
      :hint="rest.hint"
      :readonly="rest.readonly"
      :disable="rest.disable"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      :rules="rest.rules"
    />
  </div>
</template>

<script>
import { store } from "../../store";
export default {
  name: "SimpleInput",
  props: {
    type: {
      type: String,
      required: false,
      default: "text",
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
      valueStore: this.getStoreValue(),
      required: this.rest.required === undefined ? false : this.rest.required,
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
      if (this.rest.maskPattern === "comfortNumbers") {
        val = this.comfortNumbers(val);
      }
      this.input(val);
      this.$emit("input", val);
    },
    input(val) {
      if (this.rest.multiKey)
        store.updateKeyValue(
          this.keyName,
          val,
          this.rest.multiKey,
          this.rest.multiIndex
        );
      else store.updateKeyValue(this.keyName, val);
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
    setProp(arg1 = "", arg2) {
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
    comfortNumbers(val) {
      console.log(this.valueStore, this.valueStore.length);
      if (!this.rest.mask) {
        this.rest.mask = "##";
        this.rest.unmaskedValue = true;
        this.$forceUpdate();
      }
      if (this.valueStore && (this.valueStore.length + 1) % 3) {
        console.log("no coma case");
        this.rest.mask += "#";
      } else if (this.valueStore && this.valueStore.length) {
        console.log("coma case, ", this.valueStore.length);
        if (this.valueStore.length < 4){
        const s = this.rest.mask.slice(0, -1);
        this.rest.mask = s + ",#";} else this.rest.mask += ',#'
      }
      return String(val);
    },
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