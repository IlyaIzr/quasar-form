<template>
  <div>
    <p class="text-subtitle1 q-mb-none">{{ label }}</p>
    <div v-for="(item, index) in valueStore" v-bind:key="item.key" class="col">
      <FieldMapper
        :fields="rest.fields"
        :multiKey="multiKey"
        :values="rest.value[index]"
        :rowIndexMultiple="Number(index)"
      />
    </div>
  </div>
</template>

<script>
import FieldMapper from "../FieldMapper";
export default {
  name: "Multiple",
  components: {
    FieldMapper: () => import("../FieldMapper.vue"),
  },
  props: {
    label: {
      type: String,
      required: false,
      default: "",
    },
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
      valueStore: this.store.getValueByKey(this.multiKey),
      // rules: this.checkRules(this.rest.rules, this.rest.required),
    };
  },
};
</script>

<style>
</style>