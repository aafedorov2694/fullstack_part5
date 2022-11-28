import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import blogsService from './services/blogsService'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [notification, setNotification] = useState('')
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
 
	useEffect(() => {
		user !== null ?
		
			blogsService.getAll(user.token).then(blogs =>
				setBlogs([... blogs] )
			)
			: ''
		
	}, [user])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('blogUser')
		if(loggedUserJSON){
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
		}
	}, [])

	const onCreate = (event) => {
		event.preventDefault()
		const blog = {
			title: title,
			author: author,
			url: url
		} 
		console.log('blog in onCreate: ', blog)
		
		
		blogsService.createBlog(blog)
			.then(res => {
				console.log('resp in create blog: ', res)
				setBlogs(blogs.concat(res.data))
				setAuthor('')
				setTitle('')
				setUrl('')
				setNotification(`a new blog ${blog.title} by ${blog.author} added`)
				setTimeout(() => {
					setNotification(null)
				}, 5000)
			})
			
				
	}
	return (
		<div>
			<Notification
				setNotification = {setNotification}
				notification = {notification}
			/>
			{ 
				user === null &&
				<Login 
					username = {username}
					setUsername = {setUsername}
					setPassword = {setPassword}
					password = {password}
					user = {user}
					setUser = {setUser}
					setNotification = {setNotification}
					notification = {notification}
				/>
			}
			{
				user !== null &&
				<BlogForm
					blogs = {blogs}
					user = {user}
					setBlogs = {setBlogs}
					setUser = {setUser}
					title = {title}
					setTitle = {setTitle}
					author = {author}
					setAuthor = {setAuthor}
					url = {url}
					setUrl = {setUrl}
					onCreate = {onCreate}
					setNotification = {setNotification}
					notification = {notification}

				/>

			}
			
		</div>
	)
}

export default App
