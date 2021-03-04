<template>
  <div v-if="isModal">
    <q-dialog v-model="isOpen" v-bind="modal">
      <Form :settings="settings" :values="values" />
    </q-dialog>

    <q-btn
      v-if="modal.triggerButton"
      v-bind="modal.triggerButton"
      type="btn"
      @click="isOpen = !isOpen"
    />
  </div>

  <Form v-else :settings="settings" :values="values" />
</template>

<script>
import { vNodeStore } from "src/store";
import Form from "./Form";
export default {
  name: "ModalWrapper",
  components: { Form },
  data() {
    return {
      modal: { ...this.settings.modal },
      isModal: Boolean(this.settings.modal),
      isOpen: this.settings.modal?.opened === false ? false : true,
      maximized: Boolean(this.settings.modal?.maximized),
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
  mounted() {
    if (this.isModal) vNodeStore.closeModal = () => (this.isOpen = false);
  },
};
</script>

<style>
</style>