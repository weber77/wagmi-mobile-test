import { Id, TypeOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successToast = (msg: string) =>
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",

  });

export const errorToast = (msg: string) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const warningToast = (msg: string) => {
  toast.warning(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const infoToast = (msg: string, time?: number) => {
  toast.info(msg, {
    position: "top-right",
    autoClose: time || 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const promiseToast = (msg: string) => {
  return toast.loading(msg, {
    position: "top-right",
    // autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const updateToast = (msg: string, id: Id, type: TypeOptions | null | undefined) => {
  toast.update(id, {
    render: msg,
    type: type,
    isLoading: false,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
