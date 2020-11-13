<template>
  <q-stepper
    :value="step"
    @input="onInput"
    ref="stepper"
    animated
    :header-nav="tabs.tabNavigation"
    @before-transition="beforeStep"
  >
    <q-step
      v-for="(tab, index) in tabs.steps"
      v-bind:key="index"
      :name="Number(index) + 1"
      :title="tab.title"
      :icon="tab.icon"
      :error="Boolean(errors.find((el) => el === Number(index + 1)))"
    >
      <div v-for="(row, index) in fields[index]" v-bind:key="index">
        <FormRow :row="row" />
      </div>
    </q-step>
    <template v-slot:navigation>
      <q-stepper-navigation>
        <!-- Next btn -->
        <q-btn
          v-if="buttons.next && step <= tabs.steps.length"
          @click="onNextClick"
          :color="buttons.next.color"
          :label="buttons.next.label || 'Next'"
          :text-color="buttons.back.textColor || 'black'"
          :class="step === tabs.steps.length ? 'hidden' : 'q-mr-sm'"
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
          @click="trySubmit"
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
      errors: [],
    };
  },
  methods: {
    async onNextClick() {
      if (this.tabs.validateButtonNavigation) {
        const res = await this.$parent.$parent.validate();
        if (res) this.$refs.stepper.next();
      } else this.step += 1;
    },
    onBackClick() {
      this.$refs.stepper.previous();
    },
    async onInput(val) {
      let res;
      if (this.tabs.validateTabNavigation) {
        res = await this.$parent.$parent.validate();
        if (res) this.step = val;
      } else this.step = val;
    },
    async beforeStep(newVal, prevVal) {
      const res = await this.$parent.$parent.validate();
      if (res) this.errors = this.errors.filter((step) => step !== prevVal);
      else this.errors.push(prevVal);
    },
    async trySubmit(){
      await this.beforeStep(null, this.step)
      if (this.errors.length === 0) {
        this.$emit('submit')        
      } else {
        console.log('error case')
        console.log(this.errors)
        this.step = this.errors[0]
        }
    }
  },
};
</script>

<style>
</style>