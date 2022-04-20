import moment from 'moment'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import HorizontalScrollList from '../../components/HorizontalScrollList'
import Thumb from '../../components/Thumb'
import { formatPicThumbs } from '../../lib/format'
import { getTitle } from '../../lib/util'
import { getPerson } from '../../store/actions/people'
import { Person } from '../../types/common'

const PersonPage: NextPage<{ person: Person }> = ({ person }) => {
	return (
		<div className="biography">
			<header className="biography__profile">
				<Image
					className="biography__profile__image"
					src={formatPicThumbs(person.result.profile_path as string)}
					width={170}
					height={170}
					objectFit="cover"
				/>
				<h1>{person.result.name}</h1>

				<p>
					Born{' '}
					{moment(person.result.birthday, 'YYYY-MM-DD').format('MMMM Do, YYYY')}
					{person.result.place_of_birth && (
						<p>{person.result.place_of_birth}</p>
					)}
				</p>

				{person.result.deathday && (
					<p>
						Died{' '}
						{moment(person.result.deathday, 'YYYY-MM-DD').format(
							'MMMM Do, YYYY'
						)}{' '}
						(aged{' '}
						{moment(person.result.deathday, 'YYYY-MM-DD').diff(
							moment(person.result.birthday, 'YYYY-MM-DD'),
							'years'
						)}
						)
					</p>
				)}

				<p className="bio">{person.result.biography}</p>
			</header>
			{person.credits.cast?.length && (
				<div className="biography__roles">
					{/* Movie Section */}
					{person.credits.cast?.filter((obj) => obj.media_type === 'movie')
						.length && (
						<>
							<h2>Known For - Movies</h2>
							<HorizontalScrollList>
								{person.credits.cast
									?.sort(
										(ob1, ob2) =>
											Number(ob2.popularity) - Number(ob1.popularity)
									)
									.filter((obj) => obj.media_type === 'movie')
									.map((credit, idx) => {
										return (
											credit.poster_path && (
												<Thumb
													key={idx}
													media={credit}
													onClick={() => {}}
													className="thumb--small"
													type={credit.media_type as string}
												/>
											)
										)
									})}
							</HorizontalScrollList>
						</>
					)}

					{/* TV Section */}
					{person.credits.cast?.filter((obj) => obj.media_type === 'tv')
						.length && (
						<>
							<h2>Known For - TV</h2>
							<HorizontalScrollList>
								{person.credits.cast
									?.sort(
										(ob1, ob2) =>
											Number(ob2.popularity) - Number(ob1.popularity)
									)
									.filter((obj) => obj.media_type === 'tv')
									.map((credit, idx) => {
										return (
											credit.poster_path &&
											getTitle(credit) && (
												<Thumb
													key={idx}
													media={credit}
													onClick={() => {}}
													className="thumb--small"
													type={credit.media_type as string}
												/>
											)
										)
									})}
							</HorizontalScrollList>
						</>
					)}
				</div>
			)}

			{person.credits.crew?.length && (
				<div className="biography__crew">
					<h2>Production Credits</h2>
					<HorizontalScrollList>
						{person.credits.crew
							?.sort(
								(ob1, ob2) => Number(ob2.popularity) - Number(ob1.popularity)
							)
							.map((credit, idx) => {
								return (
									credit.poster_path && (
										<Thumb
											key={idx}
											media={credit}
											onClick={() => {}}
											className="thumb--small"
											type={credit.media_type as string}
										/>
									)
								)
							})}
					</HorizontalScrollList>
				</div>
			)}
		</div>
	)
}

export async function getServerSideProps(context: any) {
	const { id } = context.params
	const person = await getPerson(id)

	return {
		props: {
			person,
		},
	}
}

export default PersonPage
