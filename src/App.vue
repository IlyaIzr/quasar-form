<template>
  <div id="q-app" class="bg-white">
    <Mapper v-if="globalSettings.data" :settings="globalSettings" />
  </div>
</template>

<script>
import Mapper from "./components/Mapper";
import { gSettings } from "./fakeData";
export default {
  components: { Mapper },
  name: "App",
  data() {
    return {
      // globalSettings: { data: {}, label: "working" },
      globalSettings: gSettings,
    };
  },
};
</script>
