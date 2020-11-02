<template>
  <div class="q-my-sm">
    <q-btn
      v-if="resBtn.type"
      :label="resBtn.label"
      type="reset"
      :color="resBtn.color"
      :class="resBtn.class"
    />
    <q-btn
      :label="subBtn.label"
      type="submit"
      :color="subBtn.color"
      :class="subBtn.class"
    />
  </div>
</template>

<script>
export default {
  name: "Buttons",
  props: {
    buttons: {
      type: Array,
      required: false,
      default: () => [
        { type: "submit", label: "Отправить" },
        { type: "reset", label: "Сбросить" },
      ],
    },
  },
  computed: {
    subBtn() {
      let res = {};
      this.buttons.map((btn) => {
        if (btn.type === "submit") {
          !btn.color ? (btn.color = "primary") : null;
          btn.class += " q-ml-sm";
          res = { ...btn };
        }
      });
      return res;
    },
    resBtn() {
      let res = false;
      this.buttons.map((btn) => {
        if (btn.type === "reset") {
          !btn.color ? (btn.color = "primary") : null;
          res = { ...btn };
          console.log(res);
        }
      });
      return res;
    },
  },
};
</script>

<style>
</style>