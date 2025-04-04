import express from 'express'

import {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'

const userRoutes = express.Router()

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.get('/credits', userAuth, userCredits)
userRoutes.post('/pay-razor', userAuth, paymentRazorpay)
userRoutes.post('/verify-razor', userAuth, verifyRazorpay)
export default userRoutes

//localhost:4000 api/user/register
//localhost:4000 api/user/login
//localhost:4000 api/user/pay-razor
