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
        <!-- Back btn -->
        <q-btn
          v-if="buttons.back && step > 1"
          @click="onBackClick"
          :color="buttons.back.color"
          :label="buttons.back.text || 'Back'"
          :text-color="buttons.back.textColor || 'black'"
          class="q-mr-sm"
        />
        <!-- Next btn -->
        <q-btn
          v-if="buttons.next && step <= tabs.steps.length"
          @click="onNextClick"
          :color="buttons.next.color"
          :label="buttons.next.text || 'Next'"
          :text-color="buttons.back.textColor || 'black'"
          :class="step === tabs.steps.length ? 'hidden' : 'q-mr-sm'"
          class="q-mr-sm"
        />
        <!-- Submit btn -->
        <q-btn
          v-if="buttons.submit && step === tabs.steps.length"
          type="submit"
          @click="trySubmit"
          :color="buttons.submit.color || 'primary'"
          :label="buttons.submit.text || 'Submit'"
          :text-color="buttons.submit.textColor || 'black'"
          class="q-mr-sm"
        />
        <!-- Reset btn -->
        <q-btn
          v-if="buttons.reset"
          type="reset"
          :color="buttons.reset.color || 'primary'"
          :label="buttons.reset.text || 'Reset'"
          :text-color="buttons.reset.textColor || 'black'"
          class="q-mr-sm"
        />
        <!-- Clear btn -->
        <q-btn
          v-if="buttons.clear"
          type="button"
          :color="buttons.clear.color || 'primary'"
          :label="buttons.clear.text || 'Clear'"
          :text-color="buttons.clear.textColor || 'black'"
          class="q-mr-sm"
          @click="$emit('clear')"
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
  // computed: {
  //   localFields() {
  //     let res = [];
  //     this.fields.map((tab) => {
  //       let tabs = [];
  //       tab.map((row) => {
  //         let rows = [];
  //         row.map((field) => {
  //           console.log(field.value);
  //           if (!field.value || !field.value.length) {
  //             console.log("fuken case", field);
  //             field.value = "";
  //           }
  //           rows.push({...field});
  //         });
  //         tabs.push(rows);
  //       });
  //       res.push(tabs);
  //     });
  //     console.log(res);
  //     return res;
  //   },
  // },
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
    async trySubmit() {
      await this.beforeStep(null, this.step);
      if (this.errors.length === 0) {
        this.$emit("submit");
      } else {
        this.step = await this.errors[0];
        // this.$nextTick(async function () { // TODO
        //   this.step += 1
        //   this.$emit("submit");
        // });
      }
    },
  },
};
</script>

<style>
</style>