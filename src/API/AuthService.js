import axios from 'axios';

const instance = axios.create({
	baseURL: `https://js-test.kitactive.ru`,
})

export const AuthService = {
	registration: async (name, email, password) => {
		try {
			const response = await instance.post(`/api/register`, { name, email, password })
			return response.status
		}
		catch (error) {
			console.log(error)
		}
	},
	login: async (email, password) => {
		try {
			const response = await instance.post(`/api/login`, { email, password })
			localStorage.setItem('access token', response.data.token)
			return response.status
		}
		catch (error) {
			console.log(error)
		}
	},
	logout: async () => {
		const token = localStorage.getItem('access token')
		try {
			const response = await instance.post(`/api/logout`, {}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			localStorage.removeItem('access token')
			return response.status
		}
		catch (error) {
		}
	},
	getFiles: async () => {
		const token = localStorage.getItem('access token')
		try {
			const response = await instance.get(`/api/media`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			return { error: false, files: response.data.files }
		}
		catch (error) {
			return { error: error }
		}
	},
	postFiles: async (file) => {
		const token = localStorage.getItem('access token')
		try {
			const response = await instance.post(`/api/media/upload`, { files: [file] }, {
				headers: {
					Authorization: `Bearer ${token}`,
					'content-type': 'multipart/form-data'
				}
			})
			return { error: false, response: response }
		}
		catch (error) {
			return { error: error }
		}
	},
	getFile: async (id) => {
		const token = localStorage.getItem('access token')
		try {
			const response = await instance.get(`/api/media/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					responseType: 'blob'
				}
			})
			return { error: false, data: response.data }
		}
		catch (error) {
			return { error: error }
		}
	},
	deleteFile: async (id) => {
		const token = localStorage.getItem('access token')
		try {
			const response = await instance.delete(`/api/media/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			return { error: false, status: response.status }
		}
		catch (error) {
			return { error: error }
		}
	}
}




