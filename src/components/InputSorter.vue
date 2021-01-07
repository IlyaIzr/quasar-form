<template>
  <div :class="classNames">
    <SimpleInput
      v-if="inputType === 'simple'"
      :type="inputInfo.type"
      :keyName="inputInfo.key"
      :rest="rest"
      :store="store"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />
    <SelectInput
      v-if="inputType === 'select'"
      :value="inputInfo.value"
      :options="inputInfo.options"
      :keyName="inputInfo.key"
      :rest="rest"
      :store="store"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />
    <SelectCreatable
      v-if="inputType === 'selectCreatable'"
      :value="inputInfo.value"
      :options="inputInfo.options"
      :keyName="inputInfo.key"
      :rest="rest"
      :store="store"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />
    <CheckBox
      v-if="inputType === 'checkbox'"
      :value="inputInfo.value"
      :keyName="inputInfo.key"
      :rest="rest"
      :store="store"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />
    <Slider
      v-if="inputType === 'slider'"
      :value="inputInfo.value"
      :keyName="inputInfo.key"
      :rest="rest"
      :store="store"
      @input="onInput"
      @blur="onBlur"
    />
    <DateInput
      v-if="inputType === 'date'"
      :value="inputInfo.value"
      :keyName="inputInfo.key"
      :rest="rest"
      :store="store"
      @input="onInput"
    />
    <Multiple
      v-if="inputType === 'multiple'"
      :value="inputInfo.value"
      :multiKey="inputInfo.key"
      :rest="rest"
      :store="store"
      @input="onInput"
    />
    <Html
      v-if="inputType === 'html'"
      :keyName="inputInfo.key"
      :rest="rest"
      @focus="onFocus"
    />
    <Editor
      v-if="inputType === 'editor'"
      :keyName="inputInfo.key"
      :rest="rest"
      :value="inputInfo.value"
      :store="store"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <File
      v-if="inputType === 'file'"
      :keyName="inputInfo.key"
      :rest="rest"
      :value="inputInfo.value"
      :store="store"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<script>
import SimpleInput from "./inputs/SimpleInput";
import SelectInput from "./inputs/SelectInput";
import SelectCreatable from "./inputs/SelectCreatable";
import CheckBox from "./inputs/CheckBox";
import Slider from "./inputs/Slider";
import DateInput from "./inputs/DateInput";
import Multiple from "./inputs/Multiple";
import Html from "./inputs/Html";
import Editor from "./inputs/Editor";
import File from "./inputs/File";
import { configStore, optionsStore, store, vNodeStore } from "../store";

export default {
  name: "InputSorter",
  data() {
    return {
      store,
      vNodeStore,
      rest: {},
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
    Html,
    Editor,
    File,
    SelectCreatable,
  },
  computed: {
    classNames() {
      let r = "";
      const basic =
        this.rest.visible || this.rest.visible === undefined ? "col " : "hidden ";
      const margin =
        this.rest.hasOwnProperty("required") && !this.rest.required
          ? " q-mb-sm"
          : "";
      r = basic + ' field-' + this.inputInfo.key + margin;
      return r;
    },
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
          case "selectCreatable":
            inputType = "selectCreatable";
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
          case "html":
            inputType = "html";
            return inputType;
            break;
          case "editor":
            inputType = "editor";
            return inputType;
            break;
          case "file":
            inputType = "file";
            return inputType;
            break;

          default:
            inputType = "text";
            return inputType;
            break;
        }
    },
  },
  beforeMount() {
    // store.updateKeyValue(this.inputInfo.key, this.inputInfo.value);  //set value even if field invisible
    const multiKey = this.inputInfo.multiKey || "";

    // CASE MULTIKEY
    if (multiKey) {
      // Set options if they're provided
      if (this.inputInfo.options && this.inputInfo.options.length)
        optionsStore.setOptions(
          this.inputInfo.key,
          this.inputInfo.options,
          multiKey,
          this.inputInfo.multiIndex
        );

      // Create config if it wasn't created
      configStore.create(
        this.inputInfo.key,
        this.inputInfo,
        multiKey,
        this.inputInfo.multiIndex
      );
      this.rest = configStore.get(
        this.inputInfo.key,
        multiKey,
        this.inputInfo.multiIndex
      );

      //Check if stored already
      const stored = store.getValueByKey(
        this.inputInfo.key,
        multiKey,
        this.inputInfo.multiIndex
      );
      if (stored) return null;
      // Store value inside multyfield
      store.updateKeyValue(
        this.inputInfo.key,
        this.inputInfo.value,
        multiKey,
        this.inputInfo.multiIndex
      );
      // CASE SINGLE KEY
    } else if (!multiKey) {
      // Set options if they're provided
      if (this.inputInfo.options && this.inputInfo.options.length)
        optionsStore.setOptions(this.inputInfo.key, this.inputInfo.options);
      //Check if stored already
      const stored = store.getValueByKey(this.inputInfo.key);
      if (stored) return null;

      store.updateKeyValue(this.inputInfo.key, this.inputInfo.value);

      // Set label required * sign
      if (this.inputInfo.required || this.inputInfo.required === undefined)
        this.inputInfo.label =
          this.inputInfo.label && !this.inputInfo.label.endsWith(" *")
            ? this.inputInfo.label + " *"
            : " *";

      configStore.create(this.inputInfo.key, this.inputInfo);
      this.rest = configStore.get(this.inputInfo.key);
    }
  },
  mounted() {
    const multiKey = this.inputInfo.multiKey || "";
    // CASE MULTIKEY
    if (multiKey) {
      vNodeStore.setComponent(
        this.inputInfo.key,
        this,
        multiKey,
        this.inputInfo.multiIndex
      );
      this.rest = configStore.get(
        this.inputInfo.key,
        multiKey,
        this.inputInfo.multiIndex
      );
    } else {
      // CASE SINGLE KEY
      vNodeStore.setComponent(this.inputInfo.key, this);
      this.rest = configStore.get(this.inputInfo.key);
    }
  },
  methods: {
    async onInput(val) {
      if (this.inputInfo.onInput) {
        this.$nextTick(async function () {
          const cb = await this.inputInfo.onInput(
            this.$children[0],
            val,
            this.$children[0].$refs.input,
            vNodeStore,
            this.inputInfo.multiIndex
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
            vNodeStore,
            this.inputInfo.multiIndex
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
            vNodeStore,
            this.inputInfo.multiIndex
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