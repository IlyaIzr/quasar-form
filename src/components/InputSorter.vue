<template>
  <div v-if="isRendered">
    <SimpleInput
      v-if="inputType === 'simple'"
      :type="inputInfo.type"
      :value="inputInfo.value"
      :label="inputInfo.label"
      :keyName="inputInfo.key"
      :rest="inputInfo"
      :store="store"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />
    <SelectInput
      v-if="inputType === 'select'"
      :value="inputInfo.value"
      :label="inputInfo.label"
      :options="inputInfo.options"
      :keyName="inputInfo.key"
      :rest="inputInfo"
      :store="store"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />
    <CheckBox
      v-if="inputType === 'checkbox'"
      :value="inputInfo.value"
      :label="inputInfo.label"
      :keyName="inputInfo.key"
      :rest="inputInfo"
      :store="store"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />
    <Slider
      v-if="inputType === 'slider'"
      :value="inputInfo.value"
      :label="inputInfo.label"
      :keyName="inputInfo.key"
      :rest="inputInfo"
      :store="store"
      @input="onInput"
      @blur="onBlur"
    />
    <DateInput
      v-if="inputType === 'date'"
      :value="inputInfo.value"
      :label="inputInfo.label"
      :keyName="inputInfo.key"
      :rest="inputInfo"
      :store="store"
      @input="onInput"
    />
    <Multiple
      v-if="inputType === 'multiple'"
      :value="inputInfo.value"
      :label="inputInfo.label"
      :multiKey="inputInfo.key"
      :rest="inputInfo"
      :store="store"
      @input="onInput"
    />
  </div>
</template>

<script>
import SimpleInput from "./inputs/SimpleInput";
import SelectInput from "./inputs/SelectInput";
import CheckBox from "./inputs/CheckBox";
import Slider from "./inputs/Slider";
import DateInput from "./inputs/DateInput";
import Multiple from "./inputs/Multiple";
import { store, vNodeStore } from "../store";

export default {
  name: "InputSorter",
  data() {
    return {
      store,
      isRendered: undefined,
      vNodeStore,
    };
  },
  props: {
    inputInfo: {
      type: Object,
      required: true,
    },
  },
  components: {
    SimpleInput,
    SelectInput,
    CheckBox,
    Slider,
    DateInput,
    Multiple,
  },
  computed: {
    inputType: function () {
      const type = this.inputInfo.type;
      let inputType;
      const simpleTypes = [
        "text",
        "password",
        "textarea",
        "email",
        "search",
        "tel",
        "file",
        "number",
        "url",
        "timedate",
      ];
      if (simpleTypes.find((value) => value === type)) {
        inputType = "simple";
        return inputType;
      } else
        switch (type) {
          case "select":
            inputType = "select";
            return inputType;
            break;
          case "checkbox":
            inputType = "checkbox";
            return inputType;
            break;
          case "slider":
            inputType = "slider";
            return inputType;
            break;
          case "date":
            inputType = "date";
            return inputType;
            break;
          case "multiple":
            inputType = "multiple";
            return inputType;
            break;

          default:
            inputType = "text";
            return inputType;
            break;
        }
    },
  },
  watch: {
    "store.state.watcher": function () {
      if (this.inputInfo.renderIf) {
        if (store.getValueByKey(this.inputInfo.renderIf)) {
          this.isRendered = true;
        } else this.isRendered = false;
      } else this.isRendered = true;
    },
  },
  beforeMount() {
    // store.updateKeyValue(this.inputInfo.key, this.inputInfo.value);  //set value even if field invisible
    const multiKey = this.inputInfo.multiKey ? this.inputInfo.multiKey : "";

    // Check if other component was rendered
    if (this.inputInfo.renderIf) {
      if (store.getValueByKey(this.inputInfo.renderIf)) {
        this.isRendered = true;
      } else this.isRendered = false;
    } else this.isRendered = true;

    // Store input value or multifield value
    if (this.isRendered && multiKey) {
      const isStoredAlready =
        store.getValueByKey(
          this.inputInfo.key,
          multiKey,
          this.inputInfo.multiIndex
        ) !== undefined;
      if (isStoredAlready) return null;
      store.updateKeyValue(
        this.inputInfo.key,
        this.inputInfo.value,
        multiKey,
        this.inputInfo.multiIndex
      );
    } else if (this.isRendered && !multiKey) {
      const isStoredAlready =
        store.getValueByKey(this.inputInfo.key) !== undefined;
      if (isStoredAlready) return null;
      if (!this.inputInfo.value) this.inputInfo.value = [];
      store.updateKeyValue(this.inputInfo.key, this.inputInfo.value);
    }
  },
  mounted() {
    vNodeStore.setComponent(this.inputInfo.key, this);
  },
  methods: {
    async onInput(val) {
      if (this.inputInfo.onInput) {
        this.$nextTick(async function () {
          const cb = await this.inputInfo.onInput(
            this.$children[0],
            val,
            this.$children[0].$refs.input,
            vNodeStore
          );
          if (cb && typeof cb === "function") cb(this.$children[0]);
        });
      }
    },

    async onBlur(e) {
      if (this.inputInfo.onBlur) {
        this.$nextTick(async function () {
          const cb = await this.inputInfo.onBlur(
            this.$children[0],
            e,
            this.$children[0].$refs.input,
            vNodeStore
          );
          if (cb && typeof cb === "function") cb(this.$children[0]);
        });
      }
    },

    async onFocus(e) {
      if (this.inputInfo.onFocus) {
        this.$nextTick(async function () {
          const cb = await this.inputInfo.onFocus(
            this.$children[0],
            e,
            this.$children[0].$refs.input,
            vNodeStore
          );
          if (cb && typeof cb === "function") cb(this.$children[0]);
        });
      }
    },
  },
};
</script>

<style>
</style>