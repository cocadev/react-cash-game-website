import { toast } from 'react-toastify';


export  default function customToastify(text, type = false, position = false) {
	switch (type) {
		case "error":
			if (!position) {
				toast.error(text);
			} else {
				toast.error(text, {
					position: toast.POSITION[position]
				});
			}
			break;
		case "success":
			if (!position) {
				toast.success(text);
			} else {
				toast.success(text, {
					position: toast.POSITION[position]
				});
			}
			break;
		case "info":
			if (!position) {
				toast.info(text);
			} else {
				toast.info(text, {
					position: toast.POSITION[position]
				});
			}
			break;
		case "warn":
			if (!position) {
				toast.warn(text);
			} else {
				toast.warn(text, {
					position: toast.POSITION[position]
				});
			}
			break;
		default:
			if (!position) {
				toast(text);
			} else {
				toast(text, {
					position: toast.POSITION[position]
				});
			}
			break;
	}
}

