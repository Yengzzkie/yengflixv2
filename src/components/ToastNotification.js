import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const showToast = (message, duration = 3000, type = "info") => {
  const colors = {
    info: "rgb(255, 22, 22)",
    success: "rgb(60 176 0)",
    error: "linear-gradient(to right, #ff5f6d, #ffc371)",
  };

  Toastify({
    text: message,
    duration: duration,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    backgroundColor: colors[type],
    style: {
        boxShadow: "-6px 6px 5px #000000"
    },
  }).showToast();
};

export default showToast;
