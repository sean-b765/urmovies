import Image from 'next/image'
import React from 'react'
import { formatPicOriginal } from '../lib/format'
import { useAppDispatch } from '../store/hooks'
import { setFullscreenPic, toggleFullscreenPic } from '../store/slices/media'
import { Backdrop, Poster } from '../types/common'

const ImageThumb: React.FC<{ image: Backdrop | Poster }> = ({ image }) => {
	const dispatch = useAppDispatch()
	return (
		<div
			className="gallery__image"
			onClick={() => {
				dispatch(setFullscreenPic(image))
				dispatch(toggleFullscreenPic())
			}}
		>
			<Image
				src={formatPicOriginal(image.file_path)}
				height={image.height}
				width={image.width}
				objectFit="cover"
			></Image>
		</div>
	)
}

export default ImageThumb
