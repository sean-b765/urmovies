/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'*',
			'tmdb.org',
			'themoviedb.org',
			'image.tmdb.org',
			'www.gravatar.com',
		],
	},
}

module.exports = nextConfig
