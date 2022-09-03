import {
	Alert,
	AlertTitle,
	AppBar,
	Avatar,
	Badge,
	Collapse,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlineStock } from 'react-icons/ai'
import { IoMdPodium } from 'react-icons/io'
import { IoTicketOutline } from 'react-icons/io5'
import {
	MdClose,
	MdExpandLess,
	MdExpandMore,
	MdList,
	MdMail,
	MdMenu,
	MdMovie,
	MdPerson,
	MdStar,
	MdTv,
} from 'react-icons/md'
import { formatLargeText } from '../../lib/format'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Notifications from './Notifications'

const Navbar = () => {
	const [open, setOpen] = useState(false)
	const [expand, setExpand] = useState('')

	const { profile, token } = useAppSelector((state) => state.auth)

	const handleExpand = (value: string) =>
		expand === value ? setExpand('') : setExpand(value)

	useEffect(() => {
		Router.events.on('routeChangeComplete', () => {
			setExpand('')
			setOpen(false)
		})
	}, [])

	const navigation = [
		{
			name: 'Movies',
			icon: <MdMovie />,
			href: null,
			children: [
				{
					name: 'Popular',
					href: '/movies/popular',
					icon: <MdStar />,
				},

				{
					name: 'Top Rated',
					href: '/movies/top-rated',
					icon: <IoMdPodium />,
				},
				{
					name: 'Upcoming',
					href: '/movies/upcoming',
					icon: <AiOutlineStock />,
				},
				{
					name: 'Now Playing',
					href: '/movies/now-playing',
					icon: <IoTicketOutline />,
				},
			],
		},
		{
			name: 'TV',
			href: null,
			icon: <MdTv />,
			children: [
				{
					name: 'Popular',
					href: '/tv/popular',
					icon: <MdStar />,
				},

				{
					name: 'Top Rated',
					href: '/tv/top-rated',
					icon: <IoMdPodium />,
				},
				{
					name: 'Now Playing',
					href: '/tv/now-playing',
					icon: <IoTicketOutline />,
				},
			],
		},
		{
			name: 'People',
			href: '/people',
			icon: <MdPerson />,
			children: null,
		},
		{
			name: 'Lists',
			href: '/lists',
			icon: <MdList />,
			children: null,
		},
	]

	function renderIcons() {
		return (
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '1rem',
					p: { xs: 0, sm: 1 },
				}}
			>
				<Notifications />

				{profile?._id && token ? (
					<Link href={`/users/${profile?.username}`} passHref>
						<IconButton size="medium" component="a">
							<Tooltip title="Visit My Profile">
								<Avatar
									alt={`${profile?.username?.toUpperCase()}`}
									src={profile?._id ? profile?._id : '/default-avatar.jpg'}
								/>
							</Tooltip>
						</IconButton>
					</Link>
				) : (
					<Tooltip title="Login">
						<Link href={`/login`} passHref>
							<IconButton size="medium">
								<Avatar alt="Please Login" src={'/default-avatar.jpg'} />
							</IconButton>
						</Link>
					</Tooltip>
				)}
			</Box>
		)
	}

	return (
		<>
			<AppBar position="fixed">
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-start',
							alignItems: 'center',
						}}
					>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="open drawer"
							sx={{ mr: 2 }}
							onClick={() => setOpen(!open)}
						>
							<MdMenu />
						</IconButton>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ display: { xs: 'none', sm: 'block' } }}
						>
							urMedia
						</Typography>
					</Box>

					{/* Search */}
					<Box></Box>

					{/* Icon buttons */}
					{renderIcons()}
				</Toolbar>

				<Drawer
					sx={{ minWidth: 'clamp(100px, 100vw, 400px)' }}
					anchor="left"
					open={open}
					onClose={() => setOpen(false)}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start',
							padding: '.5rem',
							minWidth: 'clamp(0px, 100vw, 270px)',
						}}
					>
						<IconButton onClick={() => setOpen(!open)}>
							<MdClose />
						</IconButton>
					</div>
					<List>
						{navigation.map((item: any, idx) => {
							return (
								<>
									{item.href ? (
										<Link href={item.href ? item.href : ''} passHref>
											<ListItemButton
												key={idx}
												onClick={() => handleExpand(item.name)}
												component="a"
											>
												<ListItemIcon sx={{ fontSize: '1.15rem' }}>
													{item.icon}
												</ListItemIcon>
												<ListItemText>{item.name}</ListItemText>
												{item.children &&
													(expand === item.name ? (
														<MdExpandMore />
													) : (
														<MdExpandLess />
													))}
											</ListItemButton>
										</Link>
									) : (
										<ListItemButton
											key={idx}
											onClick={() => handleExpand(item.name)}
										>
											<ListItemIcon sx={{ fontSize: '1.15rem' }}>
												{item.icon}
											</ListItemIcon>
											<ListItemText>{item.name}</ListItemText>
											{item.children &&
												(expand === item.name ? (
													<MdExpandMore />
												) : (
													<MdExpandLess />
												))}
										</ListItemButton>
									)}

									{item.children && (
										<>
											<Collapse
												key={idx}
												in={expand === item.name}
												timeout="auto"
												unmountOnExit
											>
												<List>
													{item.children?.map((child: any, index: number) => {
														return (
															<Link href={child.href} passHref key={index}>
																<ListItemButton
																	key={index}
																	sx={{ pl: 4 }}
																	component="a"
																>
																	<ListItemIcon sx={{ fontSize: '1.15rem' }}>
																		{child.icon}
																	</ListItemIcon>
																	<ListItemText>{child.name}</ListItemText>
																</ListItemButton>
															</Link>
														)
													})}
												</List>
											</Collapse>
										</>
									)}
								</>
							)
						})}
					</List>
				</Drawer>
			</AppBar>
		</>
	)
}

export default Navbar
