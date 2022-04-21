import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../store/hooks'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const HorizontalScrollList = (props: React.PropsWithChildren<any>) => {
	const containerRef = useRef<any>()
	const [scrollAmount, setScrollAmount] = useState(0)
	const [canScroll, setCanScroll] = useState(true)
	const { loading } = useAppSelector((state) => state.misc)

	useEffect(() => {
		if (!loading) setScroll(0)
	}, [loading])

	// On resize, check if the container has overflow.
	//  If there is we should show the scroll buttons
	useEffect(() => {
		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		if (containerRef.current) handleResize()
	}, [containerRef.current])

	function handleResize() {
		if (containerRef.current.scrollWidth <= containerRef.current.clientWidth)
			setCanScroll(false)
		else setCanScroll(true)
	}

	function setScroll(amt: number) {
		containerRef.current.scrollLeft = amt

		setScrollAmount(amt)
	}

	const handleScroll = (change: 'left' | 'right') => {
		const { scrollWidth, clientWidth } = containerRef.current

		// The padding which we should ignore when snapping to the start/end of the scroll box
		const deadZonePadding = 30

		const newAmount =
			change === 'right'
				? scrollAmount + clientWidth * 0.9
				: scrollAmount - clientWidth * 0.9

		if (change === 'left') {
			if (
				newAmount <= 0 + deadZonePadding &&
				scrollAmount <= 0 + deadZonePadding
			) {
				setScroll(scrollWidth)
			} else {
				setScroll(newAmount)
			}
		} else {
			if (
				newAmount >= scrollWidth - clientWidth - deadZonePadding &&
				scrollAmount >= scrollWidth - clientWidth - deadZonePadding
			) {
				setScroll(0)
			} else {
				setScroll(newAmount)
			}
		}
	}

	return (
		<div className={'scrollableList scrollableList' + props.className}>
			{canScroll ? (
				<>
					<button
						className="btn btn--slideLeft"
						onClick={() => {
							handleScroll('left')
						}}
					>
						<IoIosArrowBack />
					</button>
					<button
						className="btn btn--slideRight"
						onClick={() => {
							handleScroll('right')
						}}
					>
						<IoIosArrowForward />
					</button>
				</>
			) : (
				<></>
			)}
			<div
				className="list"
				ref={containerRef}
				onScroll={(e: any) => {
					const left = e.target.scrollLeft
					setScrollAmount(left)
				}}
			>
				{props.children}
			</div>
		</div>
	)
}

export default HorizontalScrollList
