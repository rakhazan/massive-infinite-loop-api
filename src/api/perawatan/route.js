import { Router } from "express";
import { destroy, find, findByKode, get, store, update } from "./controller.js";

const router = Router()

router.get('/', get)
router.post('/', store)
router.get('/lacak/:kode', findByKode)
router.get('/:treatmentId', find)
router.put('/:treatmentId', update)
router.delete('/:treatmentId', destroy)

export default router