import { Router } from "express";
import { addComment, upDate, deleteCom } from "./comment.controller.js";
import { validateJwt, isUser } from "../../middlewares/validate.jwt.js";
import { commentValidator } from "../../middlewares/validators.js";

const api = Router()

api.post('/addComment', [validateJwt, isUser, commentValidator] ,addComment)
api.put('/upDate/:id', [validateJwt, isUser] ,upDate)
api.delete('/deleteCom/:id', [validateJwt, isUser], deleteCom)

export default api