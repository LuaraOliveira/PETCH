import Swal from "sweetalert2";
export function AlertMessage(title, icon) {
  return Swal.mixin({
    toast: true,
    position: "top-end",
    timer: 5000,
    showConfirmButton: false,
    customClass: {
      popup: `Alert--${icon}`,
      title: `Alert--${icon}--title`,
    },
  }).fire(title, undefined, icon);
}
