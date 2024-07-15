import { AuthService } from "../API/AuthService"
import { deleteFile, getFilesError, getFilesLoading, getFilesSuccess } from "./Reducers/ProfileSlice"

//Асинхронные экшен-креайторы(thunk), делает запрос на сервер и обрабатывает его.
export const getFilesAC = () => async (dispatch) => {
	dispatch(getFilesLoading(true))
	const res = await AuthService.getFiles()
	if (!res.error) {
		dispatch(getFilesSuccess(res.files))
	} else {
		dispatch(getFilesError(res.error))
	}
}

export const getFileAC = (id) => async (dispatch) => {
	const res = await AuthService.getFile(id)
	if (!res.error) {
		return res
	} else {
		dispatch(getFilesError(res.error))
	}
}

export const sendFilesAC = (file) => async (dispatch) => {
	dispatch(getFilesLoading(true))
	const res = await AuthService.postFiles(file)
	if (!res.error) {
		dispatch(getFilesAC())
	}
	else {
		dispatch(getFilesError(res.error))
	}
}

export const deleteFileAC = (id) => async (dispatch) => {
	dispatch(getFilesLoading(true))
	const res = await AuthService.deleteFile(id)
	if (res.status === 200) {
		dispatch(deleteFile(id))
	}
	else {
		dispatch(getFilesError(res.error))
	}
}

