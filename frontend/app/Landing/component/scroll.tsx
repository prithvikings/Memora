import Image from 'next/image'
import React from 'react'

const scroll = () => {
  return (
    <Image
    src="/scroll.png"
    alt="Scroll Indicator"
    width={20}
    height={20}
    className="animate-bounce"
  />
  )
}

export default scroll