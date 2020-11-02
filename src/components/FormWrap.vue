<template>
  <q-form class="bg-white q-pa-md" @submit="onSubmit" @reset="onReset">
    <div class="text-h6">{{ settings.data.title }}</div>

    <Mapper :fields="settings.data.fields" :values="values" />

    <!-- Buttons component to be here insted of -->
    <!-- If no buttons provided, render DefSubButtons component -->
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
  methods: {
    onSubmit(e) {
      const valuesResponse = { ...store.state };
      delete valuesResponse.watcher;
      // const response = {};
      for (const [key, value] of Object.entries(valuesResponse)) {
        // if (typeof value === "object") {
        //   let noObs = { ...value };
        //   noObs = noObs.value ? noObs.value : "";
        //   response[key] = noObs;
        // } else response[key] = value;
      }
      console.log(valuesResponse);
    },
    onReset() {},
  },
};
</script>

<style>
</style>