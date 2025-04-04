/**
 * Application Context Provider for managing global state
 * Handles user authentication, credits, and image generation
 */
import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext()

const AppContextProvider = (props) => {
  // User state management
  const [user, setUser] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [credit, setCredit] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()

  /**
   * Fetches user credits data from the backend
   * Updates user and credit state
   */
  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token },
      })
      if (data.success) {
        setCredit(data.credit)
        setUser(data.user)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  /**
   * Generates an AI image based on the provided prompt
   * @param {string} prompt - Text prompt for image generation
   * @returns {Promise<string>} Generated image URL
   */
  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        {
          prompt,
        },
        {
          headers: { token },
        }
      )

      if (data.success) {
        loadCreditsData()
        return data.resultImg
      } else {
        toast.error(data.message)
        loadCreditsData()
        if (data.creditBalance === 0) {
          navigate('/buy')
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  /**
   * Handles user logout
   * Clears token and user data
   */
  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setUser(null)
    window.location.href = '/'
  }

  // Load user credits on token change
  useEffect(() => {
    if (token) {
      loadCreditsData()
    }
  }, [token])

  // Context value object
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    token,
    setToken,
    backendUrl,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  }

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}

export default AppContextProvider
