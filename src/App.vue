<template>
  <div id="q-app">
    <FormWrap
      v-if="globalConfig"
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
  beforeMount(){
    if (!this.globalConfig) console.log('no config provided to form constructor')
  }
};
</script>
