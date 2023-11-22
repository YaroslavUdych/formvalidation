// Desc: object with methods for validating form fields, returns message string and isValid boolean

const validate = {
	// validate name
	name: (value) => {
		const regex = /^\s*[^0-9\s₴`~!"№;%:#?*()_+\-=^&{}[\]\\|<,>./]{2,}\s*$/
		let message
		let isValid
		if (!value) {
			message = 'please fill in the field'
			isValid = false
		} else if (value.length < 2) {
			message = 'field must be 2 or more characters'
			isValid = false
		} else if (!regex.test(value)) {
			message = 'field can not contain numbers or symbols'
			isValid = false
		} else {
			isValid = true
		}

		return { message, isValid }
	},
	// validate email
	email: (value) => {
		let message
		let isValid

		if (!value) {
			message = 'please fill in the field'
			isValid = false
			isValid = false
		} else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
			message = 'email must be valid'
			isValid = false
		} else {
			isValid = true
		}
		return { message, isValid }
	},
	// validate phone number
	phone: (value) => {
		let message
		let isValid

		if (!value) {
			message = 'please fill in the field'
			isValid = false
		} else if (!/^\+\d{12}$/.test(value)) {
			message = 'phone number must be in format +420123456789'
			isValid = false
		} else {
			isValid = true
		}
		return { message, isValid }
	},
	// validate password
	password: (value) => {
		let message
		let isValid

		if (!value) {
			message = 'please fill in the field'
			isValid = false
		} else if (value.length < 6) {
			message = 'password must be 6 or more characters'
			isValid = false
		} else {
			isValid = true
		}
		return { message, isValid }
	},
	// validate if field is empty
	isEmpty: (value) => {
		let message
		let isValid

		if (!value) {
			message = 'please fill in the field'
			isValid = false
		} else {
			isValid = true
		}
		return { message, isValid }
	},
	// confirm password
	confirmPassword: (value, password) => {
		let message
		let isValid

		if (!value) {
			message = 'please fill in the field'
			isValid = false
		} else if (value !== password) {
			message = 'passwords must match'
			isValid = false
		} else {
			isValid = true
		}
		return { message, isValid }
	},
}

export default validate
