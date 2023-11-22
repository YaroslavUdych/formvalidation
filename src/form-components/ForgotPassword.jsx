import React, { useState, useEffect, useRef } from 'react'
import FormSide from './FormSide'
import validate from './validate'
import checkInput from './checkInput'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import InputAdornment from '@mui/material/InputAdornment'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import EmailIcon from '@mui/icons-material/Email'
import { Modal, Box, Typography } from '@mui/material'
import { gsap } from 'gsap'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	p: 4,
	borderRadius: '5px',
}

const ForgotPassword = () => {
	const [email, setEmail] = useState({
		value: '',
		message: '',
		ok: '',
	})
	// for loading button
	const [loading, setLoading] = useState(false)

	// for modal
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
		window.location.reload()
	}

	// for animation
	const forgotPassElement = useRef(null)
	useEffect(() => {
		gsap.from(forgotPassElement.current, { x: 70, opacity: 0, duration: 1, ease: 'power2.inOut' })
		gsap.to(forgotPassElement.current, { x: 0, opacity: 1, duration: 1, ease: 'power2.inOut' })
	}, [])

	// for form submit
	function forgotPasswordFormHendler(e) {
		e.preventDefault()
		checkInput(email.value, validate.email, setEmail)
		if (email.ok) {
			setLoading(true)
			setTimeout(() => {
				handleOpen()
			}, 1000)
		}
	}

	return (
		<div className="form-wrapper">
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Example message:
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Check your mail!
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						We sent you a new password
					</Typography>
				</Box>
			</Modal>
			<FormSide />
			<div className="form-item-wrapper" ref={forgotPassElement}>
				<div className="form-item-text">
					<h2>Forgot password?</h2>
					<p>Enter your email and we will send you a new password</p>
				</div>
				<form id="forgot-password-form" action="#" className="form-item" onSubmit={forgotPasswordFormHendler}>
					<TextField
						type="email"
						id="forgot-password-email"
						label="Email"
						helperText={email.message ? email.message : ''}
						variant="outlined"
						size="small"
						color={email.ok ? 'success' : 'secondary'}
						fullWidth
						margin="none"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<EmailIcon />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="start">
									{email.ok ? (
										<CheckCircleOutlineOutlinedIcon sx={{ color: 'green', marginRight: '-8px' }} />
									) : null}
									{email.message ? <CancelOutlinedIcon sx={{ color: 'red', marginRight: '-8px' }} /> : null}
								</InputAdornment>
							),
						}}
						onInput={(e) => {
							checkInput(e.target.value, validate.email, setEmail)
						}}
					/>
					<LoadingButton
						id="forgot-password-submit"
						type="submit"
						variant="contained"
						size="normal"
						fullWidth
						color="primary"
						loading={loading}
						loadingIndicator="Sending..."
					>
						Send
					</LoadingButton>
				</form>
			</div>
		</div>
	)
}

export default ForgotPassword
