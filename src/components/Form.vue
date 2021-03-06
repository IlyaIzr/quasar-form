<template>
  <q-card style="min-width: min(75vw, 1800px)" class="form">
    <!-- Close modal v-if it's modal -->
    <q-card-section
      v-if="settings.title"
      style="max-height: 8vh"
      class="formTitle q-px-md q-py-xs relative-position"
    >
      <q-btn
        v-if="settings.modal"
        dense
        flat
        icon="close"
        v-close-popup
        class="absolute"
        style="right: 20px"
      >
        <q-tooltip content-class="bg-white text-primary">Закрыть</q-tooltip>
      </q-btn>
      <div class="text-h5">{{ settings.title }}</div>
    </q-card-section>

    <q-separator />

    <!-- Form itself -->
    <q-card-section class="formContent q-pa-none">
      <q-form
        :style="settings.modal && 'max-height: 65vh'"
        :class="`scroll bg-white ${settings.tabs ? '' : 'q-pa-md q-py-none'}`"
        ref="form"
        @submit="onSubmit"
        @reset="onReset"
        @validation-success="onValidateSuccess"
        @validation-error="onValidateError"
      >
        <FieldMapper
          :fields="settings.fields"
          :values="values"
          :tabs="settings.tabs"
          :settings="settings"
          @submit="onSubmit"
          @reset="onReset"
          @clear="onClear"
        />
      </q-form>
    </q-card-section>

    <q-separator />

    <!-- Buttons -->
    <q-card-section
      v-if="!settings.noButtons"
      style="max-height: 12vh"
      :class="`formButtons ${settings.modal && ' float-right q-mr-md '}  ${
        settings.tabs && ' q-pa-none'
      } `"
    >
      <Buttons
        :buttons="settings.buttons"
        :modal="settings.modal"
        v-if="!settings.tabs"
        @submit="onSubmit"
        @reset="onReset"
        @clear="onClear"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import FieldMapper from "./FieldMapper";
import Buttons from "./Buttons";
import { store, vNodeStore } from "../store";
export default {
  name: "Form",
  components: {
    FieldMapper,
    Buttons,
  },
  data() {
    return {
      form: this.settings.form,
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
      let res = store.state;
      return res;
    },
  },
  methods: {
    // Event Handlers
    async onSubmit(e) {
      const res = await this.$refs.form.validate();
      if (!res) return null;
      const valuesResponse = { ...this.valuesResponse };
      delete valuesResponse.watcher;
      // Remove service keys
      let seriveKeys = [];
      let multiKeys = [];
      this.settings.fields.map((field) => {
        if (field.service || field.type === "html") seriveKeys.push(field.key);
        else if (field.type === "multiple") {
          multiKeys.push(field.key);
          field.fields.map((miniF) => {
            if (miniF.service || miniF.field?.type === "html")
              seriveKeys.push(miniF.key);
          });
        }
      });
      const checkDates = (value) => {
        if (typeof value === "object" && value.from && value.to) {
          return { start: value.from, finish: value.to };
        }
      };
      for (const [key, value] of Object.entries(valuesResponse)) {
        if (seriveKeys.indexOf(key) > -1) delete valuesResponse[key];
        // Check for calndar range object, in simple fields
        const res = checkDates(value);
        if (res) valuesResponse[key] = res;
        // Case multiKey
        if (multiKeys.indexOf(key) > -1) {
          valuesResponse[key].map((multiRow) => {
            for (const [miniKey, miniValue] of Object.entries(multiRow)) {
              // Check for service keys in multiFields
              if (seriveKeys.indexOf(miniKey) > -1) delete multiRow[miniKey];
              // Calendar range in multiFields
              const res = checkDates(miniValue);
              if (res) multiRow[miniKey] = res;
            }
          });
        }
      }
      if (this.form.onSubmit) {
        const cb = await this.form.onSubmit(
          this,
          valuesResponse,
          this.$refs.form,
          vNodeStore
        );
        if (cb && typeof cb === "function") cb(this);
      }
    },
    async onReset() {
      let cb;
      if (this.form.onReset) {
        const res = await this.form.onReset(
          this,
          { ...this.valuesResponse },
          this.$refs.form,
          vNodeStore
        );
        cb = res && res.cb;
      }
      vNodeStore.resetComponents();
      if (cb && typeof cb === "function") cb(this);
    },
    async onClear() {
      let exeption;
      let cb;
      if (this.form.onClear) {
        const res = await this.form.onClear(
          this,
          { ...this.valuesResponse },
          this.$refs.form,
          vNodeStore
        );
        exeption = res && res.exeption;
        cb = res && res.cb;
      }
      store.clearStore(exeption);
      if (cb && typeof cb === "function") cb(this);
      this.$nextTick(() => {
        this.$refs.form.resetValidation();
      });
    },
    async onValidateSuccess() {
      if (this.form.onValidateSuccess) {
        const cb = await this.form.onValidateSuccess(
          this,
          { ...this.valuesResponse },
          this.$refs.form,
          vNodeStore
        );
        if (cb && typeof cb === "function") cb(this);
      }
    },
    async onValidateError(err) {
      vNodeStore.setComponent("firstFieldFailedValidation", err);
      const f = this.form.onValidateError || this.form.onValidateError;
      if (f) {
        const cb = await f(
          this,
          { ...this.valuesResponse },
          this.$refs.form,
          err,
          vNodeStore
        );
        if (cb && typeof cb === "function") cb(this);
      }
    },

    async reset() {
      this.onReset();
    },
    async clear() {
      this.onClear();
    },
    async submit() {
      this.onSubmit();
    },
  },

  async mounted() {
    // console.log(this.$refs.form.validate())
    vNodeStore.setComponent("formRef", this.$refs.form);
    if (this.form.onMount) {
      const cb = await this.form.onMount(this, this.$refs.form, vNodeStore);
      if (cb && typeof cb === "function") cb(this);
    }
  },
  beforeMount() {
    import("quasar/lang/" + (this.settings.localization || "ru")).then(
      (lang) => {
        this.$q.lang.set(lang.default);
      }
    );
  },
};
</script>

<style>
</style>