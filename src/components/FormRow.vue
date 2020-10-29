<template>
  <div class="row q-col-gutter-x-md q-col-gutter-y-lg">
    <div v-for="item in row" v-bind:key="item.key" class="col">
      <InputSorter :inputInfo="item"/>
    </div>
  </div>
</template>

<script>
import InputSorter from "./InputSorter";
export default {
  name: "FormRow",
  components: {
    InputSorter,
  },
  props: {
    row: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>