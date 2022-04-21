import React from 'react'
import { useAppSelector } from '../../store/hooks'

const Loader = () => {
	const { loading } = useAppSelector((state) => state.misc)

	function randomAnimation(min: number, max: number) {
		// min and max included
		const rnd = Math.floor(Math.random() * (max - min + 1) + min)

		return `${`loader${rnd}`} 3s cubic-bezier(0.075, 0.82, 0.165, 1) both`
	}

	return (
		<div className="loader">
			<div
				className={
					loading
						? 'loader__progress loader__progress--loading'
						: 'loader__progress'
				}
				style={{
					animation: loading ? randomAnimation(1, 2) : 'none',
				}}
			></div>
		</div>
	)
}

export default Loader
