import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	files: [],
	isLoading: false,
	error: ''
}


export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		getFilesLoading(state) {
			state.isLoading = true
		},
		getFilesSuccess(state, action) {
			state.isLoading = false
			state.error = ''
			state.files = action.payload
		},
		getFilesError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},
		deleteFile(state, action) {
			state.files = state.files.filter(el => el.id !== action.payload)
			state.isLoading = false
		}
	}
})


export const { getFilesLoading, getFilesSuccess, getFilesError, deleteFile } = profileSlice.actions


export default profileSlice.reducer