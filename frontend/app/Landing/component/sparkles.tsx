import Image from 'next/image'
import React from 'react'

const sparkles = () => {
  return (
    <Image
    src="/sparkles.png"
    alt="Sparkles Icon"
    width={20}
    height={20}
    className="animate-bounce"
  />
  )
}

export default sparkles