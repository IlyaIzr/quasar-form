<template>
  <div id="q-app">
    <ModalWrapper
      v-if="globalConfig"
      :settings="globalConfig"
      :values="globalValues"
    />
  </div>
</template>

<script>
import { config, values } from "./fakeData";
import ModalWrapper from "./components/ModalWrapper";
export default {
  name: "App",
  data() {
    return {
      globalConfig: config,
      globalValues: values,
    };
  },
  components: { ModalWrapper },
  beforeMount(){
    if (!this.globalConfig) console.log('no config provided to form constructor')
  }
};
</script>
