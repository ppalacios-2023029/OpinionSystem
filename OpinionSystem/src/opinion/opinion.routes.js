import { Router } from "express"
import { addOpinion, upDate, deleteOpn, getAll } from "./opinion.controller.js"
import { validateJwt, isUser } from "../../middlewares/validate.jwt.js"
import { opinionValidator } from "../../middlewares/validators.js"

const api = Router()

api.post('/addOpinion', [validateJwt, isUser], addOpinion)
api.put('/upDate/:id', [validateJwt, isUser], upDate)
api.delete('deleteOpn/:id', [validateJwt, isUser], deleteOpn)
api.get('/getAll', [validateJwt, isUser], getAll)

export default api