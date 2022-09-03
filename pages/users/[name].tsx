import { NextPage, NextPageContext } from 'next'
import Image from 'next/image'
import React from 'react'
import RatingCard from '../../components/Profile/RatingCard'
import { formatLargeNumbers } from '../../lib/format'
import { getUser } from '../../store/actions/user'
import { Rating } from '../../types/common'
import { GiStarsStack } from 'react-icons/gi'

interface Props {
	user: {
		bio: string
		followers: any[]
		following: any[]
		reputation: number
		username: string
		avatar: string
		_id: string
	}
	ratings: Array<Rating>
	reviews: [
		{
			api_id: string
			media_type: string
			created_at: string
			updated_at: string
			rating: number
			author: string
		}
	]
}

const UserPage: NextPage<Props> = ({ user, ratings, reviews }) => {
	return (
		<div className="profile">
			<div className="profile__user">
				<div className="profile__user__pic">
					<Image
						className="profile__user__pic__avatar"
						width={170}
						height={170}
						objectFit="cover"
						src={user?.avatar ? '/default-avatar.jpg' : '/default-avatar.jpg'}
					/>
					<p>
						<GiStarsStack />
						{formatLargeNumbers(user?.reputation)}
					</p>
				</div>
				<h1>{user?.username}</h1>
				<p>{user?.bio}</p>
			</div>
			<div className="profile__ratings">
				<h2>Latest Ratings</h2>
				{ratings.map((rating, idx) => {
					return <RatingCard key={idx} rating={rating} />
				})}
			</div>
			<div className="profile__reviews"></div>
		</div>
	)
}

export async function getServerSideProps(context: NextPageContext) {
	const { name } = context.query

	const result = await getUser(name as string)

	console.log(result)

	return {
		props: {
			user: result.result.user,
			reviews: result.result.reviews,
			ratings: result.result.ratings,
			commentSectionId: `users-${name}`,
		},
	}
}

export default UserPage
