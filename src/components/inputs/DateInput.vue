<template>
  <div v-if="rest.visible === undefined ? true : rest.visible">
    <div
      v-if="!rest.withInput && rest.withInput !== undefined"
      class="q-gutter-md"
    >
      <p class="text-subtitle1 q-mb-none">{{ rest.label }}</p>
      <DateInp
        :label="rest.label"
        :keyName="keyName"
        :rest="rest"
        :store="store"
        :hasInput="hasInput"
        :value="value"
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
        :label="rest.label"
        :clearable="rest.clearable === undefined ? true : rest.clearable"
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
                :label="rest.label"
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
      value: this.getStoreValue(),
      fuckenMask: 1,
      rules: this.checkRules(
        this.rest.rules,
        this.rest.required === undefined || this.rest.required
      ),
      archiveRest: { ...this.rest },
    };
  },
  computed: {
    rangeInputValue() {
      let res = {};
      res = this.value;
      if (res && typeof res === "object" && res.from && res.to) {
        res = String(res.from) + String(res.to);
      } else if (res && typeof res === "object" && res.start && res.finish) {
        res = String(res.start) + String(res.finish);
      } else if (!res) res = "";
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
      if (val && this.rest.range) {
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
      this.value = this.getStoreValue(); // or = val?
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
        this.rest.label =
          this.rest.label && !this.rest.label.endsWith(" *")
            ? this.rest.label + " *"
            : " *";
        if (typeof rules === "object") {
          res = [
            (val) => Boolean(val) || this.rest.requiredMessage || "Please fill",
            ...this.rest.rules,
          ];
        } else
          res = [(val) => Boolean(val) || this.rest.requiredMessage || "Please fill"];
      } else res = this.rest.rules;
      return res;
    },
    reset() {
      this.setConfig(this.archiveRest);
      this.setValue(this.archiveRest.value);
      this.$nextTick(function () {
        this.$refs.input.resetValidation();
      });
    },
    clear() {
      this.setValue("");
      this.$nextTick(function () {
        this.$refs.input.resetValidation();
      });
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