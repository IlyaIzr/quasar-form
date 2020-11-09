<template>
  <q-card>
    <q-bar v-if="settings.modal">
      <q-space />
      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-bar>
    <q-form
      class="bg-white q-pa-md"
      ref="form"
      @submit="onSubmit"
      @reset="onReset"
      @validation-success="onValidateSuccess"
      @validation-error="onValidateError"
    >
      <div class="text-h6">{{ settings.title }}</div>

      <FieldMapper :fields="settings.fields" :values="values" />

      <Buttons :buttons="settings.buttons" :modal="settings.modal" />
    </q-form>
  </q-card>
</template>

<script>
import FieldMapper from "./FieldMapper";
import Buttons from "./Buttons";
import { store } from "../store";
export default {
  name: "FormWrap",
  components: {
    FieldMapper,
    // FieldMapper: ()=> import('./FieldMapper.vue'),
    Buttons,
  },
  data() {
    return {
      form: { ...this.settings.form },
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
      let res = store.getStore();
      return res;
    },
  },
  methods: {
    // Event Handlers
    async onSubmit(e) {
      const valuesResponse = { ...this.valuesResponse };
      delete valuesResponse.watcher;
      // Check for calndar range object
      for (const [key, value] of Object.entries(valuesResponse)) {
        if (typeof value === "object" && value.from && value.to) {
          valuesResponse[key] = { start: value.from, finish: value.to };
        }
      }
      this.reset()
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted",
      });
      if (this.form.onSubmit) {
        const cb = await this.form.onSubmit(
          this,
          valuesResponse,
          this.$refs.form
        );
        if (cb && typeof cb === "function") cb(this);
      }
    },
    async onReset() {
      let exeption;
      let cb;
      if (this.form.onClear) {
        const res = await this.form.onClear(
          this,
          { ...this.valuesResponse },
          this.$refs.form
        );
        exeption = res && res.exeption;
        cb = res && res.cb;
      }
      store.resetStore(exeption);
      if (cb && typeof cb === "function") cb(this);
    },
    async onValidateSuccess() {
      if (this.form.onValidateSuccess) {
        const cb = await this.form.onValidateSuccess(
          this,
          { ...this.valuesResponse },
          this.$refs.form
        );
        if (cb && typeof cb === "function") cb(this);
      }
    },
    async onValidateError(err) {
      if (this.form.onValidateError) {
        const cb = await this.form.onValidateError(
          this,
          { ...this.valuesResponse },
          this.$refs.form,
          err
        );
        if (cb && typeof cb === "function") cb(this);
      }
    },

    async reset() {
      this.onReset();
    },    
    async submit() {
      this.onSubmit();
    },
  },

  async mounted() {
    if (this.form.onMount) {
      const cb = await this.form.onMount(this, this.$refs.form);
      if (cb && typeof cb === "function") cb(this);
    }
  },
};
</script>

<style>
</style>