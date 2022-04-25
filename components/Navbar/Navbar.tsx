import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineLogin } from 'react-icons/ai'
import { useAppSelector } from '../../store/hooks'
import Dropdown from './Dropdown'
import Notifications from './Notifications'

const Navbar = () => {
	const [scrolled, setScrolled] = useState(false)
	const { profile, token } = useAppSelector((state) => state.auth)

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

			{profile && token ? (
				<>
					<Notifications />
					<div className="navbar__profile">
						<Link href={`/users/${profile.username}`}>
							<a className="profile-link">
								<Image
									src={profile.avatar ? profile.avatar : '/default-avatar.jpg'}
									objectFit="cover"
									width={42}
									height={42}
								/>
							</a>
						</Link>
					</div>
				</>
			) : (
				<>
					<div className="navbar__login">
						<Link href="/login">
							<a>
								<AiOutlineLogin />
							</a>
						</Link>
					</div>
				</>
			)}
		</header>
	)
}

export default Navbar
