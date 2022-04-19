import React, { FormEvent, useState } from 'react'
import { login } from '../store/actions/auth'
import { useAppDispatch } from '../store/hooks'
import { setProfile, setToken } from '../store/slices/auth'

const Login = () => {
	const dispatch = useAppDispatch()

	const [form, setForm] = useState({
		username: '',
		email: '',
		password: '',
	})

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()

		const result = await login(form)
		console.log(result)

		dispatch(setToken(result.token))
		dispatch(setProfile(result.user))
	}

	return (
		<div className="form">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="username"
					id="username"
					onChange={(e) => setForm({ ...form, username: e.target.value })}
					value={form.username}
				/>
				<input
					type="email"
					name="email"
					id="email"
					onChange={(e) => setForm({ ...form, email: e.target.value })}
					value={form.email}
				/>
				<input
					type="password"
					name="password"
					id="password"
					onChange={(e) => setForm({ ...form, password: e.target.value })}
					value={form.password}
				/>
				<input type="submit" value="Login" />
			</form>
		</div>
	)
}

export default Login
