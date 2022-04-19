import { NextPage, NextPageContext } from 'next'
import Image from 'next/image'
import React from 'react'
import RatingCard from '../../components/Profile/RatingCard'
import { getUser } from '../../store/actions/user'
import { Rating } from '../../types/common'

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
	console.log(user)

	return (
		<div className="profile">
			<div className="profile__user">
				<Image
					width={60}
					height={60}
					objectFit="cover"
					src={user?.avatar ? '/default-avatar.jpg' : '/default-avatar.jpg'}
				/>
			</div>
			<div className="profile__ratings">
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

	const user = await getUser(name as string)

	return {
		props: {
			user: user.result.user,
			reviews: user.result.reviews,
			ratings: user.result.ratings,
		},
	}
}

export default UserPage
