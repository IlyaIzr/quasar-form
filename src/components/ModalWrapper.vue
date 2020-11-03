<template>
  <div v-if="isModal">
    <q-dialog
      v-model="isOpen"
      :persistent="modal.persistent"
      :maximized="modal.maximized"
      :transition-show="modal.transitionShow"
      :transition-hide="modal.transitionHide"
      :seamless="modal.seamless"
      :full-width="modal.fullWidth"
      :full-height="modal.fullHeigh"
      :position="modal.position"
    >
      <FormWrap :settings="settings" :values="values" />
    </q-dialog>

    <q-btn
      v-if="modal.triggerButton"
      type="btn"
      :label="modal.triggerButton.label"
      @click="isOpen = !isOpen"
      :color="modal.triggerButton.color"
      :text-color="modal.triggerButton.textColor"
    />
  </div>

  <FormWrap v-else :settings="settings" :values="values" />
</template>

<script>
import FormWrap from "./FormWrap";
export default {
  name: "ModalWrapper",
  components: { FormWrap },
  data() {
    return {
      modal: { ...this.settings.modal },
      isModal: Boolean(this.settings.modal),
      isOpen: this.settings.modal && this.settings.modal.opened === false ? false : true,
      maximized: Boolean(this.settings.modal && this.settings.modal.maximized),
    };
  },
  props: {
    settings: {
      type: Object,
      required: true,
    },
    values: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style>
</style>