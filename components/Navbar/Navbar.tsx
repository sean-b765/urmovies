import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'

const Navbar = () => {
	const [scrolled, setScrolled] = useState(false)

	const handleScroll = () => {
		if (window.scrollY > 100) setScrolled(true)
		else setScrolled(false)
	}
	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])
	return (
		<header className={scrolled ? 'navbar navbar--scrolled' : 'navbar'}>
			<nav>
				<ul>
					<li>
						<Link href="/">
							<a>Home</a>
						</Link>
					</li>
					<li>
						<Dropdown parentRoute={'/'} parentText={'Movies'}>
							<li>
								<Link href="/movies/now-playing">
									<a>Now Playing</a>
								</Link>
							</li>
							<li>
								<Link href="/movies/popular">
									<a>Popular</a>
								</Link>
							</li>
							<li>
								<Link href="/movies/top-rated">
									<a>Top Rated</a>
								</Link>
							</li>
							<li>
								<Link href="/movies/upcoming">
									<a>Upcoming</a>
								</Link>
							</li>
						</Dropdown>
					</li>
					<li>
						<Dropdown parentRoute={'/'} parentText={'TV'}>
							<li>
								<Link href="/tv/now-playing">
									<a>Now Playing</a>
								</Link>
							</li>
							<li>
								<Link href="/tv/popular">
									<a>Popular</a>
								</Link>
							</li>
							<li>
								<Link href="/tv/top-rated">
									<a>Top Rated</a>
								</Link>
							</li>
						</Dropdown>
					</li>
					<li>
						<Link href="/">Lists</Link>
					</li>
					<li>
						<Link href="/">People</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Navbar
