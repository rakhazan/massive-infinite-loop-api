import { Router } from 'express'
import { destroy, find, get, store, update } from './controller.js'
import verifyToken from '../../middleware/verifyToken.js'

const router = Router()

router.get('/', get)
router.post('/', store)
router.get('/:pelangganId', find)
router.put('/:pelangganId', update)
router.delete('/:pelangganId', destroy)

export default router