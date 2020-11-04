<template>
  <q-date
    :value="rest.range ? rangeValues : valueStore"
    :color="rest.color"
    :text-color="rest.textColor"
    :minimal="rest.mini"
    :locale="locale"
    :range="rest.range ? true : false"
    default-year-month="2020/06"
    today-btn
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
    :rules="rest.rules"
  >
    <div v-if="hasInput" class="row items-center justify-end">
      <q-btn v-close-popup label="Close" color="primary" flat />
    </div>
  </q-date>
</template>

<script>
import { store } from "../../store";
export default {
  name: "Date",
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
    hasInput: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      required: this.rest.required === undefined ? false : this.rest.required,
      valueStore: this.store.getValueByKey(this.keyName),
    };
  },
  computed: {
    locale() {
      let res = {
        days: [],
        daysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        months: [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь",
        ],
        monthsShort: [
          "Янв",
          "Фев",
          "Мар",
          "Апр",
          "Май",
          "Июн",
          "Июл",
          "Авг",
          "Сен",
          "Окт",
          "Ноя",
          "Дек",
        ],
        firstDayOfWeek: 1,
      };
      if (this.rest.localization === "ru") return res;
      else if (this.rest.localization === "en") return null;
      else if (typeof this.rest.localization === "object")
        res = this.rest.localization;
      return res;
    },
    rangeValues() {
      let res = {};
      console.log(this.valueStore);
      if (typeof this.valueStore === "string") {
        const dates = this.valueStore.split(" - "); //2 dates always
        res = { from: dates[0], to: dates[1] };
        console.log("ranged values", res);
        return res;
      } else if (typeof this.valueStore === "object") {
        return {...this.valueStore}
      } else return res;
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
      this.$emit("input", val);
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