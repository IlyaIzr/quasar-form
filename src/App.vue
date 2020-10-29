<template>
  <div id="q-app" class="bg-white">
    <Mapper v-if="globalConfig.data" :settings="globalConfig" :values="globalValues" />
  </div>
</template>

<script>
import Mapper from "./components/Mapper";
import { config, values } from "./fakeData";
export default {
  components: { Mapper },
  name: "App",
  data() {
    return {
      globalConfig: config,
      globalValues: values,
    };
  },
};
</script>
