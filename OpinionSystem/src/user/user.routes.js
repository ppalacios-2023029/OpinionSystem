import { Router } from "express"
import { addUser, login, upDate, updatePassword } from "./user.controller.js"
import { validateJwt, isUser } from "../../middlewares/validate.jwt.js"
import userDef from "./user.roldef.js"

const api = Router()

api.post('/addUser', addUser)
api.post('/login', login)
api.put('/upDate/:id',[validateJwt, isUser], upDate)
api.put('/updatePassword/:id', [validateJwt, isUser], updatePassword)

api.post('/userDef', userDef)
export default api