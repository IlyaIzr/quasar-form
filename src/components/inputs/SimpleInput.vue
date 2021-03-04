<template>
  <div class="q-gutter-md">
    <q-input
      v-bind="filtered"
      :value="value"
      :class="rest.class + ' input-' + rest.key"
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
      <template v-slot:append v-if="appendType || isPassword">
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
          v-if="isPassword"
          :name="isPassword ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="rest.type = rest.type === 'password' ? 'text' : 'password'"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
import { vNodeStore } from "../../store";
import {
  methods,
  commonMethods,
  watchers,
  mountedCommon,
  stringRules,
  computed,
} from "./extra";

export default {
  name: "SimpleInput",
  props: {
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
    ...computed,

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
    ...commonMethods,
    ...methods,
    ...stringRules,

    async appendClick(e) {
      this.rest.appendOnClick(this, this.value, this.$refs.input, vNodeStore);
    },
    async prependClick(e) {
      this.rest.prependOnClick(this, this.value, this.$refs.input, vNodeStore);
    },
  },
  watch: {
    ...watchers,
  },
  mounted() {
    mountedCommon(this);
  },
};
</script>

<style>
</style>