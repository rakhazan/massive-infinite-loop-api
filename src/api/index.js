import { Router } from 'express'

const router = Router()

router.use('/', (req, res, next) => res.send(`This is howheals api's`))

export default router