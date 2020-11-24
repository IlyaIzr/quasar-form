<template>
  <div class="q-gutter-md">
    <q-card-section
      v-if="rest.visible === undefined ? true : rest.visible"
      ref="editor"
      :name="keyName"
      :disable="rest.disable"
      v-html="localValue"
      @focus="onFocus"
    />
  </div>
</template>

<script>
export default {
  name: "Html",
  props: {
    keyName: {
      type: String,
      required: true,
    },
    rest: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      localValue: this.value,
      archiveRest: { ...this.rest },
    };
  },

  methods: {
    onFocus(e) {
      this.$emit("focus", e);
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
      this.localValue = val;
    },
    reset() {
      this.setConfig(this.archiveRest)
      this.setValue(this.archiveRest.value)
    },
  },
};
</script>

<style>
</style>