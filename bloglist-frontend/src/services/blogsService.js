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

const updatingBlog = (blog, likes) => {
	const token = JSON.parse(window.localStorage.getItem('blogUser')).token
	console.log('params: ', likes)
	const config = {
		headers: { 'Authorization': `Bearer ${token}` },
		params: { 'likes' : likes }
		
	} 
	console.log('blog in service: ', token)
	return axios.put( `${baseUrl}/${blog.id}`, blog, config)
		
	
}



const deleteBlog = (blog) => {
	const token = JSON.parse(window.localStorage.getItem('blogUser')).token
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}
	return axios.delete(`${baseUrl}/${blog.id}`, config)
		
	
}


export default { getAll, loggingIn, createBlog, updatingBlog, deleteBlog }