import React, { useContext } from 'react'
import { assets } from '../assets/assets.js'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
const GenerateButton = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) {
      navigate('/result ')
    } else {
      setShowLogin(true)
    }
  }
  return (
    <motion.div
      className="pb-16 text-center"
      initial={{ opacity: 0.2, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16">
        See the Magic, Try Now.
      </h1>
      <button
        className="inline-flex items-center gap-2 text-white bg-black px-12 py-2.5 rounded-full m-auto hover:scale-105 transition-all duration-500 cursor-pointer"
        onClick={onClickHandler}
      >
        Generate Images
        <img src={assets.star_group} alt="" className="h-6" />
      </button>
    </motion.div>
  )
}

export default GenerateButton
