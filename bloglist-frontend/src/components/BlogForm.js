import Blog from './Blog'
//import blogsService from '../services/blogsService'

const BlogForm = (props) => {
	const {
		blogs,
		user,
		setUser,
		setUrl,
		setTitle,
		setAuthor,
		url,
		title,
		author,
		onCreate
	} = props
	console.log('token in blog creation: ', JSON.parse(window.localStorage.getItem('blogUser')).token)
	
	const onLogout = () => {
		window.localStorage.removeItem('blogUser') 
		setUser(null)
	}
	
	
	

	return(
		<div>
			<p>{user.name} is logged in</p>
			<button onClick = {onLogout}>logout</button>
			<h3>Create new blog</h3>
			<form onSubmit={onCreate}>
				<p>Title</p><input value ={title} onChange={(e) => {setTitle(e.target.value)}}></input>
				<p>Author</p><input value ={author} onChange={(e) => {setAuthor(e.target.value)}}></input>
				<p>URL</p><input value = {url} onChange={(e) => {setUrl(e.target.value)}}></input>
				<button type = 'submit'>Create</button>
			</form>
			<h2>blogs</h2>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog}/>
			)}
		</div>
	)
}

export default BlogForm