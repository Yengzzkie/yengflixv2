import { toast } from "react-toastify";

const notifySuccess = () => {
  toast.success("Movie added to the list", {
    className: "toast",
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const notifyError = () => {
  toast.error("Movie already in the list", {
    className: "toast",
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

// const notifySuccessRemoved = () => {
//   toast.success("Movie removed from the list", {
//     className: "toast",
//     position: "top-right",
//     autoClose: 3000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "colored",
//   });
// };

export { notifySuccess, notifyError };
