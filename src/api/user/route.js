import { destroy, find, get, login, logout, refreshToken, store, update } from './controller.js'
import { Router } from 'express'
import verifyToken from '../../middleware/verifyToken.js'

const router = Router()

router.post('/auth/login', login)
router.get('/auth/refresh-token', refreshToken)
router.delete('/auth/logout', logout)

router.get('/', verifyToken, get)
router.post('/', verifyToken, store)
router.get('/:userId', verifyToken, find)
router.put('/:userId', verifyToken, update)
router.delete('/:userId', verifyToken, destroy)

export default router