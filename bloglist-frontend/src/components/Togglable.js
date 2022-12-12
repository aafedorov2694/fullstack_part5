import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef( (props, refs) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }
	
	const toggleVisibility = () => {
		setVisible(!visible)
		
	}
	Togglable.propTypes = {
		buttonLabel: PropTypes.string.isRequired
	}

	Togglable.displayName = 'Togglable'


	useImperativeHandle(refs, () => { 
		return { toggleVisibility, visible }  
	})
	return(
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			
			<div style={showWhenVisible}>
				
				{props.children}
				
				
			</div>
		</div>
	)
})

export default Togglable