import Swal from "sweetalert2";

export default function showSuccessToast(message) {
  return new Promise((resolve) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: message,
    }).then(() => {
      // 確保成功通知顯示後 resolve Promise
      resolve();
    });
  });
}
