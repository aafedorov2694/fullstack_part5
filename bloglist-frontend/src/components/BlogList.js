import Blog from './Blog'
//import { useRef } from 'react'
//import Togglable from '../components/Togglable'


const BlogList = ({ blogs, addLike, removeBlog }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
		
	}
	
	
	

	return(
		<div>
			<h2>blogs</h2>
			{blogs.map(blog =>
				<div key = {blog.id} style = {blogStyle}>
					<Blog  blog={blog}  addLike = {addLike} removeBlog = { removeBlog }/> 
				</div>
			)}
		</div>
	)
}
export default BlogList