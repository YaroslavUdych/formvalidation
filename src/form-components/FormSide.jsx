import React, { forwardRef } from 'react'

const FormSide = forwardRef((props, ref) => {
	return (
		<div className="form-side" ref={ref}>
			<h4>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, doloribus.</p>
		</div>
	)
})

export default FormSide
