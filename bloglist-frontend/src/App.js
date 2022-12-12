import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import blogsService from './services/blogsService'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

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
		
			blogsService.getAll(user.token).then(blogs => {
				blogs.sort((a,b) => a.likes - b.likes).reverse()
				setBlogs([... blogs] )
			}
				
			)
			: ''

		//blogs.sort((a,b) => a.likes - b.likes)
		
	}, [user])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('blogUser')
		if(loggedUserJSON){
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
		}
	}, [])

	console.log('blogs: ', blogs)
	
	

	const onLogout = () => {
		window.localStorage.removeItem('blogUser') 
		setUser(null)
	}

	const onCreate = (event) => {
		event.preventDefault()
		const blog = {
			title: title,
			author: author,
			url: url
		} 
		
		
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

	const addLike = (blog) => {
		const likes = blog.likes+1
		console.log('likes in blog: ', likes	)
		blogsService.updatingBlog(blog, likes)
			.then(res => {
				console.log(res)
				
			})
			.then(() => {
				blogsService.getAll(user.token).then(blogs => {
					blogs.sort((a,b) => a.likes - b.likes).reverse()
					setBlogs([... blogs] )
				}
					
				)
				
			})
			.catch(e => console.log('e: ', e))
		
	}

	const removeBlog = async (blog) => {
		const popup = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
		
		
		
		if(popup) {
			try{
				const deletion  = await blogsService.deleteBlog(blog)
				console.log(deletion)
			} catch(e){console.log(e)}
			
		}
		const getAllBlogs = await blogsService.getAll(user.token)
		setBlogs(getAllBlogs.sort((a,b) => a.likes - b.likes).reverse())
	}

	

	

	const blogFormRef = useRef()
	const loginFormRef = useRef()
	const viewLoginForm = () => {
		loginFormRef.current.toggleVisibility()
	}
	const viewBlogForm = () => {
		blogFormRef.current.toggleVisibility()
		blogFormRef.current.toggleVisibilityInForm()
		console.log('visible from app: ', blogFormRef.current.visibleInForm)
	}
	return (
		<div>
			<Notification
				setNotification = {setNotification}
				notification = {notification}
			/>
			{ 
				user === null &&
				<Togglable buttonLabel = 'log in' ref = {loginFormRef} >
					<Login 
						username = {username}
						setUsername = {setUsername}
						setPassword = {setPassword}
						password = {password}
						user = {user}
						setUser = {setUser}
						setNotification = {setNotification}
						notification = {notification}
						viewLoginForm = { viewLoginForm }
					/>
				</Togglable>
			}
			{
				user !== null &&
				<div>
					<p>{user.name} is logged in</p>
					<button onClick={onLogout}>logout</button>
					<Togglable buttonLabel='new blog' buttonLabelHide='cancel' ref = {blogFormRef}>
						<BlogForm
							user={user}
							setBlogs={setBlogs}
							setUser={setUser}
							title={title}
							setTitle={setTitle}
							author={author}
							setAuthor={setAuthor}
							url={url}
							setUrl={setUrl}
							onCreate={onCreate}
							setNotification={setNotification}
							notification={notification}
							viewBlogForm = { viewBlogForm } />
					</Togglable>
					<BlogList
						blogs={blogs}
						setBlogs={setBlogs}
						setNotification={setNotification}
						notification={notification}
						addLike = {addLike}
						removeBlog = {removeBlog}
						
					/>
				</div>

			}
			
		</div>
	)
}

export default App
