import React from 'react'

export type ImageName = ''

type ImageProps = {
  imageName: ImageName
  className?: string
}

const Image = ({ imageName, className }: ImageProps) => {
  return <img className={className} src={imageMap.get(imageName)} />
}

const imageMap = new Map<ImageName, string>([])

export default Image
