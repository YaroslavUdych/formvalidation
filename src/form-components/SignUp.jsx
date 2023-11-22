import React, { useState, useRef, useCallback, useEffect } from 'react'
import FormSide from './FormSide'
import validate from './validate'
import checkInput from './checkInput'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { gsap } from 'gsap'
import { Modal, Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

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

const SignUp = () => {
	// state for form inputs
	const [firstName, setFirstName] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [email, setEmail] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [phone, setPhone] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [password, setPassword] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [passwordConfirm, setPasswordConfirm] = useState({
		value: '',
		message: '',
		ok: false,
	})

	// for loading button
	const [loading, setLoading] = useState(false)

	// getting confirm password input for clearing it when password input is focused
	const confirmPasswordInput = useRef(null)

	// for show/hide password
	const [showPassword, setShowPassword] = useState(false)
	const handleClickShowPassword = () => setShowPassword((show) => !show)
	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}

	// useCallback for signUpHandler
	const signUpHandlerCallback = useCallback(
		(e) => {
			e.preventDefault()
			checkInput(firstName.value, validate.name, setFirstName)
			checkInput(email.value, validate.email, setEmail)
			checkInput(phone.value, validate.phone, setPhone)
			checkInput(password.value, validate.password, setPassword)
			checkInput(passwordConfirm.value, validate.confirmPassword, setPasswordConfirm, password.value)
			if (firstName.ok && email.ok && phone.ok && password.ok && passwordConfirm.ok) {
				setLoading(true)
				setTimeout(() => {
					handleOpen()
				}, 1000)
			}
		},
		[firstName, email, phone, password, passwordConfirm]
	)

	// for popover
	const [anchorEl, setAnchorEl] = useState(null)
	const [currentPopover, setCurrentPopover] = useState(null)

	const handlePopoverClick = (event, popover) => {
		setAnchorEl(event.currentTarget)
		setCurrentPopover(popover)
	}

	const handlePopoverClose = () => {
		setAnchorEl(null)
		setCurrentPopover(null)
	}

	// for modal
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
		window.location.reload()
	}

	// for animation
	const sigUpElement = useRef(null)
	useEffect(() => {
		gsap.from(sigUpElement.current, { x: 70, opacity: 0, duration: 1, ease: 'power2.inOut' })
		gsap.to(sigUpElement.current, { x: 0, opacity: 1, duration: 1, ease: 'power2.inOut' })
	}, [])

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
						You have successfully registered!
					</Typography>
				</Box>
			</Modal>
			<FormSide />
			<div className="form-item-wrapper" ref={sigUpElement}>
				<div className="form-item-text">
					<h2>Join us!</h2>
					<p>Please fill out the form below</p>
				</div>
				<form id="sign-up-form" action="#" className="form-item" onSubmit={signUpHandlerCallback}>
					<TextField
						type="text"
						id="sign-up-first-name"
						label="First name"
						helperText={firstName.message ? firstName.message : ''}
						variant="outlined"
						size="small"
						color={firstName.ok ? 'success' : 'secondary'}
						fullWidth
						margin="none"
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									{firstName.ok ? (
										<CheckCircleOutlineOutlinedIcon sx={{ color: 'green', marginRight: '-8px' }} />
									) : null}
									{firstName.message ? (
										<CancelOutlinedIcon sx={{ color: 'red', marginRight: '-8px' }} />
									) : null}
								</InputAdornment>
							),
						}}
						onInput={(e) => {
							checkInput(e.target.value, validate.name, setFirstName)
						}}
					/>
					<TextField
						type="email"
						id="sign-up-email"
						label="Email"
						helperText={email.message ? email.message : ''}
						variant="outlined"
						size="small"
						color={email.ok ? 'success' : 'secondary'}
						fullWidth
						margin="none"
						InputProps={{
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
					<TextField
						type="tel"
						id="sign-up-phone"
						label="Phone number"
						helperText={phone.message ? phone.message : ''}
						variant="outlined"
						size="small"
						color={phone.ok ? 'success' : 'secondary'}
						fullWidth
						margin="none"
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									{phone.ok ? (
										<CheckCircleOutlineOutlinedIcon sx={{ color: 'green', marginRight: '-8px' }} />
									) : null}
									{phone.message ? <CancelOutlinedIcon sx={{ color: 'red', marginRight: '-8px' }} /> : null}
								</InputAdornment>
							),
						}}
						onInput={(e) => {
							checkInput(e.target.value, validate.phone, setPhone)
						}}
					/>
					<TextField
						type={showPassword ? 'text' : 'password'}
						id="sign-up-password"
						label="Password"
						helperText={password.message ? password.message : ''}
						variant="outlined"
						size="small"
						color={password.ok ? 'success' : 'secondary'}
						fullWidth
						margin="none"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
										style={{ marginRight: '5px' }}
									>
										{showPassword ? <VisibilityOff color="secondary" /> : <Visibility color="secondary" />}
									</IconButton>
									{password.ok ? <CheckCircleOutlineOutlinedIcon sx={{ color: 'green' }} /> : null}
									{password.message ? <CancelOutlinedIcon sx={{ color: 'red' }} /> : null}
								</InputAdornment>
							),
						}}
						onInput={(e) => {
							checkInput(e.target.value, validate.password, setPassword)
						}}
						onFocus={() => {
							confirmPasswordInput.current.value = ''
							setPasswordConfirm({
								value: '',
								message: '',
								ok: false,
							})
						}}
					/>
					<TextField
						type={showPassword ? 'text' : 'password'}
						id="sign-up-confirm-password"
						label="Confirm password"
						helperText={passwordConfirm.message ? passwordConfirm.message : ''}
						variant="outlined"
						size="small"
						color={passwordConfirm.ok ? 'success' : 'secondary'}
						disabled={!password.ok}
						fullWidth
						margin="none"
						inputRef={confirmPasswordInput}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
										style={{ marginRight: '5px' }}
									>
										{showPassword ? <VisibilityOff color="secondary" /> : <Visibility color="secondary" />}
									</IconButton>
									{passwordConfirm.ok ? <CheckCircleOutlineOutlinedIcon sx={{ color: 'green' }} /> : null}
									{passwordConfirm.message ? <CancelOutlinedIcon sx={{ color: 'red' }} /> : null}
								</InputAdornment>
							),
						}}
						onInput={(e) => {
							checkInput(e.target.value, validate.confirmPassword, setPasswordConfirm, password.value)
						}}
					/>
					<div className="form-item-text">
						<p>
							By clicking Sign Up, you agree to our{' '}
							<Link
								component="button"
								variant="body2"
								onClick={(event) => {
									event.preventDefault()
									handlePopoverClick(event, 'termsOfUse')
								}}
							>
								Terms of Use
							</Link>{' '}
							and our{' '}
							<Link
								component="button"
								variant="body2"
								onClick={(event) => {
									event.preventDefault()
									handlePopoverClick(event, 'privacyPolicy')
								}}
							>
								Privacy Policy
							</Link>
						</p>
						<Popover
							anchorEl={null || document.body}
							open={Boolean(anchorEl)}
							onClose={handlePopoverClose}
							anchorOrigin={{
								vertical: 'center',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'center',
								horizontal: 'center',
							}}
						>
							{currentPopover === 'termsOfUse' && (
								<Typography
									sx={{
										p: 2,
										maxWidth: '400px',
										maxHeight: '300px',
										fontSize: '1rem',
										backgroundColor: 'whitesmoke',
										color: 'rgba(20,26,31)',
										overflowY: 'auto',
									}}
								>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam et saepe, fugit nesciunt
									placeat distinctio doloribus maxime architecto unde ratione, doloremque minus sapiente.
									Quidem praesentium vitae quas dolorum, unde ut.
								</Typography>
							)}
							{currentPopover === 'privacyPolicy' && (
								<Typography
									sx={{
										p: 2,
										maxWidth: '400px',
										maxHeight: '300px',
										fontSize: '1rem',
										backgroundColor: 'whitesmoke',
										color: 'rgba(20,26,31)',
										overflowY: 'auto',
									}}
								>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam fugiat quae architecto atque
									animi, necessitatibus et laboriosam exercitationem perferendis consequatur itaque, amet nulla
									tempore cum iure mollitia corporis dolores distinctio. Lorem ipsum, dolor sit amet
									consectetur adipisicing elit. Earum asperiores recusandae laudantium fuga voluptates id
									possimus in magni culpa explicabo. Modi, adipisci repellendus deserunt nisi perferendis
									molestias id consequatur quo! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
									Blanditiis nesciunt earum enim. Ipsam est eligendi voluptatum dicta eius voluptates
									obcaecati, expedita minima? Id aut similique commodi maxime aspernatur dolores consectetur.
								</Typography>
							)}
						</Popover>
					</div>
					<LoadingButton
						type="submit"
						variant="contained"
						size="normal"
						fullWidth
						loading={loading}
						loadingIndicator="Sending..."
					>
						Sign Up
					</LoadingButton>
				</form>
			</div>
		</div>
	)
}

export default SignUp
