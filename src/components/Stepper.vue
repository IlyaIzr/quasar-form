<template>
  <q-stepper v-model="step" ref="stepper">
    <q-step
      v-for="(tab, index) in tabs.steps"
      v-bind:key="index"
      :name="Number(index) + 1"
      :title="tab.title"
    >
      <FormRow :row="fields[index]" />
    </q-step>
    <template v-slot:navigation>
      <q-stepper-navigation>
        <!-- Next btn -->
        <q-btn
          @click="onNextClick"
          color="primary"
          :label="step === 4 ? 'Finish' : 'Continue'"
        />
        <!-- Back btn -->
        <q-btn
          v-if="step > 1"
          flat
          color="primary"
          @click="onBackClick"
          label="Back"
          class="q-ml-sm"
        />
      </q-stepper-navigation>
    </template>
    <Buttons :buttons="settings.buttons" :modal="settings.modal" />
  </q-stepper>
</template>

<script>
import FormRow from "../components/FormRow";
import Buttons from "./Buttons";
export default {
  name: "Stepper",
  components: {
    FormRow,
    Buttons,
  },
  props: {
    tabs: {
      type: Object,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    settings: {
      type: Object || Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      step: 1,
    };
  },
  methods: {
    onNextClick() {
      this.$refs.stepper.next();
    },
    onBackClick() {
      this.$refs.stepper.previous();
    },
  },
};
</script>

<style>
</style>