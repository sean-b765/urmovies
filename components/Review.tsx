import { marked } from 'marked'
import Image from 'next/image'
import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { formatPicThumbs, formatRatingClassName } from '../lib/format'
import { TMDBReview } from '../types/common'

const Review: React.FC<{ review: TMDBReview }> = ({ review }) => {
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
		<div className="review">
			<header className="review__author">
				<div className="review__author__profile">
					{review.author_details.avatar_path && (
						<Image
							width={35}
							height={35}
							objectFit="cover"
							style={{ borderRadius: '50%' }}
							src={
								review.author_details.avatar_path.substring(0, 5) === '/http'
									? review.author_details.avatar_path.substring(1)
									: formatPicThumbs(review.author_details.avatar_path)
							}
						/>
					)}
					<p>{review.author}</p>
				</div>
				{review.author_details.rating && (
					<p
						className={`${formatRatingClassName(
							review.author_details.rating
						)} review__author__rating`}
					>
						<AiFillStar />
						{review.author_details.rating}
					</p>
				)}
			</header>
			<div
				className="review__body"
				dangerouslySetInnerHTML={{
					__html: marked.parse(review.content, {
						renderer,
					}),
				}}
			></div>
		</div>
	)
}

export default Review
