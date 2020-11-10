<template>
  <q-stepper v-model="step" ref="stepper">
    <q-step
      v-for="(tab, index) in tabs.steps"
      v-bind:key="index"
      :name="Number(index) + 1"
      :title="tab.title"
    >
      <FormRow :row="sortedFields[index]" />
    </q-step>
    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn
          @click="$refs.stepper.next()"
          color="primary"
          :label="step === 4 ? 'Finish' : 'Continue'"
        />
        <q-btn
          v-if="step > 1"
          flat
          color="primary"
          @click="$refs.stepper.previous()"
          label="Back"
          class="q-ml-sm"
        />
      </q-stepper-navigation>
    </template>
  </q-stepper>
</template>

<script>
import FormRow from "../components/FormRow";
export default {
  name: "Stepper",
  components: {
    FormRow,
  },
  props: {
    tabs: {
      type: Object,
      required: true,
    },
    sortedFields: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      step: 1,
    };
  },
};
</script>

<style>
</style>