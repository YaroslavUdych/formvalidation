import './App.css'
import SignUp from './form-components/SignUp'
import LogIn from './form-components/LogIn'
import ForgotPassword from './form-components/ForgotPassword'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Header'
import Main from './Main'
import { Routes, Route } from 'react-router-dom'

function App() {
	return (
		<div className="app-wrapper">
			<Header />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/signup" element={<SignUp formType="signup" />} />
				<Route path="/login" element={<LogIn formType="login" />} />
				<Route path="/forgotpassword" element={<ForgotPassword formType="forgotpassword" />} />
			</Routes>
		</div>
	)
}

export default App
