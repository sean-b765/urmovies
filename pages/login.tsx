import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Grid,
	Input,
	InputLabel,
	TextField,
} from '@mui/material'
import React, { FormEvent, useState } from 'react'
import { login } from '../store/actions/auth'
import { useAppDispatch } from '../store/hooks'
import { setProfile, setToken } from '../store/slices/auth'
import { useRouter } from 'next/router'

const Login = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()

	const [form, setForm] = useState({
		username: '',
		email: '',
		password: '',
	})

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()

		const result = await login(form)

		dispatch(setToken(result.token))
		dispatch(setProfile(result.user))

		router.back()
	}

	return (
		<Container maxWidth="lg">
			<form onSubmit={handleSubmit}>
				<Grid
					container
					alignItems="center"
					justifyItems="center"
					direction="column"
					gap="1rem"
					my="2rem"
				>
					<Grid item>
						<TextField
							onChange={(e) => setForm({ ...form, username: e.target.value })}
							value={form.username}
							label="Username"
							color="primary"
							variant="standard"
						/>
					</Grid>
					<Grid item>
						<TextField
							onChange={(e) => setForm({ ...form, password: e.target.value })}
							value={form.password}
							type="password"
							label="Password"
							color="primary"
							variant="standard"
						/>
					</Grid>

					<Grid item>
						<Button variant="contained" color="primary" type="submit">
							Sign In
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	)

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
