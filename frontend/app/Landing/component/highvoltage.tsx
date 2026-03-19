import Image from 'next/image'
import React from 'react'

const highvoltage = () => {
  return (
    <Image
    src="/highvoltage.png"
    alt="High Voltage Icon"
    width={20}
    height={20}
    className="animate-bounce"
  />
  )
}

export default highvoltage