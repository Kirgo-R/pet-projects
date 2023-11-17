import React, { useState } from 'react'

export const Login = ({ onLogin }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (evt) => {
		evt.preventDefault()
		onLogin(email, password)
	}

	function handleChangeEmail(e) {
		setEmail(e.target.value)
	}

	function handleChangePassword(e) {
		setPassword(e.target.value)
	}

	return (
		<div className="auth">
			<h2 className="auth__form-title">Вход</h2>
			<form name="login" className="auth__form" onSubmit={handleSubmit}>
				<fieldset className="auth__inputs">
					<input
						className="auth__input"
						type="email"
						name="email"
						placeholder="Email"
						value={email}
						required
						onChange={handleChangeEmail}
					/>
					<input
						className="auth__input"
						type="password"
						name="password"
						placeholder="Пароль"
						value={password}
						minLength={3}
						maxLength={10}
						required
						onChange={handleChangePassword}
					/>
				</fieldset>
				<button className="button auth__button" type="submit">
					Войти
				</button>
			</form>
		</div>
	)
}
