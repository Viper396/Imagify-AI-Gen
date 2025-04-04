import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
  const { token } = req.headers

  if (!token) return res.json({ success: false, message: 'Unauthorized' })

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id
    } else {
      return res.json({ success: false, message: 'Unauthorized. Login Again' })
    }
    next()
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

export default userAuth
