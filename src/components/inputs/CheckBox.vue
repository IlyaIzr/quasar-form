<template>
  <div class="q-gutter-md">
    <q-field
      ref="checkbox"
      :value="valueStore"
      :rules="rest.rules"
      borderless
      dense
    >
      <template v-slot:control>
        <q-checkbox
          ref="input"
          :value="valueStore"
          :label="rest.label"
          :name="keyName"
          :disable="rest.disable"
          @focus="onFocus"
          @blur="onBlur"
          @input="onInput"
          :rules="rest.rules"
        />
      </template>
    </q-field>
  </div>
</template>

<script>
import { store } from "../../store";
export default {
  name: "CheckBox",
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
      valueStore: this.getStoreValue(),
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
      this.$refs.checkbox.validate();
      this.$emit("input", val);
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
    setProp(name = "", value) {
      if (!name) console.log("WARNING! No prop name was given");
      this.rest[name] = value;
      this.$forceUpdate();
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