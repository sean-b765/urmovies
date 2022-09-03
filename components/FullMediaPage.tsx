import Image from 'next/image'
import React, { useEffect } from 'react'
import {
	formatLargeNumbers,
	formatPicOriginal,
	formatPicThumbs,
} from '../lib/format'
import {
	getBudget,
	getDate,
	getGenreIds,
	getLanguageFromCode,
	getMediaType,
	getProviders,
	getRevenue,
	getRuntime,
	getTitle,
} from '../lib/util'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import Thumb from './Thumb'
import { AnimatePresence } from 'framer-motion'
import MediaPreview from './MediaPreview'
import { setPreview, toggleFullscreenPic } from '../store/slices/media'
import Link from 'next/link'
import { Genre } from '../types/common'
import { AiOutlineClose } from 'react-icons/ai'
import { BsCalendarDate } from 'react-icons/bs'
import { BiTime } from 'react-icons/bi'
import { IoLanguageSharp } from 'react-icons/io5'

import HorizontalScrollList from './HorizontalScrollList'
import Review from './Review'
import ImageThumb from './ImageThumb'
import { motion } from 'framer-motion'
import Ratings from './Rating/Ratings'

const FullMediaPage = () => {
	const { country_code: countryCode, loading } = useAppSelector(
		(state) => state.misc
	)
	const { preview, showPreview } = useAppSelector((state) => state.media)
	const dispatch = useAppDispatch()

	const { result, recommendations, providers, images, reviews, cast } =
		useAppSelector((state) => state.media.single)

	const { fullscreenPic, showFullscreenPic } = useAppSelector(
		(state) => state.media
	)

	const watchProviders = providers
		? getProviders(providers[countryCode])
		: { flatrate: [], buy: [], rent: [] }

	return (
		<div className="media">
			<AnimatePresence>{showPreview && <MediaPreview />}</AnimatePresence>
			<AnimatePresence>
				{showFullscreenPic && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.48 }}
						className="fspic"
					>
						<button
							onClick={(e: any) => {
								dispatch(toggleFullscreenPic())
							}}
							className="btn btn--close"
						>
							<AiOutlineClose />
						</button>
						<div className="fspic__image">
							<Image
								src={formatPicOriginal(fullscreenPic?.file_path as string)}
								layout="fill"
								objectFit="contain"
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<header className="media__info">
				<div className="media__info__backdrop">
					<Image
						src={formatPicOriginal(result?.backdrop_path as string)}
						layout="fill"
						objectFit="cover"
						priority={true}
					></Image>
				</div>

				<div className="media__info__title">
					<h1>{getTitle(result)}</h1>
				</div>

				<Ratings className={`media__info__votes`} />

				<p className="media__info__overview">{result.overview}</p>

				<div className="media__info__genres">
					{getGenreIds(result)?.map((genre, idx) => {
						return (
							<Link
								href={`/?genres=${(genre as Genre).id}`}
								key={idx}
								prefetch={false}
							>
								<a>{String((genre as Genre).name)}</a>
							</Link>
						)
					})}
				</div>

				<div className="media__info__additional">
					<div className="lang-date">
						<p>
							<IoLanguageSharp />
							{getLanguageFromCode(result.original_language as string)}
						</p>
						<p>
							<BsCalendarDate />
							{getDate(result)}
						</p>
						{getRuntime(result) !== 0 && (
							<p>
								<BiTime />
								{getRuntime(result)}m
							</p>
						)}
					</div>
					{getRevenue(result) || getBudget(result) ? (
						<div className="revenue-budget">
							{getRevenue(result) ? (
								<p>Box Office ${formatLargeNumbers(getRevenue(result))}</p>
							) : (
								<></>
							)}
							{getBudget(result) ? (
								<p>Budget ${formatLargeNumbers(getBudget(result))}</p>
							) : (
								<></>
							)}
						</div>
					) : (
						<></>
					)}
				</div>
			</header>

			{cast.cast?.length ? (
				<>
					<section className="media__cast">
						<HorizontalScrollList>
							{cast.cast.map((person, idx) => {
								return (
									person.profile_path && (
										<div className="cast" key={idx}>
											<div className="cast__image">
												<Image
													src={formatPicThumbs(person.profile_path as string)}
													layout="fill"
													objectFit="cover"
												></Image>
											</div>
											<div className="cast__info">
												<Link href={`/people/${person.id}`}>
													<a className="name">{person.name}</a>
												</Link>
												{person.character && (
													<p className="character">as {person.character}</p>
												)}
											</div>
										</div>
									)
								)
							})}
						</HorizontalScrollList>
					</section>
				</>
			) : (
				<></>
			)}
			{reviews.length ? (
				<section className="media__reviews">
					{reviews.map((review, idx) => {
						return <Review review={review} key={idx} />
					})}
				</section>
			) : (
				<></>
			)}

			{watchProviders.buy.length || watchProviders.flatrate.length ? (
				<section className="media__providers">
					{watchProviders.flatrate.length ? (
						<>
							<div className="media__providers__flatrate">
								<h3>Subscription Services</h3>
								<div className="providers">
									{watchProviders.flatrate.map((prvdr, idx) => {
										return (
											<div key={idx} className="provider">
												<div className="provider__logo">
													<Image
														src={formatPicThumbs(prvdr.logo_path)}
														layout="fill"
													></Image>
												</div>
											</div>
										)
									})}
								</div>
							</div>
						</>
					) : (
						<></>
					)}

					{watchProviders.buy.length ? (
						<>
							<div className="media__providers__buy">
								<h3>Buy Now</h3>
								<div className="providers">
									{watchProviders.buy.map((prvdr, idx) => {
										return (
											<div key={idx} className="provider">
												<div className="provider__logo">
													<Image
														src={formatPicThumbs(prvdr.logo_path)}
														layout="fill"
													></Image>
												</div>
											</div>
										)
									})}
								</div>
							</div>
						</>
					) : (
						<></>
					)}
				</section>
			) : (
				<></>
			)}

			{images.backdrops.length || images.posters.length ? (
				<section className="media__gallery">
					<div className="gallery">
						<HorizontalScrollList className="--vertical-centering">
							{images.backdrops.slice(0, 5).map((image, idx) => {
								return <ImageThumb image={image} key={idx} />
							})}
							{images.posters.slice(0, 5).map((image, idx) => {
								return <ImageThumb image={image} key={idx} />
							})}
						</HorizontalScrollList>
					</div>
				</section>
			) : (
				<></>
			)}
			{recommendations?.result?.length ? (
				<section className="media__recommended">
					<div className="media__recommended__wrapper">
						<HorizontalScrollList>
							{recommendations?.result.map((recommended, idx) => {
								return (
									<Thumb
										className="thumb--small"
										media={recommended}
										onClick={() => {
											dispatch(setPreview(recommended))
										}}
										key={idx}
										type={getMediaType(recommended)}
									/>
								)
							})}
						</HorizontalScrollList>
					</div>
				</section>
			) : (
				<></>
			)}
		</div>
	)
}

export default FullMediaPage
