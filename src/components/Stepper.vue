<template>
  <q-stepper v-model="step" ref="stepper" animated header-nav>
    <q-step
      v-for="(tab, index) in tabs.steps"
      v-bind:key="index"
      :name="Number(index) + 1"
      :title="tab.title"
      :icon="tab.icon"
    >
      <FormRow :row="fields[index]" />
    </q-step>
    <template v-slot:navigation>
      <q-stepper-navigation>
        <!-- Next btn -->
        <q-btn
          v-if="buttons.next && step < tabs.steps.length"
          @click="onNextClick"
          :color="buttons.next.color"
          :label="buttons.next.label || 'Next'"
          :text-color="buttons.back.textColor || 'black'"
          class="q-mr-sm"
        />
        <!-- Back btn -->
        <q-btn
          v-if="buttons.back && step > 1"
          @click="onBackClick"
          :color="buttons.back.color"
          :label="buttons.back.label || 'Back'"
          :text-color="buttons.back.textColor || 'black'"
          class="q-mr-sm"
        />
        <!-- Submit btn -->
        <q-btn
          v-if="buttons.submit && step === tabs.steps.length"
          type="submit"
          :color="buttons.submit.color || 'primary'"
          :label="buttons.submit.label || 'Submit'"
          :text-color="buttons.submit.textColor || 'black'"
          class="q-mr-sm"
        />
        <!-- Reset btn -->
        <q-btn
          v-if="buttons.reset"
          type="reset"
          :color="buttons.reset.color || 'primary'"
          :label="buttons.reset.label || 'Reset'"
          :text-color="buttons.reset.textColor || 'black'"
          class="q-mr-sm"
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
      buttons: this.tabs.buttons,
    };
  },
  methods: {
    async onNextClick() {
      const res = await this.$parent.$parent.validate();
      if (res) this.$refs.stepper.next();
    },
    onBackClick() {
      this.$refs.stepper.previous();
    },
  },
};
</script>

<style>
</style>