import Image from 'next/image'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import {
	formatLargeNumbers,
	formatPicOriginal,
	formatPicThumbs,
	formatRatingClassName,
} from '../lib/format'
import {
	getBudget,
	getDate,
	getGenreIds,
	getGenreName,
	getLanguageFromCode,
	getMediaType,
	getProviders,
	getRevenue,
	getRuntime,
	getTitle,
} from '../lib/util'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import Thumb from './Thumb'
import { marked } from 'marked'
import { AnimatePresence } from 'framer-motion'
import MediaPreview from './MediaPreview'
import { setPreview } from '../store/slices/media'
import Link from 'next/link'
import { Genre } from '../types/common'
import { AiFillStar } from 'react-icons/ai'
import { BsFillPersonFill, BsCalendarDate } from 'react-icons/bs'
import { BiTime } from 'react-icons/bi'
import { IoLanguageSharp } from 'react-icons/io5'

import HorizontalScrollList from './HorizontalScrollList'

const FullMediaPage = () => {
	const { country_code: countryCode, loading } = useAppSelector(
		(state) => state.misc
	)
	const { preview, showPreview } = useAppSelector((state) => state.media)
	const dispatch = useAppDispatch()
	const recommendationsRef = useRef<any>()

	const { result, recommendations, providers, images, reviews, cast } =
		useAppSelector((state) => state.media.single)

	console.log(result)

	const watchProviders = getProviders(providers[countryCode])

	const renderer = new marked.Renderer()
	renderer.link = function (href, title, text) {
		return `<a>${text}</a>`
	}
	renderer.code = function (code, lang, isEscaped) {
		return code
	}
	// Since marked will parse <html tags>, we need to exclude these! This allows for <script> tags to be parsed
	//  This is different from setting sanitize: true in options, as this will remove the wrapping <tag> but keep the inner text
	renderer.html = function (html) {
		return ''
	}

	useEffect(() => {
		if (!recommendationsRef?.current) return
		if (!loading) recommendationsRef.current.scrollLeft = 0
	}, [loading])

	return (
		<div className="media">
			<AnimatePresence>{showPreview && <MediaPreview />}</AnimatePresence>

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

				<div className="media__info__votes">
					<p
						className={`media__info__votes__average ${formatRatingClassName(
							result.vote_average
						)}`}
					>
						<AiFillStar />
						{result.vote_average}
					</p>
					<p className="media__info__votes__count">
						<BsFillPersonFill />
						{formatLargeNumbers(Number(result.vote_count))}
					</p>
				</div>
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
								return person.profile_path ? (
									<div className="cast" key={idx}>
										{person.profile_path ? (
											<>
												<div className="cast__image">
													<Image
														src={formatPicThumbs(person.profile_path as string)}
														layout="fill"
														objectFit="cover"
													></Image>
												</div>
												<div className="cast__info">
													<p className="name">{person.name}</p>
													{person.character && (
														<p className="character">as {person.character}</p>
													)}
												</div>
											</>
										) : (
											<></>
										)}
									</div>
								) : (
									<></>
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
						return (
							<div className="review" key={idx}>
								<header>
									<p>{review.author_details.rating}</p>
									<p>{review.author}</p>
								</header>
								<div
									className="review__body"
									key={idx}
									dangerouslySetInnerHTML={{
										__html: marked.parse(review.content, {
											renderer,
										}),
									}}
								></div>
							</div>
						)
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
						{images.backdrops.slice(0, 5).map((image, idx) => {
							return (
								<div key={idx} className="gallery__image">
									<Image
										src={formatPicOriginal(image.file_path)}
										// layout="fill"
										height={image.height}
										width={image.width}
										objectFit="cover"
									></Image>
								</div>
							)
						})}
						{images.posters.slice(0, 5).map((image, idx) => {
							return (
								<div key={idx} className="gallery__image">
									<Image
										src={formatPicOriginal(image.file_path)}
										// layout="fill"
										height={image.height}
										width={image.width}
										objectFit="cover"
									></Image>
								</div>
							)
						})}
					</div>
				</section>
			) : (
				<></>
			)}
			{recommendations?.result.length ? (
				<section className="media__recommended" ref={recommendationsRef}>
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
