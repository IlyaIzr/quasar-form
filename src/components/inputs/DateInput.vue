<template>
  <div
    v-if="!rest.withInput && rest.withInput !== undefined"
    class="q-gutter-md"
  >
    <p class="text-subtitle1 q-mb-none">{{ label }}</p>
    <DateInp
      :label="label"
      :keyName="keyName"
      :rest="rest"
      :store="store"
      :hasInput="hasInput"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
  <div v-else class="q-gutter-md">
    <q-input
      :value="
        rest.range
          ? rangeInputValue
          : valueStore
      "
      @input="onInput"
      :mask="rest.range ? '####/##/## - ####/##/##' : '####/##/##'"
      :rules="rest.range ? rest.rules : ['date', ...rest.rules]"
      ref="input"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <DateInp
              :label="label"
              :keyName="keyName"
              :rest="rest"
              :store="store"
              :hasInput="hasInput"
              @input="onInput"
              @focus="onFocus"
              @blur="onBlur"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
import { store } from "../../store";
import DateInp from "./Date";
export default {
  name: "DateInput",
  components: {
    DateInp,
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "text",
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    value: {
      type: String || Object || undefined,
      required: false,
      default: "",
    },
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
  },
  data() {
    return {
      hasInput:
        this.rest.withInput || this.rest.withInput === undefined ? true : false,
      valueStore: this.store.getValueByKey(this.keyName),
    };
  },
  computed: {
    rangeInputValue() {
      let res = {}
      res = this.store.getValueByKey(this.keyName);
      if (typeof res === "object" && res.from && res.to) {
        res = String(res.from) + String(res.to)
      }
      return res
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
      let finalVal = val;
      if (typeof val === "object") {
        finalVal = { ...val };
        this.input(finalVal);
        finalVal = { ...val };
        this.$emit("input", finalVal);
        // console.log("emited val", finalVal);
      } else {
        this.input(val);
        this.$emit("input", val);
      }
    },
    input(val) {
      store.updateKeyValue(this.keyName, val);
    },
  },
  watch: {
    "store.state.watcher": function () {
      const val = store.getValueByKey(this.keyName);
      if (val !== this.valueStore) {
        this.valueStore = val;
      }
    },
  },
};
</script>

<style>
</style>