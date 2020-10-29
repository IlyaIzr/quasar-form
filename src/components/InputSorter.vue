<template>
  <div v-if="isRendered">
    <SimpleInput
      v-if="inputType === 'simple'"
      :type="inputInfo.type"
      :value="inputInfo.value"
      :label="inputInfo.label"
      :rest="inputInfo"
      :store="store"
      v-on:customevent="customF"
    />
  </div>
</template>

<script>
import SimpleInput from "./SimpleInput";
import { store } from "../store";

export default {
  name: "InputSorter",
  data() {
    return {
      store,
      isRendered: undefined,
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
  },
  computed: {
    inputType: function () {
      const type = this.inputInfo.type;
      console.log(this);
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
    store.updateKeyValue(this.inputInfo.key, this.inputInfo.value);

    if (this.inputInfo.renderIf) {
      if (store.getValueByKey(this.inputInfo.renderIf)) {
        this.isRendered = true;
      } else this.isRendered = false;
    } else this.isRendered = true;
  },
  methods: {
    customF(val) {
      this.isRendered = val;
    },
  },
};
</script>

<style>
</style>