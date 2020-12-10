<template>
  <div v-if="rest.visible === undefined ? true : rest.visible" class="q-my-md relative-position" >
    <q-card-section class="relative-position q-pa-md q-pt-none q-ma-lg">
      <q-separator class="bg-primary absolute-center" />
      <p
        class="text-subtitle1 q-qx-md absolute-center bg-white"
        style="border: 5px white solid"
      >
        {{ rest.label }}
      </p>
    </q-card-section>
    <q-card
      v-for="(item, index) in value"
      v-bind:key="item.key"
      class="col my-card q-mb-md q-pa-sm q-pb-xs"
      flat
      bordered
    >
      <q-card-section class="relative-position q-mx-sm q-pa-xs">
        <q-btn
          class="q-my-sm absolute-top-right"
          style="top: -25px"
          size="xs"
          :label="buttons.deleteField.text || 'x'"
          :color="buttons.deleteField.color || 'red'"
          :text-color="buttons.deleteField.textColor || 'white'"
          :disable="buttons.deleteField.disabled"
          @click="deleteField(index)"
        />
      </q-card-section>

      <FieldMapper
        :fields="rest.fields || []"
        :multiKey="multiKey"
        :values="value[index]"
        :rowIndexMultiple="Number(index)"
      />
    </q-card>
    <q-btn
      :style="value.length ? 'position: absolute; right: 0px; bottom: 60px;' : 'position: absolute; right: 20px; bottom: 45px;'"
      class="q-mr-md"
      size="sm"
      :label="buttons.addField.text || '+'"
      :color="buttons.addField.color || 'green'"
      :text-color="buttons.addField.textColor"
      :disable="buttons.addField.disabled"
      @click="addField"
    />
    <q-field
      ref="checkbox"
      :value="value.length"
      :rules="rest.rules"
      borderless
      style="height: 1px"
      dense
    >
      <template v-slot:control>
        <!-- <q-checkbox :value="checkboxValue" disable /> -->
      </template>
    </q-field>
  </div>
</template>

<script>
import FieldMapper from "../FieldMapper";
import { store } from "../../store";
export default {
  name: "Multiple",
  components: {
    FieldMapper: () => import("../FieldMapper.vue"),
  },
  props: {
    multiKey: {
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
      value: this.store.getValueByKey(this.multiKey),
      buttons: this.rest.buttons
        ? this.rest.buttons
        : { addField: {}, deleteField: {} },
      archiveRest: { ...this.rest },
    };
  },
  // computed: {
  //   checkboxValue() {
  //     let res = "";
  //     const rulesArr = this.rest.rules;
  //     const f = rulesArr[0];
  //     res = f(this.value.length);
  //     if (typeof res !== "boolean") res = false;
  //     return res;
  //   },
  // },
  methods: {
    deleteField(index) {
      let res = [...this.value];
      res.splice(index, 1);
      this.value = res;
      store.deleteMultiField(this.multiKey, index);
    },
    addField() {
      let fields = [...this.value];
      let res = {};
      //shouldAddPreviousValue ?
      if (!this.rest.shouldAddPreviousValue && this.rest.value[0]) {
        for (const [key, value] of Object.entries(this.rest.value[0])) {
          res[key] = "";
        }
      } else {
        this.rest.fields.forEach((field, index) => {
          res[field.key] = field.value || "";
        });
      }
      fields.push(res);

      this.value = fields;
      // store.updateKeyValue(this.multiKey, fields);
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
      store.updateKeyValue(this.multiKey, val);
      this.value = this.store.getValueByKey(this.multiKey);
    },
    reset() {
      this.setConfig(this.archiveRest);
      this.setValue(this.archiveRest.value);
    },
  },
  mounted() {
    this.validate = this.$refs.checkbox.validate
    if (this.rest.hasOwnProperty("visible") && !this.rest.visible) {
      this.$parent.$el.parentNode.className += " hidden";
    }
  },
  watch: {
    "this.rest.visible": function () {
      if (this.rest.hasOwnProperty("visible") && !this.rest.visible) {
        this.$parent.$el.parentNode.className += " hidden";
      }
    },
  },
};
</script>

<style>
</style>