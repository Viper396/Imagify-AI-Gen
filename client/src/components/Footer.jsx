import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-2 py-2 mt-10">
      <img src={assets.logo} alt="" width={150} />
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        © 2025 Imagify. All rights reserved.
      </p>
      <div className="flex gap-2.5">
        <img src={assets.facebook_icon} alt="" width={35} />
        <img src={assets.twitter_icon} alt="" width={35} />
        <img src={assets.instagram_icon} alt="" width={35} />
      </div>
    </div>
  )
}

export default Footer
