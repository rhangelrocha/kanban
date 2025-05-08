import Image from "next/image"
import React from "react"

interface AvatarProps {
  imageUrl: string
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl }) => {
  return (
    <Image
      width={32}
      height={32}
      src={imageUrl}
      alt="Avatar"
      className="rounded-full"
      sizes="100vw"
    />
  )
}

export default Avatar
