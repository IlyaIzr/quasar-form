<template>
  <div v-if="row" class="row q-col-gutter-x-md q-col-gutter-y-lg">
    <FieldSorter :inputInfo="item" v-for="item in row" v-bind:key="item.key" />
  </div>
</template>

<script>
import FieldSorter from "./FieldSorter";
export default {
  name: "FormRow",
  components: {
    FieldSorter,
  },
  props: {
    row: {
      type: Array || undefined,
      required: true,
    },
  },
};
</script>

<style>
</style>