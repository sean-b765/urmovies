import Link from 'next/link'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const Dropdown = (
	props: React.PropsWithChildren<{
		parentRoute: string
		parentText: string
	}>
) => {
	const [isHovering, setIsHovering] = useState(false)
	return (
		<>
			<Link href={props.parentRoute}>
				<a
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
				>
					{props.parentText}
				</a>
			</Link>

			<AnimatePresence>
				{isHovering && (
					<motion.div
						className="dropdown"
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 10 }}
						transition={{ duration: 0.4 }}
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
					>
						<motion.ul>{props.children}</motion.ul>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

export default Dropdown
