// import { Modal } from "bootstrap";
import Modal from "bootstrap/js/dist/modal";

export default {
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, {
      // 禁用鍵盤 Esc 關閉 modal
      keyboard: false,
      // 禁止點擊 Modal 以外區域以關閉對話框
      backdrop: "static",
    });
  },
};
