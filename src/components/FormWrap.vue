<template>
  <q-form class="bg-white q-pa-md" @submit="onSubmit" @reset="onReset">
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
  },
};
</script>

<style>
</style>