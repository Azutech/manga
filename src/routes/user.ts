import {Router} from 'express'
import { register } from '../controllers/users'

const users = Router()

users.post('/auth/register', register)

export default users