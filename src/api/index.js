import { Router } from 'express'
import pelangganRoutes from './pelanggan/route.js'
import perawatanRoutes from './perawatan/route.js'
import userRoutes from './user/route.js'

const router = Router()

router.use('/pelanggan', pelangganRoutes)
router.use('/perawatan', perawatanRoutes)
router.use('/users', userRoutes)

router.use('/', (req, res, next) => res.send(`This is howheals api's`))

export default router