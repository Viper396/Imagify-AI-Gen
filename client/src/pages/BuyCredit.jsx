/**
 * BuyCredit page component
 * Handles credit purchase and Razorpay payment integration
 */
import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets.js'
import { AppContext } from '../context/AppContext.jsx'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const BuyCredit = () => {
  const { user, backendUrl, token, setShowLogin, loadCreditsData } =
    useContext(AppContext)
  const navigate = useNavigate()

  /**
   * Initializes Razorpay payment
   * @param {Object} order - Payment order details
   */
  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          // Verify payment with backend
          const { data } = await axios.post(
            `${backendUrl}/api/user/verify-razor`,
            { response },
            { headers: { token } }
          )
          if (data.success) {
            loadCreditsData()
            navigate('/')
            toast.success('Payment Successful. Credits added to your account')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      },
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  /**
   * Initiates payment process for selected plan
   * @param {string} planId - Selected plan identifier
   */
  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true)
        return
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-razor`,
        { planId },
        { headers: { token } }
      )
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <motion.div
      className="min-h-[85vh] text-center pt-14 mb-10 "
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button className="border border-gray-400 rounded-full px-10 py-2 mb-6">
        Our Plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose the plan
      </h1>

      <div className="flex flex-wap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border rounded-md py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <img src={assets.logo_icon} alt="" width={40} />
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span> /{' '}
              {item.credits} credits
            </p>
            <button
              onClick={() => {
                paymentRazorpay(item.id)
              }}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52"
            >
              {!user ? 'Get Started' : 'Buy Now'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit
