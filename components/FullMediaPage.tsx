import Image from 'next/image'
import React from 'react'
import {
	formatPicOriginal,
	formatPicThumbs,
	formatRatingClassName,
} from '../lib/format'
import { getDate, getProviders, getTitle } from '../lib/util'
import { useAppSelector } from '../store/hooks'
import Thumb from './Thumb'
import { marked } from 'marked'

const FullMediaPage = () => {
	const countryCode = useAppSelector((state) => state.misc.country_code)

	const { result, recommendations, providers, images, reviews } =
		useAppSelector((state) => state.media.single)

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

	return (
		<div className="media">
			<header className="media__info">
				<div className="media__info__backdrop">
					<Image
						src={formatPicOriginal(result?.backdrop_path as string)}
						layout="fill"
						objectFit="cover"
						objectPosition="top"
					></Image>
				</div>

				<h1 className="media__info__title">{getTitle(result)}</h1>

				<p className="media__info__overview">{result.overview}</p>

				<p className="media__info__date">{getDate(result)}</p>
				<div className="media__info__votes">
					<p
						className={`media__info__votes__average ${formatRatingClassName(
							result.vote_average
						)}`}
					>
						{result.vote_average}
					</p>
					<p className="media__info__votes__count">{result.vote_count}</p>
				</div>
			</header>
			<section className="media__reviews">
				{reviews.map((review, idx) => {
					return (
						<div className="review">
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
			<section className="media__gallery"></section>
			<section className="media__recommended">
				<div className="media__recommended__wrapper">
					{recommendations?.result.map((recommended, idx) => {
						return (
							<Thumb
								className="thumb--small"
								media={recommended}
								onClick={() => {}}
								key={idx}
							/>
						)
					})}
				</div>
			</section>
		</div>
	)
}

export default FullMediaPage
