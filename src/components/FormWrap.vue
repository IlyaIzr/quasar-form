<template>
  <q-form
    class="bg-white q-pa-md"
    @submit="onSubmit"
    @reset="onReset"
    @validation-success="onValidate"
    @validation-error="onError"
  >
    <div class="text-h6">{{ settings.data.title }}</div>

    <FieldMapper :fields="settings.data.fields" :values="values" />

    <Buttons :buttons="settings.data.buttons" />
  </q-form>
</template>

<script>
import FieldMapper from "./FieldMapper";
import Buttons from "./Buttons";
import { store } from "../store";
export default {
  name: "FormWrap",
  components: { FieldMapper, Buttons },
  data() {
    return {
      form: { ...this.settings.data.form },
    };
  },
  props: {
    settings: {
      type: Object,
      required: true,
    },
    values: {
      type: Object,
      required: false,
    },
  },
  computed: {
    valuesResponse() {
      return { ...store.state };
    },
  },
  methods: {
    async onSubmit(e) {
      const valuesResponse = { ...this.valuesResponse };
      delete valuesResponse.watcher;
      if (this.form.onSubmit) {
        const cb = await this.form.onSubmit(this, valuesResponse);
        if (cb && typeof cb === "function") cb(this);
      }
    },
    async onReset() {
      let exeption;
      let cb;
      if (this.form.onReset) {
        const res = await this.form.onReset(this, { ...this.valuesResponse });
        exeption = res && res.exeption;
        cb = res && res.cb;
      }
      store.resetStore(exeption);
      if (cb && typeof cb === "function") cb(this);
    },
    async onValidate() {
      if (this.form.onValidate) {
        const cb = await this.form.onValidate(this, { ...this.valuesResponse });
        if (cb && typeof cb === "function") cb(this);
      }
    },
    async onError(err) {
      if (this.form.onError) {
        const cb = await this.form.onError(this, { ...this.valuesResponse }, err);
        if (cb && typeof cb === "function") cb(this);
      }
    },
  },
};
</script>

<style>
</style>