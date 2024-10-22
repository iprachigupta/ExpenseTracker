import {toast} from "react-toastify";

export const handleSuccess = (message) =>{
    toast.success(message);
}

export const handleError = (message) =>{
    toast.error(message);
}