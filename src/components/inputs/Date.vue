<template>
  <q-date
    ref="calendar"
    :value="rest.range ? rangeValues : value"
    :color="rest.color"
    :text-color="rest.textColor"
    :minimal="rest.mini"
    :default-year-month="
      rest.defaultYearMonth ? rest.defaultYearMonth : '2020/03'
    "
    :default-view="rest.defaultView"
    :navigation-min-year-month="rest.navigationMinYearMonth"
    :navigation-max-year-month="rest.navigationMaxYearMonth"
    :readonly="rest.readonly"
    :range="rest.range ? true : false"
    :disable="rest.disable"
    :mask="rest.mask || 'DD.MM.YYYY'"
    today-btn
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
    :rules="rest.rules"
  >
    <div v-if="hasInput" class="row items-center justify-end">
      <q-btn v-close-popup label="Close" color="primary" flat ref="btn" />
    </div>
    <template v-slot:default class="q-ma-none">
      <q-icon name="cancel" @click="onInput('')" class="cursor-pointer" />
      <q-field
        ref="calendarCheck"
        :value="rest.range ? rangeValues : value"
        :rules="rules"
        borderless
        dense
      />
    </template>
  </q-date>
</template>

<script>
import { store } from "../../store";
export default {
  name: "Date",
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
    hasInput: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      required: this.rest.required === undefined || this.rest.required,
      value: this.getStoreValue(),
    };
  },
  computed: {
    rangeValues() {
      let res = {};
      if (typeof this.value === "object" && this.value) {
        if (this.value.start && this.value.finish)
          res = { from: this.value.start, to: this.value.finish };
        else res = { ...this.value };
      }
      return res;
    },
    rules() {
      let res = [];
      if (this.required && !this.rest.range) {
        res = [
          (dateString) =>
            (dateString.split(".")[0] < 32 &&
              dateString.split(".")[1] < 13 &&
              dateString.split(".")[2] > 1900) ||
            this.rest.requiredMessage ||
            "Incorrect date",
        ];
      } else if (this.required) {
        res = [
          (rangeObject) =>
            (rangeObject.from.split(".")[0] < 2 &&
              rangeObject.from.split(".")[1] < 13 &&
              rangeObject.from.split(".")[2] > 1900 &&
              rangeObject.to.split(".")[0] < 32 &&
              rangeObject.to.split(".")[1] < 13 &&
              rangeObject.to.split(".")[2] > 1900) ||
            this.rest.requiredMessage ||
            "Incorrect date",
        ];
      }
      return res;
    },
  },
  methods: {
    onFocus(e) {
      this.$emit("focus", e);
    },
    onBlur(e) {
      this.$emit("blur", e);
    },
    onInput(val) {
      // if (this.rest.range)
      //  console.log(this.$refs.btn)
      // this.$refs.btn.$el.click()
      this.$emit("input", val);
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
  },
  watch: {
    "store.state.watcher": function () {
      const val = this.getStoreValue();
      if (val !== this.value) {
        this.value = val;
      }
    },
  },
};
</script>

<style>
</style>