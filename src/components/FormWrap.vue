<template>
  <q-form
    class="bg-white q-pa-md"
    @submit="onSubmit"
    @reset="onReset"
    @validation-success="onValidate"
    @validation-error="onError"
  >
    <div class="text-h6">{{ settings.data.title }}</div>

    <Mapper :fields="settings.data.fields" :values="values" />

    <Buttons :buttons="settings.data.buttons" />
  </q-form>
</template>

<script>
import Mapper from "./Mapper";
import Buttons from "./Buttons";
import { store } from "../store";
export default {
  name: "FormWrap",
  components: { Mapper, Buttons },
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
    onSubmit(e) {
      const valuesResponse = { ...this.valuesResponse };
      delete valuesResponse.watcher;
      if (this.form.onSubmit) {
        this.form.onSubmit(this, valuesResponse);
      }
    },
    onReset() {
      let exeption;
      if (this.form.onReset) {
        exeption = this.form.onReset(this, { ...this.valuesResponse });
      }
      store.resetStore(exeption);
    },
    onValidate() {
      if (this.form.onValidate) {
        this.form.onValidate(this, { ...this.valuesResponse });
      }
    },
    onError(err){
      if (this.form.onError) {
        this.form.onError(this, { ...this.valuesResponse }, err);
      }
    }
  },
};
</script>

<style>
</style>