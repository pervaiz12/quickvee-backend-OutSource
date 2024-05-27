import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ToastifyAlert = (msg, type) => {
  const options = {
    position: "top-right",
    transition: Slide,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "dark",
  };
  console.log(msg, type);

  switch (type) {
    case "error":
      toast.error(msg, options);
      break;

    case "success":
      toast.success(msg, options);
      break;

    case "info":
      toast.info(msg, options);
      break;

    case "warn":
      toast.warn(msg, options);
      break;

    default:
      break;
  }
};
