import Togglable from '../components/Togglable'
import { useRef } from 'react'
const Blog = ({ blog, addLike, removeBlog }) => {
	
	

	
	const blogRef = useRef()
	const toggleVisibility = () => {
		blogRef.current.toggleVisibility()
		
	}

	

	

	return(
		<div >
		
			{blog.title}
			
			<Togglable toggleVisibility={toggleVisibility}  buttonLabel = 'view' ref = {blogRef}>
				<button onClick = {toggleVisibility}>hide</button>
				<br/>
				URL: {blog.url} 
				<br/> 
				Likes: {blog.likes} <button onClick={() => (addLike(blog))}>like</button>
				<br/> 
				Author: {blog.author}
				<br/>
				<button onClick = {() => removeBlog(blog)}>remove</button>
			</Togglable>
			
		</div>  
	)


}

export default Blog