import '../styles/globals.css'
import type { AppProps } from 'next/app'

import store from '../store/store'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import Head from 'next/head'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../lib/muiTheme'

function MyApp({ Component, pageProps }: AppProps) {
	const emotionCache = createCache({ key: 'css', prepend: true })

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Roboto+Mono:wght@500&display=swap"
					rel="stylesheet"
				/>
			</Head>

			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</Provider>
		</CacheProvider>
	)
}

export default MyApp
