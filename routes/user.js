import express from 'express'
import { setUser, getMe } from '../controllers/user.js'
import { auth } from '../middleware/auth.js'
import { userValidation } from '../middleware/validations/userValidation.js'

const user = express.Router()

user.post('/', userValidation, setUser)
user.get('/me', auth, getMe)

export default user;