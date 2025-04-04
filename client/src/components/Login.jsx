/**
 * Login/Signup modal component
 * Handles user authentication and registration
 */
import React, { useState, useContext, useEffect } from 'react'
import { assets } from '../assets/assets.js'
import { AppContext } from '../context/AppContext.jsx'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  // Toggle between Login and Sign Up states
  const [state, setState] = useState('Login')
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)

  // Form input states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  /**
   * Handles form submission for both login and signup
   * @param {Event} e - Form submit event
   */
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (state === 'Sign Up') {
        // Handle registration
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        })
        if (data.success) {
          handleAuthSuccess(data)
        } else {
          toast.error(data.message)
        }
      } else {
        // Handle login
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        })
        if (data.success) {
          handleAuthSuccess(data)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  /**
   * Handles successful authentication
   * @param {Object} data - Response data containing token and user info
   */
  const handleAuthSuccess = (data) => {
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('token', data.token)
    setShowLogin(false)
  }

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      {' '}
      <motion.form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-center text-neutral-700 text-2xl font-medium">
          {state === 'Login' ? 'Login' : 'Sign Up'}
        </h1>
        <p className="text-sm">
          Welcome back! Please {state === 'Login' ? 'Login' : 'Sign Up'} to
          Continue
        </p>
        {state !== 'Login' && (
          <div className="border px-6 py-2 items-center gap-2 rounded-full mt-5 flex flex-wrap text-left">
            <img src={assets.email_icon} alt="" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full Name"
              required
              className="outline-none text-sm "
            />
          </div>
        )}
        <div className="border px-6 py-2 items-center gap-2 rounded-full mt-4 flex flex-wrap text-left">
          <img src={assets.user_icon} alt="" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Id"
            required
            className="outline-none text-sm "
          />
        </div>

        <div className="border px-6 py-2 items-center gap-2 rounded-full mt-4 flex flex-wrap text-left">
          <img src={assets.lock_icon} alt="" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="outline-none text-sm "
          />
        </div>
        <div className="flex flex-wrap">
          <p>
            <span className="text-sm text-blue-400 my-4 cursor-pointer">
              Forgot Password?
            </span>
          </p>

          <p className="text-sm text-center mt-4"></p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full mt-4 w-full cursor-pointer">
          {state === 'Login' ? 'Login' : 'Sign Up'}
        </button>
        {state === 'Login' ? (
          <p className="mt-3 text-sm text-center">
            Don't have an account?
            <span
              className="text-blue-400 cursor-pointer "
              onClick={() => setState('Sign Up')}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-3 text-sm text-center">
            Already have an account?
            <span
              className="text-blue-400 cursor-pointer "
              onClick={() => setState('Login')}
            >
              Login
            </span>
          </p>
        )}
        <img
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowLogin(false)}
        />
      </motion.form>
    </div>
  )
}

export default Login
