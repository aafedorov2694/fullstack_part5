import blogs from '../services/blogsService'

const Login = (props) => {

	const {
		username,
		password,
		setUsername,
		setPassword,
		setUser,
		setNotification
	} = props

	const onChangeUsername = (event) => {
		setUsername(event.target.value)
	}
	const onChangePassword = (event) => {
		setPassword(event.target.value)
	}
	const onSubmit = async (event) => {
		event.preventDefault()

		const credentials = {
			username: username,
			password: password
		}
		
		try{
			const userCred = await blogs.loggingIn(credentials)
			window.localStorage.setItem('blogUser', JSON.stringify(userCred.data))
			console.log('logged in user: ', userCred.data)
			
			
			
			setUser(userCred.data)
		} catch(e) {
			setNotification('Wrong credentials')
			setTimeout(() => {
				setNotification(null)
			}, 5000)
		}
		setUsername('')
		setPassword('')
	

	}
	
	return(
		<div>
			<h2>Login</h2>
			<form onSubmit={onSubmit}>
				<p>Username</p>
				<input value={username} onChange={onChangeUsername}></input>
				<p>Password</p>
				<input type='password' value={password} onChange={onChangePassword}></input>
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default Login