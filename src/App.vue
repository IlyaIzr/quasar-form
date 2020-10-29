<template>
  <div id="q-app" v-on:change="onChange">
    <FormWrap
      v-if="globalConfig.data"
      :settings="globalConfig"
      :values="globalValues"
    />
  </div>
</template>

<script>
import { config, values } from "./fakeData";
import FormWrap from "./components/FormWrap";
export default {
  name: "App",
  data() {
    return {
      globalConfig: config,
      globalValues: values,
    };
  },
  components: { FormWrap },
  methods: {
    onChange(e){
      // console.log(this)
    }
  },
};
</script>
