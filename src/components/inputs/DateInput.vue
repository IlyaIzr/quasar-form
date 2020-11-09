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
      :value="valueStore"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
  <div v-else class="q-gutter-md">
    <q-input
      :value="rangeInputValue"
      @input="onSimpleInput"
      :mask="rest.inputMask || textInputMask"
      :rules="rest.range ? rest.rules : ['date', ...rest.rules]"
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
import { date } from "quasar";
const { formatDate } = date;
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
    };
  },
  computed: {
    rangeInputValue() {
      console.log('fuken range did run')
      let res = {};
      res = this.valueStore;
      if (typeof res === "object" && res.from && res.to) {
        res = String(res.from) + ' - ' + String(res.to);
      } else if (typeof res === "object" && res.start && res.finish) {
        res = String(res.start) + ' - ' + String(res.finish);
      }
      console.log('valu calculated: ', res)
      return res;
    },
    textInputMask() {
      let mask = "";
      if (this.rest.range) {
        mask = undefined
        return mask // TODO go over this
      }
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
      console.log('calendae valye', val)
      let finalVal = val;
      if (typeof val === "object" && val && val.start && val.finish) {
        finalVal = {
          from: val.start,
          to: val.finish,
        };
      }
      this.input(finalVal);
      this.$emit("input", finalVal);
      this.rangeInputValue
    },
    onSimpleInput(val) {
      let finalVal = val;
      if (this.rest.range) {
        const dates = val.split(" - ");
        finalVal = { from: dates[0], to: dates[1] };
      }
      this.input(finalVal);
      this.$emit("input", finalVal);
    },
    input(val) {
      if (this.rest.multiKey)
        store.updateKeyValue(
          this.keyName,
          val,
          this.rest.multiKey,
          this.rest.multiIndex
        );
      else store.updateKeyValue(this.keyName, val);
      this.valueStore = val;
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
      if (val !== this.valueStore) {
        this.valueStore = val;
      }
    },
  },
};
</script>

<style>
</style>