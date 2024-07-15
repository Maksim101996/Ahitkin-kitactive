import { combineReducers, configureStore } from "@reduxjs/toolkit"
import profileReducer from "./Reducers/ProfileSlice"

const rootReducer = combineReducers({
	profile: profileReducer
})


export const createStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}