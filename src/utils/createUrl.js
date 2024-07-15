import { getFileAC } from "../store/AsyncActionCreators"

//функция забирающая часть логики по созднию урла 
export const createUrl = async (id, mimeType, dispatch) => {
	const data = await dispatch(getFileAC(id));
	const blob = new Blob([data], { type: mimeType });
	const url = window.URL.createObjectURL(blob);
	return url;

};