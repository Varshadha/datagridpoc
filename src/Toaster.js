import { toast } from 'react-toastify';
 
export default class Toaster {
    static show (type, message){
        switch(type){
            case 'success':
                toast.success(message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            case 'error':
                toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            case 'warning':
                toast.warn(message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            case 'info':
                toast.info(message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            default :
                toast.info(message, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                break;
        }
    }
}