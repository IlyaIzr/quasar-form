<template>
  <div v-if="!rest.withInput" class="q-gutter-md">
    <p class="text-subtitle1 q-mb-none">{{ label }}</p>
    <q-date
      ref="input"
      :value="valueStore"
      :name="keyName"
      :minimal="rest.mini"
      :color="rest.color"
      :text-color="rest.textColor"
      default-year-month="2020/06"
      today-btn
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      :rules="rest.rules"
    />
  </div>
  <div v-else class="q-gutter-md">
    <q-input
      filled
      :value="valueStore"
      @input="onInput"
      mask="date"
      :rules="['date', ...rest.rules]"
      ref="input"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              :value="valueStore"
              :color="rest.color"
              :text-color="rest.textColor"
              default-year-month="2020/06"
              today-btn
              @input="onInput"
              @focus="onFocus"
              @blur="onBlur"
              :rules="rest.rules"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
import { store } from "../../store";
export default {
  name: "DateInput",
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
      valueStore: store.getValueByKey(this.keyName),
      required: this.rest.required === undefined ? false : this.rest.required,
    };
  },
  methods: {
    onFocus(e) {
      this.$emit("focus", e);
    },
    onBlur(e) {
      this.$emit("blur", e);
    },
    onInput(val) {
      this.input(val);
      this.$emit("input", val);
    },
    input(val) {
      store.updateKeyValue(this.keyName, val);
      this.valueStore = store.getValueByKey(this.keyName);
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