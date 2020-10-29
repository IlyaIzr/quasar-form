<template>
  <q-form class="bg-white q-pa-md" @submit="onSubmit" @reset="onReset">
    <div class="text-h6">{{ settings.data.title }}</div>

    <Mapper :settings="settings" :values="values" />

    <!-- Buttons component to be here insted of -->
    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script>
import Mapper from "./Mapper";
import { store } from "../store";
export default {
  name: "FormWrap",
  components: { Mapper },
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
      console.log(valuesResponse);
    },
    onReset() {},
  },
};
</script>

<style>
</style>