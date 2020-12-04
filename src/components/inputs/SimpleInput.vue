<template>
  <div class="q-gutter-md">
    <q-input
      ref="input"
      :value="value"
      :label="rest.label"
      :type="rest.type"
      :name="keyName"
      :mask="rest.mask"
      :fill-mask="rest.fillMask || false"
      :reverse-fill-mask="rest.reverseFill"
      :unmasked-value="rest.unmaskedValue"
      :clearable="rest.clearable === undefined ? true : rest.clearable"
      clear-icon="close"
      :prefix="rest.prefix"
      :suffix="rest.suffix"
      :autogrow="rest.autogrow"
      :hint="rest.hint"
      :readonly="rest.readonly"
      :disable="rest.disable"
      :class="rest.class"
      :filled="rest.filled"
      :outlined="rest.outlined"
      @focus="onFocus"
      @blur="onBlur"
      @input="input"
      :rules="rules"
    >
      <template v-slot:prepend v-if="prependType">
        <q-icon v-if="prependType === 'icon'" :name="rest.prepend" />
        <q-avatar v-else-if="prependType === 'img'">
          <img :src="rest.prepend" />
        </q-avatar>
        <q-btn
          v-else-if="prependType === 'btn'"
          round
          dense
          flat
          :icon="rest.prepend"
          @click="prependClick"
        />
      </template>
      <template v-slot:append v-if="appendType || rest.type === 'password'">
        <q-icon v-if="appendType === 'icon'" :name="rest.append" />
        <q-avatar v-if="appendType === 'img'">
          <img :src="rest.append" />
        </q-avatar>
        <q-btn
          v-if="appendType === 'btn'"
          round
          dense
          flat
          :icon="rest.append"
          @click="appendClick"
        />
        <q-icon
          v-if="archiveRest.type === 'password'"
          :name="isPassword ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="rest.type = rest.type === 'password' ? 'text' : 'password'"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
import { store, configStore, vNodeStore } from "../../store";
export default {
  name: "SimpleInput",
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
      value: this.getStoreValue(),
      rules: this.checkRules(
        this.rest.rules,
        this.rest.required === undefined || this.rest.required
      ),
      archiveRest: { ...this.rest },
      isPassword: this.rest.type === "password",
    };
  },
  computed: {
    appendType() {
      let r = "";
      if (this.rest.append)
        r = this.rest.append.startsWith("http") ? "img" : "icon";
      if (this.rest.appendOnClick) r = "btn";
      return r;
    },
    prependType() {
      let r = "";
      if (this.rest.prepend)
        r = this.rest.prepend.startsWith("http") ? "img" : "icon";
      if (this.rest.prependOnClick) r = "btn";
      return r;
    },
  },
  methods: {
    async appendClick(e) {
      this.rest.appendOnClick(this, this.value, this.$refs.input, vNodeStore);
    },
    async prependClick(e) {
      this.rest.prependOnClick(this, this.value, this.$refs.input, vNodeStore);
    },
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
      this.value = this.getStoreValue();
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
        // Case 2 arg
        if (arg1) this.storeConfig({ [arg1]: arg2 });
        else console.log("WARNING! No name provided!");
      } else if (arguments.length === 1) {
        // Case 1 arg
        if (arg1 && typeof arg1 === "object") this.storeConfig(arg1);
        else console.log("WARNING! No value object provided!");
      }
    },
    storeConfig(obj) {
      if (this.rest.multiKey) {
        configStore.set(
          this.keyName,
          obj,
          this.rest.multiKey,
          this.rest.multiIndex
        );
        this.$parent.rest = configStore.get(
          this.keyName,
          this.rest.multiKey,
          this.rest.multiIndex
        );
      } else {
        configStore.set(this.keyName, obj);
        this.$parent.rest = configStore.get(this.keyName);
      }
    },
    setValue(val) {
      this.storeValue(val);
    },
    checkRules(rules, required) {
      let res;
      if (required) {
        this.rest.label =
          this.rest.label && !this.rest.label.endsWith(" *")
            ? this.rest.label + " *"
            : " *";
        if (typeof rules === "object") {
          res = [
            (val) => Boolean(val) || this.rest.requiredMessage || "Please fill",
            ...this.rest.rules,
          ];
        } else
          res = [
            (val) => Boolean(val) || this.rest.requiredMessage || "Please fill",
          ];
      } else res = this.rest.rules;
      return res;
    },
    reset() {
      this.setConfig(this.archiveRest);
      this.setValue(this.archiveRest.value);
      this.$nextTick(function () {
        this.$refs.input.resetValidation();
      });
    },
    clear() {
      this.setValue("");
      this.$nextTick(function () {
        this.$refs.input.resetValidation();
      });
    },
  },
  watch: {
    "store.state.watcher": function () {
      const val = this.getStoreValue();
      if (val !== this.value) {
        this.value = val;
      }
    },
    "this.rest.visible": function () {
      console.log("check for visibility watched");
      if (this.rest.hasOwnProperty("visible") && !this.rest.visible) {
        this.$parent.$el.parentNode.className += " hidden";
      }
    },
  },
  mounted() {
    this.validate = this.$refs.input.validate
  },
};
</script>

<style>
</style>