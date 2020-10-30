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
    />
  </div>
</template>

<script>
import SimpleInput from "./inputs/SimpleInput";
import SelectInput from "./inputs/SelectInput";
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
      } else if (type === "select") {
        inputType = "select";
        return inputType;
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

    if (this.inputInfo.renderIf) {
      if (store.getValueByKey(this.inputInfo.renderIf)) {
        this.isRendered = true;
      } else this.isRendered = false;
    } else this.isRendered = true;
    if (this.isRendered)
      store.updateKeyValue(this.inputInfo.key, this.inputInfo.value); //don't set value unless field is visible
  },
  mounted() {
    vNodeStore.setComponent(this.inputInfo.key, this);
  },
  methods: {
    onInput(val) {
      if (this.inputInfo.onChange) {
        const onChange = this.inputInfo.onChange();
        this.$nextTick(function () {
          onChange(this.$children[0], vNodeStore);
        });
      }
      console.log(store.state)
    },
  },
};
</script>

<style>
</style>