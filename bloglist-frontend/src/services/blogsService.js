import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
const loginUrl = 'http://localhost:3003/api/login'


const getAll = (token) => {

	const request = axios.get(baseUrl, {
		headers:{
			'Authorization': `Bearer ${token}`
		}
	})
	return request.then(response => response.data)
}

const createBlog = async blog => {
	const token = JSON.parse(window.localStorage.getItem('blogUser')).token
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}
	
	const response =  axios.post(baseUrl, blog, config)
	return response
		
}

const loggingIn = (credentials) => {
	const request = axios.post(loginUrl, credentials)
	return request.then(response => response)
}



export default { getAll, loggingIn, createBlog }