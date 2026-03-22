import Image from 'next/image'
import React from 'react'

const brain = () => {
  return (
    <Image
    src="/brain.png"
    alt="Brain Icon"
    width={20}
    height={20}
    className="animate-bounce"
  />
  )
}

export default brain