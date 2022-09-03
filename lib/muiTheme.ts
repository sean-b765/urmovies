import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: '#3c54c7',
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: red.A400,
		},
		text: {
			primary: '#000',
			secondary: '#222',
		},
	},
})

export default theme
