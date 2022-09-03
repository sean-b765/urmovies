import React, { MouseEventHandler, useEffect, useState } from 'react'
import { MdLiveTv, MdLocalMovies, MdMovie, MdStar, MdTv } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { MovieResult } from '../types/movies'
import { TVResult } from '../types/tv'
import {
	formatPic,
	formatPicThumbs,
	formatRatingClassName,
	formatRatingNumber,
} from '../lib/format'
import {
	getDate,
	getGenreIds,
	getGenreName,
	getLanguageFromCode,
	getMediaType,
	getTitle,
} from '../lib/util'
import { blacklisted } from '../lib/blacklisted'
import { CastObjectMovie, CastObjectTV, CrewObjectBase } from '../types/common'
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Menu,
	MenuItem,
	Rating,
	Skeleton,
	Typography,
} from '@mui/material'
import { useAppDispatch } from '../store/hooks'
import {
	getMyRating,
	getRatings,
	setRating,
	setRatingThunk,
} from '../store/actions/media'
import { usePromiseEffect } from '../lib/hooks'

const Thumb: React.FC<{
	media: MovieResult | TVResult
	className: string
	onClick: Function
	type: string
}> = ({ media, className, onClick, type }) => {
	if (blacklisted.includes(String(media.id))) return <></>

	const dispatch = useAppDispatch()

	const [loaded, setLoaded] = useState(false)
	const [anchor, setAnchor] = useState<null | HTMLElement>(null)
	const [myRating, setMyRating] = useState(0)

	const mediaType = type || getMediaType(media)

	// Get user's rating, if it exists
	usePromiseEffect<number>(async () => {
		const result = await getMyRating(mediaType, String(media.id))

		const _rating = result.result?.rating ? result.result?.rating : 0
		setMyRating(_rating)

		return _rating
	}, [])

	return (
		<Card variant="outlined">
			<CardActionArea onClick={() => onClick(media)}>
				<CardMedia sx={{ height: '400px' }}>
					{media.poster_path ? (
						<div
							style={{ position: 'relative', width: '100%', height: '100%' }}
						>
							<Image
								alt={`${getTitle(media)} poster`}
								src={formatPic(media?.poster_path as string)}
								layout="fill"
								objectFit="cover"
								onLoadingComplete={() => setLoaded(true)}
								onLoadStart={() => setLoaded(false)}
							/>
						</div>
					) : (
						<>
							<Skeleton animation="wave" variant="rectangular" height={400} />
						</>
					)}
				</CardMedia>
				<Box
					sx={{
						position: 'absolute',
						bottom: 0,
						right: 0,
						py: 0.5,
						px: 1,
						m: 1,
						borderRadius: '3px',
					}}
					bgcolor="black"
				>
					<Typography
						component="p"
						className={formatRatingClassName(media.vote_average)}
					>
						<MdStar style={{ marginRight: '8px' }} />
						{formatRatingNumber(Number(media.vote_average))}
					</Typography>
				</Box>
				<Box
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						py: 0.5,
						px: 1,
						borderBottomRightRadius: '5px',
						display: 'flex',
						alignItems: 'center',
					}}
					bgcolor="black"
					color="white"
					fontSize="26px"
				>
					{mediaType === 'movie' ? <MdMovie /> : <MdTv />}
				</Box>
			</CardActionArea>
			<CardContent>
				<Typography
					component={Link}
					href={`/${mediaType === 'movie' ? 'movies' : mediaType}/${media.id}`}
				>
					<a style={{ fontSize: '1.2rem' }}>{getTitle(media)}</a>
				</Typography>
				<Box
					mt={2}
					flexDirection="row"
					alignItems="center"
					justifyContent="flex-start"
					display="flex"
					gap="0.8rem"
				>
					<Typography component="p" fontSize="0.9rem">
						{getDate(media)}
					</Typography>
					<Typography component="p" fontSize="0.9rem">
						{getLanguageFromCode(media.original_language as string)}
					</Typography>
				</Box>
				<Typography component="p" mt={1} fontStyle="italic" fontSize="0.9rem">
					{getGenreName(String(getGenreIds(media)[0]), mediaType)}
				</Typography>
			</CardContent>
			<CardActions sx={{ px: 2 }}>
				<Button
					size="small"
					color="primary"
					startIcon={<MdStar />}
					onClick={(e) => setAnchor(e.currentTarget)}
				>
					Rate
				</Button>
				<Menu
					anchorEl={anchor}
					onClose={() => setAnchor(null)}
					open={anchor ? true : false}
				>
					<MenuItem>
						<Rating
							defaultValue={myRating}
							max={10}
							onChange={(e, value) => {
								if (!value) return

								dispatch(
									setRatingThunk({
										media: mediaType,
										mediaId: String(media.id),
										rating: value,
									})
								)
								setMyRating(value)
							}}
						/>
					</MenuItem>
				</Menu>
			</CardActions>
		</Card>
	)

	// return (
	// 	<section
	// 		className={`thumb ${className}`}
	// 		onClick={(e: any) => {
	// 			try {
	// 				if (!e.target.dataset['noclick']) onClick()
	// 			} catch (err) {}
	// 		}}
	// 	>
	// 		{mediaType === 'tv' ? <MdLiveTv /> : <MdLocalMovies />}
	// 		<div
	// 			className={`thumb__rating ${formatRatingClassName(media.vote_average)}`}
	// 		>
	// 			{Number(media.vote_average).toFixed(1)}
	// 		</div>
	// 		<header className="thumb__title">
	// 			<h2>
	// 				<Link
	// 					href={
	// 						mediaType === 'tv' ? `/tv/${media.id}` : `/movies/${media.id}`
	// 					}
	// 				>
	// 					<a data-noclick>{getTitle(media)}</a>
	// 				</Link>
	// 			</h2>
	// 			{'character' in media && media?.character && (
	// 				<p>as {media?.character}</p>
	// 			)}
	// 			{'job' in media && <p>{media?.job}</p>}
	// 		</header>
	// 		<div className="thumb__image">
	// 			<Image
	// 				src={formatPicThumbs(media?.poster_path as string)}
	// 				layout="fill"
	// 				objectFit="cover"
	// 			></Image>
	// 		</div>
	// 	</section>
	// )
}

export default Thumb
