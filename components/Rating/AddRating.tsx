import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { setRating } from '../../store/actions/media'
import { motion } from 'framer-motion'

const AddRating: React.FC<{ onRate: Function; rating: number }> = ({
	onRate,
	rating,
}) => {
	const [hover, setHover] = useState(0)
	return (
		<motion.div
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4 }}
			className="rate-movie"
		>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, idx) => {
				return (
					<button
						className={
							rating >= num
								? 'btn btn--rate btn--rate-rated'
								: hover >= num
								? 'btn btn--rate btn--rate-hover'
								: 'btn btn--rate'
						}
						key={idx}
						onClick={() => {
							onRate(num)
						}}
						onMouseEnter={() => setHover(num)}
						onMouseLeave={() => setHover(0)}
						aria-label={`Rate this movie ${num} stars`}
					>
						<AiFillStar />
					</button>
				)
			})}
		</motion.div>
	)
}

export default AddRating
