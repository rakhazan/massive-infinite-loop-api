import { Router } from 'express'
import { destroy, find, get, store, update } from './controller.js'

const router = Router()

router.get('/', get)
router.post('/', store)
router.get('/:pelangganId', find)
router.put('/:pelangganId', update)
router.delete('/:pelangganId', destroy)

export default router