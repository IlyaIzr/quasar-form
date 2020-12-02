<template>
  <q-card>
    <q-card-section style="max-height: 8vh">
      <q-bar v-if="settings.modal" class="float-right">
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip content-class="bg-white text-primary">Закрыть</q-tooltip>
        </q-btn>
      </q-bar>

      <div class="text-h5">{{ settings.title }}</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-form
        style="max-height: 65vh"
        class="scroll bg-white q-pa-md"
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

    <q-card-section
      style="max-height: 12vh"
      :class="settings.modal && ' float-right q-mr-md' + ' scroll '"
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
  name: "FormWrap",
  components: {
    FieldMapper,
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
      // Check for calndar range object
      for (const [key, value] of Object.entries(valuesResponse)) {
        if (typeof value === "object" && value.from && value.to) {
          valuesResponse[key] = { start: value.from, finish: value.to };
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
      if (this.form.onValidateError) {
        const cb = await this.form.onValidateError(
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
      this.onReset();
    },
    async submit() {
      this.onSubmit();
    },
  },

  async mounted() {
    // console.log(this.$refs.form.validate())
    vNodeStore.setComponent("formRef", this.$refs.form);
    if (this.form.onMount) {
      const cb = await this.form.onMount(this, this.$refs.form);
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