
//import blogsService from '../services/blogsService'
//import { useRef } from 'react'

const BlogForm = (props) => {
	const {
		setUrl,
		setTitle,
		setAuthor,
		url,
		title,
		author,
		onCreate,
		viewBlogForm
	} = props
	
	
	return(
		<div>
			
			<h3>Create new blog</h3>
			<form onSubmit={onCreate}>
				<p>Title</p><input value ={title} onChange={(e) => {setTitle(e.target.value)}}></input>
				<p>Author</p><input value ={author} onChange={(e) => {setAuthor(e.target.value)}}></input>
				<p>URL</p><input value = {url} onChange={(e) => {setUrl(e.target.value)}}></input>
				<button type = 'submit'>Create</button>
			</form>
			<button onClick={viewBlogForm}>cancel</button>
		</div>
	)
}

export default BlogForm