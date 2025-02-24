import { Router } from "express"
import { addCategory, deleteCat, upDate } from "./category.controller.js"
import { validateJwt, isAdmin } from "../../middlewares/validate.jwt.js"
import createDefCat from "./category.default.js"

const api = Router()

api.post('/addCategory', [validateJwt, isAdmin] , addCategory)
api.put('/upDate/:id', [validateJwt, isAdmin], upDate)
api.delete('/deleteCat/:id', [validateJwt, isAdmin], deleteCat)

//Categoria Default
api.post('/createDefCat', createDefCat)

export default api