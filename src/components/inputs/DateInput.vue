<template>
  <div v-if="rest.visible === undefined ? true : rest.visible">
    <div
      v-if="!rest.withInput && rest.withInput !== undefined"
      class="q-gutter-md"
    >
      <p class="text-subtitle1 q-mb-none">
        {{ rest.required ? (rest.label || "") + " *" : rest.required }}
      </p>
      <DateInp
        :label="rest.required ? (rest.label || '') + ' *' : rest.label"
        :keyName="keyName"
        :rest="rest"
        :store="store"
        :hasInput="hasInput"
        :value="valueStore"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>
    <div v-else class="q-gutter-md">
      <q-input
        :value="rangeInputValue"
        @input="onTextInput"
        :mask="rest.inputMask || textInputMask"
        :rules="rules"
        :key="fuckenMask"
        :label="rest.required ? (rest.label || '') + ' *' : rest.label"
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
                :label="rest.required ? (rest.label || '') + ' *' : rest.label"
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
  </div>
</template>

<script>
import { store } from "../../store";
import { date } from "quasar";
import DateInp from "./Date";
const { formatDate } = date;
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
      valueStore: this.getStoreValue(),
      fuckenMask: 1,
      rules: this.checkRules(this.rest.rules, this.rest.required),
    };
  },
  computed: {
    rangeInputValue() {
      let res = {};
      res = this.valueStore;
      if (typeof res === "object" && res.from && res.to) {
        res = String(res.from) + String(res.to);
      } else if (typeof res === "object" && res.start && res.finish) {
        res = String(res.start) + String(res.finish);
      }
      return res;
    },
    textInputMask() {
      let mask = "";
      mask = this.rest.range ? "##.##.#### - ##.##.####" : "##.##.####";
      if (this.rest.localization === "ru") return mask;
      else if (this.rest.localization === "en") {
        mask = this.rest.range ? "####/##/## - ####/##/##" : "####/##/##";
      }
      return mask;
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
      this.fuckenMask += 1;
      let finalVal = val;
      if (typeof val === "object" && val && val.start && val.finish) {
        finalVal = {
          from: val.start,
          to: val.finish,
        };
      }
      this.storeValue(finalVal);
      this.$emit("input", finalVal);
    },
    input(val) {
      this.onInput(val);
    },
    onTextInput(val) {
      let finalVal = val;
      if (this.rest.range) {
        const dates = val.split(" - ");
        finalVal = { from: dates[0], to: dates[1] };
      }
      this.storeValue(finalVal);
      this.$emit("input", finalVal);
    },
    storeValue(val) {
      if (this.rest.multiKey)
        store.updateKeyValue(
          this.keyName,
          val,
          this.rest.multiKey,
          this.rest.multiIndex
        );
      else store.updateKeyValue(this.keyName, val);
      this.valueStore = this.getStoreValue(); // or = val?
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
    setConfig(arg1 = "", arg2) {
      if (arguments.length === 2) {
        if (arg1) this.rest[arg1] = arg2;
        else console.log("WARNING! No name provided!");
      } else if (arguments.length === 1) {
        if (arg1 && typeof arg1 === "object") {
          for (const [key, value] of Object.entries(arg1)) {
            this.rest[key] = value;
          }
        } else console.log("WARNING! No value object provided!");
      }
      this.$forceUpdate();
    },
    setValue(val) {
      this.storeValue(val);
    },
    checkRules(rules, required) {
      let res;
      if (required) {
        if (typeof rules === "object") {
          res = [
            // typeof because input stuff gives me [] as def empty value
            (val) =>
              (val && typeof val === "string") ||
              this.rest.requiredMessage ||
              "Please fill",
            ...this.rest.rules,
          ];
        } else
          res = [
            (val) =>
              (val && typeof val === "string") ||
              this.rest.requiredMessage ||
              "Please fill",
          ];
      } else res = this.rest.rules;
      return res;
    },
  },
  watch: {
    "store.state.watcher": function () {
      const val = this.getStoreValue();
      if (val !== this.valueStore) {
        this.valueStore = val;
      }
    },
  },
};
</script>

<style>
</style>