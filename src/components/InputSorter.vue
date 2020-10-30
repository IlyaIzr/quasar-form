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
      }
    },
  },
  watch: {
    "store.state.watcher": function () {
      if (this.inputInfo.renderIf) {
        console.log("conditional render function runned");
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
    customF(val) {
      if (this.inputInfo.onChange) {
        const onChange = this.inputInfo.onChange();
        console.log("onChange injected function runned");
        this.$nextTick(function () {
          console.log("next tick");
          onChange(this.$children[0], vNodeStore);
        });
      }
    },
  },
};
</script>

<style>
</style>