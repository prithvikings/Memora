import Image from 'next/image'
import React from 'react'

const magnifying = () => {
  return (
    <Image
    src="/magnifying.png"
    alt="Magnifying Glass Icon"
    width={20}
    height={20}
    className="animate-bounce"
  />
  )
}

export default magnifying